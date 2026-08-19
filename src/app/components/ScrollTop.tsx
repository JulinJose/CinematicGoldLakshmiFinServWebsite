import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "motion/react";
import { ChevronDown } from "lucide-react";

export function ScrollTop() {
  const { scrollYProgress } = useScroll();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => setShow(v > 0.15));
    return unsub;
  }, [scrollYProgress]);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.93 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed left-5 bottom-24 md:bottom-7 z-40 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer"
          style={{ background: "rgba(13,27,56,0.9)", backdropFilter: "blur(12px)", border: "1px solid rgba(201,168,76,0.25)" }}
        >
          <ChevronDown size={18} className="rotate-180" style={{ color: "#C9A84C" }} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
