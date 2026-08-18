import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
} from "motion/react";
import {
  Phone,
  MessageCircle,
  Mail,
  Menu,
  X,
  ArrowRight,
  Star,
  Scale,
  Shield,
  Award,
  Users,
  Zap,
  CheckCircle,
  Coins,
  TrendingUp,
  Clock,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Percent,
  MapPin,
  Send,
  Gem,
} from "lucide-react";

// ─── KEYFRAMES ─────────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @keyframes goldFlow {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes goldPulseGlow {
    0%,100% { box-shadow: 0 0 20px rgba(255,215,0,0.3), 0 4px 24px rgba(0,0,0,0.4); }
    50%      { box-shadow: 0 0 50px rgba(255,215,0,0.7), 0 4px 24px rgba(0,0,0,0.4); }
  }
  @keyframes orbSpin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes orbSpinRev {
    from { transform: rotate(0deg); }
    to   { transform: rotate(-360deg); }
  }
  @keyframes floatY {
    0%,100% { transform: translateY(0px); }
    50%      { transform: translateY(-12px); }
  }
  @keyframes shimmerSlide {
    0%   { transform: translateX(-100%) skewX(-15deg); }
    100% { transform: translateX(300%) skewX(-15deg); }
  }
  @keyframes rayPulse {
    0%,100% { opacity: 0.03; }
    50%      { opacity: 0.08; }
  }
  @media (pointer: fine) {
    * { cursor: none !important; }
  }
  input[type=range] { -webkit-appearance: none; appearance: none; }
  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 22px; height: 22px; border-radius: 50%;
    background: linear-gradient(135deg, #C9A84C, #FFD700);
    cursor: pointer;
    box-shadow: 0 0 12px rgba(255,215,0,0.5);
    border: 2px solid rgba(255,255,255,0.3);
  }
  input[type=range]::-moz-range-thumb {
    width: 22px; height: 22px; border-radius: 50%;
    background: linear-gradient(135deg, #C9A84C, #FFD700);
    cursor: pointer; border: none;
    box-shadow: 0 0 12px rgba(255,215,0,0.5);
  }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: #050A18; }
  ::-webkit-scrollbar-thumb { background: linear-gradient(to bottom, #C9A84C, #FFD700); border-radius: 4px; }
  html { scroll-behavior: smooth; }
`;

// ─── DATA ──────────────────────────────────────────────────────────────────────
const GOLD_RATE: Record<string, number> = {
  "24K": 6850, "22K": 6275, "18K": 5125, "14K": 3985,
};

const GALLERY = [
  {
    id: 1, tag: "BULLION", title: "Gold Bullion Bars", sub: "Investment Grade 99.9%",
    img: "https://images.unsplash.com/photo-1718752773283-de1f92513671?w=600&h=750&fit=crop&auto=format",
  },
  {
    id: 2, tag: "COINS", title: "Gold Sovereigns", sub: "24K Minted Coins",
    img: "https://images.unsplash.com/photo-1624365168056-daf44387e2ae?w=600&h=750&fit=crop&auto=format",
  },
  {
    id: 3, tag: "CHAINS", title: "Heritage Chains", sub: "22K Handcrafted",
    img: "https://images.unsplash.com/photo-1640183297213-863406155597?w=600&h=750&fit=crop&auto=format",
  },
  {
    id: 4, tag: "RINGS", title: "Bridal Rings", sub: "18K Diamond Set",
    img: "https://images.unsplash.com/photo-1626784214536-d859187e0bd0?w=600&h=750&fit=crop&auto=format",
  },
  {
    id: 5, tag: "BANGLES", title: "Temple Bangles", sub: "22K Temple Gold",
    img: "https://images.unsplash.com/photo-1718752773195-c19c1c329156?w=600&h=750&fit=crop&auto=format",
  },
  {
    id: 6, tag: "JEWELLERY", title: "Bridal Set", sub: "22K Filigree Work",
    img: "https://images.unsplash.com/photo-1606293926249-ed22e446d476?w=600&h=750&fit=crop&auto=format",
  },
];

const LOAN_STEPS = [
  {
    id: 1, icon: Scale, title: "Gold Valuation", time: "15 min",
    desc: "Our certified experts assess your gold using advanced XRF technology for precise purity and weight measurement. No estimates — exact numbers.",
  },
  {
    id: 2, icon: Coins, title: "Choose Your Plan", time: "5 min",
    desc: "Select from Standard, Premium, or Elite loan plans tailored to your amount and tenure needs. Flexible repayment on your terms.",
  },
  {
    id: 3, icon: Shield, title: "Instant Processing", time: "10 min",
    desc: "Digital KYC and instant approval. Zero paperwork. Your gold moves to our bank-grade insured vault while you wait comfortably.",
  },
  {
    id: 4, icon: TrendingUp, title: "Financial Freedom", time: "Instant",
    desc: "Funds transferred directly to your account the moment approval is confirmed. Use for business, education, medical, or any purpose.",
  },
];

const LOAN_PLANS = [
  {
    name: "Standard", color: "#C9A84C", upTo: "₹5 Lakhs",
    rate: "0.99%", tenure: "12 months", features: ["Monthly interest", "No prepayment fee", "Doorstep pickup"],
  },
  {
    name: "Premium", color: "#FFD700", upTo: "₹20 Lakhs",
    rate: "0.89%", tenure: "24 months", features: ["Bullet repayment", "Top-up facility", "Dedicated RM"],
    popular: true,
  },
  {
    name: "Elite", color: "#E8782A", upTo: "₹1 Crore+",
    rate: "0.79%", tenure: "36 months", features: ["Custom schedule", "Priority service", "Portfolio advisory"],
  },
];

const WHY_US = [
  { icon: Shield,       title: "Bank-Grade Security",  desc: "Gold stored in certified vaults with 100% insurance and biometric 24/7 surveillance.", color: "#C9A84C" },
  { icon: Zap,          title: "30-Minute Disbursal",  desc: "Walk-in to funds-in-account in under 30 minutes. India's fastest gold loan process.", color: "#FFD700" },
  { icon: Percent,      title: "From 0.99%/Month",     desc: "Lowest interest rates with zero hidden charges. Complete transparency, always.", color: "#E8782A" },
  { icon: Gem,          title: "Highest Valuation",    desc: "AI-powered XRF valuation engine ensures you receive the maximum market value.", color: "#C9A84C" },
  { icon: Users,        title: "2 Lakh+ Families",     desc: "Trusted across India for a decade. 98.7% satisfaction rate maintained consistently.", color: "#FFD700" },
  { icon: CheckCircle,  title: "RBI Regulated",        desc: "Fully licensed and regulated by RBI. Your safety and trust are always our priority.", color: "#E8782A" },
];

const TESTIMONIALS = [
  { name: "Priya Sharma",  loc: "Mumbai",    rating: 5, amount: "₹4.5L",  av: "PS", text: "Smooth, fast, and incredibly professional. The valuation was spot-on and I received funds within 20 minutes. GoldLakshmi has truly reimagined what a gold loan should feel like." },
  { name: "Rajesh Kumar",  loc: "Delhi",     rating: 5, amount: "₹8.2L",  av: "RK", text: "Transparent, fair, and instant. The entire process is digital with zero paperwork. I've recommended GoldLakshmi to everyone in my network. Exceptional experience." },
  { name: "Anitha Reddy",  loc: "Hyderabad", rating: 5, amount: "₹2.75L", av: "AR", text: "Used the loan for my daughter's education. The interest rates are genuinely the lowest I found. GoldLakshmi truly understands and empowers Indian families." },
  { name: "Suresh Nair",   loc: "Chennai",   rating: 5, amount: "₹6.15L", av: "SN", text: "Accurate valuation, instant approval, zero paperwork. This is exactly what modern gold finance should look like. The app and staff both exceeded every expectation." },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function goldGradText(fontSize?: string): React.CSSProperties {
  return {
    background: "linear-gradient(135deg, #C9A84C 0%, #FFD700 40%, #E8B84B 70%, #C9A84C 100%)",
    backgroundSize: "200% auto",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    animation: "goldFlow 4s linear infinite",
    ...(fontSize ? { fontSize } : {}),
  };
}

function glassStyle(extraBorder?: string): React.CSSProperties {
  return {
    background: "rgba(13, 27, 56, 0.72)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    border: `1px solid ${extraBorder ?? "rgba(201,168,76,0.18)"}`,
    boxShadow: "0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)",
  };
}

// ─── GOLD PARTICLES (Canvas) ──────────────────────────────────────────────────
function GoldParticles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    type P = { x:number; y:number; r:number; vx:number; vy:number; op:number; sh:number; ss:number };
    const pts: P[] = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35 - 0.08,
      op: Math.random() * 0.6 + 0.25,
      sh: Math.random() * Math.PI * 2,
      ss: 0.008 + Math.random() * 0.018,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy; p.sh += p.ss;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        const op = p.op * (0.35 + 0.65 * Math.abs(Math.sin(p.sh)));
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        g.addColorStop(0, `rgba(255,220,50,${op})`);
        g.addColorStop(0.4, `rgba(201,168,76,${op * 0.4})`);
        g.addColorStop(1, "rgba(201,168,76,0)");
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,248,180,${Math.min(op * 1.4, 1)})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }} />;
}

// ─── 3D GOLD COIN ─────────────────────────────────────────────────────────────
function GoldCoin() {
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

// ─── CUSTOM CURSOR ────────────────────────────────────────────────────────────
function CustomCursor() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [big, setBig] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    const onEnter = () => setBig(true);
    const onLeave = () => setBig(false);
    const addListeners = () => {
      document.querySelectorAll("a,button,[role=button]").forEach(el => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };
    addListeners();
    const obs = new MutationObserver(addListeners);
    obs.observe(document.body, { childList: true, subtree: true });
    return () => { window.removeEventListener("mousemove", onMove); obs.disconnect(); };
  }, []);

  return (
    <>
      <motion.div
        className="fixed pointer-events-none hidden md:block"
        style={{ zIndex: 9999, borderRadius: "50%", width: 8, height: 8, background: "#FFD700", marginLeft: -4, marginTop: -4 }}
        animate={{ left: pos.x, top: pos.y, scale: big ? 0.4 : 1 }}
        transition={{ type: "spring", stiffness: 1500, damping: 50 }}
      />
      <motion.div
        className="fixed pointer-events-none hidden md:block"
        style={{ zIndex: 9998, borderRadius: "50%", width: 44, height: 44, border: "1px solid rgba(255,215,0,0.45)", marginLeft: -22, marginTop: -22 }}
        animate={{ left: pos.x, top: pos.y, scale: big ? 1.8 : 1, borderColor: big ? "rgba(255,215,0,0.8)" : "rgba(255,215,0,0.45)" }}
        transition={{ type: "spring", stiffness: 160, damping: 20 }}
      />
    </>
  );
}

// ─── SCROLL PROGRESS ─────────────────────────────────────────────────────────
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[100]"
      style={{ scaleX, background: "linear-gradient(to right, #C9A84C, #FFD700, #E8782A)", boxShadow: "0 0 10px rgba(255,215,0,0.6)" }}
    />
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const unsub = scrollYProgress.on("change", v => setScrolled(v > 0.02));
    return unsub;
  }, [scrollYProgress]);

  const links = [
    { label: "Gold Value", href: "#calculator" },
    { label: "Showcase", href: "#showcase" },
    { label: "Gold Loans", href: "#loans" },
    { label: "Why Us", href: "#why" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, type: "spring", delay: 0.3 }}
        className="fixed top-3 left-3 right-3 z-50 rounded-2xl"
        style={{
          ...glassStyle(),
          background: scrolled ? "rgba(5,10,24,0.92)" : "rgba(5,10,24,0.45)",
          borderColor: scrolled ? "rgba(201,168,76,0.35)" : "rgba(201,168,76,0.12)",
          transition: "background 0.4s, border-color 0.4s, box-shadow 0.4s",
          boxShadow: scrolled ? "0 8px 50px rgba(0,0,0,0.7), 0 0 40px rgba(255,215,0,0.04)" : "none",
        }}
      >
        <div className="flex items-center justify-between px-5 py-3">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #C9A84C, #FFD700)", boxShadow: "0 0 18px rgba(255,215,0,0.45)" }}>
              <span style={{ fontFamily: "Cinzel, serif", fontWeight: 900, color: "#050A18", fontSize: "0.8rem" }}>GL</span>
            </div>
            <div className="hidden sm:block">
              <div style={{ fontFamily: "Cinzel, serif", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.1em", ...goldGradText() }}>GOLDLAKSHMI</div>
              <div className="text-gray-500 text-[0.6rem] tracking-[0.3em]" style={{ fontFamily: "Raleway, sans-serif" }}>FINSERV</div>
            </div>
          </div>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-5">
            {links.map(l => (
              <button key={l.href} onClick={() => scrollTo(l.href)}
                className="text-gray-300 hover:text-yellow-400 transition-colors text-[0.72rem] tracking-widest uppercase"
                style={{ fontFamily: "Raleway, sans-serif" }}>
                {l.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,215,0,0.45)" }}
              whileTap={{ scale: 0.96 }}
              className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-xl text-[0.72rem] font-bold tracking-widest uppercase"
              style={{ background: "linear-gradient(135deg, #C9A84C, #FFD700, #C9A84C)", backgroundSize: "200% auto", animation: "goldFlow 4s linear infinite", color: "#050A18", fontFamily: "Cinzel, serif", boxShadow: "0 0 18px rgba(255,215,0,0.25)" }}
              onClick={() => scrollTo("#contact")}>
              Apply Now
            </motion.button>
            <button className="lg:hidden text-yellow-400 p-1.5" onClick={() => setOpen(!open)}>
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t" style={{ borderColor: "rgba(201,168,76,0.15)" }}>
              <div className="px-5 py-4 flex flex-col gap-2">
                {links.map(l => (
                  <button key={l.href} onClick={() => scrollTo(l.href)}
                    className="text-left text-gray-300 hover:text-yellow-400 text-sm tracking-widest uppercase py-2 transition-colors"
                    style={{ fontFamily: "Raleway, sans-serif" }}>
                    {l.label}
                  </button>
                ))}
                <motion.button whileTap={{ scale: 0.97 }} onClick={() => scrollTo("#contact")}
                  className="mt-2 py-3 rounded-xl text-xs font-bold tracking-widest uppercase"
                  style={{ background: "linear-gradient(135deg, #C9A84C, #FFD700)", color: "#050A18", fontFamily: "Cinzel, serif" }}>
                  Apply for Gold Loan
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile bottom nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 safe-b"
        style={{ background: "rgba(5,10,24,0.96)", backdropFilter: "blur(24px)", borderTop: "1px solid rgba(201,168,76,0.18)" }}>
        <div className="flex justify-around py-2">
          {[
            { icon: Coins, label: "Calculate", href: "#calculator" },
            { icon: Gem, label: "Showcase", href: "#showcase" },
            { icon: TrendingUp, label: "Loans", href: "#loans" },
            { icon: Phone, label: "Contact", href: "#contact" },
          ].map(({ icon: Icon, label, href }) => (
            <button key={href} onClick={() => scrollTo(href)}
              className="flex flex-col items-center gap-1 px-4 py-2">
              <Icon size={17} className="text-yellow-500" />
              <span className="text-gray-500 text-[0.6rem] tracking-wide" style={{ fontFamily: "Raleway, sans-serif" }}>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setMouse({ x: ((e.clientX - r.left) / r.width - 0.5) * 28, y: ((e.clientY - r.top) / r.height - 0.5) * 18 });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [onMove]);

  return (
    <div ref={ref} className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "radial-gradient(ellipse 90% 80% at 18% 55%, #162260 0%, #050A18 52%, #0a1428 100%)" }}>
      {/* Light rays */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="absolute origin-bottom"
            style={{
              bottom: 0, left: `${3 + i * 10}%`, width: "1px", height: "75%",
              background: `linear-gradient(to top, transparent 0%, rgba(255,215,0,${0.025 + (i % 3) * 0.01}) 50%, transparent 100%)`,
              transform: `rotate(${-25 + i * 5.5}deg)`,
              filter: "blur(4px)",
              animation: `rayPulse ${3 + i % 3}s ease-in-out infinite ${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Glow orbs */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <div style={{ position: "absolute", top: "20%", left: "15%", width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,215,0,0.12) 0%, transparent 70%)", filter: "blur(50px)", animation: "floatY 6s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "20%", right: "20%", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,120,42,0.1) 0%, transparent 70%)", filter: "blur(35px)", animation: "floatY 8s ease-in-out infinite 2s" }} />
      </div>

      <GoldParticles />

      <div className="relative container mx-auto px-6 pt-28 pb-20 grid lg:grid-cols-2 gap-10 items-center" style={{ zIndex: 3 }}>
        {/* Text side */}
        <div>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
            className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full text-[0.7rem] tracking-widest uppercase"
            style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)", color: "#C9A84C", fontFamily: "Raleway, sans-serif" }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#FFD700" }} />
            India's Premier Gold Finance Partner
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.65 }}
            style={{ fontFamily: "Cinzel, serif", lineHeight: 1.12, marginBottom: "1.5rem" }}>
            <div className="text-5xl lg:text-[4.2rem] xl:text-[4.8rem] font-bold text-white">Your Gold.</div>
            <div className="text-5xl lg:text-[4.2rem] xl:text-[4.8rem] font-bold" style={goldGradText()}>Your Value.</div>
            <div className="text-5xl lg:text-[4.2rem] xl:text-[4.8rem] font-bold">
              <span className="text-white">Your </span>
              <span style={{ color: "#E8782A" }}>Financial</span>
            </div>
            <div className="text-5xl lg:text-[4.2rem] xl:text-[4.8rem] font-bold text-white">Freedom.</div>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }}
            className="text-gray-300 text-lg mb-8 max-w-lg leading-relaxed"
            style={{ fontFamily: "Raleway, sans-serif" }}>
            Transform your idle gold into instant financial power. Highest valuations, lowest rates, and bank-grade security — in under 30 minutes.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.05 }}
            className="flex flex-wrap gap-4 mb-10">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 45px rgba(255,215,0,0.5)" }}
              whileTap={{ scale: 0.96 }}
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="relative overflow-hidden flex items-center gap-2 px-7 py-4 rounded-xl text-sm font-bold tracking-widest uppercase"
              style={{ background: "linear-gradient(135deg, #C9A84C, #FFD700, #C9A84C)", backgroundSize: "200% auto", animation: "goldFlow 4s linear infinite", color: "#050A18", fontFamily: "Cinzel, serif", boxShadow: "0 0 22px rgba(255,215,0,0.28)" }}>
              <span className="relative z-10">Get Gold Loan</span>
              <span className="relative z-10"><ArrowRight size={15} /></span>
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)", animation: "shimmerSlide 1.5s infinite" }} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, borderColor: "rgba(201,168,76,0.7)", boxShadow: "0 0 25px rgba(255,215,0,0.15)" }}
              whileTap={{ scale: 0.96 }}
              onClick={() => document.querySelector("#calculator")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center gap-2 px-7 py-4 rounded-xl text-sm font-bold tracking-widest uppercase transition-all"
              style={{ border: "1px solid rgba(201,168,76,0.4)", color: "#FFD700", fontFamily: "Cinzel, serif" }}>
              <Coins size={15} /> Calculate Value
            </motion.button>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.25 }}
            className="grid grid-cols-3 gap-3">
            {[["2L+", "Happy Customers"], ["500Cr+", "Gold Processed"], ["30 Min", "Avg Disbursal"]].map(([v, l]) => (
              <div key={l} className="text-center p-3 rounded-xl"
                style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(201,168,76,0.13)" }}>
                <div className="text-lg font-bold" style={goldGradText()}>{v}</div>
                <div className="text-gray-500 text-[0.65rem] mt-1 tracking-wide" style={{ fontFamily: "Raleway, sans-serif" }}>{l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Coin side */}
        <motion.div className="flex justify-center items-center"
          animate={{ x: mouse.x * 0.22, y: mouse.y * 0.18 }}
          transition={{ type: "spring", stiffness: 45, damping: 18 }}>
          <div className="relative flex items-center justify-center">
            {/* Orbiting rings */}
            {[1, 2, 3].map(i => (
              <div key={i} className="absolute rounded-full border pointer-events-none"
                style={{
                  width: 260 + i * 70, height: 260 + i * 70,
                  borderColor: `rgba(255,215,0,${0.1 - i * 0.025})`,
                  animation: `${i % 2 ? "orbSpin" : "orbSpinRev"} ${10 + i * 6}s linear infinite`,
                  borderStyle: i === 2 ? "dashed" : "solid",
                  borderWidth: 1,
                }}
              />
            ))}

            <GoldCoin />

            {/* Floating badges */}
            <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-8 px-3 py-1.5 rounded-xl text-xs font-bold tracking-widest"
              style={{ background: "rgba(13,27,56,0.85)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,215,0,0.4)", color: "#FFD700", fontFamily: "Cinzel, serif" }}>
              24K PURE
            </motion.div>
            <motion.div animate={{ y: [10, -10, 10] }} transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              className="absolute -bottom-6 -left-8 px-3 py-1.5 rounded-xl text-xs tracking-wide"
              style={{ background: "rgba(13,27,56,0.85)", backdropFilter: "blur(12px)", border: "1px solid rgba(232,120,42,0.35)", color: "#E8782A", fontFamily: "Raleway, sans-serif" }}>
              ₹6,850/gram today
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2.2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5" style={{ zIndex: 5 }}>
        <span className="text-[0.65rem] tracking-[0.3em] uppercase text-gray-500" style={{ fontFamily: "Raleway, sans-serif" }}>Explore</span>
        <ChevronDown size={14} className="text-yellow-700" />
      </motion.div>
    </div>
  );
}

// ─── GOLD CALCULATOR ─────────────────────────────────────────────────────────
function GoldCalculator() {
  const [karat, setKarat] = useState("22K");
  const [weight, setWeight] = useState(20);
  const [ltv, setLtv] = useState(75);

  const goldVal = Math.round(weight * GOLD_RATE[karat]);
  const loanVal = Math.round(goldVal * ltv / 100);
  const emi = Math.round(loanVal * 0.0099);

  return (
    <section id="calculator" className="relative py-24 px-6"
      style={{ background: "linear-gradient(180deg, #050A18 0%, #081022 55%, #050A18 100%)" }}>
      <div className="container mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <div className="text-[0.7rem] tracking-widest text-yellow-700 uppercase mb-3" style={{ fontFamily: "Raleway, sans-serif" }}>Know Your Worth</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "Cinzel, serif" }}>
            Gold <span style={goldGradText()}>Value</span> Calculator
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto text-sm leading-relaxed" style={{ fontFamily: "Raleway, sans-serif" }}>
            Real-time valuations at today's market rates. Instantly discover your gold's worth and loan eligibility.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-6">
          {/* Controls — 3 cols */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="md:col-span-3 p-8 rounded-2xl" style={glassStyle()}>
            {/* Karat */}
            <div className="mb-8">
              <label className="block text-[0.7rem] tracking-widest uppercase text-gray-400 mb-4" style={{ fontFamily: "Raleway, sans-serif" }}>Gold Purity</label>
              <div className="grid grid-cols-4 gap-2">
                {Object.keys(GOLD_RATE).map(k => (
                  <motion.button key={k} whileTap={{ scale: 0.93 }} onClick={() => setKarat(k)}
                    className="py-3 rounded-xl text-sm font-bold tracking-wide relative overflow-hidden"
                    style={{
                      fontFamily: "Cinzel, serif",
                      background: karat === k ? "linear-gradient(135deg, #C9A84C, #FFD700)" : "rgba(255,255,255,0.04)",
                      color: karat === k ? "#050A18" : "#777",
                      border: karat === k ? "none" : "1px solid rgba(201,168,76,0.12)",
                      boxShadow: karat === k ? "0 0 24px rgba(255,215,0,0.35)" : "none",
                      transition: "all 0.25s ease",
                    }}>
                    {k}
                    {karat === k && <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity"
                      style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)", animation: "shimmerSlide 1.5s infinite" }} />}
                  </motion.button>
                ))}
              </div>
              <div className="mt-2 text-right text-[0.65rem] text-gray-600" style={{ fontFamily: "Raleway, sans-serif" }}>
                Today: ₹{GOLD_RATE[karat].toLocaleString("en-IN")}/gram
              </div>
            </div>

            {/* Weight */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <label className="text-[0.7rem] tracking-widest uppercase text-gray-400" style={{ fontFamily: "Raleway, sans-serif" }}>Weight</label>
                <span className="text-yellow-400 font-bold text-xl" style={{ fontFamily: "Cinzel, serif" }}>{weight} g</span>
              </div>
              <input type="range" min={1} max={500} value={weight} onChange={e => setWeight(+e.target.value)}
                className="w-full h-2 rounded-full"
                style={{ background: `linear-gradient(to right, #C9A84C 0%, #FFD700 ${(weight/500)*100}%, rgba(255,255,255,0.08) ${(weight/500)*100}%)` }} />
              <div className="flex justify-between text-gray-600 text-[0.6rem] mt-2" style={{ fontFamily: "Raleway, sans-serif" }}>
                <span>1g</span><span>250g</span><span>500g</span>
              </div>
            </div>

            {/* LTV */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-[0.7rem] tracking-widest uppercase text-gray-400" style={{ fontFamily: "Raleway, sans-serif" }}>Loan-to-Value</label>
                <span className="text-orange-400 font-bold text-xl" style={{ fontFamily: "Cinzel, serif" }}>{ltv}%</span>
              </div>
              <input type="range" min={50} max={90} value={ltv} onChange={e => setLtv(+e.target.value)}
                className="w-full h-2 rounded-full"
                style={{ background: `linear-gradient(to right, #E8782A 0%, #F5A55A ${((ltv-50)/40)*100}%, rgba(255,255,255,0.08) ${((ltv-50)/40)*100}%)` }} />
              <div className="flex justify-between text-gray-600 text-[0.6rem] mt-2" style={{ fontFamily: "Raleway, sans-serif" }}>
                <span>50%</span><span>70%</span><span>90%</span>
              </div>
            </div>
          </motion.div>

          {/* Values — 2 cols */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="md:col-span-2 flex flex-col gap-4">
            {/* Gold value */}
            <div className="flex-1 p-6 rounded-2xl flex flex-col justify-center items-center text-center"
              style={{ ...glassStyle("rgba(255,215,0,0.28)"), background: "rgba(15,10,2,0.82)" }}>
              <div className="text-[0.65rem] tracking-widest text-gray-500 uppercase mb-2" style={{ fontFamily: "Raleway, sans-serif" }}>Market Value</div>
              <AnimatePresence mode="wait">
                <motion.div key={goldVal} initial={{ scale: 1.15, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-4xl font-bold mb-1" style={{ fontFamily: "Cinzel, serif", ...goldGradText() }}>
                  ₹{goldVal.toLocaleString("en-IN")}
                </motion.div>
              </AnimatePresence>
              <div className="text-gray-600 text-[0.62rem]" style={{ fontFamily: "Raleway, sans-serif" }}>{weight}g × {karat} × ₹{GOLD_RATE[karat]}/g</div>
            </div>

            {/* Loan value */}
            <div className="flex-1 p-6 rounded-2xl flex flex-col justify-center items-center text-center"
              style={{ background: "rgba(232,120,42,0.07)", border: "1px solid rgba(232,120,42,0.3)", borderRadius: "1rem" }}>
              <div className="text-[0.65rem] tracking-widest text-gray-500 uppercase mb-2" style={{ fontFamily: "Raleway, sans-serif" }}>Eligible Loan</div>
              <AnimatePresence mode="wait">
                <motion.div key={loanVal} initial={{ scale: 1.15, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-3xl font-bold mb-1" style={{ fontFamily: "Cinzel, serif", color: "#E8782A" }}>
                  ₹{loanVal.toLocaleString("en-IN")}
                </motion.div>
              </AnimatePresence>
              <div className="text-gray-600 text-[0.62rem] mb-1" style={{ fontFamily: "Raleway, sans-serif" }}>At {ltv}% LTV</div>
              <div className="text-[0.62rem] text-yellow-700" style={{ fontFamily: "Raleway, sans-serif" }}>EMI from ₹{emi.toLocaleString("en-IN")}/mo</div>
            </div>

            {/* CTA */}
            <motion.button whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(255,215,0,0.4)" }} whileTap={{ scale: 0.97 }}
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="w-full py-4 rounded-xl text-sm font-bold tracking-widest uppercase relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #C9A84C, #FFD700, #C9A84C)", backgroundSize: "200% auto", animation: "goldFlow 4s linear infinite", color: "#050A18", fontFamily: "Cinzel, serif", boxShadow: "0 0 20px rgba(255,215,0,0.22)" }}>
              Apply for This Loan
              <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)", animation: "shimmerSlide 2s infinite" }} />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── GOLD SHOWCASE ────────────────────────────────────────────────────────────
function GoldShowcase() {
  const [active, setActive] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="showcase" className="relative py-24 px-6" style={{ background: "#050A18" }}>
      <div className="container mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <div className="text-[0.7rem] tracking-widest text-yellow-700 uppercase mb-3" style={{ fontFamily: "Raleway, sans-serif" }}>The Treasury</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "Cinzel, serif" }}>
            Gold <span style={goldGradText()}>Showcase</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto text-sm leading-relaxed" style={{ fontFamily: "Raleway, sans-serif" }}>
            From investment bullion to heritage jewellery — we accept all forms at maximum market valuation.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {GALLERY.map((item, i) => (
            <motion.div key={item.id}
              initial={{ opacity: 0, y: 44 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              whileHover={{ y: -8 }}
              onHoverStart={() => setHovered(item.id)}
              onHoverEnd={() => setHovered(null)}
              onClick={() => setActive(item.id)}
              className="relative rounded-2xl overflow-hidden cursor-pointer group"
              style={{ aspectRatio: "3/4", border: hovered === item.id ? "1px solid rgba(255,215,0,0.5)" : "1px solid rgba(201,168,76,0.12)", transition: "border-color 0.3s" }}>
              {/* Image */}
              <div className="absolute inset-0 bg-yellow-950">
                <img src={item.img} alt={item.title} loading="lazy"
                  className="w-full h-full object-cover transition-all duration-700"
                  style={{ opacity: hovered === item.id ? 1 : 0.75, transform: hovered === item.id ? "scale(1.1)" : "scale(1)" }} />
              </div>
              {/* Gradient overlay */}
              <div className="absolute inset-0 transition-opacity duration-500"
                style={{ background: "linear-gradient(to top, rgba(5,10,24,0.92) 0%, rgba(5,10,24,0.2) 55%, transparent 100%)", opacity: hovered === item.id ? 0.7 : 1 }} />
              {/* Gold glow border on hover */}
              {hovered === item.id && (
                <div className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{ boxShadow: "inset 0 0 50px rgba(255,215,0,0.12)" }} />
              )}
              {/* Tag */}
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-lg text-[0.6rem] tracking-widest font-bold"
                  style={{ background: "rgba(201,168,76,0.14)", border: "1px solid rgba(201,168,76,0.35)", color: "#C9A84C", fontFamily: "Raleway, sans-serif", backdropFilter: "blur(8px)" }}>
                  {item.tag}
                </span>
              </div>
              {/* Eye */}
              <motion.div className="absolute top-3 right-3" initial={{ opacity: 0 }} animate={{ opacity: hovered === item.id ? 1 : 0 }} transition={{ duration: 0.2 }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,215,0,0.15)", border: "1px solid rgba(255,215,0,0.35)", backdropFilter: "blur(8px)" }}>
                  <Eye size={13} style={{ color: "#FFD700" }} />
                </div>
              </motion.div>
              {/* Text */}
              <div className="absolute bottom-0 left-0 right-0 p-4 transition-transform duration-300"
                style={{ transform: hovered === item.id ? "translateY(0)" : "translateY(4px)" }}>
                <div className="font-bold text-white text-sm mb-0.5" style={{ fontFamily: "Cinzel, serif" }}>{item.title}</div>
                <div className="text-gray-400 text-[0.65rem]" style={{ fontFamily: "Raleway, sans-serif" }}>{item.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (() => {
          const item = GALLERY.find(g => g.id === active);
          if (!item) return null;
          return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] flex items-center justify-center p-4"
              style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(24px)" }}
              onClick={() => setActive(null)}>
              <motion.div initial={{ scale: 0.82, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="relative max-w-sm w-full rounded-3xl overflow-hidden"
                style={{ border: "1px solid rgba(201,168,76,0.35)", boxShadow: "0 0 100px rgba(255,215,0,0.15)" }}
                onClick={e => e.stopPropagation()}>
                <img src={item.img.replace("w=600&h=750", "w=800&h=1000")} alt={item.title} className="w-full object-cover" style={{ maxHeight: "65vh" }} />
                <div className="p-6" style={{ background: "rgba(5,10,24,0.97)" }}>
                  <div className="text-[0.65rem] tracking-widest text-yellow-700 mb-1" style={{ fontFamily: "Raleway, sans-serif" }}>{item.tag}</div>
                  <div className="text-lg font-bold text-white mb-1" style={{ fontFamily: "Cinzel, serif" }}>{item.title}</div>
                  <div className="text-gray-500 text-xs mb-4" style={{ fontFamily: "Raleway, sans-serif" }}>{item.sub}</div>
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={() => { setActive(null); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
                    className="w-full py-3 rounded-xl text-xs font-bold tracking-widest uppercase"
                    style={{ background: "linear-gradient(135deg, #C9A84C, #FFD700)", color: "#050A18", fontFamily: "Cinzel, serif" }}>
                    Get Loan Against This Gold
                  </motion.button>
                </div>
                <button onClick={() => setActive(null)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.15)" }}>
                  <X size={13} className="text-white" />
                </button>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}

// ─── LOAN JOURNEY ─────────────────────────────────────────────────────────────
function LoanJourney() {
  const [step, setStep] = useState(0);
  const [plan, setPlan] = useState(1);

  return (
    <section id="loans" className="relative py-24 px-6"
      style={{ background: "linear-gradient(180deg, #050A18 0%, #081528 100%)" }}>
      <div className="container mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <div className="text-[0.7rem] tracking-widest text-yellow-700 uppercase mb-3" style={{ fontFamily: "Raleway, sans-serif" }}>Step by Step</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "Cinzel, serif" }}>
            Gold Loan <span style={goldGradText()}>Journey</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto text-sm leading-relaxed" style={{ fontFamily: "Raleway, sans-serif" }}>
            From gold in hand to funds in account — the most transparent and fastest loan process in India.
          </p>
        </motion.div>

        {/* Desktop progress stepper */}
        <div className="hidden md:block mb-10 relative">
          <div className="absolute top-10 left-[12.5%] right-[12.5%] h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
          <motion.div className="absolute top-10 left-[12.5%] h-px origin-left"
            animate={{ width: `${(step / (LOAN_STEPS.length - 1)) * 75}%` }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            style={{ background: "linear-gradient(to right, #C9A84C, #FFD700)", boxShadow: "0 0 8px rgba(255,215,0,0.5)" }}
          />
          <div className="grid grid-cols-4 gap-4">
            {LOAN_STEPS.map((s, i) => {
              const Icon = s.icon;
              const done = i < step, active = i === step;
              return (
                <motion.div key={s.id} onClick={() => setStep(i)} whileHover={{ scale: 1.06 }}
                  className="flex flex-col items-center cursor-pointer">
                  <motion.div className="w-20 h-20 rounded-full flex items-center justify-center mb-3 relative z-10 border-2"
                    animate={{
                      background: active ? ["linear-gradient(135deg,#C9A84C,#FFD700)", "linear-gradient(225deg,#C9A84C,#FFD700)", "linear-gradient(135deg,#C9A84C,#FFD700)"] : done ? "rgba(201,168,76,0.15)" : "rgba(13,27,56,0.9)",
                      borderColor: active ? "rgba(255,215,0,0.7)" : done ? "rgba(201,168,76,0.4)" : "rgba(255,255,255,0.1)",
                      boxShadow: active ? "0 0 40px rgba(255,215,0,0.5)" : "none",
                    }}
                    transition={{ duration: 2.5, repeat: active ? Infinity : 0 }}>
                    <Icon size={26} style={{ color: active ? "#050A18" : done ? "#C9A84C" : "#555" }} />
                  </motion.div>
                  <div className="text-sm font-bold text-center leading-tight mb-1" style={{ fontFamily: "Cinzel, serif", color: active ? "#FFD700" : done ? "#C9A84C" : "#555" }}>{s.title}</div>
                  <div className="text-[0.6rem] text-gray-600" style={{ fontFamily: "Raleway, sans-serif" }}>{s.time}</div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Step detail */}
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.35 }}>
            <div className="p-8 rounded-2xl mb-8" style={glassStyle("rgba(201,168,76,0.28)")}>
              <div className="flex flex-col md:flex-row items-center gap-7">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #C9A84C, #FFD700)", boxShadow: "0 0 40px rgba(255,215,0,0.4)" }}>
                  {(() => { const Icon = LOAN_STEPS[step].icon; return <Icon size={36} style={{ color: "#050A18" }} />; })()}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="text-[0.65rem] tracking-widest text-yellow-700 uppercase mb-1" style={{ fontFamily: "Raleway, sans-serif" }}>Step {step + 1} of {LOAN_STEPS.length}</div>
                  <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "Cinzel, serif" }}>{LOAN_STEPS[step].title}</h3>
                  <p className="text-gray-300 leading-relaxed text-sm" style={{ fontFamily: "Raleway, sans-serif" }}>{LOAN_STEPS[step].desc}</p>
                  <div className="flex items-center gap-2 mt-3 justify-center md:justify-start">
                    <Clock size={13} style={{ color: "#FFD700" }} />
                    <span className="text-yellow-600 text-xs" style={{ fontFamily: "Raleway, sans-serif" }}>{LOAN_STEPS[step].time}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Arrow nav */}
        <div className="flex justify-center gap-3 mb-16">
          <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }} onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}
            className="w-11 h-11 rounded-full flex items-center justify-center disabled:opacity-25"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,168,76,0.2)" }}>
            <ChevronLeft size={17} style={{ color: "#FFD700" }} />
          </motion.button>
          <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }} onClick={() => setStep(Math.min(LOAN_STEPS.length - 1, step + 1))} disabled={step === LOAN_STEPS.length - 1}
            className="w-11 h-11 rounded-full flex items-center justify-center disabled:opacity-25"
            style={{ background: "linear-gradient(135deg, #C9A84C, #FFD700)", boxShadow: "0 0 18px rgba(255,215,0,0.3)" }}>
            <ChevronRight size={17} style={{ color: "#050A18" }} />
          </motion.button>
        </div>

        {/* Loan Plans */}
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h3 className="text-2xl font-bold text-white text-center mb-8" style={{ fontFamily: "Cinzel, serif" }}>
            Choose Your <span style={goldGradText()}>Loan Plan</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {LOAN_PLANS.map((p, i) => (
              <motion.div key={p.name} whileHover={{ y: -6, scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={() => setPlan(i)} className="relative p-7 rounded-2xl cursor-pointer"
                style={{
                  background: plan === i ? `linear-gradient(145deg, rgba(13,27,56,0.9), rgba(20,35,70,0.9))` : "rgba(13,27,56,0.6)",
                  border: `1px solid ${plan === i ? p.color + "55" : "rgba(255,255,255,0.07)"}`,
                  boxShadow: plan === i ? `0 0 40px ${p.color}20` : "none",
                  transition: "all 0.3s",
                }}>
                {p.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[0.6rem] font-bold tracking-widest"
                    style={{ background: `linear-gradient(135deg, ${p.color}, #FFD700)`, color: "#050A18", fontFamily: "Cinzel, serif" }}>
                    MOST POPULAR
                  </div>
                )}
                <div className="text-center mb-5">
                  <div className="font-bold text-lg mb-1" style={{ fontFamily: "Cinzel, serif", color: plan === i ? p.color : "#777" }}>{p.name}</div>
                  <div className="text-[0.65rem] text-gray-500 mb-3" style={{ fontFamily: "Raleway, sans-serif" }}>Up to {p.upTo}</div>
                  <div className="text-3xl font-bold" style={{ fontFamily: "Cinzel, serif", color: p.color }}>{p.rate}</div>
                  <div className="text-gray-500 text-xs" style={{ fontFamily: "Raleway, sans-serif" }}>per month · up to {p.tenure}</div>
                </div>
                <div className="space-y-2">
                  {p.features.map(f => (
                    <div key={f} className="flex items-center gap-2.5">
                      <CheckCircle size={13} style={{ color: p.color, flexShrink: 0 }} />
                      <span className="text-gray-400 text-xs" style={{ fontFamily: "Raleway, sans-serif" }}>{f}</span>
                    </div>
                  ))}
                </div>
                {plan === i && (
                  <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} whileHover={{ scale: 1.03 }}
                    onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                    className="w-full mt-5 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase"
                    style={{ background: `linear-gradient(135deg, ${p.color}, #FFD700)`, color: "#050A18", fontFamily: "Cinzel, serif" }}>
                    Apply Now
                  </motion.button>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── WHY US ──────────────────────────────────────────────────────────────────
function WhyUs() {
  return (
    <section id="why" className="relative py-24 px-6" style={{ background: "#050A18" }}>
      <div className="container mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <div className="text-[0.7rem] tracking-widest text-yellow-700 uppercase mb-3" style={{ fontFamily: "Raleway, sans-serif" }}>Our Promise</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "Cinzel, serif" }}>
            Why <span style={goldGradText()}>GoldLakshmi</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {WHY_US.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.09 }}>
                <motion.div whileHover={{ y: -5, scale: 1.02 }} className="p-7 rounded-2xl h-full group"
                  style={{ ...glassStyle(), transition: "all 0.3s" }}>
                  <motion.div whileHover={{ scale: 1.12, rotate: 5 }} className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: `${item.color}18`, border: `1px solid ${item.color}35`, boxShadow: `0 0 18px ${item.color}12` }}>
                    <Icon size={22} style={{ color: item.color }} />
                  </motion.div>
                  <h3 className="text-base font-bold text-white mb-2.5" style={{ fontFamily: "Cinzel, serif" }}>{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed" style={{ fontFamily: "Raleway, sans-serif" }}>{item.desc}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { val: "2L+", label: "Happy Customers", sub: "Since 2015" },
            { val: "500Cr+", label: "Gold Processed", sub: "Every Year" },
            { val: "30 Min", label: "Avg Disbursal", sub: "Walk-in to Account" },
            { val: "98.7%", label: "Satisfaction Rate", sub: "Consistently Maintained" },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, scale: 0.88 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.09 }}
              className="text-center p-6 rounded-2xl"
              style={{ background: "rgba(201,168,76,0.04)", border: "1px solid rgba(201,168,76,0.12)" }}>
              <div className="text-3xl font-bold mb-1" style={{ fontFamily: "Cinzel, serif", ...goldGradText() }}>{s.val}</div>
              <div className="text-white text-xs font-semibold mb-1" style={{ fontFamily: "Raleway, sans-serif" }}>{s.label}</div>
              <div className="text-gray-600 text-[0.6rem]" style={{ fontFamily: "Raleway, sans-serif" }}>{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="relative py-24 px-6"
      style={{ background: "linear-gradient(180deg, #050A18 0%, #0a1428 100%)" }}>
      <div className="container mx-auto max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -36 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.75 }}>
            <div className="text-[0.7rem] tracking-widest text-yellow-700 uppercase mb-3" style={{ fontFamily: "Raleway, sans-serif" }}>Our Story</div>
            <h2 className="text-4xl font-bold text-white mb-6" style={{ fontFamily: "Cinzel, serif", lineHeight: 1.2 }}>
              Redefining Gold Finance for<br /><span style={goldGradText()}>Modern India</span>
            </h2>
            <p className="text-gray-300 leading-relaxed mb-5 text-sm" style={{ fontFamily: "Raleway, sans-serif" }}>
              Founded in 2015 with a vision to make gold finance dignified, transparent, and accessible to every Indian family, GoldLakshmi FinServ has grown from a single branch in Mumbai to a pan-India network of 150+ locations across 18 states.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8 text-sm" style={{ fontFamily: "Raleway, sans-serif" }}>
              We combine cutting-edge AI valuation technology with deeply human service — because unlocking your gold's value should feel empowering, not transactional. Our certified gold experts, licensed under RBI norms, handle every gram with the respect it deserves.
            </p>
            <div className="flex flex-wrap gap-3">
              <motion.button whileHover={{ scale: 1.04, boxShadow: "0 0 32px rgba(255,215,0,0.35)" }} whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold tracking-widest uppercase"
                style={{ background: "linear-gradient(135deg, #C9A84C, #FFD700)", color: "#050A18", fontFamily: "Cinzel, serif" }}>
                Our Story <ArrowRight size={13} />
              </motion.button>
              <motion.button whileHover={{ scale: 1.04, borderColor: "rgba(201,168,76,0.6)" }} whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-all"
                style={{ border: "1px solid rgba(201,168,76,0.3)", color: "#FFD700", fontFamily: "Cinzel, serif" }}>
                <MapPin size={13} /> Find Branch
              </motion.button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 36 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.75 }}
            className="grid grid-cols-2 gap-4">
            {[
              { label: "Founded", value: "2015", emoji: "🏛️" },
              { label: "Branches", value: "150+", emoji: "📍" },
              { label: "States", value: "18", emoji: "🗺️" },
              { label: "Awards Won", value: "24", emoji: "🏆" },
            ].map(item => (
              <motion.div key={item.label} whileHover={{ y: -4, scale: 1.03 }} className="p-6 text-center rounded-2xl" style={glassStyle()}>
                <div className="text-3xl mb-2">{item.emoji}</div>
                <div className="text-2xl font-bold mb-1" style={{ fontFamily: "Cinzel, serif", ...goldGradText() }}>{item.value}</div>
                <div className="text-gray-500 text-xs" style={{ fontFamily: "Raleway, sans-serif" }}>{item.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
function Testimonials() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative py-24 px-6" style={{ background: "#050A18" }}>
      <div className="container mx-auto max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <div className="text-[0.7rem] tracking-widest text-yellow-700 uppercase mb-3" style={{ fontFamily: "Raleway, sans-serif" }}>Voices of Trust</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "Cinzel, serif" }}>
            Customer <span style={goldGradText()}>Stories</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Background quote mark */}
          <div className="absolute -top-4 left-8 text-[8rem] leading-none font-serif text-yellow-900/20 pointer-events-none select-none">"</div>

          <AnimatePresence mode="wait">
            <motion.div key={idx} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4 }}>
              <div className="p-8 md:p-12 rounded-2xl text-center" style={glassStyle("rgba(201,168,76,0.22)")}>
                <div className="flex justify-center gap-1 mb-6">
                  {Array.from({ length: TESTIMONIALS[idx].rating }, (_, i) => (
                    <Star key={i} size={17} style={{ color: "#FFD700", fill: "#FFD700" }} />
                  ))}
                </div>
                <blockquote className="text-base md:text-lg text-gray-200 leading-relaxed mb-8 italic"
                  style={{ fontFamily: "Raleway, sans-serif" }}>
                  "{TESTIMONIALS[idx].text}"
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-13 h-13 rounded-full flex items-center justify-center text-base font-bold"
                    style={{ width: 52, height: 52, background: "linear-gradient(135deg, #C9A84C, #FFD700)", color: "#050A18", fontFamily: "Cinzel, serif" }}>
                    {TESTIMONIALS[idx].av}
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-white text-sm" style={{ fontFamily: "Cinzel, serif" }}>{TESTIMONIALS[idx].name}</div>
                    <div className="text-gray-500 text-xs" style={{ fontFamily: "Raleway, sans-serif" }}>{TESTIMONIALS[idx].loc}</div>
                    <div className="text-xs font-bold mt-0.5" style={{ color: "#C9A84C", fontFamily: "Cinzel, serif" }}>Loan: {TESTIMONIALS[idx].amount}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} className="rounded-full transition-all duration-300"
                style={{ width: i === idx ? 28 : 8, height: 8, background: i === idx ? "linear-gradient(to right, #C9A84C, #FFD700)" : "rgba(255,255,255,0.15)" }} />
            ))}
          </div>

          <div className="flex justify-center gap-3 mt-5">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.93 }}
              onClick={() => setIdx((idx - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,168,76,0.2)" }}>
              <ChevronLeft size={15} style={{ color: "#FFD700" }} />
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.93 }}
              onClick={() => setIdx((idx + 1) % TESTIMONIALS.length)}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #C9A84C, #FFD700)" }}>
              <ChevronRight size={15} style={{ color: "#050A18" }} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", city: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", phone: "", city: "", message: "" });
  };

  return (
    <section id="contact" className="relative py-24 px-6"
      style={{ background: "linear-gradient(180deg, #050A18 0%, #0a1428 100%)" }}>
      <div className="container mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <div className="text-[0.7rem] tracking-widest text-yellow-700 uppercase mb-3" style={{ fontFamily: "Raleway, sans-serif" }}>Begin Today</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "Cinzel, serif" }}>
            Start Your <span style={goldGradText()}>Journey</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto text-sm leading-relaxed" style={{ fontFamily: "Raleway, sans-serif" }}>
            Speak to our gold experts today. Zero commitment, complete transparency.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-7">
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="md:col-span-3 p-8 rounded-2xl" style={glassStyle()}>
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div key="ok" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                    style={{ background: "linear-gradient(135deg, #C9A84C, #FFD700)", boxShadow: "0 0 40px rgba(255,215,0,0.4)" }}>
                    <CheckCircle size={32} style={{ color: "#050A18" }} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "Cinzel, serif" }}>Enquiry Sent!</h3>
                  <p className="text-gray-400 text-sm" style={{ fontFamily: "Raleway, sans-serif" }}>Our gold expert will call you within 2 hours.</p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { key: "name", label: "Full Name", ph: "Priya Sharma", type: "text" },
                      { key: "phone", label: "Phone", ph: "+91 98765 43210", type: "tel" },
                    ].map(f => (
                      <div key={f.key}>
                        <label className="block text-[0.65rem] tracking-widest uppercase text-gray-500 mb-2" style={{ fontFamily: "Raleway, sans-serif" }}>{f.label}</label>
                        <input type={f.type} placeholder={f.ph} value={form[f.key as keyof typeof form]}
                          onChange={e => setForm({ ...form, [f.key]: e.target.value })} required
                          className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-700 focus:outline-none transition-all"
                          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "Raleway, sans-serif", focusBorderColor: "rgba(201,168,76,0.5)" }}
                          onFocus={e => e.target.style.borderColor = "rgba(201,168,76,0.45)"}
                          onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-[0.65rem] tracking-widest uppercase text-gray-500 mb-2" style={{ fontFamily: "Raleway, sans-serif" }}>City</label>
                    <input type="text" placeholder="Mumbai" value={form.city}
                      onChange={e => setForm({ ...form, city: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-700 focus:outline-none transition-all"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "Raleway, sans-serif" }}
                      onFocus={e => e.target.style.borderColor = "rgba(201,168,76,0.45)"}
                      onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
                  </div>
                  <div>
                    <label className="block text-[0.65rem] tracking-widest uppercase text-gray-500 mb-2" style={{ fontFamily: "Raleway, sans-serif" }}>Message (Optional)</label>
                    <textarea rows={3} placeholder="Tell us about your gold and how we can help..."
                      value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-700 focus:outline-none resize-none transition-all"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "Raleway, sans-serif" }}
                      onFocus={e => e.target.style.borderColor = "rgba(201,168,76,0.45)"}
                      onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
                  </div>
                  <motion.button type="submit" whileHover={{ scale: 1.02, boxShadow: "0 0 38px rgba(255,215,0,0.4)" }} whileTap={{ scale: 0.97 }}
                    className="w-full py-4 rounded-xl text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-2 relative overflow-hidden"
                    style={{ background: "linear-gradient(135deg, #C9A84C, #FFD700, #C9A84C)", backgroundSize: "200% auto", animation: "goldFlow 4s linear infinite", color: "#050A18", fontFamily: "Cinzel, serif" }}>
                    Send Enquiry <Send size={14} />
                    <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)", animation: "shimmerSlide 2s infinite" }} />
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact info */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="md:col-span-2 flex flex-col gap-4">
            {[
              { icon: Phone, label: "Call Us", val: "1800-XXX-GOLD", sub: "Mon–Sat · 9AM–7PM", c: "#C9A84C" },
              { icon: MessageCircle, label: "WhatsApp", val: "+91 98765 43210", sub: "24/7 Available", c: "#25D366" },
              { icon: Mail, label: "Email", val: "care@goldlakshmi.in", sub: "Reply within 2 hours", c: "#E8782A" },
              { icon: MapPin, label: "Find Branch", val: "150+ Locations", sub: "Across 18 States", c: "#C9A84C" },
            ].map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div key={c.label} initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <motion.div whileHover={{ x: 4, scale: 1.02 }} className="p-5 rounded-2xl flex items-center gap-4 cursor-pointer" style={glassStyle()}>
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${c.c}18`, border: `1px solid ${c.c}35` }}>
                      <Icon size={18} style={{ color: c.c }} />
                    </div>
                    <div>
                      <div className="text-[0.6rem] tracking-widest text-gray-600 uppercase mb-0.5" style={{ fontFamily: "Raleway, sans-serif" }}>{c.label}</div>
                      <div className="text-white text-sm font-medium" style={{ fontFamily: "Raleway, sans-serif" }}>{c.val}</div>
                      <div className="text-gray-600 text-[0.62rem]" style={{ fontFamily: "Raleway, sans-serif" }}>{c.sub}</div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-12 px-6" style={{ background: "#030810", borderTop: "1px solid rgba(201,168,76,0.12)" }}>
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #C9A84C, #FFD700)", boxShadow: "0 0 16px rgba(255,215,0,0.35)" }}>
                <span style={{ fontFamily: "Cinzel, serif", fontWeight: 900, color: "#050A18", fontSize: "0.78rem" }}>GL</span>
              </div>
              <div>
                <div style={{ fontFamily: "Cinzel, serif", fontWeight: 700, fontSize: "0.82rem", ...goldGradText() }}>GOLDLAKSHMI</div>
                <div className="text-gray-600 text-[0.58rem] tracking-[0.3em]" style={{ fontFamily: "Raleway, sans-serif" }}>FINSERV</div>
              </div>
            </div>
            <p className="text-gray-600 text-xs leading-relaxed" style={{ fontFamily: "Raleway, sans-serif" }}>
              India's most trusted gold finance partner. RBI regulated. Bank-grade security. Serving 2 lakh+ families.
            </p>
          </div>
          {[
            { title: "Services", items: ["Gold Loans", "Gold Valuation", "Gold Investment", "Portfolio Advisory"] },
            { title: "Company", items: ["About Us", "Careers", "Press Room", "Investor Relations"] },
            { title: "Legal", items: ["Privacy Policy", "Terms of Service", "Grievance Policy", "Fair Practice Code"] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="text-gray-400 text-[0.65rem] tracking-widest uppercase mb-4" style={{ fontFamily: "Raleway, sans-serif" }}>{col.title}</h4>
              <ul className="space-y-2">
                {col.items.map(item => (
                  <li key={item}><a href="#" className="text-gray-600 hover:text-yellow-700 text-xs transition-colors" style={{ fontFamily: "Raleway, sans-serif" }}>{item}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-6 border-t flex flex-col md:flex-row justify-between items-center gap-3" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
          <p className="text-gray-700 text-[0.6rem]" style={{ fontFamily: "Raleway, sans-serif" }}>
            © 2025 GoldLakshmi FinServ Pvt. Ltd. · RBI Reg: N-14.03268 · CIN: U74999MH2015PTC000000
          </p>
          <p className="text-gray-700 text-[0.6rem]" style={{ fontFamily: "Raleway, sans-serif" }}>
            Gold rates are indicative & subject to market fluctuation.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── FLOATING ACTIONS ─────────────────────────────────────────────────────────
function FloatingActions() {
  const [open, setOpen] = useState(false);

  const actions = [
    { icon: Phone, label: "Call Us", color: "#C9A84C", href: "tel:+911800XXXGOLD" },
    { icon: MessageCircle, label: "WhatsApp", color: "#25D366", href: "#" },
    { icon: Mail, label: "Enquiry", color: "#E8782A", href: "#contact" },
  ];

  return (
    <div className="fixed right-5 bottom-24 md:bottom-7 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && actions.map((a, i) => {
          const Icon = a.icon;
          return (
            <motion.a key={a.label} href={a.href}
              initial={{ opacity: 0, scale: 0, x: 20 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0, x: 20 }}
              transition={{ delay: i * 0.06, type: "spring", stiffness: 350, damping: 22 }}
              whileHover={{ scale: 1.06, x: -4 }}
              className="flex items-center gap-3 px-4 py-2.5 rounded-2xl"
              style={{ background: "rgba(5,10,24,0.95)", backdropFilter: "blur(16px)", border: `1px solid ${a.color}38`, boxShadow: `0 4px 20px rgba(0,0,0,0.35), 0 0 20px ${a.color}12` }}>
              <span className="text-xs text-gray-300 whitespace-nowrap" style={{ fontFamily: "Raleway, sans-serif" }}>{a.label}</span>
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${a.color}20` }}>
                <Icon size={15} style={{ color: a.color }} />
              </div>
            </motion.a>
          );
        })}
      </AnimatePresence>

      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.93 }} onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full flex items-center justify-center relative"
        style={{
          background: "linear-gradient(135deg, #C9A84C, #FFD700)",
          boxShadow: open ? "0 0 0 rgba(255,215,0,0)" : "0 0 0 rgba(255,215,0,0.4)",
          animation: open ? "none" : "goldPulseGlow 2.2s ease-in-out infinite",
        }}>
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }}>
          {open ? <X size={22} style={{ color: "#050A18" }} /> : <Phone size={22} style={{ color: "#050A18" }} />}
        </motion.div>
      </motion.button>
    </div>
  );
}

// ─── SCROLL TOP ───────────────────────────────────────────────────────────────
function ScrollTop() {
  const { scrollYProgress } = useScroll();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const unsub = scrollYProgress.on("change", v => setShow(v > 0.15));
    return unsub;
  }, [scrollYProgress]);

  return (
    <AnimatePresence>
      {show && (
        <motion.button initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.93 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed left-5 bottom-24 md:bottom-7 z-40 w-12 h-12 rounded-full flex items-center justify-center"
          style={{ background: "rgba(13,27,56,0.9)", backdropFilter: "blur(12px)", border: "1px solid rgba(201,168,76,0.25)" }}>
          <ChevronDown size={18} className="rotate-180" style={{ color: "#C9A84C" }} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = GLOBAL_CSS;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  return (
    <div style={{ background: "#050A18", fontFamily: "Raleway, sans-serif", overflowX: "hidden" }}>
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <Hero />
      <GoldCalculator />
      <GoldShowcase />
      <LoanJourney />
      <WhyUs />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
      <FloatingActions />
      <ScrollTop />
    </div>
  );
}
