import errorHandle from "./error";
import Api from "../services/axios";
import educatorRoutes from "../services/endpoints/educatorEndpoints";

interface Lecture {
  id: string;
  name: string;
  url: string;
}

interface Chapter {
  id: string;
  name: string;
  isExpanded: boolean;
  lectures: Lecture[];
}

interface CoursePayload {
  title: string;
  description: string;
  category: string;
  price: number;
  thumbnailUrl: string;
  resourceUrl: string;
  chapters: Chapter[];
}


// For registration of Educator
export const register = async(name:string,email: string, password: string,subjectExpertise:string,qualification:string,profilePicture:string,governmentId:string)=>{
    try {
        const response = await Api.post(educatorRoutes.register, { name,email, password ,subjectExpertise,qualification,profilePicture,governmentId});
        return response;
      } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
      }
}

// verify otp
export const otpVerify = async(otp:string,email: string)=>{
  try {
      const response = await Api.post(educatorRoutes.verifyOtp, {otp,email});
      return response;
    } catch (error) {
      const err: Error = error as Error;
      return errorHandle(err);
    }
}

// For login of Educator
export const login = async(email: string, password: string,)=>{
    try {
        const response = await Api.post(educatorRoutes.login, {email,password});
        return response;
      } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
      }
}

// For fetch all Category
export const fetchCategory = async ()=>{
  try {
    const response = await Api.get(educatorRoutes.fetchCategory);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}

// For Course poste
export const postCourse = async(payload: CoursePayload)=>{
  try {
      const response = await Api.post(educatorRoutes.postCourse,payload );
      return response;
    } catch (error) {
      const err: Error = error as Error;
      return errorHandle(err);
    }
}

// For fetching courses by educatorId
export const fetchCoursesById = async(educatorId:string)=>{
  try {
      const response = await Api.get(`${educatorRoutes.fetchCourses}?educatorId=${educatorId}`);
      return response;
    } catch (error) {
      const err: Error = error as Error;
      return errorHandle(err);
    }
}

// For Delete Course by educator ID
export const deleteCourse = async(courseId:string)=>{
  try {
      const response = await Api.delete(`${educatorRoutes.deleteCourse}?courseId=${courseId}`);
      return response;
    } catch (error) {
      const err: Error = error as Error;
      return errorHandle(err);
    }
}

// For fetching Course Data
export const fetchCourseByCourseId = async (courseId:string)=>{
  try {
    const response = await Api.get(`${educatorRoutes.fetchCourseById}/${courseId}`);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}

// For updating course 
export const updateCourse = async (payload: unknown)=>{
  try {
    const response = await Api.patch(educatorRoutes.updateCourse,payload);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}



