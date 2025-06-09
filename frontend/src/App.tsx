import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

import Layout from "./components/Layout"; // Correct import
import StudentTable from "./components/StudentCard";
import StudentDetails from "./pages/StudentInfo";

function App() {
  return (
    <div className="flex flex-row ">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/getAllStudent" element={<StudentTable />} />
          <Route path="/student/:rollNumber" element={<StudentDetails />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
