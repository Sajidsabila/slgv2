import { useState, useEffect, useRef } from "react";

const Page7 = () => {
  const [answers, setAnswers] = useState(false);
  const [showVidio, setShowVidio] = useState(false);
  const [playAudio, setPlayAudio] = useState(false);
  const [pageButton, setPageButton] = useState(true);
  const audio = useRef(null);

  const handlePlay = () => {
    if (audio.current) {
      audio.current.play();
      setPlayAudio(true);
      setPageButton(false);
      setAnswers(true);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVidio(true);
      setAnswers(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-screen container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <audio ref={audio} loop>
        <source src="/5.mp3" type="audio/mpeg" />
        Browser kamu tidak mendukung audio.
      </audio>

      {pageButton && (
        <button
          className="px-5 bg-blue-600 py-2 rounded-lg text-white font-bold hover:bg-blue-700 hover:cursor-pointer"
          onClick={handlePlay}
        >
          Please Play Audio
        </button>
      )}

      {answers && (
        <>
          <div className="text-center mb-8 max-w-3xl mx-auto">
            <h1 className="text-base sm:text-lg md:text-2xl lg:text-2xl font-bold">
              MARI KITA KEMBALI KE ALASAN & TUJUAN ANAK ANDA
            </h1>
            <h2 className="text-base sm:text-lg md:text-2xl lg:text-2xl font-bold mt-2">
              BELAJAR MUSIK :
            </h2>
          </div>

          <div className="flex flex-col gap-6 w-full mx-auto">
            <div className="answer-1">
              <label className="block mb-2 font-bold text-sm sm:text-base md:text-lg">
                Mengapa anda mengirimkan anak anda les musik?
              </label>
              <input
                type="text"
                value="test question"
                readOnly
                className="w-full h-10 sm:h-12 bg-stone-300 rounded-full px-4 text-sm sm:text-base font-medium"
              />
            </div>

            <div className="answer-2">
              <label className="block mb-2 font-bold text-sm sm:text-base md:text-lg">
                Apa tujuan utama anak anda belajar musik?
              </label>
              <input
                type="text"
                value="test question"
                readOnly
                className="w-full h-10 sm:h-12 bg-stone-300 rounded-full px-4 text-sm sm:text-base font-medium"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Page7;
