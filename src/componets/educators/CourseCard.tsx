import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Modal, Popover } from "antd";
import {
  FaEdit,
  FaExclamationTriangle,
  FaTrashAlt,
  FaUsers,
} from "react-icons/fa";
import { useGSAP } from "@gsap/react";
import PopoverContent from "./PopoverContent";
import { deleteCourse } from "../../api/educatorApi";
import { toast } from "sonner";
import Editcourse from "./Editcourse";
import Test from "./test";
import { useNavigate } from "react-router-dom";


interface Course {
  _id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  isPublished: boolean;
  enrolledStudents: number;
}

const CourseCard = ({ course,setCourses,
}: {
  course: Course;
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
}) => {
  const navigate = useNavigate()
  const cardRef = useRef<HTMLDivElement>(null);
  const [isModalOpen,setIsModalOpen] = useState(false)

  useGSAP(() => {
    // Hover animation
    const card = cardRef.current;
    if (!card) return;

    gsap.set(card, { scale: 1 });

    const hoverAnimation = gsap.to(card, {
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
      duration: 0.3,
      paused: true,
      ease: "power3.out",
    });

    card.addEventListener("mouseenter", () => hoverAnimation.play());
    card.addEventListener("mouseleave", () => hoverAnimation.reverse());

    return () => {
      card.removeEventListener("mouseenter", () => hoverAnimation.play());
      card.removeEventListener("mouseleave", () => hoverAnimation.reverse());
    };
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  
    return () => document.body.classList.remove("overflow-hidden");
  }, [isModalOpen]);

  const handleDelete = async (courseId: string) => {
    const deleted = await deleteCourse(courseId);
    if (deleted?.data.success) {
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course._id !== courseId)
      );
      toast(deleted.data.message);
    }
  };

  return (
    <>
      <div
        ref={cardRef}
        className="bg-white rounded-xl shadow-md overflow-hidden w-full h-[320px] max-w-sm transition-all duration-300 hover:shadow-xl border border-gray-300 hover:scale-[1.05]"
      >
        {/* Card content */}
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"></div>
          </div>
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-48 object-cover"
          />
  
          {/* Status badge */}
          <span
            className={`absolute top-3 right-3 z-20 text-xs font-medium px-3 py-1 rounded-full ${
              course.isPublished
                ? "bg-green-500 text-white"
                : "bg-red-100 text-red-800"
            }`}
          >
            {course.isPublished ? "Published" : "Draft"}
          </span>
  
          {/* Course metrics */}
          <div className="absolute bottom-3 left-3 right-3 flex justify-between z-20">
            <div className="flex items-center space-x-3">
              <div className="flex items-center bg-black/40 backdrop-blur-sm text-white px-2 py-1 rounded-full">
                <FaUsers size={14} className="mr-1" />
                <span className="text-xs">{course.enrolledStudents}</span>
              </div>
            </div>
          </div>
        </div>
  
        {/* Content section */}
        <div className="p-4">
          <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-1">
            {course.title}
          </h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {course.description}
          </p>
  
          {/* Actions */}
          <div className="flex justify-between items-center">
            <Popover
              content={
                <PopoverContent onDelete={() => handleDelete(course._id)} />
              }
            >
              <button className="flex items-center text-red-600 hover:text-red-800 text-sm font-medium cursor-pointer transition-colors">
                <FaTrashAlt size={14} className="mr-1" />
                Delete
              </button>
            </Popover>
            <button
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium  cursor-pointer py-2 px-4 text-sm rounded-lg transition-colors"
              // onClick={() => setIsModalOpen(true)}
              onClick={() => navigate(`/educator/editCourse/${course._id}`)}
            >
              <FaEdit size={14} className="mr-1" />
              Edit
            </button>
          </div>
        </div>
      </div>
  
     
      {isModalOpen && (
        <Editcourse courseId={course._id} onClose={() => setIsModalOpen(false)} />
      )}



    </>
  );
};

export default CourseCard;
