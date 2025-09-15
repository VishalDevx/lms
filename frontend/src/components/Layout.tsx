import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-row w-screen">
      <div className="w-1/4">
        <SideBar />
      </div>
      <div>
        <main className="w-full overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
