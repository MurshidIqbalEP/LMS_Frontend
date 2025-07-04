import {
  SquareLibrary,
  LayoutDashboard,
  GraduationCap,
  ShieldUserIcon,
  BadgePlus,
  FilePenLine,
  LogIn,
  Speech,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { persistor, RootState } from "@/redux/store";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { User2, LogOut, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { clearAdmin } from "@/redux/slices/adminSlice";
import { IUser } from "@/services/types";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/admin/Dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Students",
    url: "/admin/Students",
    icon: GraduationCap,
  },
  {
    title: "Educators",
    url: "/admin/Educators",
    icon: Speech,
  },
  {
    title: "Courses",
    url: "/admin/Courses",
    icon: SquareLibrary,
  },
  {
    title: "New Courses",
    url: "/admin/NewCourses",
    icon: BadgePlus,
  },
  {
    title: "Edited Courses",
    url: "/admin/EditedCourses",
    icon: FilePenLine,
  },
];

export function AppSidebar() {
  const adminInfo = useSelector((state: RootState) => state.admin.adminInfo)as IUser | null;  
  const location = useLocation();
  const dispatch = useDispatch();
  const handlelogout = ()=>{
    dispatch(clearAdmin());
    localStorage.removeItem("token");
    persistor.purge();
  }
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-3 p-4 bg-gray-200 rounded-lg">
          <div className="bg-black w-[40px] h-[40px] rounded-lg flex justify-center items-center">
            <ShieldUserIcon className="text-white w-5 h-5" />
          </div>

          <div className="flex justify-center items-center  mt-2">
            <h1 className="!text-xl !font-bold !text-gray-800 !tracking-wide !leading-none">
              Eduvantage
            </h1>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 px-1">
              {items.map((item) => {
                const isActive = location.pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        to={item.url}
                        className={`flex items-center gap-3 p-3 rounded-lg font-medium transition-all duration-200
            ${isActive ? "bg-gray-200 " : "text-gray-700 hover:bg-gray-200"}`}
                      >
                        <item.icon
                          className={`w-5 h-5 ${
                            isActive ? "text-gray-600" : "text-gray-500"
                          }`}
                        />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center justify-between w-full gap-3 p-4 bg-gray-200 rounded-lg cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="bg-black w-9 h-9 rounded-md flex justify-center items-center">
                      <User2 className="text-white w-5 h-5" />
                    </div>
                    <span className="font-medium text-gray-800">{adminInfo?.name}</span>
                  </div>
                  <ChevronDown className="text-gray-600 w-4 h-4" />
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent side="top" className="w-[200px]">
                {adminInfo ? (
                  <DropdownMenuItem
                    onClick={handlelogout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem
                    onClick={() => console.log("Logout clicked")}
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
