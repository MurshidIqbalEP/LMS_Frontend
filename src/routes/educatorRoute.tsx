import { Routes, Route, Navigate } from "react-router-dom";
import Educatorlayouts from "../layouts/educatorlayouts";
import Home from "../pages/educators/Home";
import LoginPage from "../pages/educators/Login";
import Register from "../pages/educators/Registration";
import Addcourse from "../pages/educators/Addcourse";
import Mycourses from "../pages/educators/Mycourses";
import Editcourse from "../pages/educators/Editcourse";
import EducatorProtected from "./educatorprotectedRoute";
import Otp from "../pages/educators/Otp";


function EducatorRoute() {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<Register />} />
      <Route path="otp" element={<Otp />} />

      {/* Nested Routes inside EducatorLayout */}
      <Route path="/" element={<Educatorlayouts />}>
        <Route index element={<Home />} />

        <Route element={<EducatorProtected />}>
          <Route path="addcourse" element={<Addcourse />} />
          <Route path="mycourses" element={<Mycourses />} />
          <Route path="editcourse/:courseId" element={<Editcourse />} />
        </Route>
      </Route>

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/educator" />} />
    </Routes>
  );
}

export default EducatorRoute;
