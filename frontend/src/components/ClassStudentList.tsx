import { Link, useParams } from "react-router-dom";
import { useAllStudent } from "../hooks/useStudent";
import { Eye,  Trash2 } from "lucide-react";
import { StudentType } from "../types/zod";

const ClassStudentList = () => {
  const { grade } = useParams<{ grade: string }>();
  const { data: studentData, isLoading: studentLoading, error: studentError } = useAllStudent();

  if (studentLoading) return <div className="p-4 text-gray-500">Loading...</div>;
  if (studentError) return <div className="p-4 text-red-500">Error occurred</div>;

  // filter by grade
  const filteredStudents =
    studentData?.filter((student: StudentType) => student.grade === grade) || [];

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-gray-50">
      {/* Header with search */}
      <div className="flex items-center justify-between flex-wrap gap-4 p-4 bg-gray-50">
        <h2 className="text-xl font-bold text-gray-800">{grade} Class List</h2>

        <div className="relative w-full sm:w-72">
          <input
            type="text"
            id="table-search"
            className="block w-full p-2 pl-10 text-sm bg-gray-50 border border-gray-300 rounded-lg
              text-gray-700 placeholder-gray-400
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search student"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-gray-700 uppercase bg-blue-50">
            <tr>
              <th className="px-6 py-3">Sr</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3 hidden sm:table-cell">Grade</th>
              <th className="px-6 py-3 hidden md:table-cell">Roll No</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {filteredStudents.map((student: StudentType, index: number) => (
              <tr key={student.rollNumber} className="bg-white hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-700">{index + 1}</td>

                <td className="flex items-center px-6 py-4 whitespace-nowrap">
                  <img
                    className="w-10 h-10 rounded-full"
                    src="/docs/images/people/profile-picture-1.jpg"
                    alt={student.name}
                  />
                  <div className="pl-3">
                    <div className="text-base font-semibold text-gray-800">{student.name}</div>
                    <div className="text-sm text-gray-500 truncate max-w-[120px] sm:max-w-none">
                      {student.address}
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 hidden sm:table-cell">
                  <span className="px-2 py-1 text-xs rounded-md bg-emerald-100 text-emerald-700">
                    {student.grade}
                  </span>
                </td>

                <td className="px-6 py-4 text-gray-700 hidden md:table-cell">
                  {student.rollNumber}
                </td>

                <td className="px-6 py-4 flex space-x-3">
                  <Link to={`/students/${student.rollNumber}`} className="text-blue-600 hover:text-blue-800 font-medium">
                    <Eye />
                  </Link>
                  <button className="text-rose-500 hover:text-rose-700 font-medium">
                    <Trash2 />
                  </button>
                </td>
              </tr>
            ))}

            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No students found in this class
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassStudentList;
