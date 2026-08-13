export const DEVICE_CATEGORIES = [
  { id: 'smartphone', name: 'Smartphones', icon: 'Smartphone', popular: true },
  { id: 'tablet', name: 'Tablets & iPads', icon: 'Tablet', popular: true },
  { id: 'laptop', name: 'Laptops & MacBooks', icon: 'Laptop', popular: true },
  { id: 'smartwatch', name: 'Smartwatches', icon: 'Watch', popular: false }
];

export const DEVICE_BRANDS = {
  smartphone: [
    { id: 'apple', name: 'Apple iPhone' },
    { id: 'samsung', name: 'Samsung Galaxy' },
    { id: 'google', name: 'Google Pixel' },
    { id: 'oneplus', name: 'OnePlus' },
    { id: 'xiaomi', name: 'Xiaomi / Redmi' }
  ],
  tablet: [
    { id: 'ipad', name: 'Apple iPad' },
    { id: 'galaxy-tab', name: 'Samsung Galaxy Tab' },
    { id: 'surface-tab', name: 'Microsoft Surface' }
  ],
  laptop: [
    { id: 'macbook', name: 'Apple MacBook Pro/Air' },
    { id: 'dell', name: 'Dell XPS & Inspiron' },
    { id: 'hp', name: 'HP Spectre & Pavilion' },
    { id: 'lenovo', name: 'Lenovo ThinkPad & Yoga' },
    { id: 'asus', name: 'ASUS ROG & ZenBook' }
  ],
  smartwatch: [
    { id: 'apple-watch', name: 'Apple Watch' },
    { id: 'galaxy-watch', name: 'Samsung Galaxy Watch' }
  ]
};

export const DEVICE_MODELS = {
  apple: [
    'iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15', 'iPhone 14 Pro Max', 
    'iPhone 14 Pro', 'iPhone 14', 'iPhone 13 Pro Max', 'iPhone 13', 'iPhone 12 / 11'
  ],
  samsung: [
    'Galaxy S24 Ultra', 'Galaxy S24+', 'Galaxy S24', 'Galaxy S23 Ultra', 
    'Galaxy S23', 'Galaxy Z Fold 5', 'Galaxy Z Flip 5', 'Galaxy A54'
  ],
  google: ['Pixel 8 Pro', 'Pixel 8', 'Pixel 7 Pro', 'Pixel 7a', 'Pixel 6 Pro'],
  oneplus: ['OnePlus 12', 'OnePlus 11', 'OnePlus Nord 3'],
  xiaomi: ['Xiaomi 14 Pro', 'Xiaomi 13T', 'Redmi Note 13'],
  ipad: ['iPad Pro 12.9"', 'iPad Pro 11"', 'iPad Air (5th Gen)', 'iPad (10th Gen)', 'iPad Mini 6'],
  'galaxy-tab': ['Galaxy Tab S9 Ultra', 'Galaxy Tab S9', 'Galaxy Tab S8'],
  'surface-tab': ['Surface Pro 9', 'Surface Pro 8', 'Surface Go 3'],
  macbook: ['MacBook Pro 16" (M3/M2)', 'MacBook Pro 14" (M3/M2)', 'MacBook Air 15" (M2)', 'MacBook Air 13" (M2/M1)'],
  dell: ['Dell XPS 15', 'Dell XPS 13', 'Dell Inspiron 16'],
  hp: ['HP Spectre x360', 'HP Envy 14', 'HP Pavilion 15'],
  lenovo: ['ThinkPad X1 Carbon', 'Yoga Slim 7', 'Legion 5 Pro'],
  asus: ['ROG Zephyrus G14', 'ZenBook Pro 14'],
  'apple-watch': ['Apple Watch Ultra 2', 'Apple Watch Series 9', 'Apple Watch SE'],
  'galaxy-watch': ['Galaxy Watch 6 Classic', 'Galaxy Watch 5 Pro']
};

/**
 * Mapping of all device models to their category, brand, and future vendor prices.
 * Modify the prices object values when committed vendor pricing is available.
 */
export const MODEL_PRICING_MAP = {};

Object.entries(DEVICE_MODELS).forEach(([brandId, models]) => {
  const categoryId = Object.keys(DEVICE_BRANDS).find(cat => 
    DEVICE_BRANDS[cat].some(b => b.id === brandId)
  ) || 'smartphone';

  models.forEach(modelName => {
    MODEL_PRICING_MAP[modelName] = {
      category: categoryId,
      brand: brandId,
      model: modelName,
      // Vendor price per repair issue ID (set values here when vendor pricing is finalized)
      prices: {
        screen: null,
        battery: null,
        charging: null,
        water: null,
        camera: null,
        speaker: null,
        software: null,
        data: null
      }
    };
  });
});


