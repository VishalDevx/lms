import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const Layout = () => {
  const [collapsed, setCollapsed] = useState(true); // default collapsed
  const [manualCollapse, setManualCollapse] = useState(false); // user clicked toggle

  const handleMouseEnter = () => {
    if (!manualCollapse) setCollapsed(false);
  };

  const handleMouseLeave = () => {
    if (!manualCollapse) setCollapsed(true);
  };

  const toggleCollapsed = () => {
    setCollapsed((prev) => !prev);
    setManualCollapse((prev) => !prev);
  };

  return (
    <div className="flex h-screen w-screen">
      {/* Sidebar */}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <SideBar collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
      </div>

      {/* Main content */}
      <div
        className="flex-1 transition-all duration-300 overflow-auto bg-gray-50 min-h-0"
        style={{ marginLeft: collapsed ? 10 : 20 }} // match sidebar width in px
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
