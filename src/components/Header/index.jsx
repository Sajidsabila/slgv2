const Header = ({ title }) => {
    return (
        <div className="w-full h-70 py-10 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white flex items-center justify-center shadow-lg">
            <h1 className="md:text-5xl text-2xl font-bold tracking-wide text-center">{title}</h1>
        </div>
    );
};

export default Header;
