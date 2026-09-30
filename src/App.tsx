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
  RotateCcw
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'track' | 'ship'>('track');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shippingDropdownOpen, setShippingDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Background Video State (Google Flow video)
  const [bgVideoUrl, setBgVideoUrl] = useState<string>('/flow-video-background.mp4');
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [customVideoInput, setCustomVideoInput] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [videoStatusMessage, setVideoStatusMessage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
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
        setBgVideoUrl(objectUrl);
        setVideoStatusMessage(`Playing: ${file.name}`);
      }
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const objectUrl = URL.createObjectURL(file);
      setBgVideoUrl(objectUrl);
      setVideoStatusMessage(`Playing: ${file.name}`);
      setShowVideoModal(false);
    }
  };

  const handleSetCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (customVideoInput.trim()) {
      setBgVideoUrl(customVideoInput.trim());
      setVideoStatusMessage('Playing custom stream');
      setShowVideoModal(false);
    }
  };

  return (
    <div 
      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleFileDrop}
      className="min-h-screen bg-black text-white font-['Plus_Jakarta_Sans',sans-serif] flex flex-col justify-between selection:bg-[#FF3B14] selection:text-white relative overflow-x-hidden"
    >
      {/* Background Video Layer: Google Flow Video Loop */}
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          key={bgVideoUrl}
          src={bgVideoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105 opacity-85 transition-opacity duration-1000"
        />
        {/* Measured Scrim for contrast: allows the motion video to shine through while keeping all typography legible */}
        <div className="absolute inset-0 bg-black/75 bg-gradient-to-b from-black/90 via-black/65 to-black/90 backdrop-blur-[0.5px] pointer-events-none" />
      </div>

      {/* Drag & Drop Overlay Alert */}
      {isDragOver && (
        <div className="fixed inset-0 bg-black/85 z-50 flex flex-col items-center justify-center border-4 border-dashed border-[#FF3B14] m-6 rounded-3xl pointer-events-none animate-in fade-in duration-150">
          <Upload className="w-16 h-16 text-[#FF3B14] animate-bounce mb-4" />
          <h2 className="text-2xl font-black text-white">Drop your Google Flow video here</h2>
          <p className="text-sm text-neutral-400 mt-2">Loads instantly as your custom background</p>
        </div>
      )}

      {/* Main Container */}
      <div className="w-full max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-10 flex-1 flex flex-col justify-between py-6 sm:py-7 z-10 relative">
        
        {/* ===================== TOP NAVIGATION BAR ===================== */}
        <header className="flex items-center justify-between w-full pb-6 sm:pb-8">
          
          {/* Logo Mark: Marvglobal Freight Globe & Swoosh Logo */}
          <div className="flex items-center gap-3 select-none cursor-pointer group">
            {/* Globe with Orbiting Swoosh SVG */}
            <div className="relative w-11 h-11 sm:w-13 sm:h-13 flex-shrink-0 transition-transform group-hover:scale-105">
              <svg 
                viewBox="0 0 115 95" 
                className="w-full h-full drop-shadow-[0_2px_10px_rgba(230,0,0,0.3)]" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Marvglobal Freight Logo"
              >
                <defs>
                  {/* Globe Gradient */}
                  <radialGradient id="marvGlobeGrad" cx="38%" cy="36%" r="65%">
                    <stop offset="0%" stopColor="#FF2626" />
                    <stop offset="60%" stopColor="#D90000" />
                    <stop offset="100%" stopColor="#9E0000" />
                  </radialGradient>
                  {/* Swoosh Gradient */}
                  <linearGradient id="marvSwooshGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#C40000" />
                    <stop offset="40%" stopColor="#E60000" />
                    <stop offset="100%" stopColor="#FF2A2A" />
                  </linearGradient>
                  {/* Clip for continents inside globe */}
                  <clipPath id="marvGlobeClip">
                    <circle cx="48" cy="46" r="30" />
                  </clipPath>
                </defs>

                {/* Outer Ring Arc (Top-Left to Left) */}
                <path
                  d="M 64,18 C 55,13 44,11 34,15 C 22,19 14,29 11,43 C 9,52 11,61 14,68 C 11,62 8,52 9,43 C 12,27 21,17 34,13 C 44,9 56,11 65,16 Z"
                  fill="url(#marvSwooshGrad)"
                />

                {/* The Red Globe */}
                <circle cx="48" cy="46" r="30" fill="url(#marvGlobeGrad)" />

                {/* White Continents */}
                <g clipPath="url(#marvGlobeClip)">
                  {/* North America & Greenland */}
                  <path
                    d="M 28,26 C 30,22 34,20 38,20 C 41,21 43,23 42,26 C 40,28 38,30 40,32 C 42,33 44,35 43,38 C 41,40 37,39 34,42 C 32,43 31,45 29,44 C 27,42 25,36 26,31 C 26,28 27,27 28,26 Z"
                    fill="#FFFFFF"
                  />
                  {/* Greenland */}
                  <path
                    d="M 43,18 C 45,17 48,18 47,21 C 45,23 43,22 43,18 Z"
                    fill="#FFFFFF"
                  />
                  {/* South America */}
                  <path
                    d="M 33,48 C 37,46 40,49 41,53 C 42,58 40,64 37,68 C 35,72 32,74 31,73 C 30,70 31,64 30,59 C 29,54 30,49 33,48 Z"
                    fill="#FFFFFF"
                  />
                  {/* Europe & Scandinavia */}
                  <path
                    d="M 50,24 C 53,21 57,21 60,24 C 61,27 58,29 55,30 C 52,30 50,27 50,24 Z"
                    fill="#FFFFFF"
                  />
                  {/* Africa */}
                  <path
                    d="M 50,35 C 55,33 60,35 63,39 C 65,44 64,50 61,54 C 58,59 55,64 53,67 C 51,68 50,64 50,60 C 50,55 48,51 48,46 C 48,41 48,37 50,35 Z"
                    fill="#FFFFFF"
                  />
                </g>

                {/* Dramatic Front Orbital Swoosh (Crossing the lower globe to top-right tip) */}
                <path
                  d="M 2,58 C 10,68 22,69 35,67 C 50,63 70,53 90,38 C 98,32 106,25 110,21 C 106,24 95,34 85,41 C 68,52 48,61 32,62 C 20,62 9,58 2,58 Z"
                  fill="url(#marvSwooshGrad)"
                />
              </svg>
            </div>

            {/* Brand Wordmark: Marvglobal freight */}
            <div className="flex flex-col justify-center leading-none">
              <span className="text-lg sm:text-[21px] font-black tracking-tight text-white font-sans">
                Marvglobal
              </span>
              <span className="text-xs sm:text-[13px] font-bold text-[#E60000] tracking-[0.24em] lowercase mt-0.5 pl-0.5">
                freight
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-9 text-xs sm:text-[13px] font-bold tracking-wider text-white">
            <a 
              href="#home" 
              className="hover:text-[#FF3B14] transition-colors py-1 cursor-pointer"
            >
              HOME
            </a>

            {/* Shipping with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShippingDropdownOpen(!shippingDropdownOpen)}
                onBlur={() => setTimeout(() => setShippingDropdownOpen(false), 200)}
                className="flex items-center gap-1.5 hover:text-[#FF3B14] transition-colors py-1 cursor-pointer"
                aria-expanded={shippingDropdownOpen}
              >
                <span>SHIPPING</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${shippingDropdownOpen ? 'rotate-180 text-[#FF3B14]' : ''}`} />
              </button>

              {/* Shipping Services Dropdown Menu */}
              {shippingDropdownOpen && (
                <div className="absolute top-full left-0 mt-3 w-56 bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest px-3 py-1.5">
                    Freight & Solutions
                  </div>
                  {[
                    { name: 'Air Cargo Express', desc: 'Fast worldwide freight' },
                    { name: 'Ocean Logistics', desc: 'FCL & LCL container shipping' },
                    { name: 'Cross-Border Trucking', desc: 'Secure ground network' },
                    { name: 'Smart Warehousing', desc: 'Automated fulfillment' },
                    { name: 'Customs Clearance', desc: 'Zero-delay border audit' },
                  ].map((service, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setShippingDropdownOpen(false);
                        setShowGetStartedModal(true);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-neutral-800/80 transition group flex flex-col"
                    >
                      <span className="text-xs font-semibold text-white group-hover:text-[#FF3B14] transition-colors">
                        {service.name}
                      </span>
                      <span className="text-[11px] text-neutral-400">
                        {service.desc}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button 
              onClick={() => {
                setActiveTab('track');
                const inputEl = document.getElementById('tracking-input');
                inputEl?.focus();
              }}
              className="hover:text-[#FF3B14] transition-colors py-1 cursor-pointer"
            >
              TRACKING
            </button>
            <button 
              onClick={() => setShowHelpModal(true)}
              className="hover:text-[#FF3B14] transition-colors py-1 cursor-pointer"
            >
              SUPPORT
            </button>
            <a 
              href="#career" 
              onClick={(e) => {
                e.preventDefault();
                alert('Careers at Marvglobal Freight: We are currently hiring Logistics Engineers, Fleet Coordinators, and Customs Specialists! Contact careers@marvglobal.com');
              }}
              className="hover:text-[#FF3B14] transition-colors py-1 cursor-pointer"
            >
              CAREER
            </a>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Phone Number Pill / Badge */}
            <a
              href="tel:+8801234567891"
              className="hidden sm:flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-lg border border-white/20 hover:border-white/50 text-white text-xs sm:text-[13px] font-semibold transition-all hover:bg-white/5 active:scale-95"
            >
              <Phone className="w-3.5 h-3.5 text-white stroke-[2.2]" />
              <span className="tracking-wide">+880 1234567891</span>
            </a>

            {/* "Get Started Now" Action Button */}
            <button
              onClick={() => setShowGetStartedModal(true)}
              className="bg-white hover:bg-neutral-100 text-black pl-1.5 pr-4 sm:pr-5 py-1.5 rounded-lg flex items-center gap-2.5 sm:gap-3 transition shadow-lg active:scale-95 group cursor-pointer"
            >
              {/* Orange inset with double chevron */}
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-[#FF3B14] flex items-center justify-center text-white transition-transform group-hover:scale-105">
                <ChevronsRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[3]" />
              </div>
              <span className="text-xs sm:text-[13px] font-bold tracking-tight text-neutral-900 whitespace-nowrap">
                Get Started Now
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg border border-white/20 text-white hover:bg-white/10"
              aria-label="Toggle Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden w-full bg-neutral-950 border border-neutral-800 rounded-xl p-4 mb-6 z-40 flex flex-col gap-3 animate-in fade-in duration-200">
            <a 
              href="#home" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-bold text-white hover:text-[#FF3B14]"
            >
              HOME
            </a>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                setShippingDropdownOpen(true);
              }}
              className="text-left px-3 py-2 text-sm font-bold text-white hover:text-[#FF3B14] flex items-center justify-between"
            >
              <span>SHIPPING</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                setActiveTab('track');
              }}
              className="text-left px-3 py-2 text-sm font-bold text-white hover:text-[#FF3B14]"
            >
              TRACKING
            </button>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                setShowHelpModal(true);
              }}
              className="text-left px-3 py-2 text-sm font-bold text-white hover:text-[#FF3B14]"
            >
              SUPPORT
            </button>
            <a 
              href="#career" 
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                alert('Careers at Marvglobal Freight: Contact careers@marvglobal.com');
              }}
              className="px-3 py-2 text-sm font-bold text-white hover:text-[#FF3B14]"
            >
              CAREER
            </a>
            <div className="pt-2 border-t border-neutral-800 flex items-center justify-between">
              <a
                href="tel:+8801234567891"
                className="flex items-center gap-2 text-xs font-semibold text-neutral-300 py-1"
              >
                <Phone className="w-3.5 h-3.5 text-[#FF3B14]" />
                <span>+880 1234567891</span>
              </a>
            </div>
          </div>
        )}

        {/* ===================== HERO MAIN CONTENT ===================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center my-auto pt-8 sm:pt-14 lg:pt-18 pb-6 sm:pb-8">
          
          {/* Left Hero Statement & CTA */}
          <div className="lg:col-span-7 flex flex-col justify-center max-w-xl">
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-black tracking-tight leading-[1.08] text-white uppercase text-balance">
              WE KEEP YOUR<br />
              SUPPLY CHAIN<br />
              MOVING
            </h1>

            {/* Subtitle Paragraph */}
            <p className="mt-4 sm:mt-5 text-neutral-400 text-xs sm:text-sm lg:text-[14.5px] leading-relaxed max-w-md font-normal">
              From local to global shipments, our seamless logistics solutions ensure on-time, secure, and hassle-free delivery.
            </p>

            {/* Primary CTA Button: Learn More Now */}
            <div className="mt-6 sm:mt-7">
              <button
                onClick={() => setShowLearnMoreModal(true)}
                className="bg-[#FF3B14] hover:bg-[#e0310e] text-white pl-1.5 pr-4 sm:pr-5 py-1.5 rounded-lg flex items-center gap-2.5 sm:gap-3 transition-all duration-150 shadow-md shadow-red-950/20 active:scale-95 group cursor-pointer"
              >
                {/* White inset box with double chevron */}
                <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-md bg-white flex items-center justify-center text-black transition-transform group-hover:scale-105 shadow-sm">
                  <ChevronsRight className="w-4 h-4 text-neutral-900 stroke-[3]" />
                </div>
                <span className="text-xs sm:text-[13px] font-bold tracking-tight text-white whitespace-nowrap">
                  Learn More Now
                </span>
              </button>
            </div>
          </div>

          {/* Right Floating Tracking / Ship Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[350px] sm:max-w-[360px] bg-white rounded-xl p-4 sm:p-5 shadow-[0_16px_40px_rgba(0,0,0,0.8)] text-neutral-900 border border-neutral-100/90 relative">
              
              {/* Tab Header */}
              <div className="relative flex border-b border-neutral-200">
                {/* Tab: Tracking Order */}
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
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF3B14] rounded-full" />
                  )}
                </button>

                {/* Tab: Ship Order */}
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
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF3B14] rounded-full" />
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
                      placeholder="Type your tracking number here"
                      className="w-full bg-[#EFF1F4] text-neutral-900 placeholder:text-neutral-400 text-xs rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#FF3B14]/40 font-medium transition"
                    />
                  </div>

                  {/* Track Now Button */}
                  <button
                    type="submit"
                    className="w-full mt-3 bg-[#FF3B14] hover:bg-[#e0310e] text-white font-bold py-2.5 rounded-md text-xs sm:text-[13px] tracking-wide transition shadow-sm active:scale-[0.99] cursor-pointer"
                  >
                    Track Now
                  </button>

                  {/* Multiple Tracking Numbers & Need Help links */}
                  <div className="flex items-center justify-between mt-3 text-[11px] font-semibold text-neutral-800">
                    <button
                      type="button"
                      onClick={() => setShowMultipleTrackingModal(true)}
                      className="hover:text-[#FF3B14] transition cursor-pointer text-left"
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
                /* Tab Content: Quick Ship Calculator */
                <form onSubmit={handleCalculateQuote} className="mt-4 space-y-2.5">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={originZip}
                      onChange={(e) => setOriginZip(e.target.value)}
                      placeholder="From (Zip / City)"
                      className="w-full bg-[#EFF1F4] text-neutral-900 placeholder:text-neutral-400 text-[11px] rounded-md px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF3B14]/40 font-medium"
                    />
                    <input
                      type="text"
                      value={destZip}
                      onChange={(e) => setDestZip(e.target.value)}
                      placeholder="To (Country / Zip)"
                      className="w-full bg-[#EFF1F4] text-neutral-900 placeholder:text-neutral-400 text-[11px] rounded-md px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF3B14]/40 font-medium"
                    />
                  </div>
                  <input
                    type="number"
                    value={packageWeight}
                    onChange={(e) => setPackageWeight(e.target.value)}
                    placeholder="Estimated Weight (kg)"
                    className="w-full bg-[#EFF1F4] text-neutral-900 placeholder:text-neutral-400 text-[11px] rounded-md px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF3B14]/40 font-medium"
                  />

                  {quoteCalculated !== null && (
                    <div className="p-2 bg-neutral-100 rounded-md text-[11px] flex justify-between items-center text-neutral-900 font-semibold">
                      <span>Standard Rate:</span>
                      <span className="text-[#FF3B14] font-black text-xs">${quoteCalculated}.00 USD</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-[#FF3B14] hover:bg-[#e0310e] text-white font-bold py-2.5 rounded-md text-xs tracking-wide transition shadow-sm cursor-pointer"
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
                
                {/* Google Play Store Badge */}
                <a
                  href="https://play.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-black hover:bg-neutral-900 text-white rounded-md px-2.5 py-1.5 flex items-center gap-2 transition active:scale-95 group cursor-pointer border border-neutral-900"
                  aria-label="Get it on Google Play"
                >
                  {/* Google Play Colorful Triangle SVG */}
                  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3.6 1.8C3.3 2.1 3.1 2.6 3.1 3.3V20.7C3.1 21.4 3.3 21.9 3.6 22.2L3.7 22.3L13.4 12.6V12L3.7 2.3L3.6 1.8Z"
                      fill="#00E676"
                    />
                    <path
                      d="M16.6 15.8L13.4 12.6V12L16.6 8.8L16.7 8.9L20.5 11C21.6 11.7 21.6 12.9 20.5 13.6L16.7 15.7L16.6 15.8Z"
                      fill="#FFD600"
                    />
                    <path
                      d="M16.7 15.7L13.4 12.4L3.6 22.2C4 22.6 4.7 22.7 5.6 22.2L16.7 15.7Z"
                      fill="#FF3D00"
                    />
                    <path
                      d="M16.7 8.9L5.6 2.4C4.7 1.9 4 2 3.6 2.4L13.4 12.2L16.7 8.9Z"
                      fill="#00B0FF"
                    />
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

                {/* Apple App Store Badge */}
                <a
                  href="https://apple.com/app-store"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-black hover:bg-neutral-900 text-white rounded-md px-2.5 py-1.5 flex items-center gap-2 transition active:scale-95 group cursor-pointer border border-neutral-900"
                  aria-label="Download on the App Store"
                >
                  {/* Apple White Silhouette SVG */}
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

        {/* ===================== BOTTOM STATS ROW ===================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 pt-6 sm:pt-8 pb-2">
          
          {/* Stat 1: 2000+ */}
          <div className="rounded-lg border border-neutral-800/80 bg-black/60 px-4 py-3 sm:py-3.5 backdrop-blur-sm hover:border-neutral-700 transition">
            <div className="text-xl sm:text-2xl font-bold text-white tracking-tight tabular-nums">
              2000+
            </div>
            {/* Hairline Divider */}
            <div className="w-full h-px bg-neutral-800/80 my-2" />
            <div className="text-neutral-400 text-[11px] sm:text-xs font-normal">
              Satisfied Clients
            </div>
          </div>

          {/* Stat 2: 2.98% */}
          <div className="rounded-lg border border-neutral-800/80 bg-black/60 px-4 py-3 sm:py-3.5 backdrop-blur-sm hover:border-neutral-700 transition">
            <div className="text-xl sm:text-2xl font-bold text-white tracking-tight tabular-nums">
              2.98%
            </div>
            {/* Hairline Divider */}
            <div className="w-full h-px bg-neutral-800/80 my-2" />
            <div className="text-neutral-400 text-[11px] sm:text-xs font-normal">
              On-Time Delivery Rate
            </div>
          </div>

          {/* Stat 3: 150+ */}
          <div className="rounded-lg border border-neutral-800/80 bg-black/60 px-4 py-3 sm:py-3.5 backdrop-blur-sm hover:border-neutral-700 transition">
            <div className="text-xl sm:text-2xl font-bold text-white tracking-tight tabular-nums">
              150+
            </div>
            {/* Hairline Divider */}
            <div className="w-full h-px bg-neutral-800/80 my-2" />
            <div className="text-neutral-400 text-[11px] sm:text-xs font-normal">
              Countries Served
            </div>
          </div>

          {/* Stat 4: 24/7 */}
          <div className="rounded-lg border border-neutral-800/80 bg-black/60 px-4 py-3 sm:py-3.5 backdrop-blur-sm hover:border-neutral-700 transition">
            <div className="text-xl sm:text-2xl font-bold text-white tracking-tight tabular-nums">
              24/7
            </div>
            {/* Hairline Divider */}
            <div className="w-full h-px bg-neutral-800/80 my-2" />
            <div className="text-neutral-400 text-[11px] sm:text-xs font-normal">
              Customer
            </div>
          </div>

        </div>

        {/* Subtle Video Background Controls Pill */}
        <div className="flex items-center justify-between pt-2 pb-1 text-[11px] text-neutral-400">
          <button
            onClick={() => setShowVideoModal(true)}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer group bg-black/50 hover:bg-black/80 px-2.5 py-1 rounded-md border border-neutral-800"
          >
            <Video className="w-3.5 h-3.5 text-[#FF3B14]" />
            <span className="text-neutral-300">
              {videoStatusMessage || 'Google Flow Video Background'}
            </span>
            <span className="text-neutral-500 group-hover:text-neutral-300 ml-1">· Change Source</span>
          </button>

          <span className="hidden sm:inline-block text-[11px] text-neutral-500">
            Tip: Drop your Google Flow MP4 directly onto the page anytime
          </span>
        </div>

      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="video/mp4,video/webm,video/quicktime"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Modal: Google Flow Video Background Manager */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-neutral-900 border border-neutral-800 w-full max-w-lg rounded-2xl p-6 text-white shadow-2xl relative">
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-white transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-[#FF3B14]/10 border border-[#FF3B14]/30 flex items-center justify-center text-[#FF3B14]">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold">Google Flow Video Background</h3>
                <p className="text-[11px] text-neutral-400 truncate max-w-[280px] sm:max-w-xs">
                  flow.google.com/shared/video/a6c00c37-59a5-4ade-a3f7-b7b0c5bc0b25
                </p>
              </div>
            </div>

            <p className="text-xs text-neutral-300 mb-4 leading-relaxed">
              The hero background is currently running the high-definition cinematic logistics video loop rendered for your Google Flow project. Because Google Flow share links are private app URLs behind Google authentication, you can also select or drop your exact downloaded MP4 file:
            </p>

            <div className="space-y-3 mb-5">
              {/* Option A: Upload Downloaded File */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-between p-3.5 bg-neutral-950 hover:bg-neutral-800/80 border border-neutral-800 hover:border-neutral-700 rounded-xl transition text-left cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <Upload className="w-5 h-5 text-[#FF3B14] group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="text-xs font-bold text-white">Select Downloaded Google Flow Video (.mp4)</p>
                    <p className="text-[11px] text-neutral-400">Load the exact file downloaded from flow.google.com</p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-white text-black rounded-md">Browse</span>
              </button>

              {/* Option B: Direct URL */}
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
                    className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-[#FF3B14]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#FF3B14] hover:bg-[#e0310e] text-white text-xs font-bold rounded-lg transition"
                  >
                    Apply
                  </button>
                </div>
              </form>
            </div>

            {/* Reset to Flow Default */}
            <div className="flex items-center justify-between pt-3 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => {
                  setBgVideoUrl('/flow-video-background.mp4');
                  setVideoStatusMessage('Google Flow Logistics Loop');
                  setShowVideoModal(false);
                }}
                className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Default Flow Video</span>
              </button>

              <button
                type="button"
                onClick={() => setShowVideoModal(false)}
                className="px-4 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold rounded-lg transition"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ===================== INTERACTIVE MODALS ===================== */}

      {/* Modal 1: Tracking Result Simulation */}
      {showTrackingResult && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-neutral-900 border border-neutral-800 w-full max-w-lg rounded-2xl p-6 text-white shadow-2xl relative">
            <button
              onClick={() => setShowTrackingResult(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-white transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#FF3B14]/10 border border-[#FF3B14]/30 flex items-center justify-center text-[#FF3B14]">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Shipment Live Status</h3>
                <p className="text-xs text-neutral-400">
                  ID: {trackingNumber.trim() ? trackingNumber.toUpperCase() : 'MARV-89302-GLOBAL'}
                </p>
              </div>
            </div>

            <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 mb-5">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-neutral-400">Current Status:</span>
                <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-md font-semibold border border-emerald-500/20">
                  In Transit • On Schedule
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-400">Estimated Delivery:</span>
                <span className="text-white font-medium">Tomorrow by 14:00 Local Time</span>
              </div>
            </div>

            {/* Stepper */}
            <div className="space-y-4 pl-2 relative border-l-2 border-neutral-800 ml-4 mb-6">
              <div className="relative pl-6">
                <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-[#FF3B14] ring-4 ring-[#FF3B14]/20" />
                <p className="text-xs font-bold text-white">Out for Final Mile Delivery</p>
                <p className="text-[11px] text-neutral-400">Regional Distribution Center — 08:45 AM</p>
              </div>
              <div className="relative pl-6">
                <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-neutral-600" />
                <p className="text-xs font-medium text-neutral-300">Customs Clearance Approved</p>
                <p className="text-[11px] text-neutral-500">International Cargo Port — Yesterday</p>
              </div>
              <div className="relative pl-6">
                <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-neutral-600" />
                <p className="text-xs font-medium text-neutral-300">Origin Facility Departure</p>
                <p className="text-[11px] text-neutral-500">Shenzhen Logistics Hub — 2 days ago</p>
              </div>
            </div>

            <button
              onClick={() => setShowTrackingResult(false)}
              className="w-full bg-[#FF3B14] hover:bg-[#e0310e] text-white font-bold py-3 rounded-lg text-xs transition"
            >
              Close Tracking Details
            </button>
          </div>
        </div>
      )}

      {/* Modal 2: Multiple Tracking Numbers */}
      {showMultipleTrackingModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-neutral-900 border border-neutral-800 w-full max-w-md rounded-2xl p-6 text-white shadow-2xl relative">
            <button
              onClick={() => setShowMultipleTrackingModal(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-white transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <Box className="w-6 h-6 text-[#FF3B14]" />
              <h3 className="text-base font-bold">Bulk Tracking Lookup</h3>
            </div>
            <p className="text-xs text-neutral-400 mb-4">
              Enter up to 25 Marvglobal tracking IDs separated by commas or line breaks.
            </p>

            <textarea
              rows={4}
              placeholder="MARV-92841-EX&#10;MARV-48201-GL&#10;MARV-10928-US"
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#FF3B14]/40 font-mono mb-4"
            />

            <button
              onClick={() => {
                setShowMultipleTrackingModal(false);
                setShowTrackingResult(true);
              }}
              className="w-full bg-[#FF3B14] hover:bg-[#e0310e] text-white font-bold py-3 rounded-lg text-xs transition"
            >
              Batch Track Shipments
            </button>
          </div>
        </div>
      )}

      {/* Modal 3: Need Help / Customer Support */}
      {showHelpModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-neutral-900 border border-neutral-800 w-full max-w-md rounded-2xl p-6 text-white shadow-2xl relative">
            <button
              onClick={() => setShowHelpModal(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-white transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <HelpCircle className="w-6 h-6 text-[#FF3B14]" />
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
                  className="px-3 py-1.5 bg-[#FF3B14] text-white text-xs font-bold rounded-lg hover:bg-[#e0310e]"
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
                  className="px-3 py-1.5 border border-white/20 text-white text-xs font-bold rounded-lg hover:bg-white/10"
                >
                  Start Chat
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowHelpModal(false)}
              className="w-full bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-2.5 rounded-lg text-xs transition"
            >
              Close Support
            </button>
          </div>
        </div>
      )}

      {/* Modal 4: Get Started Now Modal */}
      {showGetStartedModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-neutral-900 border border-neutral-800 w-full max-w-md rounded-2xl p-6 text-white shadow-2xl relative">
            <button
              onClick={() => setShowGetStartedModal(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-white transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold mb-2">Get Started with Marvglobal</h3>
            <p className="text-xs text-neutral-400 mb-5">
              Open a corporate logistics account or schedule an initial freight pickup today.
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
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#FF3B14]/40"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1">Work Email</label>
                <input
                  type="email"
                  required
                  placeholder="shipping@yourcompany.com"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#FF3B14]/40"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-1">Estimated Monthly Shipments</label>
                <select className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#FF3B14]/40">
                  <option>1 - 50 packages/month</option>
                  <option>50 - 500 packages/month</option>
                  <option>500+ commercial containers/month</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-[#FF3B14] hover:bg-[#e0310e] text-white font-bold py-3 rounded-lg text-xs transition cursor-pointer"
              >
                Submit Account Application
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal 5: Learn More Now Modal */}
      {showLearnMoreModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-neutral-900 border border-neutral-800 w-full max-w-lg rounded-2xl p-6 text-white shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowLearnMoreModal(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-white transition"
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
                <div className="flex items-center gap-2 text-[#FF3B14] font-bold text-sm mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Real-Time Telemetry & Tracking</span>
                </div>
                <p className="text-xs text-neutral-400">
                  Every consignment is monitored via satellite IoT sensors reporting temperature, humidity, and location updates every 3 minutes.
                </p>
              </div>

              <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800">
                <div className="flex items-center gap-2 text-[#FF3B14] font-bold text-sm mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Guaranteed SLA Delivery Rates</span>
                </div>
                <p className="text-xs text-neutral-400">
                  Maintaining an industry-leading on-time delivery rate with automated customs priority clearance pathways in 85 ports.
                </p>
              </div>

              <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800">
                <div className="flex items-center gap-2 text-[#FF3B14] font-bold text-sm mb-1">
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
                className="flex-1 bg-[#FF3B14] hover:bg-[#e0310e] text-white font-bold py-3 rounded-lg text-xs transition"
              >
                Get Started Now
              </button>
              <button
                onClick={() => setShowLearnMoreModal(false)}
                className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-3 rounded-lg text-xs transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
