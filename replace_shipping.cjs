const fs = require('fs');
const path = require('path');

const catalogPath = path.join(__dirname, 'src', 'data', 'catalog.js');
let content = fs.readFileSync(catalogPath, 'utf8');

content = content
  .replace(/-FREE-LOCAL-SHIPPING-WHEN-ORDERING-ONLINE/g, '')
  .replace(/   FREE LOCAL SHIPPING WHEN ORDERING ONLINE/g, '')
  .replace(/- FREE LOCAL SHIPPING WHEN ORDERING ONLINE/g, '')
  .replace(/FREE LOCAL SHIPPING WHEN ORDERING ONLINE/g, '');

fs.writeFileSync(catalogPath, content);
console.log('Done');
