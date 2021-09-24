function MainContainer({ children }) {
  return (
    <div className="bg-custom-gray py-6 px-4 flex flex-col items-center">
      {children}
    </div>
  );
}

export default MainContainer;
