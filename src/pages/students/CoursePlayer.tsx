import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCoursePlayerData } from "../../api/studentsApi";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ICourse, ILecture, IUserInfo } from "../../services/types";
import VideoPlayer from "../../componets/students/VideoPlayer";

const CoursePlayer = () => {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);
  const [courseData, setCourseData] = useState<ICourse>();
  const [selectedLecture, setSelectedLecture] = useState<ILecture | null>(null);

  const studentInfo = useSelector(
    (state: RootState) => state.auth.userInfo
  ) as IUserInfo | null;
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let res = await fetchCoursePlayerData(
          studentInfo?._id as string,
          courseId as string
        );
        setCourseData(res?.data.courseData);
        setSelectedLecture(res?.data.courseData.chapters[0].lectures[0]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(true);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row h-screen px-12 py-3 gap-5">
      {/* Left Side: Video Player */}
      <div className="w-[922px] h-screen flex flex-col items-center gap-3 justify-center rounded-lg">
        
        <VideoPlayer videoUrl={selectedLecture?.videoUrl as string}  />
         
        <h1 className="text-lg font-semibold">
          {selectedLecture?.title || "Select a Lecture"}
        </h1>
        <div className="h-[50px] w-full flex items-center">
          <div className="flex items-center gap-3">
            <img
              src={courseData?.educatorId?.profilePicture}
              alt={courseData?.educatorId?.name}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-black"
            />
            <span className="text-base font-medium text-gray-900">
              {courseData?.educatorId?.name}
            </span>
          </div>
        </div>
      </div>

      {/* Right Side: Chapter & Lecture List */}
      <div className="flex-1 bg-gray-100 p-4 overflow-y-auto rounded-lg">
        <h2 className="text-xl font-semibold mb-4">{courseData?.title}</h2>
        <ul>
          {courseData?.chapters.map((chapter) => (
            <li key={chapter._id} className="mb-4">
              <h3 className="text-lg font-medium">{chapter.title}</h3>
              <ul className="ml-4">
                {chapter.lectures.map((lecture) => (
                  <li
                    key={lecture._id}
                    className={`p-3 mb-2 bg-white rounded-md shadow flex justify-between items-center cursor-pointer hover:bg-gray-200 transition ${
                      selectedLecture?._id === lecture._id ? "bg-blue-100" : ""
                    }`}
                    onClick={() => setSelectedLecture(lecture)}
                  >
                    <span>{lecture.title}</span>
                    <span className="text-sm text-gray-500">
                      {lecture.duration}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CoursePlayer;
