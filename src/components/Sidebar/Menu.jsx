import { FaCompass, FaCog } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import { Link } from "react-router-dom";

function Menu({ className }) {
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
      <button className="flex text-white opacity-50 self-start mt-3 items-center gap-3 cursor-pointer hover:opacity-100">
        <ImExit />
        Log out
      </button>
    </div>
  );
}

export default Menu;
