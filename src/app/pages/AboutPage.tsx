import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Building2, Award, MapPin, Target, Eye, ShieldCheck, ArrowRight, Shield, Zap, Percent, Gem, Users, CheckCircle, Lock, Globe, Plane, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router";
import { goldGradText, glassStyle } from "../utils/theme";

const WHY_US = [
  { icon: Globe, title: "Maximum Loan Value For Your Gold", desc: "We offer the highest loan-to-value ratio, ensuring you get the most for your gold", color: "#C9A84C" },
  { icon: Plane, title: "Safe And Secure Gold Storage", desc: "Your gold is stored with the highest security standards, giving you peace of mind while it's in our care.", color: "#FFD700" },
  { icon: MessageSquare, title: "Transparent Loan Policies", desc: "We maintain complete transparency in our loan process with no hidden fees or surprises.", color: "#E8782A" },
];

export function AboutPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"mission" | "vision" | "values">("mission");

  return (
    <div className="pt-32 md:pt-40 pb-20 px-6 min-h-screen" style={{ background: "linear-gradient(180deg, #050A18 0%, #0a1428 100%)" }}>
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full text-[0.7rem] tracking-widest uppercase"
            style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)", color: "#C9A84C", fontFamily: "Raleway, sans-serif" }}>
            <Building2 size={14} className="text-yellow-400" /> About & Why Choose Us
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "Cinzel, serif" }}>
            About <span style={goldGradText()}>GoldLakshmi FinServ</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm leading-relaxed" style={{ fontFamily: "Raleway, sans-serif" }}>
            Redefining gold finance for modern India with dignity, transparency, cutting-edge AI technology, and bank-grade security standards.
          </p>
        </motion.div>

        {/* Story Section */}
        <div className="grid md:grid-cols-12 gap-12 items-center mb-20">
          {/* Left Column: Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6 }}
            className="md:col-span-5 flex justify-center"
          >
            <div className="relative rounded-2xl overflow-hidden border border-yellow-500/35 shadow-2xl p-1 bg-gradient-to-b from-[#C9A84C]/20 to-transparent">
              <img 
                src="/about_piggy_bank.png" 
                alt="Trusted Partner" 
                className="w-full max-w-sm md:max-w-full h-auto object-cover rounded-xl"
              />
            </div>
          </motion.div>

          {/* Right Column: Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6 }}
            className="md:col-span-7 space-y-5"
          >
            <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "Cinzel, serif", lineHeight: 1.2 }}>
              Your Trusted Partner in <span style={goldGradText()}>Financial Empowerment</span>
            </h2>
            
            <p className="text-[#FF7A00] font-semibold leading-relaxed text-sm sm:text-base" style={{ fontFamily: "Raleway, sans-serif" }}>
              Founded in 2024, Lakshmi Finserv was established with a clear vision: to provide accessible, secure, and hassle-free financial solutions to individuals and businesses alike. As a leading gold loan provider, we understand the intrinsic value of your gold and are committed to offering the best loan services that meet your financial needs with trust and transparency.
            </p>
            
            <p className="text-gray-300 leading-relaxed text-xs sm:text-sm" style={{ fontFamily: "Raleway, sans-serif" }}>
              At Lakshmi Finserv, our mission is to empower our customers by unlocking the potential of their gold assets. We strive to provide quick and reliable financial assistance through our gold loan services, ensuring that you have the financial flexibility to achieve your goals without sacrificing your security.
            </p>
            
            <p className="text-gray-400 leading-relaxed text-xs sm:text-sm" style={{ fontFamily: "Raleway, sans-serif" }}>
              At Lakshmi Finserv, we are more than just a gold loan provider ◈ we are your partners in financial growth and stability. Whether you are looking to meet an urgent financial need or planning for the future, we are here to support you every step of the way.
            </p>

            <button
              onClick={() => navigate("/contact")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold tracking-widest uppercase cursor-pointer mt-4"
              style={{ background: "linear-gradient(135deg, #C9A84C, #FFD700)", color: "#050A18", fontFamily: "Cinzel, serif" }}
            >
              Locate Nearest Branch <MapPin size={14} />
            </button>
          </motion.div>
        </div>

        {/* WHY CHOOSE US SECTION */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="text-[0.7rem] tracking-widest text-yellow-700 uppercase mb-2" style={{ fontFamily: "Raleway, sans-serif" }}>Unmatched Standards</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "Cinzel, serif" }}>
              Why Choose <span style={goldGradText()}>GoldLakshmi</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-sm mt-3 leading-relaxed" style={{ fontFamily: "Raleway, sans-serif" }}>
              Built on trust, speed, and transparency — discover why over 200,000 families across India rely on us.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_US.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="p-8 rounded-2xl h-full flex flex-col justify-between"
                  style={glassStyle()}
                >
                  <div>
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                      style={{ background: `${item.color}18`, border: `1px solid ${item.color}35`, boxShadow: `0 0 20px ${item.color}12` }}
                    >
                      <Icon size={26} style={{ color: item.color }} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "Cinzel, serif" }}>{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed" style={{ fontFamily: "Raleway, sans-serif" }}>{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Security Vault Banner */}
        <div className="p-8 md:p-12 rounded-3xl mb-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0c1b3a 0%, #050A18 100%)", border: "1px solid rgba(201,168,76,0.3)" }}>
          <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
            <div>
              <div className="text-[0.65rem] tracking-widest text-yellow-500 uppercase mb-2" style={{ fontFamily: "Raleway, sans-serif" }}>Vault Security & Protection</div>
              <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "Cinzel, serif" }}>
                100% Insured <span style={goldGradText()}>Storage Vaults</span>
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed mb-6" style={{ fontFamily: "Raleway, sans-serif" }}>
                Every single gram of gold pledged with us is packed in security seals with unique barcode tracking. It remains untouched in biometric steel vaults insured by top national underwriters until redeemed.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-semibold text-yellow-400" style={{ fontFamily: "Raleway, sans-serif" }}>
                <span className="flex items-center gap-1.5"><Lock size={14} /> Biometric Vault Access</span>
                <span className="flex items-center gap-1.5"><Building2 size={14} /> RBI Compliance</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Vault Security", val: "Grade A+" },
                { label: "Insurance Coverage", val: "100% Full" },
                { label: "Audit Frequency", val: "Monthly" },
                { label: "Purity Engine", val: "XRF AI" },
              ].map((box) => (
                <div key={box.label} className="p-5 rounded-2xl text-center" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.15)" }}>
                  <div className="text-xl font-bold text-white mb-1" style={{ fontFamily: "Cinzel, serif" }}>{box.val}</div>
                  <div className="text-gray-400 text-xs" style={{ fontFamily: "Raleway, sans-serif" }}>{box.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission, Vision, Core Values Tabbed Section */}
        <div className="grid md:grid-cols-12 gap-8 mb-20 items-stretch">
          {/* Left Column: Vertical tabs on desktop, horizontal on mobile */}
          <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 justify-center md:justify-start">
            {[
              { id: "mission", label: "Our Mission", icon: Target },
              { id: "vision", label: "Our Vision", icon: Eye },
              { id: "values", label: "Core Values", icon: ShieldCheck },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-xl text-sm font-bold tracking-wider transition-all duration-300 w-full cursor-pointer text-left ${
                    isActive 
                      ? "bg-[#FF7A00] text-white shadow-[0_0_20px_rgba(255,122,0,0.35)]" 
                      : "text-gray-400 hover:text-white hover:bg-white/5 border border-white/5 hover:border-white/10"
                  }`}
                  style={{
                    fontFamily: "Cinzel, serif",
                    background: isActive ? undefined : "rgba(255, 255, 255, 0.02)",
                    backdropFilter: isActive ? undefined : "blur(12px)"
                  }}
                >
                  <Icon size={18} className={isActive ? "text-white" : "text-gray-400"} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Right Column: Tab Content */}
          <div className="md:col-span-8 flex">
            <div className="w-full min-h-[220px] flex">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-8 md:p-10 rounded-2xl w-full flex flex-col justify-center border border-white/10"
                  style={{
                    ...glassStyle(),
                    background: "linear-gradient(135deg, rgba(22, 52, 88, 0.25) 0%, rgba(10, 24, 46, 0.35) 100%)"
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    {activeTab === "mission" && <Target size={24} className="text-[#FF7A00]" />}
                    {activeTab === "vision" && <Eye size={24} className="text-[#FF7A00]" />}
                    {activeTab === "values" && <ShieldCheck size={24} className="text-[#FF7A00]" />}
                    <h3 className="text-xl font-bold text-[#FF7A00]" style={{ fontFamily: "Cinzel, serif" }}>
                      {activeTab === "mission" && "Our Mission"}
                      {activeTab === "vision" && "Our Vision"}
                      {activeTab === "values" && "Core Values"}
                    </h3>
                  </div>
                  
                  {/* Dashed Line Separator matching screenshot */}
                  <div className="w-full border-t border-dashed border-[#FF7A00]/25 my-4" />

                  <p className="text-gray-300 text-sm leading-relaxed" style={{ fontFamily: "Raleway, sans-serif" }}>
                    {activeTab === "mission" && "Our mission at Lakshmi Finserv is to empower individuals and businesses by providing swift, secure, and accessible gold loan solutions. We are committed to delivering financial flexibility through transparent, customer-centric services that respect the value of your gold and support your financial goals."}
                    {activeTab === "vision" && "Our vision is to become the most trusted and preferred gold loan provider in the region, recognized for our integrity, innovation, and unwavering commitment to customer satisfaction. We aim to create a future where financial empowerment is within everyone's reach, enabling growth and prosperity for all."}
                    {activeTab === "values" && "We build lasting relationships based on trust and integrity, ensuring that our customers feel secure and confident in our services. We are committed to complete transparency in all our transactions, providing clear, honest communication with no hidden fees or surprises. Our customers are at the heart of everything we do. We prioritize their needs and strive to exceed their expectations with personalized and attentive service."}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-8 rounded-2xl text-center" style={{ background: "linear-gradient(135deg, #0c1836 0%, #050A18 100%)", border: "1px solid rgba(201,168,76,0.25)" }}>
          <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "Cinzel, serif" }}>Have Questions for Our Advisory Team?</h3>
          <p className="text-gray-400 text-xs mb-6" style={{ fontFamily: "Raleway, sans-serif" }}>Visit any of our 150+ branches or speak to our customer care advisory team today.</p>
          <button onClick={() => navigate("/contact")} className="px-8 py-3.5 rounded-xl text-xs font-bold tracking-widest uppercase cursor-pointer" style={{ background: "linear-gradient(135deg, #C9A84C, #FFD700)", color: "#050A18", fontFamily: "Cinzel, serif" }}>
            Contact Us <ArrowRight size={14} className="inline ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
