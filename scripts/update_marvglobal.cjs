const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '..', 'src', 'App.tsx');
let content = fs.readFileSync(appPath, 'utf8');

console.log('Original App.tsx size:', content.length);

// 1. UPDATE LOGO GRADIENTS & ACCENTS
content = content.replace(
  `<stop offset="0%" stopColor="#FF2626" />
                      <stop offset="60%" stopColor="#D90000" />
                      <stop offset="100%" stopColor="#9E0000" />`,
  `<stop offset="0%" stopColor="#A31222" />
                      <stop offset="60%" stopColor="#8B0D1A" />
                      <stop offset="100%" stopColor="#5A0710" />`
);

content = content.replace(
  `<stop offset="0%" stopColor="#C40000" />
                      <stop offset="40%" stopColor="#E60000" />
                      <stop offset="100%" stopColor="#FF2A2A" />`,
  `<stop offset="0%" stopColor="#720A15" />
                      <stop offset="40%" stopColor="#8B0D1A" />
                      <stop offset="100%" stopColor="#A31222" />`
);

content = content.replace(
  `drop-shadow-[0_2px_10px_rgba(230,0,0,0.5)]`,
  `drop-shadow-[0_2px_10px_rgba(139,13,26,0.5)]`
);

// 2. HERO SECTION COPY (Docx Section 3)
const oldHeroLeft = `<div className="lg:col-span-7 flex flex-col justify-center max-w-xl">
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-black tracking-tight leading-[1.08] text-white uppercase text-balance drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
                WE KEEP YOUR<br />
                SUPPLY CHAIN<br />
                MOVING
              </h1>

              <p className="mt-4 sm:mt-5 text-neutral-100 text-xs sm:text-sm lg:text-[14.5px] leading-relaxed max-w-md font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                From local to global shipments, our seamless logistics solutions ensure on-time, secure, and hassle-free delivery.
              </p>

              <div className="mt-6 sm:mt-7 flex items-center gap-3">
                <button
                  onClick={() => setShowLearnMoreModal(true)}
                  className="bg-[#FF3B14] hover:bg-[#e0310e] text-white pl-1.5 pr-4 sm:pr-5 py-1.5 rounded-lg flex items-center gap-2.5 sm:gap-3 transition-all duration-150 shadow-xl shadow-red-950/30 active:scale-95 group cursor-pointer"
                >
                  <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-md bg-white flex items-center justify-center text-black transition-transform group-hover:scale-105 shadow-sm">
                    <ChevronsRight className="w-4 h-4 text-neutral-900 stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-[13px] font-bold tracking-tight text-white whitespace-nowrap">
                    Learn More Now
                  </span>
                </button>

                <button
                  onClick={scrollToAboutSection}
                  className="px-4 py-2 rounded-lg border border-white/30 hover:border-white/70 text-white text-xs sm:text-[13px] font-semibold transition bg-black/40 hover:bg-black/60 cursor-pointer flex items-center gap-1.5"
                >
                  <span>Explore Agency</span>
                  <ArrowDown className="w-3.5 h-3.5 text-[#FF3B14]" />
                </button>
              </div>
            </div>`;

const newHeroLeft = `<div className="lg:col-span-7 flex flex-col justify-center max-w-xl">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8B0D1A] animate-pulse" />
                <span className="text-white/90 font-bold text-xs tracking-[0.25em] uppercase">
                  MARVGLOBAL FREIGHT
                </span>
                <span className="text-white/40">•</span>
                <span className="text-white/80 text-xs font-medium">
                  Freight movement, made clearer.
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-black tracking-tight leading-[1.08] text-white uppercase text-balance drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
                Global freight.<br />
                Moving without limits.
              </h1>

              <p className="mt-4 sm:mt-5 text-neutral-100 text-xs sm:text-sm lg:text-[14.5px] leading-relaxed max-w-md font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                Move cargo with a freight partner built around visibility, coordination, and confidence — from the first mile to the final destination.
              </p>

              <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    setActiveTab('track');
                    const inputEl = document.getElementById('tracking-input');
                    inputEl?.focus();
                  }}
                  className="bg-[#8B0D1A] hover:bg-[#A31222] text-white pl-1.5 pr-4 sm:pr-5 py-2 rounded-lg flex items-center gap-2.5 sm:gap-3 transition-all duration-150 shadow-xl shadow-red-950/40 active:scale-95 group cursor-pointer"
                >
                  <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-md bg-white flex items-center justify-center text-black transition-transform group-hover:scale-105 shadow-sm">
                    <ChevronsRight className="w-4 h-4 text-neutral-900 stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-[13px] font-bold tracking-tight text-white whitespace-nowrap">
                    Track a Shipment
                  </span>
                </button>

                <button
                  onClick={() => scrollToSection('faq-section')}
                  className="px-4 py-2.5 rounded-lg border border-white/30 hover:border-white/70 text-white text-xs sm:text-[13px] font-semibold transition bg-black/40 hover:bg-black/60 cursor-pointer flex items-center gap-1.5 backdrop-blur-sm"
                >
                  <span>Request a Quote</span>
                  <ArrowDown className="w-3.5 h-3.5 text-[#8B0D1A]" />
                </button>

                <button
                  onClick={() => scrollToSection('services-section')}
                  className="px-3.5 py-2.5 rounded-lg text-white/80 hover:text-white text-xs sm:text-[13px] font-semibold transition cursor-pointer flex items-center gap-1"
                >
                  <span>Explore Services</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>`;

