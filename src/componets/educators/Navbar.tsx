import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { clearEducator } from "../../redux/slices/educatorSlice";
import {persistor} from "../../redux/store"
import { RootState } from "../../redux/store";

function Navbar() {
  const educatorInfo = useSelector((state: RootState) => state.educator.educatorInfo);
  const dispatch = useDispatch();
  const handlelogout = ()=>{
    dispatch(clearEducator());
     localStorage.removeItem("token");
    persistor.purge();
  }
    return (
      <div className=" mt-2 w-full h-[45px] border-t-2 border-b-2 border-gray-300 flex items-center justify-between px-4">
        {/* Logo Section */}
        <div > 
          <img src="/logo.png" alt="LOGO" className="h-full w-[137px] cursor-pointer" />
        </div>
  
        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-12">
        <Link to="addcourse" className="text-gray-500 hover:text-black">Add Course</Link>
        <Link to="mycourses" className="text-gray-500 hover:text-black">MyCourses</Link>

          
        </nav>
  
        {/* Actions Section */}
        <div className="flex space-x-4 ">
        {educatorInfo ? (
          <>
          <a className="text-gray-500 hover:text-black cursor-pointer"  onClick={handlelogout}>Logout</a>
          <span className="text-gray-500 flex items-center space-x-2 group">
            {/* Welcome, {educatorInfo?.name} */}
            <img 
              src="/icons8-user.gif" 
              alt="User GIF" 
              className="w-7 h-7 rounded-full   transition-opacity duration-300"
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
  