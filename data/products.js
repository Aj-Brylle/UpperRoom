export const CATEGORIES = ['ALL', 'TEES', 'HOODIES', 'HATS', 'ACCESSORIES'];

export const products = [
  {
    id: 'acts-2-oversized-tee',
    name: 'Acts 2 White Oversized Tee',
    price: 98,
    category: 'TEES',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Purity White', hex: '#FFFFFF', border: '#E5E5E5' },
      { name: 'Onyx Black', hex: '#000000', border: '#000000' },
      { name: 'Alabaster Gray', hex: '#ECECEC', border: '#D0D0D0' },
    ],
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=85',
    ],
    fabric: '320 GSM Combed Ring-Spun Organic Cotton. Pre-shrunk, drop shoulder silhouette with high ribbed neckband.',
    description: 'An architectural everyday essential cut with deliberate drape. Subtle, tone-on-tone blind deboss of the UpperRoom monogram at the nape. Pure white cotton washed in botanical softeners for weightless structure.',
    scripture: {
      verse: 'Acts 2:1-4',
      passage: 'When the day of Pentecost arrived, they were all together in one place. And suddenly there came from heaven a sound like a mighty rushing wind.',
      reflection: 'The Upper Room was not merely an architectural chamber; it was the consecrated sanctuary where the believers tarried in unified expectation. This garment is constructed to embody holy patience and the quiet authority of divine presence.',
    },
    featured: true,
    inStock: true,
  },
  {
    id: 'ascension-heavyweight-hoodie',
    name: 'Ascension Heavyweight Hoodie',
    price: 195,
    category: 'HOODIES',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Purity White', hex: '#FFFFFF', border: '#E5E5E5' },
      { name: 'Onyx Black', hex: '#000000', border: '#000000' },
      { name: 'Heather Stone', hex: '#E2E2E2', border: '#D0D0D0' },
    ],
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1200&q=85',
    ],
    fabric: '480 GSM French Terry Fleece. Double-layer structured hood, blind-stitched hem, kangaroo pocket eliminated for clean architectural lines.',
    description: 'Sculptural French terry fleece in our signature optic white. Built without exterior drawstrings for a serene, monolithic profile. Finished with invisible side-seam pockets and micro-embroidered Roman numerals on the left wrist.',
    scripture: {
      verse: 'Acts 1:9-11',
      passage: 'And when he had said these things, as they were looking on, he was lifted up, and a cloud took him out of their sight.',
      reflection: 'A tribute to the promise that the same Lord who ascended in majesty shall return in unmarred purity. The heavy drape shields the wearer while serving as an everyday liturgy of hope.',
    },
    featured: true,
    inStock: true,
  },
  {
    id: 'covenant-boxy-mock-neck',
    name: 'Covenant Boxy Mock Neck',
    price: 125,
    category: 'TEES',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Purity White', hex: '#FFFFFF', border: '#E5E5E5' },
      { name: 'Onyx Black', hex: '#000000', border: '#000000' },
      { name: 'Off-White Ivory', hex: '#F5F5F3', border: '#D8D8D8' },
    ],
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=85',
    ],
    fabric: '360 GSM Heavy Jersey. Reinforced 1.75-inch standing mock collar, relaxed square body, seamless twin-needle hem.',
    description: 'A disciplined silhouette that balances casual ease with clerical reverence. The standing mock collar commands poise, while the oversized block provides effortless breathability throughout the day.',
    scripture: {
      verse: 'Hebrews 8:10',
      passage: 'For this is the covenant that I will make with the house of Israel after those days, declares the Lord: I will put my laws into their minds, and write them on their hearts.',
      reflection: 'The new covenant is not inscribed on cold stone, but living hearts. Clean, uninterrupted white cloth honoring inward purity and transformed conscience.',
    },
    featured: true,
    inStock: true,
  },
  {
    id: 'sanctuary-raw-edge-crewneck',
    name: 'Sanctuary Raw Edge Crewneck',
    price: 165,
    category: 'HOODIES',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Purity White', hex: '#FFFFFF', border: '#E5E5E5' },
      { name: 'Alabaster Gray', hex: '#EDEDED', border: '#D5D5D5' },
      { name: 'Onyx Black', hex: '#000000', border: '#000000' },
    ],
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=85',
    ],
    fabric: '420 GSM Brushed Cotton Interior. Deconstructed neck and cuff details, flatlock seams for frictionless skin contact.',
    description: 'Designed as a physical haven of stillness. Subtle raw-edge trims at the collar and cuffs celebrate the beauty of humble grace, contrasted against immaculate white cotton loopback.',
    scripture: {
      verse: 'Psalm 91:1-2',
      passage: 'He who dwells in the shelter of the Most High will abide in the shadow of the Almighty. I will say to the Lord, "My refuge and my fortress, my God, in whom I trust."',
      reflection: 'An intentional garment of rest. Dwelling in stillness amidst a culture of noise and accelerated spectacle.',
    },
    featured: false,
    inStock: true,
  },
  {
    id: 'upperroom-monogram-cap',
    name: 'UpperRoom Monogram Structured Cap',
    price: 68,
    category: 'HATS',
    sizes: ['ONE SIZE'],
    colors: [
      { name: 'Purity White', hex: '#FFFFFF', border: '#E5E5E5' },
      { name: 'Onyx Black', hex: '#000000', border: '#000000' },
      { name: 'Concrete Gray', hex: '#DBDBDB', border: '#C0C0C0' },
    ],
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&w=1200&q=85',
    ],
    fabric: '100% Heavy Twill Cotton. Matte black metal buckle closure with embossed scripture index, 6-panel low-crown profile.',
    description: 'Clean six-panel twill cap in crisp optical white. Features tone-on-tone raised embroidery of the UpperRoom cross-serif monogram on the crown and a tailored self-fabric strap.',
    scripture: {
      verse: 'Philippians 4:8',
      passage: 'Finally, brothers, whatever is true, whatever is honorable, whatever is just, whatever is pure, whatever is lovely... think about these things.',
      reflection: 'A wearable reminder to guard the thoughts and set the mind on things above, where Christ is seated in majesty.',
    },
    featured: true,
    inStock: true,
  },
  {
    id: 'proverbs-canvas-tote',
    name: 'Proverbs 3 Heavy Canvas Tote',
    price: 85,
    category: 'ACCESSORIES',
    sizes: ['ONE SIZE'],
    colors: [
      { name: 'Purity White', hex: '#FFFFFF', border: '#E5E5E5' },
      { name: 'Onyx Black', hex: '#000000', border: '#000000' },
      { name: 'Natural Raw', hex: '#F0EFEA', border: '#D6D5CE' },
    ],
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85',
    ],
    fabric: '24 oz Extra Heavy Duck Canvas. Internal zip slip pocket, reinforced dual 1.5-inch webbed handles, magnetic closure.',
    description: 'Engineered for carrying Scriptures, daily notebooks, and essentials. Rigid cotton duck canvas that stands upright on its own base. Discreet blind-stamped brand typography.',
    scripture: {
      verse: 'Proverbs 3:5-6',
      passage: 'Trust in the Lord with all your heart, and do not lean on your own understanding. In all your ways acknowledge him, and he will make straight your paths.',
      reflection: 'Carry light. Surrender the need for self-orchestrated outcomes and rest in the sovereignty of God.',
    },
    featured: false,
    inStock: true,
  },
  {
    id: 'kingdom-heavyweight-rib-tee',
    name: 'Kingdom Heavyweight Rib Tee',
    price: 110,
    category: 'TEES',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Purity White', hex: '#FFFFFF', border: '#E5E5E5' },
      { name: 'Onyx Black', hex: '#000000', border: '#000000' },
      { name: 'Cloud Gray', hex: '#ECEAE6', border: '#D3D0C8' },
    ],
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=85',
    ],
    fabric: '340 GSM 1x1 Heavy Rib Knit. Dense structure that maintains its tailored posture wash after wash.',
    description: 'Subtle vertical rib texture creating depth in single-color styling. Tailored hem with clean split side vents for effortless layering or tucked elegance.',
    scripture: {
      verse: 'Matthew 6:33',
      passage: 'But seek first the kingdom of God and his righteousness, and all these things will be added to you.',
      reflection: 'Prioritizing first things. In a world saturated with commercial clamor, our primary allegiance is eternal.',
    },
    featured: false,
    inStock: true,
  },
  {
    id: 'upperroom-signature-fleece-pant',
    name: 'UpperRoom Signature Fleece Pant',
    price: 175,
    category: 'HOODIES',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Purity White', hex: '#FFFFFF', border: '#E5E5E5' },
      { name: 'Onyx Black', hex: '#000000', border: '#000000' },
      { name: 'Stone Heather', hex: '#E6E6E6', border: '#D0D0D0' },
    ],
    images: [
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1200&q=85',
    ],
    fabric: '460 GSM Heavy Organic Cotton Loopback. Encased elastic waistband with tonal interior drawcord, relaxed straight leg.',
    description: 'A relaxed silhouette engineered for contemplation and travel. Clean open cuffs drape effortlessly over luxury sneakers or house slides. Subtle blind embroidery at the hip.',
    scripture: {
      verse: 'Colossians 3:12',
      passage: 'Put on then, as God’s chosen ones, holy and beloved, compassionate hearts, kindness, humility, meekness, and patience.',
      reflection: 'Clothing oneself with virtues that reflect our eternal family likeness. Peace, reverence, and meek strength.',
    },
    featured: true,
    inStock: true,
  },
  {
    id: 'pentecost-knit-beanie',
    name: 'Pentecost Ribbed Merino Beanie',
    price: 72,
    category: 'HATS',
    sizes: ['ONE SIZE'],
    colors: [
      { name: 'Purity White', hex: '#FFFFFF', border: '#E5E5E5' },
      { name: 'Onyx Black', hex: '#000000', border: '#000000' },
      { name: 'Ash Melange', hex: '#E0E0E0', border: '#CBCBCB' },
    ],
    images: [
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&w=1200&q=85',
    ],
    fabric: '100% Extra-Fine Italian Merino Wool. Double-fold cuff, 7-gauge dense fisherman rib.',
    description: 'Luxurious thermal warmth without bulk. Knit in Italy from ethically sourced merino wool yarn, dyed to a pure chalk white that retains its vibrancy through cold seasons.',
    scripture: {
      verse: 'Revelation 3:5',
      passage: 'The one who conquers will be clothed thus in white garments, and I will never blot his name out of the book of life.',
      reflection: 'A sign of unblemished purity and the victory won by the Lamb of God.',
    },
    featured: false,
    inStock: true,
  },
  {
    id: 'scripture-silk-scarf',
    name: 'UpperRoom Heritage Silk Bandana',
    price: 95,
    category: 'ACCESSORIES',
    sizes: ['ONE SIZE'],
    colors: [
      { name: 'Purity White', hex: '#FFFFFF', border: '#E5E5E5' },
      { name: 'Onyx Black', hex: '#000000', border: '#000000' },
    ],
    images: [
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=85',
    ],
    fabric: '100% Mulberry Silk Twill (18mm). Hand-rolled edges, finished with botanical ink typographic motifs.',
    description: 'A versatile luxury square accessory. Featuring microscopic typographic verses from the Sermon on the Mount configured as geometric borders. Wear around neck, wrist, or bag handle.',
    scripture: {
      verse: 'Matthew 5:14',
      passage: 'You are the light of the world. A city set on a hill cannot be hidden.',
      reflection: 'Radiating quiet light in every corner of life. Living transparently with grace and humility.',
    },
    featured: true,
    inStock: true,
  },
];

export const getProductById = (id) => {
  return products.find((p) => p.id === id);
};

export const getFeaturedProducts = () => {
  return products.filter((p) => p.featured);
};

export const getProductsByCategory = (category) => {
  if (!category || category === 'ALL') return products;
  return products.filter((p) => p.category === category);
};

export default products;
