import { useForm } from "react-hook-form";

import Title from "../../components/Sidebar/Title";
import LoginBox from "./LoginBox";
import validateEmail from "../../utils/validateEmail";
import axios from "axios";
import { Redirect } from "react-router";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let successRegister = false;
  const onSubmit = async (inputs) => {
    await axios({
      url: "https://final-project-user-profile.herokuapp.com/register",
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: inputs,
    })
      .then(() => {
        successRegister = true;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (successRegister) {
    return (
      <>
        <Redirect to="/login" />
      </>
    );
  }
  return (
    <div className="flex flex-col gap-3 h-screen justify-center items-center font-poppins my-16">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-1/3 bg-custom-gray rounded-md py-5"
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
        <div className="px-10 mt-10 mb-5 w-full">
          <input
            type="submit"
            value="Login"
            className="w-full rounded-md py-2 hover:opacity-70 cursor-pointer"
          />
        </div>
      </form>
      <LoginBox />
    </div>
  );
}

export default Register;
