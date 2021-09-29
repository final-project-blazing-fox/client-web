import { Link } from "react-router-dom";

function CreatePostContainer({ className }) {
  return (
    <div
      className={`${className} bg-light-gray w-full rounded-md p-4 mt-6 mb-2`}
    >
      {/* Name and status */}
      <div className="flex flex-col">
        <Link
          to="/settings"
          className="flex items-center gap-1 text-white cursor-pointer hover:opacity-80"
        >
          <p>Ari Juanda</p>
        </Link>
        <div>
          <span
            className="text-green-100 bg-green-600 rounded-full px-3 py-1 uppercase tracking-widest font-bold"
            style={{ fontSize: "0.5rem" }}
          >
            Premium
          </span>
        </div>
      </div>
    </div>
  );
}

export default CreatePostContainer;
