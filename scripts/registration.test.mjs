import test from 'node:test';
import assert from 'node:assert/strict';
import { createHmac, randomUUID } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import handler from '../api/alta-clientes.js';
import { validateRegistration, HEADERS } from '../src/lib/clientRegistration.js';
import { excelUtilities } from './registration-excel-test-utils.mjs';

const fixture = { nombre: 'PRUEBA QA NEXOPS - NO ES CLIENTE', cuit: '20-12345678-6', condicionIva: 'Responsable inscripto', importador: 'Sí', origen: 'Prueba técnica', vieneDeCurso: 'Sí', curso: 'Curso de prueba', telefono: '+54 11 5555 0100', email: 'qa@example.com', domicilio: 'Domicilio ficticio de prueba 123', contactoOperacion: 'Contacto ficticio QA', contactoAdministracion: 'Administración ficticia QA', asesor: 'German Jimenez' };
const secret = 'test-secret-'.repeat(6);
const sign = text => createHmac('sha256', secret).update(text).digest('hex');

test('faithful validation, conditionals, normalized identifiers and invalid inputs', () => {
  const result = validateRegistration(fixture);
  assert.equal(result.valid, true);
  assert.equal(result.data.cuit, '20123456786');
  assert.equal(validateRegistration({ ...fixture, cuit: '20123456789' }).valid, false);
  assert.equal(validateRegistration({ ...fixture, cuit: 'ab20123456786' }).valid, false);
  assert.equal(validateRegistration({ ...fixture, condicionIva: 'Otro' }).valid, false);
  assert.equal(validateRegistration({ ...fixture, curso: '' }).valid, false);
  assert.equal(validateRegistration({ ...fixture, importador: '' }).valid, false);
  assert.equal(validateRegistration({ ...fixture, asesor: 'Inventado' }).valid, false);
  assert.equal(validateRegistration({ ...fixture, email: 'invalid' }).valid, false);
  assert.equal(validateRegistration({ ...fixture, telefono: '1' }).valid, false);
  const hidden = validateRegistration({ ...fixture, condicionIva: 'Consumidor final', vieneDeCurso: 'No' });
  assert.equal(hidden.data.importador, '');
  assert.equal(hidden.data.curso, '');
});

async function call(req) {
  let status = 200;
  const res = { headers: {}, setHeader(k,v) { this.headers[k] = v; }, status(value) { status = value; return this; }, json(body) { return { status, body, headers: this.headers }; } };
  return handler({ method: 'POST', headers: { origin: 'https://preview.example.com', host: 'preview.example.com', 'content-type': 'application/json' }, ...req }, res);
}
test('API rejects bad requests and never treats HTML or unconfirmed writes as success', async () => {
  process.env.ALTA_CLIENTES_SECRET = secret;
  process.env.ALTA_CLIENTES_WEBHOOK_URL = 'https://script.google.com/macros/s/test/exec';
  const session = await call({ method: 'GET' });
  const body = { token: session.body.token, requestId: randomUUID(), data: fixture };
  assert.equal((await call({ body, headers: { origin:'https://evil.example',host:'preview.example.com','content-type':'application/json' } })).status, 403);
  assert.equal((await call({ body: { ...body, token:'bad' } })).status, 403);
  assert.equal((await call({ body: { ...body, token:Date.now() + '.' + 'é'.repeat(64) } })).status, 403);
  assert.equal((await call({ body: { ...body, data: {} } })).status, 422);
  assert.equal((await call({ body: { ...body, website:'spam' } })).status, 400);
  assert.equal((await call({ method:'DELETE' })).status, 405);
  const original = globalThis.fetch;
  try {
    globalThis.fetch = async () => new Response('<html>Google login</html>');
    assert.equal((await call({ body })).status, 502);
    globalThis.fetch = async () => Response.json({ ok:true });
    assert.equal((await call({ body })).status, 502);
    globalThis.fetch = async (_url, options) => {
      const envelope = JSON.parse(options.body);
      assert.equal(envelope.signature, sign(envelope.message));
      return Response.json({ ok:true, registrationId:body.requestId });
    };
    assert.equal((await call({ body })).status, 200);
  } finally { globalThis.fetch = original; }
});

