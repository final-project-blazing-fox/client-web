import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/Container";
import Sidebar from "../../components/Sidebar";

function RegisterPremium() {
  const user = JSON.parse(localStorage.user);
  console.log(user);
  const [redirectUrl, setRedirectUrl] = useState("");
  useEffect(() => {}, [redirectUrl]);
  const onSubmit = (user) => {
    axios({
      url: "https://coder-premium-user.herokuapp.com/user/premium",
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        price: 100000,
        user,
      },
    })
      .then(({ data }) => {
        setRedirectUrl(data.redirect_url);
      })
      .catch((error) => {
        console.log(error);
      });
    return redirectUrl;
  };
  if (redirectUrl) {
    return (
      <Container>
        <Sidebar />
        <div className="flex flex-col justify-center items-center h-screen gap-4">
          <div>
            <p>Name: {user.full_name}</p>
            <p>Email: {user.email}</p>
          </div>
          <Link
            className="bg-green-400 hover:bg-green-500 px-4 py-2 rounded-md text-white text-center"
            to={{ pathname: redirectUrl }}
            target="_blank"
          >
            Click Here to Continue
          </Link>
        </div>
      </Container>
    );
  }
  return (
    <div className="flex justify-center items-center flex-col h-screen gap-4 px-4">
      <p className="text-center text-xl">
        Only Rp. 100.000 for unlimited access, Subscribe Now
      </p>
      <button
        className="bg-green-400 text-xl rounded-md px-4 py-1 text-white hover:bg-green-500 w-44"
        onClick={() => onSubmit(user)}
      >
        Subscribe
      </button>
      <Link
        className="bg-red-400 text-xl rounded-md px-4 py-1 text-white hover:bg-red-500 w-44 text-center"
        to="/"
      >
        Cancel
      </Link>
    </div>
  );
}

export default RegisterPremium;
