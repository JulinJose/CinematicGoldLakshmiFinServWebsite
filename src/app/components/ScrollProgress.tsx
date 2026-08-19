import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[100]"
      style={{ scaleX, background: "linear-gradient(to right, #C9A84C, #FFD700, #E8782A)", boxShadow: "0 0 10px rgba(255,215,0,0.6)" }}
    />
  );
}