test('Apps Script durable dedup, conflict, signature, formula safety and lock release', async () => {
  const rows = [[...HEADERS]];
  let held = false;
  let flushed = false;
  const range = (r,c,n=1,w=1) => ({
    getValues: () => rows.slice(r-1,r-1+n).map(row => row.slice(c-1,c-1+w)),
    getValue: () => rows[r-1][c-1],
    getRow: () => r,
    setNumberFormat: () => {},
    setValues: data => { assert.ok(held); rows[r-1] = data[0]; },
    createTextFinder: text => ({ matchEntireCell() { return this; }, findNext() { return this.findAll()[0] || null; }, findAll: () => rows.flatMap((row,i) => i >= r-1 && i < r-1+n && row[c-1] === text ? [range(i+1,c)] : []) })
  });
  const sheet = { getRange:range, getLastRow:()=>rows.length, getMaxRows:()=>1000 };
  const context = vm.createContext({
    PropertiesService:{ getScriptProperties:()=>({ getProperty:key=>key === 'ALTA_CLIENTES_SECRET' ? secret : 'test' }) },
    Utilities:{ Charset:{ UTF_8:'utf8' }, computeHmacSha256Signature:(text,key)=>[...createHmac('sha256',key).update(text).digest()] },
    ContentService:{ MimeType:{ JSON:'json' }, createTextOutput:text=>({ setMimeType:()=>JSON.parse(text) }) },
    LockService:{ getScriptLock:()=>({ tryLock:()=>{ if(held)return false; held=true; return true; }, releaseLock:()=>{held=false;} }) },
    SpreadsheetApp:{ openById:()=>({ getSheetByName:()=>sheet }), flush:()=>{flushed=true;} },
    CacheService:{ getScriptCache:()=>({ get:()=>null, put:()=>{} }) }
  });
  vm.runInContext(await readFile(new URL('../google-apps-script/alta-clientes.gs', import.meta.url),'utf8'),context);
  const send = (id,data=fixture,signature) => {
    const message = JSON.stringify({ requestId:id, data, timestamp:Date.now(), environment:'preview', clientKey:'a'.repeat(64) });
    return context.doPost({ postData:{ contents:JSON.stringify({ message, signature:signature || sign(message) }) } });
  };
  const id = randomUUID();
  assert.equal(send(id).ok,true);
  assert.equal(flushed,true);
  assert.equal(rows.length,2);
  assert.equal(send(id).duplicate,true);
  assert.equal(send(randomUUID()).duplicate,true);
  assert.equal(rows.length,2);
  assert.equal(send(id,{...fixture,nombre:'Different'}).error,'idempotency_conflict');
  assert.equal(send(randomUUID(),fixture,'invalid').error,'unauthorized');
  assert.equal(send(randomUUID(),{...fixture,nombre:'=IMPORTXML("https://evil.example")'}).ok,true);
  assert.ok(rows[2][3].startsWith("'="));
  assert.equal(held,false);
});

