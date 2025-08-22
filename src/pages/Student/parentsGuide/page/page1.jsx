import { useEffect, useState } from "react";

const Page1 = ({ handleClick }) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      {/* Fullscreen video */}
      <video
        className="absolute top-0 left-0 w-full h-full md:object-cover object-contain"
        src="/0.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

     
   

    
      {showButton && (
        <button
          onClick={handleClick}
          className="px-12 py-3 rounded-2xl bg-red-600 text-white 
          text-xl font-bold shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2
           -translate-y-1/2 transition-all duration-300 hover:bg-red-700 hover:scale-105 fadeinanimation"
        >
          START
        </button>
      )}
    </div>
  );
};

export default Page1;
