import { RiSearch2Line } from "react-icons/ri";

function SearchBox() {
  return (
    <div className="w-80 relative bg-gray-200 rounded-full px-2 py-1 text-gray-400 focus-within:text-light-gray focus-within:ring-2 focus-within:ring-light-gray">
      <RiSearch2Line className="text-2xl absolute top-2 left-3" />
      <input
        type="text"
        className="ml-7 px-2 py-1 w-5/6 bg-gray-200 outline-none"
        placeholder="Search name"
      />
    </div>
  );
}

export default SearchBox;
