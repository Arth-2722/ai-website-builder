/**
 * Universal AI Synthesis & Template Engine
 * 100% Free, Zero-Config, Generates tailored React + Tailwind websites for ANY prompt!
 */

// Comprehensive knowledge base of industries and archetypes
const INDUSTRY_PRESETS = [
  {
    keys: ['hospital', 'clinic', 'medical', 'doctor', 'healthcare', 'patient', 'dental', 'dentist', 'nurse', 'pharmacy', 'health', 'surgery', 'ambulance'],
    category: 'Healthcare & Medical',
    defaultName: 'HopeCare Memorial Hospital & Health System',
    tagline: 'World-Class Medicine. Compassionate Care.',
    subtagline: 'Board-certified medical specialists, modern diagnostics, and dedicated 24/7 emergency response.',
    theme: {
      primary: 'cyan',
      secondary: 'blue',
      accent: 'teal',
      bg: 'slate-900',
      badge: '🚨 24/7 Emergency Center: (800) 911-HOPE'
    },
    cta: 'Book Consultation',
    interactiveType: 'appointment',
    services: [
      { icon: '❤️', title: 'Cardiology', desc: 'Comprehensive cardiac screening, catheterization, and advanced heart failure therapies.' },
      { icon: '🧠', title: 'Neurology & Neurosurgery', desc: 'Advanced stroke management, neurovascular interventions, and spinal care.' },
      { icon: '👶', title: 'Pediatrics & Neonatal Care', desc: '24/7 dedicated neonatal ICU and holistic pediatric healthcare programs.' },
      { icon: '🦴', title: 'Orthopedics & Sports Medicine', desc: 'Minimally invasive robotic joint replacements and specialized fracture care.' },
      { icon: '🔬', title: 'Oncology & Immunotherapy', desc: 'Precision cancer diagnostics, targeted infusion therapies, and oncology support.' },
      { icon: '🚑', title: '24/7 Emergency & Level 1 Trauma', desc: 'Immediate paramedic triage, dedicated trauma resuscitation bays, and rapid ICU.' }
    ],
    teamTitle: 'Distinguished Medical Specialists',
    team: [
      { name: 'Dr. Sarah Jenkins, MD', role: 'Chief of Cardiology', detail: 'Harvard Medical School • 18 Yrs Exp', rating: '4.9 ★★★★★' },
      { name: 'Dr. Michael Chen, MD, PhD', role: 'Head of Neurology', detail: 'Johns Hopkins • 15 Yrs Exp', rating: '5.0 ★★★★★' },
      { name: 'Dr. Elena Rostova, MD', role: 'Pediatric Specialist', detail: 'Stanford Medicine • 12 Yrs Exp', rating: '4.9 ★★★★★' },
      { name: 'Dr. Marcus Vance, MD', role: 'Orthopedic Trauma Surgeon', detail: 'Mayo Clinic • 16 Yrs Exp', rating: '4.8 ★★★★★' }
    ]
  },
  {
    keys: ['car', 'automotive', 'dealership', 'auto', 'vehicle', 'mechanic', 'repair', 'motor', 'garage', 'parts', 'dealers'],
    category: 'Automotive & Dealership',
    defaultName: 'Apex Motor Group & Performance Auto',
    tagline: 'Drive Excellence. Engineered for the Open Road.',
    subtagline: 'Certified pre-owned and new luxury vehicles, precision mechanical servicing, and flexible zero-down financing.',
    theme: {
      primary: 'amber',
      secondary: 'orange',
      accent: 'red',
      bg: 'zinc-950',
      badge: '🔥 Season Clearance: 0% APR on Selected Models'
    },
    cta: 'Schedule Test Drive',
    interactiveType: 'booking',
    services: [
      { icon: '🏎️', title: 'New & Pre-Owned Inventory', desc: 'Handpicked certified sports cars, family SUVs, and premium luxury sedans.' },
      { icon: '🔧', title: 'Certified Master Servicing', desc: 'Factory-trained technicians providing multi-point diagnostics and OEM tuning.' },
      { icon: '💳', title: 'Instant Auto Financing', desc: 'Competitive low-interest loan terms and instant pre-approval within 2 minutes.' },
      { icon: '🔄', title: 'Trade-In Valuation', desc: 'Fair market evaluations backed by Kelley Blue Book guarantees on every vehicle.' },
      { icon: '🛡️', title: 'Extended Warranty Protection', desc: 'Complete bumper-to-bumper bumper coverage with 24/7 nationwide roadside assistance.' },
      { icon: '⚡', title: 'Electric & Hybrid Center', desc: 'Fast EV charging stations and certified battery diagnostic inspections.' }
    ],
    teamTitle: 'Sales & Mechanical Specialists',
    team: [
      { name: 'Alex Harrison', role: 'General Sales Director', detail: 'Master Automotive Consultant • 14 Yrs Exp', rating: '4.9 ★★★★★' },
      { name: 'Carlos Mendez', role: 'Lead Certified Technician', detail: 'ASE Master Certified • 19 Yrs Exp', rating: '5.0 ★★★★★' },
      { name: 'Samantha Reed', role: 'Finance & Leasing Specialist', detail: 'Auto Financial Analyst • 11 Yrs Exp', rating: '4.9 ★★★★★' },
      { name: 'David Vance', role: 'Performance Tuning Lead', detail: 'Motorsport Specialist • 13 Yrs Exp', rating: '4.8 ★★★★★' }
    ]
  },
  {
    keys: ['food', 'restaurant', 'cafe', 'coffee', 'bakery', 'pizza', 'burger', 'bar', 'dining', 'bistro', 'steak', 'sushi', 'dessert', 'pastry'],
    category: 'Restaurant & Dining',
    defaultName: 'L’Osteria Bella & Artisanal Kitchen',
    tagline: 'Where Culinary Passion Meets Time-Honored Tradition.',
    subtagline: 'Handmade pastas, locally sourced farm-to-table organic ingredients, and sommelier-curated vintage wines.',
    theme: {
      primary: 'amber',
      secondary: 'yellow',
      accent: 'rose',
      bg: 'stone-950',
      badge: '🍷 Michelin Guide Recommended 2026'
    },
    cta: 'Reserve a Table',
    interactiveType: 'menu',
    services: [
      { icon: '🍝', title: 'Handcrafted Pastas', desc: 'Rolled fresh each morning using imported Italian semolina flour and heirloom eggs.' },
      { icon: '🥩', title: 'Dry-Aged Prime Cuts', desc: '45-day dry-aged steaks seared over aromatic white oak woodfires.' },
      { icon: '🍕', title: 'Woodfired Pizza Napoletana', desc: 'San Marzano tomatoes, buffalo mozzarella, and 72-hour fermented sourdough crust.' },
      { icon: '🍷', title: 'Curated Cellar Wines', desc: 'Over 300 international vintages selected by our certified Master Sommelier.' },
      { icon: '🍰', title: 'Artisanal Desserts', desc: 'Authentic tiramisù, Sicilian cannoli, and seasonal gelato churned daily.' },
      { icon: '🎉', title: 'Private Dining & Catering', desc: 'Bespoke event catering and intimate private dining rooms for celebrations.' }
    ],
    teamTitle: 'Culinary Team',
    team: [
      { name: 'Chef Marco Rossi', role: 'Executive Chef', detail: 'Formerly Le Cirque • 22 Yrs Exp', rating: '5.0 ★★★★★' },
      { name: 'Chef Sophie Laurent', role: 'Pastry Chef & Chocolatier', detail: 'Le Cordon Bleu Paris • 14 Yrs Exp', rating: '4.9 ★★★★★' },
      { name: 'Matteo Bellini', role: 'Head Sommelier', detail: 'Court of Master Sommeliers • 16 Yrs Exp', rating: '4.9 ★★★★★' }
    ]
  },
  {
    keys: ['law', 'legal', 'attorney', 'lawyer', 'justice', 'court', 'firm', 'litigation'],
    category: 'Legal & Law Firm',
    defaultName: 'Vance & Sterling Attorneys at Law',
    tagline: 'Unyielding Advocacy. Proven Trial Results.',
    subtagline: 'Premier corporate litigation, catastrophic personal injury, and intellectual property counsel.',
    theme: {
      primary: 'amber',
      secondary: 'slate',
      accent: 'blue',
      bg: 'slate-950',
      badge: '⚖️ Over $250M Recovered for Our Clients'
    },
    cta: 'Free Case Evaluation',
    interactiveType: 'consultation',
    services: [
      { icon: '⚖️', title: 'Corporate & Commercial Law', desc: 'Mergers, acquisitions, venture financing, and high-stakes contract dispute resolution.' },
      { icon: '🛡️', title: 'Catastrophic Injury & Accident', desc: 'Tenacious trial advocacy to recover full medical and financial damages for victims.' },
      { icon: '💡', title: 'Intellectual Property & Patents', desc: 'Worldwide trademark protection, trade secret litigation, and patent portfolio defense.' },
      { icon: '🏢', title: 'Commercial Real Estate', desc: 'Zoning disputes, land acquisition, lease negotiations, and commercial property development.' },
      { icon: '💼', title: 'Employment & Labor Defense', desc: 'Severance compliance, non-compete enforcement, and executive compensation advisory.' },
      { icon: '🏛️', title: 'Appellate & Constitutional Law', desc: 'Skilled advocacy before federal appellate circuits and supreme judicial bodies.' }
    ],
    teamTitle: 'Managing Partners',
    team: [
      { name: 'Edward Vance, Esq.', role: 'Senior Managing Partner', detail: 'Yale Law School • 26 Yrs Exp', rating: '5.0 ★★★★★' },
      { name: 'Claire Sterling, Esq.', role: 'Head of Trial Practice', detail: 'Harvard Law School • 21 Yrs Exp', rating: '4.9 ★★★★★' },
      { name: 'Jonathan Pierce, Esq.', role: 'Partner, IP Defense', detail: 'Columbia Law • 17 Yrs Exp', rating: '4.9 ★★★★★' }
    ]
  },
  {
    keys: ['real estate', 'property', 'realtor', 'housing', 'apartment', 'villa', 'mansion', 'broker'],
    category: 'Real Estate & Properties',
    defaultName: 'Aura Heights Luxury Real Estate',
    tagline: 'Exceptional Homes for Exceptional Lifestyles.',
    subtagline: 'Exclusive architectural estates, waterfront penthouses, and bespoke residential investment portfolios.',
    theme: {
      primary: 'emerald',
      secondary: 'teal',
      accent: 'amber',
      bg: 'slate-950',
      badge: '🏡 Over $1.2B in Closed Residential Sales'
    },
    cta: 'Explore Listings',
    interactiveType: 'catalog',
    services: [
      { icon: '🏰', title: 'Luxury Waterfront Estates', desc: 'Private gated residences with panoramic shoreline views and deepwater dockage.' },
      { icon: '🏙️', title: 'Skyline Penthouse Condos', desc: 'Ultra-modern urban penthouses with private elevator access and 360-degree terraces.' },
      { icon: '📈', title: 'Commercial Real Estate Assets', desc: 'High-yield retail developments, Class-A office buildings, and logistics hubs.' },
      { icon: '📐', title: 'Architectural Heritage Homes', desc: 'Restored mid-century masterpieces and historic landmark homes with curated pedigrees.' },
      { icon: '🔑', title: 'Private VIP Concierge Buying', desc: 'Discreet off-market acquisitions and bespoke representation for high-net-worth buyers.' },
      { icon: '📊', title: 'Property Portfolio Advisory', desc: 'Comprehensive yield analysis, 1031 tax exchanges, and property asset management.' }
    ],
    teamTitle: 'Top Producing Agents',
    team: [
      { name: 'Victoria Stone', role: 'Principal Broker', detail: 'Top 1% Nationwide • 18 Yrs Exp', rating: '5.0 ★★★★★' },
      { name: 'Julian Drake', role: 'Director of Luxury Estates', detail: 'Wall Street Journal Top 50 • 14 Yrs Exp', rating: '4.9 ★★★★★' },
      { name: 'Natasha Roman', role: 'Commercial Investment Advisor', detail: 'Commercial Specialist • 12 Yrs Exp', rating: '4.9 ★★★★★' }
    ]
  },
  {
    keys: ['school', 'education', 'academy', 'university', 'college', 'course', 'tutor', 'learning', 'class', 'training'],
    category: 'Education & Learning',
    defaultName: 'Vanguard Academy & Learning Institute',
    tagline: 'Igniting Minds. Shaping Future Leaders.',
    subtagline: 'STEM-focused curriculum, world-class faculty, and innovative career development programs.',
    theme: {
      primary: 'indigo',
      secondary: 'blue',
      accent: 'cyan',
      bg: 'slate-950',
      badge: '🎓 Admissions Open for 2026/2027 Academic Year'
    },
    cta: 'Apply for Admission',
    interactiveType: 'consultation',
    services: [
      { icon: '💻', title: 'Computer Science & AI Studies', desc: 'Hands-on full stack software engineering, robotics, neural networks, and cybersecurity.' },
      { icon: '🔬', title: 'Advanced Biomedical Sciences', desc: 'State-of-the-art laboratory research programs and pre-medical university tracks.' },
      { icon: '📊', title: 'Economics & Financial Markets', desc: 'Applied corporate finance, macroeconomic forecasting, and entrepreneurship incubators.' },
      { icon: '🎨', title: 'Fine Arts & Digital Media', desc: 'Interactive 3D animation, cinematography, music production, and UI/UX design.' },
      { icon: '🌐', title: 'International Baccalaureate (IB)', desc: 'Rigorous bilingual diploma recognized by Ivy League and global universities.' },
      { icon: '🏆', title: 'Championship Athletics & Arts', desc: 'Competitive collegiate athletic coaching, Olympic pools, and performing arts centers.' }
    ],
    teamTitle: 'Distinguished Faculty',
    team: [
      { name: 'Dr. Arthur Pendelton', role: 'Dean of Academic Affairs', detail: 'Oxford University • 24 Yrs Exp', rating: '5.0 ★★★★★' },
      { name: 'Prof. Ananya Sharma', role: 'Head of STEM & Artificial Intelligence', detail: 'MIT • 16 Yrs Exp', rating: '4.9 ★★★★★' },
      { name: 'Dr. Robert Zimmerman', role: 'Director of Humanities', detail: 'Columbia • 19 Yrs Exp', rating: '4.9 ★★★★★' }
    ]
  },
  {
    keys: ['fitness', 'gym', 'workout', 'yoga', 'crossfit', 'trainer', 'training', 'bodybuilding', 'pilates'],
    category: 'Fitness & Athletics',
    defaultName: 'Apex Athletics & High-Performance Gym',
    tagline: 'Transform Your Body. Elevate Your Mind.',
    subtagline: 'Olympic strength facilities, metabolic conditioning, recovery cryo suites, and personalized elite coaching.',
    theme: {
      primary: 'rose',
      secondary: 'red',
      accent: 'amber',
      bg: 'zinc-950',
      badge: '⚡ Claim Your Free 7-Day Performance Pass'
    },
    cta: 'Start Free Trial',
    interactiveType: 'booking',
    services: [
      { icon: '🏋️', title: 'Olympic Weightlifting & Strength', desc: 'Eleiko calibrated plates, custom power racks, and certified strength coaches.' },
      { icon: '⚡', title: 'HIIT & Metabolic Conditioning', desc: 'Heart-rate tracked anaerobic intervals designed to maximize post-workout calorie burn.' },
      { icon: '🧘', title: 'Hot Vinyasa Yoga & Breathwork', desc: 'Infrared-heated sanctuary for mobility, core strength, and deep stress reduction.' },
      { icon: '🥊', title: 'Boxing & Combat Conditioning', desc: 'Heavy bag drills, footwork fundamentals, and authentic ring training for all levels.' },
      { icon: '❄️', title: 'Recovery Suite & Cryotherapy', desc: 'Cold plunge tubs, infrared saunas, and NormaTec compression recovery systems.' },
      { icon: '🥗', title: 'Precision Sports Nutrition', desc: 'Tailored macronutrient meal plans and DEXA body composition scanning.' }
    ],
    teamTitle: 'Elite Performance Coaches',
    team: [
      { name: 'Marcus Steel', role: 'Head of Strength & Conditioning', detail: 'CSCS Certified • 15 Yrs Exp', rating: '5.0 ★★★★★' },
      { name: 'Maya Lin', role: 'Lead Yoga & Mobility Instructor', detail: 'E-RYT 500 • 12 Yrs Exp', rating: '5.0 ★★★★★' },
      { name: 'Derrick Hall', role: 'Boxing & Striking Coach', detail: 'Former Golden Gloves • 14 Yrs Exp', rating: '4.9 ★★★★★' }
    ]
  },
  {
    keys: ['shop', 'store', 'ecommerce', 'product', 'sneaker', 'clothing', 'fashion', 'boutique', 'merch', 'jewelry', 'shoes'],
    category: 'E-commerce & Retail Store',
    defaultName: 'Aura Collective - Curated Essentials',
    tagline: 'Modern Craftsmanship. Uncompromising Style.',
    subtagline: 'Limited-edition releases, sustainable materials, and timeless aesthetic pieces crafted for everyday life.',
    theme: {
      primary: 'rose',
      secondary: 'pink',
      accent: 'amber',
      bg: 'zinc-950',
      badge: '✨ Free Express Worldwide Shipping on Orders Over $150'
    },
    cta: 'Shop the Collection',
    interactiveType: 'shop',
    services: [
      { icon: '🧥', title: 'Artisanal Outerwear', desc: 'Japanese selvedge denim and weather-resistant recycled technical fabrics.' },
      { icon: '👟', title: 'Footwear & Silhouettes', desc: 'Handcrafted Italian leather sneakers engineered for ergonomic day-long comfort.' },
      { icon: '🕶️', title: 'Eyewear & Accessories', desc: 'Custom titanium frames with polarized Japanese nylon optics and UV400 defense.' },
      { icon: '🎒', title: 'Travel & Everyday Bags', desc: 'Waterproof Cordura ballistic nylon backpacks with magnetic Fidlock hardware.' },
      { icon: '⏱️', title: 'Precision Timepieces', desc: 'Automatic mechanical movements with scratch-resistant sapphire crystal glass.' },
      { icon: '♻️', title: '100% Sustainable Packaging', desc: 'Carbon-neutral delivery with biodegradable vegetable ink gift packaging.' }
    ],
    teamTitle: 'Featured Designers',
    team: [
      { name: 'Kai Takahashi', role: 'Head of Apparel Design', detail: 'Tokyo Design Studio • 14 Yrs Exp', rating: '5.0 ★★★★★' },
      { name: 'Elena Moretti', role: 'Master Leather Crafter', detail: 'Milan Artisans • 18 Yrs Exp', rating: '4.9 ★★★★★' }
    ]
  },
  {
    keys: ['pet', 'dog', 'cat', 'animal', 'grooming', 'vet', 'veterinary', 'puppy', 'daycare'],
    category: 'Pet Care & Veterinary',
    defaultName: 'Paws & Whiskers Luxury Pet Spa & Care',
    tagline: 'Premier Grooming & Veterinary Wellness for Your Best Friends.',
    subtagline: 'Gentle cage-free grooming, certified veterinary health exams, and luxury doggy daycare suites.',
    theme: {
      primary: 'teal',
      secondary: 'emerald',
      accent: 'amber',
      bg: 'slate-950',
      badge: '🐾 Voted #1 Pet Care & Grooming Center 2026'
    },
    cta: 'Book Spa Appointment',
    interactiveType: 'booking',
    services: [
      { icon: '✂️', title: 'Hydro-Surge Spa & Styling', desc: 'Aromatherapy bath, hypoallergenic organic shampoo, blowouts, and breed-specific styling.' },
      { icon: '🩺', title: 'Veterinary Wellness Care', desc: 'Vaccinations, dental cleanings, microchipping, and comprehensive physical exams.' },
      { icon: '🎾', title: 'Cage-Free Daycare & Play', desc: 'Climate-controlled indoor dog parks with constant supervision and webcams.' },
      { icon: '🏨', title: 'Luxury Boarding Suites', desc: 'Private themed sleeping suites with orthopedic beds and nightly belly rubs.' },
      { icon: '🦴', title: 'Nutrition & Holistic Diet', desc: 'Raw, grain-free, and organic pet food consultation tailored to breed allergies.' },
      { icon: '🐕', title: 'Behavior & Agility Training', desc: 'Positive reinforcement obedience classes, leash manners, and agility fundamentals.' }
    ],
    teamTitle: 'Certified Pet Stylists & Caregivers',
    team: [
      { name: 'Chloe Bennett', role: 'Master Certified Groomer', detail: 'Fear-Free Certified • 11 Yrs Exp', rating: '5.0 ★★★★★' },
      { name: 'Dr. James Thorne, DVM', role: 'Chief Veterinary Officer', detail: 'Cornell Vet • 16 Yrs Exp', rating: '5.0 ★★★★★' }
    ]
  },
  {
    keys: ['portfolio', 'resume', 'developer', 'designer', 'freelancer', 'photographer', 'artist', 'creative'],
    category: 'Creative Portfolio',
    defaultName: 'Alex Rivers - Creative Developer & Architect',
    tagline: 'Designing Exceptional Digital Experiences.',
    subtagline: 'Specializing in reactive UI design systems, full-stack cloud architecture, and high-performance WebGL applications.',
    theme: {
      primary: 'amber',
      secondary: 'orange',
      accent: 'yellow',
      bg: 'neutral-950',
      badge: '💼 Available for Select Q3/Q4 Client Projects'
    },
    cta: 'View Selected Works',
    interactiveType: 'portfolio',
    services: [
      { icon: '💻', title: 'Frontend Engineering', desc: 'Ultra-fast Next.js, React, and TypeScript web applications with micro-interactions.' },
      { icon: '🎨', title: 'Design Systems & Tokens', desc: 'Scalable Figma component systems and Tailwind tokenized styling libraries.' },
      { icon: '⚡', title: 'High-Scale Cloud APIs', desc: 'Distributed microservices, GraphQL gateways, and serverless edge functions.' },
      { icon: '📱', title: 'Cross-Platform Mobile Apps', desc: 'Native iOS and Android user experiences built with React Native and Swift.' },
      { icon: '🧊', title: 'Interactive 3D & Three.js', desc: 'Custom shader development, WebGL visualizations, and immersive 3D web scenes.' },
      { icon: '📈', title: 'Conversion Rate Optimization', desc: 'Audited performance speedups and accessibility improvements yielding higher ROI.' }
    ],
    teamTitle: 'Selected Case Studies',
    team: [
      { name: 'Pulse AI Financial', role: 'Fintech Forecasting Engine', detail: 'Next.js / Python / Tailwind', rating: 'Featured on Product Hunt #1' },
      { name: 'Aura Component Library', role: 'Design System for Enterprise', detail: 'React / Storybook / Figma', rating: '12,000+ GitHub Stars' },
      { name: 'Zenith Habit App', role: 'Mobile Wellness Companion', detail: 'React Native / SQLite', rating: 'App Store Editor’s Choice' }
    ]
  }
];

