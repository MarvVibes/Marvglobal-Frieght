const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '..', 'src', 'App.tsx');
let content = fs.readFileSync(appPath, 'utf8');

console.log('Original App.tsx length:', content.length);

// =========================================================================
// 1. SECTION 5: REMOVE THE AI-STYLE BOX & INCREASE TEXT SIZES
// =========================================================================
const oldProcessHeader = `                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8B0D1A]/20 border border-[#8B0D1A]/40 mb-3 shadow-[0_0_20px_rgba(139,13,26,0.25)]">
                  <span className="w-2 h-2 rounded-full bg-[#8B0D1A] animate-ping" />
                  <span className="text-[#F5F2ED] font-bold text-[11px] tracking-[0.25em] uppercase">
                    ONE SHIPMENT • ONE CLEAR JOURNEY
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  One shipment. One clear journey.
                </h2>
                
                <p className="mt-4 text-xs sm:text-sm text-[#F5F2ED]/75 max-w-2xl mx-auto leading-relaxed">
                  From initial quote to final signature, explore our 6-stage structured custody lifecycle designed for total operational transparency.
                </p>`;

const newProcessHeader = `                <div className="flex items-center justify-center gap-2.5 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8B0D1A]" />
                  <span className="text-[#8B0D1A] font-extrabold text-xs sm:text-sm tracking-[0.25em] uppercase">
                    HOW IT WORKS
                  </span>
                  <span className="text-neutral-500">•</span>
                  <span className="text-neutral-300 font-bold text-xs sm:text-sm tracking-wider uppercase">
                    ONE SHIPMENT, ONE CLEAR JOURNEY
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                  One shipment. One clear journey.
                </h2>
                
                <p className="mt-4 text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed font-normal">
                  From initial quote to final signature, explore our 6-stage structured custody lifecycle designed for total operational transparency.
                </p>`;

if (content.includes(oldProcessHeader)) {
  content = content.replace(oldProcessHeader, newProcessHeader);
  console.log('1. Successfully removed AI box from Section 5 (Process).');
} else {
  console.error('1. Could not find oldProcessHeader in App.tsx');
}

// =========================================================================
// 2. SECTION 5: INCREASE STEPPER & CONSOLE TEXT SIZES
// =========================================================================
content = content.replace(
  `<span className={\`text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded \${
                          isActive
                            ? 'bg-black/40 text-white'
                            : isCompleted
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-neutral-800 text-neutral-400'
                        }\`}>
                          {isCompleted ? '✓ Done' : step.num}
                        </span>
                        <step.icon className={\`w-4 h-4 \${isActive ? 'text-white' : 'text-neutral-400 group-hover:text-white'}\`} />
                      </div>
                      <div className="font-bold text-xs sm:text-[13px] leading-tight block">
                        {step.title}
                      </div>
                      <span className={\`text-[10px] block mt-0.5 line-clamp-1 \${
                        isActive ? 'text-white/80' : 'text-neutral-400'
                      }\`}>
                        {step.subtitle}
                      </span>`,
  `<span className={\`text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded \${
                          isActive
                            ? 'bg-black/40 text-white'
                            : isCompleted
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-neutral-800 text-neutral-300'
                        }\`}>
                          {isCompleted ? '✓ Done' : step.num}
                        </span>
                        <step.icon className={\`w-4 h-4 \${isActive ? 'text-white' : 'text-neutral-300 group-hover:text-white'}\`} />
                      </div>
                      <div className="font-bold text-sm sm:text-base leading-tight block">
                        {step.title}
                      </div>
                      <span className={\`text-xs block mt-1 line-clamp-1 \${
                        isActive ? 'text-white/90' : 'text-neutral-300'
                      }\`}>
                        {step.subtitle}
                      </span>`
);

