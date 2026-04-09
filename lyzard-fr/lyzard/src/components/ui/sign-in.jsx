'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, Zap } from 'lucide-react';
import { cn } from "../../lib/utils";
import { supabase } from '../../lib/supabase';

function Input({ className, type, ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-12 w-full rounded-xl border border-white/5 bg-white/[0.03] px-4 py-2 text-sm text-white shadow-inner transition-all duration-300 placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/40 focus:bg-white/[0.07] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

// --- GRADIENT BACKGROUND ---
const GradientBackground = () => (
  <>
    <style>{`
      @keyframes float1 { 0% { transform: translate(0,0); } 50% { transform: translate(-10px,10px); } 100% { transform: translate(0,0); } }
      @keyframes float2 { 0% { transform: translate(0,0); } 50% { transform: translate(10px,-10px); } 100% { transform: translate(0,0); } }
      @keyframes shimmer-btn { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
    `}</style>
    <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" className="absolute top-0 left-0 w-full h-full">
      <defs>
        <linearGradient id="sg_grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#00e5ff", stopOpacity: 0.5 }} />
          <stop offset="100%" style={{ stopColor: "#22c55e", stopOpacity: 0.3 }} />
        </linearGradient>
        <linearGradient id="sg_grad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#fb923c", stopOpacity: 0.6 }} />
          <stop offset="50%" style={{ stopColor: "#a855f7", stopOpacity: 0.5 }} />
          <stop offset="100%" style={{ stopColor: "#38bdf8", stopOpacity: 0.4 }} />
        </linearGradient>
        <radialGradient id="sg_grad3" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style={{ stopColor: "#9d00ff", stopOpacity: 0.6 }} />
          <stop offset="100%" style={{ stopColor: "#f472b6", stopOpacity: 0.2 }} />
        </radialGradient>
        <filter id="sg_blur1" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="35" /></filter>
        <filter id="sg_blur2" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="25" /></filter>
        <filter id="sg_blur3" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="45" /></filter>
      </defs>
      <g style={{ animation: 'float1 20s ease-in-out infinite' }}>
        <ellipse cx="200" cy="500" rx="250" ry="180" fill="url(#sg_grad1)" filter="url(#sg_blur1)" transform="rotate(-30 200 500)" />
        <rect x="500" y="100" width="300" height="250" rx="80" fill="url(#sg_grad2)" filter="url(#sg_blur2)" transform="rotate(15 650 225)" />
      </g>
      <g style={{ animation: 'float2 25s ease-in-out infinite' }}>
        <circle cx="650" cy="450" r="150" fill="url(#sg_grad3)" filter="url(#sg_blur3)" opacity="0.7" />
        <ellipse cx="50" cy="150" rx="180" ry="120" fill="#9d00ff" filter="url(#sg_blur2)" opacity="0.5" />
      </g>
    </svg>
  </>
);

