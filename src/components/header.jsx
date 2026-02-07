import "./slider.css";

const Header = () => {
  const images = [
    "/assets/smile_image/images_header4.png",
    "/assets/smile_image/images_header3.png",
    "/assets/smile_image/images_header2.png",
    "/assets/smile_image/images_header1.png",
  ];

  return (
    <header className="relative z-0 w-full h-auto text-white flex flex-col items-center justify-center shadow-lg">

      {/* Desktop view */}
      <div className="w-full md:flex hidden flex-row items-center justify-center  ">
        {images.map((image, index) => (
          <div className="w-full">
          <img
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            className="w-full object-cover rounded"
          />
          </div>
        ))}
      </div>

      {/* Mobile view */}
      <div className="md:hidden block slider">
        <div className="slides">
          {images.map((image, index) => (
            <div className="slide h-screen w-screen" key={index}>
              <img
                src={image}
                alt={`Image ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 w-full bg-red-800 h-16 font-semibold md:text-xl font-l flex items-center justify-center pointer-events-none">
        WELCOME TO SMI LEARNING SYSTEM
      </div>
    </header>
  );
};

export default Header;
