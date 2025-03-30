import { Route, Routes } from "react-router-dom";
import StudentForm from "./components/addStudent";
import GetStudent from "./components/getStudent";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/getStudent" element={<GetStudent />} />
        <Route
          path="/addStudent"
          element={
            <StudentForm
              addStudentApi={function (data: {
                name: string;
                fatherName: string;
                motherName: string;
                gender: "MALE" | "FEMALE" | "OTHER";
                grade: string;
                address: string;
                profilePic: string;
                rollNumber: string;
                mobileNumber: string;
                bloodGroup: string;
              }): Promise<any> {
                throw new Error("Function not implemented.");
              }}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
