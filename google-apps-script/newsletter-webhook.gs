const SHEET_NAMES = {
  newsletter: 'base newsletter',
  contacto: 'contacto'
};

const TIMEZONE = 'America/Argentina/Buenos_Aires';

function doPost(e) {
  try {
    const body = parseBody_(e);
    const type = String(body.type || '').trim().toLowerCase();

    if (type === 'newsletter') {
      return handleNewsletter_(body);
    }

    if (type === 'contacto') {
      return handleContacto_(body);
    }

    return jsonOutput_({
      ok: false,
      error: 'invalid_type'
    });
  } catch (error) {
    return jsonOutput_({
      ok: false,
      error: error.message || 'unexpected_error'
    });
  }
}

function doGet() {
  return jsonOutput_({
    ok: false,
    error: 'method_not_allowed'
  });
}

function handleNewsletter_(body) {
  const email = String(body.email || '').trim().toLowerCase();

  if (!isValidEmail_(email)) {
    return jsonOutput_({
      ok: false,
      error: 'invalid_email'
    });
  }

  const sheet = getSheet_(SHEET_NAMES.newsletter);
  const now = getDateParts_();
  sheet.appendRow([email, now.fecha, now.hora]);

  return jsonOutput_({
    ok: true,
    type: 'newsletter'
  });
}

function handleContacto_(body) {
  const nombre = String(body.nombre || '').trim();
  const email = String(body.email || '').trim().toLowerCase();
  const whatsapp = String(body.whatsapp || '').trim().replace(/^\+/, '');
  const servicio = String(body.servicio || '').trim();

  if (!nombre) {
    return jsonOutput_({
      ok: false,
      error: 'invalid_nombre'
    });
  }

  if (!isValidEmail_(email)) {
    return jsonOutput_({
      ok: false,
      error: 'invalid_email'
    });
  }

  if (!whatsapp) {
    return jsonOutput_({
      ok: false,
      error: 'invalid_whatsapp'
    });
  }

  if (!servicio) {
    return jsonOutput_({
      ok: false,
      error: 'invalid_servicio'
    });
  }

  const sheet = getSheet_(SHEET_NAMES.contacto);
  const now = getDateParts_();
  sheet.appendRow([nombre, email, whatsapp, servicio, now.fecha, now.hora]);

  return jsonOutput_({
    ok: true,
    type: 'contacto'
  });
}

function parseBody_(e) {
  const raw = e && e.postData && e.postData.contents ? e.postData.contents : '';

  if (!raw) {
    throw new Error('missing_body');
  }

  return JSON.parse(raw);
}

function getSheet_(sheetName) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

  if (!sheet) {
    throw new Error('sheet_not_found');
  }

  return sheet;
}

function getDateParts_() {
  const now = new Date();

  return {
    fecha: Utilities.formatDate(now, TIMEZONE, 'yyyy-MM-dd'),
    hora: Utilities.formatDate(now, TIMEZONE, 'HH:mm:ss')
  };
}

function isValidEmail_(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function jsonOutput_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
