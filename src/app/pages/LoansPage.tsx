import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TrendingUp, Scale, Coins, Shield, Clock, ChevronLeft, ChevronRight, CheckCircle, ArrowRight, HelpCircle, FileText, Info } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router";
import { goldGradText, glassStyle } from "../utils/theme";
import { GOLD_LOAN_PLANS_DATA, GoldLoanPlanDetail } from "../data/goldLoanPlans";

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

const FAQS = [
  { q: "What documents are required to get a Gold Loan?", a: "Only standard KYC documents: Aadhaar Card and PAN Card. Zero income proof, zero credit history checks, and zero physical paperwork needed." },
  { q: "How is my gold stored and secured?", a: "Your gold is sealed in tamper-proof bags in your presence and stored in 24/7 monitored bank-grade vaults insured by leading national insurers." },
  { q: "Can I repay my loan early?", a: "Yes! All GoldLakshmi loans feature zero prepayment penalty. You only pay interest for the exact duration your loan was active." },
  { q: "What happens when I clear my loan?", a: "Your sealed gold packet is handed back to you immediately at the branch upon total settlement with absolute receipt verification." },
];

export function LoansPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const planParam = searchParams.get("plan");

  // Find initial plan from URL parameter or default to first plan (Easy Pro 2)
  const initialPlanIndex = Math.max(
    0,
    GOLD_LOAN_PLANS_DATA.findIndex((p) => p.id === planParam)
  );

  const [selectedPlanIndex, setSelectedPlanIndex] = useState<number>(
    initialPlanIndex >= 0 ? initialPlanIndex : 0
  );
  const [activeTab, setActiveTab] = useState<"info" | "terms">("info");
  const [step, setStep] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    if (planParam) {
      const idx = GOLD_LOAN_PLANS_DATA.findIndex((p) => p.id === planParam);
      if (idx !== -1) {
        setSelectedPlanIndex(idx);
      }
    }
  }, [planParam]);

  const currentPlan: GoldLoanPlanDetail = GOLD_LOAN_PLANS_DATA[selectedPlanIndex];

  const handleSelectPlan = (idx: number) => {
    setSelectedPlanIndex(idx);
    setSearchParams({ plan: GOLD_LOAN_PLANS_DATA[idx].id });
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 min-h-screen" style={{ background: "linear-gradient(180deg, #050A18 0%, #081528 100%)" }}>
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full text-[0.7rem] tracking-widest uppercase"
            style={{ background: "linear-gradient(145deg, rgba(28, 22, 16, 0.95) 0%, rgba(16, 12, 8, 0.98) 100%)", border: "1px solid rgba(201,168,76,0.45)", color: "#C9A84C", fontFamily: "Raleway, sans-serif" }}>
            <TrendingUp size={14} className="text-yellow-400" /> Fast & Transparent Finance
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3" style={{ fontFamily: "Cinzel, serif" }}>
            Gold Loan <span style={goldGradText()}>Plan Details</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed" style={{ fontFamily: "Raleway, sans-serif" }}>
            Comprehensive interest rates, repayment tenure, and terms for all GoldLakshmi FinServ gold loan schemes.
          </p>
        </motion.div>

        {/* PLAN SELECTOR TABS / CHIPS */}
        <div className="mb-10 flex flex-wrap justify-center gap-2.5">
          {GOLD_LOAN_PLANS_DATA.map((p, idx) => {
            const active = idx === selectedPlanIndex;
            return (
              <button
                key={p.id}
                onClick={() => handleSelectPlan(idx)}
                className="px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
                style={{
                  background: active
                    ? "linear-gradient(135deg, #FF9E43, #E85D04)"
                    : "rgba(22, 52, 88, 0.6)",
                  border: active
                    ? "1px solid #FF9E43"
                    : "1px solid rgba(255, 215, 0, 0.2)",
                  color: active ? "#FFFFFF" : "#CBD5E1",
                  boxShadow: active ? "0 4px 15px rgba(232, 93, 4, 0.4)" : "none",
                  fontFamily: "Raleway, sans-serif",
                }}
              >
                {p.title}
              </button>
            );
          })}
        </div>

        {/* DETAILED PLAN CARD (MATCHING USER SCREENSHOT DESIGN IN DARK LUXURY THEME) */}
        <motion.div
          key={currentPlan.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl overflow-hidden shadow-2xl mb-16 p-6 sm:p-8"
          style={{
            background: "linear-gradient(145deg, rgba(22, 52, 88, 0.95) 0%, rgba(10, 24, 46, 0.98) 100%)",
            border: "1px solid rgba(255, 215, 0, 0.45)",
            boxShadow: "0 12px 40px rgba(0, 0, 0, 0.65), 0 0 25px rgba(255, 215, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.12)",
          }}
        >
          {/* TOP SECTION: IMAGE + PLAN TABLE */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8">
            {/* LEFT: IMAGE BANNER WITH OVERLAY TEXT */}
            <div className="md:col-span-5 relative rounded-xl overflow-hidden shadow-xl group border border-yellow-500/30">
              <img
                src={currentPlan.img}
                alt={currentPlan.title}
                className="w-full h-56 md:h-64 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center p-4">
                <h3
                  className="text-2xl md:text-3xl font-extrabold text-yellow-400 text-center drop-shadow-md tracking-wide"
                  style={{ fontFamily: "Cinzel, serif", textShadow: "0 2px 10px rgba(0,0,0,0.9)" }}
                >
                  {currentPlan.bannerTitle}
                </h3>
              </div>
            </div>

            {/* RIGHT: PLAN TITLE, SUBTITLE & METRICS TABLE */}
            <div className="md:col-span-7 flex flex-col justify-between h-full">
              <div>
                <h2
                  className="text-2xl md:text-3xl font-bold mb-1"
                  style={{ color: "#FF9E43", fontFamily: "Raleway, sans-serif" }}
                >
                  {currentPlan.title}
                </h2>
                <div
                  className="text-sm font-semibold mb-6"
                  style={{ color: "#FF9E43", fontFamily: "Raleway, sans-serif" }}
                >
                  {currentPlan.subtitle}
                </div>

                {/* SPECIFICATION TABLE */}
                <div className="overflow-x-auto rounded-xl border border-yellow-500/30 shadow-inner">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-yellow-500/30 text-yellow-400 font-bold" style={{ background: "rgba(13, 27, 56, 0.9)" }}>
                        <th className="py-3 px-4 border-r border-yellow-500/20" style={{ fontFamily: "Cinzel, serif" }}>Interest Rate (%)</th>
                        <th className="py-3 px-4 border-r border-yellow-500/20" style={{ fontFamily: "Cinzel, serif" }}>Loan Amount</th>
                        <th className="py-3 px-4" style={{ fontFamily: "Cinzel, serif" }}>Tenure</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="text-gray-200 font-medium" style={{ background: "rgba(10, 24, 46, 0.6)" }}>
                        <td className="py-3.5 px-4 border-r border-yellow-500/20">{currentPlan.rate}</td>
                        <td className="py-3.5 px-4 border-r border-yellow-500/20">{currentPlan.amount}</td>
                        <td className="py-3.5 px-4">{currentPlan.tenure}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* APPLY NOW BUTTON INSIDE PLAN SUMMARY */}
              <div className="mt-6 flex items-center gap-4">
                <button
                  onClick={() => navigate("/contact")}
                  className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white transition-all hover:brightness-110 cursor-pointer"
                  style={{
                    background: "linear-gradient(135deg, #E85D04, #FF9E43)",
                    fontFamily: "Raleway, sans-serif",
                    boxShadow: "0 4px 15px rgba(232, 93, 4, 0.4)",
                  }}
                >
                  Apply For {currentPlan.title}
                </button>
              </div>
            </div>
          </div>

          {/* BOTTOM SECTION: TABS & CONTENT (INFORMATION / TERMS) */}
          <div className="border-t border-yellow-500/20 pt-6">
            {/* TAB BUTTONS */}
            <div className="flex items-center border-b border-yellow-500/20 mb-6">
              <button
                onClick={() => setActiveTab("info")}
                className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer rounded-t-xl ${
                  activeTab === "info"
                    ? "bg-gradient-to-r from-[#E85D04] to-[#FF9E43] text-white shadow-md"
                    : "text-gray-400 hover:text-yellow-400 bg-navy-900/60 border border-yellow-500/20 border-b-0"
                }`}
                style={{ fontFamily: "Raleway, sans-serif" }}
              >
                Information
              </button>
              <button
                onClick={() => setActiveTab("terms")}
                className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer rounded-t-xl ml-2 ${
                  activeTab === "terms"
                    ? "bg-gradient-to-r from-[#E85D04] to-[#FF9E43] text-white shadow-md"
                    : "text-gray-400 hover:text-yellow-400 bg-navy-900/60 border border-yellow-500/20 border-b-0"
                }`}
                style={{ fontFamily: "Raleway, sans-serif" }}
              >
                Terms And Conditions
              </button>
            </div>

            {/* TAB CONTENT CONTAINER */}
            <div className="p-5 sm:p-6 rounded-xl border border-yellow-500/25 bg-[#0A182E]/80 shadow-inner">
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed" style={{ fontFamily: "Raleway, sans-serif" }}>
                {activeTab === "terms" && currentPlan.termsText ? currentPlan.termsText : currentPlan.info}
              </p>
            </div>
          </div>
        </motion.div>

        {/* STEPPER */}
        <div className="mb-12 text-center mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2" style={{ fontFamily: "Cinzel, serif" }}>
            How Our <span style={goldGradText()}>Process Works</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm" style={{ fontFamily: "Raleway, sans-serif" }}>
            Get your loan approved and funds transferred in 4 simple transparent steps.
          </p>
        </div>

        <div className="hidden md:block mb-10 relative">
          <div className="absolute top-10 left-[12.5%] right-[12.5%] h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
          <motion.div
            className="absolute top-10 left-[12.5%] h-px origin-left"
            animate={{ width: `${(step / (LOAN_STEPS.length - 1)) * 75}%` }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            style={{ background: "linear-gradient(to right, #C9A84C, #FFD700)", boxShadow: "0 0 8px rgba(255,215,0,0.5)" }}
          />
          <div className="grid grid-cols-4 gap-4">
            {LOAN_STEPS.map((s, i) => {
              const Icon = s.icon;
              const done = i < step, active = i === step;
              return (
                <motion.div key={s.id} onClick={() => setStep(i)} whileHover={{ scale: 1.06 }} className="flex flex-col items-center cursor-pointer">
                  <motion.div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-3 relative z-10 border-2"
                    animate={{
                      background: active ? ["linear-gradient(135deg,#C9A84C,#FFD700)", "linear-gradient(225deg,#C9A84C,#FFD700)", "linear-gradient(135deg,#C9A84C,#FFD700)"] : done ? "rgba(201,168,76,0.15)" : "rgba(13,27,56,0.9)",
                      borderColor: active ? "rgba(255,215,0,0.7)" : done ? "rgba(201,168,76,0.4)" : "rgba(255,255,255,0.1)",
                      boxShadow: active ? "0 0 30px rgba(255,215,0,0.5)" : "none",
                    }}
                    transition={{ duration: 2.5, repeat: active ? Infinity : 0 }}
                  >
                    <Icon size={22} style={{ color: active ? "#050A18" : done ? "#C9A84C" : "#555" }} />
                  </motion.div>
                  <div className="text-xs font-bold text-center leading-tight mb-1" style={{ fontFamily: "Cinzel, serif", color: active ? "#FFD700" : done ? "#C9A84C" : "#555" }}>
                    {s.title}
                  </div>
                  <div className="text-[0.6rem] text-gray-500" style={{ fontFamily: "Raleway, sans-serif" }}>{s.time}</div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Step detail */}
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.35 }}>
            <div className="p-6 sm:p-8 rounded-2xl mb-8" style={glassStyle("rgba(201,168,76,0.28)")}>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #C9A84C, #FFD700)", boxShadow: "0 0 30px rgba(255,215,0,0.4)" }}>
                  {(() => { const Icon = LOAN_STEPS[step].icon; return <Icon size={30} style={{ color: "#050A18" }} />; })()}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="text-[0.65rem] tracking-widest text-yellow-700 uppercase mb-1" style={{ fontFamily: "Raleway, sans-serif" }}>Step {step + 1} of {LOAN_STEPS.length}</div>
                  <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "Cinzel, serif" }}>{LOAN_STEPS[step].title}</h3>
                  <p className="text-gray-300 leading-relaxed text-xs sm:text-sm" style={{ fontFamily: "Raleway, sans-serif" }}>{LOAN_STEPS[step].desc}</p>
                  <div className="flex items-center gap-2 mt-3 justify-center md:justify-start">
                    <Clock size={14} style={{ color: "#FFD700" }} />
                    <span className="text-yellow-500 text-xs font-semibold" style={{ fontFamily: "Raleway, sans-serif" }}>Estimated time: {LOAN_STEPS[step].time}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-3 mb-16">
          <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} className="w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-25 cursor-pointer" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,168,76,0.2)" }}>
            <ChevronLeft size={16} style={{ color: "#FFD700" }} />
          </button>
          <button onClick={() => setStep(Math.min(LOAN_STEPS.length - 1, step + 1))} disabled={step === LOAN_STEPS.length - 1} className="w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-25 cursor-pointer" style={{ background: "linear-gradient(135deg, #C9A84C, #FFD700)", boxShadow: "0 0 18px rgba(255,215,0,0.3)" }}>
            <ChevronRight size={16} style={{ color: "#050A18" }} />
          </button>
        </div>

        {/* FAQS */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white text-center mb-8" style={{ fontFamily: "Cinzel, serif" }}>
            Frequently Asked <span style={goldGradText()}>Questions</span>
          </h2>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div key={i} className="rounded-2xl overflow-hidden" style={glassStyle()}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-4 flex justify-between items-center text-left text-white font-bold text-sm cursor-pointer"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle size={16} className="text-yellow-400" /> {faq.q}
                  </span>
                  <ChevronRight size={16} className={`transition-transform ${openFaq === i ? "rotate-90 text-yellow-400" : "text-gray-500"}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-gray-300 text-xs leading-relaxed border-t border-yellow-900/20 pt-3" style={{ fontFamily: "Raleway, sans-serif" }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button onClick={() => navigate("/contact")} className="px-8 py-4 rounded-xl text-sm font-bold tracking-widest uppercase cursor-pointer" style={{ background: "linear-gradient(135deg, #C9A84C, #FFD700)", color: "#050A18", fontFamily: "Cinzel, serif" }}>
            Apply for Gold Loan Now <ArrowRight size={15} className="inline ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}
