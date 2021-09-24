function MainContainer({ children }) {
  return (
    <div
      className="h-screen w-screen font-poppins grid grid-cols-2"
      style={{ gridTemplateColumns: "20% 1fr" }}
    >
      {children}
    </div>
  );
}

export default MainContainer;
