import React from "react";
import Masonry from "react-masonry-css";
import { motion } from "framer-motion";
import { Upload, MoreHorizontal } from "lucide-react";
import { useLanguage } from "../../lib/LanguageContext";
import { translations } from "../../lib/translations";

const getCards = (t) => [
  { id: 1,  title: t.cardTitles[0],       image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fstripe.com?w=600&h=900",       height: 350 },
  { id: 2,  title: t.cardTitles[1],      image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fwebflow.com?w=600&h=900",      height: 480 },
  { id: 3,  title: t.cardTitles[2],           image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fshopify.com?w=600&h=900",      height: 300 },
  { id: 4,  title: t.cardTitles[3],              image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Flinear.app?w=600&h=900",       height: 400 },
  { id: 5,  title: t.cardTitles[4],       image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fframer.com?w=600&h=900",       height: 380 },
  { id: 6,  title: t.cardTitles[5],       image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fnotion.so?w=600&h=900",        height: 310 },
  { id: 7,  title: t.cardTitles[6],         image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fhubspot.com?w=600&h=900",      height: 460 },
  { id: 8,  title: t.cardTitles[7],       image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Ffigma.com?w=600&h=900",        height: 280 },
  { id: 9,  title: t.cardTitles[8],           image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fvercel.com?w=600&h=900",       height: 430 },
  { id: 10, title: t.cardTitles[9],        image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fintercom.com?w=600&h=900",     height: 350 },
  { id: 11, title: t.cardTitles[10],    image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fmailchimp.com?w=600&h=900",    height: 410 },
  { id: 12, title: t.cardTitles[11],        image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fsupabase.com?w=600&h=900",     height: 290 },
];

export default function MasonryGrid({ onLoginClick }) {
  const { language } = useLanguage();
  const t = translations[language].masonry;
  const cards = getCards(t);

  const breakpointColumnsObj = {
    default: 5,
    1536: 4,
    1024: 3,
    768: 2,
    500: 1
  };

  return (
    <section id="templates" className="relative w-full bg-[#f8fbff] py-24">
      {/* Decorative dots for variety */}
      <div className="absolute inset-0 z-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }}></div>

      <div className="relative z-10 text-center max-w-4xl mx-auto mb-20 px-6">
        <h2 className="text-6xl md:text-7xl font-black mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            {t.title}
          </span>
        </h2>
        <p className="text-xl md:text-2xl text-[#0c4a6e]/60 font-medium max-w-2xl mx-auto">
          {t.subtitle}
        </p>
      </div>

      <div className="relative z-10 px-6 max-w-[1800px] mx-auto">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: (index % 5) * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="group relative rounded-2xl mb-4 overflow-hidden cursor-zoom-in"
            style={{ height: card.height }}
          >
            {/* Image réelle */}
            <img 
              src={card.image + "?auto=format&fit=crop&w=600&q=80"} 
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300" 
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              
              {/* Principal Action Button (Top Right) */}
              <div className="absolute top-4 right-4 translate-y-[-10px] group-hover:translate-y-0 transition-transform duration-200">
                <button 
                  onClick={onLoginClick}
                  className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-[15px] px-5 py-2.5 rounded-[12px] shadow-lg z-10 cursor-pointer flex items-center gap-2"
                >
                  <span>{t.cta}</span>
                  <svg className="w-4 h-4 translate-y-[1px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </button>
              </div>

              {/* Elements du bas (Titre + Actions) */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between translate-y-[10px] group-hover:translate-y-0 transition-transform duration-200">
                
                {/* Titre en bas à gauche */}
                <div className="bg-white/95 backdrop-blur-md text-black text-[13px] font-bold px-3.5 py-2 rounded-[10px] flex items-center gap-2 max-w-[65%] shadow-md">
                  <div className="w-1.5 h-1.5 bg-[#7C3AED] rounded-full animate-pulse" />
                  <span className="truncate">{card.title}</span>
                </div>

                {/* Boutons d'action en bas à droite */}
                <div className="flex gap-2">
                  <button className="w-8 h-8 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center text-black shadow-sm cursor-pointer hover:scale-105 transition-transform">
                    <Upload className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center text-black shadow-sm cursor-pointer hover:scale-105 transition-transform">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>
            
          </motion.div>
        ))}
      </Masonry>
      </div>
    </section>
  );
}