export const REPAIR_ISSUES = [
  { 
    id: 'screen', 
    title: 'Cracked Screen / Display Issue', 
    desc: 'OLED / LCD glass replacement, touch response repair',
    basePrice: 89, 
    timeEst: '25-40 mins',
    popular: true,
    icon: 'Smartphone'
  },
  { 
    id: 'battery', 
    title: 'Battery Replacement', 
    desc: 'Fast drain, swollen battery, poor charging capacity',
    basePrice: 49, 
    timeEst: '20-30 mins',
    popular: true,
    icon: 'BatteryCharging'
  },
  { 
    id: 'charging', 
    title: 'Charging Port Repair', 
    desc: 'Loose port, refusal to charge, slow charging speed',
    basePrice: 59, 
    timeEst: '30-45 mins',
    popular: true,
    icon: 'Zap'
  },
  { 
    id: 'water', 
    title: 'Water Damage Recovery', 
    desc: 'Ultrasonic chemical cleaning & motherboard revival',
    basePrice: 99, 
    timeEst: '2-4 hours',
    popular: true,
    icon: 'Droplets'
  },
  { 
    id: 'camera', 
    title: 'Camera & Lens Replacement', 
    desc: 'Blurry lens, cracked glass, autofocus motor issue',
    basePrice: 69, 
    timeEst: '30 mins',
    popular: false,
    icon: 'Camera'
  },
  { 
    id: 'speaker', 
    title: 'Speaker & Microphone Fix', 
    desc: 'Muffled audio, quiet ear speaker, dead mic',
    basePrice: 55, 
    timeEst: '30 mins',
    popular: false,
    icon: 'Volume2'
  },
  { 
    id: 'software', 
    title: 'Software & OS Diagnostics', 
    desc: 'Boot loops, frozen screens, OS re-flashing',
    basePrice: 39, 
    timeEst: '45 mins',
    popular: false,
    icon: 'Cpu'
  },
  { 
    id: 'data', 
    title: 'Data Recovery', 
    desc: 'Extract photos, contacts & files from dead boards',
    basePrice: 120, 
    timeEst: 'Same Day',
    popular: true,
    icon: 'Database'
  }
];

export const TRUST_METRICS = [
  { label: 'Devices Repaired', value: '4,500+', suffix: 'With 100% Success', icon: 'Wrench' },
  { label: 'Customer Rating', value: '5★', suffix: 'Based on 80+ Reviews', icon: 'Star' },
  { label: 'Average Repair Time', value: '1 Day', suffix: 'Keeping You Connected', icon: 'Clock' },
  { label: 'Warranty Covered', value: '3 Months', suffix: 'T&C Apply', icon: 'ShieldCheck' }
];

export const WHY_CHOOSE_US = [
  {
    title: 'Experienced Repair Specialists',
    description: 'Every repair is handled by trained technicians using professional repair procedures and quality-tested tools.',
    icon: 'BadgeCheck',
    badge: 'CERTIFIED TECHNICIANS'
  },
  {
    title: 'High-Quality Compatible Parts',
    description: 'We use carefully tested premium compatible replacement parts. If a genuine original part is available, we\'ll let you know before your repair.',
    icon: 'ShieldCheck',
    badge: 'PREMIUM PARTS'
  },
  {
    title: 'Quick Diagnosis & Repair',
    description: 'We inspect your device, explain the issue, and begin repairs as quickly as possible. Repair times vary depending on the device and the issue.',
    icon: 'Zap',
    badge: 'FAST SERVICE'
  },
  {
    title: 'No Hidden Charges',
    description: 'You\'ll receive a clear repair estimate before any work begins, so you always know what you\'re paying for.',
    icon: 'DollarSign',
    badge: 'Upfront Estimates'
  }
];

export const REPAIR_PROCESS_STEPS = [
  {
    step: '01',
    title: 'Book Appointment',
    desc: 'Select your device, model, and issue online to lock in your discounted price slot or walk right in.',
    icon: 'Calendar',
    timeEst: 'Instant'
  },
  {
    step: '02',
    title: 'Bring or Send Device',
    desc: 'Visit our flagship service hub, request a mobile technician to your door, or use our free mail-in label.',
    icon: 'MapPin',
    timeEst: 'Flexible'
  },
  {
    step: '03',
    title: 'Precision Repair',
    desc: 'Our certified master tech inspects, cleans, and replaces faulty components using precision laser tooling.',
    icon: 'Wrench',
    timeEst: '24 hours'
  },
  {
    step: '04',
    title: 'Collect & 3-month Guarantee',
    desc: 'Test your revived device with \n 24-point quality inspection and walk away with our 3-month hassle-free warranty.',
    icon: 'CheckCircle2',
    timeEst: 'Complete'
  }
];

