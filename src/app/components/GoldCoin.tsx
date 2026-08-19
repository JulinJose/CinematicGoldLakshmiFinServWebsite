import { motion } from "motion/react";

export function GoldCoin() {
  return (
    <div style={{ perspective: "900px" }}>
      <motion.div
        style={{ transformStyle: "preserve-3d", width: 260, height: 260, position: "relative" }}
        animate={{ rotateY: 360 }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
      >
        {/* FRONT */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          background: "radial-gradient(ellipse at 38% 32%, #FFFDE0 0%, #FFD700 25%, #C9A84C 55%, #8B6914 80%, #5C4400 100%)",
          boxShadow: "0 0 80px rgba(255,215,0,0.65), 0 0 160px rgba(255,215,0,0.18), inset 0 6px 24px rgba(255,255,255,0.5), inset 0 -6px 24px rgba(0,0,0,0.35)",
          backfaceVisibility: "hidden",
        }}>
          <div style={{ position: "absolute", inset: 10, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.15)" }} />
          <div style={{ position: "absolute", inset: 20, borderRadius: "50%", border: "1px solid rgba(201,168,76,0.3)" }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
            <div style={{ fontFamily: "Cinzel, serif", fontWeight: 900, fontSize: "2.4rem", color: "#3D2800", lineHeight: 1, textShadow: "0 2px 8px rgba(255,255,255,0.4)" }}>GL</div>
            <div style={{ fontFamily: "Cinzel, serif", fontSize: "0.45rem", letterSpacing: "0.35em", color: "#5C4400", marginTop: 4 }}>GOLDLAKSHMI</div>
            <div style={{ fontFamily: "Cinzel, serif", fontSize: "0.38rem", letterSpacing: "0.2em", color: "rgba(92,68,0,0.7)", marginTop: 2 }}>FINSERV · 24K</div>
          </div>
        </div>
        {/* BACK */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          background: "radial-gradient(ellipse at 62% 68%, #FFFDE0 0%, #FFD700 25%, #C9A84C 55%, #8B6914 80%, #5C4400 100%)",
          boxShadow: "0 0 80px rgba(255,215,0,0.55), inset 0 4px 20px rgba(255,255,255,0.35)",
          backfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
        }}>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "4.5rem", color: "rgba(60,40,0,0.5)", lineHeight: 1 }}>₹</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
