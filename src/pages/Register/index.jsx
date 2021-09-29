import { useForm } from "react-hook-form";

import Title from "../../components/Sidebar/Title";
import LoginBox from "./LoginBox";
import validateEmail from "../../utils/validateEmail";
import axios from "axios";
import { injectStyle } from "react-toastify/dist/inject-style";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";

// CALL IT ONCE IN YOUR APP
if (typeof window !== "undefined") {
  injectStyle();
}

const baseUrl = "https://final-project-user-profile.herokuapp.com";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const history = useHistory();
  const onSubmit = async (inputs) => {
    await axios({
      url: baseUrl + "/register",
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: inputs,
    })
      .then(() => {
        history.push("/login");
      })
      .catch((_) => {
        toast.dark("Please try again...");
      });
  };

  return (
    <div className="flex flex-col lg:gap-3 h-screen justify-center items-center font-poppins  bg-custom-gray lg:bg-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full lg:w-1/3 bg-custom-gray lg:rounded-md pt-40 lg:mt-16"
      >
        <Title />
        <div className="px-10 mt-10 w-full">
          <label htmlFor="email" className="text-white">
            Email
          </label>
          <br />
          <input
            type="text"
            {...register("email", {
              required: true,
              validate: (value) => validateEmail(value),
            })}
            name="email"
            id="email"
            className="outline-none bg-custom-gray text-white border-b-2 border-b-white py-2 w-full"
          />
          {errors.email && (
            <span className="text-red-500">Input a valid email address</span>
          )}
        </div>

        <div className="px-10 mt-10 w-full">
          <label htmlFor="full_name" className="text-white">
            Full Name
          </label>
          <br />
          <input
            type="text"
            {...register("full_name", {
              required: true,
            })}
            name="full_name"
            id="full_name"
            className="outline-none bg-custom-gray text-white border-b-2 border-b-white py-2 w-full"
          />
          {errors.full_name && (
            <span className="text-red-500">Full Name is required</span>
          )}
        </div>

        <div className="px-10 mt-10 w-full">
          <label htmlFor="gender" className="text-white">
            Gender
          </label>
          <br />
          <select
            {...register("gender")}
            className="outline-none bg-custom-gray text-white border-b-2 border-b-white py-2 w-full"
          >
            <option value="">Select Gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
          {errors.gender && (
            <span className="text-red-500">Gender is required</span>
          )}
        </div>

        <div className="px-10 mt-10 w-full">
          <label htmlFor="role" className="text-white">
            Role
          </label>
          <br />
          <select
            {...register("role")}
            className="outline-none bg-custom-gray text-white border-b-2 border-b-white py-2 w-full"
          >
            <option value="">Select Role</option>
            <option value="coder">Coder</option>
            <option value="designer">Designer</option>
          </select>
          {errors.role && (
            <span className="text-red-500">Role is required</span>
          )}
        </div>

        <div className="px-10 mt-10 w-full">
          <label htmlFor="birth_date" className="text-white">
            Birth Date
          </label>
          <br />
          <input
            type="date"
            {...register("birth_date", {
              required: true,
            })}
            name="birth_date"
            id="birth_date"
            className="outline-none bg-custom-gray text-white border-b-2 border-b-white py-2 w-full"
          />
          {errors.birth_date && (
            <span className="text-red-500">Birth Date is required</span>
          )}
        </div>

        <div className="px-10 my-10 w-full">
          <label htmlFor="password" className="text-white">
            Password
          </label>
          <br />
          <input
            type="password"
            {...register("password", { required: true })}
            name="password"
            id="password"
            className="outline-none bg-custom-gray text-white border-b-2 border-b-white py-2 w-full"
          />
          {errors.password && (
            <span className="text-red-500">Password is required</span>
          )}
        </div>
        <div className="px-10 lg:mt-10 mb-5 w-full">
          <input
            type="submit"
            value="Register"
            className="w-full rounded-md py-2 hover:opacity-70 cursor-pointer"
          />
        </div>
      </form>
      <LoginBox />
      <ToastContainer />
    </div>
  );
}

export default Register;
