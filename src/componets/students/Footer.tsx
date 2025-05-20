import React from 'react'
import { FaArrowUp, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { IoMailOpenOutline } from 'react-icons/io5';

function Footer() {
  return (
    <div className="w-full  bg-[#fbad41] p-4 flex flex-col gap-3 ">
      <div className="  h-[45px] bg-black rounded-sm flex  items-center pl-3 gap-2">
        <h2 className="text-white !font-bold !mb-0">CONTACT US</h2>
        <button className="bg-[#fbad41] text-black p-1 rounded flex items-center">
          <IoMailOpenOutline className="text-lg" />
        </button>
      </div>

      <div className="w-full h-[307px]  flex">
        <div className="p-8 w-[70%]">
          {/* Title */}
          <h1 className="text-7xl  text-black leading-none amber-900">
            GET IN TOUCH.
          </h1>

          {/* Divider */}
          <div className="border-b border-dashed border-gray-900 my-6"></div>

          {/* Tagline */}
          <p className="text-gray-900 mt-6 mb-10 max-w-xl">
            Crafting digital experiences that convert. Sheffield-based web
            development that puts your business first.
          </p>
          <div className="flex gap-5 mt-12">
            <div className="h-8 w-8 border-2 border-gray-900 rounded-full flex items-center justify-center hover:bg-gray-900 hover:text-[#fbad41]  transition-colors duration-300 ">
              <FaInstagram className="h-4 w-4 text-gray-900 hover:text-[#fbad41] transition-colors duration-300 " />
            </div>
            <div className="h-8 w-8 border-2 border-gray-900 rounded-full flex items-center justify-center hover:bg-gray-900 hover:text-[#fbad41]  transition-colors duration-300 ">
              <FaTwitter className="h-4 w-4 text-gray-900 hover:text-[#fbad41] transition-colors duration-300 " />
            </div>
            <div className="h-8 w-8 border-2 border-gray-900 rounded-full flex items-center justify-center hover:bg-gray-900 hover:text-[#fbad41]  transition-colors duration-300 ">
              <FaLinkedin className="h-4 w-4 text-gray-900 hover:text-[#fbad41] transition-colors duration-300 " />
            </div>
          </div>
        </div>

        <div className="p-4 w-[30%] flex justify-end">
  {/* Contact Information */}
  <div className="flex m-1 w-full max-w-md p-4">
    <div className="w-40 text-left">
      <p className="font-bold text-gray-900 mb-5">BASED IN</p>
      <p className="font-bold text-gray-900 mb-5">PHONE NO.</p>
      <p className="font-bold text-gray-900 mb-5">CONTACT</p>
      <p className="font-bold text-gray-900 mb-5">SUPPORT</p>
      <p className="font-bold text-gray-900 mb-5">STATUS</p>
    </div>

    <div className="flex-1 text-left">
      <p className="font-bold text-gray-900 mb-5">SHEFFIELD, UNITED KINGDOM</p>
      <p className="font-bold text-gray-900 mb-5">+44 7878 851825</p>
      <p className="font-bold text-gray-900 mb-5">CONTACT@EDUVANTAGE.COM</p>
      <p className="font-bold text-gray-900 mb-5">HELP@EDUVANTAGE.COM</p>
      <p className="font-bold text-gray-900 mb-5">STATUS PAGE</p>
    </div>
  </div>
</div>

      </div>
      <div className="flex  flex-col md:flex-row justify-between px-8 py-6 border-t border-dashed border-gray-900">
        <div className="text-gray-900 mb-2 md:mb-0">
          © 2025 M2X DEVELOPMENT. ALL RIGHTS RESERVED.
        </div>
        <div className="text-gray-900 flex items-center cursor-pointer" onClick={()=>window.scrollTo({ top: 0, behavior: "smooth" })}>
          GO BACK TO TOP
          <FaArrowUp className="ml-2 h-4 w-4" />
        </div>
      </div>
    </div>
  );
}

export default Footer
