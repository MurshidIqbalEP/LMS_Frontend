import { Routes, Route, Navigate } from "react-router-dom";
import Studentslayouts from "../layouts/studentslayouts";
import Home from "../pages/students/Home";
import LoginPage from "../componets/students/Login";

function studentRoute() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      <Route path="/" element={<Studentslayouts />}>
        <Route index element={<Home />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default studentRoute;
