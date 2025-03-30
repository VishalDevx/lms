import { useEffect, useState } from "react";
import axios from "axios";

interface Student {
  id: string;
  name: string;
  fatherName: string;
  motherName: string;
  gender: string;
  grade: string;
  address: string;
  profilePic: string;
  rollNumber: string;
  mobileNumber: string;
  bloodGroup: string;
  createdAt: string;
}

const GetStudent = () => {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/admin/all_student",
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("API Response:", response.data);

        // Assuming response.data is an array of students, take the first one
        if (Array.isArray(response.data) && response.data.length > 0) {
          setStudent(response.data[0]);
        } else {
          setStudent(null);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!student) return <p>No student data found.</p>;

  return (
    <div className=" mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl m-2 p-2  font-bold mb-4 rounded-2xl  bg-blue-600">
        My Profile
      </h2>
      <div className=" flex  justify-around  w-full m-auto ">
        <div className="">
          <p className=" p-1 text-xl">
            <strong>Name:</strong> {student.name}
          </p>
          <p className=" p-1 text-xl">
            <strong>Father's Name:</strong> {student.fatherName}
          </p>
          <p className=" p-1 text-xl">
            <strong>Mother's Name:</strong> {student.motherName}
          </p>
          <p className=" p-1 text-xl">
            <strong>Gender:</strong> {student.gender}
          </p>
          <p className=" p-1 text-xl">
            <strong>Grade:</strong> {student.grade}
          </p>
          <p className=" p-1 text-xl">
            <strong>Address:</strong> {student.address}
          </p>
          <p className=" p-1 text-xl">
            <strong>Roll Number:</strong> {student.rollNumber}
          </p>
          <p className=" p-1 text-xl">
            <strong>Mobile Number:</strong> {student.mobileNumber}
          </p>
          <p className=" p-1 text-xl">
            <strong>Blood Group:</strong> {student.bloodGroup}
          </p>
          <p className=" p-1 text-xl">
            <strong>Joined At:</strong>{" "}
            {new Date(student.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="">
          <img
            src={student.profilePic}
            alt=" Profile"
            className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
          />
        </div>
      </div>
    </div>
  );
};

export default GetStudent;
