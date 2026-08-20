import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { CustomCursor } from "./components/CustomCursor";
import { ScrollProgress } from "./components/ScrollProgress";
import { FloatingActions } from "./components/FloatingActions";
import { ScrollTop } from "./components/ScrollTop";
import { ScrollToTop } from "./components/ScrollToTop";

import { HomePage } from "./pages/HomePage";
import { LoansPage } from "./pages/LoansPage";
import { LoanDetailsPage } from "./pages/LoanDetailsPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";

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
  @media (pointer: fine) and (min-width: 768px) {
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

export default function App() {
  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = GLOBAL_CSS;
    document.head.appendChild(el);
    return () => {
      document.head.removeChild(el);
    };
  }, []);

  return (
    <BrowserRouter>
      <div style={{ background: "#050A18", fontFamily: "Raleway, sans-serif", overflowX: "hidden", minHeight: "100vh" }}>
        <ScrollToTop />
        <ScrollProgress />
        <CustomCursor />
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/loans" element={<LoansPage />} />
            <Route path="/loan-details" element={<LoanDetailsPage />} />
            <Route path="/why" element={<AboutPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* Fallback route */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        <Footer />
        <FloatingActions />
        <ScrollTop />
      </div>
    </BrowserRouter>
  );
}
