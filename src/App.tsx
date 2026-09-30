import React, { useState, useRef, useEffect } from 'react';
import {
  Phone,
  ChevronDown,
  ChevronsRight,
  Info,
  X,
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  Truck,
  Box,
  HelpCircle,
  Menu,
  Video,
  Upload,
  Play,
  RotateCcw,
  ArrowDown,
  ArrowUp,
  Check,
  Award,
  Shield,
  Layers,
  Globe2,
  Package,
  Warehouse,
  Ship,
  FileText,
  Cpu,
  ShoppingBag,
  Link2,
  UserPlus,
  CheckCircle,
  Plane,
  Anchor,
  Plus,
  ChevronUp,
  ChevronRight,
  Mail,
  Send,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Star,
  ArrowRight,
  UserCheck,
  ShieldCheck,
  Headphones,
  Sliders,
  Calculator,
  Download,
  Printer,
  Navigation,
  Calendar,
  AlertCircle
} from 'lucide-react';


export default function App() {
  const [activeTab, setActiveTab] = useState<'track' | 'ship'>('track');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shippingDropdownOpen, setShippingDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Background Video State: Hero 1 (Ocean) and Hero 2 (Road / Inland)
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
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  // Modals
  const [showTrackingResult, setShowTrackingResult] = useState(false);
  const [showMultipleTrackingModal, setShowMultipleTrackingModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showGetStartedModal, setShowGetStartedModal] = useState(false);
  const [showLearnMoreModal, setShowLearnMoreModal] = useState(false);

  // Ship order form states
  const [originZip, setOriginZip] = useState('');
  const [destZip, setDestZip] = useState('');
  const [packageWeight, setPackageWeight] = useState('');
  const [quoteCalculated, setQuoteCalculated] = useState<number | null>(null);

  // States for Remaining Sections
  const [legacyTab, setLegacyTab] = useState<'vision' | 'history' | 'philosophy'>('vision');
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);
  const [quoteFormData, setQuoteFormData] = useState({
    name: '',
    email: '',
    subject: '',
    phone: '',
    message: '',
  });
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  // Interactive Services Section States
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [calcOrigin, setCalcOrigin] = useState('Rotterdam, Netherlands');
  const [calcDestination, setCalcDestination] = useState('Chicago, IL (USA)');
  const [calcWeight, setCalcWeight] = useState(12500);
  const [calcContainerType, setCalcContainerType] = useState<'20ft' | '40ft' | 'reefer'>('40ft');
  const [calcServiceTab, setCalcServiceTab] = useState<'calculator' | 'specs' | 'milestones'>('calculator');

  // Interactive 6-Stage Process Journey State (Docx Section 3)
  const [activeProcessStep, setActiveProcessStep] = useState(0);

  // Interactive Operations Telemetry Dashboard States (Docx Section 10)
  const [opsFilter, setOpsFilter] = useState<'all' | 'in_transit' | 'awaiting_pickup' | 'out_for_delivery' | 'delayed'>('all');
  const [opsSearch, setOpsSearch] = useState('');
  const [selectedOpsShipment, setSelectedOpsShipment] = useState<string | null>('MGF-2026-000184');

  // FAQ Live Keyword Search State (Docx Section 12)
  const [faqSearchQuery, setFaqSearchQuery] = useState('');

  // Latest Projects Filter State
  const [projectCategoryFilter, setProjectCategoryFilter] = useState('All');

  // Tracking Modal Active Sub-tab
  const [trackingModalTab, setTrackingModalTab] = useState<'journey' | 'telemetry' | 'documents' | 'pod'>('journey');

  // Interactive Toast Notification Feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };


  // Dual-Hero Scroll Engine:
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
  }, []);

  // Ensure both videos are kept playing smoothly and unpaused
  useEffect(() => {
    if (video1Ref.current) {
      video1Ref.current.play().catch(() => {});
    }
    if (video2Ref.current) {
      video2Ref.current.play().catch(() => {});
    }
  }, [hero1VideoUrl, hero2VideoUrl]);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setShowTrackingResult(true);
  };

  const handleQuickTrack = (num: string) => {
    setTrackingNumber(num);
    setSelectedOpsShipment(num);
    setShowTrackingResult(true);
  };

  const handleCalculateQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const weightNum = parseFloat(packageWeight) || 5;
    setQuoteCalculated(Math.round(weightNum * 8.5 + 45));
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('video/')) {
        const objectUrl = URL.createObjectURL(file);
        if (heroStage === 2) {
          setHero2VideoUrl(objectUrl);
          setVideoStatusMessage(`Hero 2: ${file.name}`);
        } else {
          setHero1VideoUrl(objectUrl);
          setVideoStatusMessage(`Hero 1: ${file.name}`);
        }
      }
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const objectUrl = URL.createObjectURL(file);
      if (targetVideoSlot === 'hero2') {
        setHero2VideoUrl(objectUrl);
        setVideoStatusMessage(`Hero 2: ${file.name}`);
      } else {
        setHero1VideoUrl(objectUrl);
        setVideoStatusMessage(`Hero 1: ${file.name}`);
      }
      setShowVideoModal(false);
    }
  };

  const handleSetCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (customVideoInput.trim()) {
      if (targetVideoSlot === 'hero2') {
        setHero2VideoUrl(customVideoInput.trim());
      } else {
        setHero1VideoUrl(customVideoInput.trim());
      }
      setVideoStatusMessage(`Custom video set for ${targetVideoSlot === 'hero2' ? 'Hero 2' : 'Hero 1'}`);
      setShowVideoModal(false);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAboutSection = () => {
    scrollToSection('about-transport-section');
  };

  return (
    <div 
      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleFileDrop}
      className="bg-black text-white font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#8B0D1A] selection:text-white relative overflow-x-hidden"
    >
      {/* ========================================================================= */}
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
            key={`hero1-${hero1VideoUrl}`}
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
            key={`hero2-${hero2VideoUrl}`}
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
        )}

        {/* ===================== HERO MAIN CONTAINER ===================== */}
        <div className="w-full max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-10 flex-1 flex flex-col justify-between py-6 sm:py-7 z-10 relative">
          
          {/* TOP NAVIGATION BAR */}
          <header className="flex items-center justify-between w-full pb-4 sm:pb-6 relative z-30">
            
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
          </header>

          {/* Mobile Dropdown Menu */}
          {mobileMenuOpen && (
            <div className="xl:hidden w-full bg-neutral-950/95 backdrop-blur-md border border-neutral-800 rounded-xl p-4 mb-4 z-40 flex flex-col gap-2.5 animate-in fade-in duration-200">
              <a 
                href="#home" 
                onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="px-3 py-2 text-sm font-bold text-white hover:text-[#8B0D1A] rounded-lg hover:bg-neutral-900 transition"
              >
                HOME
              </a>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToSection('services-section');
                }}
                className="text-left px-3 py-2 text-sm font-bold text-white hover:text-[#8B0D1A] rounded-lg hover:bg-neutral-900 transition cursor-pointer"
              >
                SERVICES
              </button>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToAboutSection();
                }}
                className="text-left px-3 py-2 text-sm font-bold text-white hover:text-[#8B0D1A] rounded-lg hover:bg-neutral-900 transition cursor-pointer"
              >
                ABOUT US
              </button>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToSection('process-section');
                }}
                className="text-left px-3 py-2 text-sm font-bold text-white hover:text-[#8B0D1A] rounded-lg hover:bg-neutral-900 transition cursor-pointer"
              >
                HOW IT WORKS
              </button>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToSection('pricing-section');
                }}
                className="text-left px-3 py-2 text-sm font-bold text-white hover:text-[#8B0D1A] rounded-lg hover:bg-neutral-900 transition cursor-pointer"
              >
                PRICING
              </button>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToSection('faq-section');
                }}
                className="text-left px-3 py-2 text-sm font-bold text-white hover:text-[#8B0D1A] rounded-lg hover:bg-neutral-900 transition cursor-pointer"
              >
                FAQ
              </button>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActiveTab('track');
                  const inputEl = document.getElementById('tracking-input');
                  inputEl?.focus();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-left px-3 py-2 text-sm font-bold text-white hover:text-[#8B0D1A] rounded-lg hover:bg-neutral-900 transition cursor-pointer"
              >
                TRACKING
              </button>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowHelpModal(true);
                }}
                className="text-left px-3 py-2 text-sm font-bold text-white hover:text-[#8B0D1A] rounded-lg hover:bg-neutral-900 transition cursor-pointer"
              >
                SUPPORT
              </button>
              <div className="pt-2 border-t border-neutral-800 flex items-center justify-between">
                <a
                  href="tel:+8801234567891"
                  className="flex items-center gap-2 text-xs font-semibold text-neutral-300 py-1"
                >
                  <Phone className="w-3.5 h-3.5 text-[#8B0D1A]" />
                  <span>+880 1234567891</span>
                </a>
              </div>
            </div>
          )}

          {/* ===================== HERO MAIN CONTENT ===================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center my-auto pt-4 sm:pt-8 lg:pt-12 pb-14 sm:pb-20 lg:pb-24">
            
            {/* Left Hero Statement & CTA (Dynamic between Hero 1 & Hero 2) */}
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
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      heroStage === 1
                        ? 'bg-[#8B0D1A] text-white shadow-md'
                        : 'text-neutral-400 hover:text-white'
                    }`}
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
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      heroStage === 2
                        ? 'bg-[#8B0D1A] text-white shadow-md'
                        : 'text-neutral-400 hover:text-white'
                    }`}
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

            </div>

            {/* Right Floating Tracking / Ship Card */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-[350px] sm:max-w-[360px] bg-white rounded-xl p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] text-neutral-900 border border-neutral-100/90 relative">
                
                {/* Tab Header */}
                <div className="relative flex border-b border-neutral-200">
                  <button
                    type="button"
                    onClick={() => setActiveTab('track')}
                    className={`pb-2.5 text-xs sm:text-[13px] font-bold relative transition-colors cursor-pointer mr-5 sm:mr-6 ${
                      activeTab === 'track'
                        ? 'text-neutral-900'
                        : 'text-neutral-400 hover:text-neutral-700'
                    }`}
                  >
                    Tracking Order
                    {activeTab === 'track' && (
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#8B0D1A] rounded-full" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('ship')}
                    className={`pb-2.5 text-xs sm:text-[13px] font-bold relative transition-colors cursor-pointer ${
                      activeTab === 'ship'
                        ? 'text-neutral-900'
                        : 'text-neutral-400 hover:text-neutral-700'
                    }`}
                  >
                    Ship Order
                    {activeTab === 'ship' && (
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#8B0D1A] rounded-full" />
                    )}
                  </button>
                </div>

                {/* Tab Content: Tracking Order Form */}
                {activeTab === 'track' ? (
                  <form onSubmit={handleTrack} className="mt-4">
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
                    </button>

                    <div className="flex items-center justify-between mt-3 text-[11px] font-semibold text-neutral-800">
                      <button
                        type="button"
                        onClick={() => setShowMultipleTrackingModal(true)}
                        className="hover:text-[#8B0D1A] transition cursor-pointer text-left"
                      >
                        Multiple Tracking Numbers
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowHelpModal(true)}
                        className="flex items-center gap-1 text-neutral-400 hover:text-neutral-700 transition cursor-pointer"
                      >
                        <Info className="w-3.5 h-3.5 text-neutral-400 stroke-[2]" />
                        <span className="font-normal text-neutral-500">Need Help</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleCalculateQuote} className="mt-4 space-y-2.5">
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={originZip}
                        onChange={(e) => setOriginZip(e.target.value)}
                        placeholder="From (Zip / City)"
                        className="w-full bg-[#EFF1F4] text-neutral-900 placeholder:text-neutral-400 text-[11px] rounded-md px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B0D1A]/40 font-medium"
                      />
                      <input
                        type="text"
                        value={destZip}
                        onChange={(e) => setDestZip(e.target.value)}
                        placeholder="To (Country / Zip)"
                        className="w-full bg-[#EFF1F4] text-neutral-900 placeholder:text-neutral-400 text-[11px] rounded-md px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B0D1A]/40 font-medium"
                      />
                    </div>
                    <input
                      type="number"
                      value={packageWeight}
                      onChange={(e) => setPackageWeight(e.target.value)}
                      placeholder="Estimated Weight (kg)"
                      className="w-full bg-[#EFF1F4] text-neutral-900 placeholder:text-neutral-400 text-[11px] rounded-md px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B0D1A]/40 font-medium"
                    />

                    {quoteCalculated !== null && (
                      <div className="p-2 bg-neutral-100 rounded-md text-[11px] flex justify-between items-center text-neutral-900 font-semibold animate-in fade-in">
                        <span>Standard Rate:</span>
                        <span className="text-[#8B0D1A] font-black text-xs">${quoteCalculated}.00 USD</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full bg-[#8B0D1A] hover:bg-[#A31222] text-white font-bold py-2.5 rounded-md text-xs tracking-wide transition shadow-sm cursor-pointer"
                    >
                      {quoteCalculated ? 'Book Shipment Now' : 'Calculate Instant Rate'}
                    </button>

                    <div className="flex items-center justify-between text-[11px] font-semibold text-neutral-800 pt-0.5">
                      <span className="text-neutral-500 font-normal">Pick-up today</span>
                      <button
                        type="button"
                        onClick={() => setShowHelpModal(true)}
                        className="flex items-center gap-1 text-neutral-500 hover:text-neutral-800"
                      >
                        <Info className="w-3 h-3" />
                        <span>FAQ</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* App Store Download Badges Row */}
                <div className="grid grid-cols-2 gap-2.5 mt-4 pt-3.5 border-t border-neutral-100">
                  <a
                    href="https://play.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-black hover:bg-neutral-900 text-white rounded-md px-2.5 py-1.5 flex items-center gap-2 transition active:scale-95 group cursor-pointer border border-neutral-900"
                    aria-label="Get it on Google Play"
                  >
                    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                      <path d="M3.6 1.8C3.3 2.1 3.1 2.6 3.1 3.3V20.7C3.1 21.4 3.3 21.9 3.6 22.2L3.7 22.3L13.4 12.6V12L3.7 2.3L3.6 1.8Z" fill="#00E676" />
                      <path d="M16.6 15.8L13.4 12.6V12L16.6 8.8L16.7 8.9L20.5 11C21.6 11.7 21.6 12.9 20.5 13.6L16.7 15.7L16.6 15.8Z" fill="#FFD600" />
                      <path d="M16.7 15.7L13.4 12.4L3.6 22.2C4 22.6 4.7 22.7 5.6 22.2L16.7 15.7Z" fill="#FF3D00" />
                      <path d="M16.7 8.9L5.6 2.4C4.7 1.9 4 2 3.6 2.4L13.4 12.2L16.7 8.9Z" fill="#00B0FF" />
                    </svg>
                    <div className="flex flex-col text-left leading-none">
                      <span className="text-[7px] uppercase tracking-wider text-neutral-300 font-medium">
                        GET IT ON
                      </span>
                      <span className="text-[11px] font-bold text-white tracking-tight mt-0.5 font-sans">
                        Google Play
                      </span>
                    </div>
                  </a>

                  <a
                    href="https://apple.com/app-store"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-black hover:bg-neutral-900 text-white rounded-md px-2.5 py-1.5 flex items-center gap-2 transition active:scale-95 group cursor-pointer border border-neutral-900"
                    aria-label="Download on the App Store"
                  >
                    <svg className="w-4 h-4 flex-shrink-0 fill-white" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.64 1.35-.57.65-1.07 1.72-.94 2.74 1.01.08 2.04-.49 2.66-1.24z" />
                    </svg>
                    <div className="flex flex-col text-left leading-none">
                      <span className="text-[7px] text-neutral-300 font-medium">
                        Download on the
                      </span>
                      <span className="text-[11px] font-bold text-white tracking-tight mt-0.5 font-sans">
                        App Store
                      </span>
                    </div>
                  </a>
                </div>

              </div>
            </div>

          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 2. NEXT SECTION: LEADING GLOBAL LOGISTIC AND TRANSPORT AGENCY              */}
      {/* (EXACT DESIGN MATCH FROM PROVIDED IMAGE)                                  */}
      {/* ========================================================================= */}
      <section 
        id="about-transport-section" 
        className="relative z-30 bg-white text-neutral-900 pb-20 sm:pb-28 select-none"
      >
        
        {/* ===================== TOP 4 FLOATING SERVICE PILLARS (EXACTLY DIVIDING HERO & ABOUT) ===================== */}
        <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-8 lg:px-10 -translate-y-8 sm:-translate-y-1/2 z-40 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            
            {/* Card 1: Ocean Freight */}
            <div 
              onClick={() => { setActiveServiceIndex(0); scrollToSection('services-section'); }}
              className="bg-white border border-neutral-100 rounded-xl p-5 sm:p-6 shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:shadow-[0_22px_45px_rgba(139,13,26,0.12)] hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex items-start justify-between min-h-[105px] sm:min-h-[120px]"
            >
              <div className="flex flex-col justify-center">
                <span className="text-sm sm:text-base font-bold text-neutral-900 group-hover:text-[#8B0D1A] transition-colors leading-tight">
                  Ocean Freight
                </span>
                <span className="text-xs text-neutral-500 font-medium mt-1 leading-tight">
                  Global Trade Routes
                </span>
              </div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#8B0D1A]/10 text-[#8B0D1A] group-hover:bg-[#8B0D1A] group-hover:text-white transition-all flex items-center justify-center flex-shrink-0 shadow-sm ml-2">
                <Ship className="w-5 h-5" />
              </div>
            </div>

            {/* Card 2: Road Freight */}
            <div 
              onClick={() => { setActiveServiceIndex(1); scrollToSection('services-section'); }}
              className="bg-white border border-neutral-100 rounded-xl p-5 sm:p-6 shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:shadow-[0_22px_45px_rgba(139,13,26,0.12)] hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex items-start justify-between min-h-[105px] sm:min-h-[120px]"
            >
              <div className="flex flex-col justify-center">
                <span className="text-sm sm:text-base font-bold text-neutral-900 group-hover:text-[#8B0D1A] transition-colors leading-tight">
                  Road Freight
                </span>
                <span className="text-xs text-neutral-500 font-medium mt-1 leading-tight">
                  Inland Hub Logistics
                </span>
              </div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#8B0D1A]/10 text-[#8B0D1A] group-hover:bg-[#8B0D1A] group-hover:text-white transition-all flex items-center justify-center flex-shrink-0 shadow-sm ml-2">
                <Truck className="w-5 h-5" />
              </div>
            </div>

            {/* Card 3: Container Transport */}
            <div 
              onClick={() => { setActiveServiceIndex(2); scrollToSection('services-section'); }}
              className="bg-white border border-neutral-100 rounded-xl p-5 sm:p-6 shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:shadow-[0_22px_45px_rgba(139,13,26,0.12)] hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex items-start justify-between min-h-[105px] sm:min-h-[120px]"
            >
              <div className="flex flex-col justify-center">
                <span className="text-sm sm:text-base font-bold text-neutral-900 group-hover:text-[#8B0D1A] transition-colors leading-tight">
                  Container Transport
                </span>
                <span className="text-xs text-neutral-500 font-medium mt-1 leading-tight">
                  Port-to-Door Delivery
                </span>
              </div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#8B0D1A]/10 text-[#8B0D1A] group-hover:bg-[#8B0D1A] group-hover:text-white transition-all flex items-center justify-center flex-shrink-0 shadow-sm ml-2">
                <Box className="w-5 h-5" />
              </div>
            </div>

            {/* Card 4: Warehousing & Handling */}
            <div 
              onClick={() => { setActiveServiceIndex(3); scrollToSection('services-section'); }}
              className="bg-white border border-neutral-100 rounded-xl p-5 sm:p-6 shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:shadow-[0_22px_45px_rgba(139,13,26,0.12)] hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex items-start justify-between min-h-[105px] sm:min-h-[120px]"
            >
              <div className="flex flex-col justify-center">
                <span className="text-sm sm:text-base font-bold text-neutral-900 group-hover:text-[#8B0D1A] transition-colors leading-tight">
                  Warehousing &amp;
                </span>
                <span className="text-xs text-neutral-500 font-medium mt-1 leading-tight">
                  Handling Workflows
                </span>
              </div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#8B0D1A]/10 text-[#8B0D1A] group-hover:bg-[#8B0D1A] group-hover:text-white transition-all flex items-center justify-center flex-shrink-0 shadow-sm ml-2">
                <Warehouse className="w-5 h-5" />
              </div>
            </div>

          </div>
        </div>

        {/* ===================== FAINT WATERMARK TEXT: "MARVGLOBAL" ===================== */}
        <div className="absolute top-0 sm:top-1 md:top-2 left-0 right-0 overflow-hidden pointer-events-none select-none z-0 flex justify-center opacity-[0.03]">
          <span className="text-[32px] sm:text-[60px] md:text-[88px] lg:text-[118px] xl:text-[138px] font-black uppercase tracking-[0.14em] text-neutral-900 leading-none whitespace-nowrap">
            MARVGLOBAL
          </span>
        </div>

        {/* ===================== MAIN 2-COLUMN SECTION BODY ===================== */}
        <div className="w-full max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-10 pt-10 sm:pt-16 lg:pt-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* ----------------- LEFT SIDE: IMAGE COLLAGE & 25+ EXPERIENCE BADGE ----------------- */}
            <div className="lg:col-span-6 relative">
              <div className="relative max-w-lg mx-auto lg:max-w-none">
                
                {/* Top Image: Logistics workers and truck */}
                <div className="relative rounded-lg overflow-hidden shadow-xl border-4 border-white z-10 w-[78%] sm:w-[74%] ml-0">
                  <img
                    src="/images/workers.jpg"
                    alt="Leading logistics team inspecting cargo transport"
                    className="w-full h-56 sm:h-64 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Vertical Red Accent Bar (Next to top image as shown in design) */}
                <div className="absolute top-6 left-[80%] sm:left-[77%] w-2 sm:w-2.5 h-36 bg-[#8B0D1A] rounded-full z-10 shadow-sm" />

                {/* Bottom Right Image: Container Cargo Ship */}
                <div className="relative -mt-16 sm:-mt-20 ml-auto w-[68%] sm:w-[65%] rounded-lg overflow-hidden shadow-2xl border-4 border-white z-20">
                  <img
                    src="/images/cargoship.jpg"
                    alt="Aerial view of container cargo ship"
                    className="w-full h-52 sm:h-60 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Bottom Left Experience Badge: 25+ Years of experience */}
                <div className="absolute -bottom-4 sm:-bottom-6 left-2 sm:left-4 z-30 bg-[#8B0D1A] text-white p-4 sm:p-5 rounded-lg shadow-2xl flex flex-col justify-center items-start min-w-[145px] sm:min-w-[165px]">
                  {/* Badge Icon */}
                  <div className="mb-2">
                    <svg className="w-6 h-6 text-white stroke-[2.2]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <div className="text-3xl sm:text-4xl font-black leading-none tracking-tight">
                    25+
                  </div>
                  <div className="text-xs sm:text-[13px] font-bold tracking-tight text-white/95 mt-1 leading-tight">
                    Years of experience
                  </div>
                </div>

              </div>
            </div>

            {/* ----------------- RIGHT SIDE: TEXT CONTENT & ACTIONS ----------------- */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              
              {/* Tag / Pre-title */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#8B0D1A] text-xs font-black uppercase tracking-wider">
                  ABOUT MARVGLOBAL FREIGHT
                </span>
                <span className="text-neutral-400 text-xs font-semibold">
                  / WHO WE ARE
                </span>
              </div>

              {/* Main Section Headline */}
              <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-black text-neutral-900 leading-[1.15] tracking-tight uppercase">
                Moving more than cargo.
              </h2>

              {/* Description Paragraph from docx */}
              <p className="mt-4 text-xs sm:text-[13.5px] text-neutral-600 leading-relaxed max-w-xl font-normal">
                Marvglobal Freight is built around a simple belief: logistics should be easier to understand. Cargo moves through multiple stages, but the customer experience should feel connected from beginning to end.
              </p>

              {/* Bullet Checklist from docx messaging pillars */}
              <div className="mt-5 space-y-2.5">
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 w-4 h-4 rounded-full bg-[#8B0D1A]/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-[#8B0D1A] stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-[13px] font-semibold text-neutral-800">
                    <strong>Visibility:</strong> You should not have to chase updates. Your shipment journey is easy to understand.
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 w-4 h-4 rounded-full bg-[#8B0D1A]/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-[#8B0D1A] stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-[13px] font-semibold text-neutral-800">
                    <strong>Coordination:</strong> We bring people, places, vehicles, documents, and timing into one organized flow.
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 w-4 h-4 rounded-full bg-[#8B0D1A]/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-[#8B0D1A] stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-[13px] font-semibold text-neutral-800">
                    <strong>Accountability:</strong> Critical movement events are recorded, timestamped, and fully traceable.
                  </span>
                </div>
              </div>

              {/* Mini Highlight Card (Sunset Harbor Thumbnail & Text) */}
              <div className="mt-6 p-2.5 sm:p-3 bg-[#F5F2ED] border border-neutral-200/80 rounded-xl shadow-sm flex items-center gap-3.5 max-w-md hover:border-neutral-300 transition">
                <img
                  src="/images/harbor.jpg"
                  alt="Global logistic agency harbor"
                  className="w-18 h-12 sm:w-22 sm:h-14 rounded-lg object-cover flex-shrink-0 shadow-sm"
                />
                <div className="text-xs sm:text-[13px] font-bold text-neutral-900 leading-snug">
                  Moving freight with clarity, control, and confidence since{' '}
                  <span className="text-[#8B0D1A]">1998</span>
                </div>
              </div>

              {/* CTA Button and Signature Row */}
              <div className="mt-7 flex flex-wrap items-center gap-6 sm:gap-8">
                
                {/* REQUEST A QUOTE Button */}
                <button
                  onClick={() => scrollToSection('quote-section')}
                  className="bg-[#8B0D1A] hover:bg-[#A31222] text-white font-bold text-xs sm:text-[13px] px-6 py-3.5 rounded shadow-lg uppercase tracking-wider flex items-center gap-2 transition active:scale-95 cursor-pointer shadow-[#8B0D1A]/25"
                >
                  <span>REQUEST A QUOTE</span>
                  <ChevronsRight className="w-4 h-4 stroke-[3]" />
                </button>

                {/* Founder Signature Graphic */}
                <div className="flex items-center gap-3">
                  <svg className="h-9 w-28 text-neutral-800" viewBox="0 0 160 48" fill="none">
                    <path
                      d="M10 32 C25 15, 35 10, 48 24 C55 32, 60 12, 70 18 C78 24, 82 38, 92 28 C102 18, 110 32, 125 22 C135 16, 142 30, 150 25"
                      stroke="#1e293b"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />
                    <path
                      d="M20 40 C45 35, 80 34, 130 38"
                      stroke="#8B0D1A"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="flex flex-col leading-tight border-l border-neutral-200 pl-3">
                    <span className="text-[11px] font-black text-neutral-900">Johnathan Doe</span>
                    <span className="text-[10px] text-neutral-500 font-medium">Founder &amp; CEO</span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

        {/* ===================== FLOATING FORKLIFT ACCENT (BOTTOM-RIGHT) ===================== */}
        <div className="absolute -bottom-2 sm:bottom-0 right-2 sm:right-6 pointer-events-none select-none z-20 w-44 sm:w-56 md:w-64 opacity-95">
          <svg viewBox="0 0 260 180" fill="none" className="w-full h-auto drop-shadow-2xl">
            {/* Shadow under forklift */}
            <ellipse cx="140" cy="165" rx="100" ry="10" fill="rgba(0,0,0,0.18)" />

            {/* Forklift Body */}
            {/* Rear Counterweight (Dark Gray) */}
            <path d="M 210,135 Q 230,135 235,115 L 235,90 Q 230,75 210,75 L 180,75 L 180,135 Z" fill="#262626" />
            
            {/* Main Chassis (Yellow) */}
            <path d="M 115,135 L 210,135 L 210,95 L 155,95 L 155,105 L 115,105 Z" fill="#F59E0B" />
            <path d="M 120,105 L 175,105 L 185,75 L 155,75 Z" fill="#D97706" />

            {/* Driver Roll Cage (Black Bars) */}
            <path d="M 175,75 L 175,25 L 135,25 L 125,75" stroke="#171717" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M 135,25 L 175,25" stroke="#171717" strokeWidth="5" />
            <path d="M 145,45 L 175,45" stroke="#171717" strokeWidth="3" />

            {/* Steering Wheel & Seat */}
            <path d="M 148,60 L 140,50" stroke="#171717" strokeWidth="3.5" />
            <circle cx="138" cy="48" r="5" stroke="#171717" strokeWidth="2.5" />
            <path d="M 165,75 L 165,55 L 155,55" stroke="#404040" strokeWidth="4" />

            {/* Front Wheels (Black rubber with yellow hub) */}
            <circle cx="105" cy="145" r="22" fill="#171717" />
            <circle cx="105" cy="145" r="13" fill="#525252" />
            <circle cx="105" cy="145" r="8" fill="#F59E0B" />

            {/* Rear Wheels */}
            <circle cx="210" cy="148" r="18" fill="#171717" />
            <circle cx="210" cy="148" r="10" fill="#525252" />
            <circle cx="210" cy="148" r="6" fill="#F59E0B" />

            {/* Fork Mast (Vertical Rails) */}
            <rect x="75" y="10" width="7" height="135" fill="#404040" />
            <rect x="85" y="10" width="7" height="135" fill="#262626" />
            <rect x="70" y="25" width="25" height="6" fill="#171717" />
            <rect x="70" y="65" width="25" height="6" fill="#171717" />
            <rect x="70" y="105" width="25" height="6" fill="#171717" />

            {/* Metal Forks (L-shape extending forward) */}
            <path d="M 75,135 L 45,135 L 5,135 L 5,139 L 55,139 L 75,137 Z" fill="#737373" />

            {/* Wooden Pallet */}
            <rect x="8" y="123" width="62" height="10" rx="1.5" fill="#B45309" />
            <rect x="12" y="128" width="8" height="5" fill="#78350F" />
            <rect x="35" y="128" width="8" height="5" fill="#78350F" />
            <rect x="58" y="128" width="8" height="5" fill="#78350F" />

            {/* Bottom Cardboard Box */}
            <rect x="10" y="75" width="58" height="48" rx="2" fill="#D97706" />
            <rect x="12" y="77" width="54" height="44" rx="1" fill="#FBBF24" />
            {/* Box Tape & Details */}
            <rect x="35" y="77" width="8" height="44" fill="#B45309" opacity="0.6" />
            <path d="M 20,85 L 28,85 M 20,90 L 25,90" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
            {/* Recycle / Fragile symbol on box */}
            <circle cx="48" cy="98" r="6" stroke="#78350F" strokeWidth="1.5" fill="none" />
            <path d="M 46,96 L 48,93 L 50,96 M 51,99 L 52,101 L 49,101" stroke="#78350F" strokeWidth="1.2" strokeLinecap="round" />

            {/* Top Cardboard Box */}
            <rect x="14" y="30" width="50" height="45" rx="2" fill="#D97706" />
            <rect x="16" y="32" width="46" height="41" rx="1" fill="#FDE68A" />
            <rect x="37" y="32" width="7" height="41" fill="#B45309" opacity="0.6" />
            <path d="M 22,40 L 30,40 M 22,44 L 26,44" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />
            {/* Fragile Glass icon on top box */}
            <path d="M 46,45 L 50,45 L 49,52 L 47,52 Z M 48,52 L 48,56 M 46,56 L 50,56" stroke="#78350F" strokeWidth="1.2" />
          </svg>
        </div>

      </section>

      {/* ===================== SECTION 3A: SERVICES / WHAT WE DO ===================== */}
      {/* REDESIGNED WITH PHOTOGRAPHIC HARBOR BACKDROP, DARK CRIMSON OVERLAY, AND INTERACTIVE CAPABILITY INSPECTOR */}
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
            desc: 'Coordinate container movement from port handling through inland delivery with precision timing.',
            icon: Box,
            tag: 'Intermodal Logistics',
            leadTime: 'Same Day - 48 Hours',
            highlights: [
              'Chassis & trailer dispatch at all major commercial ports',
              'Demurrage and detention risk minimization protocols',
              'Inland rail ramps and direct intermodal connections',
              'Automated container gate-in and gate-out timestamping'
            ],
            specs: {
              containerOptions: 'Standard Dry 20ft / 40ft, Open Top, Tank Containers, Platform Flat',
              maxPayload: 'Up to 30,480 kg gross max mass',
              routes: 'Major Deep-Water Seaport Hubs to Inland Depots',
              compliance: 'ISO 6346 Container Code Identification, Customs Seal Inspection'
            },
            milestones: [
              { stage: 'Terminal Pickup Order', eta: 'Stage 01', desc: 'Vessel discharge confirmation & pin release received' },
              { stage: 'Port Gate-Out & Chassis Hook', eta: 'Stage 02', desc: 'Interchange receipt (EIR) recorded & verified' },
              { stage: 'Intermodal Highway/Rail Run', eta: 'Stage 03', desc: 'Direct transit to inland bonded container freight station' },
              { stage: 'Destuffing & Empty Return', eta: 'Stage 04', desc: 'Consignee destuffing, empty box returned to depot' },
            ]
          },
          {
            id: 'warehousing',
            title: 'Warehousing & Handling',
            subtitle: 'Secure Storage & Fulfillment Hubs',
            desc: 'Keep cargo organized through receiving, handling, storage, and dispatch workflows with full inventory visibility.',
            icon: Warehouse,
            tag: 'Bonded & Climate-Controlled',
            leadTime: 'On Demand 24/7',
            highlights: [
              'Regulated receiving, barcode tagging, and intake quality checks',
              'Controlled pallet, bulk, and high-density racking facilities',
              'Cross-docking and multi-order consolidation services',
              'Pick, pack, label, and direct dispatch coordination'
            ],
            specs: {
              containerOptions: 'High-Bay Pallet Racks, Bulk Staging, Temperature Zones (15-25°C, 2-8°C)',
              maxPayload: 'Floor load capacity: 5,000 kg/m²',
              routes: 'Strategic Gateway Warehouses near Top Sea & Air Terminals',
              compliance: 'AEO Certified, ISO 9001, CCTV Monitored, Fire Suppression NFPA-13'
            },
            milestones: [
              { stage: 'Inbound Ingest & Scanned', eta: '0 - 2 Hours', desc: 'Receipt verification against manifest packing list' },
              { stage: 'Inventory Location Allocation', eta: '4 Hours', desc: 'WMS slotting into secure monitored rack coordinates' },
              { stage: 'Order Fulfillment & Pick', eta: 'On Demand', desc: 'Automated picking list, outer export packaging' },
              { stage: 'Dispatch Staging & Outbound', eta: 'Scheduled', desc: 'Outbound truck loaded with stamped dispatch note' },
            ]
          },
          {
            id: 'coordination',
            title: 'Freight Coordination',
            subtitle: 'End-to-End Operational Control',
            desc: 'Bring shipment details, movement milestones, documents, and delivery events into one organized flow.',
            icon: FileText,
            tag: 'Operational Transparency',
            leadTime: 'Live Active SLA',
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
                        triggerToast(`Inspecting ${svc.title} capabilities`);
                      }}
                      className={`rounded-2xl p-4 sm:p-5 border transition-all duration-300 flex flex-col items-center justify-between text-center cursor-pointer group relative overflow-hidden min-h-[145px] sm:min-h-[160px] ${
                        isSelected
                          ? 'bg-[#8B0D1A] text-white border-[#8B0D1A] shadow-xl shadow-red-950/20 -translate-y-2'
                          : 'bg-[#F5F2ED] border-neutral-200/90 text-neutral-900 hover:border-[#8B0D1A] hover:bg-white hover:shadow-lg hover:-translate-y-1'
                      }`}
                    >
                      {/* Top Crimson Accent Ribbon */}
                      <div className={`absolute top-0 inset-x-0 h-1 bg-[#8B0D1A] transition-transform duration-300 origin-center ${
                        isSelected ? 'bg-white scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`} />

                      {/* Selected Badge */}
                      {isSelected && (
                        <div className="absolute top-2.5 right-2.5 flex items-center">
                          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        </div>
                      )}

                      {/* Icon Container */}
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        isSelected
                          ? 'bg-white text-[#8B0D1A] shadow-md scale-105'
                          : 'bg-white border border-neutral-200 text-[#8B0D1A] group-hover:bg-[#8B0D1A] group-hover:text-white group-hover:scale-105 shadow-sm'
                      }`}>
                        <svc.icon className="w-6 h-6 stroke-[2]" />
                      </div>

                      {/* Card Title */}
                      <div className="mt-3">
                        <h3 className={`text-xs sm:text-[13px] font-bold transition-colors leading-tight ${
                          isSelected ? 'text-white' : 'text-neutral-900 group-hover:text-[#8B0D1A]'
                        }`}>
                          {svc.title}
                        </h3>
                        <span className={`text-[10px] font-medium block mt-1 line-clamp-1 ${
                          isSelected ? 'text-white/80' : 'text-neutral-500'
                        }`}>
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
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                        calcServiceTab === 'calculator'
                          ? 'bg-[#8B0D1A] text-white shadow-sm'
                          : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                      }`}
                    >
                      <Calculator className="w-3.5 h-3.5" />
                      <span>Rate &amp; Transit Estimator</span>
                    </button>

                    <button
                      onClick={() => setCalcServiceTab('specs')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                        calcServiceTab === 'specs'
                          ? 'bg-[#8B0D1A] text-white shadow-sm'
                          : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                      }`}
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Specifications</span>
                    </button>

                    <button
                      onClick={() => setCalcServiceTab('milestones')}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                        calcServiceTab === 'milestones'
                          ? 'bg-[#8B0D1A] text-white shadow-sm'
                          : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                      }`}
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
                              className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                                calcContainerType === c.id
                                  ? 'bg-white border-[#8B0D1A] text-[#8B0D1A] ring-2 ring-[#8B0D1A]/20 shadow-md'
                                  : 'bg-white/80 border-neutral-200 text-neutral-700 hover:border-neutral-300'
                              }`}
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
                            ${estimatedQuoteTotal.toLocaleString()} <span className="text-xs font-normal text-neutral-500">USD</span>
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => {
                            setQuoteFormData({
                              ...quoteFormData,
                              subject: `${activeService.title} Quote Request`,
                              message: `Inquiry for ${activeService.title} from ${calcOrigin} to ${calcDestination} with ${calcWeight} kg in ${calcContainerType} container.`,
                            });
                            scrollToSection('quote-section');
                            triggerToast(`Route pre-filled into Quote form below!`);
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

      {/* ===================== SECTION 3B: WHY CHOOSE US / PROACTIVE PROJECTS ===================== */}
      <section id="why-choose-us-section" className="relative overflow-hidden bg-neutral-950 py-16 sm:py-20 lg:py-24 text-white border-b border-neutral-800">
        
        {/* Right Background: Cinematic Red Truck Backdrop */}
        <div
          className="absolute inset-y-0 right-0 w-full lg:w-3/5 bg-cover bg-center object-cover opacity-75 mix-blend-luminosity lg:mix-blend-normal"
          style={{ backgroundImage: "url('/images/red_truck_cinematic.jpg')" }}
        />

        {/* Cinematic Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/90 to-neutral-950/30 z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/50 z-0" />

        {/* Dynamic Angled Red Design Ribbons (Chevrons as in sample) */}
        <div className="absolute -top-10 right-1/4 sm:right-1/3 w-28 sm:w-44 h-[125%] bg-[#8B0D1A] -skew-x-[22deg] opacity-85 z-0 shadow-[0_0_50px_rgba(230,0,0,0.35)] pointer-events-none transform origin-top" />
        <div className="absolute -top-10 right-[28%] sm:right-[38%] w-8 sm:w-12 h-[125%] bg-[#720A15] -skew-x-[22deg] opacity-75 z-0 pointer-events-none transform origin-top" />

        <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14">
            
            {/* Left Content Column */}
            <div className="w-full lg:max-w-xl">
              
              {/* Tag */}
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8B0D1A] animate-pulse"></span>
                <span className="text-[#8B0D1A] font-bold text-xs sm:text-[13px] tracking-widest uppercase">
                  WHY CHOOSE US
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-white leading-tight mb-4">
                A clearer way to move freight.
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed mb-8">
                From local hauling to intermodal global container corridors, our operations are designed around four foundational commitments.
              </p>

              {/* Dark Glassmorphic Feature Card with 4 Official Commitments */}
              <div className="bg-neutral-900/90 backdrop-blur-md border border-neutral-800/90 rounded-2xl p-5 shadow-2xl space-y-3.5">
                {[
                  {
                    title: 'Visibility',
                    desc: 'You should not have to chase updates. Your shipment journey should be easy to understand.',
                  },
                  {
                    title: 'Coordination',
                    desc: 'Every shipment involves people, places, vehicles, documents, and timing. We bring the journey together.',
                  },
                  {
                    title: 'Accountability',
                    desc: 'Important movement events should be recorded, timestamped, and traceable.',
                  },
                  {
                    title: 'Customer-first communication',
                    desc: 'Clear updates help businesses plan their next operational move with confidence.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 group">
                    <div className="w-5 h-5 rounded-full bg-[#8B0D1A] flex items-center justify-center flex-shrink-0 text-white shadow-md shadow-red-950/40 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <div>
                      <span className="text-xs sm:text-[13px] font-bold text-white block">
                        {item.title}
                      </span>
                      <p className="text-[11px] text-neutral-300 leading-relaxed mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Side: Interactive Cursive "Watch Video" with doodle arrow + Circular Play Button */}
            <div className="flex items-center gap-3 sm:gap-5 self-center lg:self-center mr-0 lg:mr-12">
              
              {/* Handwritten "Watch Video" Cursive text & Curvy Arrow */}
              <div className="flex flex-col items-end pointer-events-none select-none">
                <svg viewBox="0 0 135 60" className="w-28 sm:w-36 h-auto drop-shadow-lg">
                  <text
                    x="25"
                    y="24"
                    fill="#ffffff"
                    fontFamily="'Brush Script MT', 'Caveat', cursive, sans-serif"
                    fontSize="21"
                    fontStyle="italic"
                    fontWeight="bold"
                  >
                    Watch Video
                  </text>
                  <path
                    d="M 68 30 C 78 44, 95 48, 115 40 C 120 37, 122 34, 126 28"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 117 25 L 127 27 L 124 37"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Glowing Circular White Play Button */}
              <button
                onClick={() => setShowWatchVideoModal(true)}
                className="group relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white shadow-[0_0_40px_rgba(255,255,255,0.45)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer flex-shrink-0"
                aria-label="Play logistics video"
              >
                <span className="absolute inset-0 rounded-full bg-white/40 animate-ping opacity-60"></span>
                <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
                  <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-[#8B0D1A] text-[#8B0D1A] ml-1 group-hover:scale-110 transition-transform" />
                </div>
              </button>

            </div>

          </div>
        </div>

      </section>

      {/* ===================== SECTION 4: LATEST PROJECTS SHOWCASE ===================== */}
      {(() => {
        const projects = [
          {
            title: 'Shipment Tracking',
            category: 'Maritime',
            image: '/images/cargoship.jpg',
          },
          {
            title: 'Road & Inland Freight',
            category: 'Transport',
            image: '/images/red_truck_cinematic.jpg',
          },
          {
            title: 'Air Freight Solution',
            category: 'Air Freight',
            image: '/images/air_freight.jpg',
          },
          {
            title: 'Security For Cargo',
            category: 'Express',
            image: '/images/truck_cargo.jpg',
          },
          {
            title: 'Warehouse Inventory',
            category: 'Storage',
            image: '/images/warehouse_inventory.jpg',
          },
        ];

        return (
          <section id="projects-section" className="relative bg-white py-16 sm:py-24 text-neutral-900 border-b border-neutral-100 overflow-hidden">
            <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Section Header */}
              <div className="text-center mb-12 sm:mb-16">
                <div className="inline-flex flex-col items-center mb-3">
                  <span className="text-[#8B0D1A] font-extrabold text-[11px] tracking-[0.25em] uppercase">
                    LATEST PROJECT
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="w-5 h-0.5 bg-[#8B0D1A]"></span>
                    <span className="text-[#8B0D1A] font-bold text-xs sm:text-[13px] tracking-wider uppercase">
                      WHAT WE DO
                    </span>
                    <span className="w-5 h-0.5 bg-[#8B0D1A]"></span>
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight max-w-2xl mx-auto leading-tight">
                  Years of shipping excellence that spans
                </h2>
              </div>

              {/* 5 Vertical Project Showcase Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
                {projects.map((proj, idx) => (
                  <div
                    key={idx}
                    onClick={() => setShowLearnMoreModal(true)}
                    className="group relative h-[380px] sm:h-[430px] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
                  >
                    {/* Background Image with Zoom */}
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent transition-opacity" />

                    {/* Bottom Pill Card */}
                    <div className="absolute bottom-4 inset-x-4">
                      {/* Attached Red Category Tag */}
                      <span className="inline-block bg-[#8B0D1A] text-white text-[10px] font-bold px-3 py-1 rounded-t-md uppercase tracking-wider shadow-sm">
                        {proj.category}
                      </span>

                      {/* White Container */}
                      <div className="bg-white/95 backdrop-blur-md rounded-xl rounded-tl-none p-3.5 flex items-center justify-between shadow-xl">
                        <span className="text-xs sm:text-[13px] font-bold text-neutral-900 group-hover:text-[#8B0D1A] transition-colors leading-tight">
                          {proj.title}
                        </span>
                        <div className="w-7 h-7 rounded-lg bg-neutral-100 group-hover:bg-[#8B0D1A] group-hover:text-white flex items-center justify-center text-neutral-600 transition-colors flex-shrink-0 ml-2">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          </section>
        );
      })()}

      {/* ===================== SECTION 5: 6-STAGE PROCESS JOURNEY ===================== */}
      {/* REBUILT WITH THE OFFICIAL 6-STAGE SHIPMENT PROCESS FROM BRAND FRAMEWORK & INTERACTIVE CONTROLS */}
      {(() => {
        const processSteps = [
          {
            num: '01',
            title: 'Request',
            subtitle: 'Initiate Logistics Requirement',
            desc: 'Tell us what needs to move, where it is going, and when it needs to arrive.',
            icon: FileText,
            checklist: [
              'Origin, destination & transit deadline specified',
              'Cargo dimensions, weight & container category selected',
              'Special handling protocols identified (Reefer, Hazardous, High Value)',
            ],
            telemetry: 'Instant automated rate estimation & route planning generated',
          },
          {
            num: '02',
            title: 'Confirm',
            subtitle: 'Review & Commercial Approval',
            desc: 'Review the shipment details, pricing, and planned movement.',
            icon: CheckCircle2,
            checklist: [
              'Customs brokerage & documentation requirements aligned',
              'Carrier allocation & guaranteed transit schedule locked',
              'Clear SLA milestones & single coordinator assigned',
            ],
            telemetry: 'Booking reference & electronic Waybill/BOL issued to client portal',
          },
          {
            num: '03',
            title: 'Collect',
            subtitle: 'First-Mile Intake & Cargo Prep',
            desc: 'Cargo is received and prepared for its next stage.',
            icon: Package,
            checklist: [
              'First-mile drayage pickup from shipper facility',
              'Barcode labeling, piece-count verification & security seals',
              'Container loading, stuffing & weighbridge gross mass check',
            ],
            telemetry: 'Custody transfer timestamped; gate-in scan verified at terminal',
          },
          {
            num: '04',
            title: 'Move',
            subtitle: 'Active Transit Corridors',
            desc: 'The shipment begins its journey through the planned logistics route.',
            icon: Truck,
            checklist: [
              'Vessel ocean departure or highway convoy dispatch',
              'Cross-border customs transit declarations cleared',
              'Intermodal rail/chassis handshake executed on schedule',
            ],
            telemetry: 'Active transit corridor engaged; satellite telemetry broadcasting',
          },
          {
            num: '05',
            title: 'Track',
            subtitle: 'Digital Live Visibility',
            desc: 'Follow available shipment events and movement updates in real-time.',
            icon: Globe2,
            checklist: [
              'Public tracking-number lookup accessible 24/7 without login',
              'Real-time GPS coordinates, speed & temperature monitoring',
              'Automated proactive event notifications & ETA recalculation',
            ],
            telemetry: 'Live telemetry updates delivered every 10 seconds to customer',
          },
          {
            num: '06',
            title: 'Deliver',
            subtitle: 'Final-Mile Handover & POD',
            desc: 'Cargo reaches its destination and delivery is recorded.',
            icon: ShieldCheck,
            checklist: [
              'Final-mile dispatch to consignee receiving dock',
              'Cargo inspection & tamper-evident seal verification',
              'Digital Proof of Delivery (POD) signature & photographic log',
            ],
            telemetry: 'Delivery recorded; digital POD archived in customer portal',
          },
        ];

        const currentStep = processSteps[activeProcessStep] || processSteps[0];

        return (
          <section id="process-section" className="relative overflow-hidden bg-[#0B0B0B] py-20 sm:py-24 lg:py-28 text-white border-b border-neutral-800">
            
            {/* Ambient Background Scrim with Subtle Crimson Shimmer */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(139,13,26,0.18),transparent)] pointer-events-none" />
            <div className="absolute -top-24 right-1/4 w-96 h-96 bg-[#8B0D1A]/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              
              {/* Section Header */}
              <div className="text-center mb-12 sm:mb-16">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8B0D1A]/20 border border-[#8B0D1A]/40 mb-3 shadow-[0_0_20px_rgba(139,13,26,0.25)]">
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
                </p>
              </div>

              {/* 6-Stage Interactive Stepper Header Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 mb-8">
                {processSteps.map((step, idx) => {
                  const isActive = activeProcessStep === idx;
                  const isCompleted = activeProcessStep > idx;
                  return (
                    <button
                      key={step.num}
                      type="button"
                      onClick={() => {
                        setActiveProcessStep(idx);
                        triggerToast(`Viewing Stage ${step.num}: ${step.title}`);
                      }}
                      className={`p-3 sm:p-3.5 rounded-2xl border text-left transition-all duration-300 relative cursor-pointer group ${
                        isActive
                          ? 'bg-[#8B0D1A] border-[#8B0D1A] text-white shadow-[0_0_25px_rgba(139,13,26,0.45)] -translate-y-1'
                          : isCompleted
                          ? 'bg-neutral-900/90 border-neutral-700/80 text-neutral-300 hover:border-[#8B0D1A]/50'
                          : 'bg-neutral-950/80 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                          isActive
                            ? 'bg-black/40 text-white'
                            : isCompleted
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-neutral-800 text-neutral-400'
                        }`}>
                          {isCompleted ? '✓ Done' : step.num}
                        </span>
                        <step.icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-neutral-400 group-hover:text-white'}`} />
                      </div>
                      <div className="font-bold text-xs sm:text-[13px] leading-tight block">
                        {step.title}
                      </div>
                      <span className={`text-[10px] block mt-0.5 line-clamp-1 ${
                        isActive ? 'text-white/80' : 'text-neutral-400'
                      }`}>
                        {step.subtitle}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Progress Line */}
              <div className="w-full bg-neutral-900 h-1.5 rounded-full overflow-hidden mb-8 max-w-4xl mx-auto">
                <div 
                  className="bg-gradient-to-r from-[#8B0D1A] via-[#A31222] to-emerald-400 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${((activeProcessStep + 1) / 6) * 100}%` }}
                />
              </div>

              {/* Active Step Detailed Stage Console */}
              <div className="bg-neutral-900/90 backdrop-blur-md border border-neutral-800 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden max-w-4xl mx-auto">
                {/* Background watermarked stage number */}
                <div className="absolute right-4 bottom-0 text-[120px] font-black text-neutral-800/30 select-none pointer-events-none leading-none">
                  {currentStep.num}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
                  
                  {/* Left Column: Stage Info */}
                  <div className="md:col-span-7 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#8B0D1A] text-white flex items-center justify-center shadow-lg shadow-[#8B0D1A]/40 flex-shrink-0">
                        <currentStep.icon className="w-6 h-6 stroke-[2.2]" />
                      </div>
                      <div>
                        <div className="text-[11px] font-black uppercase tracking-widest text-[#8B0D1A]">
                          STAGE {currentStep.num} OF 06
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                          {currentStep.title} — {currentStep.subtitle}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-normal">
                      {currentStep.desc}
                    </p>

                    {/* Operational Checklist */}
                    <div className="space-y-2.5 pt-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                        Mandatory Operational Gates
                      </span>
                      {currentStep.checklist.map((item, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                          <span className="text-xs text-neutral-200 font-medium leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Telemetry Box & Controls */}
                  <div className="md:col-span-5 bg-black/60 border border-neutral-800 rounded-2xl p-5 sm:p-6 flex flex-col justify-between h-full space-y-5">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-3 pb-2 border-b border-neutral-800">
                        <span className="text-neutral-400 font-semibold">Active Telemetry</span>
                        <span className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          Live Node
                        </span>
                      </div>
                      <p className="text-xs text-neutral-300 leading-relaxed bg-neutral-900/80 p-3 rounded-xl border border-neutral-800 font-mono text-[11px]">
                        &gt; {currentStep.telemetry}
                      </p>
                    </div>

                    {/* Interactive Step Navigator */}
                    <div className="flex items-center justify-between gap-3 pt-2">
                      <button
                        type="button"
                        disabled={activeProcessStep === 0}
                        onClick={() => setActiveProcessStep((prev) => Math.max(0, prev - 1))}
                        className="px-3.5 py-2 rounded-xl text-xs font-bold border border-neutral-700 hover:border-neutral-500 text-neutral-300 disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer"
                      >
                        ← Previous
                      </button>

                      <button
                        type="button"
                        disabled={activeProcessStep === 5}
                        onClick={() => setActiveProcessStep((prev) => Math.min(5, prev + 1))}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-[#8B0D1A] hover:bg-[#A31222] text-white disabled:opacity-40 disabled:pointer-events-none transition cursor-pointer shadow-md shadow-[#8B0D1A]/30 flex items-center gap-1.5"
                      >
                        <span>Next Stage</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>

                </div>
              </div>

            </div>
          </section>
        );
      })()}

      {/* ===================== SECTION 6: OUR LEGACY & VISION TABS ===================== */}
      <section id="legacy-section" className="relative bg-white py-16 sm:py-24 text-neutral-900 border-b border-neutral-100 overflow-hidden">
        <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Image with Red Badge & Video Play Button */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/red_truck_cinematic.jpg"
                  alt="Red freight logistics transport truck"
                  className="w-full h-80 sm:h-96 object-cover"
                />

                {/* Floating Red Trade Compliance Badge with Play Button */}
                <div className="absolute bottom-4 right-4 left-4 sm:left-auto sm:w-64 bg-[#8B0D1A] rounded-xl p-4 text-white shadow-xl flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider block opacity-90">Specialized Fleet</span>
                    <span className="text-xs font-bold leading-tight block">Highly specialized, Trade Compliance Team</span>
                  </div>

                  <button
                    onClick={() => setShowWatchVideoModal(true)}
                    className="w-11 h-11 rounded-full bg-white text-[#8B0D1A] flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-transform flex-shrink-0 cursor-pointer"
                    aria-label="Play compliance team video"
                  >
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </button>
                </div>
              </div>

              {/* Sub-bullets below image */}
              <div className="flex flex-wrap items-center gap-6 mt-5 text-xs font-bold text-neutral-700">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#8B0D1A] stroke-[3]" />
                  <span>Our missions are trusted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#8B0D1A] stroke-[3]" />
                  <span>Supply Chain Solutions</span>
                </div>
              </div>
            </div>

            {/* Right Column: Copy, Tabs, Quote Callout, Features */}
            <div className="lg:col-span-7">
              
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8B0D1A]"></span>
                  <span className="text-[#8B0D1A] font-bold text-xs sm:text-[13px] tracking-widest uppercase">
                    OUR LEGACY
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 leading-tight">
                  Moving more than cargo.
                </h2>
              </div>

              {/* Tab Switcher */}
              <div className="flex gap-2 p-1 bg-neutral-100 rounded-xl mb-5 max-w-md">
                {(['vision', 'history', 'philosophy'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setLegacyTab(tab)}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition capitalize cursor-pointer ${
                      legacyTab === tab
                        ? 'bg-neutral-900 text-white shadow-sm'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    Our {tab}
                  </button>
                ))}
              </div>

              {/* Dynamic Tab Content */}
              <div className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-5 min-h-[48px]">
                {legacyTab === 'vision' && (
                  <p>
                    <strong className="text-neutral-900 block mb-1">Vision Statement:</strong>
                    To build a logistics experience where moving goods is as clear digitally as it is physically. Wherever the shipment is in its journey, the next step should be clear.
                  </p>
                )}
                {legacyTab === 'history' && (
                  <p>
                    <strong className="text-neutral-900 block mb-1">Our Mission:</strong>
                    To make freight movement more connected, visible, and dependable for the businesses and people who rely on it across regional and global trade routes.
                  </p>
                )}
                {legacyTab === 'philosophy' && (
                  <p>
                    <strong className="text-neutral-900 block mb-1">Brand Promise:</strong>
                    From origin to destination, every movement matters. Moving freight with clarity, control, and confidence.
                  </p>
                )}
              </div>

              {/* Quote Highlight Box */}
              <div className="border-l-4 border-[#8B0D1A] bg-[#F5F2ED] p-4 rounded-r-xl mb-6 text-xs sm:text-[13px] font-semibold text-neutral-800 italic leading-relaxed">
                &ldquo;Move with confidence. Know where it is. Know what happens next.&rdquo;
                <span className="block not-italic font-bold text-[11px] text-[#8B0D1A] mt-1 uppercase tracking-wider">
                  — Marvglobal Freight Core Brand Foundation
                </span>
              </div>

              {/* Feature Badges & CTA Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-2">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-[#8B0D1A] flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div className="text-xs font-bold text-neutral-900 leading-tight">
                      Certified &amp; Awards<br />Winner
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-[#8B0D1A] flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div className="text-xs font-bold text-neutral-900 leading-tight">
                      Professional<br />Solutions
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowGetStartedModal(true)}
                  className="bg-[#8B0D1A] hover:bg-[#720A15] text-white font-bold text-xs sm:text-[13px] px-6 py-3.5 rounded shadow-lg uppercase tracking-wider flex items-center gap-2 transition active:scale-95 cursor-pointer whitespace-nowrap self-start sm:self-auto"
                >
                  <span>REQUEST A QUOTE</span>
                  <ChevronsRight className="w-4 h-4 stroke-[3]" />
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ===================== SECTION 7: RED STATISTICS COUNTER BANNER ===================== */}
      <section id="stats-section" className="bg-[#8B0D1A] py-12 sm:py-16 text-white relative overflow-hidden shadow-xl">
        {/* Diagonal Stripe Texture */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0.06)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.06)_50%,rgba(0,0,0,0.06)_75%,transparent_75%,transparent)] bg-[length:32px_32px] opacity-40 pointer-events-none" />

        <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            
            {/* Stat 1 */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-3">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-1">
                541+
              </div>
              <div className="text-xs sm:text-sm font-semibold text-white/90 uppercase tracking-wider">
                Completed Projects
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-3">
                <Globe2 className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-1">
                35+
              </div>
              <div className="text-xs sm:text-sm font-semibold text-white/90 uppercase tracking-wider">
                Countries Covered
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-3">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-1">
                147+
              </div>
              <div className="text-xs sm:text-sm font-semibold text-white/90 uppercase tracking-wider">
                Professional Solutions
              </div>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-3">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-1">
                25+
              </div>
              <div className="text-xs sm:text-sm font-semibold text-white/90 uppercase tracking-wider">
                Years Of Experience
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===================== SECTION 8: OUR TEAM ===================== */}
      {(() => {
        const teamMembers = [
          {
            name: 'Alex Donald',
            role: 'Logistics Coordinator',
            image: '/images/team1.jpg',
          },
          {
            name: 'Jasper Clarke',
            role: 'Fleet Manager',
            image: '/images/team2.jpg',
          },
          {
            name: 'Evan Reid',
            role: 'Operations Supervisor',
            image: '/images/team3.jpg',
          },
          {
            name: 'Maxwell Hayes',
            role: 'Transportation Expert',
            image: '/images/team4.jpg',
          },
        ];

        return (
          <section id="team-section" className="relative bg-neutral-50/80 py-16 sm:py-24 text-neutral-900 border-b border-neutral-200/80 overflow-hidden">
            
            {/* Subtle Modern Container Watermark */}
            <div className="absolute right-0 bottom-0 translate-x-12 sm:translate-x-6 w-80 sm:w-96 lg:w-[480px] pointer-events-none select-none opacity-10 z-0">
              <Package className="w-full h-auto text-neutral-900 stroke-[0.8]" />
            </div>

            <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              
              {/* Header */}
              <div className="text-center mb-12 sm:mb-16">
                <div className="inline-flex flex-col items-center mb-3">
                  <span className="text-[#8B0D1A] font-extrabold text-[11px] tracking-[0.25em] uppercase">
                    OUR TEAM
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="w-5 h-0.5 bg-[#8B0D1A]"></span>
                    <span className="text-[#8B0D1A] font-bold text-xs sm:text-[13px] tracking-wider uppercase">
                      LOGISTICS EXPERTS
                    </span>
                    <span className="w-5 h-0.5 bg-[#8B0D1A]"></span>
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight">
                  Meet our most experienced team members
                </h2>
              </div>

              {/* 4 Team Member Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {teamMembers.map((member, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg border border-neutral-100 group transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl relative"
                  >
                    {/* Portrait Photo */}
                    <div className="h-64 sm:h-72 w-full overflow-hidden relative">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Floating Red '+' Action Button */}
                      <button
                        onClick={() => setSelectedMember(selectedMember === member.name ? null : member.name)}
                        className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-[#8B0D1A] text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                        aria-label={`View contact info for ${member.name}`}
                      >
                        <Plus className="w-4 h-4 stroke-[3]" />
                      </button>

                      {/* Interactive Social Popover */}
                      {selectedMember === member.name && (
                        <div className="absolute inset-x-3 bottom-14 bg-black/90 backdrop-blur-md rounded-xl p-2.5 text-white flex items-center justify-around text-xs animate-in fade-in duration-150">
                          <button onClick={() => alert(`Calling ${member.name}`)} className="hover:text-[#8B0D1A] transition cursor-pointer">
                            <Phone className="w-4 h-4" />
                          </button>
                          <button onClick={() => alert(`Emailing ${member.name}`)} className="hover:text-[#8B0D1A] transition cursor-pointer">
                            <Mail className="w-4 h-4" />
                          </button>
                          <button onClick={() => alert(`Visiting LinkedIn for ${member.name}`)} className="hover:text-[#8B0D1A] transition cursor-pointer">
                            <Linkedin className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Member Details */}
                    <div className="p-4 text-center">
                      <h3 className="text-sm font-bold text-neutral-900 group-hover:text-[#8B0D1A] transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-[11px] text-neutral-500 font-medium mt-0.5">
                        {member.role}
                      </p>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          </section>
        );
      })()}

      {/* ===================== SECTION 9: OPERATIONS OVERVIEW & CUSTOMER FLEET PORTAL ===================== */}
      {/* BASED ON DOCX SECTION 9 & 10: "MONITOR SHIPMENTS, MOVEMENT, AND DELIVERY ACTIVITY FROM ONE PLACE" */}
      {(() => {
        const opsShipments = [
          {
            id: 'MGF-2026-000184',
            route: 'Rotterdam (NLD) → Chicago (USA)',
            service: 'Ocean Freight (FCL)',
            status: 'in_transit',
            statusLabel: 'In Transit',
            statusColor: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
            vessel: 'Marvglobal Pacific Express IV',
            eta: 'Oct 14, 2026',
            progress: 68,
            cargo: '40ft High Cube Container (21,400 kg)',
          },
          {
            id: 'MGF-2026-000892',
            route: 'Hamburg (DEU) → Antwerp (BEL)',
            service: 'Road Intermodal Freight',
            status: 'out_for_delivery',
            statusLabel: 'Out for Delivery',
            statusColor: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
            vessel: 'Haulage Tractor Unit #402',
            eta: 'Today 17:30',
            progress: 92,
            cargo: 'Curtainsider Trailer (18,500 kg)',
          },
          {
            id: 'MGF-2026-001240',
            route: 'Singapore (SGP) → Los Angeles (USA)',
            service: 'Container Transport',
            status: 'delivered',
            statusLabel: 'Delivered • POD Signed',
            statusColor: 'bg-emerald-600/10 text-emerald-700 border-emerald-600/30',
            vessel: 'Pacific Intermodal 12',
            eta: 'Completed',
            progress: 100,
            cargo: '40ft Reefer Cold Storage (-18°C)',
          },
          {
            id: 'MGF-2026-002319',
            route: 'Dubai (UAE) → London (GBR)',
            service: 'Freight Coordination',
            status: 'in_transit',
            statusLabel: 'In Transit',
            statusColor: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
            vessel: 'Global Flight 777F',
            eta: 'Tomorrow 09:00',
            progress: 54,
            cargo: 'High-Value Commercial Electronics',
          },
          {
            id: 'MGF-2026-003180',
            route: 'Apapa Lagos (NGA) → Newark Port (USA)',
            service: 'Ocean Freight (FCL)',
            status: 'awaiting_pickup',
            statusLabel: 'Awaiting Port Pickup',
            statusColor: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
            vessel: 'Atlantic Trader III',
            eta: 'Oct 22, 2026',
            progress: 15,
            cargo: '2x 20ft Standard Dry Containers',
          },
          {
            id: 'MGF-2026-004510',
            route: 'Shanghai (CHN) → Rotterdam (NLD)',
            service: 'Ocean Freight',
            status: 'delayed',
            statusLabel: 'Weather Route Diverted',
            statusColor: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
            vessel: 'Mega Carrier V',
            eta: 'Revised: Nov 02 (+3 Days)',
            progress: 41,
            cargo: 'Industrial Machinery Spares',
          },
        ];

        const filteredShipments = opsShipments.filter((s) => {
          const matchesFilter = opsFilter === 'all' || s.status === opsFilter;
          const matchesSearch =
            opsSearch === '' ||
            s.id.toLowerCase().includes(opsSearch.toLowerCase()) ||
            s.route.toLowerCase().includes(opsSearch.toLowerCase()) ||
            s.service.toLowerCase().includes(opsSearch.toLowerCase()) ||
            s.vessel.toLowerCase().includes(opsSearch.toLowerCase());
          return matchesFilter && matchesSearch;
        });

        const selectedData =
          opsShipments.find((s) => s.id === selectedOpsShipment) || opsShipments[0];

        return (
          <section id="pricing-section" className="relative bg-white py-20 sm:py-24 text-neutral-900 border-b border-neutral-200 overflow-hidden">
            <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Header */}
              <div className="text-center mb-12 sm:mb-16">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8B0D1A]/10 border border-[#8B0D1A]/25 mb-3">
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
                </p>
              </div>

              {/* Status Filter Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
                {[
                  { key: 'all', label: 'All Active', count: 42 },
                  { key: 'in_transit', label: 'In Transit', count: 24 },
                  { key: 'awaiting_pickup', label: 'Awaiting Pickup', count: 8 },
                  { key: 'out_for_delivery', label: 'Out for Delivery', count: 7 },
                  { key: 'delayed', label: 'Exceptions / Delayed', count: 3 },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => {
                      setOpsFilter(item.key as any);
                      triggerToast(`Filtered operations by: ${item.label}`);
                    }}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                      opsFilter === item.key
                        ? 'bg-[#8B0D1A] text-white border-[#8B0D1A] shadow-md shadow-[#8B0D1A]/25'
                        : 'bg-[#F5F2ED] text-neutral-700 border-neutral-200/80 hover:border-neutral-400'
                    }`}
                  >
                    <span className="text-lg font-black block leading-none mb-1">
                      {item.count}
                    </span>
                    <span className="text-[11px] font-bold block truncate">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Interactive Shipments Explorer & Live Telemetry Inspector */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left 8 Cols: Searchable Table */}
                <div className="lg:col-span-8 bg-[#F5F2ED]/60 border border-neutral-200 rounded-3xl p-5 sm:p-6 shadow-sm">
                  
                  {/* Search input */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={opsSearch}
                        onChange={(e) => setOpsSearch(e.target.value)}
                        placeholder="Search by shipment ID, route, vessel or service..."
                        className="w-full bg-white border border-neutral-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#8B0D1A] transition"
                      />
                    </div>
                    {opsSearch && (
                      <button
                        onClick={() => setOpsSearch('')}
                        className="text-xs text-neutral-500 hover:text-neutral-900 font-semibold cursor-pointer"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  {/* List of Shipments */}
                  <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                    {filteredShipments.map((s) => {
                      const isSelected = selectedData.id === s.id;
                      return (
                        <div
                          key={s.id}
                          onClick={() => {
                            setSelectedOpsShipment(s.id);
                            triggerToast(`Selected shipment ${s.id}`);
                          }}
                          className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                            isSelected
                              ? 'bg-white border-[#8B0D1A] shadow-md ring-1 ring-[#8B0D1A]/50'
                              : 'bg-white/80 border-neutral-200/90 hover:border-neutral-400 hover:bg-white'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                              isSelected ? 'bg-[#8B0D1A] text-white' : 'bg-neutral-100 text-neutral-600'
                            }`}>
                              {s.service.includes('Ocean') ? <Ship className="w-4 h-4" /> :
                               s.service.includes('Road') ? <Truck className="w-4 h-4" /> :
                               s.service.includes('Container') ? <Box className="w-4 h-4" /> :
                               <Globe2 className="w-4 h-4" />}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-bold text-neutral-900">
                                  {s.id}
                                </span>
                                <span className="text-[10px] text-neutral-500 font-medium">
                                  • {s.service}
                                </span>
                              </div>
                              <p className="text-xs font-semibold text-neutral-800 mt-0.5">
                                {s.route}
                              </p>
                              <span className="text-[11px] text-neutral-500 block">
                                Carrier: {s.vessel} • ETA: <strong>{s.eta}</strong>
                              </span>
                            </div>
                          </div>

                          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md border ${s.statusColor}`}>
                              {s.statusLabel}
                            </span>
                            <span className="text-[11px] text-neutral-500 font-semibold">
                              {s.progress}% complete
                            </span>
                          </div>
                        </div>
                      );
                    })}

                    {filteredShipments.length === 0 && (
                      <div className="text-center py-8 text-neutral-500 text-xs">
                        No shipments matching &ldquo;{opsSearch}&rdquo; in this filter.
                      </div>
                    )}
                  </div>

                </div>

                {/* Right 4 Cols: Live Telemetry Detail Drawer */}
                <div className="lg:col-span-4 bg-[#F5F2ED] border border-neutral-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-300 mb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                        Live Custody Telemetry
                      </span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    </div>

                    <div className="space-y-3 mb-6">
                      <div>
                        <span className="text-[10px] font-bold uppercase text-neutral-400 block">Shipment Identifier:</span>
                        <span className="font-mono text-sm font-bold text-neutral-900">{selectedData.id}</span>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold uppercase text-neutral-400 block">Corridor Route:</span>
                        <span className="text-xs font-bold text-neutral-800">{selectedData.route}</span>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold uppercase text-neutral-400 block">Manifest Specs:</span>
                        <span className="text-xs text-neutral-700">{selectedData.cargo}</span>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold uppercase text-neutral-400 block">Assigned Unit:</span>
                        <span className="text-xs text-neutral-700 font-medium">{selectedData.vessel}</span>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold uppercase text-neutral-400 block mb-1">Transit Journey Progress:</span>
                        <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-[#8B0D1A] h-full rounded-full transition-all duration-300"
                            style={{ width: `${selectedData.progress}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-neutral-500 mt-1 block text-right font-bold">
                          {selectedData.progress}% of planned miles
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-neutral-300">
                    <button
                      onClick={() => handleQuickTrack(selectedData.id)}
                      className="w-full bg-[#8B0D1A] hover:bg-[#A31222] text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition shadow-md shadow-[#8B0D1A]/20 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>View Live Telemetry Details</span>
                    </button>

                    <button
                      onClick={() => {
                        setQuoteFormData({
                          ...quoteFormData,
                          subject: `Commercial SLA Inquiry for ${selectedData.route}`,
                          message: `Interested in scheduled container movements on route: ${selectedData.route}`,
                        });
                        scrollToSection('quote-section');
                        triggerToast('Route copied into Quote Form below!');
                      }}
                      className="w-full bg-white hover:bg-neutral-100 text-neutral-900 border border-neutral-300 font-bold py-2.5 rounded-xl text-xs transition cursor-pointer text-center"
                    >
                      Book Similar Commercial Route
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </section>
        );
      })()}

      {/* ===================== SECTION 10: FAQ & REQUEST A QUOTE ===================== */}
      {/* 8 OFFICIAL QUESTIONS FROM DOCX SECTION 12 + LIVE KEYWORD SEARCH + DOCX FORM FIELDS */}
      {(() => {
        const docxFaqs = [
          {
            q: 'How do I track my shipment?',
            a: 'Enter your Marvglobal tracking number on the Track Shipment page or in the tracking console to view the latest available shipment status, movement history, and delivery information.',
          },
          {
            q: 'Where can I find my tracking number?',
            a: 'Your tracking number is provided with your shipment confirmation email and related shipment documentation (e.g. Bill of Lading, Waybill). Example format: MGF-2026-000184.',
          },
          {
            q: 'Can I track a shipment without an account?',
            a: 'Yes. The public tracking experience is designed to support quick tracking-number lookup directly without requiring a full customer account login.',
          },
          {
            q: 'Will I see the exact live location of my shipment?',
            a: 'Where live location data is available, the tracking experience shows the latest received location, coordinates, and timestamp. Location availability depends on the tracking source and vessel/satellite connectivity.',
          },
          {
            q: 'What happens if my shipment is delayed?',
            a: 'The latest available status and relevant shipment update will be displayed in your tracking timeline. Customer support and your dedicated coordinator can assist with additional information and route mitigation.',
          },
          {
            q: 'Can I receive delivery updates?',
            a: 'Yes. The platform can be configured to send automated shipment milestone updates through email, SMS, and WhatsApp notifications as cargo transitions between checkpoints.',
          },
          {
            q: 'Can I download shipment documents?',
            a: 'Authorized customers can access and download available shipment documents (Bills of Lading, Commercial Invoices, Packing Lists, Customs Declarations) directly from their portal.',
          },
          {
            q: 'What is proof of delivery?',
            a: 'Proof of delivery (POD) records the legal completion of a delivery and includes delivery timestamp, recipient details, digital signature, and condition inspection photographs.',
          },
        ];

        const filteredFaqs = docxFaqs.filter(
          (faq) =>
            faqSearchQuery === '' ||
            faq.q.toLowerCase().includes(faqSearchQuery.toLowerCase()) ||
            faq.a.toLowerCase().includes(faqSearchQuery.toLowerCase())
        );

        return (
          <section id="faq-section" className="relative bg-white py-20 sm:py-24 text-neutral-900 border-b border-neutral-200 overflow-hidden">
            <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                
                {/* Left Column: FAQ Accordion with Live Search */}
                <div className="lg:col-span-7">
                  
                  {/* Header */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#8B0D1A]"></span>
                      <span className="text-[#8B0D1A] font-bold text-xs sm:text-[13px] tracking-widest uppercase">
                        FAQ • FREQUENTLY ASKED QUESTIONS
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 leading-tight">
                      Frequently asked questions
                    </h2>

                    <p className="text-xs sm:text-sm text-neutral-600 mt-2">
                      Everything you need to know about tracking, documentation, customs, and shipment coordination.
                    </p>
                  </div>

                  {/* Live Search Input for FAQs */}
                  <div className="relative mb-5">
                    <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={faqSearchQuery}
                      onChange={(e) => setFaqSearchQuery(e.target.value)}
                      placeholder="Search questions (e.g. tracking, proof of delivery, delay, account)..."
                      className="w-full bg-[#F5F2ED] border border-neutral-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-neutral-900 placeholder-neutral-500 focus:outline-none focus:border-[#8B0D1A] transition"
                    />
                    {faqSearchQuery && (
                      <button
                        onClick={() => setFaqSearchQuery('')}
                        className="text-xs text-neutral-500 hover:text-neutral-900 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer font-bold"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Accordion List */}
                  <div className="space-y-3">
                    {filteredFaqs.map((faq, idx) => {
                      const isOpen = faqOpenIndex === idx;
                      return (
                        <div
                          key={idx}
                          className="bg-[#F5F2ED]/70 rounded-2xl border border-neutral-200/90 shadow-sm overflow-hidden transition-all duration-200 hover:border-neutral-300"
                        >
                          <button
                            onClick={() => setFaqOpenIndex(isOpen ? null : idx)}
                            className="w-full p-4 sm:p-4.5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-[13.5px] text-neutral-900 hover:text-[#8B0D1A] transition cursor-pointer"
                          >
                            <span className={isOpen ? 'text-[#8B0D1A]' : ''}>{faq.q}</span>
                            <span className="w-6 h-6 rounded-full bg-white border border-neutral-200 flex items-center justify-center flex-shrink-0 text-neutral-600">
                              {isOpen ? <ChevronUp className="w-4 h-4 text-[#8B0D1A]" /> : <ChevronDown className="w-4 h-4" />}
                            </span>
                          </button>

                          {isOpen && (
                            <div className="px-4 pb-4 pt-1 text-xs text-neutral-600 leading-relaxed border-t border-neutral-200/80 animate-in fade-in duration-200">
                              {faq.a}
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {filteredFaqs.length === 0 && (
                      <div className="p-6 bg-[#F5F2ED] rounded-2xl text-center text-xs text-neutral-500">
                        No FAQ matching &ldquo;{faqSearchQuery}&rdquo;. Try another search keyword.
                      </div>
                    )}
                  </div>

                  {/* Trust highlight */}
                  <div className="mt-7 flex items-center gap-3.5 p-4 rounded-2xl bg-[#F5F2ED] border border-neutral-200">
                    <div className="w-10 h-10 rounded-xl bg-[#8B0D1A]/10 text-[#8B0D1A] flex items-center justify-center flex-shrink-0">
                      <Headphones className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-neutral-900 block leading-tight">
                        Need tailored assistance or custom enterprise billing?
                      </span>
                      <span className="text-[11px] text-neutral-500">
                        Our freight coordination team is available around the clock to support your cargo movements.
                      </span>
                    </div>
                  </div>

                </div>

                {/* Right Column: Crimson Form Box - "Request A Quote" (Docx Section 6) */}
                <div id="quote-section" className="lg:col-span-5">
                  <div className="bg-[#8B0D1A] rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden border border-[#A31222]">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />

                    <div className="mb-6 relative z-10">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#F5F2ED]/80 block mb-1">
                        DOCX SECTION 6 • INSTANT INQUIRY
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-white">
                        Tell us what you need to move.
                      </h3>
                      <p className="text-xs text-white/80 mt-1 leading-relaxed">
                        Give us the shipment details and we’ll have the information needed to understand your logistics request.
                      </p>
                    </div>

                    {quoteSubmitted ? (
                      <div className="p-6 bg-white/10 rounded-2xl text-center backdrop-blur-md animate-in fade-in duration-200 border border-white/20">
                        <CheckCircle className="w-12 h-12 text-white mx-auto mb-3" />
                        <h4 className="text-base font-bold mb-1.5 text-white">Request Received</h4>
                        <p className="text-xs text-white/95 leading-relaxed">
                          Thanks. Your request has been received. A Marvglobal Freight representative will review the details and follow up.
                        </p>
                      </div>
                    ) : (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          setQuoteSubmitted(true);
                          triggerToast('Quote request submitted successfully!');
                          setTimeout(() => setQuoteSubmitted(false), 7000);
                        }}
                        className="space-y-3 relative z-10"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <div>
                            <label className="text-[10px] font-bold uppercase text-white/80 block mb-1">Full Name</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Marcus Vance"
                              value={quoteFormData.name}
                              onChange={(e) => setQuoteFormData({ ...quoteFormData, name: e.target.value })}
                              className="w-full bg-white rounded-xl px-3 py-2 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#0B0B0B]"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold uppercase text-white/80 block mb-1">Company</label>
                            <input
                              type="text"
                              placeholder="e.g. Vance Global Corp"
                              className="w-full bg-white rounded-xl px-3 py-2 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#0B0B0B]"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <div>
                            <label className="text-[10px] font-bold uppercase text-white/80 block mb-1">Email</label>
                            <input
                              type="email"
                              required
                              placeholder="marcus@vance.com"
                              value={quoteFormData.email}
                              onChange={(e) => setQuoteFormData({ ...quoteFormData, email: e.target.value })}
                              className="w-full bg-white rounded-xl px-3 py-2 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#0B0B0B]"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold uppercase text-white/80 block mb-1">Phone</label>
                            <input
                              type="tel"
                              required
                              placeholder="+1 (555) 019-2834"
                              value={quoteFormData.phone}
                              onChange={(e) => setQuoteFormData({ ...quoteFormData, phone: e.target.value })}
                              className="w-full bg-white rounded-xl px-3 py-2 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#0B0B0B]"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <div>
                            <label className="text-[10px] font-bold uppercase text-white/80 block mb-1">Service Required</label>
                            <select
                              className="w-full bg-white rounded-xl px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#0B0B0B] cursor-pointer"
                            >
                              <option value="ocean">Ocean Freight (FCL/LCL)</option>
                              <option value="road">Road Freight &amp; Inland Haulage</option>
                              <option value="container">Container Transport</option>
                              <option value="warehouse">Warehousing &amp; Handling</option>
                              <option value="coordination">Full Freight Coordination</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-[10px] font-bold uppercase text-white/80 block mb-1">Approx. Weight (kg / tons)</label>
                            <input
                              type="text"
                              placeholder="e.g. 14,500 kg"
                              className="w-full bg-white rounded-xl px-3 py-2 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#0B0B0B]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] font-bold uppercase text-white/80 block mb-1">Subject / Trade Route</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Rotterdam to Chicago Container Run"
                            value={quoteFormData.subject}
                            onChange={(e) => setQuoteFormData({ ...quoteFormData, subject: e.target.value })}
                            className="w-full bg-white rounded-xl px-3 py-2 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#0B0B0B]"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-bold uppercase text-white/80 block mb-1">Additional Shipment Details</label>
                          <textarea
                            rows={3}
                            required
                            placeholder="Cargo specifications, dimensions, preferred dates, or special handling..."
                            value={quoteFormData.message}
                            onChange={(e) => setQuoteFormData({ ...quoteFormData, message: e.target.value })}
                            className="w-full bg-white rounded-xl px-3 py-2 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#0B0B0B] resize-none"
                          ></textarea>
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-[#0B0B0B] hover:bg-neutral-900 text-white font-bold py-3.5 rounded-xl text-xs tracking-wider uppercase transition active:scale-95 cursor-pointer shadow-lg shadow-black/30 flex items-center justify-center gap-2"
                        >
                          <span>Request My Quote</span>
                          <ChevronsRight className="w-4 h-4 stroke-[3]" />
                        </button>
                      </form>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </section>
        );
      })()}

      {/* ===================== SECTION 11: FULL MEGA FOOTER & BACK TO TOP ===================== */}
      <footer id="footer-section" className="bg-[#0B131F] text-neutral-300 pt-16 pb-12 border-t border-neutral-800 relative z-20">
        <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-neutral-800">
            
            {/* Col 1: Brand & Bio (4 cols) */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-4">
                {/* Red Truck Icon Graphic */}
                <div className="w-10 h-10 rounded-xl bg-[#8B0D1A] flex items-center justify-center text-white shadow-md">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-lg font-black tracking-wider text-white block leading-tight">
                    MARVGLOBAL
                  </span>
                  <span className="text-[10px] text-neutral-400 block tracking-widest uppercase">
                    Freight &amp; Logistics Operations
                  </span>
                </div>
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                Marvglobal Freight combines dependable physical movement with clear digital visibility — moving cargo with clarity, control, and confidence across 150+ global trade ports.
              </p>

              {/* Social Media Links */}
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="w-8 h-8 rounded-lg bg-neutral-900 hover:bg-[#8B0D1A] text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="w-8 h-8 rounded-lg bg-neutral-900 hover:bg-[#8B0D1A] text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="w-8 h-8 rounded-lg bg-neutral-900 hover:bg-[#8B0D1A] text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="w-8 h-8 rounded-lg bg-neutral-900 hover:bg-[#8B0D1A] text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Col 2: Quick Links (2 cols) */}
            <div className="lg:col-span-2">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2.5 text-xs text-neutral-400">
                {[
                  { name: 'About Us', target: 'about-transport-section' },
                  { name: 'Services', target: 'services-section' },
                  { name: 'How It Works', target: 'process-section' },
                  { name: 'Pricing', target: 'pricing-section' },
                  { name: 'FAQs', target: 'faq-section' },
                  { name: 'Request Quote', target: 'quote-section' },
                ].map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => scrollToSection(item.target)}
                      className="hover:text-[#8B0D1A] transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <ChevronRight className="w-3 h-3 text-[#8B0D1A]" />
                      <span>{item.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Services (2 cols) */}
            <div className="lg:col-span-2">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                Services
              </h4>
              <ul className="space-y-2.5 text-xs text-neutral-400">
                {['Land Freight', 'Air Freight', 'Ocean Freight', 'Rail Freight', 'Warehousing'].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => scrollToSection('services-section')}
                      className="hover:text-[#8B0D1A] transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <ChevronRight className="w-3 h-3 text-[#8B0D1A]" />
                      <span>{item}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Newsletter (4 cols) */}
            <div className="lg:col-span-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                Newsletter
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                Sign up for alerts, our latest blogs, freight updates, and market insights.
              </p>

              {newsletterSubscribed ? (
                <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-lg text-emerald-400 text-xs font-semibold animate-in fade-in">
                  Thank you for subscribing to our industry briefing!
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (newsletterEmail) {
                      setNewsletterSubscribed(true);
                      setNewsletterEmail('');
                      setTimeout(() => setNewsletterSubscribed(false), 5000);
                    }
                  }}
                  className="space-y-2.5"
                >
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full bg-white text-neutral-900 rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#8B0D1A]"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#8B0D1A] hover:bg-[#720A15] text-white font-bold py-2.5 rounded-lg text-xs uppercase tracking-wider transition active:scale-95 cursor-pointer shadow-md"
                  >
                    Subscribe Now
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* Bottom Bar with Floating Scroll-to-Top Button */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-neutral-300">Marvglobal Freight</span>
              <span>&bull;</span>
              <span>Global Logistics &amp; Supply Chain Solutions</span>
              <span className="hidden sm:inline">&bull;</span>
              <span className="hidden sm:inline">Move with confidence. Know where it is. Know what happens next.</span>
            </div>

            <div className="flex items-center gap-6">
              <span>&copy; {new Date().getFullYear()} Marvglobal Freight. All rights reserved.</span>
            </div>
          </div>

        </div>

        {/* Floating Circular Red Scroll-to-Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 w-11 h-11 rounded-full bg-[#8B0D1A] hover:bg-[#720A15] text-white flex items-center justify-center shadow-2xl z-40 transition-transform active:scale-90 cursor-pointer group"
          aria-label="Scroll back to top"
        >
          <ArrowUp className="w-5 h-5 stroke-[2.5] group-hover:-translate-y-0.5 transition-transform" />
        </button>

      </footer>

      {/* ===================== HIDDEN FILE INPUT ===================== */}
      <input
        ref={fileInputRef}
        type="file"
        accept="video/mp4,video/webm,video/quicktime"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* ===================== MODAL: VIDEO BACKGROUND MANAGER ===================== */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-neutral-900 border border-neutral-800 w-full max-w-lg rounded-2xl p-6 text-white shadow-2xl relative">
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-white transition cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#8B0D1A]/10 border border-[#8B0D1A]/30 flex items-center justify-center text-[#8B0D1A]">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold">Hero Background Video Settings</h3>
                <p className="text-[11px] text-neutral-400">
                  Hero 1 (Default view) &bull; Hero 2 (Revealed on scroll)
                </p>
              </div>
            </div>

            <p className="text-xs text-neutral-300 mb-4 leading-relaxed">
              `Hero 1 background.mp4` and `Hero 2 background.mp4` are both playing at full brightness. When you scroll, Hero 2 smoothly crossfades into view and stops right at the hero.
            </p>

            <div className="flex gap-2 p-1 bg-neutral-950 rounded-xl border border-neutral-800 mb-4">
              <button
                type="button"
                onClick={() => setTargetVideoSlot('hero1')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${
                  targetVideoSlot === 'hero1'
                    ? 'bg-[#8B0D1A] text-white'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <span>Target: Hero 1</span>
              </button>
              <button
                type="button"
                onClick={() => setTargetVideoSlot('hero2')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${
                  targetVideoSlot === 'hero2'
                    ? 'bg-[#8B0D1A] text-white'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <span>Target: Hero 2</span>
              </button>
            </div>

            <div className="space-y-3 mb-5">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-between p-3.5 bg-neutral-950 hover:bg-neutral-800/80 border border-neutral-800 hover:border-neutral-700 rounded-xl transition text-left cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <Upload className="w-5 h-5 text-[#8B0D1A] group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="text-xs font-bold text-white">Upload Custom MP4 for {targetVideoSlot === 'hero2' ? 'Hero 2' : 'Hero 1'}</p>
                    <p className="text-[11px] text-neutral-400">Select another file from your computer</p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-white text-black rounded-md">Browse</span>
              </button>

              <form onSubmit={handleSetCustomUrl} className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl">
                <label className="block text-[11px] font-semibold text-neutral-400 mb-1.5">
                  Or Paste Direct Video Stream / MP4 URL:
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={customVideoInput}
                    onChange={(e) => setCustomVideoInput(e.target.value)}
                    placeholder="https://example.com/video.mp4"
                    className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-[#8B0D1A]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#8B0D1A] hover:bg-[#A31222] text-white text-xs font-bold rounded-lg transition cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </form>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => {
                  setHero1VideoUrl('/hero1.mp4');
                  setHero2VideoUrl('/hero2.mp4');
                  setVideoStatusMessage('Reset to Hero 1 & Hero 2 files');
                  setShowVideoModal(false);
                }}
                className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Original Videos</span>
              </button>

              <button
                type="button"
                onClick={() => setShowVideoModal(false)}
                className="px-4 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold rounded-lg transition cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ===================== MODAL 1: ADVANCED MULTI-TAB TRACKING CONSOLE ===================== */}
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
                className={`px-3.5 py-1.5 rounded-lg transition cursor-pointer whitespace-nowrap ${
                  trackingModalTab === 'journey'
                    ? 'bg-[#8B0D1A] text-white shadow'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                1. Shipment Timeline
              </button>
              <button
                onClick={() => setTrackingModalTab('telemetry')}
                className={`px-3.5 py-1.5 rounded-lg transition cursor-pointer whitespace-nowrap ${
                  trackingModalTab === 'telemetry'
                    ? 'bg-[#8B0D1A] text-white shadow'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                2. Live GPS & Telemetry
              </button>
              <button
                onClick={() => setTrackingModalTab('documents')}
                className={`px-3.5 py-1.5 rounded-lg transition cursor-pointer whitespace-nowrap ${
                  trackingModalTab === 'documents'
                    ? 'bg-[#8B0D1A] text-white shadow'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                3. Waybill & Customs
              </button>
              <button
                onClick={() => setTrackingModalTab('pod')}
                className={`px-3.5 py-1.5 rounded-lg transition cursor-pointer whitespace-nowrap ${
                  trackingModalTab === 'pod'
                    ? 'bg-[#8B0D1A] text-white shadow'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
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
                          className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full flex items-center justify-center ${
                            step.active
                              ? 'bg-[#8B0D1A] ring-4 ring-[#8B0D1A]/30'
                              : step.completed
                              ? 'bg-neutral-600'
                              : 'bg-neutral-900 border-2 border-neutral-700'
                          }`}
                        >
                          {step.completed && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                          <h4 className={`text-xs font-bold ${step.active ? 'text-[#8B0D1A]' : step.completed ? 'text-white' : 'text-neutral-400'}`}>
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
                        onClick={() => triggerToast(`Downloading ${doc.file}...`)}
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

      {/* ===================== MODAL 2: BULK TRACKING LOOKUP ===================== */}
      {showMultipleTrackingModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-neutral-900 border border-neutral-800 w-full max-w-md rounded-2xl p-6 text-white shadow-2xl relative">
            <button
              onClick={() => setShowMultipleTrackingModal(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-white transition cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <Box className="w-6 h-6 text-[#8B0D1A]" />
              <h3 className="text-base font-bold">Bulk Tracking Lookup</h3>
            </div>
            <p className="text-xs text-neutral-400 mb-4">
              Enter up to 25 Marvglobal tracking IDs separated by commas or line breaks.
            </p>

            <textarea
              rows={4}
              placeholder="MARV-92841-EX&#10;MARV-48201-GL&#10;MARV-10928-US"
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#8B0D1A]/40 font-mono mb-4"
            />

            <button
              onClick={() => {
                setShowMultipleTrackingModal(false);
                setShowTrackingResult(true);
              }}
              className="w-full bg-[#8B0D1A] hover:bg-[#A31222] text-white font-bold py-3 rounded-lg text-xs transition cursor-pointer"
            >
              Batch Track Shipments
            </button>
          </div>
        </div>
      )}

      {/* ===================== MODAL 3: 24/7 SUPPORT MODAL ===================== */}
      {showHelpModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-neutral-900 border border-neutral-800 w-full max-w-md rounded-2xl p-6 text-white shadow-2xl relative">
            <button
              onClick={() => setShowHelpModal(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-white transition cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <HelpCircle className="w-6 h-6 text-[#8B0D1A]" />
              <h3 className="text-base font-bold">Marvglobal 24/7 Logistics Support</h3>
            </div>
            <p className="text-xs text-neutral-400 mb-5">
              Our global dispatch desks are operational 24 hours a day, 7 days a week.
            </p>

            <div className="space-y-3 mb-6">
              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-white">Direct Phone Support</p>
                  <p className="text-[11px] text-neutral-400">+880 1234567891 (Toll-Free)</p>
                </div>
                <a
                  href="tel:+8801234567891"
                  className="px-3 py-1.5 bg-[#8B0D1A] text-white text-xs font-bold rounded-lg hover:bg-[#A31222]"
                >
                  Call Now
                </a>
              </div>

              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-white">Live Operations Chat</p>
                  <p className="text-[11px] text-neutral-400">Average response time: &lt; 2 minutes</p>
                </div>
                <button
                  onClick={() => alert('Connecting to Marvglobal Live Dispatch agent...')}
                  className="px-3 py-1.5 border border-white/20 text-white text-xs font-bold rounded-lg hover:bg-white/10 cursor-pointer"
                >
                  Start Chat
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowHelpModal(false)}
              className="w-full bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-2.5 rounded-lg text-xs transition cursor-pointer"
            >
              Close Support
            </button>
          </div>
        </div>
      )}

      {/* ===================== MODAL 4: GET STARTED NOW MODAL ===================== */}
      {showGetStartedModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-neutral-900 border border-neutral-800 w-full max-w-md rounded-2xl p-6 text-white shadow-2xl relative">
            <button
              onClick={() => setShowGetStartedModal(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-white transition cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold mb-2">Get Started with Marvglobal</h3>
            <p className="text-xs text-neutral-400 mb-5">
              Open a corporate logistics account or request an initial freight pickup quote.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you! A Marvglobal Freight account manager will contact you within 15 minutes.');
                setShowGetStartedModal(false);
              }}
              className="space-y-3"
            >
              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1">Company / Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Global Logistics"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#8B0D1A]/40"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1">Work Email</label>
                <input
                  type="email"
                  required
                  placeholder="shipping@yourcompany.com"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#8B0D1A]/40"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1">Estimated Monthly Shipments</label>
                <select className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#8B0D1A]/40">
                  <option>1 - 50 packages/month</option>
                  <option>50 - 500 packages/month</option>
                  <option>500+ commercial containers/month</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-[#8B0D1A] hover:bg-[#A31222] text-white font-bold py-3 rounded-lg text-xs transition cursor-pointer"
              >
                Submit Account Application
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ===================== MODAL 5: LEARN MORE NOW MODAL ===================== */}
      {showLearnMoreModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-neutral-900 border border-neutral-800 w-full max-w-lg rounded-2xl p-6 text-white shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowLearnMoreModal(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-white transition cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold mb-2">Marvglobal Worldwide Freight</h3>
            <p className="text-xs text-neutral-400 mb-6">
              Engineered for seamless supply chains across 150+ countries with multimodal connectivity.
            </p>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800">
                <div className="flex items-center gap-2 text-[#8B0D1A] font-bold text-sm mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Real-Time Telemetry & Tracking</span>
                </div>
                <p className="text-xs text-neutral-400">
                  Every consignment is monitored via satellite IoT sensors reporting temperature, humidity, and location updates every 3 minutes.
                </p>
              </div>

              <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800">
                <div className="flex items-center gap-2 text-[#8B0D1A] font-bold text-sm mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Guaranteed SLA Delivery Rates</span>
                </div>
                <p className="text-xs text-neutral-400">
                  Maintaining an industry-leading on-time delivery rate with automated customs priority clearance pathways in 85 ports.
                </p>
              </div>

              <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800">
                <div className="flex items-center gap-2 text-[#8B0D1A] font-bold text-sm mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>End-to-End Enterprise API</span>
                </div>
                <p className="text-xs text-neutral-400">
                  Plug directly into Shopify, SAP, Oracle NetSuite, and custom ERP systems with our developer webhook infrastructure.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowLearnMoreModal(false);
                  setShowGetStartedModal(true);
                }}
                className="flex-1 bg-[#8B0D1A] hover:bg-[#A31222] text-white font-bold py-3 rounded-lg text-xs transition cursor-pointer"
              >
                Get Started Now
              </button>
              <button
                onClick={() => setShowLearnMoreModal(false)}
                className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-3 rounded-lg text-xs transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== MODAL: WATCH VIDEO MODAL ===================== */}
      {showWatchVideoModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-neutral-900 border border-neutral-800 w-full max-w-3xl rounded-2xl overflow-hidden text-white shadow-2xl relative">
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#8B0D1A]/15 border border-[#8B0D1A]/40 flex items-center justify-center text-[#8B0D1A]">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#8B0D1A]">
                    Marvglobal Freight Operations
                  </div>
                  <h3 className="text-sm sm:text-base font-bold">
                    {activeWatchVideo === 'hero1' ? 'Intermodal Global Fleet in Motion' : 'Harbor Logistics & Port Operations'}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setShowWatchVideoModal(false)}
                className="text-neutral-400 hover:text-white p-2 rounded-lg hover:bg-neutral-800 transition cursor-pointer"
                aria-label="Close video player"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video switcher tabs */}
            <div className="flex gap-2 px-4 sm:px-5 pt-3 pb-2 bg-neutral-950 border-b border-neutral-800/80">
              <button
                onClick={() => setActiveWatchVideo('hero1')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  activeWatchVideo === 'hero1'
                    ? 'bg-[#8B0D1A] text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                <span>Video 1: Global Shipping Overview</span>
              </button>
              <button
                onClick={() => setActiveWatchVideo('hero2')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  activeWatchVideo === 'hero2'
                    ? 'bg-[#8B0D1A] text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                <span>Video 2: Port &amp; Fleet Operations</span>
              </button>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video bg-black flex items-center justify-center">
              <video
                key={activeWatchVideo}
                src={activeWatchVideo === 'hero1' ? '/hero1.mp4' : '/hero2.mp4'}
                autoPlay
                controls
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-neutral-950/80 text-xs text-neutral-400">
              <p>
                Showcasing real-time delivery telemetry, commercial container management, and world-class logistics infrastructure.
              </p>
              <button
                onClick={() => {
                  setShowWatchVideoModal(false);
                  setShowGetStartedModal(true);
                }}
                className="bg-[#8B0D1A] hover:bg-[#720A15] text-white font-bold px-5 py-2.5 rounded-lg text-xs transition active:scale-95 cursor-pointer whitespace-nowrap"
              >
                Request a Quote
              </button>
            </div>
          </div>
        </div>
      )}
{/* Floating Toast Notification Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B0B0B] text-white border border-[#8B0D1A] px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs sm:text-sm font-semibold animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#8B0D1A] flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}