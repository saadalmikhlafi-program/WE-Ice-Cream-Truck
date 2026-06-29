const fs = require('fs');
const zipcodes = require('zipcodes');

const filePath = 'src/lib/cities-data.ts';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add zipCodes?: string[] to CityData interface
if (!content.includes('zipCodes?: string[];')) {
  content = content.replace(
    'nearbyAreas: string[];',
    'nearbyAreas: string[];\n  zipCodes?: string[];'
  );
}

// 2. Parse the array using a regex replacement approach or eval (since it's a JS object)
// Since cities-data.ts exports a const array, we can use a trick to modify it.
// Actually, using regex to inject zipCodes is safer than evaling TypeScript.

const lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('name: "')) {
    const match = lines[i].match(/name:\s*"([^"]+)"/);
    if (match) {
      const cityName = match[1];
      // Find zip codes for this city in MA
      const zips = zipcodes.lookupByName(cityName, 'MA');
      if (zips && zips.length > 0) {
        const uniqueZips = [...new Set(zips.map(z => z.zip))];
        // Inject zipCodes right after name
        lines[i] = lines[i] + `\n    zipCodes: ${JSON.stringify(uniqueZips)},`;
      }
    }
  }
}

fs.writeFileSync(filePath, lines.join('\n'));
console.log('Successfully injected zip codes!');