function detectThemeModifier(pLower) {
  if (
    pLower.includes('retro') ||
    pLower.includes('vintage') ||
    pLower.includes('80s') ||
    pLower.includes('70s') ||
    pLower.includes('90s') ||
    pLower.includes('nostalg') ||
    pLower.includes('vaporwave') ||
    pLower.includes('pixel') ||
    pLower.includes('old school') ||
    pLower.includes('classic')
  ) {
    return 'retro';
  }
  if (
    pLower.includes('cyberpunk') ||
    pLower.includes('neon') ||
    pLower.includes('futur') ||
    pLower.includes('scifi') ||
    pLower.includes('sci-fi') ||
    pLower.includes('matrix')
  ) {
    return 'cyberpunk';
  }
  if (
    pLower.includes('minimal') ||
    pLower.includes('brutal') ||
    pLower.includes('mono') ||
    pLower.includes('black and white') ||
    pLower.includes('monochrome')
  ) {
    return 'minimalist';
  }
  return 'default';
}

// Universal fallback generator for ANY prompt in existence
function generateTemplateFromPrompt(rawPrompt = '') {
  const prompt = rawPrompt.trim();
  const pLower = prompt.toLowerCase();
  const words = pLower.split(/[^a-z0-9]+/);
  const themeModifier = detectThemeModifier(pLower);

  // Accurate word matching
  let matched = INDUSTRY_PRESETS.find(preset =>
    preset.keys.some(k => words.includes(k) || (k.includes(' ') && pLower.includes(k)))
  );

  // If no direct keyword match, construct a bespoke archetype from prompt keywords
  if (!matched) {
    matched = buildDynamicPreset(prompt);
  }

  // Clone preset so we don't mutate original
  const presetClone = JSON.parse(JSON.stringify(matched));

  // Apply theme modifications (retro, cyberpunk, minimalist)
  if (themeModifier === 'retro') {
    presetClone.isRetro = true;
    presetClone.theme = {
      primary: 'amber',
      secondary: 'orange',
      accent: 'yellow',
      bg: 'stone-950',
      badge: '📼 VINTAGE RETRO ARCHIVE • EST. 1978 • OLD-SCHOOL EXCELLENCE'
    };

    // If healthcare/hospital specifically
    if (presetClone.category.includes('Healthcare') || presetClone.keys.includes('hospital') || pLower.includes('hospital') || pLower.includes('doctor') || pLower.includes('clinic')) {
      presetClone.defaultName = 'St. Jude & Hope Memorial Hospital';
      presetClone.tagline = 'Classic Vintage Care. Timeless Healing Heritage.';
      presetClone.subtagline = 'Serving families with compassionate bedside medicine, dedicated analog laboratory diagnostics, and 24-hour emergency rotary dispatch since 1978.';
      presetClone.cta = 'Patient Intake & Records';
      presetClone.services = [
        { icon: '❤️', title: 'Analog Cardiology & EKG Tracing', desc: 'Precision analog EKG rhythm tracing, cardiovascular auscultation, and restorative heart care.' },
        { icon: '🧠', title: 'Neurological Examination', desc: 'Classic reflex assessment, cranial nerve diagnostic mapping, and comprehensive neurological counsel.' },
        { icon: '👶', title: 'Family Practice & Pediatrics', desc: 'Attentive bedside family medicine, pediatric growth tracking, and preventative wellness examinations.' },
        { icon: '🦴', title: 'Orthopedics & Bone Setting', desc: 'Traditional plaster casting, manual fracture reduction, and convalescent joint rehabilitation.' },
        { icon: '💊', title: 'Apothecary & Dispensary', desc: 'Registered pharmacopeia dispensary, custom compounded formulations, and natural botanical elixirs.' },
        { icon: '🚑', title: '24/7 Rotary Ambulance Dispatch', desc: 'Immediate municipal ambulance response, trauma field triage, and 24-hour analog emergency room.' }
      ];
      presetClone.teamTitle = 'Medical Faculty & Superintendents';
      presetClone.team = [
        { name: 'Dr. Arthur Vance, MD', role: 'Chief Medical Superintendent', detail: 'Harvard Medical Class of 1974 • 24 Yrs Exp', rating: '★★★★★ Official Register' },
        { name: 'Dr. Eleanor Sterling, MD', role: 'Head of Pediatric Medicine', detail: 'Johns Hopkins Class of 1978 • 20 Yrs Exp', rating: '★★★★★ Official Register' },
        { name: 'Dr. Walter Hayes, MD', role: 'Senior Trauma & Surgical Lead', detail: 'Mayo Clinic Class of 1972 • 26 Yrs Exp', rating: '★★★★★ Official Register' },
        { name: 'Nurse Beatrice Higgins, RN', role: 'Head Ward Matron', detail: 'St. Mary’s School of Nursing 1976', rating: '★★★★★ Official Register' }
      ];
    } else {
      presetClone.defaultName = `${presetClone.defaultName} (Retro 1978 Edition)`;
      presetClone.tagline = `Classic Vintage Quality. Timeless Heritage.`;
    }
    return assembleRetroWebsite(prompt, presetClone);
  } else if (themeModifier === 'cyberpunk') {
    presetClone.isCyberpunk = true;
    presetClone.defaultName = `CYBER-${presetClone.defaultName.toUpperCase()}`;
    presetClone.tagline = `Next-Gen Neural Systems. Cyberpunk 2099.`;
    presetClone.theme = {
      primary: 'fuchsia',
      secondary: 'cyan',
      accent: 'pink',
      bg: 'black',
      badge: '⚡ CYBERPUNK 2099 // NEURAL AUGMENTATION PROTOCOL'
    };
    return assembleCyberpunkWebsite(prompt, presetClone);
  } else if (themeModifier === 'minimalist') {
    presetClone.isMinimalist = true;
    presetClone.theme = {
      primary: 'white',
      secondary: 'slate',
      accent: 'zinc',
      bg: 'black',
      badge: '■ MONOCHROME BRUTALIST ARCHITECTURE'
    };
    return assembleMinimalistWebsite(prompt, presetClone);
  }

  return assembleModernWebsite(prompt, presetClone);
}

