import { ICourse } from "../../services/types"
import { useNavigate } from "react-router-dom";


function EntrollmentCards({ course }: { course: ICourse }) {
    const navigate = useNavigate();
  return (
    <div className="course-card bg-white rounded-xl shadow-md overflow-hidden w-full h-[320px] max-w-sm transition-all duration-300 hover:shadow-xl border cursor-pointer border-gray-300 hover:scale-[1.05]"
          onClick={()=>navigate(`/playCourse/${course?._id}`)}>
          {/* Card content */}
          <div className="relative">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"></div>
            </div>
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
    
          </div>
    
          {/* Content section */}
          <div className="p-4">
            <h3 className="font-bold text-gray-900 text-lg  line-clamp-1">
              {course.title}
            </h3>
            <p className="text-sm text-gray-600  line-clamp-1">
              {course.description}
            </p>
    
            {/* Display Average Rating */}
            <div className="flex justify-between items-center">

              {/* Category */}
              <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
                {course.category}
              </span>
            </div>
          </div>
        </div>
  )
}

export default EntrollmentCards
