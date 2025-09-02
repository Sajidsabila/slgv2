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
          <div className="flex flex-col space-y-10 item-center justify-center">
            <p className="text-outline text-xl md:text-6xl font-extrabold text-center">Apa Prioritas Utama Tujuan </p>

            <p className="text-outline text-xl md:text-6xl font-extrabold  text-center">Anak/Diri Anda Belajar Music</p>

        
          </div>
              <p className="w-auto px-10 bg-red-600 text-xl md:text-3xl font-medium py-2 text-white rounded-xl">Anak/Diri Anda Belajar Music</p>
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
          {sessionStorage.getItem("selectedOption2") && (
            <button
              className="bg-red-600  text-white font-semibold py-4 px-8 rounded-2xl shadow-lg 
                         hover:bg-red-700 transition-all duration-300"
              onClick={handleClick}
            >
             Lanjut 
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Page3;
