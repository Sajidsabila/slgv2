const HeadingSection = ({ title, image }) => {
  return (
    <div className="relative flex items-center my-6 gap-3 px-2">
      <img src={image} className="w-12 h-12 shrink-0 z-1" />
      <div className="ms-4 relative right-10 z-0 w-[100%] md:w-95 bg-black text-white py-3 px-4 md:px-6 font-bold rounded-lg shadow-xl hover:scale-105 transition">
        {title}
      </div>
    </div>
  );
};

export default HeadingSection;
