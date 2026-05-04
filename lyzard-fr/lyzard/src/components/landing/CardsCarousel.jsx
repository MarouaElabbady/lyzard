import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../../lib/LanguageContext";
import { translations } from "../../lib/translations";

const cardImages = [
  "https://images.unsplash.com/photo-1686191128892-3b37add4c844?w=700&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=700&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=700&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c8ad?w=700&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=700&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1526378800651-c32d170fe6f8?w=700&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&q=80&auto=format&fit=crop",
];

export default function CardsCarousel({ onLoginClick }) {
  const { language } = useLanguage();
  const t = translations[language].carousel;

  const cards = t.cards.map((card, i) => ({
    ...card,
    id: `0${i + 1}`,
    image: cardImages[i]
  }));

  const infiniteCards = [...cards, ...cards];
  const trackRef = useRef(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const animFrameRef = useRef(null);
  const posRef = useRef(0);
  const CARD_W = 360;
  const GAP = 20;
  const SPEED = 0.7; // px per frame

  useEffect(() => {
    const totalWidth = cards.length * (CARD_W + GAP);

    const step = () => {
      if (!isPaused) {
        posRef.current += SPEED;
        if (posRef.current >= totalWidth) posRef.current = 0;
        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(-${posRef.current}px)`;
        }
      }
      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isPaused, cards.length]);

  return (
    <section id="creer" className="relative w-full bg-white py-28 overflow-hidden">
      {/* ── Header ── */}
      <div className="relative z-10 text-center mb-20 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-block bg-[#7C3AED]/10 text-[#7C3AED] font-bold text-[11px] uppercase tracking-[0.3em] px-4 py-1.5 rounded-full mb-6"
        >
          {t.tag}
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-black text-[32px] md:text-[48px] text-[#05050a] leading-[1.1] mb-4"
        >
          {t.titlePrefix}<span className="text-[#7C3AED]">{t.titleSuffix}</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gray-400 font-medium text-[16px]"
        >
          {t.subtitle}
        </motion.p>
      </div>

      {/* ── Carousel track ── */}
      <motion.div
        className="relative overflow-hidden"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => { setIsPaused(false); setHoveredId(null); }}
      >
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />

        <div
          ref={trackRef}
          className="flex will-change-transform"
          style={{ gap: 24, paddingLeft: 24, paddingRight: 24 }}
        >
          {infiniteCards.map((card, idx) => {
            const uid = `${card.id}-${idx}`;
            const isHovered = hoveredId === uid;

            return (
              <motion.div
                key={uid}
                onMouseEnter={() => setHoveredId(uid)}
                onMouseLeave={() => setHoveredId(null)}
                whileHover={{ y: -10 }}
                className="relative flex-shrink-0 rounded-[30px] overflow-hidden cursor-pointer group border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500"
                style={{ width: CARD_W, height: 500 }}
              >
                {/* Background image with parallax scale */}
                <motion.img
                  src={card.image}
                  alt={card.title}
                  animate={{ scale: isHovered ? 1.12 : 1 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Intelligent Overlay */}
                <div
                  className="absolute inset-0 transition-all duration-700"
                  style={{
                    background: isHovered
                      ? "linear-gradient(to top, rgba(12, 5, 25, 0.95) 40%, rgba(12, 5, 25, 0.2) 100%)"
                      : "linear-gradient(to top, rgba(0, 0, 0, 0.8) 20%, rgba(255, 255, 255, 0.05) 100%)",
                  }}
                />

                {/* Animated Number (outlined) */}
                <div
                  className="absolute top-8 right-8 font-black text-[86px] leading-none select-none pointer-events-none z-10"
                  style={{
                    WebkitTextStroke: isHovered ? "1.5px rgba(255,255,255,0.2)" : "1.5px rgba(255,255,255,0.15)",
                    color: "transparent",
                    transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                    opacity: isHovered ? 1 : 0.6,
                    transform: isHovered ? "scale(1.1) rotate(-5deg)" : "scale(1) rotate(0deg)",
                  }}
                >
                  {card.id}
                </div>

                {/* Vertical title (fades out) */}
                <AnimatePresence>
                  {!isHovered && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center p-8 z-10"
                    >
                      <span
                        className="text-white font-black text-[14px] tracking-[0.4em] uppercase whitespace-nowrap drop-shadow-lg"
                        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                      >
                        {card.title}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Glassmorphism content Reveal */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-8 pb-10 z-20 flex flex-col items-start transition-all duration-700"
                  style={{
                    transform: isHovered ? "translateY(0)" : "translateY(100px)",
                    opacity: isHovered ? 1 : 0,
                  }}
                >
                  <motion.div
                    animate={{ x: isHovered ? 0 : -20 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <h3 className="font-black text-white text-[20px] tracking-wider uppercase mb-3 drop-shadow-sm">
                      {card.title}
                    </h3>
                  </motion.div>
                  
                  <motion.p
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-white/70 text-[14px] leading-relaxed mb-8 font-medium line-clamp-3"
                  >
                    {card.description}
                  </motion.p>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onLoginClick}
                    className="flex items-center gap-2 bg-white text-[#05050a] text-[13px] font-bold px-6 py-3 rounded-2xl shadow-xl transition-all hover:bg-[#7C3AED] hover:text-white cursor-pointer"
                  >
                    {card.cta}
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Active accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[5px] bg-[#7C3AED] z-30"
                  initial={{ width: 0 }}
                  animate={{ width: isHovered ? "100%" : 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
