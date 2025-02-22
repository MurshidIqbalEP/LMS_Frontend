import { Routes, Route, Navigate } from "react-router-dom";
import Educatorlayouts from "../layouts/educatorlayouts";
import Home from "../pages/educators/Home";
import LoginPage from "../pages/educators/Login";
import Register from "../pages/educators/Registration";
import Addcourse from "../pages/educators/Addcourse";

function EducatorRoute() {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<Register />} />

      {/* Nested Routes inside EducatorLayout */}
      <Route path="/" element={<Educatorlayouts />}>
        <Route index element={<Home />} />
        <Route path="addcourse" element={<Addcourse />} />
      </Route>

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default EducatorRoute;
