import { useEffect, useState } from "react";
import { getALlStudent } from "../api/student.api";
import { StudentType } from "../types/zod";
import { Link } from "react-router-dom";
import { useAllStudent } from "../hooks/useStudent";
import Loading from "./Loading";

const StudentTable = () => {
  const {
    data: studentData,
    isLoading: studentLoading,
    error: studentError
  } = useAllStudent();

  if (studentLoading) {
    return <Loading />;
  }

  if (studentError) {
    return (
      <div>
        Some error occurred
      </div>
    );
  }

  return (
    <div>
      hello world
    </div>
  );
};

export default StudentTable;
