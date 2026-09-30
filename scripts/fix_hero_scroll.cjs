const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '..', 'src', 'App.tsx');
let content = fs.readFileSync(appPath, 'utf8');

console.log('Original App.tsx length:', content.length);

// 1. UPDATE STATE DECLARATIONS
const oldStateBlock = `  // Background Video State: Hero 1 and Hero 2
  const [hero1VideoUrl, setHero1VideoUrl] = useState<string>('/hero1.mp4');
  const [hero2VideoUrl, setHero2VideoUrl] = useState<string>('/hero2.mp4');
  const [scrollProgress, setScrollProgress] = useState(0); // 0 (Hero 1) to 1 (Hero 2)

  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showWatchVideoModal, setShowWatchVideoModal] = useState(false);
  const [activeWatchVideo, setActiveWatchVideo] = useState<'hero1' | 'hero2'>('hero1');
  const [customVideoInput, setCustomVideoInput] = useState('');
  const [targetVideoSlot, setTargetVideoSlot] = useState<'hero1' | 'hero2'>('hero1');
  const [isDragOver, setIsDragOver] = useState(false);
  const [videoStatusMessage, setVideoStatusMessage] = useState<string>('');
  
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);`;

const newStateBlock = `  // Background Video State: Hero 1 (Ocean) and Hero 2 (Road / Inland)
  const [hero1VideoUrl, setHero1VideoUrl] = useState<string>('/hero1.mp4');
  const [hero2VideoUrl, setHero2VideoUrl] = useState<string>('/hero2.mp4');
  const [heroStage, setHeroStage] = useState<1 | 2>(1);
  const heroStageRef = useRef<1 | 2>(1);
  heroStageRef.current = heroStage;
  const isTransitioningRef = useRef(false);
  const lastScrollTriggerRef = useRef(0);
  const touchStartYRef = useRef<number | null>(null);

  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showWatchVideoModal, setShowWatchVideoModal] = useState(false);
  const [activeWatchVideo, setActiveWatchVideo] = useState<'hero1' | 'hero2'>('hero1');
  const [customVideoInput, setCustomVideoInput] = useState('');
  const [targetVideoSlot, setTargetVideoSlot] = useState<'hero1' | 'hero2'>('hero1');
  const [isDragOver, setIsDragOver] = useState(false);
  const [videoStatusMessage, setVideoStatusMessage] = useState<string>('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);`;

if (content.includes(oldStateBlock)) {
  content = content.replace(oldStateBlock, newStateBlock);
  console.log('Replaced state declarations successfully.');
} else {
  console.error('Could not find oldStateBlock');
}

// 2. UPDATE SCROLL EFFECT LISTENER
const oldScrollEffectRegex = /\/\/ Pinned Hero Scroll Engine:[\s\S]*?return \(\) => window\.removeEventListener\('scroll', handleScroll\);\s*\}, \[\]\);/;

const newScrollEffect = `// Dual-Hero Scroll Engine:
  // When at the top of the page in the Hero section:
  // - First scroll down does NOT scroll away; it smoothly transitions from Hero 1 to Hero 2.
  // - Next scroll down on Hero 2 moves naturally down into Section 2 (About Us).
  // - Scrolling back up from Section 2 lands on Hero 2, and scrolling up again returns to Hero 1.
  // - Zero extra black screen!
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const now = Date.now();

      // Only intercept when user is at the top of the page inside Hero
      if (scrollY <= 25) {
        // Scrolling DOWN
        if (e.deltaY > 15) {
          if (heroStageRef.current === 1) {
            e.preventDefault();
            if (!isTransitioningRef.current && now - lastScrollTriggerRef.current > 350) {
              isTransitioningRef.current = true;
              lastScrollTriggerRef.current = now;
              setHeroStage(2);
              triggerToast('Transitioned to Inland & Road Transport');
              setTimeout(() => {
                isTransitioningRef.current = false;
              }, 600);
            }
          }
          // If heroStage === 2, let normal scrolling proceed directly to Section 2 without blocking
        }
        // Scrolling UP
        else if (e.deltaY < -15) {
          if (heroStageRef.current === 2 && scrollY <= 15) {
            e.preventDefault();
            if (!isTransitioningRef.current && now - lastScrollTriggerRef.current > 350) {
              isTransitioningRef.current = true;
              lastScrollTriggerRef.current = now;
              setHeroStage(1);
              triggerToast('Transitioned to Global Ocean Freight');
              setTimeout(() => {
                isTransitioningRef.current = false;
              }, 600);
            }
          }
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartYRef.current === null) return;
      const currentY = e.touches[0].clientY;
      const deltaY = touchStartYRef.current - currentY;
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const now = Date.now();

      if (scrollY <= 25) {
        // Swiping UP (scrolling DOWN)
        if (deltaY > 30 && heroStageRef.current === 1) {
          e.preventDefault();
          if (!isTransitioningRef.current && now - lastScrollTriggerRef.current > 350) {
            isTransitioningRef.current = true;
            lastScrollTriggerRef.current = now;
            setHeroStage(2);
            touchStartYRef.current = currentY;
            setTimeout(() => {
              isTransitioningRef.current = false;
            }, 600);
          }
        }
        // Swiping DOWN (scrolling UP)
        else if (deltaY < -30 && heroStageRef.current === 2 && scrollY <= 15) {
          e.preventDefault();
          if (!isTransitioningRef.current && now - lastScrollTriggerRef.current > 350) {
            isTransitioningRef.current = true;
            lastScrollTriggerRef.current = now;
            setHeroStage(1);
            touchStartYRef.current = currentY;
            setTimeout(() => {
              isTransitioningRef.current = false;
            }, 600);
          }
        }
      }
    };

    const handleTouchEnd = () => {
      touchStartYRef.current = null;
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);`;

