const fs = require('fs');
let content = fs.readFileSync('src/lib/email.ts', 'utf8');

// 1. Logo URL to reliable raw github URL
content = content.replace(
  /const LOGO_URL = .*/g,
  'const LOGO_URL = "https://raw.githubusercontent.com/saadalmikhlafi-program/WE-Ice-Cream-Truck/main/public/images/we-icecream.jpg";'
);

// 2. Base Template width/padding adjustments
content = content.replace(/padding:40px 32px/g, 'padding:32px 20px');
content = content.replace(/padding:32px 32px 24px/g, 'padding:24px 16px');
content = content.replace(/padding:40px/g, 'padding:24px');
content = content.replace(/padding:32px/g, 'padding:24px');
content = content.replace(/font-size:48px/g, 'font-size:32px');
content = content.replace(/font-size:56px/g, 'font-size:40px');

// 3. Remove rainbow colors - replace with unified minimalist palette
const replacements = [
  // Greens to Navy/Gray
  { from: /#ECFDF5/gi, to: '#F9FAFB' },
  { from: /#10B981/gi, to: '#E5E7EB' },
  { from: /#065F46/gi, to: '\\${BRAND_NAVY}' },
  
  // Yellows/Oranges to Gray/Navy
  { from: /linear-gradient\(135deg,#FFF8E1 0%,#FFFDE7 100%\)/gi, to: '#F9FAFB' },
  { from: /#FFFBEB/gi, to: '#F9FAFB' },
  { from: /#FFF7ED/gi, to: '#F9FAFB' },
  { from: /#FED7AA/gi, to: '#E5E7EB' },
  { from: /#D97706/gi, to: '#6B7280' },
  { from: /#92400E/gi, to: '\\${BRAND_NAVY}' },
  
  // Blues to Gray/Navy
  { from: /#EFF6FF/gi, to: '#F9FAFB' },
  { from: /#BFDBFE/gi, to: '#E5E7EB' },
  { from: /#1E40AF/gi, to: '\\${BRAND_NAVY}' },
  { from: /#1E3A8A/gi, to: '\\${BRAND_NAVY}' },
  { from: /#2563EB/gi, to: '\\${BRAND_NAVY}' },
  
  // Reds/Pinks to Coral/Gray
  { from: /#FEF2F2/gi, to: '#FFF5F5' },
  { from: /#FECACA/gi, to: '#FFBABA' },
  { from: /#991B1B/gi, to: '\\${BRAND_CORAL}' },
  { from: /#DC2626/gi, to: '\\${BRAND_CORAL}' },

  // Border Gold to Border Gray
  { from: /border:2px solid \$\{BRAND_GOLD\}/g, to: 'border:1px solid #E5E7EB' },
  { from: /border:1px solid \$\{BRAND_GOLD\}/g, to: 'border:1px solid #E5E7EB' },
  
  // Background Gold to Background Coral (for buttons)
  { from: /background:\$\{BRAND_GOLD\}/g, to: 'background:${BRAND_CORAL}' },
  
  // Text Gold to Text Coral
  { from: /color:\$\{BRAND_GOLD\}/g, to: 'color:${BRAND_CORAL}' },
  { from: /color: \$\{BRAND_GOLD\}/g, to: 'color: ${BRAND_CORAL}' }
];

replacements.forEach(r => {
  content = content.replace(r.from, r.to);
});

// Update the base template header
content = content.replace(
  /<td class="email-header" style="background:#ffffff;padding:[^"]+">\s*<img[^>]+>\s*<\/td>/g,
  '<td class="email-header" style="background:#ffffff;padding:24px 16px 20px;text-align:center;border-bottom:1px solid #E5E7EB;">\\n            <img src="${LOGO_URL}" alt="WE Ice Cream Truck" width="80" style="width:80px;height:auto;object-fit:contain;display:block;margin:0 auto;"/>\\n          </td>'
);

// Mobile padding fixes in head styles
content = content.replace(
  /.email-padding \{ padding: 24px 16px !important; \}/g,
  '.email-padding { padding: 20px 12px !important; }'
);
content = content.replace(
  /.email-header \{ padding: 32px 20px !important; \}/g,
  '.email-header { padding: 24px 16px !important; }'
);

fs.writeFileSync('src/lib/email.ts', content, 'utf8');
console.log('Emails updated successfully.');
