const Header = ({ title }) => {
  return (
    <header className="w-full h-40 bg-red-800 text-white flex items-center justify-center shadow-lg">
      <h1 className="text-2xl md:text-4xl  font-bold tracking-wide text-center px-4">
        {title}
      </h1>
    </header>
  );
};

export default Header;
