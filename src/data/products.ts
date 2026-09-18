import { Product, Review } from '../types';

export const RIYANSH_PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    slug: 'gentle-cleanser',
    name: 'Gentle Cleanser',
    tagline: 'Purifying botanical face wash with soothing aloe & green tea',
    category: 'Cleansers',
    healthConcern: 'Daily Cleansing',
    price: 24,
    compareAtPrice: 32,
    rating: 4.9,
    reviewCount: 384,
    image: '/assets/images/kmKUTujRJWSYGv7PI0IVv3fdjr0.png',
    hoverImage: '/assets/images/oFieeiBBezVKC5WatbvwX9I9DZY.jpg',
    gallery: [
      '/assets/images/kmKUTujRJWSYGv7PI0IVv3fdjr0.png',
      '/assets/images/oFieeiBBezVKC5WatbvwX9I9DZY.jpg',
      '/assets/images/V0xEpyclCuzbddyLltFuTaNrmw.png'
    ],
    tag: 'ORGANIC',
    volume: '150 ml',
    sku: 'KNV-CLN-001',
    inStock: true,
    featured: true,
    bestseller: false,
    description: 'A gentle, pH-balanced foaming cleanser formulated with botanical extracts to remove impurities, excess sebum, and makeup without stripping natural moisture.',
    keyBenefits: [
      'Dissolves surface debris and unclogs pores gently',
      'Infused with calming organic chamomile and aloe vera',
      'Preserves the delicate skin microbiome barrier',
      '100% free from sulfates, parabens, and synthetic fragrance'
    ],
    ingredients: [
      { name: 'Organic Aloe Vera', botanicalName: 'Aloe barbadensis', role: 'Deep hydration & barrier soothing' },
      { name: 'Green Tea Extract', botanicalName: 'Camellia sinensis', role: 'Antioxidant & environmental defense' },
      { name: 'Chamomile Flower', botanicalName: 'Matricaria chamomilla', role: 'Redness reduction & gentle calming' }
    ],
    dosageInstructions: 'Dispense 1–2 pumps onto damp hands, massage gently over face and neck in circular motions, then rinse thoroughly with lukewarm water.',
    certifications: ['Certified Organic', '100% Vegan', 'Cruelty-Free', 'Recyclable Glass']
  },
  {
    id: 'prod-02',
    slug: 'hydrating-serum',
    name: 'Hydrating Serum',
    tagline: 'Deep hyaluronic moisture elixir with niacinamide & peptide complex',
    category: 'Serums',
    healthConcern: 'Hydration & Glow',
    price: 38,
    compareAtPrice: 48,
    rating: 5.0,
    reviewCount: 512,
    image: '/assets/images/oFieeiBBezVKC5WatbvwX9I9DZY.jpg',
    hoverImage: '/assets/images/V0xEpyclCuzbddyLltFuTaNrmw.png',
    gallery: [
      '/assets/images/oFieeiBBezVKC5WatbvwX9I9DZY.jpg',
      '/assets/images/V0xEpyclCuzbddyLltFuTaNrmw.png',
      '/assets/images/kmKUTujRJWSYGv7PI0IVv3fdjr0.png'
    ],
    tag: 'BESTSELLER',
    volume: '50 ml',
    sku: 'KNV-SRM-002',
    inStock: true,
    featured: true,
    bestseller: true,
    description: 'Our award-winning daily serum delivers multi-molecular hyaluronic acid deep into the dermis for plump, glass-like hydration and long-lasting radiance.',
    keyBenefits: [
      'Triple-weight hyaluronic acid for instant multi-depth hydration',
      '5% Niacinamide to refine texture and minimize pores',
      'Botanical adaptogens to shield against blue light and oxidative stress',
      'Silky, weightless texture absorbs in seconds'
    ],
    ingredients: [
      { name: 'Multi-Molecular Hyaluronic Acid', botanicalName: 'Sodium Hyaluronate', role: 'Deep cellular moisture retention' },
      { name: 'Niacinamide (Vitamin B3)', botanicalName: 'Niacinamide', role: 'Pore refinement & tone balancing' },
      { name: 'Rosehip Seed Oil', botanicalName: 'Rosa canina', role: 'Essential fatty acids & Vitamin A' }
    ],
    dosageInstructions: 'Apply 3–4 drops morning and evening onto cleansed, slightly damp skin before moisturizing.',
    certifications: ['Dermatologist Tested', 'Non-Comedogenic', '100% Vegan', 'Cruelty-Free']
  },
  {
    id: 'prod-03',
    slug: 'nourishing-oil',
    name: 'Nourishing Oil',
    tagline: 'Cold-pressed botanical nectar with squalane & pure saffron',
    category: 'Moisturizers',
    healthConcern: 'Barrier Repair & Glow',
    price: 32,
    compareAtPrice: 40,
    rating: 4.9,
    reviewCount: 289,
    image: '/assets/images/V0xEpyclCuzbddyLltFuTaNrmw.png',
    hoverImage: '/assets/images/Mag4ZdXulV3DpURLglroTtbqj68.jpg',
    gallery: [
      '/assets/images/V0xEpyclCuzbddyLltFuTaNrmw.png',
      '/assets/images/Mag4ZdXulV3DpURLglroTtbqj68.jpg'
    ],
    tag: 'NEW',
    volume: '30 ml',
    sku: 'KNV-OIL-003',
    inStock: true,
    featured: true,
    bestseller: false,
    description: 'A luxurious golden facial nectar formulated with 100% pure plant squalane, cold-pressed jojoba, and saffron pistils for instant luminosity and deep lipid replenishment.',
    keyBenefits: [
      'Locks in hydration and repairs the moisture barrier',
      'Leaves skin dewy, radiant, and deeply nourished',
      'Non-greasy, fast-penetrating dry oil finish',
      'Rich in antioxidants to fight premature signs of aging'
    ],
    ingredients: [
      { name: 'Plant-Derived Squalane', botanicalName: 'Squalane (Olive)', role: 'Natural sebum mimetic & lipid repair' },
      { name: 'Golden Jojoba Oil', botanicalName: 'Simmondsia chinensis', role: 'Moisture seal & elasticity enhancer' },
      { name: 'Kashmiri Saffron', botanicalName: 'Crocus sativus', role: 'Antioxidant illumination & cellular tone' }
    ],
    dosageInstructions: 'Warm 2–3 drops between palms and gently press onto face, neck, and décolletage as the final step in your routine.',
    certifications: ['Cold-Pressed Extraction', '100% Organic', 'Zero Preservatives', 'Amber Glass UV Protected']
  },
  {
    id: 'prod-04',
    slug: 'botanical-face-cream',
    name: 'Botanical Face Cream',
    tagline: 'Restorative barrier cream with ceramides & shea butter',
    category: 'Moisturizers',
    healthConcern: 'Dry & Sensitive Skin',
    price: 45,
    compareAtPrice: 55,
    rating: 4.8,
    reviewCount: 215,
    image: '/assets/images/Mag4ZdXulV3DpURLglroTtbqj68.jpg',
    hoverImage: '/assets/images/7TTVWPeunVmy9wg3b0K8he3p6HM.png',
    gallery: [
      '/assets/images/Mag4ZdXulV3DpURLglroTtbqj68.jpg',
      '/assets/images/7TTVWPeunVmy9wg3b0K8he3p6HM.png'
    ],
    tag: 'RESTORATIVE',
    volume: '60 ml',
    sku: 'KNV-CRM-004',
    inStock: true,
    featured: false,
    bestseller: false,
    description: 'A velvety restorative cream that wraps dry, compromised skin in protective moisture with biomimetic ceramides and nutrient-dense botanical butters.',
    keyBenefits: [
      'Reinforces damaged skin barriers against environmental stressors',
      'Provides 24-hour continuous moisture retention',
      'Calms redness, irritation, and sensitivity'
    ],
    ingredients: [
      { name: 'Bio-Ceramide Complex', botanicalName: 'Ceramide NP/AP/EOP', role: 'Lipid barrier reconstruction' },
      { name: 'Organic Shea Butter', botanicalName: 'Butyrospermum parkii', role: 'Deep emollient smoothing' }
    ],
    dosageInstructions: 'Massage a nickel-sized amount onto clean face and neck morning and evening.',
    certifications: ['Dermatologist Approved', '100% Vegan', 'Cruelty-Free']
  },
  {
    id: 'prod-05',
    slug: 'purifying-clay-mask',
    name: 'Purifying Clay Mask',
    tagline: 'Mineral French green clay & botanical detoxifying treatment',
    category: 'Cleansers',
    healthConcern: 'Deep Pore Cleansing',
    price: 28,
    compareAtPrice: 35,
    rating: 4.7,
    reviewCount: 164,
    image: '/assets/images/7TTVWPeunVmy9wg3b0K8he3p6HM.png',
    hoverImage: '/assets/images/zX8aQ5tVVxYfX6IugdYlTIF6plo.jpg',
    gallery: [
      '/assets/images/7TTVWPeunVmy9wg3b0K8he3p6HM.png'
    ],
    tag: 'DETOX',
    volume: '100 ml',
    sku: 'KNV-MSK-005',
    inStock: true,
    featured: false,
    bestseller: false,
    description: 'A clarifying treatment mask that gently draws out toxins, purifies congested pores, and balances oil production without dehydrating.',
    keyBenefits: [
      'Gently absorbs excess sebum and impurities',
      'Tightens pore appearance and smooths texture',
      'Non-drying, cream-clay formula rinses cleanly'
    ],
    ingredients: [
      { name: 'French Green Clay', botanicalName: 'Illite / Montmorillonite', role: 'Mineral detox & sebum balance' },
      { name: 'Tea Tree Leaf Oil', botanicalName: 'Melaleuca alternifolia', role: 'Purifying & blemish control' }
    ],
    dosageInstructions: 'Apply an even layer over face, avoiding eye area. Leave for 10–15 minutes until almost dry, then rinse with warm water. Use 1–2 times weekly.',
    certifications: ['100% Natural Minerals', 'Vegan', 'Cruelty-Free']
  },
  {
    id: 'prod-06',
    slug: 'exfoliating-elixir',
    name: 'Exfoliating Elixir',
    tagline: 'AHA + BHA fruit acid resurfacing night tonic',
    category: 'Serums',
    healthConcern: 'Resurfacing & Radiance',
    price: 42,
    compareAtPrice: 52,
    rating: 4.9,
    reviewCount: 340,
    image: '/assets/images/zX8aQ5tVVxYfX6IugdYlTIF6plo.jpg',
    hoverImage: '/assets/images/kmKUTujRJWSYGv7PI0IVv3fdjr0.png',
    gallery: [
      '/assets/images/zX8aQ5tVVxYfX6IugdYlTIF6plo.jpg'
    ],
    tag: 'NIGHT RITUAL',
    volume: '100 ml',
    sku: 'KNV-EXF-006',
    inStock: true,
    featured: false,
    bestseller: true,
    description: 'A gentle leave-on exfoliating solution powered by natural hibiscus fruit acids, willow bark BHA, and soothing botanical waters for luminous, renewed skin.',
    keyBenefits: [
      'Promotes overnight cell turnover for glass-smooth texture',
      'Fades post-blemish marks and sun discoloration',
      'Unclogs deep pores and prevents blackheads'
    ],
    ingredients: [
      { name: 'Hibiscus Flower Acid (AHA)', botanicalName: 'Hibiscus sabdariffa', role: 'Gentle enzymatic exfoliation' },
      { name: 'Willow Bark Extract (BHA)', botanicalName: 'Salix alba', role: 'Deep pore clearing & anti-inflammatory' }
    ],
    dosageInstructions: 'Sweep over clean face with a reusable cotton pad in the evening 2–3 times per week. Follow with hydrating serum and moisturizer.',
    certifications: ['Cruelty-Free', 'Vegan', '100% Organic Acids']
  }
];

