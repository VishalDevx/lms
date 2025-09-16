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
} from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: <ChartPie /> },
  { to: "/getAllStudent", label: "Students", icon: <Users /> },
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
  return (
    <div className="w-64 h-screen bg-black sticky top-0">
      <div className="p-4 text-white text-xl font-bold border-b border-gray-700">
        RGD School
      </div>
      <nav className="flex flex-col p-4 gap-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onItemClick} // <-- call the handler on click
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md ${
                isActive
                  ? "bg-gray-800 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default SideBar;
