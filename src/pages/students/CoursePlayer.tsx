import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchCoursePlayerData,
  fetchCourseProgress,
  markLectureViewed,
} from "../../api/studentsApi";
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
import { GiBullseye, GiNotebook, GiStarsStack } from "react-icons/gi";
import { LuGoal } from "react-icons/lu";
import CertificateGenerator from "./Certificate";
import Review from "../../componets/students/Review";

const CoursePlayer = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState<ICourse>();
  const [progressData, setProgressData] = useState<IProgressData>();
  const [selectedLecture, setSelectedLecture] = useState<ILecture | null>(null);
  const [openChapters, setOpenChapters] = useState<Record<string, boolean>>({});
  const [progress, setProgress] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);

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
      try {
        // Fetch Course Data
        const res = await fetchCoursePlayerData(
          studentInfo?._id as string,
          courseId as string
        );

        setCourseData(res?.data.courseData);

        setSelectedLecture(res?.data.courseData.chapters[0].lectures[0]);
        setOpenChapters({ [res?.data.courseData.chapters[0]._id]: true });

        // Fetch P  rogress
        const progressRes = await fetchCourseProgress(
          studentInfo?._id as string,
          courseId as string
        );
        setProgressData(progressRes?.data.progress);
        setProgress(progressRes?.data.completionPercentage);
      } catch (error) {
        console.log(error);
      } 
    };
    fetchData();
  }, [courseId, studentInfo]);

  const handleLectureClick = async (lecture: ILecture, chapterId: string) => {
    setSelectedLecture(lecture);

    try {
      await markLectureViewed(
        studentInfo?._id as string,
        courseId as string,
        chapterId,
        lecture._id as string,
        "in_progress"
      );

      // Refresh Progress
      const progressRes = await fetchCourseProgress(
        studentInfo?._id as string,
        courseId as string
      );

      setProgressData(progressRes?.data.progress);
      setProgress(progressRes?.data.completionPercentage);
    } catch (error) {
      console.log("Error updating progress", error);
    }
  };

  const handleLectureEnd = async () => {
    try {
      await markLectureViewed(
        studentInfo?._id as string,
        courseId as string,
        selectedLecture?.chapterId as string,
        selectedLecture?._id as string,
        "completed"
      );

      // Refresh progress
      const progressRes = await fetchCourseProgress(
        studentInfo?._id as string,
        courseId as string
      );

      setProgressData(progressRes?.data.progress);
      setProgress(progressRes?.data.completionPercentage);

      // Find current chapter
      const currentChapterIndex = courseData?.chapters.findIndex(
        (ch) => ch._id === selectedLecture?.chapterId
      );

      if (currentChapterIndex === -1 || currentChapterIndex === undefined)
        return;
      const currentChapter = courseData?.chapters[currentChapterIndex];

      // Find current lecture index
      const currentLectureIndex = currentChapter?.lectures.findIndex(
        (l) => l._id === selectedLecture?._id
      );
      if (typeof currentLectureIndex !== "number" || currentLectureIndex === -1)
        return;

      // Try to get next lecture in the same chapter
      const nextLecture = currentChapter?.lectures[currentLectureIndex + 1];

      if (nextLecture) {
        // Go to next lecture in current chapter
        handleLectureClick(nextLecture, currentChapter._id);
      } else {
        // Move to first lecture of next chapter
        const nextChapter = courseData?.chapters[currentChapterIndex + 1];

        if (nextChapter && nextChapter.lectures.length > 0) {
          const firstLectureOfNextChapter = nextChapter.lectures[0];
          toggleChapter(currentChapter!._id);
          toggleChapter(nextChapter._id);
          handleLectureClick(firstLectureOfNextChapter, nextChapter._id);
        } 
      }
    } catch (error) {
      console.log("Error updating progress", error);
    }
  };

  const handleInterviewClick = () => {
    navigate("/interview", { state: { pdfUrl: courseData?.resources } });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row h-screen px-12 py-3 gap-5">
        {/* Left Side: Video Player */}
        <div className="w-[922px] h-screen flex flex-col gap-1  rounded-lg">
          <div className="h-[523px] w-full rounded-2xl border-[0.5px] shadow-2xl bg-black">
            <VideoPlayer
              videoUrl={selectedLecture?.videoUrl as string}
              onEnded={handleLectureEnd}
            />
          </div>

          <div>
            <h1 className="text-xl m-0">
              {selectedLecture?.title || "Select a Lecture"}
            </h1>
            <div className="w-full flex items-center justify-between">
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
              <div>
                <a
                  href={courseData?.resources}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h1 className="hover:text-blue-600 hover:underline cursor-pointer flex items-center gap-1">
                    Resource <GiNotebook />
                  </h1>
                </a>
              </div>
            </div>
            {progressData?.isCompleted && (
              <div className="w-full mt-4 flex flex-col sm:flex-row gap-4">
                <button
                  className="bg-[#f77f00] flex-1 text-white px-4 py-3 rounded-lg hover:bg-[#f88f00] transition duration-200 cursor-pointer"
                  onClick={handleInterviewClick}
                >
                  AI Interview
                </button>

                <CertificateGenerator
                  name={studentInfo?.name as string}
                  course={courseData?.title as string}
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Chapters & Progress */}
        <div className="flex-1  shadow-2xl rounded-lg overflow-hidden flex flex-col">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-5 flex justify-between items-center rounded-t-lg">
            <div>
              <h2 className="font-bold text-lg">{courseData?.title}</h2>
              <p className="text-xs text-blue-100">{courseData?.description}</p>

              {/* Progress Bar */}
              <div className="flex items-center gap-3 mt-2">
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

          <ul className="p-4 space-y-4 flex-1 overflow-y-auto">
            {courseData?.chapters.map((chapter, index) => (
              <li
                key={chapter._id}
                className="bg-gray-200 rounded-lg shadow-sm"
              >
                <div
                  className="flex items-center justify-between p-4 rounded-lg cursor-pointer transition bg-white shadow-sm hover:shadow-md hover:bg-gray-50"
                  onClick={() => toggleChapter(chapter._id)}
                >
                  <h3 className="text-base font-medium text-gray-900 tracking-wide">
                    {chapter.title}
                  </h3>
                  <div className="flex items-center gap-4">
                    <button
                      className={`px-3 py-1 text-xs font-medium rounded-full transition flex items-center gap-1 
                ${
                  progressData?.chapters[index]?.isCompleted
                    ? "bg-green-100 text-green-600 hover:bg-green-200"
                    : "bg-red-100 text-red-600 hover:bg-red-200"
                }`}
                    >
                      {progressData?.chapters[index]?.isCompleted ? (
                        <>
                          Completed <LuGoal size={16} />
                        </>
                      ) : (
                        <>Uncompleted</>
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
                        .find((ch) => ch.chapterId === chapter._id)
                        ?.lecturesProgress.find(
                          (lec) => lec.lectureId === lecture._id
                        );

                      return (
                        <li
                          key={lecture._id}
                          className={`p-3 rounded-md shadow flex justify-between items-center cursor-pointer transition duration-200 ease-in-out 
                    ${
                      selectedLecture?._id === lecture._id
                        ? "bg-blue-100 border-l-4 border-blue-500"
                        : "bg-white hover:bg-gray-100"
                    }`}
                          onClick={() =>
                            handleLectureClick(lecture, chapter._id)
                          }
                        >
                          <div className="flex items-center space-x-3">
                            <BsPlayCircleFill
                              className={`text-lg ${
                                selectedLecture?._id === lecture._id
                                  ? "text-blue-500"
                                  : "text-gray-400"
                              }`}
                            />
                            <span
                              className={`text-sm ${
                                selectedLecture?._id === lecture._id
                                  ? "text-blue-700 font-medium"
                                  : "text-gray-700"
                              }`}
                            >
                              {lecture.title}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            <button
                              className={`px-3 py-1 text-xs flex items-center gap-0.5 font-medium rounded-full transition 
                        ${
                          lectureProgress?.status === "completed"
                            ? "bg-green-100 text-green-600 hover:bg-green-200"
                            : "bg-red-100 text-red-600 hover:bg-red-200"
                        }`}
                            >
                              {lectureProgress?.status === "completed" ? (
                                <>
                                  {lectureProgress?.status}
                                  <GiBullseye size={15} />
                                </>
                              ) : (
                                <>{lectureProgress?.status}</>
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

          {/* Footer */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-5 flex justify-between items-center rounded-b-lg">
            <div
              className="flex gap-1 justify-center items-center cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              <span className="text-sm ">Post a Review</span>{" "}
              <GiStarsStack size={20} />
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex justify-center items-center z-50">
          <Review
            courseId={courseData?._id as string}
            onClose={handleCloseModal}
          />
        </div>
      )}
    </>
  );
};

export default CoursePlayer;
