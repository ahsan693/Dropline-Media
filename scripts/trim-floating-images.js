const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const folder = path.join(__dirname, '../components/home/services-section/content-creation');
const skip = ['mainimg.png']; // don't trim the main mockup
const exts = ['.png', '.jpg', '.jpeg', '.webp'];

(async () => {
  try {
    const files = fs.readdirSync(folder).filter(f => exts.includes(path.extname(f).toLowerCase()) && !skip.includes(f));
    if (files.length === 0) {
      console.log('No images to trim in', folder);
      return;
    }

    for (const file of files) {
      const fullPath = path.join(folder, file);
      const tmpPath = fullPath + '.trim.tmp.png';
      try {
        await sharp(fullPath).trim().toFile(tmpPath);
        fs.renameSync(tmpPath, fullPath);
        console.log('Trimmed', file);
      } catch (err) {
        console.error('Failed to trim', file, err.message || err);
      }
    }

    console.log('All done');
  } catch (err) {
    console.error('Script error:', err.message || err);
    process.exit(1);
  }
})();
