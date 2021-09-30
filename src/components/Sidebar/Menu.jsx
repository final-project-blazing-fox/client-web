// import { useState, useEffect } from 'react'
import { FaCompass, FaCog } from "react-icons/fa";
import { AiFillDollarCircle } from "react-icons/ai";
import { ImExit } from "react-icons/im";
import { Link, useHistory } from "react-router-dom";
// import axios from 'axios'

function Menu({ className }) {
  const history = useHistory();
  // const [redirectUrl, setRedirectUrl] = useState('')
  const logoutHandler = () => {
    localStorage.clear();
    history.push("/login");
  };
  const userLocal = JSON.parse(localStorage.user);

  // useEffect(() => {}, [redirectUrl])

  // const onSubmit = (user) => {
  //   axios({
  //     url: 'https://coder-premium-user.herokuapp.com/premium',
  //     method: 'post',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     data: {
  //       price: 100000,
  //       user,
  //     },
  //   })
  //     .then(({ data }) => {
  //       setRedirectUrl(data.redirect_url)
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  //   return redirectUrl
  // }

  // if (redirectUrl) {
  //   return (
  //     <>
  //       <p>{JSON.stringify(userLocal, null, 2)}</p>
  //       <Link to={{ pathname: redirectUrl }} target="_blank">
  //         Click Here to Continue
  //       </Link>
  //     </>
  //   )
  // }

  return (
    <div className={`${className} self-start`}>
      <Link
        to="/"
        className="flex text-white opacity-50 self-start mt-3 items-center gap-3 cursor-pointer hover:opacity-100"
      >
        <FaCompass />
        <span>Discover</span>
      </Link>
      <Link
        to="/settings"
        className="flex text-white opacity-50 self-start mt-3 items-center gap-3 cursor-pointer hover:opacity-100"
      >
        <FaCog />
        <span>Settings</span>
      </Link>
      {!userLocal.is_premium && (
        <Link
          to="/register-premium"
          className="flex text-white opacity-50 self-start mt-3 items-center gap-3 cursor-pointer hover:opacity-100"
        >
          <AiFillDollarCircle />
          <span>Subscribe</span>
        </Link>
      )}
      <button
        onClick={logoutHandler}
        className="flex text-white opacity-50 self-start mt-3 items-center gap-3 cursor-pointer hover:opacity-100"
      >
        <ImExit />
        Log out
      </button>
    </div>
  );
}

export default Menu;
