import React, { useState, useEffect } from "react";
import axios from "axios";
import { z } from "zod";

// Define the schema for student data
const studentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  fatherName: z.string().min(1, "Father's name is required"),
  motherName: z.string().min(1, "Mother's name is required"),
  gender: z.enum(["MALE", "FEMALE", "OTHER"], {
    errorMap: () => ({ message: "Gender must be MALE, FEMALE, or OTHER" }),
  }),
  grade: z.string().min(1, "Grade is required"),
  address: z.string().min(1, "Address is required"),
  profilePic: z.string().url("Profile picture must be a valid URL"),
  rollNumber: z.string().min(1, "Roll number is required"),
  mobileNumber: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, "Invalid mobile number format"),
  bloodGroup: z
    .string()
    .regex(/^(A|B|AB|O)[+-]$/, "Invalid blood group format"),
});

// Type derived from the schema
type StudentData = z.infer<typeof studentSchema>;

// Create a type for students with an ID
type Student = StudentData & { id: string | number };

// Function to add student with API call
const addStudent = async (studentData: StudentData): Promise<any> => {
  try {
    // Validate the data against the schema
    const validatedData = studentSchema.parse(studentData);

    // Send the validated data to the API
    const response = await axios.post(
      "http://localhost:8000/api/v1/admin/add_student",
      validatedData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return { success: true, data: response.data };
  } catch (error) {
    // Check if it's a Zod validation error
    if (error instanceof z.ZodError) {
      console.error("Validation error:", error.errors);
      return { success: false, errors: error.errors };
    }

    // Handle API or other errors
    console.error("Error:", error);
    return { success: false, error };
  }
};

// Student Form Component
interface StudentFormProps {
  addStudentApi: (data: StudentData) => Promise<any>;
  onStudentAdded?: (student: any) => void;
}

const StudentForm = ({ addStudentApi, onStudentAdded }: StudentFormProps) => {
  const initialFormState: StudentData = {
    name: "",
    fatherName: "",
    motherName: "",
    gender: "MALE",
    grade: "",
    address: "",
    profilePic: "",
    rollNumber: "",
    mobileNumber: "",
    bloodGroup: "",
  };

  const [formData, setFormData] = useState<StudentData>(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      // Validate with Zod
      studentSchema.parse(formData);

      // If validation passes, submit form using the provided API function
      const result = await addStudentApi(formData);

      if (result.success) {
        setSubmitMessage("Student added successfully!");
        setFormData(initialFormState);
        setErrors({});

        // Call the callback if provided
        if (onStudentAdded && result.data) {
          onStudentAdded(result.data);
        }
      } else {
        if (result.errors) {
          // Handle validation errors from API
          const fieldErrors: Record<string, string> = {};
          result.errors.forEach((err: any) => {
            if (err.path) {
              fieldErrors[err.path[0]] = err.message;
            }
          });
          setErrors(fieldErrors);
        } else {
          setSubmitMessage("Failed to add student. Please try again.");
        }
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Convert Zod errors to a more usable format
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            fieldErrors[err.path[0]] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        setSubmitMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Add New Student</h2>

      {submitMessage && (
        <div
          className={`p-4 mb-4 rounded ${
            submitMessage.includes("success")
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {submitMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Personal Information */}
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1 font-medium">
              Full Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="rollNumber" className="block mb-1 font-medium">
              Roll Number*
            </label>
            <input
              type="text"
              id="rollNumber"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.rollNumber ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.rollNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.rollNumber}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="fatherName" className="block mb-1 font-medium">
              Father's Name*
            </label>
            <input
              type="text"
              id="fatherName"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.fatherName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.fatherName && (
              <p className="text-red-500 text-sm mt-1">{errors.fatherName}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="motherName" className="block mb-1 font-medium">
              Mother's Name*
            </label>
            <input
              type="text"
              id="motherName"
              name="motherName"
              value={formData.motherName}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.motherName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.motherName && (
              <p className="text-red-500 text-sm mt-1">{errors.motherName}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="gender" className="block mb-1 font-medium">
              Gender*
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.gender ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="grade" className="block mb-1 font-medium">
              Grade*
            </label>
            <input
              type="text"
              id="grade"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.grade ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.grade && (
              <p className="text-red-500 text-sm mt-1">{errors.grade}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="mobileNumber" className="block mb-1 font-medium">
              Mobile Number*
            </label>
            <input
              type="text"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.mobileNumber ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.mobileNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="bloodGroup" className="block mb-1 font-medium">
              Blood Group*
            </label>
            <input
              type="text"
              id="bloodGroup"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.bloodGroup ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="e.g. O+, A-, B+"
            />
            {errors.bloodGroup && (
              <p className="text-red-500 text-sm mt-1">{errors.bloodGroup}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="profilePic" className="block mb-1 font-medium">
              Profile Picture URL*
            </label>
            <input
              type="text"
              id="profilePic"
              name="profilePic"
              value={formData.profilePic}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.profilePic ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="https://example.com/image.jpg"
            />
            {errors.profilePic && (
              <p className="text-red-500 text-sm mt-1">{errors.profilePic}</p>
            )}
          </div>
        </div>

        <div className="mb-4 col-span-full">
          <label htmlFor="address" className="block mb-1 font-medium">
            Address*
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={3}
            className={`w-full p-2 border rounded ${
              errors.address ? "border-red-500" : "border-gray-300"
            }`}
          ></textarea>
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {isSubmitting ? "Submitting..." : "Add Student"}
          </button>
        </div>
      </form>
    </div>
  );
};

// Main Student Management Page Component
const StudentManagementPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch students on component mount
  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/admin/students"
        );
        setStudents(response.data);
      } catch (err) {
        console.error("Error fetching students:", err);
        setError("Failed to load students. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Function to handle form submission success
  const handleStudentAdded = (newStudent: Student) => {
    setStudents((prev) => [...prev, newStudent]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Student Management</h1>

      {/* Pass the addStudent function to the form */}
      <StudentForm
        onStudentAdded={handleStudentAdded}
        addStudentApi={addStudent}
      />

      {/* Display the student list */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Student List</h2>

        {isLoading && <p className="text-gray-500">Loading students...</p>}

        {error && (
          <div className="bg-red-100 text-red-800 p-4 rounded mb-4">
            {error}
          </div>
        )}

        {students.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border text-left">Name</th>
                  <th className="py-2 px-4 border text-left">Roll Number</th>
                  <th className="py-2 px-4 border text-left">Grade</th>
                  <th className="py-2 px-4 border text-left">Gender</th>
                  <th className="py-2 px-4 border text-left">Mobile</th>
                  <th className="py-2 px-4 border text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4 border">{student.name}</td>
                    <td className="py-2 px-4 border">{student.rollNumber}</td>
                    <td className="py-2 px-4 border">{student.grade}</td>
                    <td className="py-2 px-4 border">{student.gender}</td>
                    <td className="py-2 px-4 border">{student.mobileNumber}</td>
                    <td className="py-2 px-4 border">
                      <button className="text-blue-500 hover:text-blue-700 mr-2">
                        Edit
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : !isLoading && !error ? (
          <p className="text-gray-500">
            No students found. Add your first student using the form above.
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default StudentManagementPage;
