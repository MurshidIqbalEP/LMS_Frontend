import errorHandle from "./error";
import Api from "../services/axios";
import studentsRoutes from "../services/endpoints/educatorEndpoints";

export const register = async(name:string,email: string, password: string)=>{
    try {
        let response = await Api.post(studentsRoutes.register, { name,email, password });
        console.log(response)
        return response;
      } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
      }

}