import { Outlet } from "react-router-dom";
import Navbar from "../componets/students/Navbar";
import Footer from "../componets/students/Footer";

function studentslayouts() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
}

export default studentslayouts;
