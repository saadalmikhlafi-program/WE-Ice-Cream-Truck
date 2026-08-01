import re
import json

data = open('src/data/menu.ts', encoding='utf-8').read()
ids = re.findall(r'id:\s*"([^"]+)"', data)
names = re.findall(r'name:\s*"([^"]+)"', data)
items = list(zip(ids, names))

# Write to a file for me to read
with open('items.json', 'w', encoding='utf-8') as f:
    json.dump(items, f, indent=2)
