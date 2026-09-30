const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '..', 'src', 'App.tsx');
let content = fs.readFileSync(appPath, 'utf8');

console.log('Starting apply_user_fixes. Original App.tsx lines:', content.split('\n').length);

// -------------------------------------------------------------
// 1. ADD heroContainerRef
// -------------------------------------------------------------
if (!content.includes('const heroContainerRef = useRef<HTMLDivElement>(null);')) {
  content = content.replace(
    `const fileInputRef = useRef<HTMLInputElement>(null);`,
    `const heroContainerRef = useRef<HTMLDivElement>(null);\n  const fileInputRef = useRef<HTMLInputElement>(null);`
  );
  console.log('Added heroContainerRef.');
}

// -------------------------------------------------------------
// 2. UPDATE SCROLL LISTENER TO PIN HERO UNTIL HERO 2 IS 100% SHOWN
// -------------------------------------------------------------
const oldScrollEffectRegex = /\/\/ Smooth scroll listener: transitions from Hero 1 to Hero 2[\s\S]*?return \(\) => window\.removeEventListener\('scroll', handleScroll\);\s*\}, \[\]\);/;

const newScrollEffect = `// Pinned Hero Scroll Engine:
  // As user scrolls, the Hero remains pinned in place (sticky top-0 h-screen).
  // Hero 1 crossfades smoothly to Hero 2 (progress 0 -> 1).
  // Only after Hero 2 is fully visible does the scroll continue down into Section 2 (About Us).
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (heroContainerRef.current) {
            const rect = heroContainerRef.current.getBoundingClientRect();
            const totalScrollableDistance = heroContainerRef.current.offsetHeight - window.innerHeight;
            if (totalScrollableDistance > 0) {
              // As user scrolls down, rect.top goes from 0 down to -totalScrollableDistance
              const progress = Math.min(1, Math.max(0, -rect.top / totalScrollableDistance));
              setScrollProgress(progress);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);`;

if (oldScrollEffectRegex.test(content)) {
  content = content.replace(oldScrollEffectRegex, newScrollEffect);
  console.log('Updated scroll effect for pinned Hero.');
} else {
  console.warn('Could not match oldScrollEffectRegex, will verify.');
}

