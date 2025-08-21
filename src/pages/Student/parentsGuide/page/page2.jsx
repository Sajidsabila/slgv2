import React, { useEffect, useState } from "react";

const Page2 = ({ handleClick}) => {
  const [options, setOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    sessionStorage.getItem("selectedOption1") || null
  );
  

  const listOptions = [
    "Musik bermanfaat bagi kecerdasan kognitif (kemampuan matematis, bahasa, dsb)",
    "Meningkatkan kedisiplinan, keberanian berekspresi, dan percaya diri (soft-skill)",
    "Mengembangkan bakat dan minat anak",
    "Menambah keterampilan khusus di luar pelajaran sekolah",
    "Mengisi waktu luang anak dengan kegiatan positif",
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setOptions(true);
    }, 28000);

    return () => clearTimeout(timer);
  }, []);

 
  const handleSelect = (option) => {
    setSelectedOption(option);
    sessionStorage.setItem("selectedOption1", option); 
  };

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden relative">
      <video
        className="absolute top-0 left-0 w-full h-full md:object-cover object-contain -z-10"
        src="/1.mp4"
        autoPlay
        playsInline
      />

      <div className="absolute top-0 left-0 w-full h-full bg-black/40 -z-10" />

      {options && (
        <div className="flex flex-row ms-auto items-center justify-center h-full gap-8 px-6">
          <div className="flex flex-col gap-6">
            {listOptions.map((option, index) => (
              <p
                key={index}
                onClick={() => handleSelect(option)}
                className={`w-full max-w-md text-center text-sm sm:text-base md:text-lg lg:text-xl font-semibold 
                  py-4 px-6 rounded-2xl shadow-lg transition-all duration-300 cursor-pointer fadeinanimation
                  ${
                    selectedOption === option
                      ? "bg-blue-700 text-white"
                      : "bg-white/90 hover:bg-gray-200"
                  }`}
              >
                {option}
              </p>
            ))}
          </div>

        {sessionStorage.getItem("selectedOption1") && (
          <button
            className="bg-blue-600 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg 
                       hover:bg-blue-700 transition-all duration-300"
            onClick={handleClick}
          >
            Next 
          </button>
        )}
          
        </div>
      )}
    </div>
  );
};

export default Page2;
