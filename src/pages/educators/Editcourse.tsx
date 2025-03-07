import { useNavigate, useParams } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { fetchCourseByCourseId, updateCourse } from "../../api/educatorApi";
import {
  IoIosArrowDropdown,
  IoIosArrowDropup,
  IoIosCloseCircleOutline,
  IoMdQrScanner,
} from "react-icons/io";
import { LuGrip } from "react-icons/lu";
import { IoTrash } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toast } from "sonner";
const cloudinaryURL = import.meta.env.VITE_CLOUDINARY_URL;
const preset = import.meta.env.VITE_PRESET_NAME;
import Lottie from "lottie-react";
import animationData from "../../assets/loading.json";

interface BasicData {
  id?: string;
  title?: string;
  description?: string;
  category?: string;
  price?: number;
}

interface Lecture {
  id: string;
  name: string;
  url: string;
  _id: string;
}

interface CoursePayload {
  id?: string; // ✅ Make it optional
  title: string;
  description?: string;
  category?: string;
  price?: number;
  chapters?: Chapter[];
  educatorId: any;
  thumbnailUrl?: string;
  resourceUrl?: string;
}

interface Chapter {
  id: string;
  _id: string;
  name: string;
  isExpanded: boolean;
  lectures: Lecture[];
}

interface FormErrors {
  title?: string;
  description?: string;
  price?: string;
  category?: string;
  thumbnail?: string;
  resource?: string;
  chapter?: string;
}

interface ErrMsg {
  title?: string;
  description?: string;
  price?: string;
  category?: string;
  thumbnail?: string;
  resource?: string;
  chapter?: string;
  [key: string]: string | undefined;
}

