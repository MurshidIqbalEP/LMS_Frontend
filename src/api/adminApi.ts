import errorHandle from "./error";
import Api from "../services/axios";
import adminRoutes from "../services/endpoints/adminEndpoints";

// For login admin 
export const login = async(email: string, password: string)=>{
  try {
      const response = await Api.post(adminRoutes.login, { email, password });
      return response;
    } catch (error) {
      const err: Error = error as Error;
      return errorHandle(err);
    }
}

// For google admin login
export const googleLogin = async(email: string)=>{
  try {
      const response = await Api.post(adminRoutes.googleLogin, {email });
      return response;
    } catch (error) {
      const err: Error = error as Error;
      return errorHandle(err);
    }
}

// Fetch all students
export const fetchStudents = async()=>{
  try {
      const response = await Api.get(adminRoutes.fetchStudents);
      return response;
    } catch (error) {
      const err: Error = error as Error;
      return errorHandle(err);
    }
}

// Fetch all educator
export const fetchEducators = async()=>{
  try {
      const response = await Api.get(adminRoutes.fetchEducators);
      return response;
    } catch (error) {
      const err: Error = error as Error;
      return errorHandle(err);
    }
}

// For Block student
export const blockStudent = async(studentId: string)=>{
  try {
      const response = await Api.patch(`${adminRoutes.blockStudent}?studentId=${studentId}`);
      return response;
    } catch (error) {
      const err: Error = error as Error;
      return errorHandle(err);
    }
}

// For unBlock student
export const unblockStudent = async(studentId: string)=>{
  try {
      const response = await Api.patch(`${adminRoutes.unblockStudent}?studentId=${studentId}`);
      return response;
    } catch (error) {
      const err: Error = error as Error;
      return errorHandle(err);
    }
}

// For Block educator
export const blockEducator = async(educatorId: string)=>{
  try {
      const response = await Api.patch(`${adminRoutes.blockEducator}?educatorId=${educatorId}`);
      return response;
    } catch (error) {
      const err: Error = error as Error;
      return errorHandle(err);
    }
}

// For unBlock educator
export const unblockEducator = async(educatorId: string)=>{
  try {
      const response = await Api.patch(`${adminRoutes.unblockEducator}?educatorId=${educatorId}`);
      return response;
    } catch (error) {
      const err: Error = error as Error;
      return errorHandle(err);
    }
}

// For fetch newCourses
export const newCourses = async()=>{
  try {
      const response = await Api.get(adminRoutes.fetchNewCourses);
      return response;
    } catch (error) {
      const err: Error = error as Error;
      return errorHandle(err);
    }
}

// For fetch editedCourses
export const editedCourses = async()=>{
  try {
      const response = await Api.get(adminRoutes.fetchEditedCourses);
      return response;
    } catch (error) {
      const err: Error = error as Error;
      return errorHandle(err);
    }
}

// For Approve edit
export const approveEdit = async(id:string)=>{
  try {
      const response = await Api.patch(`${adminRoutes.approveEdit}?courseId=${id}`);
      return response;
    } catch (error) {
      const err: Error = error as Error;
      return errorHandle(err);
    }
}

// For Reject edit
export const rejectEdit = async(id:string)=>{
  try {
      const response = await Api.patch(`${adminRoutes.rejectEdit}?courseId=${id}`);
      return response;
    } catch (error) {
      const err: Error = error as Error;
      return errorHandle(err);
    }
}


// For approve course
export const approveCourse = async(id:string)=>{
  try {
      const response = await Api.patch(`${adminRoutes.approveCourse}?courseId=${id}`);
      return response;
    } catch (error) {
      const err: Error = error as Error;
      return errorHandle(err);
    }
}

// For reject course
export const rejectCourse = async(id:string)=>{
  try {
      const response = await Api.patch(`${adminRoutes.rejectCourse}?courseId=${id}`);
      return response;
    } catch (error) {
      const err: Error = error as Error;
      return errorHandle(err);
    }
}

// For fetch all courses
export const fetchCourses = async()=>{
  try {
      const response = await Api.get(adminRoutes.fetchCourses);
      return response;
    } catch (error) {
      const err: Error = error as Error;
      return errorHandle(err);
    }
}

// For list course
export const listCourse = async(id:string)=>{
  try {
      const response = await Api.patch(`${adminRoutes.listCourse}?courseId=${id}`);
      return response;
    } catch (error) {
      const err: Error = error as Error;
      return errorHandle(err);
    }
}

// For unlist course
export const unlistCourse = async(id:string)=>{
  try {
      const response = await Api.patch(`${adminRoutes.unlistCourse}?courseId=${id}`);
      return response;
    } catch (error) {
      const err: Error = error as Error;
      return errorHandle(err);
    }
}

