"use client";
import { Card, CardContent, CardHeader } from "../ui/Card";
import { Sparkles as SparklesComp } from "../ui/Sparkles";
import { TimelineContent } from "../ui/TimelineAnimation";
import { VerticalCutReveal } from "../ui/VerticalCutReveal";
import { cn } from "../../lib/utils";
import NumberFlow from "@number-flow/react";
import { motion } from "framer-motion"; // Changed from motion/react to framer-motion for compatibility
import { useState, useRef } from "react";
import { useLanguage } from "../../lib/LanguageContext";
import { translations } from "../../lib/translations";

const plans = [
  {
    name: "Free",
    description:
      "Perfect for small businesses and startups starting with AI.",
    price: 0,
    yearlyPrice: 0,
    buttonText: "Get Started",
    buttonVariant: "outline",
    includes: [
      "Included in Free:",
      "3 Active Landing Pages",
      "Unlimited AI Generation",
      "Basic Templates",
      "Standard Support",
    ],
  },
  {
    name: "Pro",
    description:
      "Best value for growing companies needing advanced features.",
    price: 100,
    yearlyPrice: 780,
    buttonText: "Subscribe",
    buttonVariant: "default",
    popular: true,
    includes: [
      "Everything in Free, plus:",
      "Unlimited Pages",
      "Advanced AI Copywriting",
      "Full Automatic SEO",
      "CRM Integrations",
      "Priority Support",
    ],
  },
  {
    name: "Pro Max",
    description:
      "Advanced plan with enhanced security and unlimited access for large teams.",
    price: 160,
    yearlyPrice: 1248,
    buttonText: "Contact Us",
    buttonVariant: "outline",
    includes: [
      "Everything in Pro, plus:",
      "Multi-project Management",
      "Total White-label",
      "Unlimited API Access",
      "Dedicated Account Manager",
    ],
  },
];

