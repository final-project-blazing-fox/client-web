import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainContainer from "./MainContainer";
import Title from "./Title";
import CreatePostContainer from "./CreatePostContainer";
import Menu from "./Menu";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";

function Sidebar() {
  const [showMenu, setShowMenu] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://final-project-user-profile.herokuapp.com/user", {
        method: "GET",
        headers: {
          access_token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZnVsbF9uYW1lIjoiTW9oYW1tYWQgSWRoYW0iLCJlbWFpbCI6Im1vaGFtbWFkaWRoYW0xNEBnbWFpbC5jb20iLCJpc19wcmVtaXVtIjp0cnVlLCJpYXQiOjE2MzI4MjQwMDF9.PkXy_5UOWEd8mcdcoJ8kPRmz6fzeLViVkY6THcoGw7Q",
        },
      })
      .then((results) => {
        setUsers(results.data);
      });
  }, []);

  const menuHandler = () => {
    setShowMenu(!showMenu);
  };

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
        {/* template */}
        <div>
          {localStorage.matches?.split(",").map((matchId) => {
            let matchedUser = users?.filter((user) => +user.id === +matchId)[0];
            return (
              <div
                key={matchedUser?.id}
                className="cursor-pointer mt-2 hover:text-gray-50"
              >
                <Link to="/chat">{matchedUser?.full_name}</Link>
              </div>
            );
          })}
        </div>
      </div>
    </MainContainer>
  );
}

export default Sidebar;