// -------------------------------------------------------------
// 3. WRAP HERO SECTION IN PINNED SCROLL CONTAINER & FIX HEADER CLUSTERING
// -------------------------------------------------------------
const oldHeroHeaderRegex = /\{\/\* ========================================================================= \*\}\s*\{\/\* 1\. HERO SECTION \(CONTAINING THE DUAL VIDEO BACKGROUND ENGINE\)[\s\S]*?<section className="relative min-h-screen flex flex-col justify-between overflow-hidden z-10">/;

const newHeroSectionStart = `{/* ========================================================================= */}
      {/* 1. HERO SECTION (PINNED HERO CONTAINER: HERO 2 FULLY REVEALS BEFORE SCROLLING) */}
      {/* ========================================================================= */}
      <div id="home" ref={heroContainerRef} className="relative h-[190vh] w-full">
        <section className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden z-10">`;

if (oldHeroHeaderRegex.test(content)) {
  content = content.replace(oldHeroHeaderRegex, newHeroSectionStart);
  console.log('Wrapped Hero section in pinned container start.');
} else {
  console.warn('Could not match oldHeroHeaderRegex.');
}

// Close the pinned container div after the hero section closes
// Hero section ends right before Section 2:
const oldHeroEndRegex = /<\/div>\s*<\/section>\s*\{\/\* ========================================================================= \*\/\s*\{\/\* 2\. NEXT SECTION: LEADING GLOBAL LOGISTIC AND TRANSPORT AGENCY/;

const newHeroEnd = `</div>
        </section>
      </div>

      {/* ========================================================================= */}
      {/* 2. NEXT SECTION: LEADING GLOBAL LOGISTIC AND TRANSPORT AGENCY`;

if (oldHeroEndRegex.test(content)) {
  content = content.replace(oldHeroEndRegex, newHeroEnd);
  console.log('Closed Hero pinned container div.');
} else {
  console.warn('Could not match oldHeroEndRegex.');
}

// -------------------------------------------------------------
// 4. FIX HEADER MENU & LOGO CLUSTERING
// -------------------------------------------------------------
const oldHeaderRegex = /<header className="flex items-center justify-between w-full pb-4 sm:pb-6">[\s\S]*?<\/header>/;

const newHeader = `<header className="flex items-center justify-between w-full pb-4 sm:pb-6 relative z-30">
            
            {/* Logo Mark: Marvglobal Freight Globe & Swoosh Logo (Preserves space without shrinking) */}
            <div 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2.5 sm:gap-3 select-none cursor-pointer group flex-shrink-0 mr-4"
            >
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 transition-transform group-hover:scale-105">
                <svg 
                  viewBox="0 0 115 95" 
                  className="w-full h-full drop-shadow-[0_2px_10px_rgba(139,13,26,0.5)]" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Marvglobal Freight Logo"
                >
                  <defs>
                    <radialGradient id="marvGlobeGrad" cx="38%" cy="36%" r="65%">
                      <stop offset="0%" stopColor="#A31222" />
                      <stop offset="60%" stopColor="#8B0D1A" />
                      <stop offset="100%" stopColor="#5A0710" />
                    </radialGradient>
                    <linearGradient id="marvSwooshGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#720A15" />
                      <stop offset="40%" stopColor="#8B0D1A" />
                      <stop offset="100%" stopColor="#A31222" />
                    </linearGradient>
                    <clipPath id="marvGlobeClip">
                      <circle cx="48" cy="46" r="30" />
                    </clipPath>
                  </defs>

                  <path
                    d="M 64,18 C 55,13 44,11 34,15 C 22,19 14,29 11,43 C 9,52 11,61 14,68 C 11,62 8,52 9,43 C 12,27 21,17 34,13 C 44,9 56,11 65,16 Z"
                    fill="url(#marvSwooshGrad)"
                  />
                  <circle cx="48" cy="46" r="30" fill="url(#marvGlobeGrad)" />
                  <g clipPath="url(#marvGlobeClip)">
                    <path
                      d="M 28,26 C 30,22 34,20 38,20 C 41,21 43,23 42,26 C 40,28 38,30 40,32 C 42,33 44,35 43,38 C 41,40 37,39 34,42 C 32,43 31,45 29,44 C 27,42 25,36 26,31 C 26,28 27,27 28,26 Z"
                      fill="#FFFFFF"
                    />
                    <path d="M 43,18 C 45,17 48,18 47,21 C 45,23 43,22 43,18 Z" fill="#FFFFFF" />
                    <path
                      d="M 33,48 C 37,46 40,49 41,53 C 42,58 40,64 37,68 C 35,72 32,74 31,73 C 30,70 31,64 30,59 C 29,54 30,49 33,48 Z"
                      fill="#FFFFFF"
                    />
                    <path d="M 50,24 C 53,21 57,21 60,24 C 61,27 58,29 55,30 C 52,30 50,27 50,24 Z" fill="#FFFFFF" />
                    <path
                      d="M 50,35 C 55,33 60,35 63,39 C 65,44 64,50 61,54 C 58,59 55,64 53,67 C 51,68 50,64 50,60 C 50,55 48,51 48,46 C 48,41 48,37 50,35 Z"
                      fill="#FFFFFF"
                    />
                  </g>
                  <path
                    d="M 2,58 C 10,68 22,69 35,67 C 50,63 70,53 90,38 C 98,32 106,25 110,21 C 106,24 95,34 85,41 C 68,52 48,61 32,62 C 20,62 9,58 2,58 Z"
                    fill="url(#marvSwooshGrad)"
                  />
                </svg>
              </div>

              <div className="flex flex-col justify-center leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] flex-shrink-0">
                <span className="text-base sm:text-lg lg:text-[20px] font-black tracking-tight text-white font-sans whitespace-nowrap">
                  Marvglobal
                </span>
                <span className="text-[11px] sm:text-xs font-bold text-[#8B0D1A] tracking-[0.24em] lowercase mt-0.5 pl-0.5 whitespace-nowrap">
                  freight
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links (Switches cleanly at xl: 1280px to avoid squishing on 1024-1279px screens) */}
            <nav className="hidden xl:flex items-center gap-5 2xl:gap-7 text-xs font-bold tracking-wider text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] flex-shrink-0">
              <a 
                href="#home" 
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-[#8B0D1A] transition-colors py-1 cursor-pointer whitespace-nowrap"
              >
                HOME
              </a>

              <button
                onClick={() => scrollToSection('services-section')}
                className="hover:text-[#8B0D1A] transition-colors py-1 cursor-pointer whitespace-nowrap"
              >
                SERVICES
              </button>

              <button 
                onClick={scrollToAboutSection}
                className="hover:text-[#8B0D1A] transition-colors py-1 cursor-pointer whitespace-nowrap"
              >
                ABOUT US
              </button>

              <button 
                onClick={() => scrollToSection('process-section')}
                className="hover:text-[#8B0D1A] transition-colors py-1 cursor-pointer whitespace-nowrap"
              >
                HOW IT WORKS
              </button>

              <button 
                onClick={() => scrollToSection('pricing-section')}
                className="hover:text-[#8B0D1A] transition-colors py-1 cursor-pointer whitespace-nowrap"
              >
                PRICING
              </button>

              <button 
                onClick={() => scrollToSection('faq-section')}
                className="hover:text-[#8B0D1A] transition-colors py-1 cursor-pointer whitespace-nowrap"
              >
                FAQ
              </button>

              <button 
                onClick={() => {
                  setActiveTab('track');
                  const inputEl = document.getElementById('tracking-input');
                  inputEl?.focus();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-[#8B0D1A] transition-colors py-1 cursor-pointer whitespace-nowrap"
              >
                TRACKING
              </button>

              <button 
                onClick={() => setShowHelpModal(true)}
                className="hover:text-[#8B0D1A] transition-colors py-1 cursor-pointer whitespace-nowrap"
              >
                SUPPORT
              </button>
            </nav>

            {/* Right Header Actions */}
            <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
              <a
                href="tel:+8801234567891"
                className="hidden 2xl:flex items-center gap-2 px-3.5 py-2 rounded-lg border border-white/30 hover:border-white/70 text-white text-xs font-semibold transition-all bg-black/40 hover:bg-black/60 active:scale-95 backdrop-blur-sm shadow-md whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5 text-white stroke-[2.2]" />
                <span className="tracking-wide">+880 1234567891</span>
              </a>

              <button
                onClick={() => setShowGetStartedModal(true)}
                className="hidden sm:flex bg-white hover:bg-neutral-100 text-black pl-1.5 pr-4 py-1.5 rounded-lg items-center gap-2 transition shadow-xl active:scale-95 group cursor-pointer flex-shrink-0 whitespace-nowrap"
              >
                <div className="w-7 h-7 rounded-md bg-[#8B0D1A] flex items-center justify-center text-white transition-transform group-hover:scale-105">
                  <ChevronsRight className="w-4 h-4 stroke-[3]" />
                </div>
                <span className="text-xs font-bold tracking-tight text-neutral-900 whitespace-nowrap">
                  Get Started Now
                </span>
              </button>

              {/* Mobile & Tablet Hamburger (Displays on screens < 1280px to guarantee zero clutter) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 rounded-lg border border-white/30 text-white hover:bg-white/10 bg-black/40 cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </header>`;

if (oldHeaderRegex.test(content)) {
  content = content.replace(oldHeaderRegex, newHeader);
  console.log('Replaced Header with uncluttered responsive navigation.');
} else {
  console.warn('Could not match oldHeaderRegex.');
}

// Update Mobile menu class to trigger on xl:hidden as well
content = content.replace(/className="lg:hidden w-full bg-neutral-950\/95/, 'className="xl:hidden w-full bg-neutral-950/95');

// -------------------------------------------------------------
// 5. SHIFT SECTION 2 "MARVGLOBAL" WATERMARK UPWARD
// -------------------------------------------------------------
const oldWatermarkRegex = /<div className="absolute top-28 sm:top-36 md:top-44 left-0 right-0 overflow-hidden pointer-events-none select-none z-0 flex justify-center opacity-\[0\.035\]">/;
const newWatermark = `<div className="absolute top-2 sm:top-4 md:top-6 left-0 right-0 overflow-hidden pointer-events-none select-none z-0 flex justify-center opacity-[0.03]">`;

if (oldWatermarkRegex.test(content)) {
  content = content.replace(oldWatermarkRegex, newWatermark);
  console.log('Shifted Section 2 MARVGLOBAL watermark upward.');
} else {
  console.warn('Could not match oldWatermarkRegex.');
}

// -------------------------------------------------------------
// 6. SECTION 3A (SERVICES): REBUILD WITH CLEAN WHITE BACKGROUND & EDITORIAL HEADER
// -------------------------------------------------------------
const oldSection3ARegex = /\{\/\* ===================== SECTION 3A: SERVICES \/ WHAT WE DO ===================== \*\}[\s\S]*?\{\/\* ===================== SECTION 3B: WHY CHOOSE US \/ PROACTIVE PROJECTS ===================== \*\}/;

const newSection3A = `{/* ===================== SECTION 3A: SERVICES / WHAT WE DO ===================== */}
      {/* CRISP WHITE BACKGROUND CANVAS WITH REFINED EDITORIAL HEADER & INTERACTIVE CAPABILITY INSPECTOR */}
      {(() => {
        const servicesData = [
          {
            id: 'ocean',
            title: 'Ocean Freight',
            subtitle: 'International Trade Routes',
            desc: 'Move cargo across international trade routes with shipment coordination designed around visibility and control.',
            icon: Ship,
            tag: 'Global Port-to-Port',
            leadTime: '14 - 24 Days',
            highlights: [
              'Structured origin coordination through port loading',
              'Full Container Load (FCL) & Less than Container (LCL)',
              'Port-to-destination inland planning & drayage',
              'Satellite automated vessel telemetry visibility'
            ],
            specs: {
              containerOptions: '20ft Standard, 40ft High Cube, Reefer (-25°C to +25°C), Flat Rack',
              maxPayload: '28,200 kg per 40ft HC',
              routes: 'Asia-Europe, Trans-Pacific, Trans-Atlantic, Latin America',
              compliance: 'SOLAS VGM Certified, FMC & IMO Compliant, Automated Manifest System'
            },
            milestones: [
              { stage: 'Booking & Container Drayage', eta: 'Day 1 - 2', desc: 'Empty pickup, origin stuffing, customs seal applied' },
              { stage: 'Terminal Gate-in & Loading', eta: 'Day 3 - 4', desc: 'Vessel stowed, export clearance release stamped' },
              { stage: 'Deep Sea Transit Corridor', eta: 'Day 5 - 18', desc: 'Real-time satellite GPS tracking with weather routing' },
              { stage: 'Destination Customs & Delivery', eta: 'Day 19 - 22', desc: 'Port discharge, import clearance, consignee POD' },
            ]
          },
          {
            id: 'road',
            title: 'Road Freight',
            subtitle: 'Coordinated Inland Transportation',
            desc: 'Keep cargo moving between ports, warehouses, hubs, and final destinations with coordinated road transportation.',
            icon: Truck,
            tag: 'Cross-Border & Domestic',
            leadTime: '1 - 4 Days',
            highlights: [
              'Pickup and delivery coordination across national corridors',
              'Full Truckload (FTL) and Less-than-Truckload (LTL) options',
              'Scheduled dedicated movements with verified drivers',
              'Continuous GPS tracking & delivery ETA visibility'
            ],
            specs: {
              containerOptions: 'Curtainsiders, Box Trailers, Mega Trailers, Lowbed Heavy Haulage',
              maxPayload: '24,000 kg standard EU/US road regulations',
              routes: 'Pan-European Corridor, Interstate Highway System, Regional Hub Links',
              compliance: 'ADR Dangerous Goods, CMR Waybill Standards, Telematics Logging'
            },
            milestones: [
              { stage: 'Dispatched to Loading Bay', eta: 'Hour 0 - 2', desc: 'Driver verification, trailer pre-trip safety audit' },
              { stage: 'Cargo Loaded & Sealed', eta: 'Hour 3', desc: 'Weight distribution check, electronic BOL issued' },
              { stage: 'Highway Transit Corridors', eta: 'Hour 4 - 36', desc: 'Continuous telematics ping every 60 seconds' },
              { stage: 'Dock Arrival & Signature', eta: 'Hour 38', desc: 'Digital consignee signoff, instant POD transmission' },
            ]
          },
          {
            id: 'container',
            title: 'Container Transport',
            subtitle: 'Intermodal Port-to-Door Mobility',
            desc: 'Coordinate container movement from port handling through inland delivery with end-to-end milestone updates.',
            icon: Box,
            tag: 'Intermodal Drayage',
            leadTime: 'Same-Day / 48 Hours',
            highlights: [
              'Quayside container pickup and inland rail/road drayage',
              'Standard dry, high cube, open-top, and flat-rack containers',
              'Real-time gate-in, gate-out, and demurrage prevention monitoring',
              'Final warehouse delivery and empty container restitution'
            ],
            specs: {
              containerOptions: '20ft GP (33 m³), 40ft GP (67 m³), 40ft HC (76 m³), ISO Tank',
              maxPayload: 'Payload tare certified up to 30,480 kg gross',
              routes: 'Major Maritime Container Terminals & Inland Rail Ramps',
              compliance: 'CSC Safety Plate Verified, Customs Bonded Carrier Drayage'
            },
            milestones: [
              { stage: 'Port Discharge & Clearance', eta: 'Hour 0', desc: 'Gantry offload, customs radiation & seal audit' },
              { stage: 'Chassis Mount & Gate-Out', eta: 'Hour 4', desc: 'TIR interchange completed, outbound dispatch' },
              { stage: 'Inland Depot Transit', eta: 'Hour 12 - 24', desc: 'Direct drayage route or intermodal rail connection' },
              { stage: 'Unstuffing & Restitution', eta: 'Hour 36', desc: 'Cargo receipt verified, empty return logged' },
            ]
          },
          {
            id: 'warehousing',
            title: 'Warehousing & Handling',
            subtitle: 'Strategic Storage & Inventory Flow',
            desc: 'Keep cargo organized through receiving, handling, storage, and dispatch workflows built for modern supply chains.',
            icon: Warehouse,
            tag: 'Hub & Inventory Logistics',
            leadTime: 'Flexible / On-Demand',
            highlights: [
              'Short-term staging and long-term bonded warehouse storage',
              'Cross-docking, palletization, shrink-wrapping, and labeling',
              'Automated inventory status and dispatch coordination',
              'Direct integration with distribution networks'
            ],
            specs: {
              containerOptions: 'High-Bay Pallet Racking, Floor Storage, Temperature-Controlled Zones',
              maxPayload: 'Facility handling for up to 45-ton reach-stacker loads',
              routes: 'Strategically located adjacent to primary ports & arterial freight corridors',
              compliance: 'AEO Certified, Bonded Warehouse Status, 24/7 CCTV & Security'
            },
            milestones: [
              { stage: 'Intake & Pallet Verification', eta: 'Day 1', desc: 'SKU check, barcode scan, WMS inventory entry' },
              { stage: 'Storage Allocation', eta: 'Day 1', desc: 'Automated slotting into designated temperature/ambient zone' },
              { stage: 'Pick, Pack & Staging', eta: 'On Call', desc: 'Cross-dock preparation, outbound transport bundling' },
              { stage: 'Outbound Dispatch Gate', eta: 'Immediate', desc: 'Manifest signed, seal logged, dispatch initiated' },
            ]
          },
          {
            id: 'coordination',
            title: 'Freight Coordination',
            subtitle: 'End-to-End Shipment Management',
            desc: 'Bring shipment details, movement milestones, documents, and delivery events into one organized, transparent flow.',
            icon: FileText,
            tag: 'Single-Window Logistics',
            leadTime: 'Continuous Oversight',
            highlights: [
              'Customs brokerage, export declarations, and duty clearance',
              'Multi-leg carrier schedule synchronization',
              'Single point of contact: dedicated freight operations coordinator',
              'Proactive disruption monitoring and exception handling'
            ],
            specs: {
              containerOptions: 'Multimodal Single-Contract Bill of Lading (FIATA/BIMCO)',
              maxPayload: 'Customs Brokerage for all HS Code classifications',
              routes: 'Worldwide Multi-Carrier Aggregation Network',
              compliance: 'Licensed Customs Brokerage, Electronic Data Interchange (EDI)'
            },
            milestones: [
              { stage: 'Document Validation', eta: 'T - 48h', desc: 'Invoice, packing list, HS Code classification verified' },
              { stage: 'Electronic Customs Filing', eta: 'T - 24h', desc: 'Automated export/import declarations lodged' },
              { stage: 'Carrier Handshake Sync', eta: 'Live', desc: 'Multi-modal carrier schedules aligned' },
              { stage: 'Milestone Confirmation', eta: 'Delivery', desc: 'Full audit trail archive generated for customer' },
            ]
          },
          {
            id: 'tracking',
            title: 'Shipment Tracking',
            subtitle: 'Real-Time Digital Visibility',
            desc: 'Follow shipment progress through a digital tracking experience designed to keep customers informed every step of the way.',
            icon: Globe2,
            tag: 'Telemetry & Event Audits',
            leadTime: 'Live 10-Second Updates',
            highlights: [
              'Public tracking-number lookup without mandatory account logins',
              'Real-time GPS coordinates and route map visualization',
              'Event-driven milestone notifications (SMS, Email, Webhooks)',
              'Downloadable digital Proof of Delivery (POD) & time-stamps'
            ],
            specs: {
              containerOptions: 'Cellular IoT & Inmarsat Satellite Tracking Devices',
              maxPayload: 'Global Coverage Across 190+ Countries and Maritime Lanes',
              routes: 'Unified API & Web Tracking Portal',
              compliance: 'ISO 27001 Data Security, 99.9% Uptime Telemetry SLA'
            },
            milestones: [
              { stage: 'Waypoint Beacon Ping', eta: 'Real-time', desc: 'GPS latitude/longitude & velocity recorded' },
              { stage: 'Milestone State Trigger', eta: 'Immediate', desc: 'In-transit, Hub Arrival, or Out-for-Delivery updated' },
              { stage: 'Exception Alert Monitoring', eta: 'Immediate', desc: 'Automated notification if customs or route delayed' },
              { stage: 'Delivery Verification & POD', eta: 'Final Step', desc: 'Recipient signature, timestamp & delivery photo' },
            ]
          },
        ];

        const activeService = servicesData[activeServiceIndex] || servicesData[0];

        // Dynamic rate calculation based on user inputs
        const baseRate = activeService.id === 'ocean' ? 2200 :
                         activeService.id === 'road' ? 950 :
                         activeService.id === 'container' ? 1400 :
                         activeService.id === 'warehousing' ? 650 :
                         activeService.id === 'coordination' ? 380 : 150;
        const weightMultiplier = Math.max(0.5, calcWeight / 10000);
        const containerMultiplier = calcContainerType === 'reefer' ? 1.6 : calcContainerType === '40ft' ? 1.35 : 1.0;
        const estimatedQuoteTotal = Math.round(baseRate * weightMultiplier * containerMultiplier);
        const estimatedTransit = activeService.id === 'ocean' ? '16 - 21 Days' :
                                 activeService.id === 'road' ? '2 - 4 Days' :
                                 activeService.id === 'container' ? '24 - 48 Hours' :
                                 activeService.id === 'warehousing' ? 'Immediate Intake' :
                                 activeService.id === 'coordination' ? 'Active Real-Time' : '10-Second Feed';

        return (
          <section id="services-section" className="relative bg-white py-16 sm:py-24 border-b border-neutral-100 text-neutral-900 overflow-hidden">
            
            {/* Main Content Container */}
            <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              
              {/* Clean Editorial Header (Removed AI-style circle box) */}
              <div className="text-center mb-12 sm:mb-16">
                <div className="flex items-center justify-center gap-2 mb-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#8B0D1A]" />
                  <span className="text-[#8B0D1A] font-extrabold text-[11px] sm:text-xs tracking-[0.25em] uppercase">
                    WHAT WE DO
                  </span>
                  <span className="text-neutral-300">•</span>
                  <span className="text-neutral-500 font-bold text-[11px] sm:text-xs tracking-wider uppercase">
                    SERVICES
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-neutral-900 tracking-tight max-w-3xl mx-auto leading-tight">
                  Freight that keeps moving.
                </h2>

                <p className="mt-3.5 text-xs sm:text-sm text-neutral-600 max-w-2xl mx-auto leading-relaxed font-normal">
                  Marvglobal Freight brings the physical movement of cargo together with a clearer digital experience — so customers can book, follow, and manage shipments with less uncertainty.
                </p>
              </div>

              {/* 6 Interactive Service Cards Grid (Light theme cards with rich Crimson active states) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 max-w-5xl mx-auto mb-10">
                {servicesData.map((svc, idx) => {
                  const isSelected = activeServiceIndex === idx;
                  return (
                    <div
                      key={svc.id}
                      onClick={() => {
                        setActiveServiceIndex(idx);
                        triggerToast(\`Inspecting \${svc.title} capabilities\`);
                      }}
                      className={\`rounded-2xl p-4 sm:p-5 border transition-all duration-300 flex flex-col items-center justify-between text-center cursor-pointer group relative overflow-hidden min-h-[145px] sm:min-h-[160px] \${
                        isSelected
                          ? 'bg-[#8B0D1A] text-white border-[#8B0D1A] shadow-xl shadow-red-950/20 -translate-y-2'
                          : 'bg-[#F5F2ED] border-neutral-200/90 text-neutral-900 hover:border-[#8B0D1A] hover:bg-white hover:shadow-lg hover:-translate-y-1'
                      }\`}
                    >
                      {/* Top Crimson Accent Ribbon */}
                      <div className={\`absolute top-0 inset-x-0 h-1 bg-[#8B0D1A] transition-transform duration-300 origin-center \${
                        isSelected ? 'bg-white scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }\`} />

                      {/* Selected Badge */}
                      {isSelected && (
                        <div className="absolute top-2.5 right-2.5 flex items-center">
                          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        </div>
                      )}

                      {/* Icon Container */}
                      <div className={\`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-300 \${
                        isSelected
                          ? 'bg-white text-[#8B0D1A] shadow-md scale-105'
                          : 'bg-white border border-neutral-200 text-[#8B0D1A] group-hover:bg-[#8B0D1A] group-hover:text-white group-hover:scale-105 shadow-sm'
                      }\`}>
                        <svc.icon className="w-6 h-6 stroke-[2]" />
                      </div>

                      {/* Card Title */}
                      <div className="mt-3">
                        <h3 className={\`text-xs sm:text-[13px] font-bold transition-colors leading-tight \${
                          isSelected ? 'text-white' : 'text-neutral-900 group-hover:text-[#8B0D1A]'
                        }\`}>
                          {svc.title}
                        </h3>
                        <span className={\`text-[10px] font-medium block mt-1 line-clamp-1 \${
                          isSelected ? 'text-white/80' : 'text-neutral-500'
                        }\`}>
                          {svc.tag}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ===================== INTERACTIVE CAPABILITY INSPECTOR & ESTIMATOR CONSOLE ===================== */}
              <div className="bg-[#F5F2ED]/70 border border-neutral-200/90 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden max-w-5xl mx-auto text-neutral-900">
                
                {/* Top Console Navigation & Active Service Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-200/90 relative z-10">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-[#8B0D1A] text-white flex items-center justify-center shadow-lg shadow-[#8B0D1A]/30 flex-shrink-0">
                      <activeService.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8B0D1A] bg-white px-2 py-0.5 rounded border border-[#8B0D1A]/20 shadow-sm">
                          {activeService.tag}
                        </span>
                        <span className="text-xs text-neutral-500 font-medium">
                          Transit Speed: <strong className="text-neutral-900">{activeService.leadTime}</strong>
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-black text-neutral-900 mt-1">
                        {activeService.title} — <span className="text-neutral-500 font-normal text-sm sm:text-base">{activeService.subtitle}</span>
                      </h3>
                    </div>
                  </div>

                  {/* Sub-tab Switches */}
                  <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-neutral-200 self-start md:self-auto shadow-sm overflow-x-auto max-w-full">
                    <button
                      onClick={() => setCalcServiceTab('calculator')}
                      className={\`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer whitespace-nowrap \${
                        calcServiceTab === 'calculator'
                          ? 'bg-[#8B0D1A] text-white shadow-sm'
                          : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                      }\`}
                    >
                      <Calculator className="w-3.5 h-3.5" />
                      <span>Rate &amp; Transit Estimator</span>
                    </button>

                    <button
                      onClick={() => setCalcServiceTab('specs')}
                      className={\`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer whitespace-nowrap \${
                        calcServiceTab === 'specs'
                          ? 'bg-[#8B0D1A] text-white shadow-sm'
                          : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                      }\`}
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Specifications</span>
                    </button>

                    <button
                      onClick={() => setCalcServiceTab('milestones')}
                      className={\`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer whitespace-nowrap \${
                        calcServiceTab === 'milestones'
                          ? 'bg-[#8B0D1A] text-white shadow-sm'
                          : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                      }\`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Journey Workflow</span>
                    </button>
                  </div>
                </div>

                {/* Sub-tab 1: Interactive Rate & Transit Estimator */}
                {calcServiceTab === 'calculator' && (
                  <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 animate-in fade-in duration-200">
                    <div className="lg:col-span-7 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 block mb-1.5">
                            Origin Terminal
                          </label>
                          <select
                            value={calcOrigin}
                            onChange={(e) => setCalcOrigin(e.target.value)}
                            className="w-full bg-white border border-neutral-300 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#8B0D1A] focus:ring-1 focus:ring-[#8B0D1A] transition cursor-pointer shadow-sm"
                          >
                            <option value="Rotterdam, Netherlands">Rotterdam Port (Netherlands)</option>
                            <option value="Shanghai, China">Shanghai Container Port (China)</option>
                            <option value="Hamburg, Germany">Hamburg Intermodal Hub (Germany)</option>
                            <option value="Singapore Port">Singapore Maritime Hub (Singapore)</option>
                            <option value="Los Angeles, USA">Port of Los Angeles (USA)</option>
                            <option value="Lagos, Nigeria">Apapa Container Terminal (Nigeria)</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 block mb-1.5">
                            Destination Gateway
                          </label>
                          <select
                            value={calcDestination}
                            onChange={(e) => setCalcDestination(e.target.value)}
                            className="w-full bg-white border border-neutral-300 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#8B0D1A] focus:ring-1 focus:ring-[#8B0D1A] transition cursor-pointer shadow-sm"
                          >
                            <option value="Chicago, IL (USA)">Chicago Logistics Depot (USA)</option>
                            <option value="Antwerp, Belgium">Antwerp Gateway (Belgium)</option>
                            <option value="Dubai, UAE">Jebel Ali Logistics Park (UAE)</option>
                            <option value="New York, USA">Newark Marine Terminal (USA)</option>
                            <option value="London, UK">London Gateway Port (UK)</option>
                            <option value="Tokyo, Japan">Tokyo Sea Berth (Japan)</option>
                          </select>
                        </div>
                      </div>

                      {/* Weight Slider */}
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="font-bold text-neutral-700">Approximate Weight:</span>
                          <span className="font-extrabold text-[#8B0D1A] bg-white px-2 py-0.5 rounded border border-[#8B0D1A]/30 shadow-sm">
                            {calcWeight.toLocaleString()} kg ({Math.round(calcWeight / 1000)} metric tons)
                          </span>
                        </div>
                        <input
                          type="range"
                          min={500}
                          max={28000}
                          step={500}
                          value={calcWeight}
                          onChange={(e) => setCalcWeight(parseInt(e.target.value))}
                          className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#8B0D1A]"
                        />
                        <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
                          <span>500 kg (LCL)</span>
                          <span>14,000 kg (Standard 20ft)</span>
                          <span>28,000 kg (Heavy Max)</span>
                        </div>
                      </div>

                      {/* Container Type Selector */}
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 block mb-2">
                          Equipment &amp; Container Specification
                        </span>
                        <div className="grid grid-cols-3 gap-2.5">
                          {[
                            { id: '20ft', name: '20ft Dry', desc: 'Standard Dry' },
                            { id: '40ft', name: '40ft HC', desc: 'High Cube Max' },
                            { id: 'reefer', name: 'Reefer', desc: 'Cold Chain Controlled' },
                          ].map((c) => (
                            <button
                              key={c.id}
                              type="button"
                              onClick={() => setCalcContainerType(c.id as any)}
                              className={\`p-2.5 rounded-xl border text-left transition cursor-pointer \${
                                calcContainerType === c.id
                                  ? 'bg-white border-[#8B0D1A] text-[#8B0D1A] ring-2 ring-[#8B0D1A]/20 shadow-md'
                                  : 'bg-white/80 border-neutral-200 text-neutral-700 hover:border-neutral-300'
                              }\`}
                            >
                              <span className="text-xs font-bold block">{c.name}</span>
                              <span className="text-[10px] text-neutral-500 block">{c.desc}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Calculated Output Summary Card (Light Theme) */}
                    <div className="lg:col-span-5 bg-white border border-neutral-200 rounded-2xl p-5 sm:p-6 shadow-xl relative">
                      <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                          Route Estimate
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                          Live SLA Guaranteed
                        </span>
                      </div>

                      <div className="space-y-3 mb-5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-neutral-500">Estimated Transit:</span>
                          <span className="font-extrabold text-neutral-900">{estimatedTransit}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-neutral-500">Selected Route:</span>
                          <span className="font-semibold text-neutral-800 text-right truncate max-w-[200px]">
                            {calcOrigin.split(',')[0]} → {calcDestination.split(',')[0]}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-neutral-500">Payload Allocated:</span>
                          <span className="font-medium text-neutral-700">
                            {calcWeight.toLocaleString()} kg in {calcContainerType.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs pt-2 border-t border-neutral-100">
                          <span className="text-neutral-700 font-bold">Estimated Baseline:</span>
                          <span className="text-2xl font-black text-[#8B0D1A]">
                            \${estimatedQuoteTotal.toLocaleString()} <span className="text-xs font-normal text-neutral-500">USD</span>
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => {
                            setQuoteFormData({
                              ...quoteFormData,
                              subject: \`\${activeService.title} Quote Request\`,
                              message: \`Inquiry for \${activeService.title} from \${calcOrigin} to \${calcDestination} with \${calcWeight} kg in \${calcContainerType} container.\`,
                            });
                            scrollToSection('quote-section');
                            triggerToast(\`Route pre-filled into Quote form below!\`);
                          }}
                          className="w-full bg-[#8B0D1A] hover:bg-[#A31222] text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition shadow-lg shadow-[#8B0D1A]/30 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                        >
                          <span>Request Full SLA Quote</span>
                          <ChevronsRight className="w-4 h-4 stroke-[3]" />
                        </button>

                        <button
                          onClick={() => {
                            handleQuickTrack('MGF-2026-000184');
                            triggerToast('Simulating live tracking telemetry...');
                          }}
                          className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold py-2.5 rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-2 border border-neutral-200"
                        >
                          <Navigation className="w-3.5 h-3.5 text-[#8B0D1A]" />
                          <span>View Live Telemetry Demo</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub-tab 2: Specifications */}
                {calcServiceTab === 'specs' && (
                  <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 animate-in fade-in duration-200">
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#8B0D1A]">
                        Core Capabilities from Brand Framework
                      </h4>
                      <p className="text-xs text-neutral-600 leading-relaxed">
                        {activeService.desc}
                      </p>
                      <div className="space-y-2.5">
                        {activeService.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-2.5">
                            <div className="w-4 h-4 rounded-full bg-[#8B0D1A]/10 flex items-center justify-center text-[#8B0D1A] flex-shrink-0 mt-0.5">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                            <span className="text-xs text-neutral-700 font-medium">{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white border border-neutral-200 rounded-2xl p-5 space-y-3 shadow-sm">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-100 pb-2">
                        Operational Technical Specifications
                      </h4>
                      <div>
                        <span className="text-[11px] font-bold text-neutral-500 block">Equipment Formats:</span>
                        <span className="text-xs text-neutral-900 font-medium">{activeService.specs.containerOptions}</span>
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-neutral-500 block">Max Permissible Weight:</span>
                        <span className="text-xs text-neutral-900 font-medium">{activeService.specs.maxPayload}</span>
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-neutral-500 block">Active Corridors:</span>
                        <span className="text-xs text-neutral-900 font-medium">{activeService.specs.routes}</span>
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-neutral-500 block">Regulatory Compliance:</span>
                        <span className="text-xs text-neutral-700 font-medium">{activeService.specs.compliance}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub-tab 3: Journey Workflow */}
                {calcServiceTab === 'milestones' && (
                  <div className="pt-6 relative z-10 animate-in fade-in duration-200">
                    <p className="text-xs text-neutral-600 mb-6">
                      The official 4-phase custody lifecycle for <strong className="text-neutral-900">{activeService.title}</strong> movements:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {activeService.milestones.map((ms, i) => (
                        <div key={i} className="bg-white border border-neutral-200 rounded-2xl p-4.5 relative group hover:border-[#8B0D1A]/60 transition shadow-sm">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-black text-[#8B0D1A] uppercase tracking-wider bg-[#8B0D1A]/10 px-2 py-0.5 rounded">
                              0{i + 1}
                            </span>
                            <span className="text-[11px] text-neutral-500 font-bold">{ms.eta}</span>
                          </div>
                          <h5 className="text-xs font-bold text-neutral-900 mb-1.5 leading-snug">{ms.stage}</h5>
                          <p className="text-[11px] text-neutral-600 leading-relaxed">{ms.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

            </div>

          </section>
        );
      })()}

      {/* ===================== SECTION 3B: WHY CHOOSE US / PROACTIVE PROJECTS ===================== */}`;

if (oldSection3ARegex.test(content)) {
  content = content.replace(oldSection3ARegex, newSection3A);
  console.log('Rebuilt Section 3A with White Background & Clean Editorial Header.');
} else {
  console.warn('Could not match oldSection3ARegex.');
}

fs.writeFileSync(appPath, content, 'utf8');
console.log('apply_user_fixes completed. New App.tsx lines:', content.split('\n').length);
