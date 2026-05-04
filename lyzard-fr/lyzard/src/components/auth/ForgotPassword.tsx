'use client'
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowRight, ArrowLeft, KeyRound, CheckCircle2 } from 'lucide-react';
import LyzardLogo from '../LyzardLogo';
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "file:text-foreground placeholder:text-white/30 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-10 w-full min-w-0 rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-base shadow-xs transition-all outline-none pl-10 focus:border-white/20 focus:bg-white/10 text-white md:text-sm",
        className
      )}
      {...props}
    />
  )
}

import { useLanguage } from '../../lib/LanguageContext';
import { translations } from '../../lib/translations';

export function ForgotPasswordComponent() {
  const { language } = useLanguage();
  const t = translations[language].auth;

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [focusedInput, setFocusedInput] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen w-screen bg-black relative overflow-hidden flex items-center justify-center">
      {/* Back to Login Button */}
      <div className="fixed top-4 left-4 z-20 md:left-6 md:top-6">
          <Link to="/login" className="flex items-center gap-2 group transition-all">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg group-hover:bg-white/20 group-hover:border-white/30 transition-all duration-300">
                  <ArrowLeft className="w-5 h-5 text-blue-400 group-hover:-translate-x-0.5 transition-all" />
              </div>
              <span className="text-sm font-bold tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:opacity-80 transition-all">{t.backToLogin}</span>
          </Link>
      </div>

      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/40 via-purple-700/50 to-black" />
      
      {/* Subtle noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-soft-light" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }}
      />

      {/* Top radial glow */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120vh] h-[60vh] rounded-b-[50%] bg-purple-400/20 blur-[80px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-sm relative z-10 p-4"
      >
        <div className="relative group">
            {/* Card border glow */}
            <div className="absolute -inset-[0.5px] rounded-2xl bg-gradient-to-r from-white/10 via-white/20 to-white/10 opacity-70" />
            
            {/* Glass card background */}
            <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/[0.05] shadow-2xl overflow-hidden">
                <AnimatePresence mode="wait">
                    {!isSent ? (
                        <motion.div
                            key="reset-form"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="space-y-6"
                        >
                            <div className="text-center space-y-2">
                                <motion.div
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ type: "spring", duration: 0.8 }}
                                    className="mx-auto w-32 h-32 flex items-center justify-center relative mb-8"
                                >
                                    <LyzardLogo size={120} className="drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
                                </motion.div>
                                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">{t.forgotPasswordTitle}?</h1>
                                <p className="text-white/60 text-sm">{t.forgotPasswordSub}</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="relative">
                                    <Mail className={cn(
                                        "absolute left-3 top-3 w-4 h-4 transition-colors duration-300",
                                        focusedInput ? "text-white" : "text-white/40"
                                    )} />
                                    <Input
                                        type="email"
                                        placeholder={t.enterEmail}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onFocus={() => setFocusedInput(true)}
                                        onBlur={() => setFocusedInput(false)}
                                        required
                                    />
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full relative group/button mt-2"
                                >
                                    <div className="absolute inset-0 bg-blue-500/20 rounded-lg blur-lg opacity-0 group-hover/button:opacity-100 transition-opacity" />
                                    <div className="relative overflow-hidden bg-white text-black font-bold h-11 rounded-lg transition-all flex items-center justify-center">
                                        {isLoading ? (
                                            <div className="w-5 h-5 border-2 border-black/70 border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                {t.resetPassword}
                                                <ArrowRight className="w-4 h-4" />
                                            </span>
                                        )}
                                    </div>
                                </motion.button>
                            </form>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="success-message"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center space-y-6 py-4"
                        >
                            <div className="mx-auto w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                                <CheckCircle2 className="w-8 h-8 text-green-500" />
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold text-white">{t.checkEmail}</h2>
                                <p className="text-white/60 text-sm">
                                    {t.checkEmailSent} <br/>
                                    <span className="text-white font-medium">{email}</span>
                                </p>
                            </div>
                            <Link to="/login" className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors">
                                <ArrowLeft className="w-4 h-4" />
                                {t.backToLogin}
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
      </motion.div>
    </div>
  );
}
