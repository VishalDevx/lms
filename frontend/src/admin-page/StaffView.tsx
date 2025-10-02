import { useParams } from "react-router-dom";
import { useStaffByName } from "../hooks/useStaff";
import {
  Calendar,
  Phone,
  Users,
  Droplets,
  MapPin,
  BookOpen,
  User,
} from "lucide-react";

const StudentProfile = () => {
  const params = useParams();
  const email = params.email ?? "";

  const { data: staff, isLoading } = useStaffByName(email);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500 font-sans text-lg">
        Loading student profile...
      </div>
    );
  }

  if (!staff) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600 font-sans text-lg">
        Student not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-12 shadow-md rounded-b-3xl">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              {staff.name} 👨‍🎓
            </h1>
            <p className="mt-2 text-lg md:text-xl font-medium">
              Email : <span className="font-semibold">{staff.email}</span> 
           
            </p>
          </div>

          {/* Profile Picture */}
          <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden shadow-lg border-4 border-white">
            {staff.profilePic ? (
              <img
                src={staff.profilePic}
                alt={staff.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center text-3xl font-bold text-gray-700">
                {staff.name.charAt(0)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ERP-style Information Table */}
      <div className="max-w-6xl mx-auto mt-10 bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full table-auto border-collapse text-gray-800">
          <thead className="bg-indigo-50">
            <tr>
              <th className="px-6 py-4 text-left text-lg font-medium uppercase tracking-wide">
                Field
              </th>
              <th className="px-6 py-4 text-left text-lg font-medium uppercase tracking-wide">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                <span className="font-semibold">Date of Birth</span>
              </td>
              <td className="px-6 py-4">{new Date(staff.dob).toLocaleDateString()}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 flex items-center space-x-2">
                <User className="w-5 h-5 text-purple-500" />
                <span className="font-semibold">Gender</span>
              </td>
              <td className="px-6 py-4">{staff.gender}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 flex items-center space-x-2">
                <Users className="w-5 h-5 text-green-500" />
                <span className="font-semibold">University</span>
              </td>
              <td className="px-6 py-4">{staff.university}</td>
            </tr>
    
            <tr>
              <td className="px-6 py-4 flex items-center space-x-2">
                <Phone className="w-5 h-5 text-green-600" />
                <span className="font-semibold">Mobile Number</span>
              </td>
              <td className="px-6 py-4">{staff.phoneNumber}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 flex items-center space-x-2">
                <Droplets className="w-5 h-5 text-red-500" />
                <span className="font-semibold">Subject</span>
              </td>
              <td className="px-6 py-4">{staff.subject}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-orange-500" />
                <span className="font-semibold">Qualification</span>
              </td>
              <td className="px-6 py-4">{staff.qualification}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 flex items-start space-x-2">
                <MapPin className="w-5 h-5 text-red-500 mt-1" />
                <span className="font-semibold">Address</span>
              </td>
              <td className="px-6 py-4">{staff.address}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Academic / Result Section */}
      <div className="max-w-6xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2 text-gray-700">
       Pay Roll
        </h2>
        <p className="text-gray-600">Coming Soon: Result/Grades Chart 📊</p>
      </div>
    </div>
  );
};

export default StudentProfile;
