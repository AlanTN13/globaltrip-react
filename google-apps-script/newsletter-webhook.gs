const SHEET_NAME = 'newsletter';

function doPost(e) {
  return handleRequest_(e);
}

function doGet() {
  return jsonOutput_({
    ok: false,
    error: 'method_not_allowed'
  });
}

function handleRequest_(e) {
  try {
    const body = parseBody_(e);
    const email = String(body.email || '').trim().toLowerCase();

    if (!isValidEmail_(email)) {
      return jsonOutput_({
        ok: false,
        error: 'invalid_email'
      });
    }

    const sheet = getSheet_();
    sheet.appendRow([email, new Date().toISOString()]);

    return jsonOutput_({ ok: true });
  } catch (error) {
    return jsonOutput_({
      ok: false,
      error: error.message || 'unexpected_error'
    });
  }
}

function parseBody_(e) {
  const raw = e && e.postData && e.postData.contents ? e.postData.contents : '';

  if (!raw) {
    throw new Error('missing_body');
  }

  return JSON.parse(raw);
}

function getSheet_() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

  if (!sheet) {
    throw new Error('sheet_not_found');
  }

  return sheet;
}

function isValidEmail_(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function jsonOutput_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
