import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import GroupedByClass from "./components/StudentCard";
import StudentDetails from "./admin-page/StudentInfo";
import DashBoard from "./components/DashBoard";
import StaffTable from "./components/StaffTable";
import ClassStudentList from "./components/ClassStudentList";

function App() {
  return (
    <Routes>
      {/* Layout wraps all pages to keep sidebar always visible */}
      <Route path="/" element={<Layout />}>
        <Route index element={<DashBoard />} /> {/* Home/Dashboard */}
        <Route path="dashboard" element={<DashBoard />} />
        <Route path="student/class" element={<GroupedByClass />} />
        <Route path="students/class/:grade" element={<ClassStudentList />} />
        <Route path="students/:rollNumber" element={<StudentDetails />} />
        <Route path="staff" element={<StaffTable />} />
        {/* Add more routes here if needed */}
      </Route>
    </Routes>
  );
}

export default App;
