import { Link } from "react-router-dom";
import { useStaff } from "../hooks/useStaff";
import { StaffType } from "../types/zod";
import { Eye,  Trash2 } from "lucide-react";

const StaffTable = () => {
  const { data: staffData, isLoading: staffLoading, error: staffError } = useStaff();

  if (staffLoading) return <div className="p-4 text-gray-500">Loading...</div>;
  if (staffError) return <div className="p-4 text-red-500">Error occurred</div>;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {/* Header with search */}
      <div className="flex items-center justify-between flex-wrap gap-4 p-4 bg-gray-50">
        <h2 className="text-xl font-bold text-gray-800">Staff List</h2>

        <div className="relative w-full sm:w-72">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            className="block w-full p-2 pl-10 text-sm bg-gray-50 border border-gray-300 rounded-lg
              text-gray-700 placeholder-gray-400
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search staff"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-600">
          {/* Table Header */}
          <thead className="text-xs text-gray-700 uppercase bg-blue-50">
            <tr>
              <th scope="col" className="px-6 py-3">Sr</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3 hidden sm:table-cell">Subject</th>
              <th scope="col" className="px-6 py-3 hidden md:table-cell">Qualification</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-200">
            {staffData?.map((staff: StaffType, index: number) => (
              <tr
                key={staff.email}
                className="bg-white hover:bg-gray-50 transition"
              >
                {/* Serial number */}
                <td className="px-6 py-4 font-medium text-gray-700">{index + 1}</td>

                {/* Name & Address */}
                <td className="flex items-center px-6 py-4 whitespace-nowrap">
                  <img
                    className="w-10 h-10 rounded-full"
                    src="/docs/images/people/profile-picture-1.jpg"
                    alt={staff.name}
                  />
                  <div className="pl-3">
                    <div className="text-base font-semibold text-gray-800">{staff.name}</div>
                    <div className="text-sm text-gray-500 truncate max-w-[120px] sm:max-w-none">
                      {staff.address}
                    </div>
                  </div>
                </td>

                {/* Subject */}
                <td className="px-6 py-4 hidden sm:table-cell">
                  <span className="px-2 py-1 text-xs rounded-md bg-emerald-100 text-emerald-700">
                    {staff.subject}
                  </span>
                </td>

                {/* Qualification */}
                <td className="px-6 py-4 text-gray-700 hidden md:table-cell">
                  {staff.qualification}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 flex space-x-3">
                  <Link
                    to={`/staff/${staff.email}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                  <Eye />
                  </Link>
                  <button className="text-rose-500 hover:text-rose-700 font-medium">
                    <Trash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffTable;
