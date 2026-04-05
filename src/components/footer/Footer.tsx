// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFacebook } from "@fortawesome/free-brands-svg-icons";

import smoothScrollTo from "@/utils/ScrollTo";
// TH: ฟังก์ชันคอมโพเนนต์ footer แสดงข้อมูลติดต่อและเวลาทำการ
// EN: Footer component function displaying contact info and business hours.
const Footer = () => {
  return (
    // <footer className="bg-gradient-to-t from-[#d0f79e] to-[#f8f7e7] py-10 mt-8">
    <footer className="bg-[#1c2d56] py-5 mt-5 relative text-white md:p-8" id="contact">
      <div className="max-w-6xl mx-auto px-4 py-2 flex flex-col md:flex-row gap-8 md:gap-16">
        <div className="flex-1">
          <div className="text-sm leading-relaxed">
            <a href="#" className="hover:text-[#efd62e] transition-colors mb-2 hover:no-underline" onClick={(e) => {
              // TH: ป้องกันการกระโดดลิงก์ปกติ แล้วใช้ smooth scroll แทน
              // EN: Prevent default anchor jump and use smooth scrolling instead.
              e.preventDefault();
              smoothScrollTo("HOME", 800); // duration in ms
            }}>AROY THAI</a>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 flex flex-col gap-5 md:flex-row  md:gap-16">
        <div className="flex-1">
          <b className="block mb-2">CONTACT US</b>
          <div className="text-sm leading-relaxed">
            <p>
              To place an order , message/ text us D&A
              <a
                className="hover:text-[#efd62e] transition-colors"
                onClick={() =>
                  window.open(
                    "https://www.facebook.com/profile.php?id=61577317643456",
                    "_blank"
                  )
                }
              >
                @ facebook A Roy Thai Food
              </a>
            </p>
          </div>
          <div className="text-sm leading-relaxed">
            <p>phone : 507-398-8077</p>
          </div>
          {/* <FontAwesomeIcon icon={faFacebook} /> */}
        </div>
        <div className="flex-1">
          <b className="block mb-2">HOURS</b>
          <div className="text-sm leading-relaxed">
            OPEN EVERY DAY: 12PM - 11PM (LAST ORDER 10:30PM)
            <br />
            AFTERNOON TEA: 2:30PM - 5:30PM
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
