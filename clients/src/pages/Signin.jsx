import React from "react";
import Header from "../components/Header";
const SigninPage = () => {
  return (
    <div>
      <Header
        heading={"login to your account"}
        paragraph={"Don't Have account yet"}
        linkName="Signup"
        linkUrl="/signup"
      />
    </div>
  );
};

export default SigninPage;
