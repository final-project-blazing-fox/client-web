function Image({ url }) {
  return (
    <div className="bg-light-gray rounded-lg">
      <div
        className="bg-origin-border aspect-w-4 aspect-h-3 w-full bg-contain bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(${url})`,
        }}
      ></div>
    </div>
  );
}

export default Image;
