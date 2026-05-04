import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from "../../lib/LanguageContext";
import { translations } from "../../lib/translations";

const WhoIsItFor = () => {
  const { language } = useLanguage();
  const t = translations[language].whoIsItFor;

  const personasData = [
    {
      id: 1,
      name: t.personas[0],
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&h=300&auto=format&fit=crop",
    },
    {
      id: 2,
      name: t.personas[1],
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&h=300&auto=format&fit=crop",
    },
    {
      id: 3,
      name: t.personas[2],
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&h=300&auto=format&fit=crop",
    },
    {
      id: 4,
      name: t.personas[3],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&h=300&auto=format&fit=crop",
    },
    {
      id: 5,
      name: t.personas[4],
      image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=300&h=300&auto=format&fit=crop",
    },
  ];

  return (
    <section id="for-whom" className="relative w-full min-h-[850px] bg-[#fdf2f8] flex flex-col items-center overflow-hidden pt-8 pb-16">
      {/* Dot Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20" style={{
        backgroundImage: 'radial-gradient(#db2777 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}></div>

      {/* Content Header */}
      <div className="relative z-30 text-center max-w-4xl mb-20 px-6 mt-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-6xl md:text-8xl font-black mb-2"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
            {t.title}
          </span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-xl md:text-2xl text-[#831843]/60 font-medium max-w-none mx-auto px-4"
        >
          {t.subtitle}
        </motion.p>
      </div>

      {/* Central Decorative Circles only */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-10 h-[400px] flex items-center justify-center"
      >
        {/* Rotating Dashed Circle Decorations */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute w-[300px] h-[300px] border-2 border-dashed border-pink-200 rounded-full opacity-40"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute w-[450px] h-[450px] border border-dotted border-purple-200 rounded-full opacity-20"
        />

        {/* Central Core (Noyau) */}
        <div className="relative z-30 flex items-center justify-center p-10 bg-white rounded-full shadow-2xl border border-pink-50">
          <div className="text-3xl font-black tracking-tighter text-[#831843] flex items-center gap-2">
            LYZARD <span className="w-8 h-8 bg-gradient-to-tr from-pink-500 to-purple-500 rounded-lg shadow-lg flex items-center justify-center text-white text-lg">AI</span>
          </div>
        </div>

        {/* Orbiting Personas Container */}
        <div className="absolute inset-0 z-20 hidden md:flex items-center justify-center pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="relative w-[1px] h-[1px]"
          >
            {personasData.map((persona, index) => {
              const angle = (index / personasData.length) * (2 * Math.PI);
              const radius = 260; 
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <motion.div
                  key={persona.id}
                  className="absolute flex flex-col items-center pointer-events-auto"
                  style={{
                    left: '50%',
                    top: '50%',
                    x: x - 40,
                    y: y - 40,
                  }}
                >
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                    className="relative group"
                  >
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-white shadow-xl transition-transform duration-500 group-hover:scale-110">
                      <img 
                        src={persona.image} 
                        alt={persona.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white text-[#831843] font-bold px-4 py-1.5 rounded-full shadow-lg border border-pink-50 group-hover:bg-pink-600 group-hover:text-white transition-colors duration-300 text-[11px]">
                      {persona.name}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>

      {/* Mobile view personas list */}
      <div className="md:hidden grid grid-cols-2 gap-8 px-6 mt-12 z-10">
        {personasData.map((persona) => (
          <div key={persona.id} className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-lg">
              <img src={persona.image} alt={persona.name} className="w-full h-full object-cover" />
            </div>
            <div className="mt-2 text-[#831843] font-bold text-sm text-center">{persona.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhoIsItFor;
