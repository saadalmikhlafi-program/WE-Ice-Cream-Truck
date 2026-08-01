import os
import re

# All actual files on disk
actual_files = os.listdir('public/images/menu')

# Map of correct filenames for the 31 missing items
# Key = wrong filename suffix in code, Value = correct filename on disk
FIXES = {
    # Classic bars
    "681dcc7a0f57fb7ae83ee2da_blue-ribbon-fudge-bar-boston-legend-ice-cream-truck.avif":
        "681dcbeb1ca7c29db29b305f_blue-ribbon-classics-fudge-bar-boston-legend-ice-cream-truck.avif",
    "681dccc3c783b1eb0d9dfa84_blue-ribbon-orange-dream-bar-boston-legend-ice-cream-truck.avif":
        "681dcc697601418758126d0d_blue-ribbon-classics-orange-dream-boston-legend-ice-cream-truck.avif",
    "681dcce1d2046ab9ccc9a73a_blue-bunny-vanilla-crunch-bar-boston-legend-ice-cream-truck.avif":
        "681dcba82c8ff9f92b34768f_blue-bunny-vanilla-crunch-bar-boston-legend-ice-cream-truck.avif",
    "681dccd00406b16fdc5b6eb6_blue-ribbon-root-beer-float-boston-legend-ice-cream-truck.avif":
        "681dcbdd01debeb53a362395_blue-ribbon-classics-root-beer-float-boston-legend-ice-cream-truck.avif",
    # Cones
    "681dca5a820de07bca4cef7a_blue-bunny-big-dipper-cookies-and-cream-cone-boston-legend-ice-cream-truck.avif":
        "681dca3d55a1487af4d4cdaf_blue-bunny-big-dipper-cookies-n-cream-cone-boston-legend-ice-cream-truck.avif",
    # Cups
    "681dcb16fa3b03f5c6345c09_screamers-ice-cream-cup-boston-legend-ice-cream-truck.avif":
        "681dceb1770a22f0219b3c54_screamers-ice-cream-cup-boston-legend-ice-cream-truck.avif",
    "681dcb07cd05763e5b71f4c7_blue-bunny-chocolate-malt-cup-boston-legend-ice-cream-truck.avif":
        "681dce9171b9adf6ee733de6_blue-bunny-ice-cream-malt-cup-chocolate-boston-legend-ice-cream-truck.avif",
    # Sour bars
    "681dcb2bfa3b03f5c63461a5_sour-wower-ice-cream-bar-boston-legend-ice-cream-truck.avif":
        "681dce53b747d6cf93b035c2_sour-wower-bar-boston-legend-ice-cream-truck.avif",
    # Candy bars
    "681dcd5e0406b16fdc5c7ee4_twix-ice-cream-bar-boston-legend-ice-cream-truck.avif":
        "681dce5bf8e5c481466fe6f3_twix-ice-cream-bar-boston-legend-ice-cream-truck.avif",
    "681dcd4e10a32023f8a39025_snickers-ice-cream-bar-boston-legend-ice-cream-truck.avif":
        "681dce48d0d9e52f84911285_snickers-ice-cream-bars-boston-legend-ice-cream-truck.avif",
    # Sour ice
    "681dcd40ec89eacb87a58ccc_cry-baby-watermelon-bar-boston-legend-ice-cream-truck.avif":
        "681dce3a10bdfea0eecb7cb7_Rosati-CRY-baby-watermelon-Sour-ice-boston-legend-ice-cream-truck.avif",
    "681dcd350b5e391465aaf7fb_richies-italian-ice-boston-legend-ice-cream-truck.avif":
        "681dce2eb5f57ea58e9489d1_richie-super-premium-italian-ice-min-boston-legend-ice-cream-truck.avif",
    # Ice pops
    "681dcd2a1039a3f84d3a3f3a_popsicle-ice-beads-lemon-strawberry-boston-legend-ice-cream-truck.avif":
        "681dcde940f4dd8798d019d2_popsicle-pop-shots-micro-sized-ice-beads-lemon-strawberry-boston-legend-ice-cream-truck.avif",
    "681dcd200406b16fdc5c7bc4_popsicle-cyclone-cherry-ice-pop-boston-legend-ice-cream-truck.avif":
        "681dcdc7ba51b5a096532082_popsicle-cyclone-cherry-lemon-blue-raspberry-ice-pops-boston-legend-ice-cream-truck.avif",
    # Sandwich
    "681dcd14c276da2d6371e6e7_hood-ice-cream-sandwich-boston-legend-ice-cream-truck.avif":
        "681dcd81e4efb42760eb5dd7_hood-ice-cream-sandwiches-vanilla-boston-legend-ice-cream-truck.avif",
    # Oreo
    "681dcd0ad8028a31093fb2b2_good-humor-oreo-ice-cream-bar-boston-legend-ice-cream-truck.avif":
        "681dcd4556b5a714d66f9827_good-humor-oreo-frozen-dessert-bar-cookies-n-ice-cream-bar-boston-legend-ice-cream-truck.avif",
    # Fruit bars
    "681dcce88e7f2929c5c30bb1_blue-bunny-frozfruit-mango-boston-legend-ice-cream-truck.avif":
        "681dcd117db51016898da1e9_frozfruit-mango-min-boston-legend-ice-cream-truck.avif",
    "681dccd9ec89eacb87a534f0_good-humor-reeses-pb-cups-boston-legend-ice-cream-truck.avif":
        "681dcd5ef8e5c481466f3f9b_good-humor-reeses-peanut-butter-ice-cream-cups-min-boston-legend-ice-cream-truck.avif",
    # Novelty bars
    "681dccc9eeb3cd34e3f8f6a7_good-humor-birthday-cake-bar-boston-legend-ice-cream-truck.avif":
        "681dcd33d4620d268ef1cef9_good-humor-birthday-cake-bar-ice-cream-boston-legend-ice-cream-truck.avif",
    "681dccc0b7de9424c0b6b5ca_blue-bunny-cotton-candy-bar-boston-legend-ice-cream-truck.avif":
        "681dcceb50a832b7a27052c8_cotton-candy-bar-boston-legend-ice-cream-truck.avif",
    # Bomb pops
    "681dcaedcd05763e5b729c27_bomb-pop-warheads-sour-boston-legend-ice-cream-truck.avif":
        "681dcce1999cfc750884fd47_bomb-pop-warheads-boston-legend-ice-cream-truck.avif",
    "681dcae2ac11fc3ac1d28c5b_bomb-pop-original-king-boston-legend-ice-cream-truck.avif":
        "681dccba25b9714855e9692d_bomb-pop-the-original-cherry-lime-blue-raspberry-boston-legend-ice-cream-truck.avif",
    "681dcad9a36331be9154da04_bomb-pop-jolly-ranchers-boston-legend-ice-cream-truck.avif":
        "681dcc8f50a832b7a2701cbd_bomb-pop-jolly-ranchers-boston-legend-ice-cream-truck.avif",
    "681dcacea36331be9154d97a_bomb-pop-banana-fudge-boston-legend-ice-cream-truck.avif":
        "681dcc7816b1e2e6be16fbe3_bomb-pop-banana-fudge-chocolate-fudge-banana-boston-legend-ice-cream-truck.avif",
    # Screwballs
    "681dcabf820de07bca4cae5c_blue-bunny-screwball-blue-raspberry-boston-legend-ice-cream-truck.avif":
        "681dcb89ca12604cb4ed95b4_blue-bunny-two-ball-screwball-blue-raspberry-boston-legend-ice-cream-truck.avif",
    "681dcab5a36331be9154d756_blue-bunny-jolly-rancher-cool-tubes-boston-legend-ice-cream-truck.avif":
        "681dcb4d6da9f7df492fc9ec_Blue-Bunny-Jolly-Rancher-Cool-Tubes-ICE-Cream-boston-legend-ice-cream-truck.avif",
    "681dcaaa4788cab08f6bc18a_blue-bunny-screwball-cherry-boston-legend-ice-cream-truck.avif":
        "681dcb94ba704342ad620bb0_blue-bunny-two-ball-screwball-cherry-boston-legend-ice-cream-truck.avif",
    # Fruit bars
    "681dca9b3866726bc81803df_blue-bunny-frozfruit-chunky-strawberry-boston-legend-ice-cream-truck.avif":
        "681dcb23cd05763e5b73dd80_blue-bunny-frozfruit-chunky-strawberry-boston-legend-ice-cream-truck.avif",
    "681dca90a36331be9154d433_blue-bunny-frozfruit-coconut-bar-boston-legend-ice-cream-truck.avif":
        "681dcb2f574682726cb5e3ac_blue-bunny-frozfruit-gourmet-creamy-coconut-frozen-fruit-bar-boston-legend-ice-cream-truck.avif",
    # Sandwiches
    "681dca79f69f35de3fc5b24f_blue-bunny-cookies-and-cream-ice-cream-sandwich-boston-legend-ice-cream-truck.avif":
        "681dcaec740f2ac581eb179f_blue-bunny-cookies-n-cream-ice-cream-sandwich-bar-boston-legend-ice-cream-truck.avif",
    # Tear Jerkers
    "681dca6dd8028a31093f7892_blue-bunny-bomb-pop-tear-jerkers-boston-legend-ice-cream-truck.avif":
        "681dca7fcf27a59d4327544b_Blue-Bunny-Bom-Pop-Tear-Jerkers-boston-legend-ice-cream-truck.avif",
}

# Read menu.ts
with open('src/data/menu.ts', encoding='utf-8') as f:
    content = f.read()

# Apply all fixes
for wrong_name, correct_name in FIXES.items():
    wrong_path = f"/images/menu/{wrong_name}"
    correct_path = f"/images/menu/{correct_name}"
    if wrong_path in content:
        content = content.replace(wrong_path, correct_path)
        print(f"FIXED: {wrong_name[:50]}...")
    else:
        print(f"NOT FOUND IN CODE: {wrong_name[:50]}...")

with open('src/data/menu.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("\nDone! Re-checking...")
# Verify
images_in_code = re.findall(r'image: "(/images/menu/[^"]+)"', content)
actual_files_set = set(actual_files)
still_missing = [p for p in images_in_code if p.split('/')[-1] not in actual_files_set]
print(f"Still missing: {len(still_missing)}")
for p in still_missing:
    print(f"  {p}")
