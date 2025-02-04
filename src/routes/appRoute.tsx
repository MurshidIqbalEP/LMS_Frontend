import {  Route,Routes } from "react-router-dom"
import EducatorRoute from "./educatorRoute"
import StudentRoute from "./studentRoute"


export default function appRoute() {
    return (
      <Routes>
  
              <Route  path='/*' element={<StudentRoute/>} />
              <Route  path='/educator/*' element={<EducatorRoute/>} />            
          </Routes>
  
    )
  }