import React, { useEffect, useState, useRef } from 'react';
import { Menu, Zap, Fingerprint, Database, Cpu, ChevronRight, X, Sparkles, Globe, Shield, Code2, MessageSquare, ArrowRight } from 'lucide-react';
import { cn } from "./lib/utils";
import { AuthComponent } from './components/ui/sign-up';
import { SignInCard2 as SignInCard } from './components/ui/sign-in';
import { ForgotPasswordCard } from './components/ui/forgot-password';
import { HeroSplineBackground } from './components/ui/galaxy-interactive-hero-section';
import { DashboardV2 as Dashboard } from './components/ui/dashboard-v2';
import { SocialConnect } from './components/ui/connect-with-us';

const Logo = ({ size = 24, className = "" }) => (
  <div className={cn("relative flex items-center justify-center", className)} style={{ width: size, height: size }}>
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00e5ff" />
          <stop offset="100%" stopColor="#9d00ff" />
        </linearGradient>
      </defs>
      <path d="M20 50C20 33.4315 33.4315 20 50 20C66.5685 20 80 33.4315 80 50C80 66.5685 66.5685 80 50 80C33.4315 80 20 66.5685 20 50Z" stroke="url(#logo-grad)" strokeWidth="8" />
      <path d="M40 50L48 58L65 42" stroke="url(#logo-grad)" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25 25L35 35" stroke="url(#logo-grad)" strokeWidth="6" strokeLinecap="round" />
      <path d="M75 75L65 65" stroke="url(#logo-grad)" strokeWidth="6" strokeLinecap="round" />
    </svg>
    <div className="absolute inset-0 bg-blue-500/10 blur-xl -z-10 group-hover:bg-purple-500/20 transition-colors" />
  </div>
);

const BackgroundVisuals = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 bg-surface-dark overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern z-0 opacity-40"></div>

      <video
        autoPlay
        loop
        muted
        playsInline
        className="relative z-1 w-full h-full object-cover opacity-80 mix-blend-screen"
      >
        <source src="/backroundvideo.mp4" type="video/mp4" />
      </video>
      <div className="absolute z-2 inset-0 bg-gradient-to-b from-transparent via-surface-dark/40 to-surface-dark"></div>

      {/* Abstract Glowing Orbs */}
      <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-electric-blue/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none z-3"></div>
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-neon-purple/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none z-3"></div>
    </div>
  );
};

