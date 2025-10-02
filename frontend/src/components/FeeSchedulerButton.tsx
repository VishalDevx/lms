// src/components/FeeSchedulerButton.tsx
import React from "react";
import { useRunFeeScheduler } from "../hooks/useFeeScheduler";

const FeeSchedulerButton: React.FC = () => {
  const mutation = useRunFeeScheduler();

  return (
    <button
      onClick={() => mutation.mutate()}
      className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
    >
      Run Fee Scheduler
    </button>
  );
};

export default FeeSchedulerButton;
