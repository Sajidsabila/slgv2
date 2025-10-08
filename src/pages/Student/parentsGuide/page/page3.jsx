import { useState, useEffect, useRef } from "react";

const Page3 = ({ handleClick, muted }) => {
  const [selectedOption2, setSelectedOption2] = useState(
    sessionStorage.getItem("selectedOption2") || null
  );
  const [showOptions, setShowOptions] = useState(false);
  const videoRef = useRef(null);

  const listOptions2 = [
    "Kesenangan/ rekreasi (fun/recreational purpose)",
    "Mengasah keterampilan/prestasi di luar akademis",
    "Menjajaki peluang karir di masa depan (profesional)",
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOptions(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      const tryPlay = async () => {
        try {
          await video.play();
        } catch (err) {
          console.warn("Autoplay gagal di Page3:", err);
        }
      };

      tryPlay();
    }
  }, []);

  // Sync mute/unmute setiap kali prop muted berubah
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
    }
  }, [muted]);

  const handleSelect = (option) => {
    setSelectedOption2(option);
    sessionStorage.setItem("selectedOption2", option);
  };

  return (
    <div className="relative w-screen h-screen flex flex-col overflow-hidden">
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        src="/videos/2.mp4"
        autoPlay
        muted={muted}
        loop
        playsInline
      />

      {showOptions && (
        <div className="relative flex flex-col items-center justify-center h-full gap-10 px-6 z-10 fadeinanimation">
          {/* Teks Desktop */}
          <div className="hidden lg:flex flex-col space-y-6 items-center justify-center">
            <p className="hidden lg:block text-outline text-xl md:text-6xl font-extrabold text-center gotham">
              Apa Prioritas Utama Tujuan
            </p>
            <p className="text-outline text-xl md:text-6xl font-extrabold text-center gotham">
              Anak/Diri Anda Belajar Musik
            </p>
            <p className="w-auto px-10 bg-red-600 text-sm md:text-3xl font-medium py-2 text-white rounded-xl gotham">
              ( Pilih salah satu dari pilihan berikut )
            </p>
          </div>

          {/* Teks Mobile */}
          <div className="flex flex-col items-center lg:hidden relative top-10 border-white ">
            <p className="text-xl font-extrabold gotham mt-10 text-outline-sm">
              Apa Prioritas Utama Tujuan Anak/Diri Anda Belajar Musik
            </p>
            <p className="w-auto px-6 bg-red-600 text-base sm:text-lg font-medium py-2 text-white rounded-xl mt-2">
              ( Pilih salah satu dari pilihan berikut )
            </p>
          </div>

          {/* Pilihan */}
          <div className="flex flex-row gap-6  justify-center">
            {listOptions2.map((option, index) => (
              <p
                key={index}
                onClick={() => handleSelect(option)}
                className={`w-full max-w-md text-center sm:text-base md:text-md lg:text-xl font-semibold 
                  py-3 lg:py-4 px-6 rounded-2xl shadow-lg transition-all duration-300 cursor-pointer 
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

          {selectedOption2 && (
            <button
              className="bg-red-600 text-white font-semibold py-3 lg:py-4 px-8 rounded-2xl shadow-lg 
                         hover:bg-red-700 transition-all duration-300 gotham relative md:bottom-20 lg:bottom-0"
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