const Navbar = ({ onSignup, onSignin, setPage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 border-b ${scrolled ? 'glass-nav py-4 border-white/5 shadow-2xl shadow-black/50' : 'bg-transparent py-6 border-transparent'}`}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex justify-between items-center relative">

        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.location.reload()}>
          <Logo size={40} />
          <span className="text-3xl font-display font-black tracking-tight text-white group-hover:text-white/90 transition-colors">
            Lyzard<span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00e5ff] to-[#9d00ff]">.ai</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 border border-white/10 bg-white/[0.02] backdrop-blur-md px-6 py-2.5 rounded-full shadow-inner shadow-white/5">
          <a href="#platform" onClick={() => setPage('home')} className="text-sm font-medium text-white/60 hover:text-white transition-colors">Platform</a>
          <a href="#models" onClick={() => setPage('home')} className="text-sm font-medium text-white/60 hover:text-white transition-colors">Showcase</a>
          <a href="#enterprise" onClick={() => setPage('home')} className="text-sm font-medium text-white/60 hover:text-white transition-colors whitespace-nowrap">Connect with us</a>
        </div>

        <div className="flex items-center gap-5">
          <button onClick={onSignin} className="hidden sm:flex items-center text-sm font-medium text-white/60 hover:text-white transition-colors px-2">
            Sign In
          </button>
          <button onClick={onSignup} className="btn-primary px-6 py-2.5 rounded-xl text-sm hidden sm:flex items-center gap-2 group">
            Start Building
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            className="md:hidden text-white/70 hover:text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#0a0a16] border-t border-white/5 py-12 px-6 lg:px-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 relative z-10">
        
        {/* Logo and Tagline */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-3 transition-transform hover:scale-105 cursor-pointer">
            <Logo size={32} />
            <span className="text-2xl font-display font-black tracking-tight text-white">Lyzard<span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00e5ff] to-[#9d00ff]">.ai</span></span>
          </div>
          <p className="text-xs text-white/30 font-medium tracking-wide">
            Empowering the next generation of AI architecture.
          </p>
        </div>

        {/* Minimal Navigation */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {['Platform', 'Documentation', 'Company', 'Privacy'].map((item) => (
            <a key={item} href="#" className="text-xs font-bold text-white/40 hover:text-white transition-colors uppercase tracking-widest">
              {item}
            </a>
          ))}
        </div>

        {/* Legal & Social Shortcut */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <div className="text-[10px] text-white/20 font-bold uppercase tracking-[0.2em]">
            © 2026 Lyzard AI Technologies
          </div>
          <div className="flex items-center gap-2 text-[10px] text-blue-400/50">
            <Sparkles size={10} />
            Built for Excellence
          </div>
        </div>

      </div>
    </footer>
  );
};

const ShowcaseSection = ({ image, title, description, setPage, reverse = false, delay = "0ms" }) => {
  const sectionRef = React.useRef(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={sectionRef}
      className={`relative py-12 md:py-16 px-6 lg:px-16 bg-[#0a0a16] overflow-hidden ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ transition: 'opacity-1.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
    >
      {/* Senior Design Touches: Decorative Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-1/3 ${reverse ? 'right-1/4' : 'left-1/4'} w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full animate-pulse opacity-40`} />
        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(circle_at_center,white,transparent_75%)]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-16 lg:gap-32`}>
          
          {/* Text Content - Senior approach: Hierarchical & Clean */}
          <div className="w-full md:w-1/2 space-y-8 text-left">
            <div className="space-y-4">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-sm ${isVisible ? 'animate-fade-in-left' : ''}`}>
                <div className="w-1 h-1 rounded-full bg-blue-400 animate-ping" />
                Featured Product
              </div>
              <h3 className={`text-4xl md:text-5xl lg:text-5xl font-display font-black text-white tracking-tight leading-[1.1] ${isVisible ? 'animate-fade-in-down' : ''}`} style={{ animationDelay: '200ms' }}>
                {title}
              </h3>
            </div>
            
            <p className={`text-lg md:text-xl text-white/50 font-medium leading-[1.6] max-w-xl ${isVisible ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '400ms' }}>
              {description}
            </p>

            <div className={`pt-4 flex items-center gap-6 ${isVisible ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '600ms' }}>
              <button 
                onClick={() => setPage('builder')}
                className="group relative px-8 py-3.5 bg-white text-[#0a0a16] rounded-xl font-extrabold text-sm transition-all hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(255,255,255,0.1)] overflow-hidden"
              >
                <span className="relative z-10">Start Building</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Image Side - Senior approach: Browser Mockup style */}
          <div className={`w-full md:w-1/2 relative ${isVisible ? (reverse ? 'animate-fade-in-left' : 'animate-fade-in-right') : ''}`} style={{ animationDelay: '300ms' }}>
            {/* Background "Card" for depth */}
            <div className={`absolute -inset-4 bg-gradient-to-tr from-white/5 to-transparent rounded-[2rem] border border-white/5 rotate-1 scale-[0.98] ${reverse ? 'translate-x-4' : '-translate-x-4'}`} />
            
            <div className="relative group p-1.5 bg-gradient-to-b from-white/20 to-transparent rounded-[1.8rem] shadow-2xl">
              <div className="rounded-[1.5rem] overflow-hidden bg-[#0d0d15] border border-white/10">
                {/* Browser-style Title Bar */}
                <div className="h-9 bg-white/5 border-b border-white/5 flex items-center px-4 gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                </div>
                
                <img 
                  src={image} 
                  alt={title} 
                  className="w-full h-auto object-contain transform transition-transform duration-1000 group-hover:scale-[1.04]"
                  style={{ animation: isVisible ? 'float 6s ease-in-out infinite' : 'none', animationDelay: '0.5s' }}
                />
                {/* Shimmer scan line effect */}
                <div 
                  className="absolute inset-0 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: 'linear-gradient(transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)', animation: 'shimmer-scan 3s ease-in-out infinite' }}
                />
              </div>
              
              {/* Pulsing border glow on hover */}
              <div className="absolute inset-0 rounded-[1.8rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ boxShadow: '0 0 40px rgba(59,130,246,0.15), inset 0 0 40px rgba(59,130,246,0.05)' }} />
            </div>

            {/* Float Floating Element */}
            <div className="absolute -bottom-8 -right-8 p-5 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl animate-float hidden lg:block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Zap size={24} className="text-blue-400" />
                </div>
                <div className="pr-6">
                  <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Efficiency</div>
                  <div className="text-base text-white font-bold">+240% Speed</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, description, icon: Icon, delay }) => {
  return (
    <div className={`glass-card p-8 rounded-3xl group cursor-pointer animate-fade-in-up border border-white/40 bg-white/10 shadow-[0_0_25px_rgba(255,255,255,0.1)] hover:shadow-[0_0_35px_rgba(255,255,255,0.2)] hover:bg-white/20`} style={{ animationDelay: delay }}>
      <div className="w-14 h-14 rounded-2xl bg-white/30 border border-white/50 flex items-center justify-center mb-8 group-hover:bg-white/40 transition-all duration-300 relative overflow-hidden">
        <Icon size={26} className="text-white group-hover:text-electric-blue transition-colors relative z-10" />
        <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
      <h3 className="text-xl font-display font-semibold text-white mb-3 tracking-wide drop-shadow-md">{title}</h3>
      <p className="text-white/90 text-sm leading-relaxed font-medium">{description}</p>

      <div className="mt-8 flex items-center gap-2 text-xs font-bold text-white opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 drop-shadow-md">
        Learn more <ChevronRight size={14} />
      </div>
    </div>
  );
};

const GalaxyCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let particles = [];
    const colors = ['#9d00ff', '#f472b6', '#00e5ff'];
    
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
      init();
    };

    const init = () => {
      particles = [];
      const numParticles = Math.floor((width * height) / 10000);
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.5 + 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          life: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.02 + 0.01
        });
      }
    };

    const draw = () => {
      ctx.fillStyle = 'rgba(8, 8, 14, 0.3)';
      ctx.fillRect(0, 0, width, height);
      
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        
        p.life += p.speed;
        const alpha = Math.abs(Math.sin(p.life));
        
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4);
        gradient.addColorStop(0, `${p.color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.fillStyle = `${p.color}${Math.floor((alpha * 0.5 + 0.5) * 255).toString(16).padStart(2, '0')}`;
        ctx.arc(p.x, p.y, p.radius * 0.8, 0, Math.PI * 2);
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    init();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full -z-10" style={{ background: '#050508' }} />;
};

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    return ['home', 'signup', 'signin', 'forgot', 'dashboard', 'builder'].includes(hash) ? hash : 'home';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'signup', 'signin', 'forgot', 'dashboard'].includes(hash)) {
        setPage(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update hash when page changes
  useEffect(() => {
    if (page === 'home') {
      window.history.replaceState(null, '', window.location.pathname);
    } else {
      window.location.hash = page;
    }
  }, [page]);

  if (page === 'signup') {
    return (
      <AuthComponent
        onBack={() => setPage('home')}
        onSignIn={() => setPage('signin')}
        onSignUpSuccess={(userData) => {
          setUser(userData);
          setPage('dashboard');
        }}
      />
    );
  }

  if (page === 'signin') {
    return (
      <SignInCard
        onBack={() => setPage('home')}
        onSignUp={() => setPage('signup')}
        onForgotPassword={() => setPage('forgot')}
        onSignInSuccess={(userData) => {
          setUser(userData);
          setPage('dashboard');
        }}
      />
    );
  }

  if (page === 'forgot') {
    return (
      <ForgotPasswordCard
        onBack={() => setPage('signin')}
        onSignIn={() => setPage('signin')}
      />
    );
  }

  if (page === 'dashboard') {
    return <Dashboard onLogout={() => { setUser(null); setPage('home'); }} user={user} />;
  }


  return (
    <div id="platform" className="min-h-screen relative font-sans selection:bg-electric-blue/30 selection:text-white">
      <BackgroundVisuals />
      <Navbar onSignup={() => setPage('signup')} onSignin={() => setPage('signin')} setPage={setPage} />

      <main className="pt-24 pb-12 md:pt-32 flex flex-col justify-center min-h-[85vh] relative z-10 w-full overflow-hidden">
        <div className="absolute top-1/3 left-10 w-1 h-1 bg-electric-blue rounded-full shadow-[0_0_10px_#00e5ff] animate-pulse"></div>
        <div className="absolute top-1/2 right-20 w-1.5 h-1.5 bg-neon-purple rounded-full shadow-[0_0_12px_#9d00ff] animate-pulse delay-700"></div>
        <div className="absolute bottom-1/4 left-1/4 w-0.5 h-0.5 bg-white rounded-full opacity-50"></div>

        <div className="max-w-[1600px] mx-auto px-6 lg:px-16 w-full grid lg:grid-cols-12 gap-12 items-center">

          <div className="lg:col-span-8 flex flex-col items-start text-left relative z-10 pt-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] text-white tracking-tight mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] animate-hero-text">
              Where Intelligence <br /> Meets <span className="text-gradient-primary leading-tight pb-1 inline-block">Imagination</span>.
            </h1>

            <p className="text-lg md:text-xl text-white/80 font-light mb-10 max-w-lg leading-relaxed drop-shadow-lg animate-hero-text" style={{ animationDelay: '1.7s' }}>
              Break the boundaries of what's possible. Let your ideas take flight.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto animate-hero-text" style={{ animationDelay: '1.9s' }}>
              <button onClick={() => setPage('signup')} className="btn-primary px-8 py-4 rounded-xl text-base flex items-center justify-center gap-2 w-full sm:w-auto shadow-xl group">
                Explore Platform
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        <div className="relative w-full h-32 bg-gradient-to-b from-transparent to-[#0a0a16] -mb-1 z-20 pointer-events-none mt-6 md:mt-12"></div>

        <div className="relative min-h-screen z-20 bg-[#0a0a16] overflow-hidden flex items-center">
          
          {/* Full Screen Spline Background */}
          <div className="absolute inset-0 z-0 pointer-events-auto">
            <HeroSplineBackground />
          </div>

          {/* Organic Fading Glass Geometry: The Galaxy is visible behind, shining white/frosted on the left and fading to pure dark on the right */}
          
          {/* Base white fade over the left, fading into dramatic dark space on the right (Opaque to avoid gaps) */}
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-white/95 via-transparent to-[#0a0a16] pointer-events-none mix-blend-normal"></div>
          
          {/* Frosted Glass Overlay that smoothly fades out toward the center using mask-image */}
          <div 
            className="absolute inset-y-0 left-0 w-full lg:w-[80%] h-full bg-white/40 backdrop-blur-xl z-10 pointer-events-none"
            style={{ 
              WebkitMaskImage: 'linear-gradient(to right, black 30%, transparent 100%)', 
              maskImage: 'linear-gradient(to right, black 30%, transparent 100%)' 
            }}
          ></div>

          {/* Intense screen layer to make the left edge explicitly white and hide the galaxy there */}
          <div className="absolute inset-y-0 left-0 w-[50%] bg-gradient-to-r from-white to-transparent mix-blend-screen z-10 pointer-events-none"></div>

          {/* Color Bridge: Cosmic Aurora linking the White and the Black space */}
          <div className="absolute top-[-10%] left-[35%] w-[60vw] h-[120%] bg-blue-500/10 blur-[150px] z-10 pointer-events-none rounded-full transform -rotate-12"></div>
          <div className="absolute top-[30%] left-[50%] w-[50vw] h-[800px] bg-purple-500/10 blur-[150px] z-10 pointer-events-none rounded-full"></div>

          {/* Bottom Fade: Merging this section with the dark showcase sections below */}
          <div className="absolute bottom-0 left-0 w-full h-[200px] bg-gradient-to-b from-transparent to-[#0a0a16] z-20 pointer-events-none"></div>

          {/* Content Layer */}
          <div className="container mx-auto px-6 sm:px-12 md:px-16 lg:px-24 w-full max-w-[1600px] relative z-20 pointer-events-none pt-12">
            <div className="text-left text-gray-900 max-w-2xl pointer-events-auto relative">
              <div 
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur border border-purple-100 text-purple-700 font-bold tracking-wide text-xs uppercase mb-10 shadow-[0_10px_30px_rgba(168,85,247,0.15)] animate-fade-in-up" 
                style={{ animationFillMode: 'both', animationDelay: '100ms' }}
              >
                <Sparkles size={16} className="text-fuchsia-500 animate-[pulse_2s_ease-in-out_infinite]" />
                Lyzard Web Creation
              </div>

              <h2 
                className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold mb-8 leading-[1.1] tracking-tighter text-gray-900 animate-fade-in-up" 
                style={{ animationFillMode: 'both', animationDuration: '800ms', animationDelay: '300ms' }}
              >
                Unleash Your Ideas.<br />
                <span className="relative inline-block mt-3">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 relative z-10 font-black italic pr-4">
                    Build the Future.
                  </span>
                  <span className="absolute bottom-2 left-0 w-full h-4 bg-fuchsia-400/20 -z-10 transform -rotate-2 rounded-sm blur-[1px]"></span>
                </span>
              </h2>
              
              <p 
                className="text-lg md:text-xl mb-12 text-gray-700 font-medium leading-relaxed max-w-xl animate-fade-in-up" 
                style={{ animationFillMode: 'both', animationDuration: '800ms', animationDelay: '500ms' }}
              >
                Lyzard.ai transforms your vision into stunning web pages in seconds. Effortless, intelligent, and beautifully designed—your ideas deserve to shine. Step into the AI-powered era of web creation and make your digital dreams real.
              </p>
              
              <div 
                className="flex flex-col items-start animate-fade-in-up" 
                style={{ animationFillMode: 'both', animationDuration: '800ms', animationDelay: '700ms' }}
              >
                <button onClick={() => setPage('builder')} className="bg-gray-900 hover:bg-black text-white font-bold py-4 px-10 rounded-xl transition duration-300 w-full sm:w-auto shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.25)] hover:-translate-y-1 flex items-center justify-center gap-3 relative overflow-hidden group">
                  <span className="relative z-10 flex items-center gap-2">
                    Enter Builder Workspace
                    <ChevronRight size={18} className="text-blue-400 group-hover:translate-x-1 transition-transform" />
                  </span>
                  {/* Subtle hover shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite] z-0"></div>
                </button>
              </div>

            </div>
          </div>
        </div>

        <div id="models" className="bg-[#0a0a16] relative z-20 pb-20">
          
          {/* Showcase Sections with images from public */}
          <ShowcaseSection 
            image="/firstimagediv.png"
            title="Design the Unimaginable"
            description="Our AI-driven workspace provides the perfect environment to prototype, build, and deploy high-performance applications with ease."
            reverse={false}
            setPage={setPage}
          />

          <ShowcaseSection 
            image="/secimagediv.png"
            title="Global Infrastructure Scale"
            description="Connect to nodes worldwide with zero-latency overhead. Lyzard.ai scales your projects as fast as your ideas come to life."
            reverse={true}
            setPage={setPage}
          />

          <ShowcaseSection 
            image="/thrimagediv.png"
            title="Collaborate at Light Speed"
            description="Break down barriers between concepts and reality. Bring your team together in an ecosystem designed for peak creative performance."
            reverse={false}
            setPage={setPage}
          />

        </div>
        <div id="enterprise">
          <SocialConnect />
        </div>
        <Footer />
      </main>
    </div>
  );
}

export default App;
