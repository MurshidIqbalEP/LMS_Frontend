import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom";
import { AppSidebar } from "../componets/admins/appSidebar"

export default function Layout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-screen"> 
        <AppSidebar />
        <main className="flex-1 overflow-y-auto">
          <SidebarTrigger />
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
}