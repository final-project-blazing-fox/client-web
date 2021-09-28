import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function RegisterPremium() {
  const user = {
    //replace with user state
    id: 1,
    full_name: "Abdullah A",
    email: "test@mail.com",
    phone: "phone",
  };
  const [redirectUrl, setRedirectUrl] = useState("");
  useEffect(() => {}, [redirectUrl]);
  const onSubmit = (user) => {
    axios({
      url: "http://localhost:3000/user/premium",
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
      <>
        <p>{JSON.stringify(user, null, 2)}</p>
        <Link to={{ pathname: redirectUrl }} target="_blank">
          Click Here to Continue
        </Link>
      </>
    );
  }
  return (
    <>
      <p>Only Rp. 100.000 for unlimited access, Subscribe Now</p>
      <button onClick={() => onSubmit(user)}>Subscribe</button>
    </>
  );
}

export default RegisterPremium;
