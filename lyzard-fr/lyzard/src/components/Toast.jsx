import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const messages = [
  "✦ 12,847 pages created today",
  "✦ New page published by Ahmed",
  "✦ Successful launch for StartUp X",
  "✦ +45% average conversion",
  "✦ Sarah just signed up",
];

export default function Toast() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-foreground text-background px-6 py-3 rounded-full text-sm font-medium shadow-2xl flex items-center gap-2"
        >
          {messages[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
