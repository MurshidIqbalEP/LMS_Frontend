import {  Route,Routes } from "react-router-dom"
import EducatorRoute from "./educatorRoute"
import StudentRoute from "./studentRoute"
import AdminRoute from "./adminRoute"
import Blocked from "@/pages/blocked"


export default function appRoute() {
    return (
      <Routes>
              <Route  path='/*' element={<StudentRoute/>} />
              <Route  path='/educator/*' element={<EducatorRoute/>} />            
              <Route  path='/admin/*' element={<AdminRoute/>} />  
              <Route path="/blocked" element={<Blocked />} />          
          </Routes>
  
    )
  }