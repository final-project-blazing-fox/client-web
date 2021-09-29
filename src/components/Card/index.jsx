import { FaHeart, FaGithub, FaLinkedin } from "react-icons/fa";
import { FcDribbble } from "react-icons/fc";
import Image from "../Image";

function Card({
  role,
  color = "text-gray-400",
  onClickFav,
  full_name,
  main_card_showoff,
  portfolio_link,
  social_media_link,
  id,
  onLike,
  isPremium,
}) {
  const handleLike = (id) => {
    onClickFav(id);
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
        className="flex flex-col lg:grid lg:grid-cols-2 gap-2"
        style={{ gridTemplateColumns: "80% 1fr" }}
      >
        <div className="border-2 border-custom-green bg-white rounded-lg p-2 mt-2 text-center flex flex-col gap-2">
          <p className="text-2xl text-custom-gray truncate">{full_name}</p>
          <p className="text-light-gray text-xl truncate">{role}</p>
          <div className="flex justify-center gap-3">
            <a
              href={portfolio_link}
              target="_blank"
              rel="noreferrer"
              className="text-gray-600 hover:text-black"
            >
              {role === "coder" ? (
                <FaGithub size={32} />
              ) : (
                <FcDribbble size={32} />
              )}
            </a>
            <a
              href={social_media_link}
              target="_blank"
              rel="noreferrer"
              className={`text-gray-600 hover:text-blue-600 ${
                !isPremium && "hidden"
              }`}
            >
              <FaLinkedin size={32} />
            </a>
          </div>
        </div>
        <div
          className={`border-2 border-pink-300 cursor-pointer hover:text-pink-400 ${color} rounded-md flex justify-center items-center p-4 mt-2`}
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