function buildDynamicPreset(prompt) {
  // Extract custom title or words
  const words = prompt
    .replace(/(make|create|build|a|website|for|my|the|an|page|app|platform)/gi, '')
    .trim();

  const titleWords = words.split(/\s+/).filter(Boolean);
  const capitalized = titleWords.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'Nexus Innovate';
  const brandName = capitalized.length > 2 ? `${capitalized} Co.` : 'NovaCraft Enterprise';

  return {
    category: 'Custom Enterprise & Innovation',
    defaultName: brandName,
    tagline: `Modern Solutions Engineered for ${capitalized || 'Tomorrow'}.`,
    subtagline: `Delivering premier quality, seamless client experiences, and cutting-edge results tailored to your exact needs.`,
    theme: {
      primary: 'indigo',
      secondary: 'purple',
      accent: 'pink',
      bg: 'slate-950',
      badge: '✨ Experience the Next Level of Excellence'
    },
    cta: 'Get Started Today',
    interactiveType: 'consultation',
    services: [
      { icon: '⚡', title: 'Premium Solutions', desc: `Tailored services and top-tier capabilities specifically designed for ${capitalized || 'your goals'}.` },
      { icon: '🛡️', title: 'Trusted Quality & Security', desc: 'Industry-standard compliance, guaranteed satisfaction, and dedicated ongoing support.' },
      { icon: '🚀', title: 'Rapid Execution', desc: 'Fast turnaround times with meticulous attention to detail and precision performance.' },
      { icon: '💎', title: 'Customized Consultation', desc: 'One-on-one tailored strategies to elevate your brand and drive sustainable growth.' },
      { icon: '🌐', title: 'Seamless Integration', desc: 'Modern digital workflows that connect effortlessly with your existing tools and stack.' },
      { icon: '⭐', title: 'Five-Star Experience', desc: 'Award-winning service recognized by industry leaders and community members alike.' }
    ],
    teamTitle: 'Leadership & Specialists',
    team: [
      { name: 'Alex Morgan', role: 'Managing Director', detail: 'Industry Pioneer • 15 Yrs Exp', rating: '5.0 ★★★★★' },
      { name: 'Taylor Scott', role: 'Principal Operations Lead', detail: 'Strategic Specialist • 12 Yrs Exp', rating: '4.9 ★★★★★' },
      { name: 'Jordan Rivera', role: 'Client Experience Lead', detail: 'Dedicated Consultant • 10 Yrs Exp', rating: '4.9 ★★★★★' }
    ]
  };
}