test('mail worker sends production only, escapes HTML, tracks delivery and preserves uncertain sends', async () => {
  const prodId = randomUUID();
  const rows = [[...HEADERS], [randomUUID(), new Date().toISOString(), 'preview', ...Array(14).fill('preview')], [prodId, new Date().toISOString(), 'production', '<img src=x onerror=alert(1)>', '20123456786', 'Consumidor final', 'No aplica', 'Redes', 'No', 'No aplica', '1133334444', 'client@example.com', 'Calle 123', 'Operación', 'Administración', 'German Jimenez', 'hash']];
  const tracking = [['ID de alta', 'Estado', 'Destinatarios', 'Inicio (UTC)', 'Enviado (UTC)']];
  const makeSheet = data => ({ getLastRow:()=>data.length, getMaxRows:()=>1000, getSheetId:()=>0, getRange:(r,c,n=1,w=1)=>({ getValues:()=>data.slice(r-1,r-1+n).map(row=>row.slice(c-1,c-1+w)), setValues:values=>{ for(let i=0;i<values.length;i++) data[r-1+i]=[...values[i]]; } }) });
  const source=makeSheet(rows), outbox=makeSheet(tracking);
  const sent=[]; let quota=10, fail=false, locked=false;
  const context=vm.createContext({
    PropertiesService:{getScriptProperties:()=>({getProperty:key=>({ALTA_CLIENTES_SHEET_ID:'sheet',ALTA_CLIENTES_MAIL_TO:'internal@example.com'})[key]})},
    SpreadsheetApp:{openById:()=>({getId:()=> 'sheet',getSheetByName:name=>name==='Hoja 1'?source:outbox}),flush:()=>{}},
    LockService:{getScriptLock:()=>({tryLock:()=>{if(locked)return false;locked=true;return true;},releaseLock:()=>{locked=false;}})},
    Utilities:{...excelUtilities(),formatDate:()=> '07/09/2026 19:51'},
    MailApp:{getRemainingDailyQuota:()=>quota,sendEmail:mail=>{assert.equal(tracking.at(-1)[1],'ENVIANDO');if(fail)throw Error('unknown');sent.push(mail);}}
  });
  vm.runInContext(await readFile(new URL('../google-apps-script/alta-clientes.gs',import.meta.url),'utf8'),context);
  context.processAltaNotifications();
  assert.equal(sent.length,1); assert.equal(sent[0].to,'internal@example.com');
  assert.equal(sent[0].attachments.length,1);
  assert.ok(sent[0].attachments[0].name.endsWith('_20123456786.xlsx'));
  assert.ok(!sent[0].body.includes('docs.google.com'));
  assert.ok(sent[0].htmlBody.includes('&lt;img')); assert.ok(!sent[0].htmlBody.includes('<img'));
  assert.ok(!sent[0].subject.includes('[Prueba]')); assert.ok(!sent[0].body.includes('preview'));
  assert.equal(tracking[1][1],'ENVIADO'); assert.equal(tracking[1][0],prodId);
  context.processAltaNotifications(); assert.equal(sent.length,1);
  rows.push([randomUUID(),...rows[2].slice(1)]); quota=0;
  context.processAltaNotifications(); assert.equal(tracking.length,2);
  quota=10; fail=true;
  assert.throws(()=>context.processAltaNotifications(),/review/);
  assert.equal(tracking[2][1],'REVISAR'); assert.equal(rows.length,4); assert.equal(locked,false);
  fail=false; context.processAltaNotifications(); assert.equal(sent.length,1);
  rows.push([randomUUID(),...rows[2].slice(1)]);
  context.processAltaNotifications(); assert.equal(sent.length,2);
  rows.push([randomUUID(),...rows[2].slice(1)]);
  const before = tracking.length;
  const generate = context.registrationExcel_;
  context.registrationExcel_ = () => { throw new Error('Attachment generation failed'); };
  assert.throws(() => context.processAltaNotifications(), /Attachment/);
  assert.equal(tracking.length,before); assert.equal(sent.length,2);
  context.registrationExcel_ = generate;
  context.processAltaNotifications(); assert.equal(sent.length,3);
});

