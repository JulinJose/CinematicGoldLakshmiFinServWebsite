import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, Mail, Plus } from "lucide-react";
import { useNavigate } from "react-router";

export function FloatingActions() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const actions = [
    { icon: MessageCircle, label: "WhatsApp", color: "#25D366", action: () => { window.open("https://api.whatsapp.com/send/?phone=971505964599&text&type=phone_number&app_absent=0", "_blank"); } },
    { icon: Mail, label: "Enquiry", color: "#E8782A", action: () => { navigate("/contact"); setOpen(false); } },
  ];

  return (
    <div className="fixed right-5 bottom-24 md:bottom-7 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open &&
          actions.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.button
                key={a.label}
                onClick={a.action}
                initial={{ opacity: 0, scale: 0, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0, x: 20 }}
                transition={{ delay: i * 0.06, type: "spring", stiffness: 350, damping: 22 }}
                whileHover={{ scale: 1.06, x: -4 }}
                className="flex items-center gap-3 px-4 py-2.5 rounded-2xl cursor-pointer"
                style={{
                  background: "rgba(5,10,24,0.95)",
                  backdropFilter: "blur(16px)",
                  border: `1px solid ${a.color}38`,
                  boxShadow: `0 4px 20px rgba(0,0,0,0.35), 0 0 20px ${a.color}12`,
                }}
              >
                <span className="text-xs text-gray-300 whitespace-nowrap" style={{ fontFamily: "Raleway, sans-serif" }}>
                  {a.label}
                </span>
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${a.color}20` }}>
                  <Icon size={15} style={{ color: a.color }} />
                </div>
              </motion.button>
            );
          })}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full flex items-center justify-center relative cursor-pointer"
        style={{
          background: "linear-gradient(135deg, #C9A84C, #FFD700)",
          boxShadow: open ? "0 0 0 rgba(255,215,0,0)" : "0 0 0 rgba(255,215,0,0.4)",
          animation: open ? "none" : "goldPulseGlow 2.2s ease-in-out infinite",
        }}
      >
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }} className="flex items-center justify-center">
          <Plus size={22} style={{ color: "#050A18" }} />
        </motion.div>
      </motion.button>
    </div>
  );
}
