import { useState, useEffect } from "react";
import { motion } from "motion/react";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [big, setBig] = useState(false);

  useEffect(() => {
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
    };
  }, []);

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
