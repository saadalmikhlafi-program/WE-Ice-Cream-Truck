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
    description: "A nostalgic favorite featuring premium vanilla ice cream with a solid almond core, rolled in a crunchy, sweet almond coating.",
    image: "/images/menu/681dcd700cc412ac7b6df35b_good-humor-toasted-almond-bar-boston-legend-ice-cream-truck.avif",
    category: "Classic Bars",
    brand: "Good Humor",
    allergens: ["Milk", "Soy", "Almonds"],
    dietary: ["Vegetarian"]
  },
  {
    id: "homemade-vanilla-bar",
    name: "Homemade Vanilla Bar",
    slug: "homemade-vanilla-bar",
    description: "Rich, creamy homemade-style vanilla ice cream coated in a thick layer of premium milk chocolate.",
    image: "/images/menu/681dcc5fc8001e5220413dc0_blue-ribbon-vanilla-boston-legend-ice-cream-truck.avif",
    category: "Classic Bars",
    brand: "Blue Ribbon",
    allergens: ["Milk", "Soy"],
    dietary: ["Vegetarian"]
  },
  {
    id: "dove-chocolate-bars",
    name: "Dove Chocolate Bars",
    slug: "dove-chocolate-bars",
    description: "Luxurious vanilla ice cream dipped in a thick, rich layer of signature Dove milk chocolate.",
    image: "/images/menu/681dcd03ccaa4ae9485021f5_dove-ice-cream-bars-boston-legend-ice-cream-truck.avif",
    category: "Premium Bars",
    brand: "Dove",
    allergens: ["Milk", "Soy", "Peanuts", "Tree Nuts"],
    dietary: ["Vegetarian"]
  },
  {
    id: "classic-fudge-bar",
    name: "Classic Fudge Bar",
    slug: "classic-fudge-bar",
    description: "A rich, creamy, and deeply chocolatey fudge bar. The ultimate chocolate lover's cool-down treat.",
    image: "/images/menu/681dcbeb1ca7c29db29b305f_blue-ribbon-classics-fudge-bar-boston-legend-ice-cream-truck.avif",
    category: "Classic Bars",
    brand: "Blue Ribbon",
    allergens: ["Milk", "Soy"],
    dietary: ["Vegetarian"]
  },
  {
    id: "orange-dream-bar",
    name: "Orange Dream Bar",
    slug: "orange-dream-bar",
    description: "A refreshing layer of zesty orange sherbet wrapped around a smooth, creamy vanilla ice cream core.",
    image: "/images/menu/681dcc697601418758126d0d_blue-ribbon-classics-orange-dream-boston-legend-ice-cream-truck.avif",
    category: "Fruit Bars",
    brand: "Blue Ribbon",
    allergens: ["None (Dairy Free)"],
    dietary: ["Vegan", "Dairy-Free", "Gluten-Free"]
  },
  {
    id: "vanilla-crunch-bar",
    name: "Vanilla Crunch Bar",
    slug: "vanilla-crunch-bar",
    description: "Creamy vanilla ice cream dipped in chocolate and rolled in a delightful, crispy crunch coating.",
    image: "/images/menu/681dcba82c8ff9f92b34768f_blue-bunny-vanilla-crunch-bar-boston-legend-ice-cream-truck.avif",
    category: "Classic Bars",
    brand: "Blue Bunny",
    allergens: ["Milk", "Soy"],
    dietary: ["Vegetarian"]
  },
  {
    id: "root-beer-float-bar",
    name: "Root Beer Float Bar",
    slug: "root-beer-float-bar",
    description: "The classic diner taste of a frosty root beer float in a convenient, mess-free ice cream bar on a stick.",
    image: "/images/menu/681dcbdd01debeb53a362395_blue-ribbon-classics-root-beer-float-boston-legend-ice-cream-truck.avif",
    category: "Classic Bars",
    brand: "Blue Ribbon",
    allergens: ["Milk", "Soy"],
    dietary: ["Vegetarian"]
  },
  {
    id: "cookies-cream-cone",
    name: "Cookies & Cream Cone",
    slug: "cookies-cream-cone",
    description: "A crispy sugar cone filled with cookies and cream ice cream, topped with chocolate cookie pieces and a fudge swirl.",
    image: "/images/menu/681dca3d55a1487af4d4cdaf_blue-bunny-big-dipper-cookies-n-cream-cone-boston-legend-ice-cream-truck.avif",
    category: "Cones",
    brand: "Blue Bunny",
    allergens: ["Milk", "Wheat", "Soy"],
    dietary: ["Vegetarian"]
  },
  {
    id: "screamers-cup",
    name: "Screamers Cup",
    slug: "screamers-cup",
    description: "A delightful, smooth, and creamy ice cream cup bursting with flavor. Perfect for a quick, classic treat.",
    image: "/images/menu/681dceb1770a22f0219b3c54_screamers-ice-cream-cup-boston-legend-ice-cream-truck.avif",
    category: "Cups",
    brand: "Screamers",
    allergens: ["Milk"],
    dietary: ["Vegetarian", "Gluten-Free"]
  },
  {
    id: "chocolate-malt-cup",
    name: "Chocolate Malt Cup",
    slug: "chocolate-malt-cup",
    description: "Old-fashioned chocolate malt flavor in a classic cup. Comes with the iconic wooden spoon for a blast from the past.",
    image: "/images/menu/681dce9171b9adf6ee733de6_blue-bunny-ice-cream-malt-cup-chocolate-boston-legend-ice-cream-truck.avif",
    category: "Cups",
    brand: "Blue Bunny",
    allergens: ["Milk"],
    dietary: ["Vegetarian", "Gluten-Free"]
  },
  {
    id: "sour-wower-bar",
    name: "Sour Wower Bar",
    slug: "sour-wower-bar",
    description: "A puckeringly delicious sour ice pop that packs a serious tangy punch. Perfect for extreme flavor seekers.",
    image: "/images/menu/681dce53b747d6cf93b035c2_sour-wower-bar-boston-legend-ice-cream-truck.avif",
    category: "Popsicles",
    brand: "Popsicle",
    allergens: ["None (Dairy Free)"],
    dietary: ["Vegan", "Dairy-Free", "Gluten-Free"]
  },
  {
    id: "twix-bar",
    name: "Twix Bar",
    slug: "twix-bar",
    description: "Creamy vanilla ice cream layered with smooth caramel and crunchy cookie pieces, all dipped in milk chocolate.",
    image: "/images/menu/681dce5bf8e5c481466fe6f3_twix-ice-cream-bar-boston-legend-ice-cream-truck.avif",
    category: "Premium Bars",
    brand: "Mars",
    allergens: ["Milk", "Wheat", "Soy"],
    dietary: ["Vegetarian"]
  },
  {
    id: "snickers-bar",
    name: "Snickers Bar",
    slug: "snickers-bar",
    description: "Peanut butter ice cream, caramel, and roasted peanuts, completely coated in a thick layer of milk chocolate.",
    image: "/images/menu/681dce48d0d9e52f84911285_snickers-ice-cream-bars-boston-legend-ice-cream-truck.avif",
    category: "Premium Bars",
    brand: "Mars",
    allergens: ["Milk", "Peanuts", "Soy"],
    dietary: ["Vegetarian"]
  },
  {
    id: "cry-baby-watermelon",
    name: "Cry Baby Watermelon",
    slug: "cry-baby-watermelon",
    description: "Intensely sour and perfectly sweet watermelon Italian ice that will make your lips pucker.",
    image: "/images/menu/681dce3a10bdfea0eecb7cb7_Rosati-CRY-baby-watermelon-Sour-ice-boston-legend-ice-cream-truck.avif",
    category: "Cups",
    brand: "Rosati",
    allergens: ["Milk"],
    dietary: ["Vegetarian", "Gluten-Free"]
  },
  {
    id: "italian-ice",
    name: "Italian Ice",
    slug: "italian-ice",
    description: "Super premium, incredibly refreshing dairy-free Italian ice. A perfect hot weather cool-down.",
    image: "/images/menu/681dce2eb5f57ea58e9489d1_richie-super-premium-italian-ice-min-boston-legend-ice-cream-truck.avif",
    category: "Cups",
    brand: "Richie's",
    allergens: ["None (Dairy Free)"],
    dietary: ["Vegetarian", "Gluten-Free"]
  },
  {
    id: "ice-beads-lemon-strawberry",
    name: "Ice Beads Lemon & Strawberry",
    slug: "ice-beads-lemon-strawberry",
    description: "Micro-sized, flash-frozen ice beads bursting with sweet strawberry and zesty lemon flavors.",
    image: "/images/menu/681dce217db51016898e5d8b_popsicle-shots-micro-sized-ice-beads-lemon-strawberry-boston-legend-ice-cream-truck.avif",
    category: "Novelties",
    brand: "Popsicle",
    allergens: ["Milk", "Soy"],
    dietary: ["Vegetarian"]
  },
  {
    id: "cyclone-cherry-ice-pop",
    name: "Cyclone Cherry Ice Pop",
    slug: "cyclone-cherry-ice-pop",
    description: "A whirlwind of cherry, lemon, and blue raspberry flavors twisted into one amazing ice pop.",
    image: "/images/menu/681dcdc7ba51b5a096532082_popsicle-cyclone-cherry-lemon-blue-raspberry-ice-pops-boston-legend-ice-cream-truck.avif",
    category: "Popsicles",
    brand: "Popsicle",
    allergens: ["None (Dairy Free)"],
    dietary: ["Vegan", "Dairy-Free", "Gluten-Free"]
  },
  {
    id: "vanilla-sandwich",
    name: "Vanilla Sandwich",
    slug: "vanilla-sandwich",
    description: "The undisputed classic. Thick, creamy vanilla ice cream sandwiched between two soft chocolate wafers.",
    image: "/images/menu/681dcd81e4efb42760eb5dd7_hood-ice-cream-sandwiches-vanilla-boston-legend-ice-cream-truck.avif",
    category: "Sandwiches",
    brand: "Hood",
    allergens: ["Milk", "Wheat", "Soy"],
    dietary: ["Vegetarian"]
  },
  {
    id: "oreo-bar",
    name: "Oreo Bar",
    slug: "oreo-bar",
    description: "A frozen dessert bar packed with real Oreo cookie pieces and coated in a crunchy Oreo crumb crust.",
    image: "/images/menu/681dcd4556b5a714d66f9827_good-humor-oreo-frozen-dessert-bar-cookies-n-ice-cream-bar-boston-legend-ice-cream-truck.avif",
    category: "Premium Bars",
    brand: "Good Humor",
    allergens: ["Milk", "Soy", "Peanuts", "Tree Nuts"],
    dietary: ["Vegetarian"]
  },
  {
    id: "frozfruit-mango",
    name: "FrozFruit Mango",
    slug: "frozfruit-mango",
    description: "A massive, refreshing fruit bar made with real, juicy mango chunks. Dairy-free and incredibly refreshing.",
    image: "/images/menu/681dcd117db51016898da1e9_frozfruit-mango-min-boston-legend-ice-cream-truck.avif",
    category: "Fruit Bars",
    brand: "FrozFruit",
    allergens: ["None (Dairy Free)"],
    dietary: ["Vegan", "Dairy-Free", "Gluten-Free"]
  },
  {
    id: "reese-s-pb-cups",
    name: "Reese's PB Cups",
    slug: "reese-s-pb-cups",
    description: "The perfect combination of chocolate and peanut butter in a frozen cup. A peanut butter lover's dream.",
    image: "/images/menu/681dcd5ef8e5c481466f3f9b_good-humor-reeses-peanut-butter-ice-cream-cups-min-boston-legend-ice-cream-truck.avif",
    category: "Cups",
    brand: "Good Humor",
    allergens: ["Milk", "Peanuts", "Soy"],
    dietary: ["Vegetarian", "Gluten-Free"]
  },
  {
    id: "birthday-cake-bar",
    name: "Birthday Cake Bar",
    slug: "birthday-cake-bar",
    description: "Vanilla ice cream with a cake crunch coating. Tastes exactly like a birthday celebration on a stick.",
    image: "/images/menu/681dcd33d4620d268ef1cef9_good-humor-birthday-cake-bar-ice-cream-boston-legend-ice-cream-truck.avif",
    category: "Novelties",
    brand: "Good Humor",
    allergens: ["Milk", "Soy"],
    dietary: ["Vegetarian"]
  },
  {
    id: "cotton-candy-bar",
    name: "Cotton Candy Bar",
    slug: "cotton-candy-bar",
    description: "Sweet, fluffy cotton candy flavored ice cream that brings the magic of the carnival straight to you.",
    image: "/images/menu/681dcceb50a832b7a27052c8_cotton-candy-bar-boston-legend-ice-cream-truck.avif",
    category: "Novelties",
    brand: "Blue Bunny",
    allergens: ["Milk", "Soy"],
    dietary: ["Vegetarian"]
  },
  {
    id: "bomb-pop-warheads",
    name: "Bomb Pop Warheads",
    slug: "bomb-pop-warheads",
    description: "The iconic Bomb Pop shape with an explosive, super-sour Warheads flavor profile.",
    image: "/images/menu/681dcce1999cfc750884fd47_bomb-pop-warheads-boston-legend-ice-cream-truck.avif",
    category: "Popsicles",
    brand: "Bomb Pop",
    allergens: ["None (Dairy Free)"],
    dietary: ["Vegan", "Dairy-Free", "Gluten-Free"]
  },
  {
    id: "bomb-pop-original-king",
    name: "Bomb Pop Original King",
    slug: "bomb-pop-original-king",
    description: "The undisputed king of the ice cream truck. Cherry, lime, and blue raspberry stacked high.",
    image: "/images/menu/681dccba25b9714855e9692d_bomb-pop-the-original-cherry-lime-blue-raspberry-boston-legend-ice-cream-truck.avif",
    category: "Popsicles",
    brand: "Bomb Pop",
    allergens: ["None (Dairy Free)"],
    dietary: ["Vegan", "Dairy-Free", "Gluten-Free"]
  },
  {
    id: "bomb-pop-jolly-ranchers",
    name: "Bomb Pop Jolly Ranchers",
    slug: "bomb-pop-jolly-ranchers",
    description: "Three classic Jolly Rancher flavors—Watermelon, Green Apple, and Blue Raspberry—in one frozen pop.",
    image: "/images/menu/681dcc8f50a832b7a2701cbd_bomb-pop-jolly-ranchers-boston-legend-ice-cream-truck.avif",
    category: "Popsicles",
    brand: "Bomb Pop",
    allergens: ["None (Dairy Free)"],
    dietary: ["Vegan", "Dairy-Free", "Gluten-Free"]
  },
  {
    id: "bomb-pop-banana-fudge",
    name: "Bomb Pop Banana Fudge",
    slug: "bomb-pop-banana-fudge",
    description: "A delicious twist on the classic: sweet banana and rich chocolate fudge flavors combined.",
    image: "/images/menu/681dcc7816b1e2e6be16fbe3_bomb-pop-banana-fudge-chocolate-fudge-banana-boston-legend-ice-cream-truck.avif",
    category: "Popsicles",
    brand: "Bomb Pop",
    allergens: ["None (Dairy Free)"],
    dietary: ["Vegan", "Dairy-Free", "Gluten-Free"]
  },
  {
    id: "screwball-blue-raspberry",
    name: "Screwball Blue Raspberry",
    slug: "screwball-blue-raspberry",
    description: "A frozen blue raspberry treat in a plastic cone, featuring two hidden gumballs at the very bottom!",
    image: "/images/menu/681dcb89ca12604cb4ed95b4_blue-bunny-two-ball-screwball-blue-raspberry-boston-legend-ice-cream-truck.avif",
    category: "Cups",
    brand: "Blue Bunny",
    allergens: ["Milk"],
    dietary: ["Vegetarian", "Gluten-Free"]
  },
  {
    id: "jolly-rancher-cool-tubes",
    name: "Jolly Rancher Cool Tubes",
    slug: "jolly-rancher-cool-tubes",
    description: "Push-up style tube filled with intensely flavored Jolly Rancher ice.",
    image: "/images/menu/681dcb4d6da9f7df492fc9ec_Blue-Bunny-Jolly-Rancher-Cool-Tubes-ICE-Cream-boston-legend-ice-cream-truck.avif",
    category: "Novelties",
    brand: "Blue Bunny",
    allergens: ["Milk", "Soy"],
    dietary: ["Vegetarian"]
  },
  {
    id: "screwball-cherry",
    name: "Screwball Cherry",
    slug: "screwball-cherry",
    description: "A sweet and refreshing cherry frozen treat with two surprise gumballs waiting at the bottom.",
    image: "/images/menu/681dcb94ba704342ad620bb0_blue-bunny-two-ball-screwball-cherry-boston-legend-ice-cream-truck.avif",
    category: "Cups",
    brand: "Blue Bunny",
    allergens: ["Milk"],
    dietary: ["Vegetarian", "Gluten-Free"]
  },
  {
    id: "chunky-strawberry",
    name: "Chunky Strawberry",
    slug: "chunky-strawberry",
    description: "A premium fruit bar absolutely loaded with real, juicy strawberry chunks.",
    image: "/images/menu/681dcb23cd05763e5b73dd80_blue-bunny-frozfruit-chunky-strawberry-boston-legend-ice-cream-truck.avif",
    category: "Fruit Bars",
    brand: "Blue Bunny",
    allergens: ["None (Dairy Free)"],
    dietary: ["Vegan", "Dairy-Free", "Gluten-Free"]
  },
  {
    id: "coconut-fruit-bar",
    name: "Coconut Fruit Bar",
    slug: "coconut-fruit-bar",
    description: "A creamy, tropical escape made with real coconut pieces. Gourmet and incredibly refreshing.",
    image: "/images/menu/681dcb2f574682726cb5e3ac_blue-bunny-frozfruit-gourmet-creamy-coconut-frozen-fruit-bar-boston-legend-ice-cream-truck.avif",
    category: "Fruit Bars",
    brand: "Blue Bunny",
    allergens: ["None (Dairy Free)"],
    dietary: ["Vegan", "Dairy-Free", "Gluten-Free"]
  },
  {
    id: "cookies-cream-sandwich",
    name: "Cookies & Cream Sandwich",
    slug: "cookies-cream-sandwich",
    description: "Cookies and cream ice cream layered between two large chocolate cookie wafers.",
    image: "/images/menu/681dcaec740f2ac581eb179f_blue-bunny-cookies-n-cream-ice-cream-sandwich-bar-boston-legend-ice-cream-truck.avif",
    category: "Sandwiches",
    brand: "Blue Bunny",
    allergens: ["Milk", "Wheat", "Soy"],
    dietary: ["Vegetarian"]
  },
  {
    id: "tear-jerkers",
    name: "Tear Jerkers",
    slug: "tear-jerkers",
    description: "A deeply sour, mouth-puckering ice pop designed for those who love intense flavors.",
    image: "/images/menu/681dca7fcf27a59d4327544b_Blue-Bunny-Bom-Pop-Tear-Jerkers-boston-legend-ice-cream-truck.avif",
    category: "Popsicles",
    brand: "Blue Bunny",
    allergens: ["None (Dairy Free)"],
    dietary: ["Vegan", "Dairy-Free", "Gluten-Free"]
  },
  {
    id: "bubble-gum-popsicle-bar",
    name: "Bubble Gum Popsicle Bar",
    slug: "bubble-gum-popsicle-bar",
    description: "Sweet, classic bubble gum flavor in a fun, frozen bar format.",
    image: "/images/menu/681dcaa55d7431af45110527_blue-bunny-bubble-gum-popsicle-bar-boston-legend-ice-cream-truck.avif",
    category: "Popsicles",
    brand: "Blue Bunny",
    allergens: ["None (Dairy Free)"],
    dietary: ["Vegan", "Dairy-Free", "Gluten-Free"]
  },
  {
    id: "mississippi-mud-sandwich",
    name: "Mississippi Mud Sandwich",
    slug: "mississippi-mud-sandwich",
    description: "A chocolate lover's dream: chocolate ice cream between two chocolate wafers.",
    image: "/images/menu/681dca62c276da2d63700be3_blue-bunny-big-mississippi-mud-ice-cream-sandwich-boston-legend-ice-cream-truck.avif",
    category: "Sandwiches",
    brand: "Blue Bunny",
    allergens: ["Milk", "Wheat", "Soy"],
    dietary: ["Vegetarian"]
  },
  {
    id: "neapolitan-sandwich",
    name: "Neapolitan Sandwich",
    slug: "neapolitan-sandwich",
    description: "The classic trifecta of chocolate, vanilla, and strawberry ice cream between two chocolate wafers.",
    image: "/images/menu/681dc9ae760141875810b9fa_blue-bunny-big-neapolitan-ice-cream-sandwiches-boston-legend-ice-cream-truck.avif",
    category: "Sandwiches",
    brand: "Blue Bunny",
    allergens: ["Milk", "Wheat", "Soy"],
    dietary: ["Vegetarian"]
  },
  {
    id: "batman-pop",
    name: "Batman Pop",
    slug: "batman-pop",
    description: "The Dark Knight as a frozen treat! A superhero favorite with gumball eyes.",
    image: "/images/menu/681dc98ce38abea81b7fe21e_blue-bunny-batman-ice-cream-pop-boston-legend-ice-cream-truck.avif",
    category: "Character Faces",
    brand: "Blue Bunny",
    allergens: ["Milk", "Soy"],
    dietary: ["Vegetarian", "Gluten-Free"]
  },
  {
    id: "bubble-gum-snow-cone",
    name: "Bubble Gum Snow Cone",
    slug: "bubble-gum-snow-cone",
    description: "Classic carnival snow cone infused with sweet, nostalgic bubble gum flavor.",
    image: "/images/menu/681dcaac4788cab08f6bc390_blue-bunny-bubble-gum-snow-cone-boston-legend-ice-cream-truck.avif",
    category: "Cones",
    brand: "Blue Bunny",
    allergens: ["Milk", "Wheat", "Soy"],
    dietary: ["Vegetarian"]
  },
  {
    id: "vanilla-cone",
    name: "Vanilla Cone",
    slug: "vanilla-cone",
    description: "A large, crispy sugar cone generously filled with classic, creamy vanilla ice cream.",
    image: "/images/menu/681dca47a36331be9154fea4_blue-bunny-big-dipper-vanilla-cone-ice-cream--boston-legend-ice-cream-truck.avif",
    category: "Cones",
    brand: "Blue Bunny",
    allergens: ["Milk", "Wheat", "Soy"],
    dietary: ["Vegetarian"]
  },
  {
    id: "chocolate-lovers-cone",
    name: "Chocolate Lovers Cone",
    slug: "chocolate-lovers-cone",
    description: "Chocolate ice cream in a chocolate cone, topped with fudge and chocolate curls.",
    image: "/images/menu/681dca25fa3b03f5c6339fff_blue-bunny-big-dipper-chocolate-lovers-cone-boston-legend-ice-cream-truck.avif",
    category: "Cones",
    brand: "Blue Bunny",
    allergens: ["Milk", "Wheat", "Soy"],
    dietary: ["Vegetarian"]
  },
  {
    id: "strawberry-burst-cone",
    name: "Strawberry Burst Cone",
    slug: "strawberry-burst-cone",
    description: "A crispy cone packed with strawberry ice cream and a sweet fruit swirl.",
    image: "/images/menu/681dca303866726bc8181b4d_blue-bunny-big-dipper-strawberry-burst-cone-boston-legend-ice-cream-truck.avif",
    category: "Cones",
    brand: "Blue Bunny",
    allergens: ["Milk", "Wheat", "Soy"],
    dietary: ["Vegetarian"]
  },
  {
    id: "spongebob-ice-cream",
    name: "Spongebob Ice Cream",
    slug: "spongebob-ice-cream",
    description: "The iconic SpongeBob SquarePants face featuring fruit punch and cotton candy flavors with gumball eyes.",
    image: "/images/menu/681dce03fd5dc9845c9c371b_popsicle-spongebob-ice-cream-boston-legend-ice-cream-truck.avif",
    category: "Character Faces",
    brand: "Popsicle",
    allergens: ["Milk", "Soy"],
    dietary: ["Vegetarian", "Gluten-Free"]
  },
  {
    id: "spider-man-bar",
    name: "Spider-Man Bar",
    slug: "spider-man-bar",
    description: "Your friendly neighborhood Spider-Man in a delicious cherry and lemon flavored frozen treat.",
    image: "/images/menu/681dcdd9db2e74e2a333174a_popsicle-marvel-spider-man-bar-ice-cream-frozen-confection-boston-legend-ice-cream-truck.avif",
    category: "Character Faces",
    brand: "Popsicle",
    allergens: ["Milk", "Soy"],
    dietary: ["Vegetarian", "Gluten-Free"]
  },
  {
    id: "minions-bar",
    name: "Minions Bar",
    slug: "minions-bar",
    description: "A fun, minion-shaped frozen treat with a sweet and fruity flavor profile.",
    image: "/images/menu/681dcdbda36331be91574a14_popsicle-despicable-me-minions-bar-a-case-ice-cream-boston-legend-ice-cream-truck.avif",
    category: "Character Faces",
    brand: "Popsicle",
    allergens: ["Milk", "Soy"],
    dietary: ["Vegetarian", "Gluten-Free"]
  },
  {
    id: "minion-blue",
    name: "Minion Blue",
    slug: "minion-blue",
    description: "A fun, minion-shaped frozen treat with a sweet and fruity flavor profile.",
    image: "/images/menu/681dcda60b5e391465a98599_Minion-Despicable-Me-Blue-boston-legend-ice-cream-truck.avif",
    category: "Character Faces",
    brand: "Popsicle",
    allergens: ["Milk", "Soy"],
    dietary: ["Vegetarian", "Gluten-Free"]
  },
  {
    id: "ninja-turtle-bar",
    name: "Ninja Turtle Bar",
    slug: "ninja-turtle-bar",
    description: "A heroes-in-a-half-shell treat! Delicious cherry and green apple flavors with gumball eyes.",
    image: "/images/menu/681dcb70fa3b03f5c6346e8f_blue-bunny-ninja-turtle-bar-boston-legend-ice-cream-truck.avif",
    category: "Character Faces",
    brand: "Blue Bunny",
    allergens: ["Milk", "Soy"],
    dietary: ["Vegetarian", "Gluten-Free"]
  },
  {
    id: "tweety-bird-rainbow",
    name: "Tweety Bird Rainbow",
    slug: "tweety-bird-rainbow",
    description: "A colorful, multi-flavored pop featuring everyone's favorite canary.",
    image: "/images/menu/681dcb5e75363c37d4cd41c1_blue-bunny-looney-tunes-tweety-bird-rainbow-ice-cream-boston-legend-ice-cream-truck.avif",
    category: "Character Faces",
    brand: "Blue Bunny",
    allergens: ["Milk", "Soy"],
    dietary: ["Vegetarian", "Gluten-Free"]
  },
  {
    id: "sonic-hedgehog-bar",
    name: "Sonic Hedgehog Bar",
    slug: "sonic-hedgehog-bar",
    description: "Gotta go fast! A blue raspberry and cherry treat modeled after Sonic, complete with gumball eyes.",
    image: "/images/menu/681dca0ccd05763e5b731823_blue-bunny-sonic-hedgehog-bar-boston-legend-ice-cream-truck.avif",
    category: "Character Faces",
    brand: "Blue Bunny",
    allergens: ["Milk", "Soy"],
    dietary: ["Vegetarian", "Gluten-Free"]
  },
  {
    id: "powerpuff-girls-bar",
    name: "Powerpuff Girls Bar",
    slug: "powerpuff-girls-bar",
    description: "Saving the world before bedtime with this sweet, fruity, and colorful character bar.",
    image: "/images/menu/681dca01eccf382ddb2c0d3c_blue-bunny-powerpuff-girls-bar-boston-legend-ice-cream-truck.avif",
    category: "Character Faces",
    brand: "Blue Bunny",
    allergens: ["Milk", "Soy"],
    dietary: ["Vegetarian", "Gluten-Free"]
  },
  {
    id: "angry-bird-bar",
    name: "Angry Bird Bar",
    slug: "angry-bird-bar",
    description: "A fun character face bar featuring sweet cherry and lemon flavors.",
    image: "/images/menu/681dc84fcd05763e5b71dd8f_blue-bunny-angry-bird-ice-cream-boston-legend-ice-cream-truck.avif",
    category: "Character Faces",
    brand: "Blue Bunny",
    allergens: ["Milk", "Soy"],
    dietary: ["Vegetarian", "Gluten-Free"]
  },
];
