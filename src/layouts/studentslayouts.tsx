import { Outlet } from "react-router-dom";
import Navbar from "../componets/students/Navbar";

function studentslayouts() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default studentslayouts;
