const fs = require('fs');
const path = require('path');

const replacements = {
  '617-999-3803': '781-824-7000',
  '617-866-2727': '781-824-7000',
  '16179993803': '17818247000',
  '16178662727': '17818247000',
  '6179993803': '7818247000',
  '6178662727': '7818247000'
};

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.match(/\.(tsx|ts|js|jsx)$/)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      for (const [oldStr, newStr] of Object.entries(replacements)) {
        if (content.includes(oldStr)) {
          content = content.split(oldStr).join(newStr);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

processDirectory(path.join(__dirname, 'src'));
console.log('Done replacing phone numbers.');
