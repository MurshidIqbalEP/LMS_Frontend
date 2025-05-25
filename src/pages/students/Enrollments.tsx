import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Link } from "react-router-dom";
import { ICourse, IUserInfo } from "../../services/types";
import { myEntrollments } from "../../api/studentsApi";
import EntrollmentCards from "../../componets/students/EnrollmentCards";

const EnrollmentsPage = () => {
  const [enrolledCourses, setEnrolledCourses] = useState<ICourse[]>([]);
  const userInfo = useSelector(
    (state: RootState) => state.auth.userInfo
  ) as IUserInfo | null;

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await myEntrollments(userInfo?._id as string);
        setEnrolledCourses(response?.data.enrolledCourses);
      } catch (error) {
        console.error("Error fetching enrollments:", error);
      }
    };

    if (userInfo) fetchEnrollments();
  }, [userInfo]);

  return (
    <div className="w-full min-h-screen p-4">
      <h1 className="text-2xl ml-[10px] font-bold text-black mb-4">
        My Entrollments
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4 min-h-screen">
        {enrolledCourses.map((course) => (
          <EntrollmentCards key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default EnrollmentsPage;
