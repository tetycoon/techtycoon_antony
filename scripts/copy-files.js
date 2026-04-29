const fs = require('fs');
const path = require('path');

const files = [
  { source: 'public/_redirects', dest: 'build/_redirects' },
  { source: 'public/vercel.json', dest: 'build/vercel.json' }, 
  { source: 'public/web.config', dest: 'build/web.config' },
  { source: 'public/404.html', dest: 'build/404.html' }
];

// Create scripts directory if it doesn't exist
if (!fs.existsSync('scripts')) {
  fs.mkdirSync('scripts');
}

// Copy each file
files.forEach(file => {
  try {
    if (fs.existsSync(file.source)) {
      const fileContent = fs.readFileSync(file.source);
      fs.writeFileSync(file.dest, fileContent);
      console.log(`Successfully copied ${file.source} to ${file.dest}`);
    } else {
      console.log(`Warning: Source file ${file.source} does not exist, skipping...`);
    }
  } catch (err) {
    console.error(`Error copying ${file.source} to ${file.dest}:`, err);
  }
});

console.log('File copying completed.'); 