function assembleModernWebsite(prompt, preset) {
  const { defaultName, tagline, subtagline, theme, cta, services, team, teamTitle } = preset;
  const primary = theme.primary; // e.g. cyan, amber, indigo, rose, emerald

  const appCode = `import React, { useState } from 'react';

export default function App() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', note: '' });
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const services = \${JSON.stringify(services, null, 2)};
  const team = \${JSON.stringify(team, null, 2)};

  const handleForm = (e) => {
    e.preventDefault();
    if (formData.name) setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-\${theme.bg} text-slate-100 font-sans selection:bg-\${primary}-500 selection:text-white">
      {/* Top Announcement Banner */}
      <div className="bg-gradient-to-r from-\${primary}-700 to-\${theme.secondary}-700 text-white px-4 py-2 text-xs font-semibold">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span>\${theme.badge}</span>
          <span className="hidden sm:inline font-mono">● Online & Accepting New Clients</span>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-40 backdrop-blur-xl bg-\${theme.bg}/90 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-\${primary}-500 to-\${theme.secondary}-500 flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-\${primary}-500/25">
              ✦
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">
              \${defaultName.split(' ')[0]} <span className="text-\${primary}-400 font-light text-sm">\${defaultName.split(' ').slice(1).join(' ')}</span>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
            <a href="#services" className="hover:text-\${primary}-400 transition-colors">Services</a>
            <a href="#about" className="hover:text-\${primary}-400 transition-colors">About Us</a>
            <a href="#team" className="hover:text-\${primary}-400 transition-colors">Our Team</a>
            <a href="#contact" className="hover:text-\${primary}-400 transition-colors">Contact</a>
          </div>

          <div className="hidden sm:flex items-center space-x-4">
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-\${primary}-500 to-\${theme.secondary}-600 hover:from-\${primary}-400 hover:to-\${theme.secondary}-500 text-slate-950 font-bold text-xs shadow-lg shadow-\${primary}-500/25 transition-all hover:scale-102"
            >
              \${cta}
            </a>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-slate-400 hover:text-white">
            ☰
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden px-4 py-4 bg-slate-950 border-b border-slate-800 space-y-2 text-sm">
            <a href="#services" className="block text-slate-300">Services</a>
            <a href="#team" className="block text-slate-300">Team</a>
            <a href="#contact" className="block text-\${primary}-400 font-semibold">\${cta}</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 overflow-hidden text-center px-4">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-\${primary}-500/30 bg-\${primary}-500/10 text-\${primary}-300 text-xs font-semibold mb-6">
            <span>⭐ Rated #1 in Quality & Customer Satisfaction</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
            \${tagline}
          </h1>

          <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            \${subtagline}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#contact"
              className="px-7 py-3.5 rounded-xl bg-\${primary}-500 hover:bg-\${primary}-400 text-slate-950 font-bold text-sm shadow-xl shadow-\${primary}-500/20 transition-all hover:scale-105"
            >
              \${cta}
            </a>
            <a
              href="#services"
              className="px-7 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-all"
            >
              Explore Capabilities
            </a>
          </div>

          {/* Quick Stats Grid */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-3xl font-extrabold text-\${primary}-400">99.8%</div>
              <div className="text-xs text-slate-400 mt-1">Client Satisfaction</div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-3xl font-extrabold text-white">10,000+</div>
              <div className="text-xs text-slate-400 mt-1">Happy Customers</div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-3xl font-extrabold text-\${theme.secondary}-400">15+ Yrs</div>
              <div className="text-xs text-slate-400 mt-1">Proven Track Record</div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-3xl font-extrabold text-emerald-400">24/7</div>
              <div className="text-xs text-slate-400 mt-1">Active Client Care</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-slate-950/70 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-\${primary}-400 uppercase tracking-widest">What We Offer</h2>
            <p className="mt-3 text-3xl font-extrabold sm:text-4xl text-white">Full-Spectrum Capabilities</p>
            <p className="mt-3 text-slate-400 text-sm">Engineered with high standards, personalized attention, and modern technology.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, idx) => (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-\${primary}-500/50 transition-all hover:-translate-y-1 group"
              >
                <div className="text-3xl mb-4 p-3 w-14 h-14 rounded-2xl bg-\${primary}-500/10 border border-\${primary}-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-\${primary}-300 transition-colors">
                  {s.title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                  {s.desc}
                </p>
                <a href="#contact" className="text-\${primary}-400 text-xs font-bold inline-flex items-center gap-1 hover:underline">
                  <span>Learn More</span> →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team / Leadership */}
      <section id="team" className="py-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-\${primary}-400 uppercase tracking-widest">\${teamTitle}</h2>
            <p className="mt-3 text-3xl font-extrabold sm:text-4xl text-white">Meet Our Experts</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((m, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 text-center hover:border-\${primary}-500/40 transition-all">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-\${primary}-600 to-\${theme.secondary}-600 flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg">
                  {m.name.charAt(0)}
                </div>
                <h4 className="font-bold text-white text-base">{m.name}</h4>
                <p className="text-\${primary}-400 text-xs font-medium mt-1">{m.role}</p>
                <p className="text-slate-400 text-xs mt-2">{m.detail}</p>
                <div className="text-amber-400 text-xs mt-2 font-mono">{m.rating}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Booking / Consultation Section */}
      <section id="contact" className="py-20 bg-slate-950/80 border-t border-slate-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-white">Ready to Get Started?</h2>
          <p className="mt-2 text-slate-400 text-sm">Send us a message or schedule a consultation. We respond within 15 minutes.</p>

          <div className="mt-8 p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl text-left">
            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-sm text-center">
                <div className="text-3xl mb-2">🎉</div>
                <h4 className="font-bold text-base text-white">Thank You, {formData.name}!</h4>
                <p className="mt-2 text-xs text-emerald-200">
                  Your inquiry has been received. Our team will contact you shortly at {formData.email || formData.phone || 'your details'}.
                </p>
                <button onClick={() => setSubmitted(false)} className="mt-4 px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-semibold">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleForm} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-\${primary}-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Email or Phone</label>
                    <input
                      type="text"
                      required
                      placeholder="contact@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-\${primary}-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Message or Specific Request</label>
                  <textarea
                    rows="3"
                    placeholder="Tell us about what you need..."
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-\${primary}-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-\${primary}-500 to-\${theme.secondary}-600 hover:from-\${primary}-400 hover:to-\${theme.secondary}-500 text-slate-950 font-bold text-xs shadow-lg shadow-\${primary}-500/25 transition-all"
                >
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12 text-slate-400 text-xs text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-white text-sm">\${defaultName}</span>
            <span>© {new Date().getFullYear()}. All rights reserved.</span>
          </div>
          <div className="flex space-x-6 text-slate-500">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
`;

  return {
    title: defaultName,
    description: tagline,
    files: {
      '/App.js': appCode,
      '/styles.css': `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n`,
      '/public/index.html': `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>\${defaultName}</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-\${theme.bg}">
    <div id="root"></div>
  </body>
</html>`
    }
  };
}