function Editcourse() {
  const { courseId } = useParams();
  const educatorInfo = useSelector(
    (state: RootState) => state.educator.educatorInfo
  );
  const navigate = useNavigate()
  const [basicData, setBasicData] = useState<BasicData>();
  const [chapters, setChapters] = useState<Chapter[]>();
  const [img, setImg] = useState();
  const [loading, setLoading] = useState(false);
  const [resourse, setResourse] = useState();
  const [errMsg, setErrMsg] = useState<ErrMsg>({});
  const [selectedThumbnailFile, setSelectedThumbnailFile] =
    useState<File | null>(null);
  const [previewThumbnailUrl, setPreviewThumbnailUrl] = useState<string>();
  const [selectedResourceFile, setSelectedResourcelFile] =
    useState<File | null>(null);
  const [previewResourceUrl, setPreviewResourceUrl] = useState<string>();
  const [isChanged, setIsChanged] = useState({
    thumbnail: false,
    resourse: false,
  });

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        let res = await fetchCourseByCourseId(courseId as string);
        const course = res?.data.course;
        console.log(course);

        if (course) {
          setBasicData({
            id: course._id,
            title: course.title,
            description: course.description,
            category: course.category,
            price: course.price,
          });

          setChapters(
            course.chapters.map((chapter: any) => ({
              id: chapter.position,
              _id: chapter._id,
              name: chapter.title,
              isExpanded: false,
              lectures: chapter.lectures.map((lecture: any) => ({
                id: lecture.position,
                _id: lecture._id,
                name: lecture.title,
                url: lecture.videoUrl,
              })),
            }))
          );

          setImg(course.thumbnail);
          setResourse(course.resources);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourseData();
  }, [courseId]);

  const handleBasicDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setBasicData({ ...basicData, [id]: value });
    setErrMsg((prev) => ({ ...prev, [id]: "" }));
  };

  const toggleChapter = (
    chapterId: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setChapters(
      chapters?.map((chapter) =>
        chapter.id === chapterId
          ? { ...chapter, isExpanded: !chapter.isExpanded }
          : chapter
      )
    );
  };

  const removeChapter = (
    chapterId: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (chapters.length > 1) {
      const filteredChapters = chapters?.filter(
        (chapter) => chapter.id !== chapterId
      );
      const reorderedChapters = filteredChapters?.map((chapter, index) => {
        const newChapterId = (index + 1).toString();
        return {
          ...chapter,
          id: newChapterId,
        };
      });
      setChapters(reorderedChapters);
    }
  };

  const handleThumbnailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedThumbnailFile(file);
      setPreviewThumbnailUrl(URL.createObjectURL(file));
      setIsChanged((prev) => ({ ...prev, thumbnail: true }));
      // setErrMsg((prev) => ({ ...prev, thumbnail: "" }));
    }
  };

  const handleResourceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedResourcelFile(file);
      setIsChanged((prev) => ({ ...prev, resourse: true }));
      if (file.type.startsWith("image/")) {
        setPreviewResourceUrl(URL.createObjectURL(file));
      } else if (file.type === "application/pdf") {
        setPreviewResourceUrl(URL.createObjectURL(file));
      } else {
        setPreviewThumbnailUrl("");
      }
      // setErrMsg((prev) => ({ ...prev, resource: "" }));
    }
  };

  const handleLectureInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    chapterId: string,
    lectureId: string,
    chapterIndex: number,
    lectureIndex: number
  ) => {
    const { id, value } = event.target;
    setChapters((prevChapters) =>
      prevChapters?.map((chapter) =>
        chapter.id === chapterId
          ? {
              ...chapter,
              lectures: chapter.lectures.map((lecture) =>
                lecture.id === lectureId ? { ...lecture, [id]: value } : lecture
              ),
            }
          : chapter
      )
    );
    setErrMsg((prev) => ({
      ...prev,
      [`lecture-${chapterIndex}-${lectureIndex}-${id}`]: "",
    }));
  };

  const addLecture = (
    chapterId: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setChapters(
      chapters?.map((chapter) =>
        chapter.id === chapterId
          ? {
              ...chapter,
              lectures: [
                ...chapter.lectures,
                {
                  id: (chapter.lectures.length + 1).toString(),
                  _id: "",
                  name: "",
                  url: "",
                },
              ],
            }
          : chapter
      )
    );
  };

  const addChapter = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const lastChapterId =
      chapters.length > 0 ? parseInt(chapters[chapters.length - 1].id) : 0;
    const newChapter = {
      id: (lastChapterId + 1).toString(),
      name: "",
      isExpanded: true,
      _id: "",
      lectures: [{ id: "0", _id: "", name: "", url: "" }],
    };
    setChapters([...chapters, newChapter]);
  };

  const removeLecture = (
    chapterId: string,
    lectureId: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setChapters((prevChapters) =>
      prevChapters?.map((chapter) =>
        chapter.id === chapterId
          ? {
              ...chapter,
              lectures: chapter.lectures
                .filter((lecture) => lecture.id !== lectureId)
                .map((lecture, index) => ({
                  ...lecture,
                  id: (index + 1).toString(), // Reassigning IDs in order
                })),
            }
          : chapter
      )
    );
  };

  const handleFullScreen = () => {
    window.open(resourse, "_blank");
  };

  const validateForm = () => {
    const newErr: FormErrors = {};

    if (!basicData?.title?.trim()) newErr.title = "Title is required.";
    if (!basicData?.description?.trim())
      newErr.description = "Description is required.";
    if (!basicData?.category?.trim()) newErr.category = "Category is required.";
    if (basicData?.price === undefined || basicData.price <= 0)
      newErr.price = "Price must be greater than 0.";
    // if (!selectedThumbnailFile) newErr.thumbnail = "Course thumbnail image is required.";
    // if (!selectedResourceFile) newErr.resource = "Resource file is required.";
    if (chapters?.length === 0)
      newErr.chapter = "At least one chapter is required.";

    chapters?.forEach((chapter, chapterIndex) => {
      if (!chapter.name.trim())
        newErr[
          `chapter-${chapterIndex}` as keyof FormErrors
        ] = `Chapter name is required.`;

      chapter.lectures.forEach((lecture, lectureIndex) => {
        if (!lecture.name.trim())
          newErr[
            `lecture-${chapterIndex}-${lectureIndex}-name` as keyof FormErrors
          ] = `Lecture name is required`;
        if (!lecture.url.trim())
          newErr[
            `lecture-${chapterIndex}-${lectureIndex}-url` as keyof FormErrors
          ] = `Lecture URL is required`;
      });
    });

    setErrMsg(newErr as ErrMsg);
    return Object.keys(newErr).length === 0;
  };

  const uploadToCloudinary = async (
    formData: unknown
  ): Promise<string | null> => {
    try {
      setLoading(true);
      const { data } = await axios.post(cloudinaryURL, formData);
      setLoading(false);
      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(chapters);

    try {
      if (!validateForm()) return;
      setLoading(true);
      const formDataArray = [];

      let updatedThumbnailUrl: string | null = null;
      let updatedResourceUrl: string | null = null;

      if (isChanged.thumbnail && selectedThumbnailFile) {
        const thumbnailFormData = new FormData();
        thumbnailFormData.append("file", selectedThumbnailFile);
        thumbnailFormData.append("upload_preset", preset);
        formDataArray.push(uploadToCloudinary(thumbnailFormData));
      } else {
        formDataArray.push(Promise.resolve(null)); // No change
      }

      if (isChanged.resourse && selectedResourceFile) {
        const resourceFormData = new FormData();
        resourceFormData.append("file", selectedResourceFile);
        resourceFormData.append("upload_preset", preset);
        resourceFormData.append("resource_type", "raw");
        formDataArray.push(uploadToCloudinary(resourceFormData));
      } else {
        formDataArray.push(Promise.resolve(null)); // No change
      }

      const [thumbnailUrl, resourceUrl] = await Promise.all(formDataArray);

      if (thumbnailUrl) updatedThumbnailUrl = thumbnailUrl;
      if (resourceUrl) updatedResourceUrl = resourceUrl;

      const payload: CoursePayload = {
        ...basicData,
        chapters,
        educatorId: educatorInfo._id,
      };

      if (updatedThumbnailUrl) payload.thumbnailUrl = updatedThumbnailUrl;
      if (updatedResourceUrl) payload.resourceUrl = updatedResourceUrl;
      console.log(payload);

      const res = await updateCourse(payload);
      if (res?.data) {
        toast(res.data.message);
       
        navigate("/educator/mycourses");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally{
      setLoading(false);
    }
  };

  return loading ?(
    <div className="flex justify-center items-center w-full h-full min-h-screen">
    <Lottie
      animationData={animationData}
      loop={true}
      className="w-3/4 h-3/4 md:w-1/2 md:h-1/2 lg:w-1/3 lg:h-1/3"
    />
  </div>
  ) :(
    <div className="min-h-screen flex flex-col md:flex-row gap-6 p-10 bg-gray-100">
      {/* Left Section */}
     <div className="w-full space-y-4  bg-white p-8 rounded-lg shadow-md">
        <form className="space-y-6">
          <div className="flex flex-col gap-3">
            <div className="mb-4">
              <label className="block font-medium">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={basicData?.title}
                onChange={handleBasicDataChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
              {errMsg.title && (
                <p className="text-[#d32f2f] text-xs mt-1 pl-[15px]">
                  {errMsg.title}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block font-medium">Description:</label>
              <input
                name="description"
                id="description"
                value={basicData?.description}
                onChange={handleBasicDataChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
              {errMsg.description && (
                <p className="text-[#d32f2f] text-xs mt-1 pl-[15px]">
                  {errMsg.description}
                </p>
              )}
            </div>
            <div className="mb-4 w-full flex gap-2">
              <div className=" w-[50%]">
                <label className="block font-medium">Category:</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={basicData?.category}
                  onChange={handleBasicDataChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
                {errMsg.category && (
                  <p className="text-[#d32f2f] text-xs mt-1 pl-[15px]">
                    {errMsg.category}
                  </p>
                )}
              </div>
              <div className=" w-[50%]">
                <label className="block font-medium">Price:</label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={basicData?.price}
                  onChange={handleBasicDataChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
                {errMsg.price && (
                  <p className="text-[#d32f2f] text-xs mt-1 pl-[15px]">
                    {errMsg.price}
                  </p>
                )}
              </div>
            </div>
          </div>

          {chapters?.map((chapter, chapterIndex) => (
            <div
              key={chapter.id}
              className="p-4 border mt-1 rounded-md bg-gray-100"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 w-full">
                  <LuGrip className="text-black" size={20} />
                  <div className="flex flex-col w-full">
                    <input
                      type="text"
                      placeholder="Chapter Name"
                      value={chapter.name}
                      onChange={(e) => {
                        setChapters(
                          chapters.map((c) =>
                            c.id === chapter.id
                              ? { ...c, name: e.target.value }
                              : c
                          )
                        );
                        setErrMsg((prev) => ({
                          ...prev,
                          [`chapter-${chapterIndex}`]: "",
                        }));
                      }}
                      className="w-full  border-b text-md border-gray-300 focus:outline-none focus:border-blue-500 px-2 py-1"
                    />
                    {errMsg[`chapter-${chapterIndex}`] && (
                      <p className="text-[#d32f2f] text-xs mt-1 pl-[15px] ">
                        {errMsg[`chapter-${chapterIndex}`]}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={(e) => toggleChapter(chapter.id, e)}>
                    {chapter.isExpanded ? (
                      <IoIosArrowDropup size={25} />
                    ) : (
                      <IoIosArrowDropdown size={25} />
                    )}
                  </button>
                  <button
                    onClick={(e) => removeChapter(chapter.id, e)}
                    disabled={chapters.length === 1}
                  >
                    <IoIosCloseCircleOutline size={25} />
                  </button>
                </div>
              </div>
              {chapter.isExpanded && (
                <div className="mt-4 space-y-4">
                  {chapter.lectures.map((lecture, lectureIndex) => (
                    <div
                      key={lecture.id}
                      className="grid grid-cols-[1fr_auto_auto] gap-4 items-center ml-[80px] border p-3 rounded-lg bg-gray-50"
                    >
                      {/* Lecture Name Input */}
                      <div className="flex flex-col">
                        <input
                          type="text"
                          id="name"
                          placeholder="Lecture Name"
                          value={lecture.name}
                          onChange={(event) =>
                            handleLectureInputChange(
                              event,
                              chapter.id,
                              lecture.id,
                              chapterIndex,
                              lectureIndex
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                        />
                        {errMsg[
                          `lecture-${chapterIndex}-${lectureIndex}-name`
                        ] && (
                          <p className="text-[#d32f2f] text-xs mt-1 pl-[15px] ">
                            {
                              errMsg[
                                `lecture-${chapterIndex}-${lectureIndex}-name`
                              ]
                            }
                          </p>
                        )}
                      </div>

                      {/* Lecture URL Input */}
                      <div className="flex flex-col">
                        <input
                          type="text"
                          id="url"
                          placeholder="Lecture URL"
                          value={lecture.url}
                          onChange={(event) =>
                            handleLectureInputChange(
                              event,
                              chapter.id,
                              lecture.id,
                              chapterIndex,
                              lectureIndex
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                        />
                        {errMsg[
                          `lecture-${chapterIndex}-${lectureIndex}-url`
                        ] && (
                          <p className="text-[#d32f2f] text-xs mt-1 pl-[15px] ">
                            {
                              errMsg[
                                `lecture-${chapterIndex}-${lectureIndex}-url`
                              ]
                            }
                          </p>
                        )}
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={(e) =>
                          removeLecture(chapter.id, lecture.id, e)
                        }
                        disabled={chapter.lectures.length === 1}
                        className="p-2 rounded-md text-red-500 hover:bg-red-100 disabled:opacity-50"
                      >
                        <IoTrash size={20} />
                      </button>
                    </div>
                  ))}

                  {/* Add Lecture Button */}
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={(e) => addLecture(chapter.id, e)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-500 text-white font-medium transition-all"
                    >
                      <CiCirclePlus size={22} />
                      <span>Add Lecture</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          <button
            onClick={addChapter}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-md transition"
          >
            <CiCirclePlus className="text-black" size={25} /> Add Chapter
          </button>
        </form>
     </div>

     {/* Right Section */}
     <div className="w-full  md:w-1/3 flex flex-col items-center bg-white p-8 rounded-lg shadow-md">
        <div className="flex flex-col w-full gap-4 mt-2">
            {/* Thumbnail Section */}
            <div className=" flex flex-col items-center gap-0">
              {previewThumbnailUrl ? (
                <img
                  src={previewThumbnailUrl}
                  alt="thumbnail"
                  className="w-full h-52 rounded-lg border"
                />
              ) : (
                <img
                  src={img}
                  alt="thumbnail"
                  className="w-full h-52 rounded-lg border"
                />
              )}
              <label className="mt-4 flex flex-col items-center w-full py-2 bg-yellow-500 text-white rounded-lg cursor-pointer hover:bg-yellow-600 transition">
                Change Thumbnail
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                />
              </label>
            </div>

            {/* PDF Section */}
            <div className=" flex flex-col gap-3 items-center">
              <div className="w-full h-52  relative border rounded-lg overflow-hidden">
                {previewResourceUrl ? (
                  <iframe
                    className="w-full h-52"
                    src={previewResourceUrl}
                    allowFullScreen
                    title="PDF Preview"
                  ></iframe>
                ) : (
                  <iframe
                    className="w-full h-52"
                    src={resourse}
                    allowFullScreen
                    title="PDF Preview"
                  ></iframe>
                )}

                <button
                  className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center absolute opacity-50 top-3 left-3 z-50"
                  onClick={handleFullScreen}
                >
                  <IoMdQrScanner size={20} className="text-white" />
                </button>
              </div>

              <label className="mt-4 flex flex-col items-center w-full py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition">
                Change Note
                <input
                  type="file"
                  className="hidden"
                  onChange={handleResourceChange}
                />
              </label>

              <button
              type="submit"
              className="bg-green-500 w-full  hover:bg-green-600 !text-white px-4 py-2 rounded-md"
              onClick={handleSubmit}
            >
              Save Changes
            </button>
            
            </div>
          </div>
       </div>
    </div>
  );
}

export default Editcourse;
