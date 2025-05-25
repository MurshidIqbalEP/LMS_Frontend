import errorHandle from "./error";
import Api from "../services/axios";
import studentsRoutes from "../services/endpoints/studentsEndpoints";

// For registration of user
export const register = async(name:string,email: string, password: string)=>{
    try {
        let response = await Api.post(studentsRoutes.register, { name,email, password });
        return response;
      } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
      }
}

// For verify otp
export const verifyOtp = async(otp: string,email:string)=>{
  try {
      let response = await Api.post(studentsRoutes.verifyOtp, {otp,email});
      return response;
    } catch (error) {
      const err: Error = error as Error;
      return errorHandle(err);
    }
}

// For login user 
export const login = async(email: string, password: string)=>{
  try {
      let response = await Api.post(studentsRoutes.login, { email, password });
      return response;
    } catch (error) {
      const err: Error = error as Error;
      return errorHandle(err);
    }
}

// For google registration
export const googleRegistratiion = async(name: string ,email: string)=>{
  try {
      let response = await Api.post(studentsRoutes.googleRegistration, {name, email });
      return response;
    } catch (error) {
      const err: Error = error as Error;
      return errorHandle(err);
    }
}

// For google login
export const googleLogin = async(email: string)=>{
  try {
      let response = await Api.post(studentsRoutes.googleLogin, {email });
      return response;
    } catch (error) {
      const err: Error = error as Error;
      return errorHandle(err);
    }
}

// Fetch all Course
export const fetchAllCourse = async()=>{
  try {
      let response = await Api.get(studentsRoutes.fetchAllCourse);
      return response;
    } catch (error) {
      const err: Error = error as Error;
      return errorHandle(err);
    }
}

// Fetch All Categories
export const fetchAllCategory = async()=>{
  try {
      let response = await Api.get(studentsRoutes.fetchAllCategory);
      return response;
    } catch (error) {
      const err: Error = error as Error;
      return errorHandle(err);
    }
}

// Fetch Course Data
export const fetchCourse = async(courseId:string,studentId:string)=>{
  try {
      let response = await Api.get(`${studentsRoutes.fetchCourse}?courseId=${courseId}&studentId=${studentId}`);
      return response;
    } catch (error) {
      const err: Error = error as Error;
      return errorHandle(err);
    }
}

// For Razorpay Payment
export const payment = async(amount:number,courseId:string)=>{
  try {
    let response = await Api.post(studentsRoutes.payment,{amount,courseId});
      return response;
  } catch (error) {
    const err: Error = error as Error;
      return errorHandle(err);
  }
}

// For Razorpay Payment Verification
export const paymentVerification = async (
  response: any, 
  courseId: string,
  educatorId: string,
  studentId:string
) => {
  try {
    const apiResponse = await Api.post(studentsRoutes.paymentVerification, {
      ...response,
      courseId,
      educatorId,
      studentId
    });
    return apiResponse;
  } catch (error) {
    return errorHandle(error as Error);
  }
};

// For All Entrollments
export const myEntrollments = async (
  studentId:string
) => {
  try {
    const response = await Api.get(`${studentsRoutes.fetchMyentrollments}/${studentId}`);
    return response;
  } catch (error) {
    return errorHandle(error as Error);
  }
};

// For Fetch coursedata and resourse
export const fetchCoursePlayerData = async (studentId:string,courseId:string)=>{
  try {
     const response = await Api.get(`${studentsRoutes.fetchPlayerData}?courseId=${courseId}&studentId=${studentId}`);
     return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}

// For Fetch Course Progress
export const fetchCourseProgress = async (userId: string, courseId: string)=>{
  try {
     const response = await Api.get(`${studentsRoutes.fetchCourseProgress}?userId=${userId}&courseId=${courseId}`);
     return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}

// For Mark  Lecture as Viewed
export const markLectureViewed = async ( userId: string, courseId: string,chapterId: string,lectureId: string,status:string)=>{
  try {
     const response = await Api.patch(studentsRoutes.markLectureViewed,{userId,courseId,chapterId,lectureId,status});
     return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}

// For Fetch Question from pdf
export const fetchQuestionsFromPdf = async ( CoursePdf:string)=>{
  try {
     const response = await Api.get(`${studentsRoutes.fetchQuestions}?pdfUrl=${CoursePdf}`);
     return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}

// For Fetch Top Courses
export const fetchTopCourses = async ()=>{
  try {
     const response = await Api.get(studentsRoutes.fetchTopCourses);
     return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}

// For posting review and rating
export const postReview = async (userId:string,courseId:string,rating:string|number,review:string)=>{
  try {
     const response = await Api.post(studentsRoutes.postReview,{userId,courseId,rating,review});
     return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}


