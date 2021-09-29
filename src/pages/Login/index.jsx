import { useForm } from "react-hook-form";

import Title from "../../components/Sidebar/Title";
import Register from "./RegisterBox";
import validateEmail from "../../utils/validateEmail";
import axios from "axios";
import firebase from "firebase";
import { useState } from "react";
import { injectStyle } from "react-toastify/dist/inject-style";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";

// CALL IT ONCE IN YOUR APP
if (typeof window !== "undefined") {
  injectStyle();
}

const baseUrl = "https://final-project-user-profile.herokuapp.com";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const history = useHistory();

  const db = firebase.firestore();
  const [userFirebaseCheck, setUserFirebaseCheck] = useState(false);
  const [user, setUser] = useState({});

  const onSubmit = async (inputs) => {
    const { data } = await axios({
      url: baseUrl + "/login",
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: inputs,
    });
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("uid", data.id);
    setUser(data);

    try {
      const firebaseData = await firebase
        .auth()
        .signInWithEmailAndPassword(inputs.email, inputs.password);

      await db.collection("users").doc(firebaseData.user.uid).update({
        isOnline: true,
      });

      const loggedInUser = {
        fullName: data.full_name,
        uid: firebaseData.user.uid,
        email: data.email,
      };

      localStorage.setItem("firebase_user", JSON.stringify(loggedInUser));
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        console.error(err);
        const firebaseData = await firebase
          .auth()
          .createUserWithEmailAndPassword(inputs.email, inputs.password);

        db.collection("users").doc(firebaseData.user.uid).set({
          fullName: data.full_name,
          uid: firebaseData.user.uid,
          localID: data.id,
          createdAt: new Date(),
          isOnline: true,
        });
        const loggedInUser = {
          fullName: data.full_name,
          uid: firebaseData.user.uid,
          email: data.email,
        };
        localStorage.setItem("firebase_user", JSON.stringify(loggedInUser));
        toast.dark("Please try again...");
      }
    }
    history.push("/");
  };

  return (
    <div className="flex flex-col gap-3 h-screen justify-center items-center font-poppins bg-custom-gray lg:bg-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full lg:w-1/3 bg-custom-gray rounded-md py-5"
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
      <Register />
      <ToastContainer />
    </div>
  );
}

export default Login;