if (content.includes(oldHeroLeft)) {
  content = content.replace(oldHeroLeft, newHeroLeft);
  console.log('Replaced Hero Left copy successfully.');
} else {
  console.warn('Could not find oldHeroLeft exact string, checking parts.');
}

// 3. HERO RIGHT TRACKING CARD: ADD 1-CLICK DEMO CHIPS
const oldTrackingForm = `<form onSubmit={handleTrack} className="mt-4">
                    <div className="relative">
                      <input
                        id="tracking-input"
                        type="text"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        placeholder="Type your tracking number here"
                        className="w-full bg-[#EFF1F4] text-neutral-900 placeholder:text-neutral-400 text-xs rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#FF3B14]/40 font-medium transition"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-3 bg-[#FF3B14] hover:bg-[#e0310e] text-white font-bold py-2.5 rounded-md text-xs sm:text-[13px] tracking-wide transition shadow-sm active:scale-[0.99] cursor-pointer"
                    >
                      Track Now
                    </button>`;

const newTrackingForm = `<form onSubmit={handleTrack} className="mt-4">
                    <div className="relative">
                      <input
                        id="tracking-input"
                        type="text"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        placeholder="Enter tracking number (e.g. MGF-2026-000184)"
                        className="w-full bg-[#EFF1F4] text-neutral-900 placeholder:text-neutral-400 text-xs rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#8B0D1A]/40 font-medium transition"
                      />
                    </div>

                    {/* Quick 1-Click Interactive Demo Tracking Chips */}
                    <div className="mt-2.5">
                      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                        <span>Click to test live tracking:</span>
                        <span className="text-[#8B0D1A] font-bold">1-Click Demo</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setTrackingNumber('MGF-2026-000184');
                            setSelectedOpsShipment('MGF-2026-000184');
                            setShowTrackingResult(true);
                          }}
                          className="px-1.5 py-1.5 bg-[#F5F2ED] hover:bg-[#8B0D1A] hover:text-white border border-neutral-200 hover:border-[#8B0D1A] rounded text-[10px] font-bold text-neutral-800 transition text-center cursor-pointer truncate"
                          title="Ocean Freight (000184)"
                        >
                          Ocean (000184)
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setTrackingNumber('MGF-2026-000892');
                            setSelectedOpsShipment('MGF-2026-000892');
                            setShowTrackingResult(true);
                          }}
                          className="px-1.5 py-1.5 bg-[#F5F2ED] hover:bg-[#8B0D1A] hover:text-white border border-neutral-200 hover:border-[#8B0D1A] rounded text-[10px] font-bold text-neutral-800 transition text-center cursor-pointer truncate"
                          title="Road Freight (000892)"
                        >
                          Road (000892)
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setTrackingNumber('MGF-2026-001240');
                            setSelectedOpsShipment('MGF-2026-001240');
                            setShowTrackingResult(true);
                          }}
                          className="px-1.5 py-1.5 bg-[#F5F2ED] hover:bg-[#8B0D1A] hover:text-white border border-neutral-200 hover:border-[#8B0D1A] rounded text-[10px] font-bold text-neutral-800 transition text-center cursor-pointer truncate"
                          title="Container Freight (001240)"
                        >
                          Container (001240)
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-3 bg-[#8B0D1A] hover:bg-[#A31222] text-white font-bold py-2.5 rounded-md text-xs sm:text-[13px] tracking-wide transition shadow-sm active:scale-[0.99] cursor-pointer"
                    >
                      Track Shipment
                    </button>`;

