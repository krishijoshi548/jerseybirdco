export interface JerseyOption {
  edition: string; // e.g. "Authentic Player Issue", "Stadium Replica", "Long Sleeve", "Retro Classic"
  priceUSD: number;
  priceGBP: number;
  priceEUR: number;
  features: string;
}

export interface JerseyBlog {
  id: string;
  title: string;
  team: string;
  teamType: 'Premier League' | 'National Team';
  season: '2024/25' | '2023/24' | '2022/23' | '2021/22' | '2019/20' | '2018/19';
  kitType: 'Home' | 'Away' | 'Third' | 'Special Edition';
  rating: number; // e.g. 9.4
  readingTime: string;
  publishDate: string;
  
  // Pricing & Options information
  priceUSD: number; // base price (Replica)
  priceUSDAuthentic: number; // pro/match edition
  availableOptions: JerseyOption[];
  availableSizes: string[];
  sleeveOptions: string[];
  badgeOptions: { name: string; priceUSD: number }[];
  inStockStatus: 'In Stock' | 'Limited Stock' | 'Sold Out (Collector Value)' | 'Pre-Order';
  retailers: { name: string; estimatedPrice: string; inStock: boolean }[];

  author: {
    name: string;
    avatar: string;
    role: string;
  };
  image: string;
  accentColor: string;
  shortDescription: string;
  designStory: string;
  fabricTech: string;
  collarStyle: string;
  keyDetails: string[];
  iconicMoment: string;
  marketRarity: 'Common' | 'Collector Favourite' | 'High Demand Grail' | 'Historic Iconic';
}

