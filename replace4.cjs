const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 1. Rename files in public/images
const imagesDir = path.join(__dirname, 'public/images');

function renameFilesInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      renameFilesInDir(fullPath);
    } else {
      if (file.toLowerCase().includes('noiseproof')) {
        let newName = file
          .replace(/NOISEPROOFING/g, 'SILENT GUARD ACOUSTICS')
          .replace(/noiseproofing/ig, 'silentguardacoustics')
          .replace(/noiseproof/ig, 'silentguardacoustics');
          
        const newFullPath = path.join(dir, newName);
        execSync(`git mv "${fullPath}" "${newFullPath}"`);
        console.log(`Renamed: ${file} -> ${newName}`);
      }
    }
  }
}

renameFilesInDir(imagesDir);

// 2. Update all src files
function updateSourceFiles(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      updateSourceFiles(fullPath);
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      const newContent = content
        .replace(/NOISEPROOFING/g, 'SILENT GUARD ACOUSTICS')
        .replace(/Noiseproofing/g, 'Silent Guard Acoustics')
        .replace(/noiseproofing-/ig, 'silentguardacoustics-')
        .replace(/noiseproof-/ig, 'silentguardacoustics-')
        .replace(/noiseproofing_/ig, 'silentguardacoustics_')
        .replace(/noiseproof_/ig, 'silentguardacoustics_')
        .replace(/noiseproofing/ig, 'silent guard acoustics')
        .replace(/noiseproof/ig, 'silent guard acoustics');
        
      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent);
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

updateSourceFiles(path.join(__dirname, 'src'));
