
import { FaArrowUp, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { IoMailOpenOutline } from 'react-icons/io5';


function Footer() {

  return (
    <div
      className="w-full bg-[#fbad41] p-4 flex flex-col gap-1"
    >
      <div className="h-[45px] bg-black rounded-sm flex items-center pl-3 gap-2 footer-animate">
        <h2 className="text-white font-bold !mb-0">CONTACT US</h2>
        <button className="bg-[#fbad41] text-black p-1 rounded flex items-center">
          <IoMailOpenOutline className="text-lg" />
        </button>
      </div>

      <div className="w-full h-[307px] flex">
        <div className="p-8 w-[70%] footer-animate">
          <h1 className="text-7xl text-black leading-none amber-900">
            GET IN TOUCH.
          </h1>

          <div className="border-b border-dashed border-gray-900 my-6"></div>

          <p className="text-gray-900 mt-6 mb-10 max-w-xl">
            Crafting digital experiences that convert. Sheffield-based web
            development that puts your business first.
          </p>

          <div className="flex gap-5 mt-12">
            {[FaInstagram, FaTwitter, FaLinkedin].map((Icon, i) => (
              <div
                key={i}
                className="h-8 w-8 border-2 border-gray-900 rounded-full flex items-center justify-center hover:bg-gray-900 hover:text-[#fbad41] transition-colors duration-300 footer-animate"
              >
                <Icon className="h-4 w-4 text-gray-900 hover:text-[#fbad41] transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 w-[30%] flex justify-end footer-animate">
          <div className="flex m-1 w-full max-w-md p-4">
            <div className="w-40 text-left">
              {["BASED IN", "PHONE NO.", "CONTACT", "SUPPORT", "STATUS"].map((label, i) => (
                <p key={i} className="font-bold text-gray-900 mb-5">
                  {label}
                </p>
              ))}
            </div>
            <div className="flex-1 text-left">
              {[
                "SHEFFIELD, UNITED KINGDOM",
                "+44 7878 851825",
                "CONTACT@EDUVANTAGE.COM",
                "HELP@EDUVANTAGE.COM",
                "STATUS PAGE",
              ].map((info, i) => (
                <p key={i} className="font-bold text-gray-900 mb-5">
                  {info}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between py-4 border-t border-dashed border-gray-900 footer-animate">
        <div className="text-gray-900 mb-2 md:mb-0">
          © 2025 M2X DEVELOPMENT. ALL RIGHTS RESERVED.
        </div>
        <div
          className="text-gray-900 flex items-center cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          GO BACK TO TOP
          <FaArrowUp className="ml-2 h-4 w-4" />
        </div>
      </div>
    </div>
  );
}

export default Footer;
