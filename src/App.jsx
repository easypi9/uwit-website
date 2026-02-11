import React, { useState, useEffect, useRef } from 'react';

// ============================================
// BACKGROUND
// ============================================
const LiquidGlassBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
    <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #1a0a2e 0%, #16082a 50%, #0d1033 100%)' }} />
    <div className="absolute inset-0">
      <div className="absolute rounded-full" style={{ width: '60vmax', height: '60vmax', background: 'radial-gradient(circle, rgba(219, 39, 119, 0.8) 0%, rgba(157, 23, 77, 0.4) 40%, transparent 70%)', top: '-20%', left: '-10%', filter: 'blur(40px)', animation: 'liquidMove1 20s ease-in-out infinite' }} />
      <div className="absolute rounded-full" style={{ width: '70vmax', height: '70vmax', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.7) 0%, rgba(91, 33, 182, 0.4) 40%, transparent 70%)', top: '10%', left: '20%', filter: 'blur(50px)', animation: 'liquidMove2 25s ease-in-out infinite' }} />
      <div className="absolute rounded-full" style={{ width: '55vmax', height: '55vmax', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.7) 0%, rgba(37, 99, 235, 0.4) 40%, transparent 70%)', top: '30%', right: '-15%', filter: 'blur(45px)', animation: 'liquidMove3 22s ease-in-out infinite' }} />
      <div className="absolute rounded-full" style={{ width: '50vmax', height: '50vmax', background: 'radial-gradient(circle, rgba(6, 182, 212, 0.8) 0%, rgba(8, 145, 178, 0.4) 40%, transparent 70%)', bottom: '-10%', right: '10%', filter: 'blur(40px)', animation: 'liquidMove4 18s ease-in-out infinite' }} />
    </div>
    <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} />
    <style>{`
      @keyframes liquidMove1 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(5%, 10%) scale(1.1); } }
      @keyframes liquidMove2 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(-10%, 8%) scale(1.15); } }
      @keyframes liquidMove3 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(-8%, -8%) scale(1.1); } }
      @keyframes liquidMove4 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(-15%, -10%) scale(1.2); } }
    `}</style>
  </div>
);

// ============================================
// SVG ICONS
// ============================================
const IconTarget = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const IconGrid = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const IconChart = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M3 3v18h18" />
    <path d="M7 14l4-4 4 4 5-5" />
  </svg>
);

const IconClock = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

const IconShield = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const IconDocument = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const IconChevronDown = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M19 9l-7 7-7-7" />
  </svg>
);

const IconMail = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

// ============================================
// LOGO
// ============================================
const UWITLogo = ({ size = 'hero', className = '' }) => {
  const isSmall = size === 'nav' || size === 'footer';
  const fontSize = isSmall ? '24px' : 'clamp(48px, 12vw, 160px)';
  const dotStyle = isSmall
    ? { width: '0.2em', height: '0.2em', top: '-0.08em', right: '0.02em', borderRadius: '0.02em' }
    : { width: '0.18em', height: '0.18em', top: '0.08em', right: '0.04em', borderRadius: '0.02em' };

  return (
    <div className={`relative inline-block font-black tracking-tight ${className}`} style={{ fontFamily: "'Syne', sans-serif", fontSize }}>
      <span className="relative inline-block">
        <span className="text-white">U</span>
        <span className="absolute bg-white" style={dotStyle} />
      </span>
      <span className="text-white">WIT</span>
    </div>
  );
};

