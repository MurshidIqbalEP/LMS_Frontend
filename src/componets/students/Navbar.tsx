import { useSelector,useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { Link,NavLink } from "react-router-dom";
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
      <div className=" mt-2 w-full h-[45px] border-t-2 border-b-2 border-gray-300 flex items-center justify-between px-4">
        {/* Logo Section */}
        <div>
          <img
            src="/logo.png"
            alt="LOGO"
            className="h-full w-[137px] cursor-pointer"
          />
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-12">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "text-black font-semibold" : "hover:text-gray-300"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/allcourses"
            className={({ isActive }) =>
              isActive ? "text-black font-semibold" : "hover:text-gray-300"
            }
          >
            Courses
          </NavLink>
          <NavLink
            to="/myEntrollments"
            className={({ isActive }) =>
              isActive ? "text-black font-semibold" : "hover:text-gray-300"
            }
          >
            My Enrollments
          </NavLink>
        </nav>

        {/* Actions Section */}
        <div className="flex space-x-4">
          {user ? (
            <>
              <a className=" hover:text-gray-300" onClick={handlelogout}>
                Logout
              </a>
              <span className=" flex items-center space-x-2 group">
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
              <Link to="login" className=" hover:text-gray-300">
                Login
              </Link>
              <Link to="register" className=" hover:text-gray-300">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    );
  }
  
  export default Navbar;
  