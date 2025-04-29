import axios from "axios";
import useStudentForm from "../hooks/useStudentForm";

const genderOptions = ["MALE", "FEMALE", "OTHERS"];
const gradeOptions = [
  "NURSERY",
  "LKG",
  "UKG",
  "FIRST",
  "SECOND",
  "THIRD",
  "FOURTH",
  "FIFTH",
  "SIXTH",
  "SEVENTH",
  "EIGHTH",
  "NINTH",
  "TENTH",
]; // etc.

const AddStudentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useStudentForm();

  const onSubmit = async (data: any): Promise<void> => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/admin/students"
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form
      className="bg-gray-100 flex w-1/2 m-auto items-center justify-center h-screen flex-col shadow-2xl p-8 rounded-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full mb-4">
        <input
          className="p-3 bg-white text-black text-xl rounded w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Name"
          type="text"
          id="name"
          {...register("name")}
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name.message}</span>
        )}
      </div>

      <div className="w-full mb-4">
        <input
          className="p-3 bg-white text-black text-xl rounded w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Father's Name"
          type="text"
          id="fatherName"
          {...register("fatherName")}
        />
        {errors.fatherName && (
          <span className="text-red-500 text-sm">
            {errors.fatherName.message}
          </span>
        )}
      </div>

      <div className="w-full mb-4">
        <input
          className="p-3 bg-white text-black text-xl rounded w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Mother's Name"
          type="text"
          id="motherName"
          {...register("motherName")}
        />
        {errors.motherName && (
          <span className="text-red-500 text-sm">
            {errors.motherName.message}
          </span>
        )}
      </div>

      <div className="w-full mb-4">
        <select
          className="p-3 bg-white text-black text-xl rounded w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="gender"
          {...register("gender")}
        >
          {genderOptions.map((gender) => (
            <option key={gender} value={gender}>
              {gender.charAt(0).toUpperCase() + gender.slice(1)}
            </option>
          ))}
        </select>
        {errors.gender && (
          <span className="text-red-500 text-sm">{errors.gender.message}</span>
        )}
      </div>

      <div className="w-full mb-4">
        <select
          className="p-3 bg-white text-black text-xl rounded w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="grade"
          {...register("grade")}
        >
          {gradeOptions.map((grade) => (
            <option key={grade} value={grade}>
              {grade.charAt(0).toUpperCase() + grade.slice(1)}
            </option>
          ))}
        </select>
        {errors.grade && (
          <span className="text-red-500 text-sm">{errors.grade.message}</span>
        )}
      </div>

      <div className="w-full mb-4">
        <input
          className="p-3 bg-white text-black text-xl rounded w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Profile Pic"
          type="text"
          id="profilePic"
          {...register("profilePic")}
        />
        {errors.profilePic && (
          <span className="text-red-500 text-sm">
            {errors.profilePic.message}
          </span>
        )}
      </div>

      <div className="w-full mb-4">
        <input
          className="p-3 bg-white text-black text-xl rounded w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Roll Number"
          type="text"
          id="rollNumber"
          {...register("rollNumber")}
        />
        {errors.rollNumber && (
          <span className="text-red-500 text-sm">
            {errors.rollNumber.message}
          </span>
        )}
      </div>

      <div className="w-full mb-4">
        <input
          className="p-3 bg-white text-black text-xl rounded w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Blood Group"
          type="text"
          id="bloodGroup"
          {...register("bloodGroup")}
        />
        {errors.bloodGroup && (
          <span className="text-red-500 text-sm">
            {errors.bloodGroup.message}
          </span>
        )}
      </div>

      <div className="w-full mb-4">
        <input
          className="p-3 bg-white text-black text-xl rounded w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Mobile Number"
          type="text"
          id="mobileNumber"
          {...register("mobileNumber")}
        />
        {errors.mobileNumber && (
          <span className="text-red-500 text-sm">
            {errors.mobileNumber.message}
          </span>
        )}
      </div>

      <div className="w-full mb-6">
        <input
          className="p-3 bg-white text-black text-xl rounded w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Address"
          type="text"
          id="address"
          {...register("address")}
        />
        {errors.address && (
          <span className="text-red-500 text-sm">{errors.address.message}</span>
        )}
      </div>

      <button
        type="submit"
        className="p-3 bg-blue-500 text-white text-xl rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      >
        Submit
      </button>
    </form>
  );
};

export default AddStudentForm;
