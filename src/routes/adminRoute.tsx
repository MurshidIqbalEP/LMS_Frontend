import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/admins/LoginPage";
import Adminlayout from "../layouts/adminlayouts";
import Dashboard from "@/pages/admins/Dashbord";
import StudentsPage from "@/pages/admins/StudentsPage";
import EducatorsPage from "@/pages/admins/EducatorsPage";
import NewCourses from "@/pages/admins/NewCourses";
import EditedCourses from "@/pages/admins/EditedCourses";
import CoursePage from "@/pages/admins/CoursePage";

function AdminRoute() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/login" replace />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/" element={<Adminlayout />}>
        <Route path="Dashboard" element={<Dashboard />} />
        <Route path="Students" element={<StudentsPage />} />
        <Route path="Educators" element={<EducatorsPage />} />
        <Route path="NewCourses" element={<NewCourses />} />
        <Route path="EditedCourses" element={<EditedCourses />} />
        <Route path="Courses" element={<CoursePage />} />
        <Route index element={<Navigate to="Dashboard" replace />} />
      </Route>

      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
}

export default AdminRoute;
