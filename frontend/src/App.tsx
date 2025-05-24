import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

import StudentList from "./components/Student";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/getAllStudent" element={<StudentList />} />
    </Routes>
  );
}

export default App;
