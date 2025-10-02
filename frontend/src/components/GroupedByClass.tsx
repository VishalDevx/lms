import React, { useState } from "react";
import { StudentType } from "../types/zod";
import { useAllStudent } from "../hooks/useStudent";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import AddStudentModal from "./AddStudentForm";
import { UserPlus } from "lucide-react";

const GroupedByClass: React.FC = () => {
  const { data: studentData, isLoading: studentLoading, error: studentError } =
    useAllStudent();

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (studentLoading) return <Loading />;

  if (studentError)
    return (
      <div className="p-6 text-center text-red-500 font-medium">
        Some error occurred while fetching students
      </div>
    );

  // Group students by grade
  const groupedByClass: Record<string, StudentType[]> =
    studentData?.reduce((acc: Record<string, StudentType[]>, student: StudentType) => {
      const grade = student.grade || "Unassigned";
      if (!acc[grade]) acc[grade] = [];
      acc[grade].push(student);
      return acc;
    }, {}) || {};

  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Students by Class</h1>
      <p className="text-gray-600 mb-6">
        Overview of each class with total students and average age.
      </p>
<div className="flex justify-end mb-6">
  <button
    onClick={() => setIsModalOpen(true)}
    className="bg-blue-600 flex items-center gap-2 text-white font-semibold px-4 py-2 rounded-3xl shadow-md transition-all group overflow-hidden"
  >
    {/* Icon always visible */}
    <UserPlus className="text-white transition-colors duration-300" />

    {/* Text visible only on hover with smooth slide */}
    <span className="max-w-0 opacity-0 overflow-hidden whitespace-nowrap transition-all duration-400 ease-in-out group-hover:max-w-xs group-hover:opacity-100">
      Add Student
    </span>
  </button>
</div>

{/* Add Student Modal */}
<AddStudentModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
/>


{/* Add Student Modal */}
<AddStudentModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
/>



      {/* Students Table */}
      <div className="overflow-x-auto shadow-lg sm:rounded-lg border border-gray-200">
        <table className="min-w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-gray-700 uppercase bg-blue-50">
            <tr>
              <th className="px-6 py-3">Grade</th>
              <th className="px-6 py-3">Total Students</th>
              <th className="px-6 py-3 hidden lg:table-cell">Average Age</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {Object.entries(groupedByClass).map(([grade, students]: [string, StudentType[]]) => {
              const totalAge = students.reduce(
                (sum, s) => sum + (new Date().getFullYear() - new Date(s.dob).getFullYear()),
                0
              );
              const averageAge = Math.round(totalAge / students.length);

              return (
                <tr key={grade} className="bg-white hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-700">{grade}</td>
                  <td className="px-6 py-4">{students.length}</td>
                  <td className="px-6 py-4 hidden lg:table-cell">{averageAge} yrs</td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/students/class/${grade}`}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      View Students
                    </Link>
                  </td>
                </tr>
              );
            })}

            {!studentData || studentData.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                  🚀 No students found. Try adding some students to see them here.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GroupedByClass;
