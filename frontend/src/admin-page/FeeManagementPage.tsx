import React from "react";
import FeeSchedulerButton from "../components/FeeSchedulerButton"

const FeeManagementPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Fee Management</h1>
      
      <div className="mb-6">
        <FeeSchedulerButton />
      </div>

      {/* Your fee tables, forms, etc. */}
    </div>
  );
};

export default FeeManagementPage;
