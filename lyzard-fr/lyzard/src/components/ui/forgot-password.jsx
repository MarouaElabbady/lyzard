import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { Mail, ArrowRight, ArrowLeft, Zap, CheckCircle } from 'lucide-react';
import { AnimatePresence, motion, useInView } from 'framer-motion';

// ─── BLUR FADE ───────────────────────────────────────────────────────────────
function BlurFade({ children, className, duration = 0.4, delay = 0, yOffset = 6, inView = true, inViewMargin = '-50px', blur = '6px' }) {
  const ref = useRef(null);
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin });
  const isInView = !inView || inViewResult;
  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} exit="hidden"
      variants={{ hidden: { y: yOffset, opacity: 0, filter: `blur(${blur})` }, visible: { y: -yOffset, opacity: 1, filter: 'blur(0px)' } }}
      transition={{ delay: 0.04 + delay, duration, ease: 'easeOut' }} className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── GLASS BUTTON ─────────────────────────────────────────────────────────────
const glassButtonVariants = cva('relative isolate all-unset cursor-pointer rounded-full transition-all', {
  variants: { size: { default: 'text-base font-medium', sm: 'text-sm font-medium', icon: 'h-10 w-10' } },
  defaultVariants: { size: 'default' },
});
const glassButtonTextVariants = cva('glass-button-text relative block select-none tracking-tighter', {
  variants: { size: { default: 'px-6 py-3.5', sm: 'px-4 py-2', icon: 'flex h-10 w-10 items-center justify-center' } },
  defaultVariants: { size: 'default' },
});
const GlassButton = React.forwardRef(({ className, children, size, contentClassName, onClick, ...props }, ref) => {
  const handleWrapperClick = (e) => { const btn = e.currentTarget.querySelector('button'); if (btn && e.target !== btn) btn.click(); };
  return (
    <div className={cn('glass-button-wrap cursor-pointer rounded-full relative', className)} onClick={handleWrapperClick}>
      <button className={cn('glass-button relative z-10', glassButtonVariants({ size }))} ref={ref} onClick={onClick} {...props}>
        <span className={cn(glassButtonTextVariants({ size }), contentClassName)}>{children}</span>
      </button>
      <div className="glass-button-shadow rounded-full pointer-events-none" />
    </div>
  );
});
GlassButton.displayName = 'GlassButton';

// ─── GRADIENT BACKGROUND (same as sign-up / sign-in) ─────────────────────────
const GradientBackground = () => (
  <>
    <style>{`
      @keyframes float1 { 0%{transform:translate(0,0)} 50%{transform:translate(-10px,10px)} 100%{transform:translate(0,0)} }
      @keyframes float2 { 0%{transform:translate(0,0)} 50%{transform:translate(10px,-10px)} 100%{transform:translate(0,0)} }
    `}</style>
    <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none"
      xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"
      className="absolute top-0 left-0 w-full h-full"
    >
      <defs>
        <linearGradient id="fp_grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#00e5ff', stopOpacity: 0.5 }} />
          <stop offset="100%" style={{ stopColor: '#22c55e', stopOpacity: 0.3 }} />
        </linearGradient>
        <linearGradient id="fp_grad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#fb923c', stopOpacity: 0.6 }} />
          <stop offset="50%" style={{ stopColor: '#a855f7', stopOpacity: 0.5 }} />
          <stop offset="100%" style={{ stopColor: '#38bdf8', stopOpacity: 0.4 }} />
        </linearGradient>
        <radialGradient id="fp_grad3" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style={{ stopColor: '#9d00ff', stopOpacity: 0.6 }} />
          <stop offset="100%" style={{ stopColor: '#f472b6', stopOpacity: 0.2 }} />
        </radialGradient>
        <filter id="fp_blur1" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="35" /></filter>
        <filter id="fp_blur2" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="25" /></filter>
        <filter id="fp_blur3" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="45" /></filter>
      </defs>
      <g style={{ animation: 'float1 20s ease-in-out infinite' }}>
        <ellipse cx="200" cy="500" rx="250" ry="180" fill="url(#fp_grad1)" filter="url(#fp_blur1)" transform="rotate(-30 200 500)" />
        <rect x="500" y="100" width="300" height="250" rx="80" fill="url(#fp_grad2)" filter="url(#fp_blur2)" transform="rotate(15 650 225)" />
      </g>
      <g style={{ animation: 'float2 25s ease-in-out infinite' }}>
        <circle cx="650" cy="450" r="150" fill="url(#fp_grad3)" filter="url(#fp_blur3)" opacity="0.7" />
        <ellipse cx="50" cy="150" rx="180" ry="120" fill="#9d00ff" filter="url(#fp_blur2)" opacity="0.5" />
      </g>
    </svg>
  </>
);

