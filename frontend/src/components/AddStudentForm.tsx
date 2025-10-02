import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentSchema, StudentType } from "../types/zod";
import { useAddStudent } from "../hooks/useStudent";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddStudentModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const addStudentMutation = useAddStudent();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentType>({
    resolver: zodResolver(studentSchema),
  });

  const onSubmit = async (data: StudentType) => {
    try {
      await addStudentMutation.mutateAsync(data);
      alert("Student added successfully!");
      reset();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to add student.");
    }
  };

  const isAdding = addStudentMutation.status === "pending";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/50 backdrop-blur-md flex items-center justify-center z-100">
      <div className="bg-white w-full max-w-3xl p-6 rounded-xl shadow-xl relative max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={() => {
            reset();
            onClose();
          }}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 font-bold text-2xl transition-colors"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-gray-700 border-b pb-2">
          Add New Student
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Name */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Name</label>
            <input
              type="text"
              {...register("name")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && <p className="text-red-500 mt-1">{errors.name.message}</p>}
          </div>

          {/* Roll Number */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Roll Number</label>
            <input
              type="text"
              {...register("rollNumber")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.rollNumber && (
              <p className="text-red-500 mt-1">{errors.rollNumber.message}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Date of Birth</label>
            <input
              type="date"
              {...register("dob")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.dob && <p className="text-red-500 mt-1">{errors.dob.message}</p>}
          </div>

          {/* Grade */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Grade</label>
            <select
              {...register("grade")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Grade</option>
              <option value="NURSERY">Nursery</option>
              <option value="LKG">LKG</option>
              <option value="UKG">UKG</option>
              <option value="FIRST">Grade 1</option>
              <option value="SECOND">Grade 2</option>
              <option value="THIRD">Grade 3</option>
              <option value="FOURTH">Grade 4</option>
              <option value="FIFTH">Grade 5</option>
              <option value="SIXTH">Grade 6</option>
              <option value="SEVENTH">Grade 7</option>
              <option value="EIGHTH">Grade 8</option>
              <option value="NINTH">Grade 9</option>
              <option value="TENTH">Grade 10</option>
            </select>
            {errors.grade && <p className="text-red-500 mt-1">{errors.grade.message}</p>}
          </div>

          {/* Father Name */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Father's Name</label>
            <input
              type="text"
              {...register("fatherName")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.fatherName && <p className="text-red-500 mt-1">{errors.fatherName.message}</p>}
          </div>

          {/* Mother Name */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Mother's Name</label>
            <input
              type="text"
              {...register("motherName")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.motherName && <p className="text-red-500 mt-1">{errors.motherName.message}</p>}
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Mobile Number</label>
            <input
              type="tel"
              {...register("mobileNumber")}
              placeholder="+911234567890"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.mobileNumber && <p className="text-red-500 mt-1">{errors.mobileNumber.message}</p>}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Gender</label>
            <select
              {...register("gender")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHERS">Others</option>
            </select>
            {errors.gender && <p className="text-red-500 mt-1">{errors.gender.message}</p>}
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-gray-600 font-medium mb-1">Address</label>
            <textarea
              {...register("address")}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.address && <p className="text-red-500 mt-1">{errors.address.message}</p>}
          </div>
          {/* Blood Group (added) */}
<div>
  <label className="block text-gray-600 font-medium mb-1">Blood Group</label>
  <select
    {...register("bloodGroup")}
    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="">Select Blood Group</option>
    <option value="A+">A+</option>
    <option value="A-">A-</option>
    <option value="B+">B+</option>
    <option value="B-">B-</option>
    <option value="O+">O+</option>
    <option value="O-">O-</option>
    <option value="AB+">AB+</option>
    <option value="AB-">AB-</option>
  </select>
  {errors.bloodGroup && <p className="text-red-500 mt-1">{errors.bloodGroup.message}</p>}
</div>


          {/* Profile Picture */}
          <div className="md:col-span-2">
            <label className="block text-gray-600 font-medium mb-1">Profile Picture URL</label>
            <input
              type="url"
              {...register("profilePic")}
              placeholder="https://example.com/photo.jpg"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.profilePic && <p className="text-red-500 mt-1">{errors.profilePic.message}</p>}
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 text-center w-full mt-2">
            <button
              type="submit"
              disabled={isAdding}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-3xl shadow-md disabled:opacity-50 transition-colors"
            >
              {isAdding ? "Adding..." : "Add Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentModal;
