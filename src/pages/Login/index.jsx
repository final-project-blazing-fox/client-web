import { useForm } from "react-hook-form";

import Title from "../../components/Sidebar/Title";
import Register from "./RegisterBox";
import validateEmail from "../../utils/validateEmail";
import axios from "axios";
import firebase from "firebase";
import { useState } from "react";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const db = firebase.firestore();
  const [userFirebaseCheck, setUserFirebaseCheck] = useState(false);
  const [user, setUser] = useState({});

  const onSubmit = async (inputs) => {
    await axios({
      url: "https://final-project-user-profile.herokuapp.com/login",
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: inputs,
    })
      .then(({ data }) => {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("uid", data.id);
        localStorage.setItem("matches", 0);
        setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });

    await firebase
      .auth()
      .signInWithEmailAndPassword(inputs.email, inputs.password)
      .then((data) => {
        console.log(data.user.uid);
        db.collection("users")
          .doc(data.user.uid)
          .update({
            isOnline: true,
          })
          .then(() => {
            const loggedInUser = {
              fullName: user.full_name,
              uid: data.user.uid,
              email: user.email,
            };

            localStorage.setItem("firebase_user", JSON.stringify(loggedInUser));
          });
      })
      .catch((error) => {
        console.log(error.message);
        setUserFirebaseCheck(true);
      });

    if (userFirebaseCheck) {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(inputs.email, inputs.password)
        .then((data) => {
          db.collection("users")
            .doc(data.user.uid)
            .set({
              fullName: user.full_name,
              uid: data.user.uid,
              localID: user.id,
              createdAt: new Date(),
              isOnline: true,
            })
            .then(() => {
              const loggedInUser = {
                fullName: user.full_name,
                uid: data.user.uid,
                email: user.email,
              };

              localStorage.setItem(
                "firebase_user",
                JSON.stringify(loggedInUser)
              );
            });
        });
    }
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
    </div>
  );
}

export default Login;
