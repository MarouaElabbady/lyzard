import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const services = [
  {
    id: "01",
    title: "LANDING PAGE IN 60 SECONDS",
    description:
      "Enter your business name, industry, and offer. Lyzard automatically builds a full page with Hero, features, testimonials, and contact form — in less than a minute.",
    cta: "Generate My Page",
    image: "https://images.unsplash.com/photo-1686191128892-3b37add4c844?w=900&q=80&auto=format&fit=crop",
  },
  {
    id: "02",
    title: "COPYWRITING THAT CONVERTS",
    description:
      "Lyzard's AI writes punchy texts tailored to your target: headlines, benefits, calls to action. Agency-level copywriting without the delays or costs.",
    cta: "View Example",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&q=80&auto=format&fit=crop",
  },
  {
    id: "03",
    title: "CUSTOM DESIGN",
    description:
      "Choose from a library of premium templates or let the AI generate a unique design just for you. Colors, typography, spacing — everything adapts to your brand identity.",
    cta: "Explore Designs",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&q=80&auto=format&fit=crop",
  },
  {
    id: "04",
    title: "PUBLISHED & SEO OPTIMIZED",
    description:
      "Your landing page is instantly put online on a Lyzard subdomain or your own domain. Meta tags, loading speed, mobile-first — SEO optimization is automatic.",
    cta: "Publish Now",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c8ad?w=900&q=80&auto=format&fit=crop",
  },
  {
    id: "05",
    title: "LEADS & CONVERSIONS",
    description:
      "Collect leads directly from your page with smart forms. Track your visitors, conversion rates, and traffic sources from a unified dashboard.",
    cta: "View Dashboard",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80&auto=format&fit=crop",
  },
];

export default function ServicesSlider() {
  const [hovered, setHovered] = useState(null);

  // Which card is "active": the one hovered, otherwise the first one
  const active = hovered !== null ? hovered : 0;

  return (
    <section className="relative w-full bg-[#07070f] py-20 overflow-hidden">
      {/* ── Section header ── */}
      <div className="text-center mb-14 px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-[#7C3AED] font-semibold text-[12px] uppercase tracking-[0.22em] mb-3"
        >
          What Lyzard does for you
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="font-bold text-[28px] md:text-[40px] text-white leading-tight"
        >
          Everything you need,{" "}
          <span className="text-[#7C3AED]">in one tool</span>
        </motion.h2>
      </div>

      {/* ── Accordion panels ── */}
      <div className="flex w-full" style={{ height: 540 }}>
        {services.map((s, i) => {
          const isActive = i === active;

          return (
            <motion.div
              key={s.id}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              animate={{ flex: isActive ? 4 : 1 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="relative overflow-hidden cursor-pointer"
              style={{ minWidth: 0 }}
            >
              {/* Background image */}
              <img
                src={s.image}
                alt={s.title}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ transition: "transform 0.6s ease", transform: isActive ? "scale(1.04)" : "scale(1)" }}
              />

              {/* Dark overlay — lighter when active */}
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  background: isActive
                    ? "linear-gradient(to top, rgba(0,0,0,0.88) 35%, rgba(0,0,0,0.35) 100%)"
                    : "linear-gradient(to top, rgba(0,0,0,0.92) 60%, rgba(10,5,30,0.80) 100%)",
                }}
              />

              {/* Purple accent line on the left when active */}
              <motion.div
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#7C3AED]"
              />

              {/* ── INACTIVE state: vertical title ── */}
              <motion.div
                animate={{ opacity: isActive ? 0 : 1 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <span
                  className="text-white/80 font-black text-[13px] tracking-[0.28em] uppercase whitespace-nowrap select-none"
                  style={{ writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)" }}
                >
                  {s.title}
                </span>
              </motion.div>

              {/* ── ACTIVE state: content ── */}
              <motion.div
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 16 }}
                transition={{ duration: 0.4, delay: isActive ? 0.15 : 0 }}
                className="absolute bottom-0 left-0 right-0 p-8 pointer-events-none"
              >
                {/* Number */}
                <span className="block font-black text-[64px] leading-none text-white/10 select-none mb-1">
                  {s.id}
                </span>

                {/* Title */}
                <h3 className="font-black text-white text-[20px] tracking-wide mb-3 uppercase">
                  {s.title}
                </h3>

                {/* Description */}
                <p className="text-white/75 text-[14px] leading-relaxed mb-6 max-w-[420px]">
                  {s.description}
                </p>

                {/* CTA Button */}
                <button
                  className="pointer-events-auto flex items-center gap-2 border border-white/30 hover:border-white text-white font-semibold text-[13px] px-5 py-2.5 rounded-lg hover:bg-white/10 transition-all duration-200 cursor-pointer"
                >
                  {s.cta}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>

              {/* Number always visible bottom-right when inactive */}
              <motion.span
                animate={{ opacity: isActive ? 0 : 1 }}
                transition={{ duration: 0.25 }}
                className="absolute bottom-5 right-0 left-0 text-center font-black text-[52px] leading-none text-white/15 select-none pointer-events-none"
              >
                {s.id}
              </motion.span>

              {/* Separator line between cards */}
              {i < services.length - 1 && (
                <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-white/[0.07] z-10" />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* ── Bottom dots ── */}
      <div className="flex justify-center gap-3 mt-8">
        {services.map((_, i) => (
          <div
            key={i}
            className="rounded-sm transition-all duration-400"
            style={{
              width: i === active ? 20 : 8,
              height: 8,
              background: i === active ? "#7C3AED" : "rgba(255,255,255,0.18)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
