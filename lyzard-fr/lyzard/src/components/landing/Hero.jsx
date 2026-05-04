import { useEffect, useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "../../lib/LanguageContext";
import { translations } from "../../lib/translations";

export default function Hero() {
  const { language } = useLanguage();
  const t = translations[language].hero;
  
  const ideas = [
    { 
      text: t.ideas[0], 
      textColor: "text-[#c28b00]", 
      bgColor: "bg-[#c28b00]",
      images: [
        "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fstripe.com?w=400&h=600",
        "https://s.wordpress.com/mshots/v1/https%3A%2F%2Flinear.app?w=400&h=600",
        "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fvercel.com?w=400&h=600",
        "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fframer.com?w=400&h=600",
        "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fsupabase.com?w=400&h=600"
      ]
    },
    { 
      text: t.ideas[1], 
      textColor: "text-[#618c7b]", 
      bgColor: "bg-[#618c7b]",
      images: [
        "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fmailchimp.com?w=400&h=600",
        "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fhubspot.com?w=400&h=600",
        "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fwebflow.com?w=400&h=600",
        "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fconvertkit.com?w=400&h=600",
        "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fnotion.so?w=400&h=600"
      ]
    },
    { 
      text: t.ideas[2], 
      textColor: "text-[#0076D3]", 
      bgColor: "bg-[#0076D3]",
      images: [
        "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fshopify.com?w=400&h=600",
        "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fallbirds.com?w=400&h=600",
        "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fgymshark.com?w=400&h=600",
        "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fglossier.com?w=400&h=600",
        "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fsquarespace.com?w=400&h=600"
      ]
    },
    { 
      text: t.ideas[3], 
      textColor: "text-[#407a57]", 
      bgColor: "bg-[#407a57]",
      images: [
        "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fapple.com?w=400&h=600",
        "https://s.wordpress.com/mshots/v1/https%3A%2F%2Ffigma.com?w=400&h=600",
        "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fintercom.com?w=400&h=600",
        "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fdropbox.com?w=400&h=600",
        "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fslack.com?w=400&h=600"
      ]
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const heroRef = useRef(null);

  // Cinematic 3D Scroll Effect
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroRotateX = useTransform(scrollYProgress, [0, 1], [0, 35]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((p) => (p + 1) % ideas.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [ideas.length]);

  const columns = [
    { id: 0, className: "hidden lg:block w-[240px] h-[340px] -translate-y-4", delay: 0.1 },
    { id: 1, className: "w-[280px] sm:w-[320px] h-[280px] -translate-y-16", delay: 0.2 },
    { id: 2, className: "hidden sm:block w-[240px] h-[320px] -translate-y-10", delay: 0.3 },
    { id: 3, className: "hidden md:block w-[300px] h-[380px] -translate-y-6", delay: 0.4 },
    { id: 4, className: "hidden xl:block w-[220px] h-[300px] -translate-y-2", delay: 0.5 },
  ];

  return (
    <section ref={heroRef} id="generer" className="relative pt-[140px] flex flex-col items-center overflow-hidden bg-white min-h-[85vh] justify-between" style={{ perspective: 1500 }}>
      
      {/* Titre Animé principal */}
      <motion.div 
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
        className="text-center md:px-0 px-6 z-20"
      >
        <h1 className="font-semibold text-5xl md:text-[64px] tracking-tight leading-[1.25] text-[#111] mb-8">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            {t.titlePrefix}
          </span>
          <br />
          <div className="h-[1.5em] relative w-full flex justify-center mt-2">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={currentIndex}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
                className={`absolute inline-block w-full ${ideas[currentIndex].textColor}`}
              >
                {ideas[currentIndex].text}
              </motion.span>
            </AnimatePresence>
          </div>
        </h1>

        <div className="flex gap-3 justify-center mb-10">
          {ideas.map((idea, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors duration-500 ${
                index === currentIndex ? idea.bgColor : "bg-[#e1e1e1]"
              }`}
            />
          ))}
        </div>
      </motion.div>

      <motion.div 
        className="relative w-full h-[420px] flex justify-center items-end gap-5 px-4 mt-auto"
        style={{ 
          rotateX: heroRotateX, 
          scale: heroScale, 
          opacity: heroOpacity,
          transformOrigin: "bottom center",
          transformStyle: "preserve-3d"
        }}
      >
        
        {columns.map((col, i) => (
          <div key={col.id} className={`${col.className} rounded-[24px] overflow-hidden relative flex-shrink-0 bg-gray-100 shadow-sm border border-black/[0.03]`}>
            {(i === 0 || i === 3) && (
              <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none" />
            )}

            <AnimatePresence mode="popLayout">
              <motion.img
                key={currentIndex}
                initial={{ y: 500 }}
                animate={{ y: 0 }}
                exit={{ y: -500 }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.65, 0, 0.35, 1],
                  delay: col.delay
                }}
                src={ideas[currentIndex].images[i]}
                alt="AI Landing Page builder"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
          </div>
        ))}

         <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-white via-white/95 to-transparent pointer-events-none z-20" />
         
         <div className="absolute bottom-[90px] left-1/2 -translate-x-1/2 z-30" style={{ transform: "translateZ(50px)" }}>
           <button className={`w-14 h-14 rounded-full flex items-center justify-center text-white transition-colors duration-700 shadow-xl cursor-pointer hover:opacity-90 ${ideas[currentIndex].bgColor}`}>
             <ChevronDown className="w-7 h-7 stroke-[3]" />
           </button>
         </div>
      </motion.div>

      <div className="w-full bg-[#f0f9ff] hover:bg-[#e0f2fe] py-4 flex items-center justify-center cursor-pointer transition-colors z-30 relative border-t border-blue-100">
        <span className="font-semibold flex items-center gap-1.5 text-[16px] bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
          {t.banner} <ChevronDown className="w-5 h-5 text-purple-400 stroke-[3]" />
        </span>
      </div>
    </section>
  );
}
