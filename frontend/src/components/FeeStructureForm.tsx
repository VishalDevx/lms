import React, { useState, useEffect } from "react";
import { useAssignFee } from "../hooks/useFeeScheduler";
import { FeeStructureType } from "../types/zod";

const GRADES: FeeStructureType["grade"][] = [
  "NURSERY","LKG","UKG","FIRST","SECOND","THIRD","FOURTH","FIFTH",
  "SIXTH","SEVENTH","EIGHTH","NINTH","TENTH"
];

const AssignFeeForm: React.FC = () => {
  const [formData, setFormData] = useState<FeeStructureType>({
    name: "",
    amount: 0,
    month: new Date(),
    grade: "NURSERY",
  });

  const assignFeeMutation = useAssignFee();
  const { mutate,  isError, error, isSuccess, data } = assignFeeMutation;
const isLoading: any = (useAssignFee() as any).isLoading;
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      setFormData({ name: "", amount: 0, month: new Date(), grade: "NURSERY" });
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-md space-y-4 max-w-md">
      <h2 className="text-xl font-semibold">Assign Fee Structure</h2>

      <div>
        <label className="block font-medium mb-1">Fee Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Amount</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Month</label>
        <input
          type="month"
          name="month"
          value={formData.month.toISOString().slice(0, 7)}
          onChange={(e) => setFormData({ ...formData, month: new Date(e.target.value + "-01") })}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Grade</label>
        <select
          name="grade"
          value={formData.grade}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          {GRADES.map((grade) => (
            <option key={grade} value={grade}>{grade}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
      >
        {isLoading ? "Assigning..." : "Assign Fee"}
      </button>

      {isError && <p className="text-red-500 mt-2">{error?.message}</p>}
      {showSuccess && <p className="text-green-500 mt-2">{data?.msg}</p>}
    </form>
  );
};

export default AssignFeeForm;
