import React, { useState } from "react";

import AssignFeeForm from "../components/FeeStructureForm";

const FeeManagementPage: React.FC = () => {
  // Optional: control visibility of the Assign Fee Form
  const [showAssignForm, setShowAssignForm] = useState(true);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Fee Management</h1>



      {/* Assign Fee Form */}
      {showAssignForm && (
        <div className="mb-6">
          <AssignFeeForm />
        </div>
      )}

      {/* Here you can add your fee tables, history, etc. */}
    </div>
  );
};

export default FeeManagementPage;
