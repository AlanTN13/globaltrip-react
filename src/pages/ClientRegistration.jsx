import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ADVISOR_OPTIONS, FIELDS, IVA_OPTIONS, validateRegistration } from '../lib/clientRegistration';
import './ClientRegistration.css';

const empty = () => Object.fromEntries(FIELDS.map(key => [key, '']));
const sections = ['Datos del cliente', 'Cómo llegaste a GlobalTrip', 'Datos de contacto'];
const groups = [['nombre', 'cuit', 'condicionIva', 'importador'], ['origen', 'vieneDeCurso', 'curso', 'asesor'], ['telefono', 'email', 'domicilio', 'contactoOperacion', 'contactoAdministracion']];
const labels = { nombre: 'Nombre, apellido o razón social', cuit: 'Número de CUIT/CUIL', condicionIva: 'Condición frente al IVA', importador: '¿Es importador registrado en Aduana?', origen: '¿Por dónde nos conocieron?', vieneDeCurso: '¿Viene de un curso?', curso: '¿Cuál curso?', telefono: 'Teléfono', email: 'E-mail', domicilio: 'Domicilio', contactoOperacion: 'Persona de contacto para informar avances de la operación', contactoAdministracion: 'Persona de contacto para temas administrativos', asesor: '¿Quién te asesoró?' };
const hints = { nombre: 'Tal cual figura en ARCA-AFIP.', cuit: '11 dígitos, con o sin guiones.', importador: 'Aplica solo para responsables inscriptos.', telefono: 'Incluí código de país y área.', contactoOperacion: 'Nombre y medio de contacto de la persona que recibirá las novedades.', contactoAdministracion: 'Cobranzas, envío de facturas, recibos, etc. Indicá nombre y medio de contacto.' };

