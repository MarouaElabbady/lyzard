import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Check, Loader2 } from 'lucide-react';
import LyzardLogo from '../LyzardLogo';
import { useLanguage } from "../../lib/LanguageContext";
import { translations } from "../../lib/translations";

const TwitterIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
  </svg>
);

const GithubIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
  </svg>
);

export default function Footer({ onLoginClick }) {
  const { language } = useLanguage();
  const t = translations[language].footer;
  const currentYear = new Date().getFullYear();

  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail('');
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }, 1000);
  };

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
    }
  };

  const getSectionId = (linkName) => {
    const name = linkName.toLowerCase();
    if (name.includes('fonctionnalités') || name.includes('features')) return 'comment-ca-marche';
    if (name.includes('modèles') || name.includes('templates')) return 'templates';
    if (name.includes('tarifs') || name.includes('pricing')) return 'tarifs';
    if (name.includes('entreprise') || name.includes('enterprise')) return 'tarifs';
    if (name.includes('contact')) return 'contact';
    return null;
  };

  return (
    <footer className="bg-[#05050a] text-white border-t border-white/5 relative overflow-hidden">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-[#7C3AED]/40 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[150px] bg-[#7C3AED]/5 blur-[100px] pointer-events-none" />

      {/* === Call to Action Section === */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 pt-24 pb-16 border-b border-white/5 text-center flex flex-col items-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-6"
        >
          {t.ctaTitle} <br className="hidden md:block" />
          <span className="text-gray-400">{t.ctaSubtitle}</span>
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-4"
        >
          <button 
            onClick={onLoginClick}
            className="group relative flex items-center gap-2 px-6 py-3 rounded-md font-bold overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400" />
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 text-white flex items-center gap-2">
              {t.ctaButton}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          <button 
            onClick={(e) => scrollToSection(e, 'tarifs')}
            className="flex items-center gap-2 bg-transparent text-white border border-white/20 px-6 py-3 rounded-md font-medium hover:bg-white/5 transition-colors cursor-pointer"
          >
            {t.contactSales}
          </button>
        </motion.div>
      </div>

      {/* === Main Footer Links === */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-8">
          
          <div className="col-span-2 lg:col-span-2 flex flex-col items-start pr-0 lg:pr-12">
            <LyzardLogo size={100} variant="dark" className="mb-6" />
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-xs">
              {t.tagline}
            </p>
            
            <form className="w-full max-w-sm" onSubmit={handleSubscribe}>
              <p className="text-sm font-medium text-white mb-3">{t.subscribe}</p>
              <div className="relative flex items-center">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting || isSuccess}
                  placeholder={t.emailPlaceholder}
                  className="w-full bg-white/5 border border-white/10 rounded-md py-2.5 pl-3 pr-10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors disabled:opacity-50"
                />
                <button 
                  type="submit" 
                  disabled={isSubmitting || isSuccess}
                  className={`absolute right-1 w-8 h-8 flex items-center justify-center rounded transition-all ${isSuccess ? 'bg-emerald-500/20 text-emerald-400' : 'text-gray-400 hover:text-white cursor-pointer'}`}
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : isSuccess ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
              </div>
              {isSuccess && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-emerald-400 text-xs mt-2"
                >
                  {language === 'fr' ? 'Merci pour votre abonnement !' : 'Thanks for subscribing!'}
                </motion.p>
              )}
            </form>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-white text-sm tracking-wide mb-3">{t.sections.product}</h3>
            {t.links.product.map((link, i) => {
              const sectionId = getSectionId(link.name);
              return (
                <a 
                  key={i} 
                  href={sectionId ? `#${sectionId}` : "#"} 
                  onClick={sectionId ? (e) => scrollToSection(e, sectionId) : undefined}
                  className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  {link.name}
                  {link.badge && (
                    <span className="bg-[#7C3AED]/20 text-[#a78bfa] text-[10px] px-1.5 py-0.5 rounded font-medium">{link.badge}</span>
                  )}
                </a>
              );
            })}
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-white text-sm tracking-wide mb-3">{t.sections.resources}</h3>
            {t.links.resources.map((link, i) => (
              link === "Documentation" ? (
                <Link key={i} to="/documentation" className="text-sm text-gray-400 hover:text-white transition-colors">
                  {link}
                </Link>
              ) : (
                <a key={i} href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  {link}
                </a>
              )
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-white text-sm tracking-wide mb-3">{t.sections.company}</h3>
            {t.links.company.map((link, i) => (
              <a key={i} href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                {link}
              </a>
            ))}
          </div>

        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-6">
            <p className="text-sm text-gray-500">
              © {currentYear} Lyzard AI Inc.
            </p>
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 transition-colors cursor-pointer">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              {t.status}
            </div>
          </div>

          <div className="flex items-center gap-5">
            <a href="https://twitter.com/lyzardai" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" aria-label="Twitter">
              <TwitterIcon className="w-4 h-4" />
            </a>
            <a href="https://github.com/lyzardai" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" aria-label="GitHub">
              <GithubIcon className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com/company/lyzardai" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" aria-label="LinkedIn">
              <LinkedinIcon className="w-4 h-4" />
            </a>
          </div>
          
        </div>
      </div>
      
    </footer>
  );
}
