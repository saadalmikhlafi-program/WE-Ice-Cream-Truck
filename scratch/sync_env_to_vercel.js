const fs = require('fs');
const path = require('path');
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
    
    if (key === 'NEXT_PUBLIC_SITE_URL') {
      val = 'https://ice-cream-truck-jet.vercel.app';
    }
    
    console.log(`Setting ${key}...`);
    try {
      execSync(`npx vercel env rm ${key} production -y`, { stdio: 'ignore' });
    } catch (e) {}
    
    const tmpFile = path.join(__dirname, 'tmp_val.txt');
    fs.writeFileSync(tmpFile, val, 'utf8');
    try {
      execSync(`cmd /c "type scratch\\tmp_val.txt | npx vercel env add ${key} production"`, { stdio: 'inherit' });
      console.log(`✅ Set ${key}`);
    } catch (e) {
      console.error(`❌ Failed ${key}`);
    }
    if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);
  }
}
