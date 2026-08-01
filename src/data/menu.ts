export interface MenuItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  category: string;
  brand: string;
  allergens: string[];
  dietary: string[];
}

export const menuItems: MenuItem[] = [
  {
    id: "toasted-almond-bar",
    name: "Toasted Almond Bar",
    slug: "toasted-almond-bar",
    description: "Enjoy the delicious Toasted Almond Bar, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dcd700cc412ac7b6df35b_good-humor-toasted-almond-bar-boston-legend-ice-cream-truck.avif",
    category: "Ice Cream Treat",
    brand: "Good Humor",
    allergens: ["Milk", "Soy"],
    dietary: []
  },
  {
    id: "homemade-vanilla-bar",
    name: "Homemade Vanilla Bar",
    slug: "homemade-vanilla-bar",
    description: "Enjoy the delicious Homemade Vanilla Bar, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dcc5fc8001e5220413dc0_blue-ribbon-vanilla-boston-legend-ice-cream-truck.avif",
    category: "Ice Cream Treat",
    brand: "Blue Ribbon Classics",
    allergens: ["Milk", "Soy"],
    dietary: []
  },
  {
    id: "dove-chocolate-bars",
    name: "Dove Chocolate Bars",
    slug: "dove-chocolate-bars",
    description: "Enjoy the delicious Dove Chocolate Bars, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dcd03ccaa4ae9485021f5_dove-ice-cream-bars-boston-legend-ice-cream-truck.avif",
    category: "Ice Cream Treat",
    brand: "Dove",
    allergens: ["Milk", "Soy"],
    dietary: []
  },
  {
    id: "classic-fudge-bar",
    name: "Classic Fudge Bar",
    slug: "classic-fudge-bar",
    description: "Enjoy the delicious Classic Fudge Bar, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dcbeb1ca7c29db29b305f_blue-ribbon-classics-fudge-bar-boston-legend-ice-cream-truck.avif",
    category: "Ice Cream Treat",
    brand: "Blue Ribbon Classics",
    allergens: ["Milk", "Soy"],
    dietary: []
  },
  {
    id: "orange-dream-bar",
    name: "Orange Dream Bar",
    slug: "orange-dream-bar",
    description: "Enjoy the delicious Orange Dream Bar, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dcc697601418758126d0d_blue-ribbon-classics-orange-dream-boston-legend-ice-cream-truck.avif",
    category: "Ice Cream Treat",
    brand: "Blue Ribbon Classics",
    allergens: ["Milk", "Soy"],
    dietary: []
  },
  {
    id: "vanilla-crunch-bar",
    name: "Vanilla Crunch Bar",
    slug: "vanilla-crunch-bar",
    description: "Enjoy the delicious Vanilla Crunch Bar, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dcba82c8ff9f92b34768f_blue-bunny-vanilla-crunch-bar-boston-legend-ice-cream-truck.avif",
    category: "Ice Cream Treat",
    brand: "Blue Bunny",
    allergens: ["Milk", "Soy"],
    dietary: []
  },
  {
    id: "root-beer-float-bar",
    name: "Root Beer Float Bar",
    slug: "root-beer-float-bar",
    description: "Enjoy the delicious Root Beer Float Bar, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dcbdd01debeb53a362395_blue-ribbon-classics-root-beer-float-boston-legend-ice-cream-truck.avif",
    category: "Ice Cream Treat",
    brand: "Blue Ribbon Classics",
    allergens: ["Milk", "Soy"],
    dietary: []
  },
  {
    id: "cookies-cream-cone",
    name: "Cookies & Cream Cone",
    slug: "cookies-cream-cone",
    description: "Enjoy the delicious Cookies & Cream Cone, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dca3d55a1487af4d4cdaf_blue-bunny-big-dipper-cookies-n-cream-cone-boston-legend-ice-cream-truck.avif",
    category: "Ice Cream Treat",
    brand: "Blue Bunny",
    allergens: ["Milk", "Soy"],
    dietary: []
  },
  {
    id: "screamers-cup",
    name: "Screamers Cup",
    slug: "screamers-cup",
    description: "Enjoy the delicious Screamers Cup, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dceb1770a22f0219b3c54_screamers-ice-cream-cup-boston-legend-ice-cream-truck.avif",
    category: "Ice Cream Treat",
    brand: "Screamers",
    allergens: ["Milk", "Soy"],
    dietary: []
  },
  {
    id: "chocolate-malt-cup",
    name: "Chocolate Malt Cup",
    slug: "chocolate-malt-cup",
    description: "Enjoy the delicious Chocolate Malt Cup, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dce9171b9adf6ee733de6_blue-bunny-ice-cream-malt-cup-chocolate-boston-legend-ice-cream-truck.avif",
    category: "Ice Cream Treat",
    brand: "Blue Bunny",
    allergens: ["Milk", "Soy"],
    dietary: []
  },
  {
    id: "sour-wower-bar",
    name: "Sour Wower Bar",
    slug: "sour-wower-bar",
    description: "Enjoy the delicious Sour Wower Bar, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dce53b747d6cf93b035c2_sour-wower-bar-boston-legend-ice-cream-truck.avif",
    category: "Ice Cream Treat",
    brand: "Premium Brand",
    allergens: ["Milk", "Soy"],
    dietary: []
  },
  {
    id: "twix-bar",
    name: "Twix Bar",
    slug: "twix-bar",
    description: "Enjoy the delicious Twix Bar, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dce5bf8e5c481466fe6f3_twix-ice-cream-bar-boston-legend-ice-cream-truck.avif",
    category: "Ice Cream Treat",
    brand: "Premium Brand",
    allergens: ["Milk", "Soy"],
    dietary: []
  },
  {
    id: "snickers-bar",
    name: "Snickers Bar",
    slug: "snickers-bar",
    description: "Enjoy the delicious Snickers Bar, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dce48d0d9e52f84911285_snickers-ice-cream-bars-boston-legend-ice-cream-truck.avif",
    category: "Ice Cream Treat",
    brand: "Premium Brand",
    allergens: ["Milk", "Soy", "Peanuts"],
    dietary: []
  },
  {
    id: "cry-baby-watermelon",
    name: "Cry Baby Watermelon",
    slug: "cry-baby-watermelon",
    description: "Enjoy the delicious Cry Baby Watermelon, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dce3a10bdfea0eecb7cb7_Rosati-CRY-baby-watermelon-Sour-ice-boston-legend-ice-cream-truck.avif",
    category: "Ice Cream Treat",
    brand: "Rosati Ice",
    allergens: ["Soy"],
    dietary: ["Dairy-Free"]
  },
  {
    id: "italian-ice",
    name: "Italian Ice",
    slug: "italian-ice",
    description: "Enjoy the delicious Italian Ice, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dce2eb5f57ea58e9489d1_richie-super-premium-italian-ice-min-boston-legend-ice-cream-truck.avif",
    category: "Ice Cream Treat",
    brand: "Richie's",
    allergens: ["Milk", "Soy"],
    dietary: []
  },
  {
    id: "ice-beads-lemon-strawberry",
    name: "Ice Beads Lemon & Strawberry",
    slug: "ice-beads-lemon-strawberry",
    description: "Enjoy the delicious Ice Beads Lemon & Strawberry, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dce217db51016898e5d8b_popsicle-shots-micro-sized-ice-beads-lemon-strawberry-boston-legend-ice-cream-truck.avif",
    category: "Ice Cream Treat",
    brand: "Popsicle",
    allergens: ["Milk", "Soy"],
    dietary: []
  },
  {
    id: "cyclone-cherry-ice-pop",
    name: "Cyclone Cherry Ice Pop",
    slug: "cyclone-cherry-ice-pop",
    description: "Enjoy the delicious Cyclone Cherry Ice Pop, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dcdc7ba51b5a096532082_popsicle-cyclone-cherry-lemon-blue-raspberry-ice-pops-boston-legend-ice-cream-truck.avif",
    category: "Ice Cream Treat",
    brand: "Popsicle",
    allergens: ["Milk", "Soy"],
    dietary: []
  },
  {
    id: "vanilla-sandwich",
    name: "Vanilla Sandwich",
    slug: "vanilla-sandwich",
    description: "Enjoy the delicious Vanilla Sandwich, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dcd81e4efb42760eb5dd7_hood-ice-cream-sandwiches-vanilla-boston-legend-ice-cream-truck.avif",
    category: "Ice Cream Treat",
    brand: "Premium Brand",
    allergens: ["Milk", "Soy"],
    dietary: []
  },
  {
    id: "oreo-bar",
    name: "Oreo Bar",
    slug: "oreo-bar",
    description: "Enjoy the delicious Oreo Bar, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dcd4556b5a714d66f9827_good-humor-oreo-frozen-dessert-bar-cookies-n-ice-cream-bar-boston-legend-ice-cream-truck.avif",
    category: "Ice Cream Treat",
    brand: "Good Humor",
    allergens: ["Milk", "Soy"],
    dietary: []
  },
  {
    id: "frozfruit-mango",
    name: "FrozFruit Mango",
    slug: "frozfruit-mango",
    description: "Enjoy the delicious FrozFruit Mango, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dcd117db51016898da1e9_frozfruit-mango-min-boston-legend-ice-cream-truck.avif",
    category: "Ice Cream Treat",
    brand: "Blue Bunny",
    allergens: ["Milk", "Soy"],
    dietary: []
  },
  {
    id: "reese-s-pb-cups",
    name: "Reese's PB Cups",
    slug: "reese-s-pb-cups",
    description: "Enjoy the delicious Reese's PB Cups, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dcd5ef8e5c481466f3f9b_good-humor-reeses-peanut-butter-ice-cream-cups-min-boston-legend-ice-cream-truck.avif",
    category: "Ice Cream Treat",
    brand: "Good Humor",
    allergens: ["Milk", "Soy", "Peanuts"],
    dietary: []
  },
  {
    id: "birthday-cake-bar",
    name: "Birthday Cake Bar",
    slug: "birthday-cake-bar",
    description: "Enjoy the delicious Birthday Cake Bar, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dcd33d4620d268ef1cef9_good-humor-birthday-cake-bar-ice-cream-boston-legend-ice-cream-truck.avif",
    category: "Ice Cream Treat",
    brand: "Good Humor",
    allergens: ["Milk", "Soy"],
    dietary: []
  },
  {
    id: "cotton-candy-bar",
    name: "Cotton Candy Bar",
    slug: "cotton-candy-bar",
    description: "Enjoy the delicious Cotton Candy Bar, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dcceb50a832b7a27052c8_cotton-candy-bar-boston-legend-ice-cream-truck.avif",
    category: "Ice Cream Treat",
    brand: "Blue Bunny",
    allergens: ["Milk", "Soy"],
    dietary: []
  },
  {
    id: "bomb-pop-warheads",
    name: "Bomb Pop Warheads",
    slug: "bomb-pop-warheads",
    description: "Enjoy the delicious Bomb Pop Warheads, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dcce1999cfc750884fd47_bomb-pop-warheads-boston-legend-ice-cream-truck.avif",
    category: "Ice Cream Treat",
    brand: "Bomb Pop",
    allergens: ["Milk", "Soy"],
    dietary: []
  },
  {
    id: "bomb-pop-original-king",
    name: "Bomb Pop Original King",
    slug: "bomb-pop-original-king",
    description: "Enjoy the delicious Bomb Pop Original King, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dccba25b9714855e9692d_bomb-pop-the-original-cherry-lime-blue-raspberry-boston-legend-ice-cream-truck.avif",
    category: "Ice Cream Treat",
    brand: "Bomb Pop",
    allergens: ["Milk", "Soy"],
    dietary: []
  },
  {
    id: "bomb-pop-jolly-ranchers",
    name: "Bomb Pop Jolly Ranchers",
    slug: "bomb-pop-jolly-ranchers",
    description: "Enjoy the delicious Bomb Pop Jolly Ranchers, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dcc8f50a832b7a2701cbd_bomb-pop-jolly-ranchers-boston-legend-ice-cream-truck.avif",
    category: "Ice Cream Treat",
    brand: "Bomb Pop",
    allergens: ["Milk", "Soy"],
    dietary: []
  },
  {
    id: "bomb-pop-banana-fudge",
    name: "Bomb Pop Banana Fudge",
    slug: "bomb-pop-banana-fudge",
    description: "Enjoy the delicious Bomb Pop Banana Fudge, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dcc7816b1e2e6be16fbe3_bomb-pop-banana-fudge-chocolate-fudge-banana-boston-legend-ice-cream-truck.avif",
    category: "Ice Cream Treat",
    brand: "Bomb Pop",
    allergens: ["Milk", "Soy"],
    dietary: []
  },
  {
    id: "screwball-blue-raspberry",
    name: "Screwball Blue Raspberry",
    slug: "screwball-blue-raspberry",
    description: "Enjoy the delicious Screwball Blue Raspberry, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dcb89ca12604cb4ed95b4_blue-bunny-two-ball-screwball-blue-raspberry-boston-legend-ice-cream-truck.avif",
    category: "Ice Cream Treat",
    brand: "Blue Bunny",
    allergens: ["Milk", "Soy"],
    dietary: []
  },
  {
    id: "jolly-rancher-cool-tubes",
    name: "Jolly Rancher Cool Tubes",
    slug: "jolly-rancher-cool-tubes",
    description: "Enjoy the delicious Jolly Rancher Cool Tubes, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dcb4d6da9f7df492fc9ec_Blue-Bunny-Jolly-Rancher-Cool-Tubes-ICE-Cream-boston-legend-ice-cream-truck.avif",
    category: "Ice Cream Treat",
    brand: "Blue Bunny",
    allergens: ["Milk", "Soy"],
    dietary: []
  },
  {
    id: "screwball-cherry",
    name: "Screwball Cherry",
    slug: "screwball-cherry",
    description: "Enjoy the delicious Screwball Cherry, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dcb94ba704342ad620bb0_blue-bunny-two-ball-screwball-cherry-boston-legend-ice-cream-truck.avif",
    category: "Ice Cream Treat",
    brand: "Blue Bunny",
    allergens: ["Milk", "Soy"],
    dietary: []
  },
  {
    id: "chunky-strawberry",
    name: "Chunky Strawberry",
    slug: "chunky-strawberry",
    description: "Enjoy the delicious Chunky Strawberry, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dcb23cd05763e5b73dd80_blue-bunny-frozfruit-chunky-strawberry-boston-legend-ice-cream-truck.avif",
    category: "Ice Cream Treat",
    brand: "Blue Bunny",
    allergens: ["Milk", "Soy"],
    dietary: []
  },
  {
    id: "coconut-fruit-bar",
    name: "Coconut Fruit Bar",
    slug: "coconut-fruit-bar",
    description: "Enjoy the delicious Coconut Fruit Bar, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dcb2f574682726cb5e3ac_blue-bunny-frozfruit-gourmet-creamy-coconut-frozen-fruit-bar-boston-legend-ice-cream-truck.avif",
    category: "Ice Cream Treat",
    brand: "Blue Bunny",
    allergens: ["Milk", "Soy"],
    dietary: []
  },
  {
    id: "cookies-cream-sandwich",
    name: "Cookies & Cream Sandwich",
    slug: "cookies-cream-sandwich",
    description: "Enjoy the delicious Cookies & Cream Sandwich, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dcaec740f2ac581eb179f_blue-bunny-cookies-n-cream-ice-cream-sandwich-bar-boston-legend-ice-cream-truck.avif",
    category: "Ice Cream Treat",
    brand: "Blue Bunny",
    allergens: ["Milk", "Soy"],
    dietary: []
  },
  {
    id: "tear-jerkers",
    name: "Tear Jerkers",
    slug: "tear-jerkers",
    description: "Enjoy the delicious Tear Jerkers, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dca7fcf27a59d4327544b_Blue-Bunny-Bom-Pop-Tear-Jerkers-boston-legend-ice-cream-truck.avif",
    category: "Ice Cream Treat",
    brand: "Blue Bunny",
    allergens: ["Milk", "Soy"],
    dietary: []
  },
  {
    id: "bubble-gum-popsicle-bar",
    name: "Bubble Gum Popsicle Bar",
    slug: "bubble-gum-popsicle-bar",
    description: "Enjoy the delicious Bubble Gum Popsicle Bar, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dcaa55d7431af45110527_blue-bunny-bubble-gum-popsicle-bar-boston-legend-ice-cream-truck.avif",
    category: "Ice Cream Treat",
    brand: "Blue Bunny",
    allergens: ["Milk", "Soy"],
    dietary: []
  },
  {
    id: "mississippi-mud-sandwich",
    name: "Mississippi Mud Sandwich",
    slug: "mississippi-mud-sandwich",
    description: "Enjoy the delicious Mississippi Mud Sandwich, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dca62c276da2d63700be3_blue-bunny-big-mississippi-mud-ice-cream-sandwich-boston-legend-ice-cream-truck.avif",
    category: "Ice Cream Treat",
    brand: "Blue Bunny",
    allergens: ["Milk", "Soy"],
    dietary: []
  },
  {
    id: "neapolitan-sandwich",
    name: "Neapolitan Sandwich",
    slug: "neapolitan-sandwich",
    description: "Enjoy the delicious Neapolitan Sandwich, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dc9ae760141875810b9fa_blue-bunny-big-neapolitan-ice-cream-sandwiches-boston-legend-ice-cream-truck.avif",
    category: "Ice Cream Treat",
    brand: "Blue Bunny",
    allergens: ["Milk", "Soy"],
    dietary: []
  },
  {
    id: "batman-pop",
    name: "Batman Pop",
    slug: "batman-pop",
    description: "Enjoy the delicious Batman Pop, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dc98ce38abea81b7fe21e_blue-bunny-batman-ice-cream-pop-boston-legend-ice-cream-truck.avif",
    category: "Character Pops",
    brand: "Blue Bunny",
    allergens: ["Milk", "Soy"],
    dietary: []
  },
  {
    id: "bubble-gum-snow-cone",
    name: "Bubble Gum Snow Cone",
    slug: "bubble-gum-snow-cone",
    description: "Enjoy the delicious Bubble Gum Snow Cone, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dcaac4788cab08f6bc390_blue-bunny-bubble-gum-snow-cone-boston-legend-ice-cream-truck.avif",
    category: "Ice Cream Treat",
    brand: "Blue Bunny",
    allergens: ["Milk", "Soy"],
    dietary: []
  },
  {
    id: "vanilla-cone",
    name: "Vanilla Cone",
    slug: "vanilla-cone",
    description: "Enjoy the delicious Vanilla Cone, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dca47a36331be9154fea4_blue-bunny-big-dipper-vanilla-cone-ice-cream--boston-legend-ice-cream-truck.avif",
    category: "Ice Cream Treat",
    brand: "Blue Bunny",
    allergens: ["Milk", "Soy"],
    dietary: []
  },
  {
    id: "chocolate-lovers-cone",
    name: "Chocolate Lovers Cone",
    slug: "chocolate-lovers-cone",
    description: "Enjoy the delicious Chocolate Lovers Cone, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dca25fa3b03f5c6339fff_blue-bunny-big-dipper-chocolate-lovers-cone-boston-legend-ice-cream-truck.avif",
    category: "Ice Cream Treat",
    brand: "Blue Bunny",
    allergens: ["Milk", "Soy"],
    dietary: []
  },
  {
    id: "strawberry-burst-cone",
    name: "Strawberry Burst Cone",
    slug: "strawberry-burst-cone",
    description: "Enjoy the delicious Strawberry Burst Cone, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dca303866726bc8181b4d_blue-bunny-big-dipper-strawberry-burst-cone-boston-legend-ice-cream-truck.avif",
    category: "Ice Cream Treat",
    brand: "Blue Bunny",
    allergens: ["Milk", "Soy"],
    dietary: []
  },
  {
    id: "spongebob-ice-cream",
    name: "Spongebob Ice Cream",
    slug: "spongebob-ice-cream",
    description: "Enjoy the delicious Spongebob Ice Cream, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dce03fd5dc9845c9c371b_popsicle-spongebob-ice-cream-boston-legend-ice-cream-truck.avif",
    category: "Character Pops",
    brand: "Popsicle",
    allergens: ["Milk", "Soy"],
    dietary: []
  },
  {
    id: "spider-man-bar",
    name: "Spider-Man Bar",
    slug: "spider-man-bar",
    description: "Enjoy the delicious Spider-Man Bar, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dcdd9db2e74e2a333174a_popsicle-marvel-spider-man-bar-ice-cream-frozen-confection-boston-legend-ice-cream-truck.avif",
    category: "Character Pops",
    brand: "Popsicle",
    allergens: ["Milk", "Soy"],
    dietary: []
  },
  {
    id: "minions-bar",
    name: "Minions Bar",
    slug: "minions-bar",
    description: "Enjoy the delicious Minions Bar, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dcdbda36331be91574a14_popsicle-despicable-me-minions-bar-a-case-ice-cream-boston-legend-ice-cream-truck.avif",
    category: "Character Pops",
    brand: "Popsicle",
    allergens: ["Milk", "Soy"],
    dietary: []
  },
  {
    id: "minion-blue",
    name: "Minion Blue",
    slug: "minion-blue",
    description: "Enjoy the delicious Minion Blue, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dcda60b5e391465a98599_Minion-Despicable-Me-Blue-boston-legend-ice-cream-truck.avif",
    category: "Character Pops",
    brand: "Blue Bunny",
    allergens: ["Milk", "Soy"],
    dietary: []
  },
  {
    id: "ninja-turtle-bar",
    name: "Ninja Turtle Bar",
    slug: "ninja-turtle-bar",
    description: "Enjoy the delicious Ninja Turtle Bar, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dcb70fa3b03f5c6346e8f_blue-bunny-ninja-turtle-bar-boston-legend-ice-cream-truck.avif",
    category: "Character Pops",
    brand: "Blue Bunny",
    allergens: ["Milk", "Soy"],
    dietary: []
  },
  {
    id: "tweety-bird-rainbow",
    name: "Tweety Bird Rainbow",
    slug: "tweety-bird-rainbow",
    description: "Enjoy the delicious Tweety Bird Rainbow, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dcb5e75363c37d4cd41c1_blue-bunny-looney-tunes-tweety-bird-rainbow-ice-cream-boston-legend-ice-cream-truck.avif",
    category: "Character Pops",
    brand: "Blue Bunny",
    allergens: ["Milk", "Soy"],
    dietary: []
  },
  {
    id: "sonic-hedgehog-bar",
    name: "Sonic Hedgehog Bar",
    slug: "sonic-hedgehog-bar",
    description: "Enjoy the delicious Sonic Hedgehog Bar, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dca0ccd05763e5b731823_blue-bunny-sonic-hedgehog-bar-boston-legend-ice-cream-truck.avif",
    category: "Character Pops",
    brand: "Premium Brand",
    allergens: ["Milk", "Soy"],
    dietary: []
  },
  {
    id: "powerpuff-girls-bar",
    name: "Powerpuff Girls Bar",
    slug: "powerpuff-girls-bar",
    description: "Enjoy the delicious Powerpuff Girls Bar, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dca01eccf382ddb2c0d3c_blue-bunny-powerpuff-girls-bar-boston-legend-ice-cream-truck.avif",
    category: "Ice Cream Treat",
    brand: "Premium Brand",
    allergens: ["Milk", "Soy"],
    dietary: []
  },
  {
    id: "angry-bird-bar",
    name: "Angry Bird Bar",
    slug: "angry-bird-bar",
    description: "Enjoy the delicious Angry Bird Bar, a timeless classic brought straight to you from our premium trucks.",
    image: "/images/menu/681dc84fcd05763e5b71dd8f_blue-bunny-angry-bird-ice-cream-boston-legend-ice-cream-truck.avif",
    category: "Ice Cream Treat",
    brand: "Premium Brand",
    allergens: ["Milk", "Soy"],
    dietary: []
  },
];