export default function ClientRegistration() {
  const [data, setData] = useState(empty);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const [receipt, setReceipt] = useState(null);
  const [busy, setBusy] = useState(false);
  const inFlight = useRef(false);
  const request = useRef(null);
  const heading = useRef(null);
  const website = useRef(null);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Alta de cliente | GlobalTrip';
    return () => { document.title = previousTitle; };
  }, []);

  const goTo = next => { setStep(next); setErrors({}); setStatus(''); setTimeout(() => heading.current?.focus(), 0); };
  const showErrors = nextErrors => {
    setErrors(nextErrors);
    setStatus('Revisá los datos señalados para continuar.');
    setTimeout(() => document.getElementById(Object.keys(nextErrors)[0])?.focus(), 0);
  };
  const change = key => event => {
    const value = event.target.value;
    setData(current => ({ ...current, [key]: value, ...(key === 'condicionIva' && value !== 'Responsable inscripto' ? { importador: '' } : {}), ...(key === 'vieneDeCurso' && value !== 'Sí' ? { curso: '' } : {}) }));
    setErrors(current => ({ ...current, [key]: undefined }));
    setStatus('');
  };
  const next = event => {
    event.preventDefault();
    const result = validateRegistration(data);
    const currentErrors = Object.fromEntries(Object.entries(result.errors).filter(([key]) => groups[step].includes(key)));
    if (Object.keys(currentErrors).length) return showErrors(currentErrors);
    goTo(step + 1);
  };
  const submit = async event => {
    event.preventDefault();
    if (inFlight.current || receipt) return;
    const result = validateRegistration(data);
    if (!result.valid) { setStep(groups.findIndex(group => group.includes(Object.keys(result.errors)[0]))); return showErrors(result.errors); }
    inFlight.current = true;
    setBusy(true);
    setStatus('Estamos registrando tu alta. Esperá la confirmación.');
    const serialized = JSON.stringify(result.data);
    if (!request.current || request.current.serialized !== serialized) request.current = { id: crypto.randomUUID(), serialized };
    try {
      const sessionResponse = await fetch('/api/alta-clientes', { signal: AbortSignal.timeout(10000) });
      const session = await sessionResponse.json();
      if (!sessionResponse.ok || session.ok !== true || !session.token) throw new Error('unavailable');
      const response = await fetch('/api/alta-clientes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ requestId: request.current.id, token: session.token, website: website.current?.value || '', data: result.data }), signal: AbortSignal.timeout(35000) });
      const payload = await response.json();
      if (response.status === 422 && payload.errors) { setStep(groups.findIndex(group => group.includes(Object.keys(payload.errors)[0]))); showErrors(payload.errors); return; }
      if (!response.ok || payload.ok !== true || !payload.registrationId) throw new Error(payload.error || 'unconfirmed');
      setReceipt(payload.registrationId);
      setData(empty());
      setStatus('');
      setTimeout(() => heading.current?.focus(), 0);
    } catch (error) {
      setStatus(error.message === 'rate_limit' ? 'Recibimos varios intentos. Esperá 10 minutos y volvé a intentar.' : 'No pudimos confirmar el registro. Tus datos siguen en pantalla: podés reintentar el envío sin duplicar el alta. Si el problema continúa, contactá a tu asesor.');
    } finally { inFlight.current = false; setBusy(false); }
  };
  const field = key => {
    if (key === 'importador' && data.condicionIva !== 'Responsable inscripto' || key === 'curso' && data.vieneDeCurso !== 'Sí') return null;
    const options = key === 'condicionIva' ? IVA_OPTIONS : key === 'asesor' ? ADVISOR_OPTIONS : ['importador', 'vieneDeCurso'].includes(key) ? ['Sí', 'No'] : null;
    const props = { id: key, name: key, value: data[key], onChange: change(key), required: true, 'aria-invalid': !!errors[key], 'aria-describedby': [hints[key] && key + '-hint', errors[key] && key + '-error'].filter(Boolean).join(' ') || undefined };
    return <div className={`alta-field ${['nombre', 'domicilio', 'contactoOperacion', 'contactoAdministracion', 'importador'].includes(key) ? 'alta-wide' : ''}`} key={key}>
      <div className="alta-field-heading">
        <label htmlFor={key}>{labels[key]} <span aria-hidden="true">*</span></label>
        {hints[key] && <p id={key + '-hint'} className="alta-hint">{hints[key]}</p>}
      </div>
      <div className="alta-field-control">
        {options ? <select {...props}><option value="">Seleccioná una opción</option>{options.map(option => <option key={option}>{option}</option>)}</select> : <input {...props} type={key === 'email' ? 'email' : key === 'telefono' ? 'tel' : 'text'} inputMode={key === 'cuit' ? 'numeric' : undefined} autoComplete={({ nombre: 'organization', telefono: 'tel', email: 'email', domicilio: 'street-address' })[key] || 'off'} maxLength={['domicilio', 'contactoOperacion', 'contactoAdministracion'].includes(key) ? 500 : 200} />}
        {errors[key] && <p id={key + '-error'} className="alta-field-error">{errors[key]}</p>}
      </div>
    </div>;
  };
  return <><Header /><div className="alta-page" lang="es">
    <div className="alta-shell">
      <aside className="alta-intro"><span className="alta-eyebrow">BIENVENIDO A GLOBALTRIP</span><h1>El primer paso<br />para trabajar juntos.</h1><p>Completá tus datos para que podamos dar de alta tu cuenta y acompañarte en tu operación.</p><div className="alta-aside-note"><span aria-hidden="true">↗</span><div><strong>Tu operación, en buenas manos.</strong><p>Si necesitás ayuda con algún dato, consultá a tu asesor comercial.</p></div></div></aside>
      <section className="alta-card" aria-label="Ficha de alta de cliente">
        {receipt ? <div className="alta-success"><span className="alta-check" aria-hidden="true">✓</span><h2 ref={heading} tabIndex={-1}>Tu alta quedó registrada</h2><p>Recibimos tus datos correctamente. Tu asesor podrá continuar con la gestión de tu cuenta.</p><div className="alta-receipt"><span>COMPROBANTE DE ALTA</span><strong>{receipt}</strong></div><p>Guardá este comprobante como referencia.</p><Link to="/" className="alta-primary">Volver al inicio</Link></div> : <>
          <ol className="alta-progress" aria-label="Progreso del alta">{[...sections, 'Revisar y enviar'].map((title, i) => <li key={title} aria-current={step === i ? 'step' : undefined} className={i <= step ? 'active' : ''}><span>{i < step ? '✓' : i + 1}</span><small>{['Cliente', 'Origen', 'Contacto', 'Revisión'][i]}</small></li>)}</ol>
          <div className="alta-step-heading"><p>PASO {step + 1} DE 4</p><h2 ref={heading} tabIndex={-1}>{sections[step] || 'Revisá tu ficha'}</h2><p>{step < 3 ? 'Los campos con * son obligatorios.' : 'Confirmá que los datos estén correctos antes de enviarlos.'}</p></div>
          <form noValidate onSubmit={step < 3 ? next : submit}>
            <fieldset disabled={busy}>
              <div className="alta-trap" aria-hidden="true"><label htmlFor="website">Sitio web</label><input id="website" name="website" tabIndex={-1} autoComplete="off" ref={website} /></div>
              {step < 3 ? <div className="alta-grid">{groups[step].map(field)}</div> : <div className="alta-review">{sections.map((title, i) => <section key={title}><div><h3>{title}</h3><button type="button" onClick={() => goTo(i)} aria-label={'Editar ' + title.toLowerCase()}>Editar</button></div><dl>{groups[i].filter(key => data[key]).map(key => <div key={key}><dt>{labels[key]}</dt><dd>{data[key]}</dd></div>)}</dl></section>)}<p className="alta-use">GlobalTrip utilizará estos datos para gestionar tu alta y las comunicaciones de tu operación.</p></div>}
              <div className="alta-actions">{step > 0 && <button type="button" className="alta-back" onClick={() => goTo(step - 1)}>Volver</button>}<button type="submit" className="alta-primary">{busy ? 'Registrando…' : step < 3 ? 'Continuar →' : 'Confirmar y enviar alta'}</button></div>
            </fieldset>
          </form>
          <p className={busy ? 'alta-status' : 'alta-error'} role={busy ? 'status' : 'alert'} aria-live="polite">{status}</p>
        </>}
      </section>
    </div>
  </div><Footer /></>;
}
