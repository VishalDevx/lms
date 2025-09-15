import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getStudentByRoll } from "../api/student.api";

const StudentDetails = () => {
  const { rollNumber } = useParams();
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStudentByRoll(rollNumber as string);
        setStudent(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (rollNumber) fetchData();
  }, [rollNumber]);

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error)
    return (
      <div className="text-red-500 text-center py-4">
        Error: {error instanceof Error ? error.message : String(error)}
      </div>
    );
  if (!student) return <div>No student found</div>;

  return (
    <div className="p-6 w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Student Info</h2>
      <div className="bg-white p-6 rounded-lg shadow space-y-2">
        <p>
          <strong>Name:</strong> {student.name}
        </p>
        <p>
          <strong>Roll Number:</strong> {student.rollNumber}
        </p>
        <p>
          <strong>Gender:</strong> {student.gender}
        </p>
        <p>
          <strong>Grade:</strong> {student.grade}
        </p>
        <p>
          <strong>Father's Name:</strong> {student.fatherName}
        </p>
        <p>
          <strong>Mobile:</strong> {student.mobileNumber}
        </p>
      </div>

      <h3 className="text-2xl font-semibold mt-8">Fee Details</h3>
      {student.StudentFee.length === 0 ? (
        <p className="text-gray-600">No fee records found.</p>
      ) : (
        <div className="space-y-4 mt-4">
          {student.StudentFee.map((fee: any, index: number) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <p>
                <strong>Fee Type:</strong> {fee.FeeStructure?.title || "N/A"}
              </p>
              <p>
                <strong>Amount:</strong> ₹{fee.FeeStructure?.amount || 0}
              </p>
              <p>
                <strong>Total Paid:</strong> ₹
                {fee.payments.reduce(
                  (total: number, payment: any) => total + payment.amount,
                  0
                )}
              </p>
              <div className="mt-2 text-sm text-gray-600">
                <p className="font-medium">Payment History:</p>
                {fee.payments.length === 0 ? (
                  <p>No payments made.</p>
                ) : (
                  <ul className="list-disc list-inside">
                    {fee.payments.map((p: any, i: number) => (
                      <li key={i}>
                        ₹{p.amount} on {new Date(p.date).toLocaleDateString()}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentDetails;
