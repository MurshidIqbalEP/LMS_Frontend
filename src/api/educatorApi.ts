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
        let response = await Api.post(educatorRoutes.register, { name,email, password ,subjectExpertise,qualification,profilePicture,governmentId});
        return response;
      } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
      }
}

// For login of Educator
export const login = async(email: string, password: string,)=>{
    try {
        let response = await Api.post(educatorRoutes.login, {email,password});
        return response;
      } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
      }
}

// For Course poste
export const postCourse = async(payload: CoursePayload)=>{
  try {
      let response = await Api.post(educatorRoutes.postCourse,payload );
      return response;
    } catch (error) {
      const err: Error = error as Error;
      return errorHandle(err);
    }
}

// For fetching courses by educatorId
export const fetchCoursesById = async(educatorId:string)=>{
  try {
      let response = await Api.get(`${educatorRoutes.fetchCourses}?educatorId=${educatorId}`);
      return response;
    } catch (error) {
      const err: Error = error as Error;
      return errorHandle(err);
    }
}

