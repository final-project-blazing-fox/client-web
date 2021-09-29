import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainContainer from "./MainContainer";
import Title from "./Title";
import CreatePostContainer from "./CreatePostContainer";
import Menu from "./Menu";
import { GiHamburgerMenu } from "react-icons/gi";
import firebase from "firebase";

function Sidebar() {
  const userdata = localStorage.firebase_user
    ? JSON.parse(localStorage.firebase_user)
    : 1;
  const [onlineUser, setOnlineUser] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  // const [users, setUsers] = useState([])

  // useEffect(() => {
  //   axios
  //     .get(`${baseUrl}/user`, {
  //       headers: {
  //         access_token: JSON.parse(localStorage.getItem('user')).access_token,
  //       },
  //     })
  //     .then((results) => {
  //       setUsers(results.data)
  //     })
  // }, [])

  const menuHandler = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const db = firebase.firestore();

    db.collection("users").onSnapshot((querySnapshot) => {
      const users = [];
      querySnapshot.forEach(function (doc) {
        if (doc.data().uid !== userdata.uid) {
          users.push(doc.data());
        }
      });

      setOnlineUser(users);
    });
  }, []);

  const arrlocal = localStorage.matches ? localStorage.matches : [];

  const matchUser = onlineUser.filter((user) =>
    arrlocal.includes(user.localID)
  );

  return (
    <MainContainer>
      <div className="flex justify-between items-center w-full">
        <Title />
        <div onClick={menuHandler}>
          <GiHamburgerMenu className="text-white lg:hidden" size={32} />
        </div>
      </div>
      <CreatePostContainer className={`${!showMenu && "hidden"} lg:block`} />
      <Menu className={`${!showMenu && "hidden"} lg:block`} />
      <div
        className={`${
          !showMenu && "hidden"
        } lg:flex flex-col items-start justify-start text-gray-300 mt-5 border-t-2 border-gray-300 w-full pt-5`}
      >
        <p className="text-xl text-gray-500">Chat</p>
        {onlineUser
          ? matchUser.map((online, index) => {
              return (
                <div
                  key={online.uid}
                  className="cursor-pointer mt-2 hover:text-gray-50"
                >
                  <Link to={`/chat/${online.uid}`}>{online.fullName}</Link>
                </div>
              );
            })
          : null}
      </div>
    </MainContainer>
  );
}

export default Sidebar;
