const fs = require('fs');
const path = require('path');

const servicesPath = path.join(__dirname, 'src', 'data', 'services.js');
let content = fs.readFileSync(servicesPath, 'utf8');

content = content
  .replace(/Silent Guard AcousticsingDoors\.jpg/g, 'SilentGuardAcousticsDoors.jpg')
  .replace(/Silent Guard Acousticsing-walls\.jpg/g, 'silentguardacoustics-walls.jpg')
  .replace(/Silent Guard Acousticsing-floors\.jpg/g, 'silentguardacoustics-floors.jpg')
  .replace(/Silent Guard Acousticsing-Windows-2\.jpg/g, 'silentguardacoustics-Windows-2.jpg')
  .replace(/Silent Guard Acousticsing-Ceilings\.jpg/g, 'silentguardacoustics-Ceilings.jpg')
  .replace(/Silent Guard Acousticsing/g, 'Silent Guard Acoustics')
  .replace(/Silent Guard Acousticsing/ig, 'Silent Guard Acoustics');

fs.writeFileSync(servicesPath, content);
console.log('Fixed services.js');
