import TextField from "@mui/material/TextField";
import { LuGrip } from "react-icons/lu";
import { CiCirclePlus } from "react-icons/ci";
import { IoIosArrowDropdown, IoIosArrowDropup, IoMdQrScanner } from "react-icons/io";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoTrash } from "react-icons/io5";
import { ChangeEvent, useState } from "react";
import PdfPreview from "../../componets/educators/PdfPreview";
import axios from "axios";
import { postCourse } from "../../api/educatorApi";
const cloudinaryURL = import.meta.env.VITE_CLOUDINARY_URL;
const preset = import.meta.env.VITE_PRESET_NAME;
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toast } from "sonner";
import Lottie from "lottie-react";
import animationData from "../../assets/loading.json";
import { useNavigate } from "react-router-dom";

interface BasicData {
  title: string;
  description: string;
  category: string;
  price: number;
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

function AddCourse() {

  const navigate = useNavigate();
  const educatorInfo = useSelector((state: RootState) => state.educatorSlice.educatorInfo);
  const [basicData, setBasicData] = useState<BasicData>({
    title: "",
    description: "",
    category: "",
    price: 0,
  });

  const [errMsg, setErrMsg] = useState<ErrMsg>({});
  const [chapters, setChapters] = useState([{
      id: "1",
      name: "",
      isExpanded: true,
      lectures: [{ id: "1", name: "", url: "" }],
     },
   ]);

  const [selectedThumbnailFile, setSelectedThumbnailFile] = useState<File | null>(null);
  const [previewThumbnailUrl, setPreviewThumbnailUrl] = useState<string>();
  const [selectedResourceFile, setSelectedResourcelFile] = useState<File | null>(null);
  const [previewResourceUrl, setPreviewResourceUrl] = useState<string>();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const addChapter = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const lastChapterId = chapters.length > 0 ? parseInt(chapters[chapters.length - 1].id) : 0;
    const newChapter = {
      id: (lastChapterId + 1).toString(),
      name: "",
      isExpanded: true,
      lectures: [{ id: "0", name: "", url: "" }],
    };
    setChapters([...chapters, newChapter]);
  };

  const toggleChapter = (chapterId: string,event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setChapters(
      chapters.map((chapter) =>
        chapter.id === chapterId
          ? { ...chapter, isExpanded: !chapter.isExpanded }
          : chapter
      )
    );
  };

  const removeChapter = (chapterId: string,event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (chapters.length > 1) {
      const filteredChapters = chapters.filter((chapter) => chapter.id !== chapterId);
      const reorderedChapters = filteredChapters.map((chapter, index) => {
      const newChapterId = (index + 1).toString();
        return {
          ...chapter,
          id: newChapterId,
        };
      });
      setChapters(reorderedChapters);
    }
  };

  const handleBasicDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setBasicData({ ...basicData, [id]: value });
    setErrMsg((prev) => ({ ...prev, [id]: "" }));
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
      prevChapters.map((chapter) =>
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


  const addLecture = (chapterId: string,event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setChapters(
      chapters.map((chapter) =>
        chapter.id === chapterId
          ? {
              ...chapter,
              lectures: [
                ...chapter.lectures,
                {
                  id: (chapter.lectures.length + 1).toString(),
                  name: "",
                  url: "",
                },
              ],
            }
          : chapter
      )
    );
  };

  const removeLecture = (chapterId: string,lectureId: string,event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setChapters((prevChapters) =>
      prevChapters.map((chapter) =>
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

  const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedThumbnailFile(file);
      setPreviewThumbnailUrl(URL.createObjectURL(file));
      setErrMsg((prev) => ({ ...prev, thumbnail: "" }));
    }
  };

  const handleResourceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedResourcelFile(file);

      if (file.type.startsWith("image/")) {
        setPreviewResourceUrl(URL.createObjectURL(file));
      } else if (file.type === "application/pdf") {
        setPreviewResourceUrl(URL.createObjectURL(file));
      } else {
        setPreviewThumbnailUrl("");
      }
      setErrMsg((prev) => ({ ...prev, resource: "" }));
    }
  };

