import { useState } from "react";
import smoothScrollTo from "../utils/ScrollTo";
// TH: ฟังก์ชันคอมโพเนนต์ส่วนหัวของหน้าเว็บ พร้อมเมนู responsive
// EN: Header component function with responsive navigation menu.
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="bg-[#1f2429] text-white" id="HOME">
      <div className="p-3 md:flex md:items-center md:justify-between  md:p-4 lg:px-auto max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <a
            className="flex items-center text-xl font-bold text-[#ffc107]"
            href="/"
          >
            <i className="fas fa-utensils me-2"></i>
            AROY THAI
          </a>
          <button
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((v) => !v)}
            className="p-2 border border-white/30 rounded-lg text-white/90 hover:bg-white/10 transition-colors md:hidden"
          >
            <svg
              className={`w-6 h-6 transition-transform duration-500 ease-in-out ${isOpen ? "rotate-90" : "rotate-0"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen
            ? "max-h-96 opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"
            } md:transition-none md:max-h-none md:opacity-100 md:translate-y-0 md:pointer-events-auto md:overflow-visible md:flex md:items-center`}
        >
          <nav className="grid px-1 py-3 space-y-3 text-base font-medium transition-colors [&_a]:text-white [&_a]:transition-colors [&_a:hover]:text-[#ffc107] md:space-y-0 md:px-0 md:py-0 md:flex md:gap-6 md:items-center">
            <a href="#">HOME</a>
            <a href="#">MENU</a>
            <a href="#">SPECIALS</a>
            <a
              href="#contact"
              onClick={(e) => {
                // TH: ป้องกันการกระโดดลิงก์ปกติ แล้วใช้ smooth scroll แทน
                // EN: Prevent default anchor jump and use smooth scrolling instead.
                e.preventDefault();
                smoothScrollTo("contact", 800); // duration in ms
                if (isOpen) setIsOpen(false);
              }}
            >
              CONTACT
            </a>
            <a href="#">LOGIN</a>
          </nav>
        </div>
      </div>

    </header>
  );
};

export default Header;
