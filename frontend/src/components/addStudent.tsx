import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";

// Define Frontend Validation Schema
const studentSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(30),
  fatherName: z
    .string()
    .min(3, "Father's name must be at least 3 characters")
    .max(30),
  motherName: z
    .string()
    .min(3, "Mother's name must be at least 3 characters")
    .max(30),
  gender: z.enum(["MALE", "FEMALE", "OTHERS"], {
    required_error: "Gender is required",
  }),
  grade: z.enum(["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"], {
    required_error: "Grade is required",
  }),
  address: z.string().min(3, "Address must be at least 3 characters").max(100),
  profilePic: z.string().url("Invalid URL format").optional(),
  rollNumber: z
    .string()
    .min(3, "Roll number must be at least 3 characters")
    .max(10),
  mobileNumber: z
    .string()
    .regex(/^\+\d{10,15}$/, "Invalid mobile number. Format: +1234567890"),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"], {
    required_error: "Blood group is required",
  }),
});

type StudentFormData = z.infer<typeof studentSchema>;

const AddStudent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
  });

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Add Student</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Name:</label>
          <input {...register("name")} className="w-full p-2 border rounded" />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label>Father's Name:</label>
          <input
            {...register("fatherName")}
            className="w-full p-2 border rounded"
          />
          {errors.fatherName && (
            <p className="text-red-500 text-sm">{errors.fatherName.message}</p>
          )}
        </div>

        <div>
          <label>Mother's Name:</label>
          <input
            {...register("motherName")}
            className="w-full p-2 border rounded"
          />
          {errors.motherName && (
            <p className="text-red-500 text-sm">{errors.motherName.message}</p>
          )}
        </div>

        <div>
          <label>Gender:</label>
          <select
            defaultValue=""
            {...register("gender")}
            className="w-full p-2 border rounded"
          >
            <option defaultValue="" disabled selected>
              Select gender
            </option>
            <option value="MALE">MALE</option>
            <option value="FEMALE">FEMALE</option>
            <option value="OTHERS">OTHERS</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm">{errors.gender.message}</p>
          )}
        </div>

        <div>
          <label>Grade:</label>
          <select {...register("grade")} className="w-full p-2 border rounded">
            <option defaultValue="" disabled selected>
              Select grade
            </option>
            {["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"].map(
              (grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              )
            )}
          </select>
          {errors.grade && (
            <p className="text-red-500 text-sm">{errors.grade.message}</p>
          )}
        </div>

        <div>
          <label>Address:</label>
          <input
            {...register("address")}
            className="w-full p-2 border rounded"
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}
        </div>

        <div>
          <label>Profile Picture URL:</label>
          <input
            type="url"
            {...register("profilePic")}
            className="w-full p-2 border rounded"
          />
          {errors.profilePic && (
            <p className="text-red-500 text-sm">{errors.profilePic.message}</p>
          )}
        </div>

        <div>
          <label>Mobile Number:</label>
          <input
            type="tel"
            {...register("mobileNumber")}
            className="w-full p-2 border rounded"
          />
          {errors.mobileNumber && (
            <p className="text-red-500 text-sm">
              {errors.mobileNumber.message}
            </p>
          )}
        </div>

        <div>
          <label>Blood Group:</label>
          <select
            {...register("bloodGroup")}
            className="w-full p-2 border rounded"
          >
            <option defaultValue="" disabled selected>
              Select blood group
            </option>
            {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
          {errors.bloodGroup && (
            <p className="text-red-500 text-sm">{errors.bloodGroup.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Add Student
        </button>
      </form>
    </div>
  );
};

const onSubmit = async (data: StudentFormData) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/v1/admin/add_student",
      data, // Send form data
      {
        headers: {
          "Content-Type": "application/json", // Set JSON format
        },
      }
    );
    alert("Student added successfully!");
    console.log(response.data);
  } catch (error) {
    console.error("Error adding student:", error);
    alert("Failed to add student. Check console for details.");
  }
};
export default AddStudent;