// ============================================
// NAVIGATION
// ============================================
const Navigation = ({ scrolled, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navItems = [
    { id: 'manifesto', label: 'About' },
    { id: 'beautylog', label: 'Beauty Log' },
    { id: 'industrials', label: 'Industrial' },
    { id: 'investment', label: 'Invest' },
  ];

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-6'}`}>
        <div className={`absolute inset-0 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl' : 'bg-transparent'}`} />
        <div className="relative max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="transition-all duration-500 cursor-pointer" onClick={() => scrollToSection('hero')} style={{ opacity: scrolled ? 1 : 0, transform: scrolled ? 'translateY(0)' : 'translateY(-10px)' }}>
            <UWITLogo size="nav" />
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-all duration-300 ${activeSection === item.id ? 'text-white' : 'text-white/60 hover:text-white'}`}
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {item.label}
              </button>
            ))}
            <button onClick={() => scrollToSection('contact')}
              className="ml-4 px-6 py-2.5 text-sm font-medium bg-white text-black rounded-full hover:bg-white/90 transition-all"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Contact
            </button>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden flex flex-col gap-1.5 p-2">
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      <div className={`fixed inset-0 z-40 bg-[#0a0612] transition-all duration-300 md:hidden ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => scrollToSection(item.id)} className="text-2xl text-white/80 hover:text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

// ============================================
// REVEAL ANIMATION
// ============================================
const Reveal = ({ children, delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setTimeout(() => setIsVisible(true), delay);
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      <div className="transition-all duration-700 ease-out h-full" style={{ transform: isVisible ? 'translateY(0)' : 'translateY(30px)', opacity: isVisible ? 1 : 0 }}>
        {children}
      </div>
    </div>
  );
};

// ============================================
// SOURCES COMPONENT
// ============================================
const SourcesBlock = ({ sources, accentColor = 'violet' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const colorClasses = {
    pink: 'hover:text-pink-400',
    cyan: 'hover:text-cyan-400',
    violet: 'hover:text-violet-400'
  };

  return (
    <div className="mt-12 pt-8 border-t border-white/10">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={`flex items-center gap-2 text-white/40 ${colorClasses[accentColor]} transition-colors text-sm`}
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        <IconDocument />
        <span>Data Sources ({sources.length})</span>
        <span className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}><IconChevronDown /></span>
      </button>
      {isOpen && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
          {sources.map((s, i) => (
            <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className={`text-white/30 ${colorClasses[accentColor]} text-xs transition-colors flex items-start gap-2`}>
              <span className="text-white/20">{i + 1}.</span>
              <span>{s.text} — {s.source}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

// ============================================
// HERO SECTION
// ============================================
const HeroSection = ({ scrollY }) => {
  const opacity = Math.max(0, 1 - scrollY / 500);
  const scale = Math.max(0.9, 1 - scrollY / 3000);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center px-6">
      <div className="text-center" style={{ transform: `scale(${scale})`, opacity }}>
        <div style={{ textShadow: '0 0 100px rgba(139, 92, 246, 0.5)' }}>
          <UWITLogo size="hero" />
        </div>
        <p className="mt-6 text-lg md:text-2xl text-white/60 tracking-widest uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          You Want It
        </p>
      </div>

      <div className="absolute bottom-32 left-0 right-0 px-6" style={{ opacity }}>
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
            New Answers to Old Problems
          </h1>
          <p className="text-base md:text-xl text-white/60" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            We find the gaps that industries overlook — and build what people and companies have been searching for.
          </p>
        </div>
      </div>
    </section>
  );
};

// ============================================
// MANIFESTO SECTION
// ============================================
const ManifestoSection = () => (
  <section id="manifesto" className="relative py-32 px-6">
    <div className="max-w-6xl mx-auto">
      <Reveal>
        <p className="text-white/40 text-sm tracking-widest uppercase mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Our Philosophy</p>
      </Reveal>
      
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        <div>
          <Reveal delay={100}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-8" style={{ fontFamily: "'Syne', sans-serif" }}>
              We fill gaps that giants{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">can't see.</span>
            </h2>
          </Reveal>
        </div>

        <div className="space-y-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          <Reveal delay={200}>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed">
              Most startups fight for market share in crowded spaces. We take a different path — we find billion-dollar problems that established players ignore because they can't see how to monetize them.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <p className="text-lg md:text-xl text-white font-medium leading-relaxed">
              We can.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
        <Reveal delay={400}>
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-all duration-500" style={{ minHeight: '200px' }}>
            <span className="text-violet-400 mb-4 block"><IconTarget /></span>
            <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>Demand-First</h3>
            <p className="text-white/60" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>We validate markets before building. Every product starts with proven pain points.</p>
          </div>
        </Reveal>
        <Reveal delay={500}>
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-all duration-500" style={{ minHeight: '200px' }}>
            <span className="text-violet-400 mb-4 block"><IconGrid /></span>
            <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>Multi-Product</h3>
            <p className="text-white/60" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Portfolio diversification across B2B and B2C reduces risk and creates synergies.</p>
          </div>
        </Reveal>
        <Reveal delay={600}>
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-all duration-500" style={{ minHeight: '200px' }}>
            <span className="text-violet-400 mb-4 block"><IconChart /></span>
            <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>Data-Driven</h3>
            <p className="text-white/60" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Every claim backed by research. Every decision informed by analytics.</p>
          </div>
        </Reveal>
      </div>

      <Reveal delay={700}>
        <div className="mt-20 text-center">
          <p className="text-white/40 text-sm tracking-widest uppercase mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Current Focus</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#beautylog" className="px-6 py-3 rounded-full bg-gradient-to-r from-rose-500/20 to-pink-500/20 border border-pink-500/30 text-white hover:border-pink-500/60 transition-all">
              Beauty Industry — $670B
            </a>
            <a href="#industrials" className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-white hover:border-cyan-500/60 transition-all">
              Industrial Procurement — $8.4T
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

// ============================================
// LIGHTBOX COMPONENT
// ============================================
const Lightbox = ({ images, currentIndex, isOpen, onClose, onNavigate, accentColor = 'pink' }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate(-1);
      if (e.key === 'ArrowRight') onNavigate(1);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNavigate]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 cursor-zoom-out"
      onClick={onClose}
    >
      {/* Close button */}
      <button 
        className="absolute top-4 right-4 w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-2xl transition-colors"
        onClick={onClose}
      >×</button>
      
      {/* Prev button */}
      <button 
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-xl transition-colors"
        onClick={(e) => { e.stopPropagation(); onNavigate(-1); }}
      >‹</button>
      
      {/* Image */}
      <img 
        src={images[currentIndex]} 
        alt={`Screenshot ${currentIndex + 1}`}
        className={`max-w-full max-h-[85vh] rounded-2xl shadow-2xl ${accentColor === 'cyan' ? 'shadow-cyan-500/20' : 'shadow-pink-500/20'}`}
        style={{ animation: 'zoomIn 0.3s ease' }}
        onClick={(e) => e.stopPropagation()}
      />
      
      {/* Next button */}
      <button 
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-xl transition-colors"
        onClick={(e) => { e.stopPropagation(); onNavigate(1); }}
      >›</button>
      
      {/* Counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm">
        {currentIndex + 1} / {images.length}
      </div>
      
      <style>{`
        @keyframes zoomIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

// ============================================
// BEAUTY LOG SECTION
// ============================================
const BeautyLogSection = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  
  const screenshots = [
    { src: './images/screen_products.png', alt: 'Products' },
    { src: './images/screen_care.png', alt: 'Care Routine' },
    { src: './images/screen_journal.png', alt: 'Journal' },
    { src: './images/screen_procedure.png', alt: 'Procedures' },
  ];

  const sources = [
    { text: 'Global beauty market $670B', source: 'Euromonitor/Statista', url: 'https://www.cosmoprof.com/en/media-room/news/the-global-beauty-industry-the-markets-to-monitor-in-the-next-future/' },
    { text: '23% retention rate', source: 'Metrilo', url: 'https://www.metrilo.com/blog/beauty-brands-ecommerce-benchmarks' },
    { text: 'CAC growth 222%', source: 'SimplicityDX', url: 'https://www.semrush.com/blog/customer-retention-stats/' },
    { text: 'US beauty market $105B', source: 'Statista', url: 'https://www.askattest.com/blog/articles/beauty-cosmetics-market-size' },
    { text: '42% drive 80% sales', source: 'Zenoti 2024', url: 'https://www.zenoti.com/thecheckin/a-guide-to-salon-client-retention-8-essential-strategies' },
    { text: '5-7x acquisition cost', source: 'Forbes', url: 'https://www.trypropel.ai/resources/customer-retention-beauty-industry' },
    { text: '5% CAGR forecast', source: 'McKinsey', url: 'https://www.mckinsey.com/industries/consumer-packaged-goods/our-insights/state-of-beauty' },
  ];

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const navigate = (dir) => {
    setLightboxIndex((prev) => (prev + dir + screenshots.length) % screenshots.length);
  };

  return (
    <section id="beautylog" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header with badge */}
        <Reveal>
          <div className="flex items-center gap-4 mb-6">
            <span className="px-4 py-2 text-sm font-medium tracking-wider rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white">B2C Product</span>
            <span className="text-white/30 text-sm">In Development</span>
          </div>
        </Reveal>

        {/* Title row: text left, logo right */}
        <Reveal delay={100}>
          <div className="flex items-center justify-between gap-6 mb-16">
            <div className="flex-1">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-2 md:mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>Beauty Log</h2>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400 font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>
                Not a Beauty Tracker. A Data Monetization Platform.
              </p>
            </div>
            <div className="flex-shrink-0">
              <img 
                src="./images/beautylog_logo_rounded.png" 
                alt="Beauty Log" 
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-2xl md:rounded-3xl shadow-2xl shadow-pink-500/30"
              />
            </div>
          </div>
        </Reveal>

        {/* App Screenshots Grid */}
        <Reveal delay={200}>
          <div className="mb-16">
            <p className="text-white/40 text-xs tracking-widest uppercase mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              App Preview — tap to enlarge
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {screenshots.map((screen, index) => (
                <div 
                  key={index}
                  className="relative cursor-pointer rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-500/20 group"
                  onClick={() => openLightbox(index)}
                >
                  <img 
                    src={screen.src} 
                    alt={screen.alt} 
                    className="w-full rounded-xl md:rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 md:opacity-0 transition-opacity flex items-end justify-center pb-3">
                    <span className="text-white/80 text-xs">Tap to view</span>
                  </div>
                  {/* Mobile hint - always visible */}
                  <div className="absolute bottom-2 left-0 right-0 text-center md:hidden">
                    <span className="text-white/60 text-[10px] bg-black/40 px-2 py-1 rounded-full">Tap to enlarge</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={300}>
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>The Problem</h3>
            <p className="text-lg text-white/70 mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              The US beauty market will reach{' '}
              <a href="https://www.askattest.com/blog/articles/beauty-cosmetics-market-size" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-400 transition-colors font-semibold">$105B in 2025</a>
              , but the industry is hemorrhaging money:
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <a href="https://www.metrilo.com/blog/beauty-brands-ecommerce-benchmarks" target="_blank" rel="noopener noreferrer" className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-pink-500/30 transition-all">
                <p className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400 mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>23%</p>
                <p className="text-white/50 text-sm">retention rate — only 1 in 4 customers return</p>
              </a>
              <a href="https://www.semrush.com/blog/customer-retention-stats/" target="_blank" rel="noopener noreferrer" className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-pink-500/30 transition-all">
                <p className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400 mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>222%</p>
                <p className="text-white/50 text-sm">CAC explosion — from $9 (2013) to $29 (2022)</p>
              </a>
              <a href="https://www.trypropel.ai/resources/customer-retention-beauty-industry" target="_blank" rel="noopener noreferrer" className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-pink-500/30 transition-all">
                <p className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400 mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>5-7x</p>
                <p className="text-white/50 text-sm">more expensive to acquire vs retain</p>
              </a>
              <a href="https://www.zenoti.com/thecheckin/a-guide-to-salon-client-retention-8-essential-strategies" target="_blank" rel="noopener noreferrer" className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-pink-500/30 transition-all">
                <p className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400 mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>42%</p>
                <p className="text-white/50 text-sm">of loyal customers drive 80% of sales</p>
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={400}>
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>Our Solution</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-pink-400 text-xs tracking-widest uppercase mb-4 font-semibold">For Users</p>
                <ul className="space-y-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  <li className="flex items-start gap-3 text-white/70"><span className="text-pink-400 mt-0.5">—</span> Complete procedure history (locations, products, certificates, before/after photos)</li>
                  <li className="flex items-start gap-3 text-white/70"><span className="text-pink-400 mt-0.5">—</span> AI-powered personalized routines for any beauty goal</li>
                  <li className="flex items-start gap-3 text-white/70"><span className="text-pink-400 mt-0.5">—</span> Smart product rotation (prevents skin/hair from adapting)</li>
                  <li className="flex items-start gap-3 text-white/70"><span className="text-pink-400 mt-0.5">—</span> One-tap shopping with personalized recommendations</li>
                </ul>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-pink-400 text-xs tracking-widest uppercase mb-4 font-semibold">For Business</p>
                <ul className="space-y-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  <li className="flex items-start gap-3 text-white/70"><span className="text-pink-400 mt-0.5">—</span> Reactivate cold customers — automated reminders based on usage</li>
                  <li className="flex items-start gap-3 text-white/70"><span className="text-pink-400 mt-0.5">—</span> 3-5x higher engagement — weekly app opens vs monthly site visits</li>
                  <li className="flex items-start gap-3 text-white/70"><span className="text-pink-400 mt-0.5">—</span> 40-60% lower marketing costs — the product sells itself</li>
                  <li className="flex items-start gap-3 text-white/70"><span className="text-pink-400 mt-0.5">—</span> 70%+ retention — users can't leave without losing history</li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={500}>
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>Business Model</h3>
            <div className="flex flex-wrap gap-4">
              <span className="px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 text-white/80 text-sm">10-15% take rate on platform sales</span>
              <span className="px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 text-white/80 text-sm">Premium subscriptions for advanced AI</span>
              <span className="px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 text-white/80 text-sm">Data licensing to brands (anonymized)</span>
              <span className="px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 text-white/80 text-sm">B2B2C integrations with retailers</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={600}>
          <div className="p-8 rounded-2xl bg-gradient-to-r from-rose-500/10 to-pink-500/10 border border-pink-500/20">
            <h3 className="text-xl font-bold text-white mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>Market Opportunity</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-white/40 text-xs uppercase mb-1">US Market</p>
                <a href="https://www.askattest.com/blog/articles/beauty-cosmetics-market-size" target="_blank" rel="noopener noreferrer" className="text-2xl font-bold text-white hover:text-pink-400 transition-colors">$105B</a>
                <p className="text-white/40 text-xs">(2025)</p>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase mb-1">Global Market</p>
                <a href="https://www.cosmoprof.com/en/media-room/news/the-global-beauty-industry-the-markets-to-monitor-in-the-next-future/" target="_blank" rel="noopener noreferrer" className="text-2xl font-bold text-white hover:text-pink-400 transition-colors">$670B</a>
                <p className="text-white/40 text-xs">(2024)</p>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase mb-1">Growth Rate</p>
                <a href="https://www.mckinsey.com/industries/consumer-packaged-goods/our-insights/state-of-beauty" target="_blank" rel="noopener noreferrer" className="text-2xl font-bold text-white hover:text-pink-400 transition-colors">5% CAGR</a>
                <p className="text-white/40 text-xs">through 2030</p>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase mb-1">Direct Competitors</p>
                <p className="text-2xl font-bold text-white">0</p>
                <p className="text-white/40 text-xs">first mover</p>
              </div>
            </div>
          </div>
        </Reveal>

        <SourcesBlock sources={sources} accentColor="pink" />
      </div>
      
      {/* Lightbox */}
      <Lightbox 
        images={screenshots.map(s => s.src)}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={navigate}
      />
    </section>
  );
};

// ============================================
// INDUSTRIALS SECTION
// ============================================
const IndustrialsSection = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const screenshots = [
    { src: './images/industrial-screen-1.png', alt: 'Industrial screen 1' },
    { src: './images/industrial-screen-2.png', alt: 'Industrial screen 2' },
    { src: './images/industrial-screen-3.png', alt: 'Industrial screen 3' },
    { src: './images/industrial-screen-4.png', alt: 'Industrial screen 4' },
    { src: './images/industrial-screen-5.png', alt: 'Industrial screen 5' },
  ];

  const sources = [
    { text: 'Global industrial distribution $8.41T', source: 'Market Data Forecast', url: 'https://www.globenewswire.com/news-release/2024/07/03/2908267/0/en/Industrial-Distribution-Market-Size-to-Surpass-USD-12-39-Trillion-by-2033.html' },
    { text: 'US contract manufacturing $248B', source: 'Mordor Intelligence', url: 'https://www.mordorintelligence.com/industry-reports/united-states-contract-manufacturing-services-market' },
    { text: '85% not digitized', source: 'Grand View Research', url: 'https://www.grandviewresearch.com/industry-analysis/north-america-contract-manufacturing-services-market-report' },
    { text: 'Global contract manufacturing $731B', source: '360iResearch', url: 'https://www.360iresearch.com/library/intelligence/contract-manufacturing' },
  ];

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const navigate = (dir) => {
    setLightboxIndex((prev) => (prev + dir + screenshots.length) % screenshots.length);
  };

  return (
    <section id="industrials" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <Reveal>
            <div className="flex items-center gap-4 mb-6">
              <span className="px-4 py-2 text-sm font-medium tracking-wider rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white">B2B Platform</span>
              <span className="text-white/30 text-sm">In Development</span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex items-center justify-between gap-6 mb-16">
              <div className="flex-1">
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>Industrial</h2>
                <p className="text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>
                  The Last $8.4T Market Without Digitization.
                </p>
              </div>
              <div className="flex-shrink-0">
                <img
                  src="./images/industrial-logo-mark.svg"
                  alt="Industrial"
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-2xl md:rounded-3xl shadow-2xl shadow-cyan-500/30"
                />
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="mb-16">
            <p className="text-white/40 text-xs tracking-widest uppercase mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              App Preview — tap to enlarge
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {screenshots.map((screen, index) => (
                <div
                  key={index}
                  className="relative cursor-pointer rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/20 group"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={screen.src}
                    alt={screen.alt}
                    className="w-full rounded-xl md:rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 md:opacity-0 transition-opacity flex items-end justify-center pb-3">
                    <span className="text-white/80 text-xs">Tap to view</span>
                  </div>
                  <div className="absolute bottom-2 left-0 right-0 text-center md:hidden">
                    <span className="text-white/60 text-[10px] bg-black/40 px-2 py-1 rounded-full">Tap to enlarge</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={300}>
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>The Problem</h3>
            <p className="text-lg text-white/70 mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              US Contract Manufacturing:{' '}
              <a href="https://www.mordorintelligence.com/industry-reports/united-states-contract-manufacturing-services-market" target="_blank" rel="noopener noreferrer" className="text-white hover:text-cyan-400 transition-colors font-semibold">$248B (2025) → $357B by 2030</a>
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <a href="https://www.grandviewresearch.com/industry-analysis/north-america-contract-manufacturing-services-market-report" target="_blank" rel="noopener noreferrer" className="p-8 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all">
                <p className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>85%</p>
                <p className="text-white/60 text-lg">of processes still run on email, phone calls, and Excel</p>
              </a>
              
              <div className="p-8 rounded-xl bg-white/5 border border-white/10">
                <p className="text-white/40 text-xs tracking-widest uppercase mb-4">Key Pain Points</p>
                <ul className="space-y-3 text-white/70" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  <li className="flex items-start gap-2"><span className="text-red-400/60">×</span> No transparency — can't verify manufacturer capabilities</li>
                  <li className="flex items-start gap-2"><span className="text-red-400/60">×</span> 20-40% overpayments — no price comparison</li>
                  <li className="flex items-start gap-2"><span className="text-red-400/60">×</span> Weeks of searching instead of minutes</li>
                  <li className="flex items-start gap-2"><span className="text-red-400/60">×</span> High risk — no quality guarantees</li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={400}>
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>Our Solution</h3>
            <p className="text-lg text-white/70 mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              AI platform for industrial procurement with full participant verification and process automation.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-cyan-400 text-xs tracking-widest uppercase mb-4 font-semibold">For Buyers</p>
                <ul className="space-y-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  <li className="flex items-start gap-3 text-white/70"><span className="text-cyan-400 mt-0.5">—</span> Instant manufacturer matching — search by technology, equipment, portfolio</li>
                  <li className="flex items-start gap-3 text-white/70"><span className="text-cyan-400 mt-0.5">—</span> Real-time transparency — production capacity, deadlines, pricing</li>
                  <li className="flex items-start gap-3 text-white/70"><span className="text-cyan-400 mt-0.5">—</span> Secure transactions — verified companies, escrow payments, ratings</li>
                  <li className="flex items-start gap-3 text-white/70"><span className="text-cyan-400 mt-0.5">—</span> AI blueprint reading (2D/3D) and RFQ generation</li>
                  <li className="flex items-start gap-3 text-white/70"><span className="text-cyan-400 mt-0.5">—</span> Automated offer comparison and TCO calculation</li>
                </ul>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-cyan-400 text-xs tracking-widest uppercase mb-4 font-semibold">For Manufacturers</p>
                <ul className="space-y-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  <li className="flex items-start gap-3 text-white/70"><span className="text-cyan-400 mt-0.5">—</span> Single platform for orders — no more client hunting</li>
                  <li className="flex items-start gap-3 text-white/70"><span className="text-cyan-400 mt-0.5">—</span> Automatic cost calculation from blueprints</li>
                  <li className="flex items-start gap-3 text-white/70"><span className="text-cyan-400 mt-0.5">—</span> Quote & proposal generation</li>
                  <li className="flex items-start gap-3 text-white/70"><span className="text-cyan-400 mt-0.5">—</span> Production schedule optimization</li>
                  <li className="flex items-start gap-3 text-white/70"><span className="text-cyan-400 mt-0.5">—</span> 30-50% cost reduction through automation</li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={500}>
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>Technology Stack</h3>
            <div className="flex flex-wrap gap-4">
              <span className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-white/80 text-sm">AI models for blueprint reading & cost estimation</span>
              <span className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-white/80 text-sm">Smart matching algorithms</span>
              <span className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-white/80 text-sm">Blockchain for transaction security</span>
              <span className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-white/80 text-sm">Real-time order monitoring</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={600}>
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>Business Model</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-center">
                <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>3-5%</p>
                <p className="text-white/60 text-sm">Transaction fee on all deals</p>
              </div>
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-center">
                <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>$500-5K/mo</p>
                <p className="text-white/60 text-sm">SaaS for manufacturers (AI agents)</p>
              </div>
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-center">
                <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>Lead Gen</p>
                <p className="text-white/60 text-sm">Paid access to large buyer tenders</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={700}>
          <div className="p-8 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
            <h3 className="text-xl font-bold text-white mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>Market Opportunity</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-white/40 text-xs uppercase mb-1">Global Industrial</p>
                <a href="https://www.globenewswire.com/news-release/2024/07/03/2908267/0/en/Industrial-Distribution-Market-Size-to-Surpass-USD-12-39-Trillion-by-2033.html" target="_blank" rel="noopener noreferrer" className="text-2xl font-bold text-white hover:text-cyan-400 transition-colors">$8.41T</a>
                <p className="text-white/40 text-xs">(2024)</p>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase mb-1">US Contract Mfg</p>
                <a href="https://www.mordorintelligence.com/industry-reports/united-states-contract-manufacturing-services-market" target="_blank" rel="noopener noreferrer" className="text-2xl font-bold text-white hover:text-cyan-400 transition-colors">$248B</a>
                <p className="text-white/40 text-xs">→ $357B (2030)</p>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase mb-1">Global Contract Mfg</p>
                <a href="https://www.360iresearch.com/library/intelligence/contract-manufacturing" target="_blank" rel="noopener noreferrer" className="text-2xl font-bold text-white hover:text-cyan-400 transition-colors">$731B</a>
                <p className="text-white/40 text-xs">(2024)</p>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase mb-1">TAM (5-year)</p>
                <p className="text-2xl font-bold text-white">$200B+</p>
                <p className="text-white/40 text-xs">addressable</p>
              </div>
            </div>
          </div>
        </Reveal>

        <SourcesBlock sources={sources} accentColor="cyan" />
      </div>

      <Lightbox
        images={screenshots.map((s) => s.src)}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={navigate}
        accentColor="cyan"
      />
    </section>
  );
};

// ============================================
// INVESTMENT SECTION
// ============================================
const InvestmentSection = () => (
  <section id="investment" className="relative py-32 px-6">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <Reveal>
          <p className="text-white/40 text-sm tracking-widest uppercase mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Investment Thesis</p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white" style={{ fontFamily: "'Syne', sans-serif" }}>Why Invest in UWIT</h2>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Reveal delay={200}>
          <div className="h-full p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-violet-400"><IconClock /></span>
              <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>Market Timing</h3>
            </div>
            <ul className="space-y-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <li className="flex items-start gap-2 text-white/70"><span className="text-violet-400 mt-1">—</span> Beauty: $105B US market with broken retention economics</li>
              <li className="flex items-start gap-2 text-white/70"><span className="text-violet-400 mt-1">—</span> Industrial: $8.4T market with 85% still not digitized</li>
            </ul>
          </div>
        </Reveal>
        <Reveal delay={300}>
          <div className="h-full p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-violet-400"><IconTarget /></span>
              <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>Proven Pain Points</h3>
            </div>
            <ul className="space-y-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <li className="flex items-start gap-2 text-white/70"><span className="text-violet-400 mt-1">—</span> Beauty brands lose 77% of customers with 222% CAC growth</li>
              <li className="flex items-start gap-2 text-white/70"><span className="text-violet-400 mt-1">—</span> Industrial buyers waste weeks with 20-40% overpayment</li>
            </ul>
          </div>
        </Reveal>
        <Reveal delay={400}>
          <div className="h-full p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-violet-400"><IconChart /></span>
              <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>Scalable Models</h3>
            </div>
            <ul className="space-y-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <li className="flex items-start gap-2 text-white/70"><span className="text-violet-400 mt-1">—</span> Transaction fees + SaaS subscriptions</li>
              <li className="flex items-start gap-2 text-white/70"><span className="text-violet-400 mt-1">—</span> Data monetization opportunities</li>
              <li className="flex items-start gap-2 text-white/70"><span className="text-violet-400 mt-1">—</span> Platform network effects</li>
            </ul>
          </div>
        </Reveal>
        <Reveal delay={500}>
          <div className="h-full p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-violet-400"><IconShield /></span>
              <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>First Mover</h3>
            </div>
            <ul className="space-y-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <li className="flex items-start gap-2 text-white/70"><span className="text-violet-400 mt-1">—</span> Zero direct competitors in both markets</li>
              <li className="flex items-start gap-2 text-white/70"><span className="text-violet-400 mt-1">—</span> First-mover advantage with defensible moats</li>
            </ul>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

// ============================================
// CONTACT SECTION
// ============================================
const ContactSection = () => (
  <section id="contact" className="relative py-32 px-6">
    <div className="max-w-4xl mx-auto">
      <div className="relative rounded-3xl overflow-hidden p-12 md:p-20 text-center" style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(236, 72, 153, 0.15) 50%, rgba(6, 182, 212, 0.15) 100%)', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="absolute inset-0 opacity-50 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-violet-500/30 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-fuchsia-500/30 rounded-full blur-[100px]" />
        </div>

        <div className="relative">
          <Reveal>
            <p className="text-white/50 text-sm tracking-widest uppercase mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Get In Touch</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8" style={{ fontFamily: "'Syne', sans-serif" }}>Let's Build Together</h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-lg md:text-xl text-white/60 max-w-lg mx-auto mb-12" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Seeking strategic partners who share our vision of solving real problems for real markets.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="mailto:invest@uwit.dev" className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-all flex items-center justify-center gap-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <IconMail />
                invest@uwit.dev
              </a>
              <a href="#" className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white border border-white/20 hover:bg-white/20 rounded-full font-medium transition-all" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Request Deck
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

// ============================================
// FOOTER
// ============================================
const Footer = () => (
  <footer className="relative py-12 border-t border-white/5 px-6">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <UWITLogo size="footer" className="opacity-30" />
        <p className="text-white/30 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>© 2024 UWIT. You Want It — We Build It.</p>
        <div className="flex gap-4">
          <a href="#" className="text-white/30 hover:text-white/60 text-sm transition-colors">Twitter</a>
          <a href="#" className="text-white/30 hover:text-white/60 text-sm transition-colors">LinkedIn</a>
        </div>
      </div>
    </div>
  </footer>
);

// ============================================
// MAIN APP
// ============================================
export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const sections = ['hero', 'manifesto', 'beautylog', 'industrials', 'investment', 'contact'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0a0612] text-white overflow-x-hidden">
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <LiquidGlassBackground />
      <Navigation scrolled={scrollY > 100} activeSection={activeSection} />
      <main className="relative z-10">
        <HeroSection scrollY={scrollY} />
        <ManifestoSection />
        <BeautyLogSection />
        <IndustrialsSection />
        <InvestmentSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
