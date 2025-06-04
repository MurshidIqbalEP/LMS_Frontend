import { fetchChartdata } from "@/api/adminApi";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import StudentsAreaChart from "@/componets/admins/areaChart";
import CustomPieChart from "@/componets/admins/pieChart";
import { CourseCategoryData, MonthlyUserData } from "@/services/types";
import { Activity, CreditCard, TrendingDown, TrendingUp, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Dashboard = () => {
      const [areachartData,setAreachartData] = useState<MonthlyUserData[]>([]);
      const [piechartData,setPiechartData] = useState<CourseCategoryData[]>([]);
      const [students,setStudents] = useState(0);
      const [courses,setCourses] = useState(0);
      const [educators,setEducators] = useState(0);
  useEffect(() => {
        const fetchChartData = async () => {
          try {
            const res = await fetchChartdata();   
            setAreachartData(res?.data.arreachartData)
            setPiechartData(res?.data.piechartData)
            setStudents(res?.data.TotalUsers)
            setCourses(res?.data.TotalEducators)
            setEducators(res?.data.TotalCourses)
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
              <h1 className="!text-3xl !mb-0 !font-bold !text-gray-900">Welcome back</h1>
              <p className="!text-gray-600 ">{"Here's what's happening with your business today."}</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Students</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+{students}</div>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                    +180.1% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Educators</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+{educators}</div>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                    +19% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Courses</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+{courses}</div>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <TrendingDown className="w-3 h-3 mr-1 text-red-500" />
                    -2% from last hour
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Revenue Chart */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>Monthly revenue for the past 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                   <StudentsAreaChart data={areachartData}/>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Distribution Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Customer Distribution</CardTitle>
                  <CardDescription>By region</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                   < CustomPieChart data={piechartData}/>
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
