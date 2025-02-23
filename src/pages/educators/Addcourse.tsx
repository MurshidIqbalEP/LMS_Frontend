import TextField from "@mui/material/TextField";
import { LuGrip } from "react-icons/lu";
import { CiCircleChevUp, CiCircleChevDown, CiSquarePlus } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";

function AddCourse() {
  const [chapters, setChapters] = useState([
    {
      id: "1",
      name: "",
      isExpanded: true,
      lectures: [{ id: "1", name: "", url: "" }],
    },
  ]);

  const addChapter = (event) => {
    event.preventDefault();
    const newChapter = {
      id: `${Date.now()}`,
      name: "",
      isExpanded: true,
      lectures: [{ id: `${Date.now()}-1`, name: "", url: "" }],
    };
    setChapters([...chapters, newChapter]);
  };

  const toggleChapter = (chapterId, event) => {
    event.preventDefault();
    setChapters(
      chapters.map((chapter) =>
        chapter.id === chapterId
          ? { ...chapter, isExpanded: !chapter.isExpanded }
          : chapter
      )
    );
  };

  const removeChapter = (chapterId, event) => {
    event.preventDefault();
    if (chapters.length > 1) {
      setChapters(chapters.filter((chapter) => chapter.id !== chapterId));
    }
  };

  const addLecture = (chapterId, event) => {
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

  return (
    <div className="min-h-screen flex flex-col md:flex-row gap-6 p-10 bg-gray-100">
      {/* Left Section */}
      <div className="w-full md:w-2/3 bg-white p-8 rounded-lg shadow-md">
        <form className="space-y-6">
          <TextField label="Title" variant="outlined" fullWidth />
          <TextField label="Description" variant="outlined" fullWidth />
          <div className="flex gap-4">
            <TextField label="Category" variant="outlined" fullWidth />
            <TextField label="Price" type="number" variant="outlined" fullWidth />
          </div>

          {chapters.map((chapter) => (
            <div key={chapter.id} className="p-4 border rounded-md bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 w-full">
                  <LuGrip className="text-gray-400" />
                  <input
                    type="text"
                    placeholder="Chapter Name"
                    value={chapter.name}
                    onChange={(e) => {
                      setChapters(
                        chapters.map((c) =>
                          c.id === chapter.id ? { ...c, name: e.target.value } : c
                        )
                      );
                    }}
                    className="w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 px-2 py-1"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={(e) => toggleChapter(chapter.id, e)}>
                    {chapter.isExpanded ? <CiCircleChevUp /> : <CiCircleChevDown />}
                  </button>
                  <button
                    onClick={(e) => removeChapter(chapter.id, e)}
                    disabled={chapters.length === 1}
                  >
                    <IoCloseSharp className="text-red-500" />
                  </button>
                </div>
              </div>
              {chapter.isExpanded && (
                <div className="mt-4 space-y-3">
                  {chapter.lectures.map((lecture) => (
                    <div key={lecture.id} className="flex gap-4 items-center">
                      <input
                        placeholder="Lecture Name"
                        value={lecture.name}
                        onChange={(e) => {
                          setChapters(
                            chapters.map((c) => {
                              if (c.id === chapter.id) {
                                return {
                                  ...c,
                                  lectures: c.lectures.map((l) =>
                                    l.id === lecture.id
                                      ? { ...l, name: e.target.value }
                                      : l
                                  ),
                                };
                              }
                              return c;
                            })
                          );
                        }}
                        className="border p-2 rounded-md w-full"
                      />
                      <button onClick={(e) => addLecture(chapter.id, e)}>
                        <CiSquarePlus className="text-blue-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <button
            onClick={addChapter}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-md transition"
          >
            <CiSquarePlus /> Add Chapter
          </button>
        </form>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/3 flex flex-col items-center bg-white p-8 rounded-lg shadow-md">
        <img
          className="w-full h-52 object-cover rounded-lg border"
          src="/image-placeholder.svg"
          alt="image preview"
        />
        <label className="mt-4 flex flex-col items-center w-full py-2 bg-yellow-500 text-white rounded-lg cursor-pointer hover:bg-yellow-600 transition">
          Select a Thumbnail
          <input type="file" className="hidden" />
        </label>
        <label className="mt-4 flex flex-col items-center w-full py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition">
          Select Note
          <input type="file" className="hidden" />
        </label>
      </div>
    </div>
  );
}

export default AddCourse;
