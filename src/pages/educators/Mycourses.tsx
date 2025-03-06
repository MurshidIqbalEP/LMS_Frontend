import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import CourseCard from "../../componets/educators/CourseCard";
import { fetchCoursesById } from "../../api/educatorApi";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useGSAP } from "@gsap/react";

interface Educator {
  _id: string;
  name: string;
  email: string;
}

interface Course {
  _id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  isPublished: boolean;
  enrolledStudents: number;
}

function Mycourses() {
  const educatorInfo = useSelector((state: RootState) => state.educatorSlice.educatorInfo) as Educator | null;
  const [courses, setCourses] = useState<Course[]>([]);
  const containerRef = useRef<HTMLDivElement>(null); // Reference for animation

  useEffect(() => {
    const fetchCourses = async () => {
      if (!educatorInfo?._id) return;
      try {
        const response = await fetchCoursesById(educatorInfo._id);
        setCourses(response?.data?.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  useGSAP(() => {
    // Animate course cards when they load  
    gsap.fromTo(
      ".course-card",
      { opacity: -100, scale: 0.8, x: -10, },
      { opacity: 1, scale: 1, x: 0, duration: 0.6, stagger: 0.2, ease: "power3.out" }
    );
  }, [courses]);

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-[#F2F0EF] p-4">
      <h1 className="text-2xl ml-[10px] font-bold text-black mb-4">My Courses</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-screen">
        {courses.map((course) => (
          <CourseCard key={course._id} course={course}  setCourses={setCourses}/>
        ))}
      </div>
    </div>
  );
}

export default Mycourses;
