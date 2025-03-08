import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom"; 
import { Navigate } from "react-router-dom"; 
import { RootState } from "../redux/store";

const EducatorProtected =() => {
    const educatorInfo = useSelector((state: RootState) => state.educator.educatorInfo);

    return educatorInfo ? <Outlet /> : <Navigate to="/educator/login" replace />;
    
};

export default EducatorProtected;