  const handleFullScreen = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const validateForm = () => {
    const newErr: FormErrors = {};
    if (!basicData.title.trim()) newErr.title = "Title is required.";
    if (!basicData.description.trim())
      newErr.description = "Description is required.";
    if (!basicData.category.trim()) newErr.category = "Category is required.";
    if (!basicData.price || basicData.price <= 0)
      newErr.price = "Price must be greater than 0.";
    if (!selectedThumbnailFile)
      newErr.thumbnail = "Course thumbnail image is required.";
    if (!selectedResourceFile) newErr.resource = "Resource file is required.";
    if (chapters.length === 0)
      newErr.chapter = "At least one chapter is required.";

    chapters.forEach((chapter, chapterIndex) => {
      if (!chapter.name.trim()) newErr[`chapter-${chapterIndex}` as keyof FormErrors] = `Chapter name is required.`;

      chapter.lectures.forEach((lecture, lectureIndex) => {
        if (!lecture.name.trim())newErr[`lecture-${chapterIndex}-${lectureIndex}-name` as keyof FormErrors] = `Lecture name is required`;
        if (!lecture.url.trim())newErr[`lecture-${chapterIndex}-${lectureIndex}-url` as keyof FormErrors] = `Lecture URL is required `;
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

  const handleSubmit = async () => {
    try {
      if (!validateForm()) return;
      setLoading(true);
      const formDataArray = [];

      if (selectedThumbnailFile) {
        const thumbnailFormData = new FormData();
        thumbnailFormData.append("file", selectedThumbnailFile);
        thumbnailFormData.append("upload_preset", preset);
        formDataArray.push(uploadToCloudinary(thumbnailFormData));
      }

      if (selectedResourceFile) {
        const resourceFormData = new FormData();
        resourceFormData.append("file", selectedResourceFile);
        resourceFormData.append("upload_preset", preset);
        resourceFormData.append("resource_type", "raw");
        formDataArray.push(uploadToCloudinary(resourceFormData));
      }

      const [thumbnailUrl, resourceUrl] = await Promise.all(formDataArray);
      if (!thumbnailUrl || !resourceUrl) {
        setLoading(false);
        return setErrMsg((prev) => ({
          ...prev,
          thumbnail: thumbnailUrl ? "" : "Thumbnail upload failed",
          resource: resourceUrl ? "" : "Resource upload failed",
        }));
      }

      const payload = {
        ...basicData,
        thumbnailUrl,
        resourceUrl,
        chapters,
        educatorId: educatorInfo._id,
      };

      const res = await postCourse(payload);
      if (res?.data) {
        toast(res.data.message);
        navigate("/educator/mycourses");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <div className="flex justify-center items-center w-full h-full min-h-screen">
      <Lottie
        animationData={animationData}
        loop={true}
        className="w-3/4 h-3/4 md:w-1/2 md:h-1/2 lg:w-1/3 lg:h-1/3"
      />
    </div>
   ) : (
    <div className="min-h-screen flex flex-col md:flex-row gap-6 p-10 bg-gray-100">
      {/* Left Section */}
      <div className="w-full space-y-4  bg-white p-8 rounded-lg shadow-md">
        <form className="space-y-6">
          <div className="flex flex-col gap-3">
            <TextField
              label="Title"
              id="title"
              variant="outlined"
              onChange={handleBasicDataChange}
              size="small"
              error={!!errMsg.title}
              helperText={errMsg.title}
              fullWidth
            />
            <TextField
              label="Description"
              id="description"
              variant="outlined"
              size="small"
              onChange={handleBasicDataChange}
              error={!!errMsg.description}
              helperText={errMsg.description}
              fullWidth
            />
            <div className="flex gap-4">
              <TextField
                label="Category"
                id="category"
                size="small"
                variant="outlined"
                onChange={handleBasicDataChange}
                error={!!errMsg.category}
                helperText={errMsg.category}
                fullWidth
              />
              <TextField
                label="Price"
                id="price"
                size="small"
                type="number"
                variant="outlined"
                onChange={handleBasicDataChange}
                error={!!errMsg.price}
                helperText={errMsg.price}
                fullWidth
              />
            </div>
          </div>

          {chapters.map((chapter, chapterIndex) => (
            <div
              key={chapter.id}
              className="p-4 border  rounded-md bg-gray-100"
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
                <div className="mt-4 space-y-3">
                  {chapter.lectures.map((lecture, lectureIndex) => (
                    <div
                      key={lecture.id}
                      className="flex gap-3 ml-[100px] justify-end items-center"
                    >
                      <TextField
                        label="Lecture Name"
                        id="name"
                        value={lecture.name}
                        size="small"
                        variant="outlined"
                        error={
                          !!errMsg[
                            `lecture-${chapterIndex}-${lectureIndex}-name`
                          ]
                        }
                        helperText={
                          errMsg[`lecture-${chapterIndex}-${lectureIndex}-name`]
                        }
                        fullWidth
                        onChange={(event) =>
                          handleLectureInputChange(
                            event,
                            chapter.id,
                            lecture.id,
                            chapterIndex,
                            lectureIndex
                          )
                        }
                      />

                      <TextField
                        label="Lecture Url"
                        id="url"
                        value={lecture.url}
                        size="small"
                        variant="outlined"
                        error={
                          !!errMsg[
                            `lecture-${chapterIndex}-${lectureIndex}-url`
                          ]
                        }
                        helperText={
                          errMsg[`lecture-${chapterIndex}-${lectureIndex}-url`]
                        }
                        fullWidth
                        onChange={(event) =>
                          handleLectureInputChange(
                            event,
                            chapter.id,
                            lecture.id,
                            chapterIndex,
                            lectureIndex
                          )
                        }
                      />

                      <button
                        onClick={(e) =>
                          removeLecture(chapter.id, lecture.id, e)
                        }
                        disabled={chapter.lectures.length === 1}
                      >
                        <IoTrash size={20} />
                      </button>
                    </div>
                  ))}

                  
                  <div className="flex mt-4 w-full justify-end items-center h-[40px]">
                    <button
                      onClick={(e) => addLecture(chapter.id, e)}
                      className="w-[9%] flex items-center justify-center gap-1 rounded-2xl bg-slate-400 hover:bg-slate-500 py-2"
                    >
                      <CiCirclePlus className="text-black" size={25} />
                      <span>add</span>
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
        {selectedThumbnailFile ? (
          <img
            className="w-full h-52 object-cover rounded-lg border"
            src={previewThumbnailUrl}
            alt="image preview"
          />
        ) : (
          <img
            className="w-full h-52 object-cover rounded-lg border"
            src="/image-placeholder.svg"
            alt="image preview"
          />
        )}

        {errMsg.thumbnail && (
          <p className="text-[#d32f2f] text-xs mt-1">{errMsg.thumbnail}</p>
        )}

        <label className="mt-4 flex flex-col items-center w-full py-2 bg-yellow-500 text-white rounded-lg cursor-pointer hover:bg-yellow-600 transition">
          Select a Thumbnail
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleThumbnailChange}
          />
        </label>

        {selectedResourceFile ? (
          selectedResourceFile.type.startsWith("image/") ? (
            <img
              className="w-full mt-4 h-52 object-cover rounded-lg border"
              src={previewResourceUrl!}
              alt="Preview"
            />
          ) : selectedResourceFile.type === "application/pdf" ? (
            <div className="w-full h-52 mb-4  relative">
              <iframe
                className="w-full mt-4 h-52 rounded-lg border"
                src={previewResourceUrl!}
                allowFullScreen
                title="PDF Preview"
              ></iframe>


              <button
                className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center absolute opacity-50 top-6 left-3 z-50"
                onClick={handleFullScreen}
              >
                <IoMdQrScanner size={20}  className="text-white"/>
              </button>
            </div>
          ) : (
            <p className="text-gray-500">Selected file:</p>
          )
        ) : (
          <img
            className="w-full mt-4 h-52 object-cover rounded-lg border"
            src="/image-placeholder.svg"
            alt="image preview"
          />
        )}

        {errMsg.resource && (
          <p className="text-[#d32f2f] text-xs mt-1 ">{errMsg.resource}</p>
        )}

        <label className="mt-4 flex flex-col items-center w-full py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition">
          Select Note
          <input
            type="file"
            className="hidden"
            onChange={handleResourceChange}
          />
        </label>

        <button
          className=" mt-4 flex flex-col items-center w-full py-2 bg-green-500 text-white rounded-lg cursor-pointer hover:bg-green-600 transition"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>

      {/* Modal for fullscreen preview */}
      {isOpenModal &&
        previewResourceUrl &&
        selectedResourceFile &&
        selectedResourceFile.type === "application/pdf" && (
          <PdfPreview
            previewResourceUrl={previewResourceUrl}
            closeModal={closeModal}
          />
        )}
    </div>
  );
}

export default AddCourse;