test('Excel contains only the saved customer fields, literal text, safe filename and course conditions', async () => {
  const context=vm.createContext({Utilities:excelUtilities()});
  vm.runInContext(await readFile(new URL('../google-apps-script/alta-clientes.gs',import.meta.url),'utf8'),context);
  const row=[randomUUID(),'2026-09-08T12:00:00Z','production',"'=HYPERLINK(\"https://example.com\")",'00123456789','Responsable inscripto','Sí','Redes & recomendaciones','Sí','Curso <importación>','+54 11 5555 0100','cliente@example.com','Domicilio '.repeat(60),'Contacto operación','Contacto administración','German Jimenez','PRIVATE_HASH'];
  const result=context.registrationExcel_(row);
  assert.equal(result.type,'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  assert.ok(!/[<>:"/\\|?*]/.test(result.name));
  const xml=result.parts[0].getDataAsString();
  assert.ok(xml.includes('=HYPERLINK(&quot;https://example.com&quot;)'));
  assert.ok(xml.includes('00123456789'));
  assert.ok(xml.includes('Sí — Curso &lt;importación&gt;'));
  assert.ok(xml.includes('Redes &amp; recomendaciones'));
  assert.ok(!xml.includes('PRIVATE_HASH')); assert.ok(!xml.includes(row[0]));
  assert.ok(!xml.includes('<f>')); assert.ok(!xml.includes('__ALTA_FIELD_'));
  assert.ok(/r="17"[^>]+ht="(?:1\d\d|2\d\d)"/.test(xml));
  row[8]='No';row[9]='No aplica';
  assert.ok(!context.registrationExcel_(row).parts[0].getDataAsString().includes('Curso &lt;'));
  assert.throws(()=>context.registrationExcel_([]),/Incomplete/);
});

test('final confirmed production write sends immediately; failed writes, previews and duplicates never send', async () => {
  const rows = [[...HEADERS]], tracking = [['ID de alta','Estado','Destinatarios','Inicio (UTC)','Enviado (UTC)']];
  let held=false, flushed=false, writeFail=false, mailFail=false, quota=10;
  const sent=[];
  const makeSheet = data => ({getLastRow:()=>data.length,getMaxRows:()=>1000,getSheetId:()=>0,getRange:(r,c,n=1,w=1)=>{
    const range={getValues:()=>data.slice(r-1,r-1+n).map(row=>row.slice(c-1,c-1+w)),getValue:()=>data[r-1][c-1],getRow:()=>r,setNumberFormat:()=>{},setValues:values=>{
      assert.ok(held);
      if(data===rows){if(writeFail)throw Error('write failed');flushed=false;}
      values.forEach((row,i)=>{data[r-1+i]=[...row];});
    }};
    range.createTextFinder=text=>({matchEntireCell(){return this;},findAll:()=>data.flatMap((row,i)=>i>=r-1&&i<r-1+n&&row[c-1]===text?[{getRow:()=>i+1}]:[]),findNext(){return this.findAll()[0]||null;}});
    return range;
  }});
  const source=makeSheet(rows),outbox=makeSheet(tracking);
  const context=vm.createContext({
    console:{error:()=>{}},
    PropertiesService:{getScriptProperties:()=>({getProperty:key=>({ALTA_CLIENTES_SECRET:secret,ALTA_CLIENTES_SHEET_ID:'sheet',ALTA_CLIENTES_MAIL_TO:'one@example.com,two@example.com,three@example.com'})[key]})},
    Utilities:{...excelUtilities(),Charset:{UTF_8:'utf8'},computeHmacSha256Signature:(text,key)=>[...createHmac('sha256',key).update(text).digest()],formatDate:()=> '07/09/2026'},
    ContentService:{MimeType:{JSON:'json'},createTextOutput:text=>({setMimeType:()=>JSON.parse(text)})},
    LockService:{getScriptLock:()=>({tryLock:()=>{if(held)return false;held=true;return true;},releaseLock:()=>{held=false;}})},
    SpreadsheetApp:{openById:()=>({getId:()=> 'sheet',getSheetByName:name=>name==='Hoja 1'?source:outbox}),flush:()=>{flushed=true;}},
    CacheService:{getScriptCache:()=>({get:()=>null,put:()=>{}})},
    MailApp:{getRemainingDailyQuota:()=>quota,sendEmail:mail=>{
      assert.ok(held);assert.ok(flushed);assert.equal(tracking.at(-1)[1],'ENVIANDO');
      assert.ok(rows.some(row=>row[0]===tracking.at(-1)[0]));
      context.processAltaNotifications(); // A competing fallback cannot send under this lock.
      if(mailFail)throw Error('mail outcome unknown');sent.push(mail);
    }}
  });
  vm.runInContext(await readFile(new URL('../google-apps-script/alta-clientes.gs',import.meta.url),'utf8'),context);
  const send=(id,data=fixture,environment='production')=>{
    const message=JSON.stringify({requestId:id,data,timestamp:Date.now(),environment,clientKey:'a'.repeat(64)});
    return context.doPost({postData:{contents:JSON.stringify({message,signature:sign(message)})}});
  };
  assert.equal(context.doGet().ok,false);assert.equal(sent.length,0);
  assert.equal(send(randomUUID(),{...fixture,email:'invalid'}).ok,false);assert.equal(sent.length,0);
  writeFail=true;assert.equal(send(randomUUID()).ok,false);assert.equal(sent.length,0);writeFail=false;
  assert.equal(send(randomUUID(),fixture,'preview').ok,true);assert.equal(sent.length,0);
  const id=randomUUID();assert.equal(send(id).ok,true);assert.equal(sent.length,1);
  assert.equal(tracking[1][1],'ENVIADO');assert.equal(sent[0].to,'one@example.com,two@example.com,three@example.com');
  assert.equal(send(id).duplicate,true);assert.equal(send(randomUUID()).duplicate,true);
  context.processAltaNotifications();assert.equal(sent.length,1);
  mailFail=true;assert.equal(send(randomUUID(),{...fixture,nombre:'Mail failure'}).ok,true);
  assert.equal(tracking.at(-1)[1],'REVISAR');mailFail=false;context.processAltaNotifications();assert.equal(sent.length,1);
  quota=0;assert.equal(send(randomUUID(),{...fixture,nombre:'Quota fallback'}).ok,true);assert.equal(sent.length,1);
  quota=10;context.processAltaNotifications();assert.equal(sent.length,2);assert.equal(held,false);
});
