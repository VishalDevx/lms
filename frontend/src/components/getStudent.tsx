import axios from "axios";
const GetStudent = async (): Promise<any> => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/v1/admin/all_student",
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log("Response : ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error : ", error);
  }
};

export default GetStudent;
