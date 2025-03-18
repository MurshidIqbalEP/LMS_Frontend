import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCourse } from "../../api/studentsApi";
import { IChapter, ICourse, Rating } from "../../services/types";
// @ts-ignore
import ReactStars from "react-rating-stars-component";

function Coursedetails() {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);
  const [courseData, setCourseData] = useState<ICourse>();
  const [avgRating, setAvgRating] = useState<number | null>(null);
  const [totalLectures, setTotalLectures] = useState<number | null>(null);
  const [openChapters, setOpenChapters] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let res = await fetchCourse(courseId as string);
        setCourseData(res?.data.courseData);
        console.log(res?.data.courseData.chapters);

        let avgRating = 0;
        if (res?.data.courseData.rating.length) {
          const sum = res.data.courseData.rating.reduce(
            (acc: number, obj: Rating) => acc + obj.rating,
            0
          );
          avgRating = sum / res.data.courseData.rating.length;
          setAvgRating(avgRating);
        }
        const totalLectures = res?.data.courseData.chapters.reduce(
          (acc: number, chapter: IChapter) =>
            acc + (chapter.lectures?.length || 0),
          0
        );

        setTotalLectures(totalLectures);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  const toggleChapter = (id: string) => {
    setOpenChapters((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen w-full">
      <div
        className="h-[60vh] w-full relative flex items-center px-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(209,213,219,0) 0%, rgba(50,160,101,1) 100%)",
        }}
      >
        {/* Left Section - Course Info */}
        <div className="w-full max-w-4xl px-8 py-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
            {courseData?.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            {courseData?.description}
          </p>

          {/* Stats Bar */}
          <div className="flex flex-wrap items-center gap-6 py-2">
            <div className="flex items-center gap-3">
              <img
                src={courseData?.educatorId?.profilePicture}
                alt={courseData?.educatorId?.name}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-100"
              />
              <span className="text-base font-medium text-gray-900">
                {courseData?.educatorId?.name}
              </span>
            </div>
            <div className="text-sm font-medium bg-gray-50 px-4 py-1.5 rounded-full text-gray-700 border border-gray-100">
              {courseData?.category}
            </div>

            {/* Rating */}
            <div className="flex items-center ml-auto">
              <ReactStars
                count={5}
                value={avgRating}
                size={30}
                edit={false}
                isHalf={true}
                activeColor="#facc15"
              />
              <span className="text-gray-500 text-sm ml-1">
                ({courseData?.rating?.length || 0} reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Right Section - Course Thumbnail */}
        <div className="flex flex-col absolute w-[500px] h-[600px] top-[110px] right-24 z-50 rounded-2xl shadow-2xl border-2 border-white">
          <img
            src={courseData?.thumbnail}
            alt="thumbnail"
            className="w-full h-[330px] object-cover rounded-t-2xl"
          />
        </div>
      </div>

      {/* Chapters Section */}
      <div className="flex flex-col  w-[60%] h-[600px]">
        <div className="flex m-2 justify-between p-4  w-full border-b-2">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">Course Content</h1>
            <span className="text-sm font-bold">
              {courseData?.chapters.length} Chapters . {totalLectures} Lectures
            </span>
          </div>

          <p className="self-end">Expand All</p>
        </div>

        {/* Chapters List */}
<div className="max-w-4xl border border-gray-200 rounded-lg overflow-hidden mb-8">
  {/* Chapter heading with toggle and lecture count */}
  <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
    <div className="flex items-center space-x-2">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="text-gray-700"
      >
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
      <span className="font-medium text-lg text-gray-800">Chapters</span>
    </div>
    <span className="text-sm text-gray-600">{totalLectures} lectures</span>
  </div>

  {/* First chapter content with bullet points */}
  <div className="bg-white px-6 py-3 border-b border-gray-200">
    <ul className="list-disc pl-6 text-gray-700 space-y-2">
      {courseData?.chapters.slice(0, 3).map((chapter, index) => (
        <li key={index}><span className="text-gray-700">{chapter.title}</span></li>
      ))}
    </ul>
  </div>

  {/* Individual chapter rows */}
  <div>
    {courseData?.chapters.map((chapter, index) => (
      <div 
        key={chapter._id} 
        className={`flex items-center justify-between p-4 ${
          index < (courseData?.chapters.length || 0) - 1 ? 'border-b border-gray-100' : ''
        }`}
      >
        <div 
          className="flex items-center cursor-pointer" 
          onClick={() => toggleChapter(chapter._id)}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={`text-gray-700 mr-3 transform transition-transform duration-200 ${
              openChapters[chapter._id] ? 'rotate-180' : ''
            }`}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
        <span className="text-sm text-gray-600">
          {chapter.lectures?.length || 0} {chapter.lectures?.length === 1 ? 'lecture' : 'lectures'}
        </span>
      </div>
    ))}
  </div>
</div>

      </div>
    </div>
  );
}

export default Coursedetails;
