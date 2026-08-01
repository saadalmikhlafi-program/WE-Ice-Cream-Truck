import re

# Read current menu.ts
menu_content = open('src/data/menu.ts', encoding='utf-8').read()

# Extract all image paths from menu.ts
images_in_code = re.findall(r'image: "(/images/menu/[^"]+)"', menu_content)

# List actual files
import os
actual_files = set(os.listdir('public/images/menu'))

print("=== Images referenced in code but NOT found on disk ===")
missing = []
for img_path in images_in_code:
    filename = img_path.split('/')[-1]
    if filename not in actual_files:
        missing.append((img_path, filename))
        print(f"MISSING: {filename}")

print(f"\nTotal missing: {len(missing)}")
print(f"Total referenced: {len(images_in_code)}")
print(f"Total on disk: {len(actual_files)}")
