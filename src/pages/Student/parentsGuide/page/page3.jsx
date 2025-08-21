import { useState, useEffect } from "react";

const Page3 = ({ handleClick }) => {
  const [selectedOption2, setSelectedOption2] = useState(
    sessionStorage.getItem("selectedOption2") || null
  );
  const [showOptions, setShowOptions] = useState(false);

  const listOptions2 = [
    "Kesenangan/ rekreasi (fun/ recreational purpose)",
    "Mengasah keterampilan/prestasi di luar akademis",
    "Menjajaki peluang karir di masa depan (profesional)",
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOptions(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleSelect = (option) => {
    setSelectedOption2(option);
    sessionStorage.setItem("selectedOption2", option);
  };

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden relative">
      {/* Background video */}
      <video
        className="absolute top-0 left-0 w-full h-full md:object-cover object-contain"
        src="/2.mp4"
        autoPlay
        playsInline
        muted
      />

      {/* Pilihan muncul setelah delay */}
      {showOptions && (
        <div className="relative flex flex-col items-center justify-center h-full gap-10 px-6 z-10">
          {/* List pilihan */}
          <div className="flex flex-col md:flex-row gap-6">
            {listOptions2.map((option, index) => (
              <p
                key={index}
                onClick={() => handleSelect(option)}
                className={`w-full max-w-md text-center text-sm sm:text-base md:text-lg lg:text-xl font-semibold 
                  py-4 px-6 rounded-2xl shadow-lg transition-all duration-300 cursor-pointer fadeinanimation
                  ${
                    selectedOption2 === option
                      ? "bg-blue-700 text-white"
                      : "bg-white/90 hover:bg-gray-200"
                  }`}
              >
                {option}
              </p>
            ))}
          </div>

          {/* Tombol Next */}
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

export default Page3;
