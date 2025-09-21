import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ChartPie,
  UserPen,
  Users,
  HandCoins,
  BookCheck,
  Fingerprint,
  BanknoteArrowDown,
  LogOut,
  Menu, // hamburger icon
} from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: <ChartPie /> },
  { to: "/student/class", label: "Students", icon: <Users /> },
  { to: "/staff", label: "Teacher", icon: <UserPen /> },
  { to: "/fee-management", label: "Fee Management", icon: <HandCoins /> },
  { to: "/result", label: "Results", icon: <BookCheck /> },
  { to: "/generate-id", label: "Generate ID", icon: <Fingerprint /> },
  { to: "/expense", label: "School Expense", icon: <BanknoteArrowDown /> },
  { to: "/logout", label: "Logout", icon: <LogOut /> },
];

interface SideBarProps {
  onItemClick: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ onItemClick }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`h-screen bg-black sticky top-0 transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header with hamburger */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700 text-white">
        {!collapsed && <span className="text-xl font-bold">RGD School</span>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded hover:bg-gray-700"
        >
          <Menu />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col p-4 gap-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onItemClick}
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md ${
                isActive
                  ? "bg-gray-800 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`
            }
          >
            {item.icon}
            {!collapsed && item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default SideBar;