content = content.replace(
  `<div className="text-[11px] font-black uppercase tracking-widest text-[#8B0D1A]">
                          STAGE {currentStep.num} OF 06
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                          {currentStep.title} — {currentStep.subtitle}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-normal">
                      {currentStep.desc}
                    </p>`,
  `<div className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#8B0D1A]">
                          STAGE {currentStep.num} OF 06
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                          {currentStep.title} — {currentStep.subtitle}
                        </h3>
                      </div>
                    </div>

                    <p className="text-sm sm:text-base text-neutral-200 leading-relaxed font-normal">
                      {currentStep.desc}
                    </p>`
);

content = content.replace(
  `<span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                        Mandatory Operational Gates
                      </span>
                      {currentStep.checklist.map((item, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                          <span className="text-xs text-neutral-200 font-medium leading-snug">{item}</span>
                        </div>
                      ))}`,
  `<span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-400 block">
                        Mandatory Operational Gates
                      </span>
                      {currentStep.checklist.map((item, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                          <span className="text-sm text-neutral-200 font-medium leading-snug">{item}</span>
                        </div>
                      ))}`
);

// =========================================================================
// 3. SECTION 10: REMOVE THE AI-STYLE BOX & INCREASE TEXT SIZES
// =========================================================================
const oldOpsHeader = `                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8B0D1A]/10 border border-[#8B0D1A]/25 mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#8B0D1A] animate-pulse" />
                  <span className="text-[#8B0D1A] font-bold text-[11px] tracking-[0.25em] uppercase">
                    OPERATIONS OVERVIEW • CUSTOMER FLEET PORTAL
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 leading-tight">
                  Monitor shipments, movement, and delivery activity from one place.
                </h2>
                
                <p className="mt-3 text-xs sm:text-sm text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                  Interactive operational telemetry for customers and partners. Filter live transit nodes, inspect custody handover events, and verify Proof of Delivery (POD).
                </p>`;

const newOpsHeader = `                <div className="flex items-center justify-center gap-2.5 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8B0D1A]" />
                  <span className="text-[#8B0D1A] font-extrabold text-xs sm:text-sm tracking-[0.25em] uppercase">
                    OPERATIONS OVERVIEW
                  </span>
                  <span className="text-neutral-400">•</span>
                  <span className="text-neutral-600 font-bold text-xs sm:text-sm tracking-wider uppercase">
                    CUSTOMER FLEET PORTAL
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 leading-tight">
                  Monitor shipments, movement, and delivery activity from one place.
                </h2>
                
                <p className="mt-3.5 text-sm sm:text-base text-neutral-700 max-w-2xl mx-auto leading-relaxed">
                  Interactive operational telemetry for customers and partners. Filter live transit nodes, inspect custody handover events, and verify Proof of Delivery (POD).
                </p>`;

if (content.includes(oldOpsHeader)) {
  content = content.replace(oldOpsHeader, newOpsHeader);
  console.log('3. Successfully removed AI box from Section 10 (Operations Overview).');
} else {
  console.error('3. Could not find oldOpsHeader in App.tsx');
}

