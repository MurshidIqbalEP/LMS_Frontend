import { approveCourse, newCourses, rejectCourse } from "@/api/adminApi";
import CourseTable from "@/componets/admins/courseTable";
import { ICourse } from "@/services/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";


const NewCourses = () => {
    const [newcourses, setNewcourses] = useState<ICourse[]>([]);
    useEffect(() => {
        const fetchNewCourse = async () => {
          try {
            const response = await newCourses();   
            setNewcourses(response?.data.courses);
          } catch (error) {
            toast.error("Failed to fetch newCourses");
          }
        };
    
        fetchNewCourse();
      }, []);

      const handleApprove = async (id: string) => {
            const res = await approveCourse(id);
            if (res) {
              setNewcourses((prev) => prev.filter((u) => u._id !== id));
              toast.success("Course approved");
            }
          };
        
          const handleReject = async (id: string) => {
            const res = await rejectCourse(id);
            if (res) {
              setNewcourses((prev) => prev.filter((u) => u._id !== id));
              toast.success("Course rejected");
            }
          };

  return (
    <CourseTable
  data={newcourses}
  onApprove={handleApprove}
  onReject={handleReject}
  title="New Courses"
  searchable={true}
//   onView={(course) => openCourseDetailModal(course)}
/>
  )
}

export default NewCourses
