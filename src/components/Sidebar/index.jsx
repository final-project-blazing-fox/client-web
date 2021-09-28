import { useState } from "react";
import { Link } from "react-router-dom";
import MainContainer from "./MainContainer";
import Title from "./Title";
import CreatePostContainer from "./CreatePostContainer";
import Menu from "./Menu";
import { GiHamburgerMenu } from "react-icons/gi";

function Sidebar() {
  const [showMenu, setShowMenu] = useState(false);

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
        <div className="cursor-pointer mt-2 hover:text-gray-50">
          <Link to="/chat">Rangga</Link>
        </div>
        <div className="cursor-pointer mt-2 hover:text-gray-50">
          <Link to="/chat">Abdul</Link>
        </div>
        <div className="cursor-pointer mt-2 hover:text-gray-50">
          <Link to="/chat">Arip</Link>
        </div>
        <div className="cursor-pointer mt-2 hover:text-gray-50">
          <Link to="/chat">Viki</Link>
        </div>
      </div>
    </MainContainer>
  );
}

export default Sidebar;
