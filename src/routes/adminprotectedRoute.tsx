import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom"; 
import { Navigate } from "react-router-dom"; 
import { RootState } from "../redux/store";

const AdminProtected =() => {
    const adminInfo = useSelector((state: RootState) => state.admin.adminInfo);

    return adminInfo ? <Outlet /> : <Navigate to="/admin/login" replace />;
    
};

export default AdminProtected;
