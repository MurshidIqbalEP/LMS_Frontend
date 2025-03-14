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

