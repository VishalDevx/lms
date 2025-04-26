import axios from "axios";
import { useStudentForm } from "../hooks/useStudentForm";
import { object } from "zod";
import { Gender } from "@vishaldevsx/lms-common";

export const StudentFrom = () => {
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
      console.log("success :", response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return;
  <form onSubmit={handleSubmit(onSubmit)}>
    <div>
      <label htmlFor="name">Name : </label>
      <input id="name" {...register("name")} className="border p-2 w-full" />
      {errors.name && <p className="text-red-500">{errors.name?.message}</p>}
    </div>
    <div>
      <label htmlFor="fatherName">FatherName : </label>
      <input
        id="fatherName"
        {...register("fatherName")}
        className="border p-2 w-full"
      />
      {errors.fatherName && (
        <p className="text-red-500">{errors.fatherName?.message}</p>
      )}
    </div>
    <div>
      <label htmlFor="motherName"> MotherName : </label>
      <input
        id="motherName"
        {...register("motherName")}
        className="border p-2 w-full"
      />
      {errors.motherName && <p>{errors.motherName?.message}</p>}
    </div>
    <div>
      <label htmlFor="gender">Gender : </label>
      <select id="gender" {...register("gender")} className="border p-2 w-full">
        <option value="">select gender</option>
        {object.values(Gender).map((gender) => {
          <option value={gender} key={gender}>
            {gender}
          </option>;
        })}
      </select>
    </div>
  </form>;
};
