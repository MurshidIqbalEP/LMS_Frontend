
import { Outlet } from 'react-router-dom';
import Navbar from '../componets/educators/Navbar';

export default function educatorlayouts() {
  
  return (
    <div>
     <Navbar />
       <main>
         <Outlet /> 
       </main>
    </div>
  )
}

