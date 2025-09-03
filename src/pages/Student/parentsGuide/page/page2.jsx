import React, { useEffect, useState } from "react";

const Page2 = ({ handleClick }) => {
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
    }, 1000);

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
        src="/videos/01.b.mp4"
        loop
        autoPlay
        playsInline
      />
      {options && (
        <div className="flex flex-col md:flex-row items-center justify-between h-screen px-8  fadeinanimation">

          <div className="text-left max-w-xxl space-y-6  ms-9">

            <p className="text-outline text-xl md:text-6xl font-extrabold gotham">Mengapa Anda</p>
            <p className="text-outline text-xl md:text-6xl font-extrabold gotham">mengirimkan</p>
            <p className="text-outline text-xl md:text-6xl font-extrabold gotham">anak/diri Anda</p>
            <p className="text-outline text-xl md:text-6xl font-extrabold gotham">les musik?</p>

            <p className="w-auto bg-red-600 text-white ps-2 pe-10 text-sm md:text-3xl py-2 rounded-lg">Pilih salah satu dari Pilihan berikut ini</p>
        </div>

      

 
          <div className="flex flex-col items-center gap-6">
            {listOptions.map((option, index) => (
              <p
                key={index}
                onClick={() => handleSelect(option)}
                className={`w-full max-w-md text-center text-sm sm:text-base md:text-lg lg:text-xl font-semibold 
                  py-4 px-6 rounded-2xl shadow-lg transition-all duration-300 cursor-pointer 
                  ${
                    selectedOption === option
                      ? "bg-blue-700 text-white"
                      : "bg-white/90 hover:bg-gray-200"
                  }`}
              >
                {option}
              </p>
            ))}

            {sessionStorage.getItem("selectedOption1") && (
              <button
                className="bg-red-600 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg 
                           hover:bg-red-700 transition-all duration-300 ms-auto"
                onClick={handleClick}
              >
                Lanjut 
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page2;
