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
  const educatorInfo = useSelector((state: RootState) => state.educator.educatorInfo) as Educator | null;
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!educatorInfo?._id) return;
      try {
        setIsLoading(true);
        const response = await fetchCoursesById(educatorInfo._id);
        setCourses(response?.data?.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, [educatorInfo?._id]); // Add educatorInfo._id as dependency

  useGSAP(() => {
    if (!isLoading && courses.length > 0) {
      // Reset all cards to initial state
      gsap.set(".course-card", { 
        opacity: 0,
        y: 15,
        scale: 0.95
      });
      
      // Simple, smooth staggered animation
      gsap.to(".course-card", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        stagger: 0.08,
        ease: "power1.out",
        clearProps: "all" // Ensures clean state after animation
      });
    }
  }, [courses, isLoading]);
  return (
    <div ref={containerRef} className="w-full min-h-screen bg-[#F2F0EF] p-4">
      <h1 className="text-2xl ml-[10px] font-bold text-black mb-4">My Courses</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-screen">
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} setCourses={setCourses}/>
        ))}
      </div>
    </div>
  );
}

export default Mycourses;