export const CUSTOMER_REVIEWS = [
  {
    id: 1,
    name: 'Yuvaraj Rajendran',
    role: 'Local Guide · 113 reviews',
    avatar: 'https://ui-avatars.com/api/?name=Yuvaraj+Rajendran&background=D4AF37&color=000&size=200&bold=true',
    rating: 5,
    date: '3 years ago',
    device: 'Laptop',
    service: 'HDD Detection Repair',
    review: 'I took my laptop as my system was not detecting the hdd. Within 40 mins they resolved the issue and handed over the laptop. Thanks to olivecare.',
    verified: true
  },
  {
    id: 2,
    name: 'Mirza Zakir Baig',
    role: 'Local Guide · 15 reviews',
    avatar: 'https://ui-avatars.com/api/?name=Mirza+Zakir+Baig&background=D4AF37&color=000&size=200&bold=true',
    rating: 5,
    date: '1 year ago',
    device: 'Laptop',
    service: 'Laptop Repair',
    review: 'I recently had my laptop repaired by Olive Care - Gadget Repair and Servicing, and I couldn\'t be more pleased with the experience. Mr. Naser was highly professional and went above and beyond to ensure everything was handled smoothly.',
    verified: true
  },
  {
    id: 3,
    name: 'Harish J',
    role: 'Local Guide · 29 reviews',
    avatar: 'https://ui-avatars.com/api/?name=Harish+J&background=D4AF37&color=000&size=200&bold=true',
    rating: 5,
    date: '2 years ago',
    device: 'Samsung Galaxy S9',
    service: 'Mobile Repair',
    review: 'I have received best service to my Samsung Galaxy S9 mobile from Olive care center, Banjara Hills. I really recommend this service center with full satisfaction of my mobile S9 service. Thank you guys.',
    verified: true
  },
  {
    id: 4,
    name: 'Mellacheruvu Kalyan Ram',
    role: 'Google Reviewer · 4 reviews',
    avatar: 'https://ui-avatars.com/api/?name=Kalyan+Ram&background=D4AF37&color=000&size=200&bold=true',
    rating: 5,
    date: '4 years ago',
    device: 'Laptop',
    service: 'Performance Upgrade & Delivery',
    review: 'My laptop had performance issues and I got the examination done by OliveCare. The representative Abdul Baseer did an excellent job - from recommending best upgrade plan to picking and delivering. The entire experience from calling their office to getting the upgraded laptop in my hands was great. I shall get back to OliveCare for my future needs and also recommend their services to others.',
    verified: true
  }
];

export const FAQS = [
  {
    id: 1,
    category: 'General',
    question: 'How long does a typical smartphone repair take?',
    answer: 'Most standard repairs like screen and battery replacements take between 24-36 hours'
  },
  {
    id: 2,
    category: 'Warranty',
    question: 'What does the 3-Month Warranty cover?',
    answer: 'Our 3-month warranty covers all parts installed and labor craftsmanship. If the replaced component develops any manufacturing defect or touch malfunction without physical/water damage, we replace it completely free of charge.'
  },
  {
    id: 3,
    category: 'Pricing',
    question: 'Do you charge for diagnostics if I decide not to repair?',
    answer: 'No! Our initial diagnostic check is 100% free with zero obligation. We inspect your device and provide an upfront quote before starting any work.'
  },
  {
    id: 4,
    category: 'Quality',
    question: 'Are your replacement parts original OEM standard?',
    answer: 'Yes. We source high-grade OEM components manufactured to exact original equipment standards, tested for color accuracy, touch sensitivity, and long-term durability.'
  },
  {
    id: 5,
    category: 'General',
    question: 'Will I lose my photos or personal data during repair?',
    answer: 'In 99% of hardware repairs (screen, battery, charging port), your data remains completely intact. However, we always recommend making a cloud or PC backup before handing in any electronic device.'
  },
  {
    id: 6,
    category: 'Service Mode',
    question: 'How does the Mobile Doorstep / Drop-in service work?',
    answer: 'You can bring your device directly to our service centre, or use our pickup service. Pickup is free within 5 km of our centre. For locations beyond 5 km, an additional pickup fee may apply based on the distance.'
  }
];
