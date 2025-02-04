import { Routes, Route, Navigate } from "react-router-dom";
import Educatorlayouts from "../layouts/educatorlayouts";
import Home from "../pages/educators/Home";

function educatorRoute() {
  return (
    <Routes>
      <Route element={<Educatorlayouts />}>
        
      <Route path="/" element={<Home />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default educatorRoute;
