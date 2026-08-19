import { Link } from "react-router";
import { goldGradText } from "../utils/theme";

export function Footer() {
  return (
    <footer className="py-12 px-6" style={{ background: "#030810", borderTop: "1px solid rgba(201,168,76,0.12)" }}>
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img
                src="/goldlakshmi_logo.png"
                alt="GOLDLAKSHMI FINSERV"
                className="h-10 sm:h-12 w-auto object-contain rounded-lg"
              />
            </Link>
            <p className="text-gray-600 text-xs leading-relaxed" style={{ fontFamily: "Raleway, sans-serif" }}>
              India's most trusted gold finance partner. RBI regulated. Bank-grade security. Serving 2 lakh+ families.
            </p>
          </div>

          <div>
            <h4 className="text-gray-400 text-[0.65rem] tracking-widest uppercase mb-4" style={{ fontFamily: "Raleway, sans-serif" }}>Quick Navigation</h4>
            <ul className="space-y-2">
              {[
                { label: "Home", path: "/" },
                { label: "Gold Loan Plans", path: "/loans" },
                { label: "Loan Details", path: "/loan-details" },
                { label: "About Us & Standards", path: "/about" },
              ].map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="text-gray-600 hover:text-yellow-400 text-xs transition-colors" style={{ fontFamily: "Raleway, sans-serif" }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gray-400 text-[0.65rem] tracking-widest uppercase mb-4" style={{ fontFamily: "Raleway, sans-serif" }}>Company & Trust</h4>
            <ul className="space-y-2">
              {[
                { label: "About GoldLakshmi", path: "/about" },
                { label: "Contact & Branches", path: "/contact" },
                { label: "Careers", path: "/about" },
                { label: "Investor Relations", path: "/about" },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.path} className="text-gray-600 hover:text-yellow-400 text-xs transition-colors" style={{ fontFamily: "Raleway, sans-serif" }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gray-400 text-[0.65rem] tracking-widest uppercase mb-4" style={{ fontFamily: "Raleway, sans-serif" }}>Regulatory & Legal</h4>
            <ul className="space-y-2">
              {["Privacy Policy", "Terms of Service", "Grievance Policy", "Fair Practice Code"].map((item) => (
                <li key={item}>
                  <a href="#" onClick={(e) => e.preventDefault()} className="text-gray-600 hover:text-yellow-400 text-xs transition-colors" style={{ fontFamily: "Raleway, sans-serif" }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
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
