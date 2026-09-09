// Apps Script boundary double. Real XLSX ZIP structure is verified separately on the exported artifact.
export function excelUtilities() {
  const blob = (value, type, name) => ({
    value, type, name,
    getName() { return this.name; },
    getDataAsString() { return String(this.value); },
    setContentType(contentType) { this.type = contentType; return this; },
  });
  return {
    newBlob: blob,
    base64Decode: value => Buffer.from(value, 'base64'),
    unzip: () => [blob('<worksheet>' + Array.from({length:12}, (_, i) => '<row r="' + (i+9) + '" ht="38"><c t="inlineStr"><is><t>__ALTA_FIELD_' + i + '__</t></is></c></row>').join('') + '</worksheet>', 'application/xml', 'xl/worksheets/sheet1.xml')],
    zip: (parts, name) => ({parts, name, setContentType(type) { this.type=type; return this; }}),
  };
}
