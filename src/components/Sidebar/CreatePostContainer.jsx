import { FaAngleDown } from "react-icons/fa";

function CreatePostContainer() {
  return (
    <div className="bg-light-gray w-full rounded-md p-4 mt-6 mb-2">
      {/* Name and status */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1 text-white cursor-pointer hover:opacity-80">
          <p>Ari Juanda</p>
          <FaAngleDown className="text-xl" />
        </div>
        <div>
          <span
            className="text-green-100 bg-green-600 rounded-full px-3 py-1 uppercase tracking-widest font-bold"
            style={{ fontSize: "0.5rem" }}
          >
            Premium
          </span>
        </div>
      </div>
      <button className="text-white bg-custom-green rounded-full px-3 py-2 text-sm w-full mt-5 hover:opacity-80">
        Create Post
      </button>
    </div>
  );
}

export default CreatePostContainer;
