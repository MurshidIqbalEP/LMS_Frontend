

import ReactStars from "react-rating-stars-component";
import { useNavigate } from "react-router-dom";

interface Rating {
  userId: string;
  rating: number;
}

interface Course {
  _id:string;
  title: string;
  description: string;
  category: string;
  price: number;
  thumbnail: string;
  reviews: Rating[];
}

function CourseCard({ course }: { course: Course }) {

  const navigate = useNavigate();
  const averageRating =
    course?.reviews.length > 0
      ? course.reviews.reduce((acc, curr) => acc + curr.rating, 0) /
        course.reviews.length
      : 0;

  return (
    <div className="course-card bg-white rounded-xl shadow-md overflow-hidden w-full h-[320px] max-w-sm transition-all duration-300 hover:shadow-xl border cursor-pointer border-gray-300 hover:scale-[1.05]"
      onClick={()=>navigate(`/course/${course?._id}`)}>
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"></div>
        </div>
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover"
        />

        <span className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg">
          ₹{course.price.toFixed(2)}
        </span>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-lg  line-clamp-1">
          {course.title}
        </h3>
        <p className="text-sm text-gray-600  line-clamp-1">
          {course.description}
        </p>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 text-yellow-500 text-sm font-semibold">
            <ReactStars
              count={5}
              value={averageRating}
              size={18}
              edit={false}
              isHalf={true}
              activeColor="#facc15"
            />
            <span className="text-gray-500">
              ({course.reviews.length} reviews)
            </span>
          </div>

          <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
            {course.category}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
