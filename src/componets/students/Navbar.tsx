import { useSelector,useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { Link } from "react-router-dom";
import { clearUser } from "../../redux/slices/authSlice";
import {persistor} from "../../redux/store"

function Navbar() {
  const user = useSelector((state: RootState) => state.auth.userInfo); 
  const dispatch = useDispatch();
   const handlelogout = ()=>{
      dispatch(clearUser());
      localStorage.removeItem("token");
      persistor.purge();
    }
    return (
      <div className="mt-2 mb-1 w-full h-[45px] border-t-2 border-b-2 border-gray-300 flex items-center justify-between px-4">
        {/* Logo Section */}
        <div> 
          <img src="/logo.png" alt="LOGO" className="h-full w-[137px] cursor-pointer" />
        </div>
  
        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-12">
          <Link to={"/"} className="text-gray-500 hover:text-black ">Home</Link>
          <Link to={"/allcourses"} className="text-gray-500 hover:text-black ">Courses</Link>
          <Link to={"/myEntrollments"} className="text-gray-500 hover:text-black ">My Enrollments</Link>
        </nav>
  
        {/* Actions Section */}
        <div className="flex space-x-4">
        {user ? (
          <>
          <a className="text-gray-500 hover:text-black" onClick={handlelogout}>Logout</a>
          <span className="text-gray-500 flex items-center space-x-2 group">
            Welcome
            <img 
              src="/icons8-user.gif" 
              alt="User GIF" 
              className="w-7 h-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            
          </span>
        </>
        
        ) : (
          <>
          <Link to="login" className="text-gray-500 hover:text-black">Login</Link>
          <Link to="register" className="text-gray-500 hover:text-black">Register</Link>
          </>

        )}
      </div>
      </div>
    );
  }
  
  export default Navbar;
  