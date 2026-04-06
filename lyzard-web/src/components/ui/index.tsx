import { motion, type HTMLMotionProps } from 'framer-motion';
import { forwardRef } from 'react';

/* ── Button Component ──────────────────────────────────────────────────── */

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ 
  variant = 'primary', 
  size = 'md', 
  isLoading, 
  className = '', 
  children, 
  disabled,
  ...props 
}, ref) => {
  const baseStyles = "relative inline-flex items-center justify-center gap-2 font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden";
  
  const variants = {
    primary: "bg-amber-primary text-carbon-0 hover:bg-amber-secondary shadow-[0_0_20px_rgba(255,184,0,0.2)] hover:shadow-[0_0_30px_rgba(255,184,0,0.4)]",
    secondary: "bg-carbon-2 text-white-90 border border-border-sharp hover:bg-carbon-3",
    outline: "bg-transparent border border-amber-primary/30 text-amber-primary hover:bg-amber-primary/10",
    ghost: "bg-transparent text-white-50 hover:text-white-90 hover:bg-white/5",
    glass: "glass-surface text-white hover:bg-white/10"
  };

  const sizes = {
    sm: "px-4 py-1.5 text-xs rounded-lg",
    md: "px-6 py-2.5 text-sm rounded-xl",
    lg: "px-8 py-4 text-base rounded-2xl",
    icon: "p-2.5 rounded-xl aspect-square"
  };

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          {size !== 'icon' && <span>Processing...</span>}
        </div>
      ) : (
        <>
          {children}
        </>
      )}
      
      {/* Glossy Overlay for Primary */}
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />
      )}
    </motion.button>
  );
});

/* ── Input Component ───────────────────────────────────────────────────── */

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, className = '', ...props }, ref) => {
  return (
    <div className="w-full space-y-2">
      {label && <label className="block text-xs font-black uppercase tracking-widest text-white-50 ml-1">{label}</label>}
      <div className="relative group">
        <input
          ref={ref}
          className={`w-full bg-carbon-1 border border-border-sharp rounded-xl px-4 py-3 text-sm text-white-90 placeholder:text-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-amber-primary/20 focus:border-amber-primary/50 ${error ? 'border-ruby-danger focus:ring-ruby-danger/20' : ''} ${className}`}
          {...props}
        />
        {/* Animated Accent Line */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-amber-primary transition-all group-focus-within:w-[90%] rounded-full opacity-50" />
      </div>
      {error && <p className="text-[10px] text-ruby-danger font-medium ml-1">{error}</p>}
    </div>
  );
});

/* ── GlassPanel Component ───────────────────────────────────────────────── */

interface GlassPanelProps extends HTMLMotionProps<'div'> {
  elevated?: boolean;
}

const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(({ elevated, className = '', children, ...props }, ref) => {
  return (
    <motion.div
      ref={ref}
      className={`glass-surface ${elevated ? 'glass-surface-elevated' : ''} rounded-3xl p-8 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
});

/* ── Card Component ─────────────────────────────────────────────────────── */

interface CardProps extends HTMLMotionProps<'div'> {
  variant?: 'flat' | 'glossy' | 'outline';
}

const Card = forwardRef<HTMLDivElement, CardProps>(({ variant = 'flat', className = '', children, ...props }, ref) => {
  const variants = {
    flat: "bg-carbon-1 border border-border-sharp",
    glossy: "glass-surface border border-white/10",
    outline: "bg-transparent border border-white/5 hover:border-white/10"
  };

  return (
    <motion.div
      ref={ref}
      className={`rounded-2xl p-6 transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
});

export { Button, Input, GlassPanel, Card };
