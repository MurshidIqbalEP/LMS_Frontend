import { Routes, Route, Navigate } from "react-router-dom";
import Studentslayouts from "../layouts/studentslayouts";
import Home from "../pages/students/Home";
import LoginPage from "../pages/students/Login";
import Register from "../pages/students/Registration";
import Allcources from "../pages/students/Allcources";

function studentRoute() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />
      
      <Route path="/" element={<Studentslayouts />}>
        <Route index element={<Home />} />
        <Route path="allcourses" element={<Allcources />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default studentRoute;
