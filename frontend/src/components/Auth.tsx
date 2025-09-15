// import { Link, useNavigate } from "react-router-dom";
// import { AdminSignupInput } from "@vishaldevsx/lms-common";
// import axios from "axios";
// import { ChangeEvent, useState } from "react";
// import { BACKEND_URL } from "../config";
// const Auth = ({ type }: { type: "signup" | "signin" }) => {
//   const navigate = useNavigate();
//   const [postInputs, setPostInputs] = useState<AdminSignupInput>({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const sendRequest = async () => {
//     try {
//       const response = await axios.post(
//         `${BACKEND_URL}/api/v1/auth/${
//           type === "signup" ? "sign-up" : "sign-in"
//         }`,
//         postInputs
//       );
//       const jwt = response.data;
//       localStorage.setItem("token", jwt);
//       navigate("/dashboard");
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   return (
//     <div className="h-screen flex justify-center flex-col">
//       <div className="flex justify-center">
//         <div>
//           <div className="px-10">
//             <div className="text-3xl font-extrabold">Create an account</div>
//             <div className="text-slate-500">
//               {type === "signin"
//                 ? "Don't have an account?"
//                 : "Already have an account?"}
//               <Link
//                 className="pl-2 underline"
//                 to={type === "signin" ? "/signup" : "/signin"}
//               >
//                 {type === "signin" ? "Sign up" : "Sign in"}
//               </Link>
//             </div>
//           </div>
//           <div className="pt-8">
//             {type === "signup" ? (
//               <LabelledInput
//                 label="Name"
//                 placeholder="Vishal Singh..."
//                 onChange={(e) => {
//                   setPostInputs({
//                     ...postInputs,
//                     name: e.target.value,
//                   });
//                 }}
//               />
//             ) : null}
//             <LabelledInput
//               label="Email"
//               placeholder="vishal@gmail.com"
//               onChange={(e) => {
//                 setPostInputs({
//                   ...postInputs,
//                   name: e.target.value,
//                 });
//               }}
//             />
//             <LabelledInput
//               label="Password"
//               type={"password"}
//               placeholder="123456"
//               onChange={(e) => {
//                 setPostInputs({
//                   ...postInputs,
//                   password: e.target.value,
//                 });
//               }}
//             />
//             <button
//               onClick={sendRequest}
//               type="button"
//               className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
//             >
//               {type === "signup" ? "Sign up" : "Sign in"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// interface labelledInputType {
//   label: string;
//   placeholder: string;
//   onChange: (e: ChangeEvent<HTMLInputElement>) => void;
//   type?: string;
// }
// function LabelledInput({
//   label,
//   placeholder,
//   onChange,
//   type,
// }: labelledInputType) {
//   return (
//     <div>
//       <label className="block mb-2 text-sm text-black font-semibold pt-4">
//         {label}
//       </label>
//       <input
//         onChange={onChange}
//         type={type || "text"}
//         id="first_name"
//         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//         placeholder={placeholder}
//         required
//       />
//     </div>
//   );
// }

// export default Auth;
