import errorHandle from "./error";
import Api from "../services/axios";
import educatorRoutes from "../services/endpoints/educatorEndpoints";

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