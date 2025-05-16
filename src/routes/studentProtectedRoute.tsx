import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom"; 
import { Navigate } from "react-router-dom"; 
import { RootState } from "../redux/store";

function studentProtectedRoute() {
    const studentInfo = useSelector((state: RootState) => state.auth.userInfo);
  return studentInfo ? <Outlet /> : <Navigate to="/login" replace />;
}

export default studentProtectedRoute
