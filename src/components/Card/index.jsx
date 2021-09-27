function Card({ role }) {
  return (
    <div className="w-full">
      <div className="bg-light-gray rounded-lg">
        <div
          className="bg-origin-border aspect-w-4 aspect-h-3 w-full bg-contain bg-no-repeat bg-center"
          style={{
            backgroundImage: "url(https://i.stack.imgur.com/AZUmQ.jpg)",
          }}
        ></div>
      </div>
      <div className="border-2 border-custom-green bg-white rounded-lg p-2 mt-2 text-center cursor-pointer hover:bg-gray-300">
        <p className="text-2xl text-custom-gray">Budi</p>
        <p className="text-light-gray">{role}</p>
      </div>
    </div>
  );
}

Card.defaultProps = {
  role: "Coder",
};

export default Card;
