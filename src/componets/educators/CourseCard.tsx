

function CourseCard() {
  return (
    <div className="bg-white rounded-xl shadow-md  w-full h-[320px] max-w-sm transition-all duration-300 hover:shadow-xl">
    {/* Image section with overlay gradient and status badge */}
    <div className="relative h-48">
      <img
        src="/api/placeholder/400/320"
        alt="Course thumbnail"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div className="absolute top-3 left-3">
        <span className="bg-green-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">Active</span>
      </div>
    </div>

    {/* Content section */}
    <div className="p-5">
      {/* Title and category */}
      <div className="mb-3">
        <h3 className="text-lg font-bold text-gray-900 mb-1">Advanced Web Development</h3>
        <p className="text-sm text-gray-500">Frontend & Backend • 12 modules</p>
      </div>

      

      {/* Action buttons */}
      <div className="flex justify-between items-center">
        <button className="text-blue-600 font-medium text-sm hover:text-blue-800">
          Continue
        </button>
        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-1.5 px-3 text-sm rounded-lg transition-colors">
          Edit
        </button>
      </div>
    </div>
  </div>
  )
}

export default CourseCard