import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  Globe,
  Sparkles,
  Layout as LayoutIcon,
  Download,
  Fingerprint,
  Layers,
  ZapOff
} from 'lucide-react';
import { Button, GlassPanel } from '../components/ui';

export default function Landing() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  return (
    <div className="min-h-screen bg-carbon-0 text-white selection:bg-amber-primary/30 selection:text-amber-primary font-sans relative">
      
      {/* ── Background Elements ────────────────────────────────────────────── */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-amber-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-amber-secondary/5 blur-[120px] rounded-full" />
      </div>

      {/* ── Navigation ─────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 w-full z-50 border-b border-border-sharp bg-carbon-0/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-7 h-7 bg-amber-primary rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,184,0,0.3)]">
              <Zap className="w-4 h-4 text-carbon-0 fill-carbon-0" />
            </div>
            <span className="text-lg font-heading font-extrabold tracking-tighter uppercase transition-colors group-hover:text-amber-primary">
              Lyzard.ai
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-[13px] font-bold uppercase tracking-widest text-white-50">
            <a href="#features" className="hover:text-white transition-colors">Capabilities</a>
            <a href="#how" className="hover:text-white transition-colors">Process</a>
            <a href="#pricing" className="hover:text-white transition-colors">Access</a>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login" className="text-xs font-black uppercase tracking-widest text-white-50 hover:text-white transition-colors">
              Sign In
            </Link>
            <Button variant="primary" size="sm" className="px-5">
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* ── Hero Section ───────────────────────────────────────────────────── */}
      <header className="relative pt-40 pb-20 px-6">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-5xl mx-auto text-center"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-surface text-[10px] font-black uppercase tracking-[0.2em] text-amber-primary mb-8 shadow-xl">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Future of Rapid Deployment</span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-heading font-extrabold tracking-tighter mb-8 leading-[0.9] text-balance">
            Ship your vision <br />
            in <span className="text-gradient-amber">sixty seconds</span>.
          </motion.h1>
          
          <motion.p variants={itemVariants} className="max-w-2xl mx-auto text-lg md:text-xl text-white-50 mb-12 leading-relaxed font-medium text-balance">
            Beautiful, high-conversion landing pages generated from a single thought. 
            No drag-and-drop. No friction. Just prompt and publish.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button variant="primary" size="lg" className="min-w-[220px] group shadow-2xl">
              <Link to="/signup" className="flex items-center gap-2">
                Start Generating 
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="glass" size="lg" className="min-w-[220px]">
              <a href="#features">Explore Features</a>
            </Button>
          </motion.div>

          {/* Interactive Mockup */}
          <motion.div 
            variants={itemVariants}
            className="mt-24 relative perspective-[2000px]"
          >
            <div className="absolute inset-0 bg-amber-primary/10 blur-[100px] -z-10 rounded-full" />
            <motion.div 
              style={{ transformStyle: 'preserve-3d' }}
              whileHover={{ rotateX: 2, rotateY: -2 }}
              className="glass-surface-elevated rounded-[2.5rem] p-3 shadow-2xl"
            >
              <div className="bg-carbon-0 rounded-[2rem] overflow-hidden border border-white/5 aspect-video relative group">
                {/* Browser UI */}
                <div className="h-8 bg-carbon-1/50 flex items-center px-6 gap-2 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-white/10" />
                    <div className="w-2 h-2 rounded-full bg-white/10" />
                    <div className="w-2 h-2 rounded-full bg-white/10" />
                  </div>
                </div>
                
                {/* Simulated AI Workflow */}
                <div className="p-12 flex flex-col items-center justify-center h-full space-y-8">
                  <div className="w-full max-w-sm space-y-4">
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        className="w-1/2 h-full bg-gradient-to-r from-transparent via-amber-primary to-transparent"
                      />
                    </div>
                    <div className="h-2 w-2/3 bg-white/5 rounded-full" />
                  </div>
                  <div className="grid grid-cols-3 gap-6 w-full">
                    {[0, 1, 2].map(i => (
                      <div key={i} className="aspect-square rounded-2xl bg-white/5 border border-white/5 animate-pulse" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </header>

      {/* ── Bento Features ────────────────────────────────────────────────── */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl text-left">
              <h2 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight leading-tight mb-6">
                Engineered for <br /><span className="text-white-50">High Velocity Founders.</span>
              </h2>
            </div>
            <p className="text-white-50 text-lg max-w-md text-left md:text-right font-medium">
              We've stripped away the complexity of traditional web builders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-auto md:h-[600px]">
            {/* Big Bento Item */}
            <GlassPanel className="md:col-span-2 md:row-span-2 flex flex-col justify-between group overflow-hidden relative">
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-amber-primary/10 flex items-center justify-center mb-6 border border-amber-primary/20">
                  <Fingerprint className="w-6 h-6 text-amber-primary" />
                </div>
                <h3 className="text-2xl font-heading font-extrabold mb-4">Prompt-Driven Intelligence</h3>
                <p className="text-white-50 leading-relaxed max-w-sm font-medium">
                  Our neural engine interprets your intent, not just your words. Brand voice and audience alignment are baked in from the first generation.
                </p>
              </div>
              <div className="absolute bottom-0 right-0 w-[80%] h-[50%] bg-gradient-to-tl from-amber-primary/10 to-transparent blur-3xl -z-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="mt-12 flex gap-3 relative z-10">
                <div className="px-3 py-1 rounded-full glass-surface text-[10px] font-black uppercase tracking-widest text-amber-primary">LLM-O1 Optimized</div>
                <div className="px-3 py-1 rounded-full glass-surface text-[10px] font-black uppercase tracking-widest text-white-50">Context Aware</div>
              </div>
            </GlassPanel>

            <GlassPanel className="md:col-span-2 flex items-center gap-8 group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:scale-110 transition-transform">
                <Download className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-extrabold mb-2">Clean ZIP Export</h3>
                <p className="text-white-50 text-sm font-medium">No vendor lock-in. Download a production-ready archive in seconds.</p>
              </div>
            </GlassPanel>

            <GlassPanel className="flex flex-col justify-center group">
              <Layers className="w-8 h-8 text-amber-primary mb-6 group-hover:rotate-12 transition-transform" />
              <h3 className="text-lg font-heading font-extrabold mb-2">Atomic Layouts</h3>
              <p className="text-white-50 text-xs font-medium leading-relaxed">Systematic components following Figma best practices.</p>
            </GlassPanel>

            <GlassPanel className="flex flex-col justify-center group">
              <Globe className="w-8 h-8 text-emerald-state mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-heading font-extrabold mb-2">Edge Search</h3>
              <p className="text-white-50 text-xs font-medium leading-relaxed">Real-time web research to fuel your brand copy.</p>
            </GlassPanel>
          </div>
        </div>
      </section>

      {/* ── Pricing ────────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-32 bg-carbon-1/50 border-y border-border-sharp relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight mb-6">Simple Acquisition.</h2>
            <p className="text-white-50 text-lg font-medium">Zero complexity pricing for builders who scale.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free */}
            <GlassPanel className="p-10 flex flex-col justify-between group hover:border-white/20 transition-all">
              <div>
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white-50 mb-8">Starter</h3>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-6xl font-heading font-extrabold">$0</span>
                  <span className="text-white-50 font-bold">/lifetime</span>
                </div>
                <ul className="space-y-4 mb-12">
                   {[
                    '3 Active Projects',
                    'Instant Cloud Preview',
                    'Standard AI Model',
                    'Community Support'
                   ].map(item => (
                    <li key={item} className="flex items-center gap-3 text-sm font-bold text-white-90">
                      <CheckCircle2 className="w-4 h-4 text-white-50" />
                      {item}
                    </li>
                   ))}
                </ul>
              </div>
              <Button variant="secondary" size="lg" className="w-full">
                <Link to="/signup">Begin Building</Link>
              </Button>
            </GlassPanel>

            {/* Pro */}
            <div className="relative group">
              <div className="absolute -inset-[1px] bg-gradient-to-br from-amber-primary to-amber-secondary rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative h-full bg-carbon-0 rounded-[2.5rem] p-10 flex flex-col justify-between border border-amber-primary/30">
                <div>
                  <div className="flex justify-between items-start mb-8">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-amber-primary">Professional</h3>
                    <div className="px-3 py-1 rounded-full bg-amber-primary/10 text-amber-primary text-[10px] font-black uppercase tracking-widest">Most Popular</div>
                  </div>
                  <div className="flex items-baseline gap-2 mb-8 text-amber-primary">
                    <span className="text-6xl font-heading font-extrabold">$19</span>
                    <span className="font-bold opacity-70">/month</span>
                  </div>
                  <ul className="space-y-4 mb-12">
                    {[
                      'Unlimited Projects',
                      'Full ZIP Archive Exports',
                      'O1-Preview AI Model',
                      'Priority Cloud Bandwidth',
                      'Private Project History'
                    ].map(item => (
                      <li key={item} className="flex items-center gap-3 text-sm font-bold text-white-90">
                        <CheckCircle2 className="w-4 h-4 text-amber-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button variant="primary" size="lg" className="w-full">
                  <Link to="/signup">Go Pro Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className="py-40 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="p-16 md:p-24 rounded-[4rem] bg-gradient-to-br from-amber-primary to-amber-secondary text-center relative overflow-hidden shadow-2xl group"
          >
            <div className="absolute inset-0 bg-carbon-0/10 group-hover:bg-transparent transition-colors duration-700" />
            <div className="relative z-10">
              <h2 className="text-5xl md:text-7xl font-heading font-extrabold tracking-tighter text-carbon-0 mb-8">
                Ready to accelerate <br />your launch?
              </h2>
              <p className="text-carbon-0/70 text-lg md:text-xl font-bold max-w-xl mx-auto mb-12">
                Join 5,000+ creators building with Lyzard intelligence. No setup required.
              </p>
              <Button variant="secondary" size="lg" className="bg-carbon-0 text-white-90 px-12 py-6 rounded-full text-xl shadow-2xl hover:bg-carbon-1">
                <Link to="/signup" className="flex items-center gap-2">
                  Start Your First Project
                  <Zap className="w-6 h-6 fill-amber-primary text-amber-primary" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="py-20 px-6 border-t border-border-sharp bg-carbon-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-amber-primary fill-amber-primary" />
              <span className="text-xl font-heading font-extrabold tracking-tighter uppercase">Lyzard.ai</span>
            </div>
            <p className="text-white-50 text-sm max-w-xs font-medium">
              The professional layer for generative landing pages. Built for speed, optimized for profit.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-primary">Product</h4>
              <ul className="space-y-3 text-sm font-bold text-white-50">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Enterprise</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-primary">Company</h4>
              <ul className="space-y-3 text-sm font-bold text-white-50">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-primary">Resources</h4>
              <ul className="space-y-3 text-sm font-bold text-white-50">
                <li><a href="#" className="hover:text-white transition-colors">Docs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 text-center text-[10px] font-black uppercase tracking-[0.3em] text-white-10">
          © 2026 Lyzard AI Platforms Ink. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
