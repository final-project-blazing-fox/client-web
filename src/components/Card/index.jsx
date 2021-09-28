import { FaHeart } from "react-icons/fa";
import Image from "../Image";

function Card({
  role,
  color = "text-gray-400",
  full_name,
  main_card_showoff,
  portfolio_link,
  social_media_link,
  id,
  onLike,
}) {
  const handleLike = (id) => {
    onLike(id);
  };

  return (
    <div className="w-full">
      <div className="bg-light-gray rounded-lg">
        <div className="bg-origin-border aspect-w-4 aspect-h-3 w-full bg-contain bg-no-repeat bg-center">
          {role === "coder" ? (
            <video controls="controls" src={main_card_showoff} />
          ) : (
            <Image url={main_card_showoff} />
          )}
        </div>
      </div>
      <div
        className="grid grid-cols-2 gap-2"
        style={{ gridTemplateColumns: "80% 1fr" }}
      >
        <div className="border-2 border-custom-green bg-white rounded-lg p-2 mt-2 text-center cursor-pointer hover:bg-gray-300">
          <p className="text-2xl text-custom-gray">{full_name}</p>
          <p className="text-light-gray">{role}</p>
          <p className="text-light-gray">{portfolio_link}</p>
          <p className="text-light-gray">{social_media_link}</p>
        </div>
        <div
          className={`border-2 border-pink-300 cursor-pointer hover:bg-pink-300 ${color} rounded-md flex justify-center items-center p-4 mt-2`}
          onClick={() => handleLike(id)}
        >
          <FaHeart size={30} />
        </div>
      </div>
    </div>
  );
}

Card.defaultProps = {
  role: "Coder",
};

export default Card;
