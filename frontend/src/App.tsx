import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout"; // Correct import
import StudentTable from "./components/StudentCard";
import StudentDetails from "./admin-page/StudentInfo";
import DashBoard from "./components/DashBoard";
import StaffTable from "./components/StaffTable";


function App() {
  return (
    <div className="flex flex-row ">
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route path="/dashboard" element={<DashBoard/>}/>
          <Route path="/getAllStudent" element={<StudentTable />} />
           <Route path="students/:rollNumber" element={<StudentDetails />} />
           <Route path="/staff" element={<StaffTable/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
