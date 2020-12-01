const fs = require('fs');
const path = require('path');

const fileLocation = path.join(__static, 'json.txt');
const fileContents = fs.readFileSync(fileLocation, 'utf8');

export { fileContents }