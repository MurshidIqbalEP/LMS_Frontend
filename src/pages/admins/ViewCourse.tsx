import { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import { ICourse, ILecture } from "../../services/types";
import VideoPlayer from "../../componets/students/VideoPlayer";
import {
  BsChevronDown,
  BsChevronRight,
  BsPlayCircleFill,
} from "react-icons/bs";
import { fetchCourseData } from "@/api/adminApi";
import { GiNotebook } from "react-icons/gi";

const ViewCourse = () => {
  const { id } = useParams();
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState<ICourse>();
  const [selectedLecture, setSelectedLecture] = useState<ILecture | null>(null);
  const [openChapters, setOpenChapters] = useState<Record<string, boolean>>({});

  const toggleChapter = (chapterId: string) => {
    setOpenChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Course Data
        const res = await fetchCourseData(id as string);

        setCourseData(res?.data.courseData);

        setSelectedLecture(res?.data.courseData.chapters[0].lectures[0]);
        setOpenChapters({ [res?.data.courseData.chapters[0]._id]: true });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [courseId]);

  const handleLectureClick = async (lecture: ILecture) => {
    setSelectedLecture(lecture);
  };

  const handleLectureEnd = async () => {
    try {
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
        handleLectureClick(nextLecture);
      } else {
        // Move to first lecture of next chapter
        const nextChapter = courseData?.chapters[currentChapterIndex + 1];

        if (nextChapter && nextChapter.lectures.length > 0) {
          const firstLectureOfNextChapter = nextChapter.lectures[0];
          toggleChapter(currentChapter!._id);
          toggleChapter(nextChapter._id);
          handleLectureClick(firstLectureOfNextChapter);
        }
      }
    } catch (error) {
      console.log("Error updating progress", error);
    }
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
          </div>
        </div>

        {/* Right Side: Chapters & Progress */}
        <div className="flex-1  shadow-2xl rounded-lg overflow-hidden flex flex-col">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-5 flex justify-between items-center rounded-t-lg">
            <div>
              <h2 className="font-bold text-lg">{courseData?.title}</h2>
              <p className="text-xs text-blue-100">{courseData?.description}</p>
            </div>
          </div>

          <ul className="p-4 space-y-4 flex-1 overflow-y-auto">
            {courseData?.chapters.map((chapter) => (
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
                    {chapter.lectures.map((lecture) => (
                      <li
                        key={lecture._id}
                        className={`p-3 rounded-md shadow flex justify-between items-center cursor-pointer transition duration-200 ease-in-out 
          ${
            selectedLecture?._id === lecture._id
              ? "bg-blue-100 border-l-4 border-blue-500"
              : "bg-white hover:bg-gray-100"
          }`}
                        onClick={() => handleLectureClick(lecture)}
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
                        {/* Removed progress button and status */}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-5 flex justify-between items-center rounded-b-lg"> </div>
        </div>
      </div>
    </>
  );
};

export default ViewCourse;
