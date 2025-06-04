import { fetchCourses, listCourse, unlistCourse } from "@/api/adminApi";
import AllCourseTable from "@/componets/admins/allCoursesTable";
import { ICourse } from "@/services/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CoursePage = () => {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetchCourses();
        console.log(response?.data.courses);

        setCourses(response?.data.courses);
      } catch (error) {
        toast.error("Failed to fetch newCourses");
      }
    };

    fetchCourse();
  }, []);

  const handleList = async (id: string) => {
    const res = await listCourse(id);
    if (res) {
      setCourses((prev) =>
        prev.map((u) => (u._id === id ? { ...u, isPublished: true } : u))
      );
      toast.success("course listed");
    }
  };

  const handleUnlist = async (id: string) => {
    const res = await unlistCourse(id);
    if (res) {
      setCourses((prev) =>
        prev.map((u) => (u._id === id ? { ...u, isPublished: false } : u))
      );
      toast.success("course unlisted");
    }
  };

   const handleView = (course: ICourse) => {
    navigate(`/admin/course/${course._id}`);
  };
  return (
    <AllCourseTable
      data={courses}
      onApprove={handleList}
      onReject={handleUnlist}
      title="Courses"
      searchable={true}
      onView={handleView}
    />
  );
};

export default CoursePage;
