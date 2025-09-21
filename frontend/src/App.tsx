import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout"; // Correct import
import GroupedByClass from "./components/StudentCard";
import StudentDetails from "./admin-page/StudentInfo";
import DashBoard from "./components/DashBoard";
import StaffTable from "./components/StaffTable";
import ClassStudentList from "./components/ClassStudentList";


function App() {
  return (
    <div className="flex flex-row ">
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route path="/dashboard" element={<DashBoard/>}/>
          <Route path="/student/class" element={<GroupedByClass />} />
           <Route path="students/:rollNumber" element={<StudentDetails />} />
           <Route path="/staff" element={<StaffTable/>}/>
          <Route path="/students/class/:grade" element={<ClassStudentList />} /> 

        </Route>
      </Routes>
    </div>
  );
}

export default App;
