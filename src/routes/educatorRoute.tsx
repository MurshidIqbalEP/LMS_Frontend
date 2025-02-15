import { Routes, Route, Navigate } from "react-router-dom";
import Educatorlayouts from "../layouts/educatorlayouts";
import Home from "../pages/educators/Home";
import LoginPage from "../pages/educators/Login";
import Register from "../pages/educators/Registration";

function educatorRoute() {
  return (
    <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />

      <Route element={<Educatorlayouts />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route path="*" element={<Navigate to="/educator" />} />
    </Routes>
  );
}

export default educatorRoute;
