import { Link } from "react-router";
import { goldGradText } from "../utils/theme";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

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
                className="h-16 sm:h-20 w-auto object-contain rounded-lg"
              />
            </Link>
            <p className="text-gray-600 text-xs leading-relaxed" style={{ fontFamily: "Raleway, sans-serif" }}>
              We are a team of designers and makers that create high quality Gold bars and Bullions.
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
            <h4 className="text-gray-400 text-[0.65rem] tracking-widest uppercase mb-4" style={{ fontFamily: "Raleway, sans-serif" }}>Locate Us</h4>
            <div className="w-full h-24 rounded-lg overflow-hidden border border-white/5 mb-4 relative grayscale hover:grayscale-0 transition-all duration-500">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113911.23869275037!2d75.71448835820314!3d26.8851416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4adf4c57e281%3A0xce1c63a0cf22e09!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            
            <h4 className="text-gray-400 text-[0.65rem] tracking-widest uppercase mb-3" style={{ fontFamily: "Raleway, sans-serif" }}>Follow Us</h4>
            <div className="flex items-center gap-3">
              <a href="#" className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-[#FFD700] hover:bg-white/10 transition-colors">
                <Facebook size={12} />
              </a>
              <a href="#" className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-[#FFD700] hover:bg-white/10 transition-colors">
                <Twitter size={12} />
              </a>
              <a href="#" className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-[#FFD700] hover:bg-white/10 transition-colors">
                <Instagram size={12} />
              </a>
              <a href="#" className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-[#FFD700] hover:bg-white/10 transition-colors">
                <Youtube size={12} />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t flex justify-center items-center text-center" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
          <p className="text-gray-500 text-[0.65rem]" style={{ fontFamily: "Raleway, sans-serif" }}>
            © 2024 GoldLakshmi FinServ Design by <span style={{ color: "#E8782A" }}>GoldLakshmi FinServ</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
