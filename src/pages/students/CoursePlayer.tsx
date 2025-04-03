import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchCoursePlayerData,
  fetchCourseProgress,
  markLectureViewed,
} from "../../api/studentsApi"; // Import API functions
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  ICourse,
  ILecture,
  IProgressData,
  IUserInfo,
} from "../../services/types";
import VideoPlayer from "../../componets/students/VideoPlayer";
import {
  BsChevronDown,
  BsChevronRight,
  BsPlayCircleFill,
} from "react-icons/bs";
import { GiBullseye } from "react-icons/gi";
import { LuGoal } from "react-icons/lu";


const CoursePlayer = () => {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);
  const [courseData, setCourseData] = useState<ICourse>();
  const [progressData, setProgressData] = useState<IProgressData>();
  const [selectedLecture, setSelectedLecture] = useState<ILecture | null>(null);
  const [openChapters, setOpenChapters] = useState<Record<string, boolean>>({});
  const [progress, setProgress] = useState<number>(0); // Progress Percentage

  const studentInfo = useSelector(
    (state: RootState) => state.auth.userInfo
  ) as IUserInfo | null;

  // Toggle Chapter Open/Close
  const toggleChapter = (chapterId: string) => {
    setOpenChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  // Fetch course data and progress
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch Course Data
        let res = await fetchCoursePlayerData(
          studentInfo?._id as string,
          courseId as string
        );
        setCourseData(res?.data.courseData);
        setSelectedLecture(res?.data.courseData.chapters[0].lectures[0]);
        setOpenChapters({ [res?.data.courseData.chapters[0]._id]: true });

        // Fetch P  rogress
        let progressRes = await fetchCourseProgress(
          studentInfo?._id as string,
          courseId as string
        );

        setProgressData(progressRes?.data.progress);
        setProgress(progressRes?.data.completionPercentage);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [courseId, studentInfo]);

  // Mark Lecture as Viewed
  const handleLectureClick = async (lecture: ILecture, chapterId: string) => {
    setSelectedLecture(lecture);

    try {
      await markLectureViewed(
        studentInfo?._id as string,
        courseId as string,
        chapterId,
        lecture._id as string
      );

      // Refresh Progress
      let progressRes = await fetchCourseProgress(
        studentInfo?._id as string,
        courseId as string
      );
      console.log(progressRes);
      
      setProgressData(progressRes?.data.progress);
      setProgress(progressRes?.data.completionPercentage);
    } catch (error) {
      console.log("Error updating progress", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen px-12 py-3 gap-5">
      {/* Left Side: Video Player */}
      <div className="w-[922px] h-screen flex flex-col gap-1 mt-2 rounded-lg">
        <div className="h-[523px] w-full">
          <VideoPlayer videoUrl={selectedLecture?.videoUrl as string} />
        </div>

        <div>
          <h1 className="text-xl m-0">
            {selectedLecture?.title || "Select a Lecture"}
          </h1>
          <div className="w-full flex items-center">
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
      </div>

      {/* Right Side: Chapters & Progress */}
      <div className="flex-1 bg-white shadow-md rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-5 flex justify-between items-center rounded-t-lg">
          <div>
            <h2 className="font-bold text-lg">{courseData?.title}</h2>
            <p className="text-xs text-blue-100">{courseData?.description}</p>

            {/* Progress Bar */}
          <div className="flex items-center gap-3">
            <span className="text-sm">{progress.toFixed(1)}%</span>
            <div className="w-full bg-gray-300 rounded-full h-2">
              <div
                className="h-2 bg-green-500 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          </div>
          
        </div>

        {/* Chapters List */}
        <ul className="p-4 space-y-4">
          {courseData?.chapters.map((chapter, index) => (
            <li key={chapter._id} className="bg-gray-200 rounded-lg shadow-sm">
              {/* Chapter Header */}
              <div
                className="flex items-center justify-between p-4 rounded-lg cursor-pointer transition bg-white shadow-sm hover:shadow-md hover:bg-gray-50"
                onClick={() => toggleChapter(chapter._id)}
              >
                {/* Chapter Title */}
                <h3 className="text-base font-medium text-gray-900 tracking-wide">
                  {chapter.title}
                </h3>

                {/* Right Section: Status + Chevron */}
                <div className="flex items-center gap-4 ">
                  {/* Completion Status */}
                  <button
                   className={`px-3 py-1 text-xs font-medium rounded-full transition flex items-center gap-1 
                            ${progressData?.chapters[index]?.isCompleted ? "bg-green-100 text-green-600 hover:bg-green-200" : "bg-red-100 text-red-600 hover:bg-red-200"}`}
                  >
                     {progressData?.chapters[index]?.isCompleted ? (
                     <>Completed <LuGoal size={16} /></>
                     ) : (
                     <>Uncompleted </>
                  )}
                 </button>


                  {/* Chevron Icon */}
                  {openChapters[chapter._id] ? (
                    <BsChevronDown size={18} className="text-gray-500" />
                  ) : (
                    <BsChevronRight size={18} className="text-gray-500" />
                  )}
                </div>
              </div>

              {/* Lecture List */}
              {openChapters[chapter._id] && (
                <ul className="m-2 pl-4 space-y-2 py-2">
                {chapter.lectures.map((lecture) => {
                  const lectureProgress = progressData?.chapters
                    .find((ch) => ch.chapterId === chapter._id) // Match chapter
                    ?.lecturesProgress.find((lec) => lec.lectureId === lecture._id); // Match lecture
              
                  return (
                    <li
                      key={lecture._id}
                      className={`p-3 rounded-md shadow flex justify-between items-center cursor-pointer transition duration-200 ease-in-out 
                      ${selectedLecture?._id === lecture._id ? "bg-blue-100 border-l-4 border-blue-500" : "bg-white hover:bg-gray-100"}`}
                      onClick={() => handleLectureClick(lecture, chapter._id)}
                    >
                      <div className="flex items-center space-x-3">
                        <BsPlayCircleFill
                          className={`text-lg ${selectedLecture?._id === lecture._id ? "text-blue-500" : "text-gray-400"}`}
                        />
                        <span
                          className={`text-sm ${selectedLecture?._id === lecture._id ? "text-blue-700 font-medium" : "text-gray-700"}`}
                        >
                          {lecture.title}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        <button
                          className={`px-3 py-1 text-xs  flex  items-center gap-0.5 font-medium rounded-full transition 
                          ${lectureProgress?.isCompleted
                            ? "bg-green-100 text-green-600 hover:bg-green-200"
                            : "bg-red-100 text-red-600 hover:bg-red-200"}`}
                        >
                         {lectureProgress?.isCompleted ? (
                            <>Viewed<GiBullseye size={15}/> </>  
                         ) : (
                           "Not Viewed"
                         )}
                        </button>
                      </span>
                    </li>
                  );
                })}
              </ul>
              
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CoursePlayer;
