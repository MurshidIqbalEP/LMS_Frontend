import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

function Navbar() {
  const user = useSelector((state: RootState) => state.auth.userInfo); 
    return (
      <div className="mt-2 mb-1 w-full h-[45px] border-t-2 border-b-2 border-gray-300 flex items-center justify-between px-4">
        {/* Logo Section */}
        <div> 
          <img src="/logo.png" alt="LOGO" className="h-full w-[137px] cursor-pointer" />
        </div>
  
        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-12">
          <a href="#" className="text-gray-500 hover:text-black">Home</a>
          <a href="#" className="text-gray-500 hover:text-black">Cources</a>
          <a href="#" className="text-gray-500 hover:text-black">MyCources</a>
        </nav>
  
        {/* Actions Section */}
        <div className="flex space-x-4">
        {user ? (
          <>
          <a href="#" className="text-gray-500 hover:text-black">Logout</a>
          <span className="text-gray-500 flex items-center space-x-2 group">
            Welcome, {user?.name}
            <img 
              src="/icons8-user.gif" 
              alt="User GIF" 
              className="w-7 h-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </span>
        </>
        
        ) : (
          <>
          <a href="#" className="text-gray-500 hover:text-black">Login</a>
          <a href="#" className="text-gray-500 hover:text-black">Register</a>
          </>

        )}
      </div>
      </div>
    );
  }
  
  export default Navbar;
  