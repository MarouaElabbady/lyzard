import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useLanguage } from "../../lib/LanguageContext";
import { translations } from "../../lib/translations";

const previewImages = [
  "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fstripe.com?w=900&h=600",
  "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fframer.com?w=900&h=600",
  "https://s.wordpress.com/mshots/v1/https%3A%2F%2Flinear.app?w=900&h=600",
  "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fvercel.com?w=900&h=600",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.13 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } },
};

function CheckIcon() {
  return (
    <svg className="w-7 h-7 flex-shrink-0 mt-0.5" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#22c55e" opacity="0.15" />
      <circle cx="16" cy="16" r="11" fill="#22c55e" opacity="0.25" />
      <path d="M10 16.5l4.5 4.5 7.5-9" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function WhySection() {
  const { language } = useLanguage();
  const t = translations[language].whySection;
  const features = t.features;

  const [imgIndex, setImgIndex] = useState(0);
  const sectionRef = useRef(null);

  // Cinematic 3D Scroll Effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Dramatic 3D cinematic rotation as you scroll past
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [25, 0, -25]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-25, 0, 25]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  useEffect(() => {
    const t = setInterval(() => setImgIndex((p) => (p + 1) % previewImages.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={sectionRef} id="comment-ca-marche" className="relative w-full bg-[#f0f9ff] overflow-hidden">
      {/* Background accents - Subtle gradients for depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[-5%] top-[-10%] w-[600px] h-[600px] rounded-full bg-blue-200/40 blur-[120px]" />
        <div className="absolute right-[-5%] bottom-[-10%] w-[500px] h-[500px] rounded-full bg-blue-100/60 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-14 pt-24 pb-12 md:pt-32 md:pb-16 flex flex-col md:flex-row items-center gap-16 md:gap-24">

        {/* ── LEFT: Text + Checklist ── */}
        <div className="flex-1 min-w-0">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="text-blue-600 font-bold text-[13px] uppercase tracking-widest mb-4"
          >
            {t.title}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className="font-bold text-[30px] md:text-[42px] leading-[1.22] mb-12"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              {t.subtitle}
            </span>
          </motion.h2>

          <motion.ul
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-6"
          >
            {features.map((f, i) => (
              <motion.li key={i} variants={itemVariants} className="flex items-start gap-4">
                <CheckIcon />
                <div>
                  <p className="font-bold text-[#0c4a6e] text-[16px] leading-snug">{f.title}</p>
                  <p className="text-[#0c4a6e]/60 text-[14px] italic mt-0.5 font-medium">{f.desc}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* ── RIGHT: Browser / Screen Mockup ── */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
          className="flex-1 min-w-0 flex justify-center md:justify-end"
          style={{ perspective: 1500 }}
        >
          <motion.div 
            className="relative w-full max-w-[580px]"
            style={{ 
              rotateX, 
              rotateY, 
              scale,
              transformStyle: "preserve-3d" 
            }}
          >
            {/* Purple glow behind */}
            <div className="absolute -inset-4 bg-[#7C3AED]/25 blur-[70px] rounded-3xl" style={{ transform: "translateZ(-50px)" }} />

            {/* Browser frame */}
            <div className="relative z-10 rounded-[18px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)] border border-white/10" style={{ transform: "translateZ(20px)" }}>

              {/* Chrome bar */}
              <div className="bg-[#1a1a28] px-4 py-3 flex items-center gap-3 border-b border-white/[0.07]">
                {/* Traffic lights */}
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                {/* URL bar */}
                <div className="flex-1 bg-[#0e0e16] rounded-md px-3 py-1.5 flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-[#22c55e] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="3" y="11" width="18" height="11" rx="2" strokeWidth="2"/>
                    <path d="M7 11V7a5 5 0 0110 0v4" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span className="text-white/40 text-[12px] font-mono truncate">lyzard.ai/preview/my-landing-page</span>
                </div>
                {/* Lyzard AI badge */}
                <div className="flex items-center gap-1.5 bg-[#7C3AED]/20 border border-[#7C3AED]/30 rounded-full px-2.5 py-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] animate-pulse" />
                  <span className="text-[#a78bfa] text-[11px] font-semibold">AI Generated</span>
                </div>
              </div>

              {/* Screen content: animated page preview */}
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/10" }}>
                <AnimatePresence mode="popLayout">
                  <motion.img
                    key={imgIndex}
                    src={previewImages[imgIndex]}
                    alt="Landing page générée par Lyzard AI"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                </AnimatePresence>

                {/* Bottom fade */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0e0e16] to-transparent z-10 pointer-events-none" />
              </div>

            </div>

            <div className="flex justify-center gap-2 mt-4 relative z-10" style={{ transform: "translateZ(30px)" }}>
              {previewImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setImgIndex(i)}
                  className={`rounded-full transition-all duration-400 cursor-pointer ${
                    i === imgIndex
                      ? "w-5 h-1.5 bg-[#7C3AED]"
                      : "w-1.5 h-1.5 bg-black/20 hover:bg-black/40"
                  }`}
                />
              ))}
            </div>

          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
