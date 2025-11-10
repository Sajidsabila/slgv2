import React, { useEffect, useRef, useState } from "react";

const Page2 = ({ handleClick, muted }) => {
  const [options, setOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    sessionStorage.getItem("selectedOption1") || null
  );
  const videoRef = useRef(null);

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

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const tryPlay = async () => {
        try {
          await video.play();
        } catch (err) {
          console.warn("Autoplay gagal di Page2:", err);
        }
      };
      tryPlay();
    }
  }, []);

 
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
    }
  }, [muted]);

  const handleSelect = (option) => {
    setSelectedOption(option);
    sessionStorage.setItem("selectedOption1", option);
  };

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden relative">
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        src="/videos/01.b.mp4"
        loop
        playsInline
        muted={muted}
      />

      {options && (
        <div className="flex sm:flex-col lg:flex-row xl:flex-row 2xl:flex-row items-center justify-between h-screen px-8 fadeinanimation">
          
          {/* Bagian teks untuk layar besar */}
          <div className="hidden lg:block text-left max-w-xxl space-y-6 ms-9">
            <p className="text-outline text-xl md:text-6xl font-extrabold gotham">Mengapa Anda</p>
            <p className="text-outline text-xl md:text-6xl font-extrabold gotham">mengirimkan</p>
            <p className="text-outline text-xl md:text-6xl font-extrabold gotham">anak/diri Anda</p>
            <p className="text-outline text-xl md:text-6xl font-extrabold gotham">les musik?</p>

            <p className="w-auto bg-red-600 text-white ps-2 pe-10 text-sm md:text-3xl py-2 rounded-lg">
              Pilih salah satu dari Pilihan berikut ini
            </p>


            <img className="w-[200px] mt-5" src="/images/logo.png" alt="" />
          </div>

          {/* Bagian teks untuk HP/tablet */}
         <div className="flex flex-col items-center lg:hidden relative top-2 border-white ">
            <p className="text-xl font-extrabold  gotham mt-10 text-outline-sm">
              Apa Prioritas Utama Tujuan Anak/Diri Anda Belajar Musik
            </p>
            <p className="w-auto px-6 bg-red-600 text-base sm:text-lg font-medium py-2 text-white rounded-xl mt-1">
              ( Pilih salah satu dari pilihan berikut )
            </p>
          </div>

          {/* Pilihan jawaban */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-2">
            {listOptions.map((option, index) => (
              <p
                key={index}
                onClick={() => handleSelect(option)}
                className={`w-full max-w-xl text-center text-sm sm:text-base md:text-md lg:text-xl font-semibold sm:py-1 md:py-1
                  lg:py-4 xl:py-4 2xl:py-4 px-6 rounded-2xl shadow-lg transition-all duration-300 cursor-pointer 
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
                className="bg-red-600 text-white font-semibold py-2 px-8 rounded-2xl shadow-lg 
                           hover:bg-red-700 transition-all duration-300 gotham ms-auto"
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
