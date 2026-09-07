import test from 'node:test';
import assert from 'node:assert/strict';
import { createHmac, randomUUID } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import handler from '../api/alta-clientes.js';
import { validateRegistration, HEADERS } from '../src/lib/clientRegistration.js';

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
