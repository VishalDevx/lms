import React, { useState } from "react";
import useStudentForm from "../hooks/useStudentForm";
import { studentSchema } from "@vishaldevsx/lms-common";

// Define the type for your form data
interface StudentFormData {
  // Add your form fields here, for example:
  name?: string;
  age?: number;
  // etc.
}

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
