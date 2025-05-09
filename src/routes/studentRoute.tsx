import { Routes, Route, Navigate } from "react-router-dom";
import Studentslayouts from "../layouts/studentslayouts";
import Home from "../pages/students/Home";
import LoginPage from "../pages/students/Login";
import Register from "../pages/students/Registration";
import Allcources from "../pages/students/Allcources";
import Coursedetails from "../pages/students/Coursedetails";
import EnrollmentsPage from "../pages/students/Enrollments";
import CoursePlayer from "../pages/students/CoursePlayer";
import Interview from "../pages/students/Interview";
import CertificateGenerator from "../pages/students/Certificate";
import Otp from "../pages/students/Otp";


function studentRoute() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/otp" element={<Otp />} />
      
      <Route path="/" element={<Studentslayouts />}>
        <Route index element={<Home />} />
        <Route path="allcourses" element={<Allcources />} />
        <Route path="course/:courseId" element={<Coursedetails />} />
        <Route path="myEntrollments" element={<EnrollmentsPage />} />
        <Route path="playCourse/:courseId" element={<CoursePlayer />} />
        <Route path="interview" element={<Interview />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default studentRoute;
