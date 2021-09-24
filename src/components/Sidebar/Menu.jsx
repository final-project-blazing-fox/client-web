import { FaCompass, FaCog } from "react-icons/fa";

function Menu() {
  return (
    <>
      <div className="flex text-white opacity-50 self-start mt-3 items-center gap-3 cursor-pointer hover:opacity-100">
        <FaCompass />
        <span>Discover</span>
      </div>
      <div className="flex text-white opacity-50 self-start mt-3 items-center gap-3 cursor-pointer hover:opacity-100">
        <FaCog />
        <span>Settings</span>
      </div>
    </>
  );
}

export default Menu;
