import React from 'react';
import { motion } from 'framer-motion';
import logoImg from '../assets/logo.png';

const LyzardLogo = ({ className = "", size = 40, variant = "light", src }) => {
  const logoSrc = src || logoImg;
  const isDark = variant === "dark";
  
  return (
    <motion.div 
      className={`relative inline-flex items-center justify-center select-none cursor-pointer group ${className}`}
      initial={{ opacity: 0, scale: 0.8, y: 10, rotate: -5 }}
      animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
      transition={{ 
        duration: 1.5, 
        ease: [0.16, 1, 0.3, 1],
        delay: 0.2 
      }}
      whileHover={{ 
        scale: 1.12,
        rotateY: 15,
        rotateX: -10,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
      }}
      whileTap={{ scale: 0.92, rotateY: 0, rotateX: 0 }}
      style={{ perspective: "1000px" }}
    >
      {/* Designer Aura - Multi-layered glow */}
      <div className="absolute inset-0 -z-10 transition-all duration-1000 group-hover:scale-150">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-tr from-blue-400/40 via-purple-500/40 to-pink-400/40 blur-3xl opacity-20 group-hover:opacity-100 transition-opacity duration-700"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 bg-white/20 blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 delay-100 rounded-full" />
      </div>

      <div className="relative transform-gpu transition-transform duration-700 group-hover:shadow-[0_0_50px_-12px_rgba(168,85,247,0.5)] rounded-2xl">
        <motion.img 
          src={logoSrc} 
          alt="Lyzard AI Logo" 
          animate={{ 
            y: [0, -5, 0],
            rotateZ: [0, 1, -1, 0],
            filter: isDark 
              ? [
                  'drop-shadow(0 0 15px rgba(168, 85, 247, 0.3)) brightness(0.9)',
                  'drop-shadow(0 0 35px rgba(168, 85, 247, 0.7)) brightness(1.2)',
                  'drop-shadow(0 0 15px rgba(168, 85, 247, 0.3)) brightness(0.9)'
                ]
              : [
                  'drop-shadow(0 4px 6px rgba(0,0,0,0.05))',
                  'drop-shadow(0 12px 20px rgba(0,0,0,0.1))',
                  'drop-shadow(0 4px 6px rgba(0,0,0,0.05))'
                ]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ 
            height: size, 
            width: 'auto', 
            objectFit: 'contain',
            imageRendering: 'auto',
          }} 
          className="relative z-10 transition-all duration-700 group-hover:brightness-110"
        />
        
        {/* Cinematic Scanline / Light Sweep */}
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-xl">
            <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
                animate={{ translateX: ['-150%', '150%'] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
                style={{ skewX: '-35deg' }}
            />
            <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/20 to-transparent -translate-x-full"
                animate={{ translateX: ['-150%', '150%'] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, delay: 0.1, ease: "easeInOut" }}
                style={{ skewX: '-35deg' }}
            />
        </div>
      </div>
    </motion.div>
  );
};

export default LyzardLogo;