const PricingSwitch = ({ onSwitch }) => {
  const [selected, setSelected] = useState("0");

  const handleSwitch = (value) => {
    setSelected(value);
    onSwitch(value);
  };

  return (
    <div className="flex justify-center">
      <div className="relative z-10 mx-auto flex w-fit rounded-full bg-neutral-900 border border-gray-700 p-1">
        <button
          onClick={() => handleSwitch("0")}
          className={cn(
            "relative z-10 w-fit h-10 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors cursor-pointer",
            selected === "0" ? "text-white" : "text-gray-200",
          )}
        >
          {selected === "0" && (
            <motion.span
              layoutId={"switch"}
              className="absolute top-0 left-0 h-10 w-full rounded-full border-4 shadow-sm shadow-blue-600 border-blue-600 bg-gradient-to-t from-blue-500 to-blue-600"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative">Monthly</span>
        </button>

        <button
          onClick={() => handleSwitch("1")}
          className={cn(
            "relative z-10 w-fit h-10 flex-shrink-0 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors cursor-pointer",
            selected === "1" ? "text-white" : "text-gray-200",
          )}
        >
          {selected === "1" && (
            <motion.span
              layoutId={"switch"}
              className="absolute top-0 left-0 h-10 w-full rounded-full border-4 shadow-sm shadow-blue-600 border-blue-600 bg-gradient-to-t from-blue-500 to-blue-600"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative flex items-center gap-2">Yearly <span className="text-[10px] bg-white/20 px-1 rounded">-35%</span></span>
        </button>
      </div>
    </div>
  );
};

export default function PricingSection6({ onLoginClick }) {
  const { language } = useLanguage();
  const t = translations[language].pricing;
  
  const [isYearly, setIsYearly] = useState(false);
  const pricingRef = useRef(null);

  const handlePlanClick = () => {
    if (onLoginClick) onLoginClick();
  };

  const plansData = [
    {
      ...plans[0],
      name: t.plans[0].name,
      description: t.plans[0].desc,
      buttonText: t.plans[0].button,
      includes: t.plans[0].features
    },
    {
      ...plans[1],
      name: t.plans[1].name,
      description: t.plans[1].desc,
      buttonText: t.plans[1].button,
      includes: t.plans[1].features
    },
    {
      ...plans[2],
      name: t.plans[2].name,
      description: t.plans[2].desc,
      buttonText: t.plans[2].button,
      includes: t.plans[2].features
    }
  ];

  const revealVariants = {
    visible: (i) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.4,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  const togglePricingPeriod = (value) =>
    setIsYearly(Number.parseInt(value) === 1);

  return (
    <div
      id="tarifs"
      className="min-h-screen mx-auto relative bg-[#f0f9ff] overflow-hidden flex flex-col justify-center py-20"
      ref={pricingRef}
    >
      {/* ... previous decorative elements ... */}
      <TimelineContent
        animationNum={4}
        timelineRef={pricingRef}
        customVariants={revealVariants}
        className="absolute top-0 h-96 w-screen overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] "
      >
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#0c4a6e10_1px,transparent_1px),linear-gradient(to_bottom,#0c4a6e05_1px,transparent_1px)] bg-[size:70px_80px] "></div>
        <SparklesComp
          density={1200}
          direction="bottom"
          speed={0.5}
          color="#0c4a6e"
          className="absolute inset-x-0 bottom-0 h-full w-full opacity-20 [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
        />
      </TimelineContent>
      
      <TimelineContent
        animationNum={5}
        timelineRef={pricingRef}
        customVariants={revealVariants}
        className="absolute left-0 top-[-114px] w-full h-full flex flex-col items-start justify-start content-start flex-none flex-nowrap gap-2.5 overflow-hidden p-0 z-0"
      >
        <div className="w-full h-full relative">
          <div
            className="absolute left-[-20%] right-[-20%] top-[-10%] h-[800px] flex-none rounded-full"
            style={{
              border: "150px solid rgba(14, 165, 233, 0.1)",
              filter: "blur(120px)",
              WebkitFilter: "blur(120px)",
            }}
          ></div>
        </div>
      </TimelineContent>

      <article className="text-center mb-12 max-w-3xl mx-auto space-y-4 relative z-50">
        <h2 className="text-4xl md:text-6xl font-black px-4">
          <VerticalCutReveal
            splitBy="words"
            staggerDuration={0.15}
            staggerFrom="first"
            reverse={true}
            containerClassName="justify-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 pb-2"
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 40,
              delay: 0,
            }}
          >
            {t.title}
          </VerticalCutReveal>
        </h2>

        <TimelineContent
          as="p"
          animationNum={0}
          timelineRef={pricingRef}
          customVariants={revealVariants}
          className="text-[#0c4a6e]/70 text-lg px-6"
        >
          {t.subtitle}
        </TimelineContent>

        <TimelineContent
          as="div"
          animationNum={1}
          timelineRef={pricingRef}
          customVariants={revealVariants}
        >
          <div className="flex justify-center">
            <div className="relative z-10 mx-auto flex w-fit rounded-full bg-neutral-900 border border-gray-700 p-1">
              <button
                onClick={() => togglePricingPeriod("0")}
                className={cn(
                  "relative z-10 w-fit h-10 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors cursor-pointer",
                  !isYearly ? "text-white" : "text-gray-200",
                )}
              >
                {!isYearly && (
                  <motion.span
                    layoutId={"switch"}
                    className="absolute top-0 left-0 h-10 w-full rounded-full border-4 shadow-sm shadow-blue-600 border-blue-600 bg-gradient-to-t from-blue-500 to-blue-600"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="relative">{t.monthly}</span>
              </button>

              <button
                onClick={() => togglePricingPeriod("1")}
                className={cn(
                  "relative z-10 w-fit h-10 flex-shrink-0 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors cursor-pointer",
                  isYearly ? "text-white" : "text-gray-200",
                )}
              >
                {isYearly && (
                  <motion.span
                    layoutId={"switch"}
                    className="absolute top-0 left-0 h-10 w-full rounded-full border-4 shadow-sm shadow-blue-600 border-blue-600 bg-gradient-to-t from-blue-500 to-blue-600"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="relative flex items-center gap-2">{t.yearly} <span className="text-[10px] bg-white/20 px-1 rounded">-35%</span></span>
              </button>
            </div>
          </div>
        </TimelineContent>
      </article>

      {/* ... rest of the grid ... */}
      <div className="grid grid-cols-1 md:grid-cols-3 max-w-6xl gap-6 px-6 mx-auto relative z-10 items-stretch">
        {plansData.map((plan, index) => (
          <TimelineContent
            key={plan.name}
            as="div"
            animationNum={2 + index}
            timelineRef={pricingRef}
            customVariants={revealVariants}
            className="h-full"
          >
            <Card
              className={`relative text-[#0c4a6e] border-blue-100 h-full flex flex-col ${
                plan.popular
                  ? "bg-white shadow-[0px_20px_60px_rgba(14,165,233,0.15)] border-blue-400/40 z-20 scale-105"
                  : "bg-white/80 z-10"
              }`}
            >
              <CardHeader className="text-left">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  {plan.popular && (
                    <span className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded">{t.popular}</span>
                  )}
                </div>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-black text-blue-900">
                    <NumberFlow
                      format={{
                        style: "decimal",
                      }}
                      value={isYearly ? plan.yearlyPrice : plan.price}
                      className="text-4xl font-black"
                    />
                    <span className="text-xl ml-1">DH</span>
                  </span>
                  <span className="text-blue-600/60 ml-2 font-medium">
                    /{isYearly ? t.year : t.month}
                  </span>
                </div>
                <p className="text-sm text-blue-800/60 leading-relaxed">{plan.description}</p>
              </CardHeader>

              <CardContent className="pt-0 flex-1 flex flex-col">
                <button
                  onClick={() => handlePlanClick(plan)}
                  className={cn(
                    "w-full mb-8 p-4 text-sm font-black uppercase tracking-widest rounded-xl transition-all duration-300 cursor-pointer text-white shadow-lg",
                    "bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 hover:scale-[1.03] hover:opacity-90",
                    plan.popular ? "shadow-purple-200" : "shadow-blue-100"
                  )}
                >
                  {plan.buttonText}
                </button>

                <div className="space-y-4 pt-6 border-t border-blue-50">
                  <h4 className="font-bold text-xs uppercase tracking-widest text-blue-400">
                    {plan.includes[0]}
                  </h4>
                  <ul className="space-y-3">
                    {plan.includes.slice(1).map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-3"
                      >
                        <div className="h-1.5 w-1.5 bg-blue-500 rounded-full" />
                        <span className="text-sm text-blue-800/70 font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TimelineContent>
        ))}
      </div>
    </div>
  );
}