function assembleRetroWebsite(prompt, preset) {
  const { defaultName, tagline, subtagline, theme, cta, services, team, teamTitle } = preset;

  const appCode = `import React, { useState } from 'react';

export default function App() {
  const [formData, setFormData] = useState({ name: '', phone: '', department: 'General Care', note: '' });
  const [submitted, setSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const services = \${JSON.stringify(services, null, 2)};
  const team = \${JSON.stringify(team, null, 2)};

  const handleForm = (e) => {
    e.preventDefault();
    if (formData.name) setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-amber-50 font-serif selection:bg-amber-500 selection:text-stone-950">
      {/* 70s Striped Vintage Top Bar */}
      <div className="bg-gradient-to-r from-amber-700 via-orange-600 to-yellow-600 text-stone-950 px-4 py-2 text-xs font-mono font-bold tracking-wider border-b-2 border-stone-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span>\${theme.badge || '📼 VINTAGE RETRO ARCHIVE • EST. 1978'}</span>
          </div>
          <span className="hidden sm:inline bg-stone-950 text-amber-300 px-2 py-0.5 text-[11px] border border-amber-500/50">
            ● ANALOG ARCHIVE ONLINE
          </span>
        </div>
      </div>

      {/* Retro Navbar */}
      <nav className="sticky top-0 z-40 bg-stone-900/95 border-b-4 border-amber-600/80 shadow-[0_4px_0px_0px_#78350f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 border-2 border-amber-400 bg-amber-500 text-stone-950 font-serif font-black flex items-center justify-center text-xl shadow-[3px_3px_0px_0px_#78350f]">
              ✚
            </div>
            <div>
              <span className="font-serif font-black text-xl tracking-tight text-amber-100 block sm:inline">
                \${defaultName.split(' ')[0]}
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-amber-400 bg-amber-950/80 border border-amber-600/50 px-2 py-0.5 ml-0 sm:ml-2">
                EST. 1978
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-xs font-mono uppercase tracking-wider text-amber-200/80">
            <a href="#services" className="hover:text-amber-400 transition-colors">Departments</a>
            <a href="#about" className="hover:text-amber-400 transition-colors">Heritage</a>
            <a href="#team" className="hover:text-amber-400 transition-colors">Faculty</a>
            <a href="#contact" className="hover:text-amber-400 transition-colors">Intake Desk</a>
          </div>

          <div className="hidden sm:flex items-center space-x-4">
            <a
              href="#contact"
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-mono font-black uppercase text-xs border-2 border-stone-900 shadow-[4px_4px_0px_0px_#92400e] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              \${cta || 'Patient Intake'}
            </a>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-amber-400 hover:text-white font-mono text-lg">
            ☰
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden px-4 py-4 bg-stone-900 border-b-2 border-amber-600 space-y-2 text-xs font-mono uppercase">
            <a href="#services" className="block text-amber-200 py-1">Departments</a>
            <a href="#team" className="block text-amber-200 py-1">Faculty</a>
            <a href="#contact" className="block text-amber-400 font-bold py-1">\${cta || 'Patient Intake'}</a>
          </div>
        )}
      </nav>

      {/* Retro Hero Section */}
      <section className="relative pt-16 pb-20 overflow-hidden text-center px-4 bg-gradient-to-b from-stone-900 via-stone-950 to-stone-950">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border-2 border-dashed border-amber-500/70 bg-amber-950/60 text-amber-300 font-mono text-xs uppercase tracking-widest mb-6 shadow-[2px_2px_0px_0px_#78350f]">
            <span>📼 OFFICIAL RETRO ARCHIVE • EST. 1978</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black tracking-tight text-amber-100 leading-tight">
            \${tagline}
          </h1>

          <p className="mt-6 text-sm sm:text-lg text-amber-200/80 max-w-2xl mx-auto leading-relaxed font-mono">
            \${subtagline}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#contact"
              className="px-7 py-3.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-mono font-black uppercase text-xs sm:text-sm border-2 border-stone-900 shadow-[5px_5px_0px_0px_#92400e] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              \${cta || 'Book Consultation'}
            </a>
            <a
              href="#services"
              className="px-7 py-3.5 bg-stone-900 hover:bg-stone-800 text-amber-200 font-mono text-xs sm:text-sm uppercase tracking-wider border-2 border-amber-600 shadow-[4px_4px_0px_0px_#78350f] transition-all"
            >
              Browse Registry
            </a>
          </div>

          {/* Retro Analog Stats Gauges */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-5 bg-stone-900 border-2 border-amber-600/70 shadow-[4px_4px_0px_0px_#92400e] font-mono text-center">
              <div className="text-3xl font-black text-amber-400 font-serif">48+ Yrs</div>
              <div className="text-[11px] text-amber-200/70 mt-1 uppercase tracking-wider">Continuous Service</div>
            </div>
            <div className="p-5 bg-stone-900 border-2 border-amber-600/70 shadow-[4px_4px_0px_0px_#92400e] font-mono text-center">
              <div className="text-3xl font-black text-amber-200 font-serif">100%</div>
              <div className="text-[11px] text-amber-200/70 mt-1 uppercase tracking-wider">Analog Reliability</div>
            </div>
            <div className="p-5 bg-stone-900 border-2 border-amber-600/70 shadow-[4px_4px_0px_0px_#92400e] font-mono text-center">
              <div className="text-3xl font-black text-orange-400 font-serif">35,000+</div>
              <div className="text-[11px] text-amber-200/70 mt-1 uppercase tracking-wider">Patients Served</div>
            </div>
            <div className="p-5 bg-stone-900 border-2 border-amber-600/70 shadow-[4px_4px_0px_0px_#92400e] font-mono text-center">
              <div className="text-3xl font-black text-amber-300 font-serif">24/7</div>
              <div className="text-[11px] text-amber-200/70 mt-1 uppercase tracking-wider">Rotary Dispatch</div>
            </div>
          </div>
        </div>
      </section>

      {/* Retro Departments / Services */}
      <section id="services" className="py-20 bg-stone-950 border-t-4 border-amber-700/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-3 py-1 bg-amber-950/80 border border-amber-600/60 text-amber-400 font-mono text-xs uppercase tracking-widest">
              [ OFFICIAL ARCHIVE DOSSIER ]
            </span>
            <h2 className="mt-4 text-3xl font-serif font-black sm:text-5xl text-amber-100">
              Featured Departments
            </h2>
            <p className="mt-3 text-amber-200/70 text-xs sm:text-sm font-mono">
              Combining classic bedside empathy with time-honored discipline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, idx) => (
              <div
                key={idx}
                className="p-7 bg-stone-900 border-2 border-amber-600/70 shadow-[5px_5px_0px_0px_#92400e] hover:border-amber-400 hover:shadow-[6px_6px_0px_0px_#d97706] transition-all group"
              >
                <div className="text-3xl mb-4 p-3 w-14 h-14 border-2 border-amber-500 bg-amber-950/60 text-amber-300 flex items-center justify-center font-mono shadow-[2px_2px_0px_0px_#b45309]">
                  {s.icon}
                </div>
                <div className="text-[10px] font-mono uppercase text-amber-400/80 tracking-widest mb-1">
                  DOSSIER #1978-0{idx + 1}
                </div>
                <h3 className="text-xl font-serif font-bold text-amber-100 mb-2 group-hover:text-amber-300 transition-colors">
                  {s.title}
                </h3>
                <p className="text-amber-200/75 text-xs sm:text-sm leading-relaxed mb-4 font-mono">
                  {s.desc}
                </p>
                <a href="#contact" className="text-amber-400 text-xs font-mono font-bold uppercase inline-flex items-center gap-1 hover:underline">
                  <span>File Inward Slip</span> →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Retro Faculty Registry */}
      <section id="team" className="py-20 bg-stone-900 border-t-4 border-amber-700/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-3 py-1 bg-amber-950/80 border border-amber-600/60 text-amber-400 font-mono text-xs uppercase tracking-widest">
              [ OFFICIAL REGISTRY ]
            </span>
            <h2 className="mt-4 text-3xl font-serif font-black sm:text-5xl text-amber-100">
              \${teamTitle || 'Distinguished Practitioners'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((m, idx) => (
              <div key={idx} className="p-6 bg-stone-950 border-2 border-amber-600/70 shadow-[4px_4px_0px_0px_#78350f] text-center">
                <div className="w-16 h-16 mx-auto border-2 border-amber-400 bg-amber-900/60 text-amber-300 flex items-center justify-center font-serif text-2xl font-black mb-4 shadow-[2px_2px_0px_0px_#b45309]">
                  {m.name.charAt(0)}
                </div>
                <h4 className="font-serif font-bold text-amber-100 text-base">{m.name}</h4>
                <p className="text-amber-400 text-xs font-mono mt-1 uppercase tracking-wider">{m.role}</p>
                <p className="text-amber-200/70 text-xs font-mono mt-2">{m.detail}</p>
                <div className="mt-3 inline-block px-2 py-0.5 bg-amber-950 border border-amber-600/50 text-amber-400 text-[11px] font-mono">
                  {m.rating}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Retro Physical Patient Intake / Admission Slip */}
      <section id="contact" className="py-20 bg-stone-950 border-t-4 border-amber-700/80">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="px-3 py-1 bg-amber-950/80 border border-amber-600/60 text-amber-400 font-mono text-xs uppercase tracking-widest">
            [ INTAKE DESK ]
          </span>
          <h2 className="mt-4 text-3xl font-serif font-black text-amber-100 sm:text-4xl">Patient Admission & Inquiries</h2>
          <p className="mt-2 text-amber-200/70 text-xs sm:text-sm font-mono">
            Official intake slip. In emergency, call rotary hotline at (800) 911-1978.
          </p>

          <div className="mt-8 p-8 bg-stone-900 border-2 border-amber-600 shadow-[6px_6px_0px_0px_#92400e] text-left">
            {submitted ? (
              <div className="p-6 bg-stone-950 border-2 border-amber-500 text-amber-300 text-center font-mono">
                <div className="text-3xl mb-2">📋</div>
                <h4 className="font-serif font-bold text-xl text-amber-100">
                  [ ✓ INTAKE SLIP FILED: #{Math.floor(1000 + Math.random() * 9000)} ]
                </h4>
                <p className="mt-2 text-xs text-amber-200/80">
                  Thank you, {formData.name}. Your physical patient folder has been logged in the dispensary archive. Our attending supervisor will respond via rotary dispatch.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-5 px-5 py-2.5 bg-amber-400 text-stone-950 font-mono font-bold uppercase text-xs border border-stone-900 shadow-[2px_2px_0px_0px_#78350f]"
                >
                  File Another Slip
                </button>
              </div>
            ) : (
              <form onSubmit={handleForm} className="space-y-4">
                <div className="border-b border-amber-600/40 pb-3 mb-4">
                  <span className="font-mono text-[11px] text-amber-400 uppercase tracking-widest">
                    FORM 1978-B // ADMISSION DOSSIER
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-amber-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Johnathan Miller"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-stone-950 border-2 border-amber-700/60 text-xs text-amber-100 placeholder-amber-700/60 font-mono focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-amber-300 mb-1">Telephone Contact</label>
                    <input
                      type="text"
                      required
                      placeholder="(800) 555-1978"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-stone-950 border-2 border-amber-700/60 text-xs text-amber-100 placeholder-amber-700/60 font-mono focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-amber-300 mb-1">Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-stone-950 border-2 border-amber-700/60 text-xs text-amber-100 font-mono focus:outline-none focus:border-amber-400"
                  >
                    <option value="General Care">General Care & Recovery</option>
                    <option value="Cardiology">Cardiology & Analog EKG</option>
                    <option value="Pediatrics">Pediatrics & Family Care</option>
                    <option value="Emergency">24-Hour Emergency Dispatch</option>
                    <option value="Apothecary">Apothecary Dispensary</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-amber-300 mb-1">Clinical Notes or Inquiry</label>
                  <textarea
                    rows="3"
                    placeholder="Describe symptoms or requirements..."
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-stone-950 border-2 border-amber-700/60 text-xs text-amber-100 placeholder-amber-700/60 font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-mono font-black uppercase text-xs sm:text-sm border-2 border-stone-900 shadow-[5px_5px_0px_0px_#92400e] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                >
                  Submit Official Slip
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Retro Footer */}
      <footer className="border-t-4 border-amber-700/80 bg-stone-950 py-12 text-amber-300/70 font-mono text-xs text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-amber-100 text-sm font-serif">\${defaultName}</span>
            <span>© 1978–{new Date().getFullYear()}. All rights reserved.</span>
          </div>
          <div className="text-amber-400 font-mono">
            ☎ Rotary Emergency Hotline: (800) 911-1978
          </div>
          <div className="flex space-x-6 text-amber-400/80">
            <a href="#" className="hover:text-amber-200">Patient Rights</a>
            <a href="#" className="hover:text-amber-200">Archives</a>
            <a href="#" className="hover:text-amber-200">Municipal Code</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
`;

  return {
    title: defaultName,
    description: tagline,
    files: {
      '/App.js': appCode,
      '/styles.css': `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n`,
      '/public/index.html': `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>\${defaultName}</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-stone-950">
    <div id="root"></div>
  </body>
</html>`
    }
  };
}