// =========================================================================
// 4. INCREASE HERO SECTION TEXT SIZES
// =========================================================================
const oldHeroLeftContent = `            {/* Left Hero Statement & CTA (Dynamic between Hero 1 & Hero 2) */}
            <div className="lg:col-span-7 flex flex-col justify-center max-w-xl transition-all duration-500 ease-in-out">
              
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8B0D1A] animate-pulse" />
                <span className="text-white/90 font-bold text-xs tracking-[0.25em] uppercase">
                  {heroStage === 1 ? 'MARVGLOBAL FREIGHT' : 'ROAD & INLAND LOGISTICS'}
                </span>
                <span className="text-white/40">•</span>
                <span className="text-white/80 text-xs font-medium">
                  {heroStage === 1 ? 'Freight movement, made clearer.' : 'From port to destination.'}
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-black tracking-tight leading-[1.08] text-white uppercase text-balance drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] min-h-[96px] sm:min-h-[105px] flex items-center">
                {heroStage === 1 ? (
                  <span className="animate-in fade-in duration-300">
                    Global freight.<br />
                    Moving without limits.
                  </span>
                ) : (
                  <span className="animate-in fade-in duration-300">
                    From port<br />
                    to destination.
                  </span>
                )}
              </h1>

              {/* Supporting Copy */}
              <p className="mt-4 sm:mt-5 text-neutral-100 text-xs sm:text-sm lg:text-[14.5px] leading-relaxed max-w-md font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] min-h-[48px] sm:min-h-[60px]">
                {heroStage === 1 ? (
                  <span className="animate-in fade-in duration-300">
                    Move cargo with a freight partner built around visibility, coordination, and confidence — from the first mile to the final destination.
                  </span>
                ) : (
                  <span className="animate-in fade-in duration-300">
                    The journey does not end when your cargo reaches the port. Marvglobal Freight keeps the movement going with coordinated road transportation and shipment visibility.
                  </span>
                )}
              </p>

              {/* Action Buttons */}
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
                  onClick={() => scrollToSection('quote-section')}
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

              {/* Hero Stage Interactive Switcher & Scroll Guide (Docx Section 3 & 16) */}
              <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 pt-3 border-t border-white/10">
                <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md p-1 rounded-xl border border-white/15 shadow-lg">
                  <button
                    type="button"
                    onClick={() => {
                      setHeroStage(1);
                      triggerToast('Switched to Hero 1: Ocean & Global Freight');
                    }}
                    className={\`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer \${
                      heroStage === 1
                        ? 'bg-[#8B0D1A] text-white shadow-md'
                        : 'text-neutral-400 hover:text-white'
                    }\`}
                  >
                    <Ship className="w-3.5 h-3.5" />
                    <span>01 Ocean</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setHeroStage(2);
                      triggerToast('Switched to Hero 2: Inland & Road Logistics');
                    }}
                    className={\`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer \${
                      heroStage === 2
                        ? 'bg-[#8B0D1A] text-white shadow-md'
                        : 'text-neutral-400 hover:text-white'
                    }\`}
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>02 Road &amp; Inland</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-white/80 font-medium bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B0D1A] animate-ping" />
                  <span>
                    {heroStage === 1
                      ? 'Scroll down to transition to Road Movement'
                      : 'Scroll down to explore Agency & Services'}
                  </span>
                </div>
              </div>

            </div>`;

