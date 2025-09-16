import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex w-screen">
      {isSidebarOpen && (
        <SideBar onItemClick={() => setIsSidebarOpen(false)} />
      )}

      <div className="flex-1">
        <main className="w-full overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
