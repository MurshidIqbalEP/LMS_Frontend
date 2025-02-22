import TextField from "@mui/material/TextField";

function Addcourse() {
  return (
    <div className="w-full min-h-screen flex gap-2 bg-amber-400 p-[100px]">
      <div className="w-full flex flex-col gap-6 h-screen bg-white p-[70px]">
        <form>
          <TextField
            id="standard-basic"
            label="Title"
            variant="standard"
            sx={{ width: "100%" }}
          />

          <TextField
            id="standard-basic"
            label="Description"
            variant="standard"
            sx={{ width: "100%" }}
          />
          <div className="flex  gap-3.5">
            <TextField
              id="standard-basic"
              label="Categary"
              variant="standard"
              sx={{ width: "50%" }}
            />

            <TextField
              id="standard-basic"
              label="Price"
              type="number"
              variant="standard"
              sx={{ width: "50%" }}
            />
          </div>
        </form>
      </div>

      <div className="w-full flex flex-col gap-6 h-screen bg-white p-[30px]">
        <img
          className="w-full h-[50%] object-cover rounded-2xl border-[1px]"
          src="/image-placeholder.svg"
          alt="image preview"
        />

        <label className="flex flex-col items-center px-4 py-2 bg-[#fbad41] text-black rounded-lg shadow-lg tracking-wide uppercase cursor-pointer hover:bg-[#fbad30]">
          <span>Select a thumbnail</span>
          <input type="file" className="hidden" />
        </label>

        <label className="flex flex-col items-center px-4 py-2 bg-blue-400 text-black rounded-lg shadow-lg tracking-wide uppercase cursor-pointer hover:bg-blue-500">
          <span>Select  note</span>
          <input type="file" className="hidden" />
        </label>
      </div>
    </div>
  );
}

export default Addcourse;
