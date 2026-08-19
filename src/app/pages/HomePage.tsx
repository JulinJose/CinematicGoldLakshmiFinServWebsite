import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Coins, Shield, Zap, TrendingUp, ChevronDown, ChevronLeft, ChevronRight, Star, Award, CheckCircle, Phone, RotateCcw, Hourglass, Wallet } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { GoldParticles } from "../components/GoldParticles";
import { GoldCoin } from "../components/GoldCoin";
import { goldGradText, glassStyle, GOLD_RATE, GALLERY } from "../utils/theme";

const TESTIMONIALS = [
  { name: "Priya Sharma", loc: "Mumbai", rating: 5, amount: "₹4.5L", av: "PS", text: "Smooth, fast, and incredibly professional. The valuation was spot-on and I received funds within 20 minutes. GoldLakshmi has truly reimagined what a gold loan should feel like." },
  { name: "Rajesh Kumar", loc: "Delhi", rating: 5, amount: "₹8.2L", av: "RK", text: "Transparent, fair, and instant. The entire process is digital with zero paperwork. I've recommended GoldLakshmi to everyone in my network. Exceptional experience." },
  { name: "Anitha Reddy", loc: "Hyderabad", rating: 5, amount: "₹2.75L", av: "AR", text: "Used the loan for my daughter's education. The interest rates are genuinely the lowest I found. GoldLakshmi truly understands and empowers Indian families." },
  { name: "Suresh Nair", loc: "Chennai", rating: 5, amount: "₹6.15L", av: "SN", text: "Accurate valuation, instant approval, zero paperwork. This is exactly what modern gold finance should look like. The app and staff both exceeded every expectation." },
];

const GOLD_LOAN_PLANS = [
  {
    id: "easy-pro-2",
    title: "Easy Pro 2",
    amount: "Minimum Rs.3 lakh",
    badge: "High Valuation",
    img: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=600&auto=format&fit=crop",
    desc: "Premium high-value gold loans with maximum LTV and zero processing fee.",
  },
  {
    id: "easy-pro",
    title: "Easy Pro",
    amount: "Rs.3 lakh to Rs.4,99,999",
    badge: "Popular Choice",
    img: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop",
    desc: "Optimized interest rates for medium to high range gold asset pledges.",
  },
  {
    id: "easy-blue-2",
    title: "Easy Blue 2",
    amount: "Rs.1,000 to Rs.99,999",
    badge: "Micro Loan",
    img: "https://images.unsplash.com/photo-1624365168056-daf44387e2ae?w=600&auto=format&fit=crop",
    desc: "Quick emergency funds for small gold ornaments with instant disbursal.",
  },
  {
    id: "easy-max-2",
    title: "Easy Max 2",
    amount: "Minimum Rs.1 lakh",
    badge: "Max Per Gram Rate",
    img: "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=600&auto=format&fit=crop",
    desc: "Get maximum cash per gram valuation with flexible monthly tenure options.",
  },
  {
    id: "easy-max",
    title: "Easy Max",
    amount: "Rs.1 lakh to Rs.2,99,999",
    badge: "Zero Paperwork",
    img: "https://images.unsplash.com/photo-1589758438368-0ad531db3366?w=600&auto=format&fit=crop",
    desc: "Hassle-free 10-minute approval with minimal documentation requirements.",
  },
  {
    id: "super-value",
    title: "Super Value Gold Loan",
    amount: "Applicable through all ticket sizes",
    badge: "Best Rate (0.99%/mo)",
    img: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&auto=format&fit=crop",
    desc: "Competitive interest rates starting from 0.99%/month across all gold weights.",
  },
  {
    id: "restart-india-pradhan",
    title: "Restart India Pradhan",
    amount: "Rs.8 lakh to Rs.20 lakh",
    badge: "Business Growth",
    img: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600&auto=format&fit=crop",
    desc: "Capital boost for entrepreneurs & small business owners against gold assets.",
  },
  {
    id: "restart-india-elite",
    title: "Restart India Elite",
    amount: "Minimum Rs.5 lakh",
    badge: "VIP Service",
    img: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=600&auto=format&fit=crop",
    desc: "Privilege doorstep gold evaluation & instant direct bank transfer.",
  },
];

