import { payment } from "../../api/studentsApi";

const studentsRoutes = {
    register:'/students/register',
    login:'/students/login',
    googleRegistration:"/students/googleregister",
    googleLogin:"/students/googlelogin",
    fetchAllCourse:"/students/fetchAllCourse",
    fetchAllCategory:"/students/fetchAllCategory",
    fetchCourse:"/students/fetchCourse",
    payment:"/students/payment",
    paymentVerification:"/students/paymentVerification",
    fetchMyentrollments:"/students/myEntrollments",
}

export default studentsRoutes; 