if (oldScrollEffectRegex.test(content)) {
  content = content.replace(oldScrollEffectRegex, newScrollEffect);
  console.log('Replaced scroll effect listener successfully.');
} else {
  console.error('Could not match oldScrollEffectRegex');
}

// 3. UPDATE handleFileDrop scrollProgress check
content = content.replace(
  `if (scrollProgress > 0.5) {`,
  `if (heroStage === 2) {`
);

// 4. UPDATE HERO SECTION OPENING & DUAL VIDEO ENGINE (REMOVE 210vh WRAPPER)
const oldHeroOpening = `      {/* ========================================================================= */}
      {/* 1. HERO SECTION (PINNED HERO CONTAINER: HERO 2 FULLY REVEALS BEFORE SCROLLING) */}
      {/* ========================================================================= */}
      <div id="home" ref={heroContainerRef} className="relative h-[210vh] w-full">
        <section className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden z-10">
        
        {/* ===================== BRIGHT DUAL VIDEO BACKGROUND ENGINE ===================== */}
        {/* Strictly contained inside the Hero section: the video stops at the hero */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          
          {/* HERO 1 BACKGROUND VIDEO (Bright, smooth fade out on scroll) */}
          <video
            ref={video1Ref}
            key={\`hero1-\${hero1VideoUrl}\`}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover will-change-transform will-change-opacity transition-opacity duration-300 ease-out"
            style={{
              opacity: Math.max(0, 1 - scrollProgress),
              transform: \`scale(\${1.02 + scrollProgress * 0.03})\`,
            }}
          >
            <source src={hero1VideoUrl} type="video/mp4" />
            <source src="/Hero 1 background.mp4" type="video/mp4" />
          </video>

          {/* HERO 2 BACKGROUND VIDEO (Bright, smooth fade in on scroll) */}
          <video
            ref={video2Ref}
            key={\`hero2-\${hero2VideoUrl}\`}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover will-change-transform will-change-opacity transition-opacity duration-300 ease-out"
            style={{
              opacity: scrollProgress,
              transform: \`scale(\${1.05 - scrollProgress * 0.03})\`,
            }}
          >
            <source src={hero2VideoUrl} type="video/mp4" />
            <source src="/Hero 2 background.mp4" type="video/mp4" />
          </video>

          {/* Ultra-light, crystal-clear scrim (Preserves maximum brightness & natural video colors) */}
          <div className="absolute inset-0 bg-black/15 bg-gradient-to-b from-black/35 via-transparent to-black/45 pointer-events-none" />
        </div>

        {/* Drag & Drop Overlay Alert */}
        {isDragOver && (
          <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center border-4 border-dashed border-[#8B0D1A] m-6 rounded-3xl pointer-events-none animate-in fade-in duration-150">
            <Upload className="w-16 h-16 text-[#8B0D1A] animate-bounce mb-4" />
            <h2 className="text-2xl font-black text-white">Drop your background video here</h2>
            <p className="text-sm text-neutral-300 mt-2">
              Will be loaded into {scrollProgress > 0.5 ? 'Hero 2' : 'Hero 1'}
            </p>
          </div>
        )}`;

