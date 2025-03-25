import axios from "axios";

const AddStudent = async (): Promise<any> => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/v1/admin/add_student",
      {
        name: "John Doe",
        fatherName: "Robert Doe",
        motherName: "Jane Doe",
        gender: "MALE",
        grade: "VII",
        address: "123 Main Street, City, Country",
        profilePic: "https://example.com/profile.jpg",
        rollNumber: "12345",
        mobileNumber: "+12345678901",
        bloodGroup: "O+",
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log("Response:", response.data);
  } catch (error) {
    console.error("Error:", error);
  }
};

export default AddStudent;
