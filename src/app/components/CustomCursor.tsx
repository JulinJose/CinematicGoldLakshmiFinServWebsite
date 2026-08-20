import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useIsMobile } from "./ui/use-mobile";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [big, setBig] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Only detect fine pointer device (like a mouse/trackpad)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsFinePointer(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsFinePointer(e.matches);
    };
    mediaQuery.addEventListener("change", handleChange);

    // If it's a mobile viewport or does not support fine pointer, do not add listeners
    if (isMobile || !mediaQuery.matches) {
      return () => {
        mediaQuery.removeEventListener("change", handleChange);
      };
    }

    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    const onEnter = () => setBig(true);
    const onLeave = () => setBig(false);
    const addListeners = () => {
      document.querySelectorAll("a,button,[role=button]").forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };
    addListeners();
    const obs = new MutationObserver(addListeners);
    obs.observe(document.body, { childList: true, subtree: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      obs.disconnect();
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [isMobile]);

  if (isMobile || !isFinePointer) return null;

  return (
    <>
      <motion.div
        className="fixed pointer-events-none"
        style={{ zIndex: 9999, borderRadius: "50%", width: 8, height: 8, background: "#FFD700", marginLeft: -4, marginTop: -4 }}
        animate={{ left: pos.x, top: pos.y, scale: big ? 0.4 : 1 }}
        transition={{ type: "spring", stiffness: 1500, damping: 50 }}
      />
      <motion.div
        className="fixed pointer-events-none"
        style={{ zIndex: 9998, borderRadius: "50%", width: 44, height: 44, border: "1px solid rgba(255,215,0,0.45)", marginLeft: -22, marginTop: -22 }}
        animate={{ left: pos.x, top: pos.y, scale: big ? 1.8 : 1, borderColor: big ? "rgba(255,215,0,0.8)" : "rgba(255,215,0,0.45)" }}
        transition={{ type: "spring", stiffness: 160, damping: 20 }}
      />
    </>
  );
}

