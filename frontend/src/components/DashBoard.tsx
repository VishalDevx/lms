
import { User } from "lucide-react";
import { useAllStudent } from "../hooks/useStudent";

const DashBoard = () => {
  const { data, isLoading, error } = useAllStudent();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading students</div>;

  const totalStudents = data?.length ?? 0; // ✅ now works

  return (
    
    <div>
      <h1>Dashboard</h1>
      <div className="flex w-1/3">
<div className="flex flex-col bold  ">
       
      <p className="text-blue">Total Students </p>
      {totalStudents}

        </div>
      </div>
      
    </div>
  );
};

export default DashBoard;
