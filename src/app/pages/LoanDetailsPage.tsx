import { motion } from "motion/react";
import { TrendingUp } from "lucide-react";
import { goldGradText, glassStyle } from "../utils/theme";
import { GOLD_LOAN_PLANS_DATA } from "../data/goldLoanPlans";

export function LoanDetailsPage() {

  return (
    <div className="pt-32 md:pt-40 pb-20 px-4 sm:px-6 min-h-screen" style={{ background: "linear-gradient(180deg, #050A18 0%, #081528 100%)" }}>
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full text-[0.7rem] tracking-widest uppercase"
            style={{
              background: "linear-gradient(145deg, rgba(28, 22, 16, 0.95) 0%, rgba(16, 12, 8, 0.98) 100%)",
              border: "1px solid rgba(201,168,76,0.45)",
              color: "#C9A84C",
              fontFamily: "Raleway, sans-serif",
            }}
          >
            <TrendingUp size={14} className="text-yellow-400" /> Comprehensive Financial Guide
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3" style={{ fontFamily: "Cinzel, serif" }}>
            Gold Loan <span style={goldGradText()}>Details & Features</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed" style={{ fontFamily: "Raleway, sans-serif" }}>
            Explore complete information about GoldLakshmi Finserv gold loan schemes, key benefits, comparison tables, and quick inquiry options.
          </p>
        </motion.div>

        {/* OVERVIEW PARAGRAPH CARD */}
        <div className="p-6 sm:p-8 rounded-2xl mb-16 shadow-lg text-center md:text-left" style={glassStyle("rgba(201,168,76,0.18)")}>
          <p className="text-gray-200 text-sm sm:text-base leading-relaxed" style={{ fontFamily: "Raleway, sans-serif" }}>
            A gold loan from GoldLakshmi Finserv is an easy way to get funds by pledging your gold jewellery. Whether you need money for farming, medical needs, education, or other expenses, our gold loan is a quick solution. We offer fast processing and approval, and you don't need to show income proof or go through credit checks. With flexible repayment options, you can get the loan in just one visit. Simply bring your gold and KYC documents to any GoldLakshmi Finserv branch, and you can walk out with your loan on the same day. Our trusted service makes us a top choice for gold loans.
          </p>
        </div>

        {/* GOLD LOAN PLANS COMPARISON TABLE */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-orange-400 mb-2" style={{ fontFamily: "Cinzel, serif" }}>
              GoldLakshmi Finserv's Gold Loan Plans
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm" style={{ fontFamily: "Raleway, sans-serif" }}>
              GoldLakshmi Finserv provides a variety of gold loan plans to help you with all your financial needs.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-yellow-500/25 shadow-xl bg-[#0A182E]/80 backdrop-blur-md">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-yellow-500/30 bg-navy-900/90 text-white text-xs sm:text-sm uppercase tracking-wider font-bold" style={{ fontFamily: "Cinzel, serif" }}>
                  <th className="py-4 px-5">Scheme Name</th>
                  <th className="py-4 px-5">Interest Rate (%)</th>
                  <th className="py-4 px-5">Loan Amount</th>
                  <th className="py-4 px-5">Tenure</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-yellow-500/10 text-xs sm:text-sm text-gray-300" style={{ fontFamily: "Raleway, sans-serif" }}>
                {GOLD_LOAN_PLANS_DATA.map((plan, idx) => (
                  <tr key={plan.id} className={idx % 2 === 0 ? "bg-navy-950/40 hover:bg-yellow-500/10 transition-colors" : "bg-navy-900/60 hover:bg-yellow-500/10 transition-colors"}>
                    <td className="py-3.5 px-5 font-semibold text-orange-400">{plan.title}</td>
                    <td className="py-3.5 px-5 font-bold text-yellow-300">{plan.rate}</td>
                    <td className="py-3.5 px-5">{plan.amount}</td>
                    <td className="py-3.5 px-5 text-orange-300">{plan.tenure}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* KEY BENEFITS & CONTACT FORM */}
        <div className="grid lg:grid-cols-12 gap-8 mb-20">
          {/* BENEFITS GRID (COL 8) */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl" style={glassStyle("rgba(201,168,76,0.15)")}>
            <div className="text-center md:text-left mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-orange-400 mb-2" style={{ fontFamily: "Cinzel, serif" }}>
                Key Benefits and Features of Gold Loan
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm" style={{ fontFamily: "Raleway, sans-serif" }}>
                Gold loans provide numerous advantages and features that make them an attractive financial option.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { num: "01", title: "Quick Approval", desc: "Get fast approval and access to funds when you need them" },
                { num: "02", title: "No Credit Checks", desc: "No need for credit history or income proof to secure a loan" },
                { num: "03", title: "Flexible Repayment", desc: "Choose from a variety of repayment options that suit your needs" },
                { num: "04", title: "Low-Interest Rates", desc: "Enjoy competitive interest rates on your gold loan" },
                { num: "05", title: "Easy Process", desc: "Simple and hassle-free loan application process" },
                { num: "06", title: "Immediate Cash", desc: "Receive cash quickly by pledging your gold." },
                { num: "07", title: "Safe Storage", desc: "Your gold is stored safely while you repay the loan" },
                { num: "08", title: "High Loan Amount", desc: "Get a significant loan amount based on the value of your gold" },
                { num: "09", title: "Minimal Documentation", desc: "Requires minimal paperwork to apply" },
                { num: "10", title: "No Hidden Fees", desc: "Transparent terms with no hidden charges" },
              ].map((b) => (
                <div key={b.num} className="flex flex-col items-center text-center p-3.5 rounded-xl bg-navy-950/60 border border-yellow-500/20 hover:border-yellow-500/50 transition-all shadow-md">
                  <div className="w-10 h-10 rounded-full bg-white text-emerald-700 font-extrabold flex items-center justify-center text-base mb-2.5 shadow-md border-2 border-emerald-600">
                    {b.num}
                  </div>
                  <h4 className="text-xs font-bold text-orange-400 mb-1" style={{ fontFamily: "Raleway, sans-serif" }}>
                    {b.title}
                  </h4>
                  <p className="text-gray-300 text-[0.68rem] leading-snug" style={{ fontFamily: "Raleway, sans-serif" }}>
                    {b.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* TELL US YOUR THOUGHTS FORM (COL 4) */}
          <div className="lg:col-span-4 p-6 sm:p-8 rounded-2xl flex flex-col justify-between" style={glassStyle("rgba(201,168,76,0.2)")}>
            <div>
              <h3 className="text-xl font-bold text-orange-400 mb-6 text-center lg:text-left" style={{ fontFamily: "Cinzel, serif" }}>
                Tell Us Your Thoughts
              </h3>
              <form className="space-y-3.5" onSubmit={(e) => { e.preventDefault(); alert("Thank you! Our representative will contact you shortly."); }}>
                <div>
                  <input
                    type="text"
                    placeholder="Name *"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-navy-950/80 border border-yellow-500/25 text-white placeholder-gray-400 text-xs focus:outline-none focus:border-yellow-400 transition-colors"
                    style={{ fontFamily: "Raleway, sans-serif" }}
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Phone *"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-navy-950/80 border border-yellow-500/25 text-white placeholder-gray-400 text-xs focus:outline-none focus:border-yellow-400 transition-colors"
                    style={{ fontFamily: "Raleway, sans-serif" }}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email *"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-navy-950/80 border border-yellow-500/25 text-white placeholder-gray-400 text-xs focus:outline-none focus:border-yellow-400 transition-colors"
                    style={{ fontFamily: "Raleway, sans-serif" }}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="State *"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-navy-950/80 border border-yellow-500/25 text-white placeholder-gray-400 text-xs focus:outline-none focus:border-yellow-400 transition-colors"
                    style={{ fontFamily: "Raleway, sans-serif" }}
                  />
                </div>
                <div>
                  <textarea
                    rows={3}
                    placeholder="Message *"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-navy-950/80 border border-yellow-500/25 text-white placeholder-gray-400 text-xs focus:outline-none focus:border-yellow-400 transition-colors resize-none"
                    style={{ fontFamily: "Raleway, sans-serif" }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-[#E85D04] to-[#FF9E43] text-white shadow-lg hover:brightness-110 transition-all cursor-pointer mt-2"
                  style={{ fontFamily: "Raleway, sans-serif" }}
                >
                  SEND MESSAGE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
