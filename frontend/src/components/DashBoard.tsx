import { useAllStudent } from "../hooks/useStudent";
import { useStaff } from "../hooks/useStaff";

const DashBoard = () => {
  const { data: studentData, isLoading: studentLoading, error: studentError } = useAllStudent();
  const { data: staffData, isLoading: staffLoading, error: staffError } = useStaff();

  if (studentLoading || staffLoading) return <div>Loading...</div>;
  if (studentError || staffError) return <div>Error loading data</div>;

  const totalStudents = studentData?.length ?? 0;
  const totalStaff = staffData?.length ?? 0;

  return (
    <div className="bg-black min-h-screen p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="bg-gray-800 p-4 rounded-md w-64">
          <span className="text-gray-300">Total Students</span>
          <p className="text-2xl font-semibold">{totalStudents}</p>
        </div>

        <div className="bg-gray-800 p-4 rounded-md w-64">
          <span className="text-gray-300">Total Staff</span>
          <p className="text-2xl font-semibold">{totalStaff}</p>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
