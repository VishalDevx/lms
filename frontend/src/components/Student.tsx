import { useEffect, useState } from "react";
import { getALlStudent } from "../api/student.api";
import { StudentType } from "@vishaldevsx/lms-common";

const StudentList = () => {
  const [students, setStudents] = useState<StudentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getALlStudent();
        setStudents(response.data); // Make sure this is an array
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error)
    return (
      <div className="text-red-500 text-center py-4">
        Error: {error instanceof Error ? error.message : String(error)}
      </div>
    );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">All Students</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {students.map((student: StudentType) => (
          <div
            key={student.rollNumber}
            className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold">{student.name}</h3>
            <p className="text-sm text-gray-600">Grade: {student.grade}</p>
            <p className="text-sm text-gray-600">Gender: {student.gender}</p>
            <p className="text-sm text-gray-600">
              Father: {student.fatherName}
            </p>
            <p className="text-sm text-gray-600">
              Mobile: {student.mobileNumber}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentList;
