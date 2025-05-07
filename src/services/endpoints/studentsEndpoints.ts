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
    fetchPlayerData:"/students/fetchPlayerData",
    fetchCourseProgress:"/students/fetchCourseProgress",
    markLectureViewed:"/students/markLecture",
    fetchQuestions:"/students/fetchQuestionsFromPdf",
    fetchTopCourses:"/students/fetchTopCourses"
}

export default studentsRoutes; 