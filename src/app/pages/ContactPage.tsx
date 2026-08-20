import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Phone, Mail, Clock, Building2, CheckCircle } from "lucide-react";
import { goldGradText, glassStyle } from "../utils/theme";

export function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    setForm({ name: "", phone: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="pt-32 md:pt-40 pb-20 px-6 min-h-screen" style={{ background: "linear-gradient(180deg, #050A18 0%, #0a1428 100%)" }}>
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full text-[0.7rem] tracking-widest uppercase"
            style={{ background: "rgba(255,122,0,0.1)", border: "1px solid rgba(255,122,0,0.3)", color: "#FF7A00", fontFamily: "Raleway, sans-serif" }}>
            <Phone size={14} /> Get In Touch
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "Cinzel, serif" }}>
            Contact <span style={goldGradText()}>GoldLakshmi FinServ</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto text-sm leading-relaxed" style={{ fontFamily: "Raleway, sans-serif" }}>
            Have questions about our plans or gold valuation? Connect with our dedicated support team in Jaipur today.
          </p>
        </motion.div>

        {/* Form and Info Section Grid */}
        <div className="grid md:grid-cols-5 gap-8 mb-16 items-start">
          {/* Form - 3 cols */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="md:col-span-3 p-8 rounded-2xl border border-white/10" style={glassStyle()}>
            <h2 className="text-2xl font-bold text-[#FF7A00] mb-6" style={{ fontFamily: "Cinzel, serif" }}>
              Tell Us Your Thoughts
            </h2>

            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div key="ok" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: "linear-gradient(135deg, #FF7A00, #FFD700)", boxShadow: "0 0 40px rgba(255,122,0,0.4)" }}>
                    <CheckCircle size={32} style={{ color: "#050A18" }} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "Cinzel, serif" }}>Message Sent!</h3>
                  <p className="text-gray-300 text-sm max-w-md" style={{ fontFamily: "Raleway, sans-serif" }}>
                    Thank you. We have received your thoughts. Our support team will get in touch with you shortly.
                  </p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Name *"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none transition-all"
                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "Raleway, sans-serif" }}
                        onFocus={(e) => (e.target.style.borderColor = "rgba(255,122,0,0.5)")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="Phone *"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none transition-all"
                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "Raleway, sans-serif" }}
                        onFocus={(e) => (e.target.style.borderColor = "rgba(255,122,0,0.5)")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="email"
                        placeholder="Email *"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none transition-all"
                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "Raleway, sans-serif" }}
                        onFocus={(e) => (e.target.style.borderColor = "rgba(255,122,0,0.5)")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Subject *"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none transition-all"
                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "Raleway, sans-serif" }}
                        onFocus={(e) => (e.target.style.borderColor = "rgba(255,122,0,0.5)")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                      />
                    </div>
                  </div>

                  <div>
                    <textarea
                      rows={5}
                      placeholder="Message *"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none resize-none transition-all"
                      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "Raleway, sans-serif" }}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(255,122,0,0.5)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                    />
                  </div>

                  <div className="flex justify-center pt-2">
                    <button
                      type="submit"
                      className="px-8 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase cursor-pointer transition-all hover:scale-105 duration-300"
                      style={{ background: "#FFFFFF", color: "#050A18", fontFamily: "Raleway, sans-serif", border: "1px solid rgba(255,255,255,0.2)" }}
                    >
                      SEND MESSAGE
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact Details - 2 cols */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="md:col-span-2 space-y-6">
            {/* Contact Us Box */}
            <div className="p-8 rounded-2xl border border-white/10" style={glassStyle()}>
              <h2 className="text-2xl font-bold text-[#FF7A00] mb-3" style={{ fontFamily: "Cinzel, serif" }}>
                Contact Us
              </h2>
              <p className="text-gray-300 text-xs leading-relaxed mb-6" style={{ fontFamily: "Raleway, sans-serif" }}>
                We are a team of designers and makers that create high quality Gold bars and Bullions.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4 py-2 border-b border-white/5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 flex-shrink-0">
                    <Building2 size={18} className="text-[#FF7A00]" />
                  </div>
                  <div>
                    <div className="text-white text-xs font-semibold" style={{ fontFamily: "Raleway, sans-serif" }}>Jaipur, INDIA</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 py-2 border-b border-white/5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 flex-shrink-0">
                    <Phone size={18} className="text-[#FF7A00]" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <a href="tel:+919828033273" className="text-white text-xs font-semibold hover:text-[#FF7A00] transition-colors" style={{ fontFamily: "Raleway, sans-serif" }}>+91 9828 033 273</a>
                    <a href="tel:+919636964363" className="text-white text-xs font-semibold hover:text-[#FF7A00] transition-colors" style={{ fontFamily: "Raleway, sans-serif" }}>+91 96369 64363</a>
                  </div>
                </div>

                <div className="flex items-center gap-4 py-2">
                  <a href="mailto:goldlakshmifinserv@gmail.com" className="flex items-center gap-4 w-full">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 flex-shrink-0">
                      <Mail size={18} className="text-[#FF7A00]" />
                    </div>
                    <div>
                      <div className="text-white text-xs font-semibold" style={{ fontFamily: "Raleway, sans-serif" }}>goldlakshmifinserv@gmail.com</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="mt-8">
                <h3 className="text-sm font-bold text-[#FF7A00] mb-2 uppercase tracking-wider" style={{ fontFamily: "Cinzel, serif" }}>
                  Working Hours
                </h3>
                <div className="flex items-center gap-2 text-xs text-gray-300" style={{ fontFamily: "Raleway, sans-serif" }}>
                  <Clock size={14} className="text-[#FF7A00]" />
                  <span>Monday ◈ Saturday: 08AM ◈ 22PM</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative"
        >
          {/* Map Iframe */}
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14234.372561917637!2d75.7872709!3d26.9124336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db61234b53fff%3A0x6e2df9547d25e01c!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin" 
            width="100%" 
            height="450" 
            style={{ border: 0, filter: "grayscale(1) invert(0.9) contrast(1.2) brightness(0.9)" }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="GoldLakshmi FinServ Jaipur Office Location Map"
          />
        </motion.div>
      </div>
    </div>
  );
}
