import { Outlet } from "react-router-dom";
import Navbar from "../componets/students/Navbar";

function studentslayouts() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo or Branding */}
          <div className="text-2xl font-bold mb-4 md:mb-0">
            BedAura
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-6">
            <a href="#" className="hover:underline">
              About Us
            </a>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </div>

          {/* Social Media Links */}
          {/* <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-400">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaInstagram size={20} />
            </a>
          </div> */}
        </div>

        {/* Copyright Section */}
        <div className="text-center mt-6 text-sm text-gray-400">
          © {new Date().getFullYear()} BedAura. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default studentslayouts;
