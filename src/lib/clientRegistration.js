// Source: Germán's “Ficha de Cliente”, cells C11:D22. Keep option labels verbatim.
export const IVA_OPTIONS = ['Consumidor final', 'Monotributista', 'Responsable inscripto'];
export const ADVISOR_OPTIONS = ['Matias Pricipato', 'Rodrigo Santillan', 'German Jimenez', 'Yamila Vazquez', 'Gerardo Miño', 'Jorge Monzon'];
export const FIELDS = ['nombre', 'cuit', 'condicionIva', 'importador', 'origen', 'vieneDeCurso', 'curso', 'telefono', 'email', 'domicilio', 'contactoOperacion', 'contactoAdministracion', 'asesor'];
export const HEADERS = ['ID de alta', 'Fecha y hora (UTC)', 'Entorno', 'Nombre, apellido o razón social (ARCA-AFIP)', 'CUIT/CUIL', 'Condición frente al IVA', 'Importador registrado en Aduana', 'Por dónde nos conocieron', 'Viene de un curso', 'Cuál curso', 'Teléfono', 'E-mail', 'Domicilio', 'Contacto para avances de la operación', 'Contacto para temas administrativos', 'Quién te asesoró', 'Huella de envío'];

export function validateRegistration(input) {
  const data = Object.fromEntries(FIELDS.map(key => [key, typeof input?.[key] === 'string' ? input[key].trim() : '']));
  const errors = {};
  for (const key of FIELDS) {
    if (!['importador', 'curso'].includes(key) && !data[key]) errors[key] = 'Completá este dato.';
    if (data[key].length > (['domicilio', 'contactoOperacion', 'contactoAdministracion'].includes(key) ? 500 : 200)) errors[key] = 'El texto es demasiado largo.';
    if ([...data[key]].some(char => char.charCodeAt(0) < 32 && ![9, 10, 13].includes(char.charCodeAt(0)))) errors[key] = 'El texto contiene caracteres no válidos.';
  }
  if (!/^(?:\d{11}|\d{2}-\d{8}-\d)$/.test(data.cuit)) errors.cuit = 'Ingresá 11 dígitos, con o sin guiones.';
  data.cuit = data.cuit.replace(/-/g, '');
  if (/^\d{11}$/.test(data.cuit)) {
    const sum = [5,4,3,2,7,6,5,4,3,2].reduce((total, weight, i) => total + Number(data.cuit[i]) * weight, 0);
    const digit = 11 - sum % 11;
    if ((digit === 11 ? 0 : digit === 10 ? 9 : digit) !== Number(data.cuit[10])) errors.cuit = 'Revisá el CUIT/CUIL: el dígito verificador no coincide.';
  }
  if (!IVA_OPTIONS.includes(data.condicionIva)) errors.condicionIva = 'Elegí una condición frente al IVA.';
  if (data.condicionIva === 'Responsable inscripto') {
    if (!['Sí', 'No'].includes(data.importador)) errors.importador = 'Indicá si sos importador registrado.';
  } else data.importador = '';
  if (!['Sí', 'No'].includes(data.vieneDeCurso)) errors.vieneDeCurso = 'Elegí Sí o No.';
  if (data.vieneDeCurso === 'Sí' && !data.curso) errors.curso = 'Indicá el nombre del curso.';
  if (data.vieneDeCurso !== 'Sí') data.curso = '';
  data.email = data.email.toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Ingresá un e-mail válido.';
  if (!/^\+?[\d\s().-]+$/.test(data.telefono) || !/^\d{7,15}$/.test(data.telefono.replace(/\D/g, ''))) errors.telefono = 'Ingresá un teléfono válido, incluyendo código de área.';
  if (!ADVISOR_OPTIONS.includes(data.asesor)) errors.asesor = 'Elegí quién te asesoró.';
  return { data, errors, valid: Object.keys(errors).length === 0 };
}
