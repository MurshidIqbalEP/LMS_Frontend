import { Routes, Route, Navigate } from "react-router-dom";
import Studentslayouts from "../layouts/studentslayouts";
import Home from "../pages/students/Home";

function studentRoute() {
  return (
    <Routes>
      <Route path="/" element={<Studentslayouts />}>
        <Route index element={<Home />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default studentRoute;
