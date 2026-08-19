import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router";
import { motion, AnimatePresence, useScroll } from "motion/react";
import { Menu, X, Coins, Gem, TrendingUp, Phone, Info } from "lucide-react";
import { glassStyle, goldGradText } from "../utils/theme";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => setScrolled(v > 0.02));
    return unsub;
  }, [scrollYProgress]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const links = [
    { label: "Home", path: "/" },
    { label: "Gold Loans", path: "/loans" },
    { label: "Loan Details", path: "/loan-details" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, type: "spring", delay: 0.2 }}
        className="absolute top-3 left-3 right-3 z-50 rounded-2xl backdrop-blur-md"
        style={{
          background: scrolled
            ? "linear-gradient(135deg, rgba(22, 52, 88, 0.96) 0%, rgba(10, 24, 46, 0.98) 100%)"
            : "linear-gradient(135deg, rgba(22, 52, 88, 0.85) 0%, rgba(14, 32, 60, 0.9) 100%)",
          border: scrolled
            ? "1px solid rgba(255, 215, 0, 0.55)"
            : "1px solid rgba(255, 215, 0, 0.35)",
          transition: "all 0.4s ease",
          boxShadow: scrolled
            ? "0 12px 45px rgba(0, 0, 0, 0.8), 0 0 30px rgba(255, 215, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
            : "0 8px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.12)",
        }}
      >
        <div className="flex items-center justify-between px-5 py-3">
          {/* Brand */}
          <Link to="/" className="flex items-center group">
            <img
              src="/goldlakshmi_logo.png"
              alt="GOLDLAKSHMI FINSERV"
              className="h-16 sm:h-20 w-auto object-contain group-hover:scale-105 transition-transform rounded-lg"
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-5">
            {links.map((l) => (
              <NavLink
                key={l.path}
                to={l.path}
                className={({ isActive }) =>
                  `text-[0.72rem] tracking-widest uppercase transition-all duration-200 relative py-1 ${
                    isActive ? "text-yellow-400 font-bold" : "text-gray-300 hover:text-yellow-300"
                  }`
                }
                style={{ fontFamily: "Raleway, sans-serif" }}
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                        style={{ background: "linear-gradient(to right, #C9A84C, #FFD700)", boxShadow: "0 0 8px rgba(255,215,0,0.6)" }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Action button */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,215,0,0.45)" }}
              whileTap={{ scale: 0.96 }}
              className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-xl text-[0.72rem] font-bold tracking-widest uppercase"
              style={{
                background: "linear-gradient(135deg, #C9A84C, #FFD700, #C9A84C)",
                backgroundSize: "200% auto",
                animation: "goldFlow 4s linear infinite",
                color: "#050A18",
                fontFamily: "Cinzel, serif",
                boxShadow: "0 0 18px rgba(255,215,0,0.25)",
              }}
              onClick={() => navigate("/contact")}
            >
              Apply Now
            </motion.button>
            <button className="lg:hidden text-yellow-400 p-1.5" onClick={() => setOpen(!open)}>
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t"
              style={{ borderColor: "rgba(201,168,76,0.15)" }}
            >
              <div className="px-5 py-4 flex flex-col gap-2">
                {links.map((l) => (
                  <NavLink
                    key={l.path}
                    to={l.path}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `text-left text-sm tracking-widest uppercase py-2 transition-colors ${
                        isActive ? "text-yellow-400 font-bold" : "text-gray-300 hover:text-yellow-400"
                      }`
                    }
                    style={{ fontFamily: "Raleway, sans-serif" }}
                  >
                    {l.label}
                  </NavLink>
                ))}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { setOpen(false); navigate("/contact"); }}
                  className="mt-2 py-3 rounded-xl text-xs font-bold tracking-widest uppercase"
                  style={{ background: "linear-gradient(135deg, #C9A84C, #FFD700)", color: "#050A18", fontFamily: "Cinzel, serif" }}
                >
                  Apply for Gold Loan
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile bottom nav bar */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 safe-b"
        style={{ background: "rgba(5,10,24,0.96)", backdropFilter: "blur(24px)", borderTop: "1px solid rgba(201,168,76,0.18)" }}
      >
        <div className="flex justify-around py-2">
          {[
            { icon: TrendingUp, label: "Plans", path: "/loans" },
            { icon: Info, label: "Details", path: "/loan-details" },
            { icon: Phone, label: "Contact", path: "/contact" },
          ].map(({ icon: Icon, label, path }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className="flex flex-col items-center gap-1 px-4 py-2 transition-colors"
              >
                <Icon size={18} className={isActive ? "text-yellow-400" : "text-gray-500"} />
                <span
                  className={`text-[0.6rem] tracking-wide ${isActive ? "text-yellow-400 font-bold" : "text-gray-500"}`}
                  style={{ fontFamily: "Raleway, sans-serif" }}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
