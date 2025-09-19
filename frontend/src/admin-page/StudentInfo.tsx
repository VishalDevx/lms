import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getStudentByRoll } from "../api/student.api";

interface Payment {
  amount: number;
  date: string;
}

interface FeeStructure {
  title: string;
  amount: number;
}

interface StudentFee {
  id: number;
  status: string;
  paidAmount: number;
  dueAmount: number;
  dueDate: string;
  FeeStructure: FeeStructure;
  payments: Payment[];
}

interface Student {
  id: number;
  name: string;
  rollNumber: string;
  fatherName: string;
  motherName: string;
  gender: string;
  grade: string;
  mobileNumber: string;
  StudentFee: StudentFee[];
}

const StudentDetails = () => {
  const { rollNumber } = useParams<{ rollNumber: string }>();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStudentByRoll(rollNumber!);
        setStudent(response.data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (rollNumber) fetchData();
  }, [rollNumber]);

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error)
    return <div className="text-red-500 text-center py-4">{`Error: ${error}`}</div>;
  if (!student) return <div className="text-center py-4">No student found</div>;

  return (
    <div className="p-6 w-full max-w-4xl mx-auto">
      {/* Student Info */}
      <h2 className="text-3xl font-bold mb-4">Student Info</h2>
      <div className="bg-white p-6 rounded-lg shadow space-y-2">
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Roll Number:</strong> {student.rollNumber}</p>
        <p><strong>Gender:</strong> {student.gender}</p>
        <p><strong>Grade:</strong> {student.grade}</p>
        <p><strong>Father's Name:</strong> {student.fatherName}</p>
        <p><strong>Mobile:</strong> {student.mobileNumber}</p>
      </div>

      {/* Fee Details */}
      <h3 className="text-2xl font-semibold mt-8">Fee Details</h3>
      {student.StudentFee.length === 0 ? (
        <p className="text-gray-600">No fee records found.</p>
      ) : (
        <div className="space-y-4 mt-4">
          {student.StudentFee.map((fee, index) => {
            const totalPaid = fee.payments.reduce((sum, p) => sum + p.amount, 0);
            const totalAmount = fee.FeeStructure?.amount ?? 0;

            return (
              <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <p><strong>Fee Type:</strong> {fee.FeeStructure?.title || "N/A"}</p>
                <p><strong>Amount:</strong> ₹{totalAmount}</p>
                <p><strong>Total Paid:</strong> ₹{totalPaid}</p>
                <p><strong>Due Amount:</strong> ₹{fee.dueAmount}</p>
                <p><strong>Status:</strong> {fee.status}</p>

                <div className="mt-2 text-sm text-gray-600">
                  <p className="font-medium">Payment History:</p>
                  {fee.payments.length === 0 ? (
                    <p>No payments made.</p>
                  ) : (
                    <ul className="list-disc list-inside">
                      {fee.payments.map((p, i) => (
                        <li key={i}>
                          ₹{p.amount} on {new Date(p.date).toLocaleDateString()}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StudentDetails;
