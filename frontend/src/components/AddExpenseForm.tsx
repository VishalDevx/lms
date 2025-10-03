import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExpenseFormType, expenseSchema } from "../types/zod";
import { useAddTransaction } from "../hooks/useFinance";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddTransactionModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const addTransactionMutation = useAddTransaction();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormType>({
    resolver: zodResolver(expenseSchema),
  });

  const onSubmit = async (data: ExpenseFormType) => {
    try {
      // Convert date string to Date object if backend expects a Date
      await addTransactionMutation.mutateAsync({
        ...data,
        date: new Date(data.date),
      });
      alert("Transaction added successfully!");
      reset();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to add transaction.");
    }
  };

  // Use status string instead of isLoading
  const isAdding = addTransactionMutation.status === "pending";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/50 backdrop-blur-md flex items-center justify-center z-[100]">
      <div className="bg-white w-full max-w-3xl p-6 rounded-xl shadow-xl relative max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={() => {
            reset();
            onClose();
          }}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 font-bold text-2xl transition-colors"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-gray-700 border-b pb-2">
          Add New Transaction
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {/* Title */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Title</label>
            <input
              type="text"
              {...register("title")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.title && <p className="text-red-500 mt-1">{errors.title.message}</p>}
          </div>

          {/* Amount */}
         <div>
  <label className="block text-gray-600 font-medium mb-1">Amount</label>
  <input
    type="number"
    {...register("amount", { valueAsNumber: true })}
    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  {errors.amount && <p className="text-red-500 mt-1">{errors.amount.message}</p>}
</div>

          {/* Type */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Type</label>
            <select
              {...register("type")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Type</option>
              <option value="CREDIT">CREDIT</option>
              <option value="DEBIT">DEBIT</option>
            </select>
            {errors.type && <p className="text-red-500 mt-1">{errors.type.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Description</label>
            <input
              type="text"
              {...register("description")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.description && <p className="text-red-500 mt-1">{errors.description.message}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Category</label>
            <input
              type="text"
              {...register("category")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.category && <p className="text-red-500 mt-1">{errors.category.message}</p>}
          </div>

          {/* Date */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Date</label>
            <input
              type="date"
              {...register("date")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.date && <p className="text-red-500 mt-1">{errors.date.message}</p>}
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 text-center w-full mt-2">
            <button
              type="submit"
              disabled={isAdding}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-3xl shadow-md disabled:opacity-50 transition-colors"
            >
              {isAdding ? "Adding..." : "Add Transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