if (content.includes(oldTrackingForm)) {
  content = content.replace(oldTrackingForm, newTrackingForm);
  console.log('Replaced Hero Tracking Form successfully.');
} else {
  console.warn('Could not find oldTrackingForm exact string.');
}

// 4. SECTION 3B: WHY CHOOSE US COPY (Docx Section 3)
const oldWhyChoose = `<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-white leading-tight mb-8">
                We see projects through and proactively
              </h2>`;

const newWhyChoose = `<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-white leading-tight mb-4">
                A clearer way to move freight.
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed mb-8">
                From local hauling to intermodal global container corridors, our operations are designed around four foundational commitments.
              </p>`;

if (content.includes(oldWhyChoose)) {
  content = content.replace(oldWhyChoose, newWhyChoose);
  console.log('Replaced Why Choose Us headline.');
}

// 5. SECTION 6: OUR LEGACY -> MISSION & VISION (Docx Section 7)
const oldLegacy = `<h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 leading-tight">
                  We know that every decision has an impact
                </h2>`;

const newLegacy = `<h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 leading-tight">
                  Moving more than cargo.
                </h2>`;

if (content.includes(oldLegacy)) {
  content = content.replace(oldLegacy, newLegacy);
  console.log('Replaced Legacy headline.');
}

// 6. SECTION 8: REMOVE CARTOON FORKLIFT SVG
const forkliftRegex = /\{\/\* Large Forklift Graphic on Right \(as in sample\) \*\/\}[\s\S]*?<\/svg>\s*<\/div>/;
if (forkliftRegex.test(content)) {
  content = content.replace(forkliftRegex, `{/* Subtle Modern Container Watermark */}
            <div className="absolute right-0 bottom-0 translate-x-12 sm:translate-x-6 w-80 sm:w-96 lg:w-[480px] pointer-events-none select-none opacity-10 z-0">
              <Package className="w-full h-auto text-neutral-900 stroke-[0.8]" />
            </div>`);
  console.log('Removed cartoon forklift SVG from Section 8.');
}

// 7. UPGRADE TRACKING RESULT MODAL TO 4-TAB RICH CONSOLE (Docx Section 10 & 11)
const oldTrackingModalRegex = /\{\/\* ===================== MODAL 1: TRACKING RESULT SIMULATION ===================== \*\/\}[\s\S]*?\{\/\* ===================== MODAL 2: BULK TRACKING LOOKUP ===================== \*\/\}/;

