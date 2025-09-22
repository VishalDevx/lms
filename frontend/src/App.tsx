import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import GroupedByClass from "./components/GroupedByClass";
import StudentView from "./admin-page/StudentView";
import DashBoard from "./admin-page/DashBoard";
import StaffTable from "./components/StaffTable";
import ClassStudentList from "./components/ClassStudentList";
import StaffView from "./admin-page/StaffView";
import Expense from "./admin-page/Expense";

function App() {
  return (
    <Routes>
      {/* Layout wraps all pages to keep sidebar always visible */}
      <Route path="/" element={<Layout />}>
        <Route index element={<DashBoard />} /> {/* Home/Dashboard */}
        <Route path="dashboard" element={<DashBoard />} />
        <Route path="student/class" element={<GroupedByClass />} />
        <Route path="students/class/:grade" element={<ClassStudentList />} />
        <Route path="students/:rollNumber" element={<StudentView />} />
        <Route path="staff/:email" element={<StaffView/>}/>
        <Route path="staff" element={<StaffTable />} />
        <Route path="/expsense" element={<Expense/>}/>
        {/* Add more routes here if needed */}
      </Route>
    </Routes>
  );
}

export default App;