const newHeroOpening = `      {/* ========================================================================= */}
      {/* 1. HERO SECTION (DUAL-HERO ENGINE: TRANSITIONS HERO 1 -> HERO 2 ON SCROLL) */}
      {/* ========================================================================= */}
      <section 
        id="home" 
        className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden z-10"
      >
        
        {/* ===================== DUAL VIDEO BACKGROUND ENGINE ===================== */}
        {/* Strictly contained inside the Hero section: the video stops at the hero */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          
          {/* HERO 1 BACKGROUND VIDEO (Ocean & Global Freight - Smooth Crossfade) */}
          <video
            ref={video1Ref}
            key={\`hero1-\${hero1VideoUrl}\`}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover will-change-transform will-change-opacity transition-all duration-700 ease-in-out"
            style={{
              opacity: heroStage === 1 ? 1 : 0,
              transform: heroStage === 1 ? 'scale(1)' : 'scale(1.03)',
            }}
          >
            <source src={hero1VideoUrl} type="video/mp4" />
            <source src="/hero1.mp4" type="video/mp4" />
            <source src="/Hero 1 background.mp4" type="video/mp4" />
          </video>

          {/* HERO 2 BACKGROUND VIDEO (Road & Inland Movement - Smooth Crossfade) */}
          <video
            ref={video2Ref}
            key={\`hero2-\${hero2VideoUrl}\`}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover will-change-transform will-change-opacity transition-all duration-700 ease-in-out"
            style={{
              opacity: heroStage === 2 ? 1 : 0,
              transform: heroStage === 2 ? 'scale(1)' : 'scale(1.03)',
            }}
          >
            <source src={hero2VideoUrl} type="video/mp4" />
            <source src="/hero2.mp4" type="video/mp4" />
            <source src="/Hero 2 background.mp4" type="video/mp4" />
          </video>

          {/* Ultra-light, crystal-clear scrim (Preserves maximum brightness & natural video colors) */}
          <div className="absolute inset-0 bg-black/20 bg-gradient-to-b from-black/40 via-transparent to-black/50 pointer-events-none" />
        </div>

        {/* Drag & Drop Overlay Alert */}
        {isDragOver && (
          <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center border-4 border-dashed border-[#8B0D1A] m-6 rounded-3xl pointer-events-none animate-in fade-in duration-150">
            <Upload className="w-16 h-16 text-[#8B0D1A] animate-bounce mb-4" />
            <h2 className="text-2xl font-black text-white">Drop your background video here</h2>
            <p className="text-sm text-neutral-300 mt-2">
              Will be loaded into {heroStage === 2 ? 'Hero 2' : 'Hero 1'}
            </p>
          </div>
        )}`;

if (content.includes(oldHeroOpening)) {
  content = content.replace(oldHeroOpening, newHeroOpening);
  console.log('Replaced Hero Opening & Video Engine successfully.');
} else {
  console.error('Could not find oldHeroOpening');
}

// 5. UPDATE HERO CONTENT (DYNAMIC BETWEEN HERO 1 & HERO 2)
const oldHeroContent = `            {/* Left Hero Statement & CTA */}
            <div className="lg:col-span-7 flex flex-col justify-center max-w-xl">
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

const newHeroContent = `            {/* Left Hero Statement & CTA (Dynamic between Hero 1 & Hero 2) */}
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

if (content.includes(oldHeroContent)) {
  content = content.replace(oldHeroContent, newHeroContent);
  console.log('Replaced Hero Left Content successfully.');
} else {
  console.error('Could not find oldHeroContent');
}

// 6. REMOVE CLOSING </div> OF 210vh WRAPPER
const oldHeroEnd = `          </div>

        </div>

      </section>
      </div>

      {/* ========================================================================= */}
      {/* 2. NEXT SECTION: LEADING GLOBAL LOGISTIC AND TRANSPORT AGENCY`;

const newHeroEnd = `          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 2. NEXT SECTION: LEADING GLOBAL LOGISTIC AND TRANSPORT AGENCY`;

if (content.includes(oldHeroEnd)) {
  content = content.replace(oldHeroEnd, newHeroEnd);
  console.log('Removed extra wrapper </div> successfully.');
} else {
  console.error('Could not find oldHeroEnd');
}

fs.writeFileSync(appPath, content, 'utf8');
console.log('Finished updating App.tsx. New length:', content.length);
