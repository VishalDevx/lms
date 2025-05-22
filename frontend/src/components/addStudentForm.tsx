import React, { useState } from "react";
import useStudentForm from "../hooks/useStudentForm";
import { studentSchema } from "@vishaldevsx/lms-common";

interface
const StudentForm: React.FC = () => {
  const [formData, setFormData] = useState<StudentFormData>({});

  return (
    <form>
      {/* Add your form fields here */}
      <div>Student Form</div>
    </form>
  );
};

export default StudentForm;
