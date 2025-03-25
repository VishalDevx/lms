import { Route, Routes } from "react-router-dom";
import AddStudent from "./components/addStudent";
import GetStudent from "./components/getStudent";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/getStudent" element={<GetStudent />} />
        <Route path="/addStudent" element={<AddStudent />} />
      </Routes>
    </div>
  );
}

export default App;
