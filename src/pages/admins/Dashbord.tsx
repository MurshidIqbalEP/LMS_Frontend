import { fetchChartdata } from "@/api/adminApi";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StudentsAreaChart from "@/componets/admins/areaChart";
import CustomPieChart from "@/componets/admins/pieChart";
import { CourseCategoryData, MonthlyUserData } from "@/services/types";
import {
  Activity,
  CreditCard,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Dashboard = () => {
  const [areachartData, setAreachartData] = useState<MonthlyUserData[]>([]);
  const [piechartData, setPiechartData] = useState<CourseCategoryData[]>([]);
  const [students, setStudents] = useState(0);
  const [courses, setCourses] = useState(0);
  const [educators, setEducators] = useState(0);
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const res = await fetchChartdata();
        setAreachartData(res?.data.arreachartData);
        setPiechartData(res?.data.piechartData);
        setStudents(res?.data.TotalUsers);
        setCourses(res?.data.TotalEducators);
        setEducators(res?.data.TotalCourses);
      } catch (error) {
        toast.error("Failed to fetch chart data");
      }
    };

    fetchChartData();
  }, []);
  return (
    //    <div className="p-6 space-y-6 bg-gray-200">
    <main className="flex-1 overflow-y-auto p-6 ">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="!mb-2 ">
          <h1 className="!text-3xl !mb-0 !font-bold !text-gray-900">
            Welcome back
          </h1>
          <p className="!text-gray-600 ">
            {"Here's what's happening with your business today."}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Students Card */}
          <Card className="transform transition duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl">
            <CardHeader className="flex justify-between items-center pb-4">
              <div>
                <CardTitle className="text-base font-semibold text-gray-700">
                  Students
                </CardTitle>
                <p className="text-2xl font-bold text-black mt-2">
                  +{students}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Active learners enrolled this month
                </p>
              </div>
              <div className="bg-green-100 p-2 rounded-full">
                <Users className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
          </Card>

          {/* Educators Card */}
          <Card className="transform transition duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl">
            <CardHeader className="flex justify-between items-center pb-4">
              <div>
                <CardTitle className="text-base font-semibold text-gray-700">
                  Educators
                </CardTitle>
                <p className="text-2xl font-bold text-black mt-2">
                  +{educators}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Verified experts sharing knowledge
                </p>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <CreditCard className="h-5 w-5 text-blue-600" />
              </div>
            </CardHeader>
          </Card>

          {/* Courses Card */}
          <Card className="transform transition duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl">
            <CardHeader className="flex justify-between items-center pb-4">
              <div>
                <CardTitle className="text-base font-semibold text-gray-700">
                  Courses
                </CardTitle>
                <p className="text-2xl font-bold text-black mt-2">+{courses}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  New content added recently
                </p>
              </div>
              <div className="bg-yellow-100 p-2 rounded-full">
                <Activity className="h-5 w-5 text-yellow-600" />
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue Chart */}
          <Card className="lg:col-span-2 transform transition duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl">
            <CardHeader>
              <CardTitle>Student Overview</CardTitle>
              <CardDescription>
                Student growth over the past 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <StudentsAreaChart data={areachartData} />
              </div>
            </CardContent>
          </Card>

          {/* Customer Distribution Chart */}
          <Card className="transform transition duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl">
            <CardHeader>
              <CardTitle>Course Breakdown</CardTitle>
              <CardDescription>Based on subject categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <CustomPieChart data={piechartData} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
    //     </div>
  );
};

export default Dashboard;
