import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  ChartPie,
  Users,
  UserPen,
  HandCoins,
  BookCheck,
  Fingerprint,
  BanknoteArrowDown,
  LogOut,
} from "lucide-react";

interface SideBarProps {
  collapsed: boolean;
  toggleCollapsed?: () => void;
}

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

const SideBar: React.FC<SideBarProps> = ({ collapsed, toggleCollapsed }) => {
  return (
    <div
      className={`h-screen flex flex-col rounded-3xl shadow-2xl transition-all duration-300 bg-gray-50 ${
        collapsed ? "w-16" : "w-80" // full width when expanded
      }`}
    >
      {/* Header with logo + name */}
      <div className="flex items-center justify-between h-16 border-b border-gray-200 px-4">
        <div className="flex items-center gap-2">
          <img src={logo} alt="RGD" className="w-10 h-10" />
          {!collapsed && (
            <span className="text-xl font-bold text-gray-800 transition-all duration-300">
              RGD <span className="text-blue-600">स्कूल</span>
            </span>
          )}
        </div>

        {toggleCollapsed && (
          <button
            onClick={toggleCollapsed}
            className="  rounded hover:bg-gray-200 text-gray-600 flex items-center justify-center"
          >
            {!collapsed ? "←" : null}
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col p-4 gap-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-700 font-semibold"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            {!collapsed && item.label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 text-gray-500 text-xs">
        {!collapsed && "© 2025 RGD School"}
      </div>
    </div>
  );
};

export default SideBar;