const newTrackingModal = `{/* ===================== MODAL 1: ADVANCED MULTI-TAB TRACKING CONSOLE ===================== */}
      {showTrackingResult && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 z-50 animate-in fade-in duration-200">
          <div className="bg-[#0B0B0B] border border-neutral-800 w-full max-w-3xl rounded-2xl p-5 sm:p-7 text-white shadow-2xl relative max-h-[90vh] flex flex-col overflow-hidden">
            
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-neutral-800 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#8B0D1A]/20 border border-[#8B0D1A]/50 flex items-center justify-center text-[#8B0D1A]">
                  <Truck className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base sm:text-lg font-black tracking-tight">
                      {trackingNumber.trim() ? trackingNumber.toUpperCase() : 'MGF-2026-000184'}
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded text-[10px] font-bold border border-emerald-500/20">
                      In Transit • On Schedule
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Global Freight Route: Rotterdam Port (NLD) &rarr; Chicago Terminal (USA)
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowTrackingResult(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex items-center gap-2 pt-3 pb-2 border-b border-neutral-800/80 text-xs font-bold overflow-x-auto flex-shrink-0">
              <button
                onClick={() => setTrackingModalTab('journey')}
                className={\`px-3.5 py-1.5 rounded-lg transition cursor-pointer whitespace-nowrap \${
                  trackingModalTab === 'journey'
                    ? 'bg-[#8B0D1A] text-white shadow'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }\`}
              >
                1. Shipment Timeline
              </button>
              <button
                onClick={() => setTrackingModalTab('telemetry')}
                className={\`px-3.5 py-1.5 rounded-lg transition cursor-pointer whitespace-nowrap \${
                  trackingModalTab === 'telemetry'
                    ? 'bg-[#8B0D1A] text-white shadow'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }\`}
              >
                2. Live GPS & Telemetry
              </button>
              <button
                onClick={() => setTrackingModalTab('documents')}
                className={\`px-3.5 py-1.5 rounded-lg transition cursor-pointer whitespace-nowrap \${
                  trackingModalTab === 'documents'
                    ? 'bg-[#8B0D1A] text-white shadow'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }\`}
              >
                3. Waybill & Customs
              </button>
              <button
                onClick={() => setTrackingModalTab('pod')}
                className={\`px-3.5 py-1.5 rounded-lg transition cursor-pointer whitespace-nowrap \${
                  trackingModalTab === 'pod'
                    ? 'bg-[#8B0D1A] text-white shadow'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }\`}
              >
                4. Proof of Delivery (POD)
              </button>
            </div>

            {/* Modal Body: Scrollable */}
            <div className="flex-1 overflow-y-auto py-4 pr-1 space-y-4">
              
              {/* TAB 1: JOURNEY TIMELINE (9 OFFICIAL STAGES FROM DOCX SECTION 3 & 11) */}
              {trackingModalTab === 'journey' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 bg-neutral-950 rounded-xl border border-neutral-800 text-xs">
                    <div>
                      <span className="text-neutral-500 block text-[10px] uppercase font-bold">Service Type</span>
                      <span className="text-white font-semibold">Ocean & Intermodal FCL</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block text-[10px] uppercase font-bold">Estimated Arrival</span>
                      <span className="text-white font-semibold">Oct 04, 2026 • 16:30</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block text-[10px] uppercase font-bold">Vessel / Unit</span>
                      <span className="text-white font-semibold">MV Marv Voyager (IMO 9482)</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block text-[10px] uppercase font-bold">Weight / Volume</span>
                      <span className="text-white font-semibold">18,400 kg • 40ft HC</span>
                    </div>
                  </div>

                  <div className="relative border-l-2 border-neutral-800 ml-4 pl-6 space-y-6 pt-1">
                    {[
                      {
                        stage: '01. Booking Confirmed',
                        date: 'Sep 26, 2026 • 09:15 CET',
                        location: 'Rotterdam Commercial Booking Desk',
                        desc: 'Booking confirmed under contract MGF-NL-9014. Space allocation and equipment dispatched.',
                        completed: true,
                      },
                      {
                        stage: '02. Cargo Received at Origin Terminal',
                        date: 'Sep 27, 2026 • 14:30 CET',
                        location: 'Rotterdam ECT Delta Terminal Gate 4',
                        desc: 'Container received, tare weight verified via certified weighbridge. Seal MGF-894109 affixed.',
                        completed: true,
                      },
                      {
                        stage: '03. Export Customs Cleared',
                        date: 'Sep 28, 2026 • 11:00 CET',
                        location: 'Netherlands Customs Administration',
                        desc: 'Export manifest cleared under declaration reference NL-EXP-88912. Free for vessel loading.',
                        completed: true,
                      },
                      {
                        stage: '04. Departed Origin Port/Depot',
                        date: 'Sep 28, 2026 • 18:45 CET',
                        location: 'Port of Rotterdam, Berth 9',
                        desc: 'Container loaded onto MV Marv Voyager. Vessel departed for Atlantic passage.',
                        completed: true,
                      },
                      {
                        stage: '05. In Transit (Vessel / Road Fleet)',
                        date: 'Current Live Stage',
                        location: 'Mid-Atlantic Shipping Lane (Lat 48.2° N, Lon 32.1° W)',
                        desc: 'Vessel cruising at 19.2 knots. Reefer temperature logged at +4.2°C nominal.',
                        completed: true,
                        active: true,
                      },
                      {
                        stage: '06. Arrived Destination Port/Depot',
                        date: 'Expected Oct 02, 2026 • 06:00 EST',
                        location: 'Port of New York / New Jersey Intermodal Terminal',
                        desc: 'Vessel arrival, berth allocation, and gantry offloading scheduled.',
                        completed: false,
                      },
                      {
                        stage: '07. Import Customs Cleared',
                        date: 'Pending Port Offload',
                        location: 'U.S. Customs & Border Protection (CBP)',
                        desc: 'Electronic ISF filed. Customs entry documentation pre-submitted for fast-track clearance.',
                        completed: false,
                      },
                      {
                        stage: '08. Out for Delivery',
                        date: 'Expected Oct 04, 2026 • 08:30 CDT',
                        location: 'Chicago Intermodal Rail Depot & Inland Fleet',
                        desc: 'Transfer to Marvglobal regional heavy-duty highway fleet for final mile delivery.',
                        completed: false,
                      },
                      {
                        stage: '09. Delivered & Proof of Delivery Logged',
                        date: 'Expected Oct 04, 2026 • 16:30 CDT',
                        location: 'Consignee Receiving Bay 4, Chicago, IL',
                        desc: 'Final cargo handover, physical seal inspection, and digital recipient signature capture.',
                        completed: false,
                      },
                    ].map((step, idx) => (
                      <div key={idx} className="relative">
                        <div
                          className={\`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full flex items-center justify-center \${
                            step.active
                              ? 'bg-[#8B0D1A] ring-4 ring-[#8B0D1A]/30'
                              : step.completed
                              ? 'bg-neutral-600'
                              : 'bg-neutral-900 border-2 border-neutral-700'
                          }\`}
                        >
                          {step.completed && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                          <h4 className={\`text-xs font-bold \${step.active ? 'text-[#8B0D1A]' : step.completed ? 'text-white' : 'text-neutral-400'}\`}>
                            {step.stage}
                          </h4>
                          <span className="text-[10px] text-neutral-400">{step.date}</span>
                        </div>
                        <p className="text-[11px] text-neutral-300 font-medium">{step.location}</p>
                        <p className="text-[11px] text-neutral-400 mt-0.5">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: LIVE GPS & TELEMETRY */}
              {trackingModalTab === 'telemetry' && (
                <div className="space-y-4">
                  <div className="h-44 sm:h-52 bg-neutral-950 rounded-xl border border-neutral-800 overflow-hidden relative flex items-center justify-center">
                    <img
                      src="/images/harbor.jpg"
                      alt="Telemetry Satellite Map"
                      className="w-full h-full object-cover opacity-25 filter grayscale"
                    />
                    <div className="absolute inset-0 bg-radial-gradient from-transparent via-neutral-950/60 to-neutral-950/95" />
                    
                    {/* Simulated GPS Beacon */}
                    <div className="absolute flex flex-col items-center">
                      <div className="relative flex items-center justify-center">
                        <span className="w-8 h-8 rounded-full bg-[#8B0D1A] animate-ping opacity-70" />
                        <span className="absolute w-4 h-4 rounded-full bg-[#8B0D1A] ring-2 ring-white" />
                      </div>
                      <span className="mt-2 text-[10px] font-bold text-white bg-black/80 px-2 py-0.5 rounded border border-neutral-700 shadow">
                        Live GPS: 48°12'N 32°06'W • 19.2 kts
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] text-neutral-300 border border-neutral-800 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Transponder Signal: Strong (Inmarsat C)</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                      <span className="text-neutral-500 block text-[10px] uppercase font-bold">Vessel / Unit</span>
                      <span className="text-white font-bold text-sm">MV Marv Voyager</span>
                      <span className="text-neutral-400 block text-[10px] mt-0.5">Callsign: 9HA4910</span>
                    </div>
                    <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                      <span className="text-neutral-500 block text-[10px] uppercase font-bold">Container Seal</span>
                      <span className="text-emerald-400 font-bold text-sm">MGF-894109-SEC</span>
                      <span className="text-neutral-400 block text-[10px] mt-0.5">Status: Intact & Verified</span>
                    </div>
                    <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                      <span className="text-neutral-500 block text-[10px] uppercase font-bold">Atmospheric Temp</span>
                      <span className="text-white font-bold text-sm">+4.2°C Nominal</span>
                      <span className="text-neutral-400 block text-[10px] mt-0.5">Set Point: +4.0°C</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: WAYBILL & CUSTOMS */}
              {trackingModalTab === 'documents' && (
                <div className="space-y-3">
                  <p className="text-xs text-neutral-300">
                    Official digital documentation generated for shipment {trackingNumber.trim() ? trackingNumber.toUpperCase() : 'MGF-2026-000184'}:
                  </p>

                  {[
                    { title: 'Master Bill of Lading (MBL)', file: 'MBL-MGF-2026-000184.pdf', size: '1.4 MB', date: 'Sep 28, 2026' },
                    { title: 'Commercial Invoice & Packing List', file: 'INV-PL-89401.pdf', size: '890 KB', date: 'Sep 27, 2026' },
                    { title: 'European Export Declaration (EUR.1)', file: 'CUST-CLEAR-EU-88.pdf', size: '640 KB', date: 'Sep 28, 2026' },
                    { title: 'Verified Gross Mass (VGM) Certificate', file: 'VGM-CERT-4910.pdf', size: '420 KB', date: 'Sep 27, 2026' },
                  ].map((doc, idx) => (
                    <div key={idx} className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800 flex items-center justify-between text-xs hover:border-neutral-700 transition">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-[#8B0D1A]" />
                        <div>
                          <p className="font-bold text-white">{doc.title}</p>
                          <p className="text-[10px] text-neutral-400">{doc.file} &bull; {doc.size} &bull; {doc.date}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => triggerToast(\`Downloading \${doc.file}...\`)}
                        className="px-3 py-1.5 bg-[#8B0D1A] hover:bg-[#A31222] text-white font-bold rounded-lg transition flex items-center gap-1.5 cursor-pointer text-[11px]"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 4: PROOF OF DELIVERY (POD) */}
              {trackingModalTab === 'pod' && (
                <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-3.5 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-neutral-400 uppercase">POD Verification Gate</span>
                      <h4 className="text-sm font-bold text-white">Consignee Delivery Handover Record</h4>
                    </div>
                    <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 rounded text-[10px] font-bold border border-amber-500/20">
                      Pre-Authorized at Terminal
                    </span>
                  </div>

                  <p className="text-neutral-300 text-[11px] leading-relaxed">
                    Proof of delivery records the completion of a delivery and includes delivery time, recipient details, digital signature, and GPS confirmation upon arrival at the Chicago consignee terminal.
                  </p>

                  <div className="grid grid-cols-2 gap-3 p-3 bg-neutral-900 rounded-lg border border-neutral-800 text-[11px]">
                    <div>
                      <span className="text-neutral-500 block">Designated Receiver:</span>
                      <span className="text-white font-bold">Apex Distribution Hub - Dock 4</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block">Authorized Representative:</span>
                      <span className="text-white font-bold">Marcus Vance (Ops Manager)</span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="text-[10px] text-neutral-400 italic">
                      Electronic POD will automatically activate upon physical dock gate scan.
                    </span>
                    <button
                      onClick={() => triggerToast('Official Proof of Delivery (POD) pre-manifest downloaded.')}
                      className="w-full sm:w-auto px-4 py-2 bg-[#8B0D1A] hover:bg-[#A31222] text-white font-bold rounded-lg transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Pre-Delivery POD</span>
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between flex-shrink-0">
              <span className="text-[11px] text-neutral-400">
                Need specialized assistance? Call dispatch: <span className="text-white font-bold">+880 1234567891</span>
              </span>
              <button
                onClick={() => setShowTrackingResult(false)}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs rounded-lg transition cursor-pointer"
              >
                Close Tracking
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ===================== MODAL 2: BULK TRACKING LOOKUP ===================== */}`;