function assembleCyberpunkWebsite(prompt, preset) {
  const { defaultName, tagline, subtagline, theme, cta, services, team, teamTitle } = preset;

  const appCode = `import React, { useState } from 'react';

export default function App() {
  const [formData, setFormData] = useState({ name: '', callsign: '', neuralNode: 'Alpha-01', query: '' });
  const [submitted, setSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const services = \${JSON.stringify(services, null, 2)};
  const team = \${JSON.stringify(team, null, 2)};

  const handleForm = (e) => {
    e.preventDefault();
    if (formData.name) setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black text-cyan-100 font-mono selection:bg-fuchsia-500 selection:text-black">
      {/* Cyber Top Scanline Banner */}
      <div className="bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-500 text-black px-4 py-1.5 text-xs font-black tracking-widest border-b border-fuchsia-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span>// PROTOCOL 2099 // NEURAL OVERDRIVE ONLINE</span>
          <span className="hidden sm:inline">● SYS_STATUS: OPERATIONAL [PING: 4MS]</span>
        </div>
      </div>

      {/* Cyber Navbar */}
      <nav className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b-2 border-fuchsia-500/80 shadow-[0_0_15px_rgba(217,70,239,0.35)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 border border-cyan-400 bg-cyan-950/80 text-cyan-300 font-bold flex items-center justify-center text-lg shadow-[0_0_10px_rgba(6,182,212,0.5)]">
              ⚡
            </div>
            <span className="font-black text-lg tracking-widest text-white">
              \${defaultName} <span className="text-fuchsia-400 text-xs">[2099.V2]</span>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-xs tracking-wider text-cyan-300">
            <a href="#services" className="hover:text-fuchsia-400 transition-colors">// MODULES</a>
            <a href="#team" className="hover:text-fuchsia-400 transition-colors">// OPERATORS</a>
            <a href="#contact" className="hover:text-fuchsia-400 transition-colors">// TRANSMIT</a>
          </div>

          <div className="hidden sm:flex items-center space-x-4">
            <a
              href="#contact"
              className="px-5 py-2 bg-fuchsia-600 hover:bg-fuchsia-500 text-black font-black uppercase text-xs tracking-wider border border-fuchsia-300 shadow-[0_0_15px_rgba(217,70,239,0.6)] hover:shadow-[0_0_25px_rgba(217,70,239,0.9)] transition-all"
            >
              \${cta || 'INITIATE PROTOCOL'}
            </a>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-cyan-400 hover:text-white">
            [MENU]
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden px-4 py-4 bg-zinc-950 border-b border-fuchsia-500 space-y-2 text-xs">
            <a href="#services" className="block text-cyan-300">// MODULES</a>
            <a href="#team" className="block text-cyan-300">// OPERATORS</a>
            <a href="#contact" className="block text-fuchsia-400 font-bold">\${cta || 'INITIATE'}</a>
          </div>
        )}
      </nav>

      {/* Cyber Hero */}
      <section className="relative pt-20 pb-20 overflow-hidden text-center px-4">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1 border border-cyan-400/60 bg-cyan-950/40 text-cyan-300 text-xs tracking-widest mb-6 shadow-[0_0_10px_rgba(6,182,212,0.4)]">
            <span>⚡ NEURAL AUGMENTATION PROTOCOL READY</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight">
            \${tagline}
          </h1>

          <p className="mt-6 text-sm sm:text-lg text-cyan-300/80 max-w-2xl mx-auto leading-relaxed">
            \${subtagline}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#contact"
              className="px-7 py-3.5 bg-fuchsia-600 hover:bg-fuchsia-500 text-black font-black uppercase text-xs sm:text-sm border border-fuchsia-300 shadow-[0_0_20px_rgba(217,70,239,0.7)] transition-all"
            >
              \${cta || 'ACTIVATE UPLINK'}
            </a>
            <a
              href="#services"
              className="px-7 py-3.5 bg-black hover:bg-zinc-900 text-cyan-300 font-bold text-xs sm:text-sm uppercase border border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
            >
              EXPLORE SCHEMATICS
            </a>
          </div>

          {/* Cyber Gauges */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-5 bg-black border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.2)] text-center">
              <div className="text-3xl font-black text-cyan-400">99.9%</div>
              <div className="text-[10px] text-cyan-300/70 mt-1 uppercase tracking-widest">SYNAPSE SYNC</div>
            </div>
            <div className="p-5 bg-black border border-fuchsia-500/40 shadow-[0_0_15px_rgba(217,70,239,0.2)] text-center">
              <div className="text-3xl font-black text-fuchsia-400">50K+</div>
              <div className="text-[10px] text-fuchsia-300/70 mt-1 uppercase tracking-widest">NEURAL NODES</div>
            </div>
            <div className="p-5 bg-black border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.2)] text-center">
              <div className="text-3xl font-black text-cyan-300">0.02ms</div>
              <div className="text-[10px] text-cyan-300/70 mt-1 uppercase tracking-widest">LATENCY</div>
            </div>
            <div className="p-5 bg-black border border-fuchsia-500/40 shadow-[0_0_15px_rgba(217,70,239,0.2)] text-center">
              <div className="text-3xl font-black text-fuchsia-300">24/7</div>
              <div className="text-[10px] text-fuchsia-300/70 mt-1 uppercase tracking-widest">CYBER UPTIME</div>
            </div>
          </div>
        </div>
      </section>

      {/* Cyber Services */}
      <section id="services" className="py-20 bg-zinc-950 border-t border-cyan-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-black text-fuchsia-400 uppercase tracking-widest">// SYSTEM PROTOCOLS</h2>
            <p className="mt-3 text-3xl font-black sm:text-5xl text-white">Active Capabilities</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, idx) => (
              <div
                key={idx}
                className="p-7 bg-black border border-cyan-500/40 hover:border-fuchsia-500 shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:shadow-[0_0_25px_rgba(217,70,239,0.3)] transition-all group"
              >
                <div className="text-3xl mb-4 p-3 w-14 h-14 border border-cyan-400 bg-cyan-950/40 text-cyan-300 flex items-center justify-center">
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {s.title}
                </h3>
                <p className="text-cyan-200/70 text-xs sm:text-sm leading-relaxed mb-4">
                  {s.desc}
                </p>
                <a href="#contact" className="text-fuchsia-400 text-xs font-bold uppercase inline-flex items-center gap-1 hover:underline">
                  <span>DEPLOY NODE</span> →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cyber Operators */}
      <section id="team" className="py-20 bg-black border-t border-fuchsia-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-black text-cyan-400 uppercase tracking-widest">// ARCHITECTS</h2>
            <p className="mt-3 text-3xl font-black sm:text-5xl text-white">\${teamTitle || 'System Operators'}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((m, idx) => (
              <div key={idx} className="p-6 bg-zinc-950 border border-fuchsia-500/40 text-center hover:border-cyan-400 transition-all">
                <div className="w-16 h-16 mx-auto border border-fuchsia-400 bg-fuchsia-950/60 text-fuchsia-300 flex items-center justify-center text-2xl font-bold mb-4 shadow-[0_0_10px_rgba(217,70,239,0.4)]">
                  {m.name.charAt(0)}
                </div>
                <h4 className="font-bold text-white text-base">{m.name}</h4>
                <p className="text-cyan-400 text-xs mt-1">{m.role}</p>
                <p className="text-zinc-400 text-xs mt-2">{m.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cyber Uplink Form */}
      <section id="contact" className="py-20 bg-zinc-950 border-t border-cyan-500/30">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white sm:text-4xl">// TRANSMIT ENCRYPTED QUERY</h2>
          <p className="mt-2 text-cyan-300/70 text-xs sm:text-sm">Direct uplink channel. End-to-end quantum encrypted.</p>

          <div className="mt-8 p-8 bg-black border-2 border-fuchsia-500 shadow-[0_0_25px_rgba(217,70,239,0.3)] text-left">
            {submitted ? (
              <div className="p-6 bg-cyan-950/50 border border-cyan-400 text-cyan-300 text-center">
                <div className="text-3xl mb-2">⚡</div>
                <h4 className="font-bold text-xl text-white">[ TRANSMISSION BROADCAST SUCCESSFUL ]</h4>
                <p className="mt-2 text-xs">
                  Signal received for user: {formData.name}. Node route logged. Standby for quantum decryption response.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-2 bg-fuchsia-600 text-black font-bold text-xs uppercase"
                >
                  SEND NEW TRANSMISSION
                </button>
              </div>
            ) : (
              <form onSubmit={handleForm} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase text-cyan-300 mb-1">// IDENTITY NAME</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Neo Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-zinc-950 border border-cyan-500/60 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-fuchsia-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase text-cyan-300 mb-1">// COMM CALLSIGN / COMMS</label>
                    <input
                      type="text"
                      required
                      placeholder="neo@matrix.io"
                      value={formData.callsign}
                      onChange={(e) => setFormData({ ...formData, callsign: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-zinc-950 border border-cyan-500/60 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-fuchsia-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase text-cyan-300 mb-1">// PAYLOAD DATA</label>
                  <textarea
                    rows="3"
                    placeholder="Enter encrypted instructions or system query..."
                    value={formData.query}
                    onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-cyan-500/60 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-fuchsia-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-fuchsia-600 hover:bg-fuchsia-500 text-black font-black uppercase text-xs border border-fuchsia-300 shadow-[0_0_20px_rgba(217,70,239,0.7)] transition-all"
                >
                  BROADCAST SIGNAL
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Cyber Footer */}
      <footer className="border-t border-cyan-500/30 bg-black py-12 text-zinc-500 text-xs text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-white text-sm">\${defaultName}</span>
            <span>// YEAR 2099 CYBER PROTOCOL.</span>
          </div>
          <div className="flex space-x-6 text-cyan-400">
            <a href="#" className="hover:text-white">// SECURITY</a>
            <a href="#" className="hover:text-white">// PROTOCOL</a>
            <a href="#" className="hover:text-white">// TERMINAL</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
`;

  return {
    title: defaultName,
    description: tagline,
    files: {
      '/App.js': appCode,
      '/styles.css': `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n`,
      '/public/index.html': `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>\${defaultName}</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-black">
    <div id="root"></div>
  </body>
</html>`
    }
  };
}

