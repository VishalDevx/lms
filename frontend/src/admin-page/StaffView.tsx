import { useParams } from "react-router-dom";
import { useStaffByName } from "../hooks/useStaff";
import { StaffType } from "../types/zod";

const StaffView = () => {
  const { email } = useParams<{ email: string }>();
  const { data: staffData, isLoading, error } = useStaffByName(email!);

  if (isLoading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-4">Error fetching staff data</div>;
  if (!staffData) return <div className="text-center py-4">No staff found</div>;

  return (
  <div>
    hello
  </div>
  );
};

export default StaffView;
