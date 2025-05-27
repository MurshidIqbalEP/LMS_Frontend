import { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { postReview } from "../../api/studentsApi";
import { toast } from "sonner";
import { MdClose } from "react-icons/md";


function Review({courseId,onClose}:{courseId:string,onClose:() => void}) {
  const user = useSelector((state: RootState) => state.auth.userInfo); 
  
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [err,setErr] = useState("")

  const handleSubmit = async() => {
    if (!reviewText.trim()) {
        setErr("Please write a review before submitting.")
        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- user type unknown from external source
    const res = await postReview((user as any)?._id ,courseId,rating,reviewText)
    if (res?.data.success){
        toast.message(res.data.message);
        setTimeout(()=>{
            onClose();
        },3000)
    }  
   
  };

  return (
    <div className="flex relative flex-col  bg-stone-100 w-[450px] p-6 rounded-lg shadow-xl justify-center items-center space-y-4">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl font-bold"
        aria-label="Close"
      >
        <MdClose size={25} className="cursor-pointer" />
      </button>
      <h1 className="text-2xl font-semibold text-gray-800">
        Review and Rating
      </h1>

      <div className="flex gap-2 justify-center">
        {new Array(5).fill(0).map((_, index) => (
          <FaStar
            key={index}
            size={40}
            className={`cursor-pointer transition-colors duration-200  ${
              index < rating ? "text-amber-400" : "text-gray-300"
            }`}
            onMouseEnter={() => setRating(index + 1)}
            onClick={() => setRating(index + 1)}
          />
        ))}
      </div>

      <textarea
        className="w-full h-24 border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-black resize-none"
        placeholder="Write your review here..."
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      />
      {err && <p className="text-sm text-red-500">{err}</p>}

      <button
        onClick={handleSubmit}
        className="bg-green-600 hover:bg-green-700 !mt-3 !text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300"
      >
        Submit Review
      </button>
    </div>
  );
}

export default Review;
