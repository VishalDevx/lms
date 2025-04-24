// components/AddStudentForm.tsx
import { useStudentForm } from "../hooks/useStudentForm";

const AddStudentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useStudentForm(); // ✅ Works now

  const onSubmit = (data: any) => {
    console.log(data); // your form data
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} placeholder="Name" />
      {errors.name && <span>{errors.name.message}</span>}

      {/* Add more fields as needed */}

      <button type="submit">Submit</button>
    </form>
  );
};

export default AddStudentForm;