const newHeroLeftContent = `            {/* Left Hero Statement & CTA (Dynamic between Hero 1 & Hero 2) */}
            <div className="lg:col-span-7 flex flex-col justify-center max-w-2xl transition-all duration-500 ease-in-out">
              
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2.5 mb-3.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8B0D1A] animate-pulse" />
                <span className="text-white/95 font-bold text-xs sm:text-sm tracking-[0.25em] uppercase">
                  {heroStage === 1 ? 'MARVGLOBAL FREIGHT' : 'ROAD & INLAND LOGISTICS'}
                </span>
                <span className="text-white/40">•</span>
                <span className="text-white/90 text-xs sm:text-sm font-semibold">
                  {heroStage === 1 ? 'Freight movement, made clearer.' : 'From port to destination.'}
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[58px] font-black tracking-tight leading-[1.08] text-white uppercase text-balance drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] min-h-[96px] sm:min-h-[115px] flex items-center">
                {heroStage === 1 ? (
                  <span className="animate-in fade-in duration-300">
                    Global freight.<br />
                    Moving without limits.
                  </span>
                ) : (
                  <span className="animate-in fade-in duration-300">
                    From port<br />
                    to destination.
                  </span>
                )}
              </h1>

              {/* Supporting Copy */}
              <p className="mt-4 sm:mt-5 text-neutral-100 text-sm sm:text-base lg:text-[17px] leading-relaxed max-w-xl font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] min-h-[52px] sm:min-h-[64px]">
                {heroStage === 1 ? (
                  <span className="animate-in fade-in duration-300">
                    Move cargo with a freight partner built around visibility, coordination, and confidence — from the first mile to the final destination.
                  </span>
                ) : (
                  <span className="animate-in fade-in duration-300">
                    The journey does not end when your cargo reaches the port. Marvglobal Freight keeps the movement going with coordinated road transportation and shipment visibility.
                  </span>
                )}
              </p>

              {/* Action Buttons */}
              <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3.5">
                <button
                  onClick={() => {
                    setActiveTab('track');
                    const inputEl = document.getElementById('tracking-input');
                    inputEl?.focus();
                  }}
                  className="bg-[#8B0D1A] hover:bg-[#A31222] text-white pl-2 pr-5 sm:pr-6 py-2.5 rounded-xl flex items-center gap-3 transition-all duration-150 shadow-xl shadow-red-950/40 active:scale-95 group cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-black transition-transform group-hover:scale-105 shadow-sm">
                    <ChevronsRight className="w-4 h-4 text-neutral-900 stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold tracking-tight text-white whitespace-nowrap">
                    Track a Shipment
                  </span>
                </button>

                <button
                  onClick={() => scrollToSection('quote-section')}
                  className="px-5 py-3 rounded-xl border border-white/30 hover:border-white/70 text-white text-xs sm:text-sm font-semibold transition bg-black/40 hover:bg-black/60 cursor-pointer flex items-center gap-2 backdrop-blur-sm"
                >
                  <span>Request a Quote</span>
                  <ArrowDown className="w-4 h-4 text-[#8B0D1A]" />
                </button>

                <button
                  onClick={() => scrollToSection('services-section')}
                  className="px-4 py-3 rounded-xl text-white/90 hover:text-white text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-1.5"
                >
                  <span>Explore Services</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Hero Stage Interactive Switcher & Scroll Guide */}
              <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 pt-3 border-t border-white/10">
                <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md p-1 rounded-xl border border-white/15 shadow-lg">
                  <button
                    type="button"
                    onClick={() => {
                      setHeroStage(1);
                      triggerToast('Switched to Hero 1: Ocean & Global Freight');
                    }}
                    className={\`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer \${
                      heroStage === 1
                        ? 'bg-[#8B0D1A] text-white shadow-md'
                        : 'text-neutral-400 hover:text-white'
                    }\`}
                  >
                    <Ship className="w-4 h-4" />
                    <span>01 Ocean</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setHeroStage(2);
                      triggerToast('Switched to Hero 2: Inland & Road Logistics');
                    }}
                    className={\`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer \${
                      heroStage === 2
                        ? 'bg-[#8B0D1A] text-white shadow-md'
                        : 'text-neutral-400 hover:text-white'
                    }\`}
                  >
                    <Truck className="w-4 h-4" />
                    <span>02 Road &amp; Inland</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs text-white/90 font-medium bg-black/40 backdrop-blur-sm px-3.5 py-2 rounded-xl border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-[#8B0D1A] animate-ping" />
                  <span>
                    {heroStage === 1
                      ? 'Scroll down to transition to Road Movement'
                      : 'Scroll down to explore Agency & Services'}
                  </span>
                </div>
              </div>

            </div>`;

if (content.includes(oldHeroLeftContent)) {
  content = content.replace(oldHeroLeftContent, newHeroLeftContent);
  console.log('4. Successfully updated Hero Left typography & sizes.');
} else {
  console.error('4. Could not find oldHeroLeftContent in App.tsx');
}

// =========================================================================
// 5. INCREASE TRACKING / SHIP CARD SIZES
// =========================================================================
content = content.replace(
  `className="w-full max-w-[350px] sm:max-w-[360px] bg-white rounded-xl p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] text-neutral-900 border border-neutral-100/90 relative"`,
  `className="w-full max-w-[380px] sm:max-w-[400px] bg-white rounded-2xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.85)] text-neutral-900 border border-neutral-100/90 relative"`
);

