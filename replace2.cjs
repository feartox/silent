const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'src/components/Footer.jsx',
  'src/data/catalog.js',
  'src/pages/Home.jsx',
  'src/pages/Category.jsx',
  'src/pages/Subcategory.jsx',
  'src/pages/Service.jsx',
  'src/pages/About.jsx',
  'src/data/services.js'
];

filesToUpdate.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Split by lines to avoid touching lines with "url:" or "id:" or "subcategoryId:" or "src:" or "image:"
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // Skip lines that look like IDs, URLs, or image paths
      if (line.includes('"id":') || line.includes('"url":') || line.includes('"subcategoryId":') || line.includes('"image":') || line.includes('"src":') || line.includes('subcategoryId:')) {
        continue;
      }
      
      // Replace case-insensitively
      lines[i] = line.replace(/soundproof/gi, 'Silent Guard Acoustics');
    }
    
    fs.writeFileSync(fullPath, lines.join('\n'));
    console.log('Updated ' + file);
  }
});