export const JERSEY_BLOGS: JerseyBlog[] = [
  {
    id: 'arsenal-home-2023-24',
    title: 'Arsenal Home Kit 2023/24: The Invincibles Gold Homage',
    team: 'Arsenal FC',
    teamType: 'Premier League',
    season: '2023/24',
    kitType: 'Home',
    rating: 9.3,
    readingTime: '4 min read',
    publishDate: 'Aug 14, 2023',
    priceUSD: 95,
    priceUSDAuthentic: 150,
    availableOptions: [
      {
        edition: 'Authentic Pro Player Issue',
        priceUSD: 150,
        priceGBP: 125,
        priceEUR: 145,
        features: 'Exact player-spec athletic cut with heat-transferred metallic gold crests & ultralight jacquard weave.'
      },
      {
        edition: 'Stadium Replica (Fan Fit)',
        priceUSD: 95,
        priceGBP: 80,
        priceEUR: 90,
        features: 'Standard regular street fit with high-density embroidered crest and durable breathable poly.'
      },
      {
        edition: 'Long Sleeve Edition',
        priceUSD: 105,
        priceGBP: 90,
        priceEUR: 100,
        features: 'Full-length ribbed cuff sleeves with unbroken shoulder striping and Invincibles side tape.'
      },
      {
        edition: 'Junior / Youth Kit',
        priceUSD: 70,
        priceGBP: 55,
        priceEUR: 65,
        features: 'Includes shirt and shorts set tailored for young Gooners.'
      }
    ],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    sleeveOptions: ['Short Sleeve', 'Long Sleeve (+ $10)'],
    badgeOptions: [
      { name: 'Official Premier League Sleeve Badge', priceUSD: 12 },
      { name: 'UEFA Champions League Starball + Foundation Badge', priceUSD: 18 },
      { name: 'No Badges (Clean Pitch Look)', priceUSD: 0 }
    ],
    inStockStatus: 'Limited Stock',
    retailers: [
      { name: 'Official Arsenal Direct Store', estimatedPrice: '$95', inStock: true },
      { name: 'Kitbag Football', estimatedPrice: '$92', inStock: true },
      { name: 'Subside Sports Vintage', estimatedPrice: '$110', inStock: false }
    ],
    author: {
      name: 'Theo Sterling',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      role: 'Kit Pricing & Specs Editor'
    },
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#EF0107',
    shortDescription: 'Marking the 20th anniversary of the 2003/04 Invincibles campaign, Arsenal infused their traditional scarlet body with radiant lightning gold trims and record stitching.',
    designStory: 'Two decades after Arsène Wenger’s men completed an unprecedented 38-game unbeaten league journey, this kit delivered one of the most culturally resonant shirts of the Emirates era. The shirt pairs the signature bright red core and clean white raglan sleeves with metallic gold embroidery across the crest outline and trim. An embossed lightning pattern streaks subtly through the fabric weave, calling back to the iconic 1995/96 away graphic.',
    fabricTech: 'Breathable Jacquard with engineered moisture-wicking weave',
    collarStyle: 'Ribbed crewneck with interior W-D-L unbeaten record tape',
    keyDetails: [
      '26 Wins, 12 Draws record stitched into side seam',
      'Metallic gold crest and chest detailing',
      'Subtle tonal lightning bolt jacquard weave',
      'White raglan sleeves with golden shoulder striping'
    ],
    iconicMoment: 'Declan Rice celebrating his 96th-minute stoppage-time winner against Manchester United at the roaring Emirates.',
    marketRarity: 'Collector Favourite'
  },
  {
    id: 'england-away-2024-25',
    title: 'England Away Kit 2024/25: The Renaissance Purple Statement',
    team: 'England National Team',
    teamType: 'National Team',
    season: '2024/25',
    kitType: 'Away',
    rating: 9.1,
    readingTime: '5 min read',
    publishDate: 'Apr 20, 2024',
    priceUSD: 100,
    priceUSDAuthentic: 160,
    availableOptions: [
      {
        edition: 'Authentic Match Pro Vapor',
        priceUSD: 160,
        priceGBP: 135,
        priceEUR: 155,
        features: 'Laser-perforated chest mapping and seamless heat-sealed federation crest.'
      },
      {
        edition: 'Stadium Supporter Replica',
        priceUSD: 100,
        priceGBP: 85,
        priceEUR: 95,
        features: 'Everyday comfortable cut with woven Three Lions badge and ribbed graphic side tape.'
      },
      {
        edition: 'Women’s Fit Cut',
        priceUSD: 100,
        priceGBP: 85,
        priceEUR: 95,
        features: 'Contoured athletic cut engineered specifically for the Lionesses.'
      }
    ],
    availableSizes: ['S', 'M', 'L', 'XL', '2XL'],
    sleeveOptions: ['Short Sleeve Only'],
    badgeOptions: [
      { name: 'UEFA Euro 2024 Tournament Patch', priceUSD: 15 },
      { name: 'UEFA Foundation For Children Patch', priceUSD: 8 },
      { name: 'Custom Name & Number (Bellingham 10, Kane 9)', priceUSD: 20 }
    ],
    inStockStatus: 'In Stock',
    retailers: [
      { name: 'England FA Official Store', estimatedPrice: '$100', inStock: true },
      { name: 'Fanatics International', estimatedPrice: '$98', inStock: true },
      { name: 'Pro:Direct Soccer', estimatedPrice: '$100', inStock: true }
    ],
    author: {
      name: 'Oliver Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      role: 'International Kits Specialist'
    },
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#4A154B',
    shortDescription: 'Merging England’s traditional navy and royal away colors with red accents to pioneer an unreleased deep raisin purple shade, accented by vibrant multi-colored side panels.',
    designStory: 'Subverting decades of red and royal blue away strips, the 2024 England change shirt adopts an opulent deep raisin purple. Seven complementary hues accent the graphic rib trim along the flank, while the golden Three Lions crest shines against the dark backdrop. This jersey sparked national debate while rapidly becoming a modern lifestyle staple.',
    fabricTech: '4D data-mapped breathability matrix with cooling micro-mesh',
    collarStyle: 'Foldover polo-hybrid collar with stylized miniature cross detail on nape',
    keyDetails: [
      'Bespoke raisin purple base with iridescent gold-threaded crest',
      'Seven-color graphic side ribbing inspired by British tailoring',
      'St. George cross detail on the back neck collar',
      'Modern slim athletic contour cut'
    ],
    iconicMoment: 'Jude Bellingham executing his acrobatic bicycle kick in Gelsenkirchen during the Euro 2024 knockout comeback.',
    marketRarity: 'Collector Favourite'
  },
  {
    id: 'man-city-home-2023-24',
    title: 'Manchester City Treble Kit 2023/24: 20 Years at Etihad Stadium',
    team: 'Manchester City',
    teamType: 'Premier League',
    season: '2023/24',
    kitType: 'Home',
    rating: 9.5,
    readingTime: '4 min read',
    publishDate: 'Jun 12, 2023',
    priceUSD: 90,
    priceUSDAuthentic: 140,
    availableOptions: [
      {
        edition: 'Authentic Match Edition (72g Ultra)',
        priceUSD: 140,
        priceGBP: 120,
        priceEUR: 135,
        features: 'Featherlight 72g 4-way stretch fabric with bonded seams for elite aerodynamic movement.'
      },
      {
        edition: 'Standard Stadium Fan Replica',
        priceUSD: 90,
        priceGBP: 75,
        priceEUR: 85,
        features: 'Durable double-knit construction with embroidered City crest and comfortable standard cut.'
      },
      {
        edition: 'Official Treble Winners Gold Box Set',
        priceUSD: 195,
        priceGBP: 165,
        priceEUR: 185,
        features: 'Numbered commemorative presentation box with Champions League, EPL, and FA Cup badges.'
      }
    ],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    sleeveOptions: ['Short Sleeve', 'Long Sleeve (+ $12)'],
    badgeOptions: [
      { name: 'Official Gold Premier League Champions Badge', priceUSD: 15 },
      { name: 'Champions League Winners Title Patch', priceUSD: 18 },
      { name: 'FIFA Club World Cup Gold Chest Shield', priceUSD: 15 }
    ],
    inStockStatus: 'Limited Stock',
    retailers: [
      { name: 'Man City Official Online Store', estimatedPrice: '$90', inStock: true },
      { name: 'JD Sports UK', estimatedPrice: '$85', inStock: true },
      { name: 'Classic Football Shirts', estimatedPrice: '$130', inStock: true }
    ],
    author: {
      name: 'Liam Gallagher',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      role: 'Premier League Apparel Writer'
    },
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#6CABDD',
    shortDescription: 'Honoring the 20th anniversary of City’s move from Maine Road to the Etihad with tonal column vertical striping modeled on the stadium’s spiral walkways.',
    designStory: 'Arriving right as Pep Guardiola’s side clinched the continental treble, this shirt is indelibly tied to an epoch of supreme dominance. Tonal vertical stripes run across the sky blue torso, replicating the four iconic cylindrical concrete spiral walkways that greet visitors at the Etihad Stadium. Crisp white V-neck and sleeve tipping provide timeless contrast.',
    fabricTech: 'Four-way engineered stretch fabric weighing just 72 grams',
    collarStyle: 'Ribbed V-neck inspired by the 2003/04 inaugural stadium season kit',
    keyDetails: [
      'Four tonal columns referencing Etihad spiral walkways',
      'Postcode M11 3FF and stadium architecture graphic inside neckline',
      'Featherweight 72g performance chassis',
      'Official Gold Premier League champions arm sleeve badge integration'
    ],
    iconicMoment: 'Rodri scoring the decisive Champions League final strike in Istanbul, sealing the historic European Treble.',
    marketRarity: 'Historic Iconic'
  },
  {
    id: 'nigeria-home-2018-19',
    title: 'Nigeria "Naija" Home Kit 2018/19: The Cultural Fashion Phenomenon',
    team: 'Nigeria National Team',
    teamType: 'National Team',
    season: '2018/19',
    kitType: 'Home',
    rating: 9.9,
    readingTime: '6 min read',
    publishDate: 'Jun 05, 2018',
    priceUSD: 110,
    priceUSDAuthentic: 220,
    availableOptions: [
      {
        edition: 'Original 2018 World Cup Deadstock Replica',
        priceUSD: 110,
        priceGBP: 95,
        priceEUR: 105,
        features: 'Original release run with Sub Lime chevron graphics and Super Eagles woven shield.'
      },
      {
        edition: 'Collector Player Issue VaporKnit',
        priceUSD: 220,
        priceGBP: 185,
        priceEUR: 210,
        features: 'Rare player-spec mesh with heat-bonded federation crest and athletic taper.'
      },
      {
        edition: 'Naija Streetwear Track Top & Pants Set',
        priceUSD: 140,
        priceGBP: 120,
        priceEUR: 130,
        features: 'Full matching zip warm-up tracksuit with matching floral sleeve pattern.'
      }
    ],
    availableSizes: ['S', 'M', 'L', 'XL'],
    sleeveOptions: ['Short Sleeve Only'],
    badgeOptions: [
      { name: 'FIFA World Cup Russia 2018 Official Patch', priceUSD: 20 },
      { name: 'Living Football FIFA Fair Play Sleeve Badge', priceUSD: 10 }
    ],
    inStockStatus: 'Sold Out (Collector Value)',
    retailers: [
      { name: 'StockX / Stadium Goods', estimatedPrice: '$210 - $290', inStock: true },
      { name: 'Classic Football Shirts London', estimatedPrice: '$180', inStock: false },
      { name: 'Grailed Verified', estimatedPrice: '$195', inStock: true }
    ],
    author: {
      name: 'Amara Okafor',
      avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=150&q=80',
      role: 'Football & Streetwear Curator'
    },
    image: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#008751',
    shortDescription: 'Selling 3 million pre-orders in hours and shutting down London retail queues, this 1994 tribute revolutionized the intersection of football and high street fashion.',
    designStory: 'No modern football jersey transformed fashion culture quite like Nigeria’s 2018 World Cup home kit. Drawing direct inspiration from the iconic 1994 Nigerian squad, it features an electrifying green and white eagle feather chevron on the torso paired with black and white chevrons over the sleeves. The release became an instant fashion holy grail, praised by Vogue, GQ, and pitch purists alike.',
    fabricTech: 'Fast Fit open-hole zonal ventilation mesh',
    collarStyle: 'Ergonomic cross-over V-neck with soft-brushed interior seam',
    keyDetails: [
      'Sub Lime vibrant green chevron torso pattern',
      'Monochrome black and white feather print sleeves',
      'Naija wordmark internal crown badge',
      'Sold out 3M units globally within 3 minutes of release'
    ],
    iconicMoment: 'Ahmed Musa striking his thunderous brace against Iceland in Volgograd during the 2018 FIFA World Cup group stage.',
    marketRarity: 'High Demand Grail'
  },
  {
    id: 'liverpool-home-2019-20',
    title: 'Liverpool Home Kit 2019/20: The 30-Year Premier League Title Breaker',
    team: 'Liverpool FC',
    teamType: 'Premier League',
    season: '2019/20',
    kitType: 'Home',
    rating: 9.4,
    readingTime: '4 min read',
    publishDate: 'Jul 24, 2020',
    priceUSD: 85,
    priceUSDAuthentic: 135,
    availableOptions: [
      {
        edition: 'Premier League Champions Commemorative Edition',
        priceUSD: 135,
        priceGBP: 110,
        priceEUR: 125,
        features: 'Special edition with gold Champions sleeve badge and 19/20 winners box presentation.'
      },
      {
        edition: 'Standard Stadium Fan Replica',
        priceUSD: 85,
        priceGBP: 70,
        priceEUR: 80,
        features: 'Deep crimson body with white pinstripes and embroidered gold Liver Bird.'
      },
      {
        edition: 'Long Sleeve Paisley Tribute',
        priceUSD: 98,
        priceGBP: 82,
        priceEUR: 92,
        features: 'Full length sleeves with white cuff trims and inner collar gold signature.'
      }
    ],
    availableSizes: ['S', 'M', 'L', 'XL', '2XL'],
    sleeveOptions: ['Short Sleeve', 'Long Sleeve'],
    badgeOptions: [
      { name: 'Premier League 2019/20 Champions Gold Badge', priceUSD: 16 },
      { name: 'FIFA Club World Cup Champions Gold Badge', priceUSD: 15 },
      { name: 'Western Union Left Sleeve Sponsor', priceUSD: 8 }
    ],
    inStockStatus: 'Limited Stock',
    retailers: [
      { name: 'Anfield Official Club Store', estimatedPrice: '$85', inStock: false },
      { name: 'Subside Sports', estimatedPrice: '$95', inStock: true },
      { name: 'Classic Football Shirts', estimatedPrice: '$115', inStock: true }
    ],
    author: {
      name: 'Callum Hughes',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
      role: 'Merseyside Archive Lead'
    },
    image: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#C8102E',
    shortDescription: 'The shirt that ended Liverpool’s 30-year English league title drought, featuring subtle white pinstripes honoring legendary manager Bob Paisley’s centenary.',
    designStory: 'Commemorating 100 years since the birth of the club’s most decorated manager Bob Paisley OBE, the kit incorporates delicate white pinstripes running through rich crimson fabric. With Paisley’s signature stamped inside the collar in gold, this jersey carried Jürgen Klopp’s record-breaking squad to 99 league points and the historic trophy lift.',
    fabricTech: 'Moisture-release yarn with body-mapped side ventilation slits',
    collarStyle: 'Classic rounded neck with golden interior Paisley signature print',
    keyDetails: [
      'Bob Paisley signature in gold on the inner neckline',
      'White pinstripe front panel evoking the 1982/83 championship shirt',
      'Embroidered gold Liver Bird crest and Eternal Flame 96 tribute on nape',
      'Worn during the 30-year Premier League title coronation'
    ],
    iconicMoment: 'Jordan Henderson lifting the Premier League trophy on the Kop stand surrounded by fireworks in an empty Anfield.',
    marketRarity: 'Historic Iconic'
  },
  {
    id: 'japan-home-2022-23',
    title: 'Japan Home Kit 2022/23: Origami Crane Flight Across Qatar',
    team: 'Japan National Team',
    teamType: 'National Team',
    season: '2022/23',
    kitType: 'Home',
    rating: 9.7,
    readingTime: '5 min read',
    publishDate: 'Sep 02, 2022',
    priceUSD: 100,
    priceUSDAuthentic: 155,
    availableOptions: [
      {
        edition: 'Authentic Pro Player Match Version',
        priceUSD: 155,
        priceGBP: 130,
        priceEUR: 145,
        features: 'Primeblue recycled marine ocean plastic yarn with heat-applied rubber Yatagarasu crest.'
      },
      {
        edition: 'Stadium Replica (Fan Fit)',
        priceUSD: 100,
        priceGBP: 85,
        priceEUR: 95,
        features: 'Allover glitch origami print with woven crest and standard ergonomic cut.'
      },
      {
        edition: 'Special Manga Edition Box Set',
        priceUSD: 180,
        priceGBP: 150,
        priceEUR: 170,
        features: 'Includes limited anime illustrated collector box, match day booklet, and woven badge.'
      }
    ],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    sleeveOptions: ['Short Sleeve Only'],
    badgeOptions: [
      { name: 'FIFA World Cup Qatar 2022 Sleeve Badge', priceUSD: 15 },
      { name: 'JFA 100th Anniversary Commemorative Emblem', priceUSD: 14 }
    ],
    inStockStatus: 'In Stock',
    retailers: [
      { name: 'JFA Japan National Team Store', estimatedPrice: '$100', inStock: true },
      { name: 'Soccer.com', estimatedPrice: '$98', inStock: true },
      { name: 'Kitbag International', estimatedPrice: '$100', inStock: true }
    ],
    author: {
      name: 'Kenji Takahashi',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      role: 'East Asian Football Apparel Specialist'
    },
    image: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#002B7F',
    shortDescription: 'Conceived around the mythical three-legged crow Yatagarasu and traditional paper origami cranes, this kit dazzled as the Samurai Blue toppled world champions.',
    designStory: 'Graphic artists collaborated to design a jersey celebrating Japanese cultural craft. A dynamic glitch pattern of folded paper cranes takes flight across the deep blue jersey, symbolizing prayer for good fortune and victory. Its on-pitch pedigree was cemented when Hajime Moriyasu’s spirited team pulled off stunning comebacks against Germany and Spain.',
    fabricTech: 'Recycled ocean Primeblue aerated yarn with breathable zones',
    collarStyle: 'Sharp ribbed overlap collar with red accent striping at the rear',
    keyDetails: [
      'Glitch-origami origami crane wing repeat pattern',
      'Deep Samurai Blue with solar red back collar accents',
      'Yatagarasu three-legged crow federation crest with gold star',
      'Japanese national flag on inner neck tag'
    ],
    iconicMoment: 'Kaoru Mitoma keeping the ball in play by 1.88 millimeters to assist Ao Tanaka’s winner against Spain.',
    marketRarity: 'High Demand Grail'
  },
  {
    id: 'west-ham-home-2023-24',
    title: 'West Ham United Home Kit 2023/24: Bubbles in the London Stadium Sky',
    team: 'West Ham United',
    teamType: 'Premier League',
    season: '2023/24',
    kitType: 'Home',
    rating: 8.8,
    readingTime: '4 min read',
    publishDate: 'Jul 15, 2023',
    priceUSD: 85,
    priceUSDAuthentic: 125,
    availableOptions: [
      {
        edition: 'Authentic Pro Player Issue',
        priceUSD: 125,
        priceGBP: 105,
        priceEUR: 115,
        features: 'Elite pro-fit fabric with laser-cut underarm aeration and silicone crest.'
      },
      {
        edition: 'Standard Stadium Fan Replica',
        priceUSD: 85,
        priceGBP: 70,
        priceEUR: 80,
        features: 'Woven Hammers crest, classic claret & sky blue sleeves, standard relaxed cut.'
      },
      {
        edition: 'Long Sleeve East London Cut',
        priceUSD: 95,
        priceGBP: 80,
        priceEUR: 90,
        features: 'Full sky blue sleeves with white tipping on the wrist cuffs.'
      }
    ],
    availableSizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    sleeveOptions: ['Short Sleeve', 'Long Sleeve (+ $10)'],
    badgeOptions: [
      { name: 'UEFA Europa Conference League Winners Patch', priceUSD: 15 },
      { name: 'Premier League Official Lion Sleeve Patch', priceUSD: 12 }
    ],
    inStockStatus: 'In Stock',
    retailers: [
      { name: 'Official West Ham Direct Store', estimatedPrice: '$85', inStock: true },
      { name: 'Kitbag Football', estimatedPrice: '$80', inStock: true }
    ],
    author: {
      name: 'George Bowden',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
      role: 'Heritage Kit Correspondent'
    },
    image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#7A263A',
    shortDescription: 'Following their Europa Conference League triumph in Prague, this strip wove iridescent rising bubble rings straight into the classic claret fabric.',
    designStory: 'Capturing East London football heritage, the 2023/24 home shirt for West Ham United embodies East London tradition. Celebrating the historic anthem "I’m Forever Blowing Bubbles", subtle circular bubble motifs are woven directly into the rich claret front panel. Paired with sky blue sleeves and white contrast cuffs, it strikes a balance between romance and grit.',
    fabricTech: 'Micro-vented double knit polyester with quick dry finish',
    collarStyle: 'Classic round neckline with sky blue insert trim',
    keyDetails: [
      'Engineered bubble watermark jacquard weave',
      'Sky blue raglan sleeves with twin white pin-stripes',
      'Embroidered crossed hammers crest on the heart',
      'Post-European trophy winners commemorative patch option'
    ],
    iconicMoment: 'Jarrod Bowen lifting his boots after scoring the dramatic 90th-minute Prague winner.',
    marketRarity: 'Collector Favourite'
  },
  {
    id: 'argentina-home-2022-23',
    title: 'Argentina 3-Star World Cup Home Kit 2022/23: The Messi Coronation',
    team: 'Argentina National Team',
    teamType: 'National Team',
    season: '2022/23',
    kitType: 'Home',
    rating: 9.9,
    readingTime: '6 min read',
    publishDate: 'Dec 22, 2022',
    priceUSD: 110,
    priceUSDAuthentic: 180,
    availableOptions: [
      {
        edition: 'Official 3-Star Campeones del Mundo Authentic',
        priceUSD: 180,
        priceGBP: 155,
        priceEUR: 175,
        features: 'Authentic pro match cut with 3 embroidered golden stars and gold FIFA World Champions chest crest.'
      },
      {
        edition: 'Stadium Replica 3-Star (Fan Edition)',
        priceUSD: 110,
        priceGBP: 90,
        priceEUR: 100,
        features: 'Classic Albiceleste vertical stripes with embroidered 3-star AFA crest.'
      },
      {
        edition: 'Long Sleeve Qatar Final Edition',
        priceUSD: 125,
        priceGBP: 105,
        priceEUR: 118,
        features: 'Full-length sky blue and white sleeves with black shoulder stripe accents.'
      }
    ],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    sleeveOptions: ['Short Sleeve', 'Long Sleeve'],
    badgeOptions: [
      { name: 'FIFA World Champions 2022 Gold Chest Badge', priceUSD: 18 },
      { name: 'Official Messi 10 Name & Number Set', priceUSD: 25 },
      { name: 'World Cup Qatar 2022 Sleeve Badges (Pair)', priceUSD: 20 }
    ],
    inStockStatus: 'Limited Stock',
    retailers: [
      { name: 'AFA Official Federation Store', estimatedPrice: '$110', inStock: false },
      { name: 'Fanatics Soccer', estimatedPrice: '$110', inStock: true },
      { name: 'Classic Football Shirts', estimatedPrice: '$165', inStock: true }
    ],
    author: {
      name: 'Julian Navarro',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
      role: 'Latin American Football Editor'
    },
    image: 'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#75AADB',
    shortDescription: 'The greatest kit of a generation. The Albiceleste stripes adorned with the golden Sun of May on the nape, crowned forever by three golden stars in Qatar.',
    designStory: 'Worn during the most dramatic World Cup final in football history at Lusail Stadium, this shirt features four sky blue vertical stripes on the front and back against crisp optic white. The national emblem "Sol de Mayo" is stamped in gold metallic beneath the collar. Following the penalty shootout victory over France, the third star was added above the crest, cementing its immortal status in sports lore.',
    fabricTech: 'Ultralight cooling mesh with laser-perforated collar vents',
    collarStyle: 'Black rib-knit crew collar with sky blue central stripe',
    keyDetails: [
      'Traditional Albiceleste vertical sky blue and white stripes',
      'Golden Sun of May (Sol de Mayo) national emblem at back of neck',
      'Third golden embroidered star symbolizing the 1978, 1986 & 2022 titles',
      'Black stripes running down the shoulders for heritage 70s contrast'
    ],
    iconicMoment: 'Lionel Messi draped in the golden Bisht cloak, lifting the FIFA World Cup trophy aloft in Doha.',
    marketRarity: 'Historic Iconic'
  },
  {
    id: 'chelsea-third-2021-22',
    title: 'Chelsea Third Kit 2021/22: Streetwear Neon & London Energy',
    team: 'Chelsea FC',
    teamType: 'Premier League',
    season: '2021/22',
    kitType: 'Third',
    rating: 8.9,
    readingTime: '4 min read',
    publishDate: 'Sep 09, 2021',
    priceUSD: 85,
    priceUSDAuthentic: 135,
    availableOptions: [
      {
        edition: 'Authentic Match Vapor Pro',
        priceUSD: 135,
        priceGBP: 115,
        priceEUR: 125,
        features: 'Raised silicone monochromatic club crest and hyper crimson accents.'
      },
      {
        edition: 'Stadium Replica (Fan Fit)',
        priceUSD: 85,
        priceGBP: 70,
        priceEUR: 80,
        features: 'Everyday comfortable cut with woven badge and bold brushstroke pattern.'
      }
    ],
    availableSizes: ['S', 'M', 'L', 'XL'],
    sleeveOptions: ['Short Sleeve Only'],
    badgeOptions: [
      { name: 'UEFA Champions League Starball + 2-Times Winners Patch', priceUSD: 16 },
      { name: 'Premier League Sleeve Patch', priceUSD: 12 }
    ],
    inStockStatus: 'In Stock',
    retailers: [
      { name: 'Chelsea FC Megastore Online', estimatedPrice: '$85', inStock: true },
      { name: 'Kitbag Football', estimatedPrice: '$82', inStock: true }
    ],
    author: {
      name: 'Marcus Bell',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80',
      role: 'Modern Kit Critic'
    },
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#001489',
    shortDescription: 'Infused with London streetwear energy, this third shirt combined a deep black and teal camo graphic with razor-sharp Crimson pops along the collar and crest.',
    designStory: 'Taking inspiration from Chelsea’s King’s Road fashion origins and modern British streetwear, the 2021/22 third shirt represents a radical departure from traditional royal blue. An expressive, brushstroke houndstooth and camo texture flows across dark teal and black fields, punctuated by vibrant Hyper Crimson accents that glow during floodlit European away fixtures.',
    fabricTech: '100% recycled polyester jacquard with breathable zones',
    collarStyle: 'Ergonomic hybrid crew with neon contrast taping',
    keyDetails: [
      'Allover brushstroke abstract pattern in Blustery teal and black',
      'Hyper Crimson silicone Swoosh and monochromatic club crest',
      'Pride of London crest graphic inside back collar',
      'Asymmetrical side striping with subtle lion engravings'
    ],
    iconicMoment: 'Kai Havertz leading Chelsea’s attack under the lights in the Champions League group stage.',
    marketRarity: 'Common'
  },
  {
    id: 'newcastle-home-2023-24',
    title: 'Newcastle United Home Kit 2023/24: The Champions League Return',
    team: 'Newcastle United',
    teamType: 'Premier League',
    season: '2023/24',
    kitType: 'Home',
    rating: 9.0,
    readingTime: '4 min read',
    publishDate: 'Aug 08, 2023',
    priceUSD: 88,
    priceUSDAuthentic: 130,
    availableOptions: [
      {
        edition: 'Authentic Pro Player Match Edition',
        priceUSD: 130,
        priceGBP: 110,
        priceEUR: 120,
        features: 'Laser-cut underarm aeration holes and precision athletic fit.'
      },
      {
        edition: 'Standard Stadium Fan Replica',
        priceUSD: 88,
        priceGBP: 75,
        priceEUR: 82,
        features: 'Heritage 1980s retro split V-neck collar with woven silver crest.'
      },
      {
        edition: 'Long Sleeve Retro Classic',
        priceUSD: 98,
        priceGBP: 84,
        priceEUR: 92,
        features: 'Full monochrome striped sleeves with ribbed wrist bands.'
      }
    ],
    availableSizes: ['S', 'M', 'L', 'XL', '2XL'],
    sleeveOptions: ['Short Sleeve', 'Long Sleeve (+ $10)'],
    badgeOptions: [
      { name: 'UEFA Champions League Starball Patch', priceUSD: 15 },
      { name: 'Premier League Official Arm Badge', priceUSD: 12 },
      { name: 'Official Isak 14 or Guimarães 39 Custom Printing', priceUSD: 18 }
    ],
    inStockStatus: 'In Stock',
    retailers: [
      { name: 'Newcastle United Official Store', estimatedPrice: '$88', inStock: true },
      { name: 'JD Sports', estimatedPrice: '$85', inStock: true }
    ],
    author: {
      name: 'Scott Armstrong',
      avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=150&q=80',
      role: 'Tyneside Football Columnist'
    },
    image: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#000000',
    shortDescription: 'A pure 1980s retro-styled split collar and balanced monochrome stripes as St. James’ Park welcomed Champions League football after 20 years.',
    designStory: 'Newcastle United reached the Champions League for the first time in two decades. This vintage-inspired home shirt features a split V-neck collar, clean black and white stripes of equal proportion, and side split hems. The design struck a deep chord with fans longing for the iconic Keegan era.',
    fabricTech: 'Precision moisture-management weave with ergonomic stretch',
    collarStyle: 'Retro 80s ribbed crossover V-neck with twin pinstripe ribbing',
    keyDetails: [
      'Authentic balanced 5-stripe front pattern',
      'Dual-color tipped collar and sleeve cuffs',
      'Woven silver metallic crest detailing with Newcastle seahorses',
      'Laser-cut underarm aeration holes for elite European competition'
    ],
    iconicMoment: 'The unforgettable 4-1 thrashing of Paris Saint-Germain at an electric St. James’ Park in October 2023.',
    marketRarity: 'Collector Favourite'
  },
  {
    id: 'france-away-2024-25',
    title: 'France Away Kit 2024/25: The Grand Gallic Rooster',
    team: 'France National Team',
    teamType: 'National Team',
    season: '2024/25',
    kitType: 'Away',
    rating: 9.6,
    readingTime: '5 min read',
    publishDate: 'Apr 18, 2024',
    priceUSD: 105,
    priceUSDAuthentic: 165,
    availableOptions: [
      {
        edition: 'Authentic Match Pro Vapor',
        priceUSD: 165,
        priceGBP: 140,
        priceEUR: 160,
        features: 'Advanced 4D cooling mesh with oversized metallic golden rooster crest.'
      },
      {
        edition: 'Stadium Replica (Fan Fit)',
        priceUSD: 105,
        priceGBP: 88,
        priceEUR: 98,
        features: 'Optic white fabric with color-split vertical gradient pinstripes.'
      },
      {
        edition: 'Mbappé #10 Official Match Set',
        priceUSD: 130,
        priceGBP: 110,
        priceEUR: 122,
        features: 'Includes official gold font typography name and number set.'
      }
    ],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    sleeveOptions: ['Short Sleeve Only'],
    badgeOptions: [
      { name: 'UEFA Euro 2024 Official Tournament Patch', priceUSD: 15 },
      { name: 'UEFA Foundation Badge', priceUSD: 8 }
    ],
    inStockStatus: 'In Stock',
    retailers: [
      { name: 'FFF Official French Boutique', estimatedPrice: '$105', inStock: true },
      { name: 'Fanatics Europe', estimatedPrice: '$102', inStock: true },
      { name: 'Unisport Store', estimatedPrice: '$105', inStock: true }
    ],
    author: {
      name: 'Étienne Laurent',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      role: 'European Kit Correspondent'
    },
    image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#002654',
    shortDescription: 'Resurrecting the magnificent oversized 1980s Gallic rooster badge with dual-gradient blue and red pinstripes running across an elegant optic white canvas.',
    designStory: 'One of the most praised shirts of the international calendar, this strip reimagined the classic 1980s French away aesthetic. The centerpiece is the dramatically enlarged golden Gallic Rooster (Coq Gaulois), flanked by gradient vertical pinstripes that transition seamlessly from royal blue on the left to carmine red on the right. It reflects French haute couture while commanding pitch respect.',
    fabricTech: 'Advanced cooling weave with micro-perforations',
    collarStyle: 'Curved two-piece V-collar with interior Tricolore ribbon',
    keyDetails: [
      'Giant vintage oversized golden rooster crest',
      'Dual color-split pinstripes (blue to red)',
      'Subtle internal motto: "Nos différences nous unissent"',
      'Lightweight athletic contouring engineered for speed'
    ],
    iconicMoment: 'France unveiling the kit in front of 80,000 spectators at the Stade de France in Saint-Denis.',
    marketRarity: 'High Demand Grail'
  },
  {
    id: 'aston-villa-home-2024-25',
    title: 'Aston Villa Home Kit 2024/25: 150 Years of History in Claret & Gold',
    team: 'Aston Villa',
    teamType: 'Premier League',
    season: '2024/25',
    kitType: 'Home',
    rating: 9.2,
    readingTime: '4 min read',
    publishDate: 'Jul 23, 2024',
    priceUSD: 95,
    priceUSDAuthentic: 145,
    availableOptions: [
      {
        edition: '150th Anniversary Pro Player Edition',
        priceUSD: 145,
        priceGBP: 120,
        priceEUR: 135,
        features: 'Commemorative "AV 150" gold emblem hot-stamped on neck with player-cut stretch weave.'
      },
      {
        edition: 'Standard Stadium Fan Replica',
        priceUSD: 95,
        priceGBP: 80,
        priceEUR: 90,
        features: 'Deep claret body with sky blue sleeves and the new round Villa crest.'
      },
      {
        edition: 'Champions League Historic Edition',
        priceUSD: 115,
        priceGBP: 98,
        priceEUR: 108,
        features: 'Pre-fitted with official UEFA Champions League sleeve patches.'
      }
    ],
    availableSizes: ['S', 'M', 'L', 'XL', '2XL'],
    sleeveOptions: ['Short Sleeve', 'Long Sleeve (+ $10)'],
    badgeOptions: [
      { name: 'UEFA Champions League Starball Patch', priceUSD: 16 },
      { name: 'Premier League Lion Arm Patch', priceUSD: 12 },
      { name: 'Custom Name & Number (Watkins 11, Rogers 27)', priceUSD: 18 }
    ],
    inStockStatus: 'In Stock',
    retailers: [
      { name: 'Villa Store at Villa Park', estimatedPrice: '$95', inStock: true },
      { name: 'Fanatics International', estimatedPrice: '$92', inStock: true }
    ],
    author: {
      name: 'Harry Townsend',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      role: 'Historical Kits Analyst'
    },
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#670E36',
    shortDescription: 'To celebrate Villa’s 150th anniversary and Champions League qualification under Unai Emery, this inaugural kit pairs rich claret and gold typography.',
    designStory: 'Founded in 1874, Aston Villa is one of the foundational clubs of world football. To mark their sesquicentennial year and return to Europe’s top table, Villa released this landmark home kit. The shirt features an opulent claret torso, crisp sky blue sleeves, and a special commemorative "AV 150" gold emblem hot-stamped on the back neck.',
    fabricTech: 'Aerated stretch weave with metallic trims',
    collarStyle: 'Foldover crew collar with sky blue piping',
    keyDetails: [
      'Commemorative "150 Years: 1874 - 2024" golden emblem on back collar',
      'New simplified round Aston Villa crest with iconic lion rampant',
      'Classic sky blue sleeve contrast',
      'Worn during Villa’s memorable Champions League victory over Bayern Munich'
    ],
    iconicMoment: 'Jhon Durán scoring his breathtaking 40-yard lob against Bayern Munich at a jubilant Villa Park.',
    marketRarity: 'Collector Favourite'
  }
];

export const CATEGORIES = ['All', 'Premier League', 'National Team'] as const;
export const SEASONS = ['All', '2024/25', '2023/24', '2022/23', '2021/22', '2019/20', '2018/19'] as const;
export const KIT_TYPES = ['All', 'Home', 'Away', 'Third'] as const;
