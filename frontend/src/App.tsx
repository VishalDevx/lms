import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout"; // Correct import
import StudentTable from "./components/StudentCard";
import StudentDetails from "./pages/StudentInfo";
import DashBoard from "./components/DashBoard";

function App() {
  return (
    <div className="flex flex-row ">
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route path="/dashboard" element={<DashBoard/>}/>
          <Route path="/getAllStudent" element={<StudentTable />} />
           <Route path="students/:rollNumber" element={<StudentDetails />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
