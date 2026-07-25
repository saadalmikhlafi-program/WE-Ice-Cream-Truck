const fs = require('fs');
const { execSync } = require('child_process');

const envContent = fs.readFileSync('.env', 'utf8');
const lines = envContent.split('\n');

for (const line of lines) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  
  const match = trimmed.match(/^([A-Z0-9_]+)=(.*)$/);
  if (match) {
    const key = match[1];
    let val = match[2];
    if (val.startsWith('"') && val.endsWith('"')) {
      val = val.slice(1, -1);
    }
    
    if (key === 'DATABASE_URL' || key === 'DIRECT_URL') {
      console.log('Fixing ' + key + '...');
      
      try {
         execSync(`npx.cmd vercel env rm ${key} production -y`, { stdio: 'ignore' });
      } catch (e) {}

      fs.writeFileSync('val.txt', val);
      try {
         console.log('Adding ' + key + '...');
         execSync(`cmd /c "type val.txt | npx.cmd vercel env add ${key} production"`, { stdio: 'inherit' });
         console.log(key + ' added successfully.');
      } catch (e) {
         console.error('Error adding ' + key);
      }
      fs.unlinkSync('val.txt');
    }
  }
}
