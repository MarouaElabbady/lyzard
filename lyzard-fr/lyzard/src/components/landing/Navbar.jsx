import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import LyzardLogo from "../LyzardLogo";
import { useLanguage } from "../../lib/LanguageContext";
import { translations } from "../../lib/translations";
import { Languages, ArrowRight, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar({ onLoginClick }) {
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language].nav;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [navStyle, setNavStyle] = useState({
    bg: "bg-white/40",
    border: "border-white/30",
    text: "text-gray-600",
    hoverText: "hover:text-black",
    hoverBg: "hover:bg-black/[0.03]",
    buttonBg: "bg-black/[0.03]",
    buttonBorder: "border-black/5",
    buttonText: "text-gray-700",
    isDark: false
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      const navbarOffset = 80; // approximate height + offset

      const sections = [
        { id: 'footer', isTag: true, bg: 'bg-[#05050a]/85', border: 'border-white/10', text: 'text-gray-300', hoverText: 'hover:text-white', hoverBg: 'hover:bg-white/[0.05]', buttonBg: 'bg-white/[0.05]', buttonBorder: 'border-white/10', buttonText: 'text-gray-200', isDark: true },
        { id: 'contact', bg: 'bg-[#f0f9ff]/85', border: 'border-[#f0f9ff]/50', text: 'text-[#0c4a6e]/70', hoverText: 'hover:text-[#0c4a6e]', hoverBg: 'hover:bg-[#0c4a6e]/[0.05]', buttonBg: 'bg-[#0c4a6e]/[0.03]', buttonBorder: 'border-[#0c4a6e]/10', buttonText: 'text-[#0c4a6e]', isDark: false },
        { id: 'templates', bg: 'bg-[#f8fbff]/85', border: 'border-[#f8fbff]/50', text: 'text-slate-600', hoverText: 'hover:text-slate-900', hoverBg: 'hover:bg-slate-900/[0.03]', buttonBg: 'bg-slate-900/[0.03]', buttonBorder: 'border-slate-900/5', buttonText: 'text-slate-700', isDark: false },
        { id: 'tarifs', bg: 'bg-[#f0f9ff]/85', border: 'border-[#f0f9ff]/50', text: 'text-[#0c4a6e]/70', hoverText: 'hover:text-[#0c4a6e]', hoverBg: 'hover:bg-[#0c4a6e]/[0.05]', buttonBg: 'bg-[#0c4a6e]/[0.03]', buttonBorder: 'border-[#0c4a6e]/10', buttonText: 'text-[#0c4a6e]', isDark: false },
        { id: 'creer', bg: 'bg-white/85', border: 'border-white/50', text: 'text-gray-600', hoverText: 'hover:text-black', hoverBg: 'hover:bg-black/[0.03]', buttonBg: 'bg-black/[0.03]', buttonBorder: 'border-black/5', buttonText: 'text-gray-700', isDark: false },
        { id: 'for-whom', bg: 'bg-[#fdf2f8]/85', border: 'border-[#fdf2f8]/50', text: 'text-[#831843]/70', hoverText: 'hover:text-[#831843]', hoverBg: 'hover:bg-[#831843]/[0.05]', buttonBg: 'bg-[#831843]/[0.03]', buttonBorder: 'border-[#831843]/10', buttonText: 'text-[#831843]', isDark: false },
        { id: 'comment-ca-marche', bg: 'bg-[#f0f9ff]/85', border: 'border-[#f0f9ff]/50', text: 'text-[#0c4a6e]/70', hoverText: 'hover:text-[#0c4a6e]', hoverBg: 'hover:bg-[#0c4a6e]/[0.05]', buttonBg: 'bg-[#0c4a6e]/[0.03]', buttonBorder: 'border-[#0c4a6e]/10', buttonText: 'text-[#0c4a6e]', isDark: false },
        { id: 'generer', bg: 'bg-white/85', border: 'border-white/50', text: 'text-gray-600', hoverText: 'hover:text-black', hoverBg: 'hover:bg-black/[0.03]', buttonBg: 'bg-black/[0.03]', buttonBorder: 'border-black/5', buttonText: 'text-gray-700', isDark: false },
      ];

      let currentStyle = sections[7]; // Default to white

      for (const sec of sections) {
        const el = sec.isTag ? document.querySelector(sec.id) : document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= navbarOffset && rect.bottom >= navbarOffset) {
            currentStyle = sec;
            break;
          }
        }
      }

      setNavStyle({
        bg: scrollY > 20 ? currentStyle.bg : "bg-white/40",
        border: scrollY > 20 ? currentStyle.border : "border-white/30",
        text: currentStyle.text,
        hoverText: currentStyle.hoverText,
        hoverBg: currentStyle.hoverBg,
        buttonBg: currentStyle.buttonBg,
        buttonBorder: currentStyle.buttonBorder,
        buttonText: currentStyle.buttonText,
        isDark: currentStyle.isDark
      });
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // init
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: t.howItWorks, id: 'comment-ca-marche' },
    { name: t.forWhom, id: 'for-whom' },
    { name: t.templates, id: 'templates' },
    { name: t.create, id: 'creer' },
    { name: t.pricing, id: 'tarifs' },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4 md:py-6 pointer-events-none">
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`
          pointer-events-auto
          relative w-full max-w-6xl
          transition-all duration-700 ease-in-out
          ${isScrolled 
            ? `${navStyle.bg} backdrop-blur-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.12)] ${navStyle.border} py-2.5` 
            : `${navStyle.bg} backdrop-blur-md ${navStyle.border} py-4`
          }
          border rounded-[28px] px-8 overflow-hidden
        `}
      >
        {/* Traveling light beam effect - Only visible when scrolled */}
        <AnimatePresence>
          {isScrolled && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none"
            >
              <motion.div 
                className="absolute top-0 left-0 h-[2px] w-[20%] bg-gradient-to-r from-transparent via-purple-400 to-transparent"
                animate={{ left: ["-20%", "120%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center">
            <a 
              href="#" 
              onClick={(e) => scrollToSection(e, 'generer')} 
              className="flex items-center group transition-all -ml-6"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-purple-400/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <LyzardLogo size={60} variant={navStyle.isDark ? "light" : "dark"} className="relative z-10 hover:opacity-100 transition-all duration-500 group-hover:scale-110 group-active:scale-95" />
              </div>
            </a>
            
            <div className="hidden lg:flex items-center ml-4 gap-1">
              {navLinks.map((link) => (
                link.to ? (
                  <Link 
                    key={link.to}
                    to={link.to}
                    className={`relative px-3.5 py-2.5 text-[13px] font-bold ${navStyle.text} ${navStyle.hoverText} transition-all rounded-full ${navStyle.hoverBg} group overflow-hidden whitespace-nowrap`}
                  >
                    <span className="relative z-10">{link.name}</span>
                    <motion.span 
                      className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-purple-500/5 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                    />
                    <motion.span 
                      className="absolute bottom-2 left-5 right-5 h-[1.5px] bg-gradient-to-r from-blue-400 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
                    />
                  </Link>
                ) : (
                  <a 
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => scrollToSection(e, link.id)}
                    className={`relative px-3.5 py-2.5 text-[13px] font-bold ${navStyle.text} ${navStyle.hoverText} transition-all rounded-full ${navStyle.hoverBg} group overflow-hidden whitespace-nowrap`}
                  >
                    <span className="relative z-10">{link.name}</span>
                    <motion.span 
                      className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-purple-500/5 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                    />
                    <motion.span 
                      className="absolute bottom-2 left-5 right-5 h-[1.5px] bg-gradient-to-r from-blue-400 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
                    />
                  </a>
                )
              ))}
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleLanguage}
              className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl ${navStyle.buttonBg} border ${navStyle.buttonBorder} transition-all ${navStyle.buttonText} font-black text-[11px] uppercase tracking-wider`}
            >
              <Languages className="w-4 h-4 text-purple-500" />
              {language}
            </motion.button>
            
            <div className={`h-6 w-px ${navStyle.isDark ? 'bg-white/10' : 'bg-black/10'} mx-1 hidden md:block`} />

            <button 
              onClick={onLoginClick}
              className={`hidden md:block text-[13px] font-black ${navStyle.buttonText} hover:text-purple-500 px-3 py-2 transition-all hover:translate-y-[-1px] whitespace-nowrap`}
            >
              {t.signIn}
            </button>

            <Link 
              to="/signup" 
              className="relative group px-7 py-3 rounded-2xl text-[13px] font-black overflow-hidden transition-all hover:scale-[1.05] active:scale-[0.95] shadow-xl shadow-purple-500/25"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x" />
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 flex items-center gap-2.5 text-white whitespace-nowrap">
                {t.signUp}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              className={`lg:hidden p-2.5 rounded-xl ${navStyle.buttonBg} ${navStyle.buttonText} transition-all`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="pt-6 pb-8 flex flex-col gap-3 border-t border-black/5 mt-5">
                {navLinks.map((link) => (
                  link.to ? (
                    <Link 
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-5 py-4 text-[17px] font-black text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-2xl transition-all flex items-center justify-between group"
                    >
                      {link.name}
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
                    </Link>
                  ) : (
                    <a 
                      key={link.id}
                      href={`#${link.id}`}
                      onClick={(e) => scrollToSection(e, link.id)}
                      className="px-5 py-4 text-[17px] font-black text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-2xl transition-all flex items-center justify-between group"
                    >
                      {link.name}
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
                    </a>
                  )
                ))}
                <div className="flex items-center justify-between px-5 mt-6 pt-6 border-t border-black/5">
                  <button onClick={toggleLanguage} className="flex items-center gap-2.5 font-black uppercase text-gray-700 bg-black/[0.03] px-4 py-2.5 rounded-2xl border border-black/5">
                    <Languages className="w-5 h-5 text-purple-500" />
                    {language === 'fr' ? 'English' : 'Français'}
                  </button>
                  <button onClick={onLoginClick} className="font-black text-purple-600 text-[17px]">
                    {t.signIn}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
