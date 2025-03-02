import CourseCard from "../../componets/educators/CourseCard"


function Mycourses() {
  return (
    
    <div className="w-full min-h-screen bg-amber-400 p-4">
  {/* Header Section */}
  <h1 className="text-2xl font-bold text-black mb-4">My Courses</h1>

  {/* Grid Container */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-screen">
    {Array.from({ length:12 }).map((_, index) => (
       <CourseCard />
    ))}
  </div>
</div>

  
  )
}

export default Mycourses