import { useState, useEffect } from "react";

const Page7 = () => {
  const [answers, setAnswers] = useState(true);
  const [showVidio, setShowVidio] = useState(false);

 
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVidio(true);
      setAnswers(false);
    }, 9000);
    return () => clearTimeout(timer);
  }, []);

  const options1 = sessionStorage.getItem("selectedOption1");
  const options2 = sessionStorage.getItem("selectedOption2");

  return (
    <div className="w-full h-screen flex items-center justify-center relative overflow-hidden">
      {answers && (
        <>
          <audio autoPlay loop>
            <source src="/backsound/5.mp3" type="audio/mpeg" />
            Browser kamu tidak mendukung audio.
          </audio>

          {/* Konten utama */}
          <div className="xl:w-[85dvw] lg:-w-[80dvw] md:w-[75dvw]  text-center space-y-6">
            <div>
              <h1 className="text-base sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl font-extrabold text-red-600">
                MARI KITA KEMBALI KE ALASAN & TUJUAN ANAK ANDA
              </h1>
              <h2 className="text-base sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl font-extrabold mt-2 text-red-600">
                BELAJAR MUSIK :
              </h2>
            </div>

            <div className="flex flex-col gap-6 text-left w-[100%]">
              <div>
                <label className="block mb-2 font-bold text-sm sm:text-base md:text-lg">
                  Mengapa anda mengirimkan anak anda les musik?
                </label>
                <input
                  type="text"
                  value={options1 || "test question"}
                  readOnly
                  className="w-full bg-stone-300 rounded-full px-4 text-sm sm:text-base font-medium sm:py-5 md:py-6 lg:py-7 lg:py-7 xl:py-7 ps-10"
                />
              </div>

              <div>
                <label className="block mb-2 font-bold text-sm sm:text-base md:text-lg">
                  Apa tujuan utama anak anda belajar musik?
                </label>
                <input
                  type="text"
                  value={options2 || "test question"}
                  readOnly
                  className="w-full bg-stone-300 rounded-full px-4 text-sm sm:text-base font-medium sm:py-5 md:py-6 lg:py-7 lg:py-7 xl:py-7 ps-10 ps-10"
                />
              </div>
            </div>
          </div>

          {/* Gambar kiri */}
          <img
            src="/images/image_page_7.1.png"
            alt=""
            className="absolute xl:w-60 lg:w-60 sm:w-45  -translate-x-1/2 xl:top-90  left-15 lg:top-55 z-1 sm:top-20"
          />

          {/* Gambar kanan */}
          <img
            src="/images/image_page_7.2.png"
            alt=""
            className="absolute xl:w-60 lg:w-60 sm:w-45  translate-x-1/2 xl:top-90 right-20 lg:top-55 sm:top-20 z-0"
          />
        </>
      )}

      {showVidio && (
        <div className="absolute inset-0 flex items-center justify-center">
          <video
            className="w-full h-full object-cover"
            src="/videos/7.mp4"
            autoPlay
            playsInline
          />
        </div>
      )}
    </div>
  );
};

export default Page7;
