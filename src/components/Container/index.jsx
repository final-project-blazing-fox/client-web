function Container({ children }) {
  return (
    <div className="h-screen w-screen font-poppins grid grid-cols-1 lg:grid-cols-desktop">
      {children}
    </div>
  );
}

export default Container;
