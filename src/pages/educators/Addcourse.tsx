import TextField from "@mui/material/TextField";
import { LuGrip } from "react-icons/lu";
import { CiCirclePlus, CiSquarePlus } from "react-icons/ci";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoTrash } from "react-icons/io5";
import { useRef, useState } from "react";

function AddCourse() {
  const [chapters, setChapters] = useState([
    {
      id: "1",
      name: "",
      isExpanded: true,
      lectures: [{ id: "1", name: "", url: "" }],
    },
  ]);

  const [selectedThumbnailFile, setSelectedThumbnailFile] =
    useState<File | null>(null);
  const [previewThumbnailUrl, setPreviewThumbnailUrl] = useState<string>();
  const [selectedResourceFile, setSelectedResourcelFile] =
    useState<File | null>(null);
  const [previewResourceUrl, setPreviewResourceUrl] = useState<string>();

  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const addChapter = (event: Event) => {
    event.preventDefault();
    const newChapter = {
      id: `${Date.now()}`,
      name: "",
      isExpanded: true,
      lectures: [{ id: `${Date.now()}-1`, name: "", url: "" }],
    };
    setChapters([...chapters, newChapter]);
  };

  const toggleChapter = (chapterId: string, event: Event) => {
    event.preventDefault();
    setChapters(
      chapters.map((chapter) =>
        chapter.id === chapterId
          ? { ...chapter, isExpanded: !chapter.isExpanded }
          : chapter
      )
    );
  };

  const removeChapter = (chapterId: string, event: Event) => {
    event.preventDefault();
    if (chapters.length > 1) {
      setChapters(chapters.filter((chapter) => chapter.id !== chapterId));
    }
  };

  const addLecture = (chapterId: string, event: Event) => {
    event.preventDefault();
    setChapters(
      chapters.map((chapter) =>
        chapter.id === chapterId
          ? {
              ...chapter,
              lectures: [
                ...chapter.lectures,
                { id: `${Date.now()}`, name: "", url: "" },
              ],
            }
          : chapter
      )
    );
  };

  const removeLecture = (chapterId: string, lectureId: string) => {
    setChapters((prevChapters) =>
      prevChapters.map((chapter) =>
        chapter.id === chapterId
          ? {
              ...chapter,
              lectures: chapter.lectures.filter(
                (lecture) => lecture.id !== lectureId
              ),
            }
          : chapter
      )
    );
  };

  const handleThumbnailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedThumbnailFile(file);
      setPreviewThumbnailUrl(URL.createObjectURL(file));
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
    }
  };

  const handleFullScreen = () => {
    if (iframeRef.current) {
      if (iframeRef.current.requestFullscreen) {
        iframeRef.current.requestFullscreen();
      } else if ((iframeRef.current as any).webkitRequestFullscreen) {
        (iframeRef.current as any).webkitRequestFullscreen();
      } else if ((iframeRef.current as any).mozRequestFullScreen) {
        (iframeRef.current as any).mozRequestFullScreen();
      } else if ((iframeRef.current as any).msRequestFullscreen) {
        (iframeRef.current as any).msRequestFullscreen();
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row gap-6 p-10 bg-gray-100">
      {/* Left Section */}
      <div className="w-full space-y-4  bg-white p-8 rounded-lg shadow-md">
        <form className="space-y-6">
          <div className="flex flex-col gap-3">
            <TextField
              label="Title"
              variant="outlined"
              size="small"
              fullWidth
            />
            <TextField
              label="Description"
              variant="outlined"
              size="small"
              fullWidth
            />
            <div className="flex gap-4">
              <TextField
                label="Category"
                size="small"
                variant="outlined"
                fullWidth
              />
              <TextField
                label="Price"
                size="small"
                type="number"
                variant="outlined"
                fullWidth
              />
            </div>
          </div>

          {chapters.map((chapter) => (
            <div
              key={chapter.id}
              className="p-4 border  rounded-md bg-gray-100"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 w-full">
                  <LuGrip className="text-black" size={20} />
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
                    }}
                    className="w-full  border-b text-md border-gray-300 focus:outline-none focus:border-blue-500 px-2 py-1"
                  />
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
                  {chapter.lectures.map((lecture) => (
                    <div
                      key={lecture.id}
                      className="flex gap-3 ml-[100px] justify-end items-center"
                    >
                      <TextField
                        label="Lecture Name"
                        value={lecture.name}
                        size="small"
                        variant="outlined"
                        fullWidth
                      />
                      <TextField
                        label="Lecture Url"
                        value={lecture.url}
                        size="small"
                        variant="outlined"
                        fullWidth
                      />
                      <button
                        onClick={() => removeLecture(chapter.id, lecture.id)}
                        disabled={chapter.lectures.length === 1}
                      >
                        <IoTrash size={20} />
                      </button>
                    </div>
                  ))}

                  {/* Moved the Add Lecture button inside the conditional rendering */}
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

        <label className="mt-4 flex flex-col items-center w-full py-2 bg-yellow-500 text-white rounded-lg cursor-pointer hover:bg-yellow-600 transition">
          Select a Thumbnail
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleThumbnailChange}
          />
        </label>
        <label className="mt-4 flex flex-col items-center w-full py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition">
          Select Note
          <input
            type="file"
            className="hidden"
            onChange={handleResourceChange}
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
            <div className="w-full h-52 relative">
              <iframe
                className="w-full mt-4 h-52 rounded-lg border"
                src={previewResourceUrl!}
                allowFullScreen
                title="PDF Preview"
              ></iframe>

              {/* Fix button positioning */}
              <button
                className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center absolute top-3 right-3 z-50"
                onClick={handleFullScreen}
              >
                ⛶
              </button>
            </div>
          ) : (
            <p className="text-gray-500">
              Selected file: {previewResourceUrl.name}
            </p>
          )
        ) : (
          <img
            className="w-full mt-4 h-52 object-cover rounded-lg border"
            src="/image-placeholder.svg"
            alt="image preview"
          />
        )}
      </div>
    </div>
  );
}

export default AddCourse;