const Logo = ({ size = 24, className = "" }) => (
  <div className={cn("relative flex items-center justify-center", className)} style={{ width: size, height: size }}>
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logo-grad-si" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00e5ff" />
          <stop offset="100%" stopColor="#9d00ff" />
        </linearGradient>
      </defs>
      <path d="M20 50C20 33.4315 33.4315 20 50 20C66.5685 20 80 33.4315 80 50C80 66.5685 66.5685 80 50 80C33.4315 80 20 66.5685 20 50Z" stroke="url(#logo-grad-si)" strokeWidth="8" />
      <path d="M40 50L48 58L65 42" stroke="url(#logo-grad-si)" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25 25L35 35" stroke="url(#logo-grad-si)" strokeWidth="6" strokeLinecap="round" />
      <path d="M75 75L65 65" stroke="url(#logo-grad-si)" strokeWidth="6" strokeLinecap="round" />
    </svg>
  </div>
);

export function SignInCard2({ onBack, onSignUp, onForgotPassword, onSignInSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);

  // For 3D card effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    if (!email || !password) return;
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      onSignInSuccess?.({
        name: data.user.email.split('@')[0],
        email: data.user.email
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider) => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: window.location.origin + '/#dashboard'
        }
      });
      if (error) throw error;
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-[#050508] relative overflow-hidden flex items-center justify-center p-6">
      {/* Background colorful elements from sign-up */}
      <div className="absolute inset-0 z-0"><GradientBackground /></div>
      <div className="absolute inset-0 bg-grid-pattern z-0 opacity-20 pointer-events-none" />

      {/* Back button */}
      <button 
        onClick={onBack}
        className="fixed top-8 left-8 z-50 flex items-center gap-2 text-white/40 hover:text-white transition-colors duration-300 text-sm font-bold group bg-white/5 px-4 py-2 rounded-xl backdrop-blur-md border border-white/10"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm relative z-10"
        style={{ perspective: 1500 }}
      >
        <motion.div
          className="relative"
          style={{ rotateX, rotateY }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="relative group">
            {/* Travelling beam effect */}
            <div className="absolute -inset-[1px] rounded-2xl overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 h-[2px] w-[50%] bg-gradient-to-r from-transparent via-[#00e5ff] to-[#9d00ff]"
                  animate={{ left: ["-50%", "100%"] }}
                  transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                />
            </div>

            {/* Glass card background */}
            <div className="relative bg-black/60 backdrop-blur-3xl rounded-3xl p-8 border border-white/[0.08] shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden">
                
                {/* Header */}
                <div className="text-center space-y-3 mb-10">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", duration: 0.8 }}
                  >
                    <div className="flex items-center justify-center gap-3 mb-2">
                       <Logo size={42} />
                       <span className="text-4xl font-black tracking-tighter text-white">Lyzard<span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00e5ff] to-[#9d00ff]">.ai</span></span>
                    </div>
                  </motion.div>
                  <p className="text-[#00e5ff] text-[12px] font-black uppercase tracking-[0.3em] animate-pulse">Welcome back</p>
                </div>

                {/* Login form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-xl text-sm font-medium text-center">
                      {error}
                    </div>
                  )}
                  <div className="space-y-4">
                    {/* Email input */}
                    <div className="relative">
                      <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-all duration-300 ${focusedInput === "email" ? 'text-[#00e5ff] scale-110' : 'text-white/20'}`} />
                      <Input
                        type="email"
                        placeholder="Organization email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocusedInput("email")}
                        onBlur={() => setFocusedInput(null)}
                        className="pl-12"
                      />
                    </div>

                    {/* Password input */}
                    <div className="relative">
                      <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-all duration-300 ${focusedInput === "password" ? 'text-[#00e5ff] scale-110' : 'text-white/20'}`} />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Access keyphrase"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocusedInput("password")}
                        onBlur={() => setFocusedInput(null)}
                        className="pl-12 pr-12"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)} 
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/5 rounded-full transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4 text-white/20 hover:text-white" /> : <Eye className="w-4 h-4 text-white/20 hover:text-white" />}
                      </button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between font-bold">
                    <button type="button" onClick={() => setRememberMe(!rememberMe)} className="flex items-center gap-2 group cursor-pointer">
                      <div className={`w-4 h-4 rounded-md border transition-all duration-300 flex items-center justify-center ${rememberMe ? 'bg-[#00e5ff] border-[#00e5ff] shadow-[0_0_12px_rgba(0,229,255,0.4)]' : 'border-white/10 bg-white/5'}`}>
                        {rememberMe && <svg viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="4" className="w-2.5 h-2.5"><polyline points="20 6 9 17 4 12" /></svg>}
                      </div>
                      <span className={`text-[11px] uppercase tracking-wider transition-colors ${rememberMe ? 'text-white' : 'text-white/30'}`}>Trust this session</span>
                    </button>
                    <button type="button" onClick={onForgotPassword} className="text-[11px] uppercase tracking-wider text-[#00e5ff]/60 hover:text-[#00e5ff] transition-all hover:underline underline-offset-4 decoration-2">Forgot Password?</button>
                  </div>

                  {/* Sign in button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 rounded-xl transition-all duration-500 flex items-center justify-center gap-2 group mt-8 relative overflow-hidden"
                  >
                    {/* Background Gradient & Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00e5ff] via-[#9d00ff] to-[#00e5ff] bg-size-200 animate-shimmer-fast" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-[#00e5ff] to-[#9d00ff] blur-xl transition-opacity duration-500 -z-10" />
                    
                    <span className="relative z-10 flex items-center gap-2 px-4 text-black font-black uppercase tracking-wider text-sm">
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      ) : (
                        <>
                          Establish Access
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </motion.button>

                  {/* Divider */}
                  <div className="flex items-center gap-4 py-2">
                    <div className="h-px bg-white/5 flex-1" />
                    <span className="text-[9px] text-white/20 font-black tracking-[0.3em]">GATEWAY</span>
                    <div className="h-px bg-white/5 flex-1" />
                  </div>

                  {/* Google Sign In */}
                  <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)", borderColor: "rgba(0,229,255,0.3)" }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => handleOAuthSignIn('google')}
                    className="w-full bg-white/5 text-white font-bold h-12 rounded-xl border border-white/10 transition-all duration-300 flex items-center justify-center gap-3 text-sm"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" />
                      <path fill="#EB4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Continue with Identity
                  </motion.button>

                {/* Sign up link */}
                <p className="text-center text-xs text-white/40 mt-8 font-medium">
                  New to Lyzard?{' '}
                  <button onClick={onSignUp} className="bg-clip-text text-transparent bg-gradient-to-r from-[#00e5ff] to-[#9d00ff] hover:text-white font-black transition-colors ml-1 uppercase tracking-tighter hover:underline underline-offset-4">Begin Prototype</button>
                </p>
              </form>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