content = content.replace(
  `className={\`pb-2.5 text-xs sm:text-[13px] font-bold relative transition-colors cursor-pointer mr-5 sm:mr-6 \${
                      activeTab === 'track'
                        ? 'text-neutral-900'
                        : 'text-neutral-400 hover:text-neutral-700'
                    }\`}`,
  `className={\`pb-2.5 text-sm sm:text-base font-bold relative transition-colors cursor-pointer mr-5 sm:mr-6 \${
                      activeTab === 'track'
                        ? 'text-neutral-900'
                        : 'text-neutral-400 hover:text-neutral-700'
                    }\`}`
);

content = content.replace(
  `className={\`pb-2.5 text-xs sm:text-[13px] font-bold relative transition-colors cursor-pointer \${
                      activeTab === 'ship'
                        ? 'text-neutral-900'
                        : 'text-neutral-400 hover:text-neutral-700'
                    }\`}`,
  `className={\`pb-2.5 text-sm sm:text-base font-bold relative transition-colors cursor-pointer \${
                      activeTab === 'ship'
                        ? 'text-neutral-900'
                        : 'text-neutral-400 hover:text-neutral-700'
                    }\`}`
);

content = content.replace(
  `className="w-full bg-[#EFF1F4] text-neutral-900 placeholder:text-neutral-400 text-xs rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#8B0D1A]/40 font-medium transition"`,
  `className="w-full bg-[#EFF1F4] text-neutral-900 placeholder:text-neutral-400 text-sm rounded-lg px-3.5 py-3 focus:outline-none focus:ring-2 focus:ring-[#8B0D1A]/40 font-medium transition"`
);

content = content.replace(
  `className="w-full mt-3 bg-[#8B0D1A] hover:bg-[#A31222] text-white font-bold py-2.5 rounded-md text-xs sm:text-[13px] tracking-wide transition shadow-sm active:scale-[0.99] cursor-pointer"`,
  `className="w-full mt-3.5 bg-[#8B0D1A] hover:bg-[#A31222] text-white font-bold py-3 rounded-lg text-sm sm:text-base tracking-wide transition shadow-sm active:scale-[0.99] cursor-pointer"`
);

// =========================================================================
// 6. INCREASE SECTION 2 (ABOUT US) TEXT SIZES
// =========================================================================
content = content.replace(
  `<h2 className="text-2xl sm:text-3xl lg:text-[38px] font-black text-neutral-900 leading-[1.15] tracking-tight uppercase">
                Moving more than cargo.
              </h2>

              {/* Description Paragraph from docx */}
              <p className="mt-4 text-xs sm:text-[13.5px] text-neutral-600 leading-relaxed max-w-xl font-normal">
                Marvglobal Freight is built around a simple belief: logistics should be easier to understand. Cargo moves through multiple stages, but the customer experience should feel connected from beginning to end.
              </p>`,
  `<h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-neutral-900 leading-[1.15] tracking-tight uppercase">
                Moving more than cargo.
              </h2>

              {/* Description Paragraph from docx */}
              <p className="mt-4 text-sm sm:text-base text-neutral-700 leading-relaxed max-w-xl font-normal">
                Marvglobal Freight is built around a simple belief: logistics should be easier to understand. Cargo moves through multiple stages, but the customer experience should feel connected from beginning to end.
              </p>`
);

content = content.replace(
  `<span className="text-xs sm:text-[13px] font-semibold text-neutral-800">
                    <strong>Visibility:</strong> You should not have to chase updates. Your shipment journey is easy to understand.
                  </span>`,
  `<span className="text-sm sm:text-[15px] font-medium text-neutral-800">
                    <strong className="text-neutral-950 font-bold">Visibility:</strong> You should not have to chase updates. Your shipment journey is easy to understand.
                  </span>`
);

