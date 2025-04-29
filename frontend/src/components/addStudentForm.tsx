import axios from "axios";
import { useStudentForm } from "../hooks/useStudentForm";
import { Gender, GradeEnum } from "@vishaldevsx/lms-common";

export const StudentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useStudentForm();

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/admin/students",
        data
      );
      console.log("success:", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name">Name:</label>
        <input id="name" {...register("name")} className="border p-2 w-full" />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="fatherName">Father Name:</label>
        <input
          id="fatherName"
          {...register("fatherName")}
          className="border p-2 w-full"
        />
        {errors.fatherName && (
          <p className="text-red-500">{errors.fatherName.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="motherName">Mother Name:</label>
        <input
          id="motherName"
          {...register("motherName")}
          className="border p-2 w-full"
        />
        {errors.motherName && (
          <p className="text-red-500">{errors.motherName.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          {...register("gender")}
          className="border p-2 w-full"
        >
          <option value="">Select Gender</option>
          {Object.values(Gender).map((gender) => (
            <option value={gender} key={gender}>
              {gender}
            </option>
          ))}
        </select>
        {errors.gender && (
          <p className="text-red-500">{errors.gender.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="grade">Grade:</label>
        <select id="grade" {...register("grade")} className="border p-2 w-full">
          <option value="">Select Grade</option>
          {Object.values(GradeEnum).map((grade) => (
            <option value={grade} key={grade}>
              {grade}
            </option>
          ))}
        </select>
        {errors.grade && <p className="text-red-500">{errors.grade.message}</p>}
      </div>

      <div>
        <label htmlFor="address"> Address : </label>
        <input
          id="address"
          {...register("address")}
          className="border p-2 w-full"
        />
        {errors.address && (
          <p className="text-red-500">{errors.address.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="profilePic">ProfiLe Pic : </label>
        <input
          type="file"
          id="picture"
          {...register("profilePic")}
          className="border p-2 w-full"
        />
        {errors.profilePic && (
          <p className="text-red-500">{errors.profilePic.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
};