function assembleMinimalistWebsite(prompt, preset) {
  const { defaultName, tagline, subtagline, theme, cta, services, team, teamTitle } = preset;

  const appCode = `import React, { useState } from 'react';

export default function App() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const services = \${JSON.stringify(services, null, 2)};
  const team = \${JSON.stringify(team, null, 2)};

  const handleForm = (e) => {
    e.preventDefault();
    if (formData.name) setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-white selection:text-black">
      {/* Brutalist Top Bar */}
      <div className="bg-white text-black px-4 py-2 text-xs font-bold uppercase tracking-widest border-b-2 border-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span>■ MONOCHROME ARCHITECTURE 01</span>
          <span>EST. MMXXVI</span>
        </div>
      </div>

      {/* Brutalist Navbar */}
      <nav className="sticky top-0 z-40 bg-black border-b-2 border-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <span className="font-bold text-lg uppercase tracking-widest">
            ■ \${defaultName}
          </span>

          <div className="hidden md:flex items-center space-x-8 text-xs font-bold uppercase tracking-widest">
            <a href="#services" className="hover:text-zinc-400">/ Capabilities</a>
            <a href="#team" className="hover:text-zinc-400">/ Directors</a>
            <a href="#contact" className="hover:text-zinc-400">/ Inquire</a>
          </div>

          <a
            href="#contact"
            className="px-5 py-2.5 bg-white text-black font-bold uppercase text-xs border-2 border-white hover:bg-black hover:text-white transition-all"
          >
            \${cta || 'Connect'}
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-24 px-4 text-left max-w-7xl mx-auto border-b-2 border-white">
        <h1 className="text-4xl sm:text-7xl font-bold uppercase tracking-tight leading-none">
          \${tagline}
        </h1>
        <p className="mt-8 text-base sm:text-xl text-zinc-400 max-w-3xl leading-relaxed">
          \${subtagline}
        </p>
        <div className="mt-10 flex gap-4">
          <a href="#contact" className="px-8 py-4 bg-white text-black font-bold uppercase text-xs border-2 border-white hover:bg-black hover:text-white transition-all">
            \${cta || 'Initiate Contact'}
          </a>
        </div>
      </section>

      {/* Capabilities */}
      <section id="services" className="py-20 border-b-2 border-white max-w-7xl mx-auto px-4">
        <h2 className="text-xs uppercase tracking-widest text-zinc-500 mb-8">■ Capabilities Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, idx) => (
            <div key={idx} className="p-6 border-2 border-white hover:bg-zinc-950 transition-colors">
              <div className="text-2xl mb-4">{s.icon}</div>
              <h3 className="text-lg font-bold uppercase mb-2">{s.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-bold uppercase mb-4">■ Inquire</h2>
        {submitted ? (
          <div className="p-6 border-2 border-white text-center">
            <h4 className="font-bold uppercase">Record Received.</h4>
            <p className="text-xs text-zinc-400 mt-2">Our partners will respond via dispatched memo.</p>
          </div>
        ) : (
          <form onSubmit={handleForm} className="space-y-4">
            <div>
              <label className="block text-xs uppercase mb-1">Your Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-3 bg-black border-2 border-white text-xs text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs uppercase mb-1">Contact Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-3 bg-black border-2 border-white text-xs text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs uppercase mb-1">Specification</label>
              <textarea
                rows="3"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 py-3 bg-black border-2 border-white text-xs text-white focus:outline-none"
              />
            </div>
            <button type="submit" className="w-full py-4 bg-white text-black font-bold uppercase text-xs border-2 border-white hover:bg-black hover:text-white transition-all">
              Submit Specification
            </button>
          </form>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-white py-8 text-center text-xs text-zinc-500 uppercase">
        \${defaultName} — All Rights Reserved.
      </footer>
    </div>
  );
}
`;

  return {
    title: defaultName,
    description: tagline,
    files: {
      '/App.js': appCode,
      '/styles.css': `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n`,
      '/public/index.html': `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>\${defaultName}</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-black">
    <div id="root"></div>
  </body>
</html>`
    }
  };
}

export { generateTemplateFromPrompt, generateTemplateFromPrompt as getClientTemplate };