content = content.replace(
  `<span className="text-xs sm:text-[13px] font-semibold text-neutral-800">
                    <strong>Coordination:</strong> We bring people, places, vehicles, documents, and timing into one organized flow.
                  </span>`,
  `<span className="text-sm sm:text-[15px] font-medium text-neutral-800">
                    <strong className="text-neutral-950 font-bold">Coordination:</strong> We bring people, places, vehicles, documents, and timing into one organized flow.
                  </span>`
);

content = content.replace(
  `<span className="text-xs sm:text-[13px] font-semibold text-neutral-800">
                    <strong>Accountability:</strong> Critical movement events are recorded, timestamped, and fully traceable.
                  </span>`,
  `<span className="text-sm sm:text-[15px] font-medium text-neutral-800">
                    <strong className="text-neutral-950 font-bold">Accountability:</strong> Critical movement events are recorded, timestamped, and fully traceable.
                  </span>`
);

// =========================================================================
// 7. INCREASE SECTION 3A (SERVICES) TEXT SIZES
// =========================================================================
content = content.replace(
  `<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-neutral-900 tracking-tight max-w-3xl mx-auto leading-tight">
                  Freight that keeps moving.
                </h2>

                <p className="mt-3.5 text-xs sm:text-sm text-neutral-600 max-w-2xl mx-auto leading-relaxed font-normal">
                  Marvglobal Freight brings the physical movement of cargo together with a clearer digital experience — so customers can book, follow, and manage shipments with less uncertainty.
                </p>`,
  `<h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 tracking-tight max-w-3xl mx-auto leading-tight">
                  Freight that keeps moving.
                </h2>

                <p className="mt-4 text-sm sm:text-base text-neutral-700 max-w-2xl mx-auto leading-relaxed font-normal">
                  Marvglobal Freight brings the physical movement of cargo together with a clearer digital experience — so customers can book, follow, and manage shipments with less uncertainty.
                </p>`
);

content = content.replace(
  `<h3 className={\`text-xs sm:text-[13px] font-bold transition-colors leading-tight \${
                          isSelected ? 'text-white' : 'text-neutral-900 group-hover:text-[#8B0D1A]'
                        }\`}>
                          {svc.title}
                        </h3>
                        <span className={\`text-[10px] font-medium block mt-1 line-clamp-1 \${
                          isSelected ? 'text-white/80' : 'text-neutral-500'
                        }\`}>
                          {svc.tag}
                        </span>`,
  `<h3 className={\`text-sm sm:text-base font-bold transition-colors leading-tight \${
                          isSelected ? 'text-white' : 'text-neutral-900 group-hover:text-[#8B0D1A]'
                        }\`}>
                          {svc.title}
                        </h3>
                        <span className={\`text-xs font-medium block mt-1 line-clamp-1 \${
                          isSelected ? 'text-white/90' : 'text-neutral-600'
                        }\`}>
                          {svc.tag}
                        </span>`
);

// =========================================================================
// 8. INCREASE SECTION 3B (WHY CHOOSE US) TEXT SIZES
// =========================================================================
content = content.replace(
  `<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-white leading-tight mb-4">
                A clearer way to move freight.
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed mb-8">
                From local hauling to intermodal global container corridors, our operations are designed around four foundational commitments.
              </p>`,
  `<h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
                A clearer way to move freight.
              </h2>
              <p className="text-base sm:text-lg text-neutral-200 leading-relaxed mb-8">
                From local hauling to intermodal global container corridors, our operations are designed around four foundational commitments.
              </p>`
);

// 4 commitments text sizes
content = content.replace(
  `<span className="text-xs sm:text-[13px] font-bold text-white block">
                        {item.title}
                      </span>
                      <p className="text-[11px] text-neutral-300 leading-relaxed mt-0.5">
                        {item.desc}
                      </p>`,
  `<span className="text-sm sm:text-base font-bold text-white block">
                        {item.title}
                      </span>
                      <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed mt-1">
                        {item.desc}
                      </p>`
);

fs.writeFileSync(appPath, content, 'utf8');
console.log('Finished updating App.tsx typography. New length:', content.length);
