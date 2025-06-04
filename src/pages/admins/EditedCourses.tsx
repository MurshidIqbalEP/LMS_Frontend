import { approveEdit, editedCourses, rejectCourse } from "@/api/adminApi";
import CourseTable from "@/componets/admins/courseTable";
import { ICourse } from "@/services/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


const EditedCourses = () => {
    const [editedcourses, setEditedcourses] = useState<ICourse[]>([]);
      const navigate = useNavigate();
    useEffect(() => {
        const fetchCourse = async () => {
          try {
            const response = await editedCourses();   
            setEditedcourses(response?.data.courses);
          } catch (error) {
            toast.error("Failed to fetch newCourses");
          }
        };
    
        fetchCourse();
      }, []);

      const handleApprove = async (id: string) => {
                  const res = await approveEdit(id);
                  if (res) {
                    setEditedcourses((prev) => prev.filter((u) => u._id !== id));
                    toast.success("Edit approved");
                  }
                };
              
                const handleReject = async (id: string) => {
                  const res = await rejectCourse(id);
                  if (res) {
                    setEditedcourses((prev) => prev.filter((u) => u._id !== id));
                    toast.success("Course rejected");
                  }
                };

                     const handleView = (course: ICourse) => {
    navigate(`/admin/course/${course._id}`);
  };

  return (
     <CourseTable
  data={editedcourses}
  onApprove={handleApprove}
  onReject={handleReject}
  title="Edited Courses"
  searchable={true}
  onView={handleView}
/>
  )
}

export default EditedCourses
