import { useState, useEffect } from "react";
import { fetchAllCategory, fetchAllCourse } from "../../api/studentsApi";
import CourseCard from "../../componets/students/Coursecard";
import { Pagination } from "antd";

const sortOptions = [
  { value: "titleAsc", label: "Title (A-Z)" },
  { value: "titleDesc", label: "Title (Z-A)" },
  { value: "priceAsc", label: "Price (Low to High)" },
  { value: "priceDesc", label: "Price (High to Low)" },
  { value: "ratingDesc", label: "Highest Rated" },
];

interface Rating {
  userId: string;
  rating: number;
}
interface Course {
  _id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  thumbnail: string;
  reviews: Rating[];
}

const AllCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("titleAsc");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const coursesPerPage = 3;

  // Fetch courses and categories from backend
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch courses
        const coursesResponse = await fetchAllCourse();

        // Fetch categories
        const categoriesResponse = await fetchAllCategory();
        console.log(coursesResponse?.data);
        
        setCourses(coursesResponse?.data);
        setCategories(categoriesResponse?.data);
        setError(null);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategories, sortBy]);

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Filter courses based on search and selected categories
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(course.category);
    return matchesSearch && matchesCategory;
  });

  // Sort the filtered courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case "titleAsc":
        return a.title.localeCompare(b.title);
      case "titleDesc":
        return b.title.localeCompare(a.title);
      case "priceAsc":
        return a.price - b.price;
      case "priceDesc":
        return b.price - a.price;
      case "ratingDesc": {
        const aAvgRating =
          a.reviews.length > 0
            ? a.reviews.reduce((sum, r) => sum + r.rating, 0) / a.reviews.length
            : 0;
        const bAvgRating =
          b.reviews.length > 0
            ? b.reviews.reduce((sum, r) => sum + r.rating, 0) / b.reviews.length
            : 0;
        return bAvgRating - aAvgRating;
      }
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedCourses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const paginatedCourses = sortedCourses.slice(
    startIndex,
    startIndex + coursesPerPage
  );

  // Toggle filter sidebar for mobile
  const toggleFilterSidebar = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center bg-red-50 p-6 rounded-lg shadow">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-gray-200 min-h-screen">
      <div className="flex justify-center items-center pt-1 pb-0">
        <h1 className="text-4xl md:text-5xl font-bold m-0  leading-none">
          Courses
        </h1>
      </div>

      {/* Mobile Filter Toggle Button */}
      <div className="md:hidden px-4 mb-4">
        <button
          onClick={toggleFilterSidebar}
          className="w-full py-3 bg-blue-500 text-white rounded-lg shadow flex items-center justify-center"
        >
          <span>{isFilterOpen ? "Hide Filters" : "Show Filters"}</span>
        </button>
      </div>

      <div className="w-full flex flex-col md:flex-row gap-4 p-4 md:pt-0 md:p-6  bg-gray-200">
        {/* Sidebar Container - Hidden on mobile by default */}
        <div
          className={`${
            isFilterOpen ? "block" : "hidden"
          } md:block md:w-1/4 lg:w-1/5 transition-all duration-300`}
        >
          {/* Sidebar (Search & Filters) */}
          <div className="bg-white rounded-lg shadow-md p-4 md:p-5 md:sticky md:top-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Filter Courses</h2>
              <button
                onClick={toggleFilterSidebar}
                className="md:hidden text-gray-600 hover:text-gray-800"
              >
                ×
              </button>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Search
              </label>
              <input
                id="search"
                type="text"
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Sort Options */}
            <div className="mb-6">
              <label
                htmlFor="sort"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Sort By
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter - Multi-select */}
            <div>
              <h3 className="text-lg font-medium mb-2">Categories</h3>
              <div className="max-h-60 overflow-y-auto">
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`category-${category}`}
                        className="ml-2 block text-sm text-gray-900"
                      >
                        {category}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Selected Filters Display */}
            {selectedCategories.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-700">
                    Active filters:
                  </h4>
                  <button
                    onClick={() => setSelectedCategories([])}
                    className="text-sm text-blue-500 hover:text-blue-700"
                  >
                    Clear all
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedCategories.map((category) => (
                    <span
                      key={category}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {category}
                      <button
                        type="button"
                        onClick={() => toggleCategory(category)}
                        className="ml-1 inline-flex text-blue-400 hover:text-blue-600"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Course grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {paginatedCourses.length > 0 ? (
              paginatedCourses.map((course, index) => (
                <CourseCard key={index} course={course} />
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <p className="text-gray-500 mb-2">
                  No courses match your search criteria
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setSelectedCategories([]);
                  }}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <Pagination
                current={currentPage}
                total={sortedCourses.length}
                pageSize={coursesPerPage}
                onChange={(page) => setCurrentPage(page)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllCourses;