function PlanCardImg({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center" style={{ background: "linear-gradient(135deg, #182c50 0%, #0a1428 100%)" }}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2" style={{ background: "rgba(255, 215, 0, 0.2)", border: "1px solid rgba(255, 215, 0, 0.5)", color: "#FFD700" }}>
          <Coins size={24} />
        </div>
        <span className="text-xs font-bold text-yellow-400" style={{ fontFamily: "Cinzel, serif" }}>{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    />
  );
}

export function HomePage() {
  const navigate = useNavigate();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const planScrollRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const [isPlanPaused, setIsPlanPaused] = useState(false);

  const scrollPlansLeft = () => {
    if (planScrollRef.current) {
      const el = planScrollRef.current;
      if (el.scrollLeft <= 10) {
        el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
      } else {
        el.scrollBy({ left: -340, behavior: "smooth" });
      }
    }
  };

  const scrollPlansRight = () => {
    if (planScrollRef.current) {
      const el = planScrollRef.current;
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 20) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: 340, behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    if (isPlanPaused) return;
    const timer = setInterval(() => {
      if (planScrollRef.current) {
        const el = planScrollRef.current;
        if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 20) {
          el.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          el.scrollBy({ left: 340, behavior: "smooth" });
        }
      }
    }, 3500);

    return () => clearInterval(timer);
  }, [isPlanPaused]);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(t);
  }, []);

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
    <div className="pt-16">
      {/* HERO SECTION */}
      <div ref={ref} className="relative min-h-[92vh] flex items-center overflow-hidden"
        style={{ background: "radial-gradient(ellipse 90% 80% at 18% 55%, #162260 0%, #050A18 52%, #0a1428 100%)" }}>
        
        <div className="absolute inset-0" style={{ zIndex: 1 }}>
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="absolute origin-bottom"
              style={{
                bottom: 0, left: `${3 + i * 10}%`, width: "1px", height: "75%",
                background: `linear-gradient(to top, transparent 0%, rgba(255,215,0,${0.025 + (i % 3) * 0.01}) 50%, transparent 100%)`,
                transform: `rotate(${-25 + i * 5.5}deg)`,
                filter: "blur(4px)",
                animation: `rayPulse ${3 + (i % 3)}s ease-in-out infinite ${i * 0.3}s`,
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0" style={{ zIndex: 0 }}>
          <div style={{ position: "absolute", top: "20%", left: "15%", width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,215,0,0.12) 0%, transparent 70%)", filter: "blur(50px)", animation: "floatY 6s ease-in-out infinite" }} />
          <div style={{ position: "absolute", bottom: "20%", right: "20%", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,120,42,0.1) 0%, transparent 70%)", filter: "blur(35px)", animation: "floatY 8s ease-in-out infinite 2s" }} />
        </div>

        <GoldParticles />

        <div className="relative container mx-auto px-6 pt-16 pb-20 grid lg:grid-cols-2 gap-10 items-center" style={{ zIndex: 3 }}>
          <div>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full text-[0.7rem] tracking-widest uppercase"
              style={{
                background: "linear-gradient(145deg, rgba(28, 22, 16, 0.95) 0%, rgba(16, 12, 8, 0.98) 100%)",
                border: "1px solid rgba(201, 168, 76, 0.45)",
                color: "#C9A84C",
                fontFamily: "Raleway, sans-serif",
                boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
              }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#FFD700" }} />
              India's Premier Gold Finance Partner
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.35 }}
              style={{ fontFamily: "Cinzel, serif", lineHeight: 1.12, marginBottom: "1.5rem" }}>
              <div className="text-4xl md:text-5xl lg:text-[4rem] font-bold text-white">Your Gold.</div>
              <div className="text-4xl md:text-5xl lg:text-[4rem] font-bold" style={goldGradText()}>Your Value.</div>
              <div className="text-4xl md:text-5xl lg:text-[4rem] font-bold">
                <span className="text-white">Your </span>
                <span style={{ color: "#E8782A" }}>Financial</span>
              </div>
              <div className="text-4xl md:text-5xl lg:text-[4rem] font-bold text-white">Freedom.</div>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
              className="text-gray-300 text-lg mb-8 max-w-lg leading-relaxed"
              style={{ fontFamily: "Raleway, sans-serif" }}>
              Transform your idle gold into instant financial power. Highest valuations, lowest rates (0.99%/mo), and bank-grade security — in under 30 minutes.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.65 }}
              className="flex flex-wrap gap-4 mb-10">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 45px rgba(255,215,0,0.5)" }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate("/contact")}
                className="relative overflow-hidden flex items-center gap-2 px-7 py-4 rounded-xl text-sm font-bold tracking-widest uppercase cursor-pointer"
                style={{ background: "linear-gradient(135deg, #C9A84C, #FFD700, #C9A84C)", backgroundSize: "200% auto", animation: "goldFlow 4s linear infinite", color: "#050A18", fontFamily: "Cinzel, serif", boxShadow: "0 0 22px rgba(255,215,0,0.28)" }}>
                <span className="relative z-10">Get Gold Loan</span>
                <span className="relative z-10"><ArrowRight size={15} /></span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, borderColor: "rgba(201,168,76,0.7)", boxShadow: "0 0 25px rgba(255,215,0,0.15)" }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate("/loans")}
                className="flex items-center gap-2 px-7 py-4 rounded-xl text-sm font-bold tracking-widest uppercase transition-all cursor-pointer"
                style={{ border: "1px solid rgba(201,168,76,0.4)", color: "#FFD700", fontFamily: "Cinzel, serif" }}>
                <TrendingUp size={15} /> Explore Plans
              </motion.button>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-3 gap-3">
              {[["2L+", "Happy Customers"], ["500Cr+", "Gold Processed"], ["30 Min", "Avg Disbursal"]].map(([v, l]) => (
                <div key={l} className="text-center p-3.5 rounded-xl transition-all hover:-translate-y-0.5"
                  style={{
                    background: "linear-gradient(145deg, rgba(22, 52, 88, 0.95) 0%, rgba(10, 24, 46, 0.98) 100%)",
                    border: "1px solid rgba(255, 215, 0, 0.45)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
                  }}>
                  <div className="text-lg font-bold" style={goldGradText()}>{v}</div>
                  <div className="text-gray-300 text-[0.65rem] mt-1 tracking-wide" style={{ fontFamily: "Raleway, sans-serif" }}>{l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div className="flex justify-center items-center"
            animate={{ x: mouse.x * 0.22, y: mouse.y * 0.18 }}
            transition={{ type: "spring", stiffness: 45, damping: 18 }}>
            <div className="relative flex items-center justify-center">
              {[1, 2, 3].map((i) => (
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

              <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-8 px-3 py-1.5 rounded-xl text-xs font-bold tracking-widest"
                style={{ background: "rgba(13,27,56,0.85)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,215,0,0.4)", color: "#FFD700", fontFamily: "Cinzel, serif" }}>
                24K PURE
              </motion.div>
              <motion.div animate={{ y: [10, -10, 10] }} transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                className="absolute -bottom-6 -left-8 px-3 py-1.5 rounded-xl text-xs tracking-wide"
                style={{ background: "rgba(13,27,56,0.85)", backdropFilter: "blur(12px)", border: "1px solid rgba(232,120,42,0.35)", color: "#E8782A", fontFamily: "Raleway, sans-serif" }}>
                ₹{GOLD_RATE["24K"]}/gram today
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 4 KEY BENEFIT HIGHLIGHTS STRIP */}
      <section className="py-14 px-6 relative" style={{ background: "linear-gradient(180deg, #070e22 0%, #050A18 100%)", borderBottom: "1px solid rgba(201,168,76,0.12)" }}>
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: RotateCcw,
                title: "Flexible Repayment",
                desc: "Flexible repayment options, payment of interest on a monthly basis",
              },
              {
                icon: TrendingUp,
                title: "Attractive Interest",
                desc: "We offer attractive interest rates on Gold Loan starting from 0.99%/mo",
              },
              {
                icon: Hourglass,
                title: "Quick Approval",
                desc: "Get quick approvals with minimum paperwork in under 30 minutes",
              },
              {
                icon: Wallet,
                title: "Maximum Loan to Value",
                desc: "Get up to 75% Loan value of the gold pledged from GoldLakshmi FinServ",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -6, boxShadow: "0 8px 35px rgba(255, 215, 0, 0.28), 0 12px 35px rgba(0,0,0,0.6)", borderColor: "rgba(255, 215, 0, 0.7)" }}
                  className="flex items-start gap-4 p-5 rounded-2xl transition-all"
                  style={{
                    background: "linear-gradient(145deg, rgba(22, 52, 88, 0.95) 0%, rgba(10, 24, 46, 0.98) 100%)",
                    border: "1px solid rgba(255, 215, 0, 0.45)",
                    boxShadow: "0 6px 25px rgba(0,0,0,0.45), 0 0 20px rgba(255, 215, 0, 0.08), inset 0 1px 0 rgba(255,255,255,0.12)",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      background: "rgba(255, 215, 0, 0.16)",
                      border: "1px solid rgba(255, 215, 0, 0.45)",
                      boxShadow: "0 0 18px rgba(255, 215, 0, 0.25)",
                    }}
                  >
                    <Icon size={22} style={{ color: "#FFD700" }} />
                  </div>
                  <div>
                    <h4
                      className="text-sm font-bold mb-1.5"
                      style={{ color: "#FFD700", fontFamily: "Cinzel, serif" }}
                    >
                      {item.title}
                    </h4>
                    <p
                      className="text-gray-300 text-xs leading-relaxed"
                      style={{ fontFamily: "Raleway, sans-serif" }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* OUR GOLD LOAN PLANS - SCROLLING CAROUSEL */}
      <section className="py-20 px-6 relative overflow-hidden" style={{ background: "#050A18" }}>
        <div className="container mx-auto max-w-6xl relative z-10">
          {/* SECTION HEADER & CAROUSEL NAV BUTTONS */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="text-[0.7rem] tracking-widest text-yellow-700 uppercase mb-2" style={{ fontFamily: "Raleway, sans-serif" }}>
                CORE SERVICES & SCHEMES
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "Cinzel, serif" }}>
                Our Gold Loan <span style={goldGradText()}>Plans</span>
              </h2>
              <p className="text-gray-400 text-sm mt-2 max-w-xl" style={{ fontFamily: "Raleway, sans-serif" }}>
                Explore custom gold finance schemes engineered for maximum LTV, lowest interest rates, and instant disbursal.
              </p>
            </div>

            <div className="flex items-center gap-3 self-end">
              <button
                onClick={scrollPlansLeft}
                aria-label="Scroll Left"
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
                style={{
                  background: "rgba(22, 52, 88, 0.9)",
                  border: "1px solid rgba(255, 215, 0, 0.45)",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
                  color: "#FFD700",
                }}
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={scrollPlansRight}
                aria-label="Scroll Right"
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
                style={{
                  background: "rgba(22, 52, 88, 0.9)",
                  border: "1px solid rgba(255, 215, 0, 0.45)",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
                  color: "#FFD700",
                }}
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>

          {/* HORIZONTAL CAROUSEL */}
          <div
            ref={planScrollRef}
            onMouseEnter={() => setIsPlanPaused(true)}
            onMouseLeave={() => setIsPlanPaused(false)}
            className="flex gap-6 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {GOLD_LOAN_PLANS.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -8, boxShadow: "0 12px 40px rgba(255, 215, 0, 0.22), 0 15px 35px rgba(0,0,0,0.7)" }}
                className="flex-shrink-0 w-[85vw] sm:w-[320px] lg:w-[calc((100%-48px)/3)] rounded-2xl overflow-hidden snap-start transition-all flex flex-col justify-between"
                style={{
                  background: "linear-gradient(145deg, rgba(22, 52, 88, 0.95) 0%, rgba(10, 24, 46, 0.98) 100%)",
                  border: "1px solid rgba(255, 215, 0, 0.45)",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
                }}
              >
                <div>
                  {/* IMAGE HEADER */}
                  <div className="relative h-44 overflow-hidden group">
                    <PlanCardImg src={plan.img} alt={plan.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A182E] via-transparent to-black/30 pointer-events-none" />
                  </div>

                  {/* CONTENT BODY */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "Cinzel, serif" }}>
                      {plan.title}
                    </h3>
                    
                    <div
                      className="text-sm font-semibold mb-3 px-3 py-1.5 rounded-lg inline-block"
                      style={{
                        background: "rgba(232, 120, 42, 0.15)",
                        border: "1px solid rgba(232, 120, 42, 0.35)",
                        color: "#FF9E43",
                        fontFamily: "Raleway, sans-serif",
                      }}
                    >
                      {plan.amount}
                    </div>

                    <p className="text-gray-300 text-xs leading-relaxed" style={{ fontFamily: "Raleway, sans-serif" }}>
                      {plan.desc}
                    </p>
                  </div>
                </div>

                {/* CARD FOOTER LINK */}
                <div className="px-6 pb-6 pt-2">
                  <Link
                    to={`/loans?plan=${plan.id}`}
                    className="w-full py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-black transition-all hover:brightness-110"
                    style={{
                      background: "linear-gradient(135deg, #FFD700, #C9A84C)",
                      fontFamily: "Cinzel, serif",
                      boxShadow: "0 0 15px rgba(255,215,0,0.25)",
                    }}
                  >
                    More Details <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US SPOTLIGHT */}
      <section className="py-20 px-6" style={{ background: "linear-gradient(180deg, #050A18 0%, #081226 100%)" }}>
        <div className="container mx-auto max-w-5xl text-center">
          <div className="text-[0.7rem] tracking-widest text-yellow-700 uppercase mb-2" style={{ fontFamily: "Raleway, sans-serif" }}>Why GoldLakshmi</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" style={{ fontFamily: "Cinzel, serif" }}>
            The Most Trusted Name in <span style={goldGradText()}>Gold Finance</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { val: "30 Min", title: "Instant Disbursal" },
              { val: "0.99%", title: "Lowest Monthly Rate" },
              { val: "100%", title: "Vault Security Insured" },
              { val: "150+", title: "Pan-India Branches" },
            ].map((s) => (
              <div
                key={s.title}
                className="p-6 rounded-2xl text-center transition-all hover:-translate-y-1"
                style={{
                  background: "linear-gradient(145deg, rgba(28, 22, 16, 0.95) 0%, rgba(16, 12, 8, 0.98) 100%)",
                  border: "1px solid rgba(201, 168, 76, 0.45)",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,215,0,0.15)",
                }}
              >
                <div className="text-3xl font-bold mb-1" style={{ fontFamily: "Cinzel, serif", ...goldGradText() }}>{s.val}</div>
                <div className="text-gray-300 text-xs font-semibold" style={{ fontFamily: "Raleway, sans-serif" }}>{s.title}</div>
              </div>
            ))}
          </div>
          <Link to="/about" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest text-black" style={{ background: "linear-gradient(135deg, #C9A84C, #FFD700)", fontFamily: "Cinzel, serif" }}>
            Learn More About Our Security & Standards <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-6" style={{ background: "#050A18" }}>
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-10">
            <div className="text-[0.7rem] tracking-widest text-yellow-700 uppercase mb-2" style={{ fontFamily: "Raleway, sans-serif" }}>Voices of Trust</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "Cinzel, serif" }}>
              Customer <span style={goldGradText()}>Stories</span>
            </h2>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div key={idx} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}>
                <div className="p-8 md:p-10 rounded-2xl text-center" style={glassStyle("rgba(201,168,76,0.22)")}>
                  <div className="flex justify-center gap-1 mb-4">
                    {Array.from({ length: TESTIMONIALS[idx].rating }, (_, i) => (
                      <Star key={i} size={16} style={{ color: "#FFD700", fill: "#FFD700" }} />
                    ))}
                  </div>
                  <blockquote className="text-base text-gray-200 leading-relaxed mb-6 italic" style={{ fontFamily: "Raleway, sans-serif" }}>
                    "{TESTIMONIALS[idx].text}"
                  </blockquote>
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{ background: "linear-gradient(135deg, #C9A84C, #FFD700)", color: "#050A18", fontFamily: "Cinzel, serif" }}>
                      {TESTIMONIALS[idx].av}
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-white text-sm" style={{ fontFamily: "Cinzel, serif" }}>{TESTIMONIALS[idx].name}</div>
                      <div className="text-gray-500 text-xs" style={{ fontFamily: "Raleway, sans-serif" }}>{TESTIMONIALS[idx].loc} · Loan {TESTIMONIALS[idx].amount}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-2 mt-5">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setIdx(i)} className="rounded-full transition-all duration-300"
                  style={{ width: i === idx ? 28 : 8, height: 8, background: i === idx ? "linear-gradient(to right, #C9A84C, #FFD700)" : "rgba(255,255,255,0.15)" }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-16 px-6" style={{ background: "linear-gradient(135deg, #0c1836 0%, #050A18 100%)", borderTop: "1px solid rgba(201,168,76,0.2)" }}>
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "Cinzel, serif" }}>
            Ready to Unlock Your <span style={goldGradText()}>Gold's Value?</span>
          </h2>
          <p className="text-gray-300 text-sm max-w-xl mx-auto mb-8" style={{ fontFamily: "Raleway, sans-serif" }}>
            Contact our gold experts today for a doorstep evaluation or walk in to any of our 150+ branches nationwide.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => navigate("/contact")} className="px-8 py-4 rounded-xl text-sm font-bold tracking-widest uppercase cursor-pointer" style={{ background: "linear-gradient(135deg, #C9A84C, #FFD700)", color: "#050A18", fontFamily: "Cinzel, serif" }}>
              Apply for Gold Loan Now
            </button>
            <button onClick={() => navigate("/loans")} className="px-8 py-4 rounded-xl text-sm font-bold tracking-widest uppercase cursor-pointer" style={{ border: "1px solid rgba(201,168,76,0.4)", color: "#FFD700", fontFamily: "Cinzel, serif" }}>
              View Loan Plans
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
