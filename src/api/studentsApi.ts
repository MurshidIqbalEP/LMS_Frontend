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
export const fetchCourse = async(courseId:string)=>{
  try {
      let response = await Api.get(`${studentsRoutes.fetchCourse}?courseId=${courseId}`);
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
  response: any, // Contains Razorpay response
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