if (oldTrackingModalRegex.test(content)) {
  content = content.replace(oldTrackingModalRegex, newTrackingModal);
  console.log('Replaced tracking modal with rich 4-tab console successfully.');
} else {
  console.warn('Could not match oldTrackingModalRegex.');
}

// 8. ADD TOAST NOTIFICATION COMPONENT BEFORE ROOT CLOSING TAG
const toastSnippet = `{/* Floating Toast Notification Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B0B0B] text-white border border-[#8B0D1A] px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs sm:text-sm font-semibold animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#8B0D1A] flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}`;

content = content.replace(/\s*<\/div>\s*\);\s*\}\s*$/, '\n' + toastSnippet);

// 9. GLOBAL COLOR CLEANUP: MAP ALL REMAINING LEGACY REDS TO BRAND CRIMSON PALETTE
// Replace all #FF3B14 with #8B0D1A
content = content.replaceAll('#FF3B14', '#8B0D1A');
content = content.replaceAll('#E60000', '#8B0D1A');
content = content.replaceAll('#e0310e', '#A31222');
content = content.replaceAll('#c40000', '#720A15');
content = content.replaceAll('#C40000', '#720A15');
content = content.replaceAll('#b80000', '#720A15');
content = content.replaceAll('#FF2626', '#A31222');
content = content.replaceAll('#D90000', '#8B0D1A');
content = content.replaceAll('#9E0000', '#5A0710');
content = content.replaceAll('#FF2A2A', '#A31222');

fs.writeFileSync(appPath, content, 'utf8');
console.log('Finished updating App.tsx. New size:', content.length);
