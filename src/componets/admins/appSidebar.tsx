import {
  SquareLibrary,
  LayoutDashboard,
  GraduationCap,
  ShieldUserIcon,
  BadgePlus,
  FilePenLine,
  LogIn,
  Speech
} from "lucide-react";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

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
import { Link } from "react-router-dom";

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
     const adminInfo = useSelector((state: RootState) => state.admin.adminInfo);
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
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.url}
                      className="flex items-center gap-3 p-3 rounded-lg text-gray-700 font-medium hover:bg-gray-200 transition-all duration-200"
                    >
                      <item.icon className="w-5 h-5 text-gray-500" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
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
                    <span className="font-medium text-gray-800">John Doe</span>
                  </div>
                  <ChevronDown className="text-gray-600 w-4 h-4" />
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent side="top" className="w-[200px]">
                {adminInfo ? (
                    <DropdownMenuItem onClick={() => console.log("Logout clicked")}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
                ) : (
                    <DropdownMenuItem onClick={() => console.log("Logout clicked")}>
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </DropdownMenuItem> 
                ) }
                
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
