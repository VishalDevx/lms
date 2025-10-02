import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { staffSchema, StaffType } from "../types/zod";
import { useAddStaff } from "../hooks/useStaff";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddStaffModel: React.FC<Props> = ({ isOpen, onClose }) => {
  const addStaffMutation = useAddStaff();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StaffType>({
    resolver: zodResolver(staffSchema),
  });

  const onSubmit = async (data: StaffType) => {
    try {
      await addStaffMutation.mutateAsync(data);
      alert("Staff added successfully!");
      reset();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to add staff.");
    }
  };

  const isAdding = addStaffMutation.status === "pending";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/50 backdrop-blur-md flex items-center justify-center z-100">
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
          Add New Staff
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {/* Name */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              {...register("name")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              {...register("dob")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.dob && (
              <p className="text-red-500 mt-1">{errors.dob.message}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              {...register("phoneNumber")}
              placeholder="+911234567890"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 mt-1">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Gender
            </label>
            <select
              {...register("gender")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHERS">Others</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 mt-1">{errors.gender.message}</p>
            )}
          </div>

          {/* Subject */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Subject
            </label>
            <input
              type="text"
              {...register("subject")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.subject && (
              <p className="text-red-500 mt-1">{errors.subject.message}</p>
            )}
          </div>

          {/* University */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              University
            </label>
            <input
              type="text"
              {...register("university")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.university && (
              <p className="text-red-500 mt-1">{errors.university.message}</p>
            )}
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-gray-600 font-medium mb-1">
              Address
            </label>
            <textarea
              {...register("address")}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.address && (
              <p className="text-red-500 mt-1">{errors.address.message}</p>
            )}
          </div>

          {/* Qualification */}
          <div className="md:col-span-2">
            <label className="block text-gray-600 font-medium mb-1">
              Qualification
            </label>
            <textarea
              {...register("qualification")}
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.qualification && (
              <p className="text-red-500 mt-1">
                {errors.qualification.message}
              </p>
            )}
          </div>

          {/* Profile Picture */}
          <div className="md:col-span-2">
            <label className="block text-gray-600 font-medium mb-1">
              Profile Picture URL
            </label>
            <input
              type="url"
              {...register("profilePic")}
              placeholder="https://example.com/photo.jpg"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.profilePic && (
              <p className="text-red-500 mt-1">{errors.profilePic.message}</p>
            )}
          </div>

          {/* Submit */}
          <div className="md:col-span-2 text-center w-full mt-2">
            <button
              type="submit"
              disabled={isAdding}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-3xl shadow-md disabled:opacity-50 transition-colors"
            >
              {isAdding ? "Adding..." : "Add Staff"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStaffModel;