export const CATEGORIES = [
  'All Products',
  'Cleansers',
  'Serums',
  'Moisturizers',
  'Ritual Sets'
];

export const HEALTH_CONCERNS = [
  'Daily Cleansing',
  'Hydration & Glow',
  'Barrier Repair & Glow',
  'Dry & Sensitive Skin',
  'Deep Pore Cleansing',
  'Resurfacing & Radiance'
];

export const BRAND_MILESTONES = [
  { year: '2019', title: 'Founding in Botanical Harmony', description: 'Established with a vision to create clean, botanical-first skincare rituals in recyclable amber packaging.' },
  { year: '2021', title: 'Clinical Testing & Organic Certification', description: 'Formulations verified by independent dermatological and organic certification bodies.' },
  { year: '2023', title: 'Global E-Commerce & Recognition', description: 'Celebrated worldwide for award-winning luxury packaging, tactile motion design, and high-potency formulations.' },
  { year: '2026', title: 'Circular Zero-Waste Apothecary', description: 'Achieved 100% post-consumer recycled glass and carbon-neutral direct dispatch.' }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Jennifer K.',
    rating: 5,
    date: '2026-08-14',
    title: 'Transformational glow',
    comment: 'It feels healthier, smoother & more radiant than ever. I love knowing I’m using something natural and effective!',
    verified: true,
    avatar: '/assets/images/4iafdgACHcW5wcIV5yf3JfXO8.webp',
    productName: 'Hydrating Serum'
  },
  {
    id: 'rev-2',
    author: 'Sophia Martinez',
    rating: 5,
    date: '2026-07-28',
    title: 'The cleanest skincare ritual',
    comment: 'The amber glass dropper, the earthy natural aroma, and the instant hydration make this a staple on my vanity.',
    verified: true,
    avatar: '/assets/images/xdCJPsYAb1YfHzQkXktdaxPWKQ.webp',
    productName: 'Gentle Cleanser'
  },
  {
    id: 'rev-3',
    author: 'Elena Rostova',
    rating: 5,
    date: '2026-07-10',
    title: 'Pure botanical magic',
    comment: 'My sensitive skin calmed down within three days. The squalane and saffron oil is liquid gold.',
    verified: true,
    avatar: '/assets/images/WM2mkMIFXECzXRvcuyR2t35jE.webp',
    productName: 'Nourishing Oil'
  }
];

export const SAMPLE_REVIEWS = MOCK_REVIEWS;