// ─── ANIMATED SUCCESS CHECKMARK ───────────────────────────────────────────────
const SuccessCheck = () => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
    className="flex items-center justify-center w-20 h-20 rounded-full border-2 border-electric-blue/40 bg-electric-blue/10 relative"
  >
    {/* Ping ring */}
    <motion.div
      className="absolute inset-0 rounded-full border border-electric-blue/30"
      animate={{ scale: [1, 1.5, 1.8], opacity: [0.6, 0.2, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
    />
    <motion.div
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
    >
      <CheckCircle className="w-10 h-10 text-electric-blue" />
    </motion.div>
  </motion.div>
);

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export function ForgotPasswordCard({ onBack, onSignIn }) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isEmailValid = /\S+@\S+\.\S+/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEmailValid || isLoading) return;
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); setSent(true); }, 1500);
  };

  const CSS = `
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus {
      -webkit-box-shadow: 0 0 0 30px transparent inset !important;
      -webkit-text-fill-color: #f8fafc !important;
      background-color: transparent !important;
      transition: background-color 5000s ease-in-out 0s !important;
    }

    @property --angle-1 { syntax: "<angle>"; inherits: false; initial-value: -75deg; }
    @property --angle-2 { syntax: "<angle>"; inherits: false; initial-value: -45deg; }

    .glass-button-wrap{--anim-time:400ms;--anim-ease:cubic-bezier(.25,1,.5,1);--border-width:clamp(1px,.0625em,4px);position:relative;z-index:2;transform-style:preserve-3d;transition:transform var(--anim-time) var(--anim-ease)}
    .glass-button-wrap:has(.glass-button:active){transform:rotateX(25deg)}
    .glass-button-shadow{--shadow-cutoff-fix:2em;position:absolute;width:calc(100% + var(--shadow-cutoff-fix));height:calc(100% + var(--shadow-cutoff-fix));top:calc(0% - var(--shadow-cutoff-fix)/2);left:calc(0% - var(--shadow-cutoff-fix)/2);filter:blur(clamp(2px,.125em,12px));transition:filter var(--anim-time) var(--anim-ease);pointer-events:none;z-index:0}
    .glass-button-shadow::after{content:"";position:absolute;inset:0;border-radius:9999px;background:linear-gradient(180deg,rgba(0,229,255,.2),rgba(0,229,255,.1));width:calc(100% - var(--shadow-cutoff-fix) - .25em);height:calc(100% - var(--shadow-cutoff-fix) - .25em);top:calc(var(--shadow-cutoff-fix) - .5em);left:calc(var(--shadow-cutoff-fix) - .875em);padding:.125em;box-sizing:border-box;mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);mask-composite:exclude;transition:all var(--anim-time) var(--anim-ease);opacity:1}
    .glass-button{-webkit-tap-highlight-color:transparent;backdrop-filter:blur(clamp(1px,.125em,4px));transition:all var(--anim-time) var(--anim-ease);background:linear-gradient(-75deg,rgba(0,229,255,.03),rgba(0,229,255,.12),rgba(0,229,255,.03));box-shadow:inset 0 .125em .125em rgba(0,229,255,.05),inset 0 -.125em .125em rgba(3,3,5,.5),0 .25em .125em -.125em rgba(0,229,255,.2),0 0 .1em .25em inset rgba(3,3,5,.2),0 0 0 0 rgba(3,3,5,0)}
    .glass-button:hover{transform:scale(.975);box-shadow:inset 0 .125em .125em rgba(0,229,255,.05),inset 0 -.125em .125em rgba(3,3,5,.5),0 .15em .05em -.1em rgba(0,229,255,.25),0 0 .05em .1em inset rgba(3,3,5,.5),0 0 0 0 rgba(3,3,5,0)}
    .glass-button-text{color:rgba(248,250,252,.9);text-shadow:0em .25em .05em rgba(0,229,255,.1);transition:all var(--anim-time) var(--anim-ease)}
    .glass-button:hover .glass-button-text{text-shadow:.025em .025em .025em rgba(0,229,255,.12)}
    .glass-button-text::after{content:"";display:block;position:absolute;width:calc(100% - var(--border-width));height:calc(100% - var(--border-width));top:calc(0% + var(--border-width)/2);left:calc(0% + var(--border-width)/2);box-sizing:border-box;border-radius:9999px;overflow:clip;background:linear-gradient(var(--angle-2),transparent 0%,rgba(0,229,255,.3) 40% 50%,transparent 55%);z-index:3;mix-blend-mode:screen;pointer-events:none;background-size:200% 200%;background-position:0% 50%;transition:background-position calc(var(--anim-time)*1.25) var(--anim-ease),--angle-2 calc(var(--anim-time)*1.25) var(--anim-ease)}
    .glass-button:hover .glass-button-text::after{background-position:25% 50%}
    .glass-button:active .glass-button-text::after{background-position:50% 15%;--angle-2:-15deg}
    .glass-button::after{content:"";position:absolute;z-index:1;inset:0;border-radius:9999px;width:calc(100% + var(--border-width));height:calc(100% + var(--border-width));top:calc(0% - var(--border-width)/2);left:calc(0% - var(--border-width)/2);padding:var(--border-width);box-sizing:border-box;background:conic-gradient(from var(--angle-1) at 50% 50%,rgba(0,229,255,.5) 0%,transparent 5% 40%,rgba(0,229,255,.5) 50%,transparent 60% 95%,rgba(0,229,255,.5) 100%),linear-gradient(180deg,rgba(3,3,5,.5),rgba(3,3,5,.5));mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);mask-composite:exclude;transition:all var(--anim-time) var(--anim-ease),--angle-1 500ms ease;pointer-events:none}
    .glass-button:hover::after{--angle-1:-125deg}
    .glass-button:active::after{--angle-1:-75deg}
    .glass-button-wrap:has(.glass-button:hover) .glass-button-shadow{filter:blur(clamp(2px,.0625em,6px))}
    .glass-button-wrap:has(.glass-button:active) .glass-button{box-shadow:inset 0 .125em .125em rgba(0,229,255,.05),inset 0 -.125em .125em rgba(3,3,5,.5),0 .125em .125em -.125em rgba(0,229,255,.2),0 0 .1em .25em inset rgba(3,3,5,.2),0 .225em .05em 0 rgba(0,229,255,.05),0 .25em 0 0 rgba(3,3,5,.75),inset 0 .25em .05em 0 rgba(0,229,255,.15)}

    .glass-input-wrap{position:relative;z-index:2;transform-style:preserve-3d;border-radius:9999px}
    .glass-input{display:flex;position:relative;width:100%;align-items:center;gap:.5rem;border-radius:9999px;padding:.25rem;-webkit-tap-highlight-color:transparent;backdrop-filter:blur(clamp(1px,.125em,4px));transition:all 400ms cubic-bezier(.25,1,.5,1);background:linear-gradient(-75deg,rgba(0,229,255,.03),rgba(0,229,255,.1),rgba(0,229,255,.03));box-shadow:inset 0 .125em .125em rgba(0,229,255,.05),inset 0 -.125em .125em rgba(3,3,5,.5),0 .25em .125em -.125em rgba(0,229,255,.2),0 0 .1em .25em inset rgba(3,3,5,.2)}
    .glass-input-wrap:focus-within .glass-input{box-shadow:inset 0 .125em .125em rgba(0,229,255,.05),inset 0 -.125em .125em rgba(3,3,5,.5),0 .15em .05em -.1em rgba(0,229,255,.35),0 0 .05em .1em inset rgba(3,3,5,.5),0 0 8px rgba(0,229,255,.15)}
    .glass-input::after{content:"";position:absolute;z-index:1;inset:0;border-radius:9999px;width:calc(100% + clamp(1px,.0625em,4px));height:calc(100% + clamp(1px,.0625em,4px));top:calc(0% - clamp(1px,.0625em,4px)/2);left:calc(0% - clamp(1px,.0625em,4px)/2);padding:clamp(1px,.0625em,4px);box-sizing:border-box;background:conic-gradient(from var(--angle-1) at 50% 50%,rgba(0,229,255,.5) 0%,transparent 5% 40%,rgba(0,229,255,.5) 50%,transparent 60% 95%,rgba(0,229,255,.5) 100%),linear-gradient(180deg,rgba(3,3,5,.5),rgba(3,3,5,.5));mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);mask-composite:exclude;transition:all 400ms cubic-bezier(.25,1,.5,1),--angle-1 500ms ease;pointer-events:none}
    .glass-input-wrap:focus-within .glass-input::after{--angle-1:-125deg}
    .glass-input-text-area{position:absolute;inset:0;border-radius:9999px;pointer-events:none}
    .glass-input-text-area::after{content:"";display:block;position:absolute;width:calc(100% - clamp(1px,.0625em,4px));height:calc(100% - clamp(1px,.0625em,4px));top:calc(0% + clamp(1px,.0625em,4px)/2);left:calc(0% + clamp(1px,.0625em,4px)/2);box-sizing:border-box;border-radius:9999px;overflow:clip;background:linear-gradient(var(--angle-2),transparent 0%,rgba(0,229,255,.2) 40% 50%,transparent 55%);z-index:3;mix-blend-mode:screen;pointer-events:none;background-size:200% 200%;background-position:0% 50%;transition:background-position calc(400ms*1.25) cubic-bezier(.25,1,.5,1),--angle-2 calc(400ms*1.25) cubic-bezier(.25,1,.5,1)}
    .glass-input-wrap:focus-within .glass-input-text-area::after{background-position:25% 50%}
  `;

  return (
    <div className="bg-surface-dark min-h-screen w-screen flex flex-col">
      <style>{CSS}</style>

      {/* Logo */}
      <div className={cn('fixed top-4 left-4 z-20 flex items-center gap-2', 'md:left-1/2 md:-translate-x-1/2')}>
        <div className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/10 hover:border-electric-blue/50 transition-colors overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-electric-blue/20 to-transparent" />
          <Zap size={18} className="text-electric-blue relative z-10" />
        </div>
        <span className="text-xl font-display font-bold tracking-tight text-white">
          Lyzard<span className="text-electric-blue">.ai</span>
        </span>
      </div>

      {/* Back */}
      <div className="fixed top-4 right-4 z-20">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors px-3 py-2 rounded-lg bg-white/[0.03] border border-white/10 hover:border-white/20"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </div>

      {/* Page */}
      <div className="flex w-full flex-1 items-center justify-center relative overflow-hidden min-h-screen">
        <div className="absolute inset-0 z-0"><GradientBackground /></div>
        <div className="absolute inset-0 bg-grid-pattern z-0 opacity-20 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center gap-8 w-[280px] mx-auto p-4">
          <AnimatePresence mode="wait">

            {/* ── Step 1: Enter email ── */}
            {!sent && (
              <motion.div key="email-step"
                initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -6, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="w-full flex flex-col items-center gap-8"
              >
                {/* Titles */}
                <div className="w-full flex flex-col items-center gap-4">
                  <BlurFade delay={0.1} className="w-full">
                    <p className="font-display font-light text-4xl sm:text-5xl tracking-tight text-white text-center">
                      Forgot Password?
                    </p>
                  </BlurFade>
                  <BlurFade delay={0.2}>
                    <p className="text-sm font-medium text-white/60 text-center max-w-[260px]">
                      Enter your email and we'll send you a reset link.
                    </p>
                  </BlurFade>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="w-[300px] space-y-6">
                  <BlurFade delay={0.3} inView className="w-full">
                    <div className="relative w-full">
                      <div className="glass-input-wrap w-full">
                        <div className="glass-input">
                          <span className="glass-input-text-area" />
                          <div className={cn(
                            'relative z-10 flex-shrink-0 flex items-center justify-center overflow-hidden transition-all duration-300 ease-in-out',
                            email.length > 20 ? 'w-0 px-0' : 'w-10 pl-2'
                          )}>
                            <Mail className="h-5 w-5 text-electric-blue flex-shrink-0" />
                          </div>
                          <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            autoFocus
                            onChange={(e) => setEmail(e.target.value)}
                            className={cn(
                              'relative z-10 h-full w-0 flex-grow bg-transparent text-white placeholder:text-white/40 focus:outline-none transition-[padding-right] duration-300 ease-in-out delay-300',
                              isEmailValid ? 'pr-2' : 'pr-0'
                            )}
                          />
                          {/* Submit arrow */}
                          <div className={cn(
                            'relative z-10 flex-shrink-0 overflow-hidden transition-all duration-300 ease-in-out',
                            isEmailValid ? 'w-10 pr-1' : 'w-0'
                          )}>
                            <GlassButton type="submit" size="icon" aria-label="Send reset link" contentClassName="text-electric-blue">
                              {isLoading
                                ? <motion.div
                                    className="w-5 h-5 border-2 border-electric-blue border-t-transparent rounded-full"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                                  />
                                : <ArrowRight className="w-5 h-5" />
                              }
                            </GlassButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </BlurFade>

                  {/* Back to sign in */}
                  <BlurFade delay={0.4} inView>
                    <button
                      type="button"
                      onClick={onSignIn}
                      className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back to Sign In
                    </button>
                  </BlurFade>
                </form>
              </motion.div>
            )}

            {/* ── Step 2: Success ── */}
            {sent && (
              <motion.div key="success-step"
                initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="w-full flex flex-col items-center gap-6 text-center"
              >
                <SuccessCheck />

                <BlurFade delay={0.2} className="w-full">
                  <p className="font-display font-light text-4xl sm:text-5xl tracking-tight text-white">
                    Check your email
                  </p>
                </BlurFade>

                <BlurFade delay={0.3}>
                  <p className="text-sm font-medium text-white/60 max-w-[260px]">
                    We've sent a password reset link to{' '}
                    <span className="text-electric-blue font-semibold">{email}</span>.
                    Check your inbox.
                  </p>
                </BlurFade>

                {/* Resend + Back to Sign In */}
                <BlurFade delay={0.45} className="w-[300px] flex flex-col items-center gap-4 mt-2">
                  <button
                    type="button"
                    onClick={() => { setSent(false); setEmail(''); }}
                    className="text-sm text-white/40 hover:text-white transition-colors"
                  >
                    Didn't receive it?{' '}
                    <span className="text-electric-blue font-medium hover:text-white transition-colors">
                      Try again
                    </span>
                  </button>

                  <GlassButton
                    type="button"
                    size="sm"
                    onClick={onSignIn}
                    contentClassName="flex items-center gap-2 text-white"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Sign In
                  </GlassButton>
                </BlurFade>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
