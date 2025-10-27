const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

function readCsv(relPath) {
  const p = path.resolve(__dirname, '..', relPath);
  const csv = fs.readFileSync(p, 'utf-8');
  const { data } = Papa.parse(csv, { header: true, skipEmptyLines: true, dynamicTyping: false });
  return data; // array of objects keyed by header row
}

module.exports = { readCsv };
