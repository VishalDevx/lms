import { useParams } from "react-router-dom";
import { useStudentByRollNumber } from "../hooks/useStudent";
import {
  Calendar,
  Phone,
  Users,
  Droplets,
  MapPin,
  BookOpen,
  User,
} from "lucide-react";
import { FeeStatusEnum } from "../types/zod";

const StudentProfile = () => {
  const { rollNumber = "" } = useParams();
  const { data: student, isLoading } = useStudentByRollNumber(rollNumber);

  if (isLoading)
    return <div className="flex items-center justify-center min-h-screen text-gray-500 font-sans text-lg">Loading student profile...</div>;

  if (!student)
    return <div className="flex items-center justify-center min-h-screen text-red-600 font-sans text-lg">Student not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-12 shadow-md rounded-b-3xl">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              {student.name} 👨‍🎓
            </h1>
            <p className="mt-2 text-lg md:text-xl font-medium">
              Roll No: <span className="font-semibold">{student.rollNumber}</span> | Grade: <span className="font-semibold">{student.grade}</span>
            </p>
          </div>

          <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden shadow-lg border-4 border-white">
            {student.profilePic ? (
              <img src={student.profilePic} alt={student.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center text-3xl font-bold text-gray-700">
                {student.name.charAt(0)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Student Info Table */}
      <div className="max-w-6xl mx-auto mt-10 bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full table-auto border-collapse text-gray-800">
          <thead className="bg-indigo-50">
            <tr>
              <th className="px-6 py-4 text-left text-lg font-medium uppercase tracking-wide">Field</th>
              <th className="px-6 py-4 text-left text-lg font-medium uppercase tracking-wide">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 flex items-center space-x-2"><Calendar className="w-5 h-5 text-blue-500" /><span className="font-semibold">Date of Birth</span></td>
              <td className="px-6 py-4">{new Date(student.dob).toLocaleDateString()}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 flex items-center space-x-2"><User className="w-5 h-5 text-purple-500" /><span className="font-semibold">Gender</span></td>
              <td className="px-6 py-4">{student.gender}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 flex items-center space-x-2"><Users className="w-5 h-5 text-green-500" /><span className="font-semibold">Father's Name</span></td>
              <td className="px-6 py-4">{student.fatherName}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 flex items-center space-x-2"><Users className="w-5 h-5 text-pink-500" /><span className="font-semibold">Mother's Name</span></td>
              <td className="px-6 py-4">{student.motherName}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 flex items-center space-x-2"><Phone className="w-5 h-5 text-green-600" /><span className="font-semibold">Mobile Number</span></td>
              <td className="px-6 py-4">{student.mobileNumber}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 flex items-center space-x-2"><Droplets className="w-5 h-5 text-red-500" /><span className="font-semibold">Blood Group</span></td>
              <td className="px-6 py-4">{student.bloodGroup}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 flex items-center space-x-2"><BookOpen className="w-5 h-5 text-orange-500" /><span className="font-semibold">Grade</span></td>
              <td className="px-6 py-4">{student.grade}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 flex items-start space-x-2"><MapPin className="w-5 h-5 text-red-500 mt-1" /><span className="font-semibold">Address</span></td>
              <td className="px-6 py-4">{student.address}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Fee Information */}
      <div className="max-w-6xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2 text-gray-700">Fee Information 💰</h2>
        {(student.studentFees?.length ?? 0)===0?(
          <p className="text-gray-600">No fee information available.</p>
        ) : (
          <table className="w-full table-auto border-collapse text-gray-800">
            <thead className="bg-indigo-50">
              <tr>
                <th className="px-6 py-4 text-left font-medium">Month</th>
                <th className="px-6 py-4 text-left font-medium">Total Fee</th>
                <th className="px-6 py-4 text-left font-medium">Paid</th>
                <th className="px-6 py-4 text-left font-medium">Due</th>
                <th className="px-6 py-4 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {student.studentFees.map((fee) => {
                const status = fee.status ??"PENDING";
                return (
                  <tr key={fee.feeStructureId}>
                    <td className="px-6 py-4">{new Date(fee.FeeStructure.month).toLocaleString("default", { month: "long", year: "numeric" })}</td>
                    <td className="px-6 py-4">{fee.totalFee}</td>
                    <td className="px-6 py-4">{fee.paidAmount}</td>
                    <td className="px-6 py-4">{fee.dueAmount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-white font-semibold ${
                        status === "PAID"
                          ? "bg-green-500"
                          : status === "PARTIALLY_PAID"
                          ? "bg-yellow-500"
                          : status === "OVERDUE"
                          ? "bg-red-500"
                          : "bg-gray-400"
                      }`}>
                        {status.replace("_", " ")}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;
