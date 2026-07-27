const fs = require('fs');
const path = require('path');

const files = [
  'src/components/Header.jsx',
  'src/pages/PrivacyPolicy.jsx',
  'src/pages/Service.jsx',
  'src/pages/Terms.jsx'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  content = content
    .replace(/1-888-927-7495/g, '+1 (551) 455 9345')
    .replace(/>888-927-7495</g, '>+1 (551) 455 9345<')
    .replace(/tel:\+18889277495/g, 'tel:+15514559345')
    .replace(/href="tel:\+18889277495"/g, 'href="tel:+15514559345"');
    
  fs.writeFileSync(filePath, content);
  console.log(`Updated ${file}`);
});
