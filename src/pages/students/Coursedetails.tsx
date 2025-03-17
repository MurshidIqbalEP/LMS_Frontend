import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCourse } from "../../api/studentsApi";
import { ICourse } from "../../services/types";

function Coursedetails() {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);
  const [courseData, setCourseData] = useState<ICourse>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let res = await fetchCourse(courseId as string);
        setCourseData(res?.data.courseData);
        console.log(res?.data.courseData);
        
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen w-full  ">
      <div
        className="h-[70vh] w-full relative flex items-center px-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(209,213,219,0) 0%, rgba(50,160,101,1) 100%)",
        }}
      >
        {/* Left Section - Course Info */}
        <div className="w-full max-w-3xl px-6 py-8 text-gray-800">
  <h1 className="text-4xl md:text-5xl font-bold mb-6">{courseData?.title}</h1>

  {/* Educator Info */}
  <div className="flex items-center mt-4 space-x-4">
    <img
      src={courseData?.educatorId?.profilePicture}
      alt="Educator"
      className="w-12 h-12 rounded-full object-cover border border-gray-200"
    />
    <div>
      <h2 className="text-lg font-medium">
        {courseData?.educatorId?.name}
      </h2>
      <p className="text-gray-600">{courseData?.category}</p>
    </div>
  </div>

  {/* Rating */}
  <div className="flex items-center mt-4">
    <span className="text-yellow-500">⭐</span>
    <p className="ml-2 text-sm font-medium">
      {courseData?.avgRating ? `${courseData.avgRating} / 5` : "No ratings yet"}
      <span className="text-gray-500 ml-2">
        ({courseData?.rating?.length || 0} reviews)
      </span>
    </p>
  </div>
</div>

        {/* Right Section - Red Div */}
        <div className="absolute w-[500px] h-[600px] bg-red-600 top-[110px] right-24 z-50 rounded-2xl shadow-2xl border-2 border-white"></div>
      </div>

      <div className="h-[50vh] w-full  "></div>
    </div>
  );
}

export default Coursedetails;
