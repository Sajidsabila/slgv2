import { useEffect, useState, useRef } from "react";
import { PauseCircleOutlined, PlayCircleOutlined } from "@ant-design/icons";

const Page7 = ({ muted, onNext }) => {
  const [showVideo, setShowVideo] = useState(false);
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const hideControlsTimeout = useRef(null);

  const options1 = sessionStorage.getItem("selectedOption1");
  const options2 = sessionStorage.getItem("selectedOption2");

  // Tampilkan video setelah 5 detik dan pause audio
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(true);
      if (audioRef.current) audioRef.current.pause();

      if (videoRef.current) {
        videoRef.current.muted = muted;
        videoRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => console.warn("Autoplay gagal di Page7"));
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [muted]);

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted]);

 
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };


  const handleMouseMove = () => {
    setShowControls(true);
    if (hideControlsTimeout.current) clearTimeout(hideControlsTimeout.current);
    hideControlsTimeout.current = setTimeout(() => setShowControls(false), 1000);
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
     
       {!showVideo && (
        <>
          <audio ref={audioRef} autoPlay loop>
            <source src="/backsound/5.mp3" type="audio/mpeg" />
            Browser kamu tidak mendukung audio.
          </audio>

          <div className="xl:w-[85dvw] lg:-w-[80dvw] md:w-[75dvw] text-center space-y-6 absolute z-1">
            <div>
              <div className="sm:text-lg md:text-xl lg:text-2xl xl:text-6xl font-extrabold text-red-800">
                MARI KITA KEMBALI KE ALASAN & TUJUAN ANAK ANDA
              </div>
              <div className="text-base sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl font-extrabold mt-2 text-red-800">
                BELAJAR MUSIK :
              </div>
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
                  className="w-full bg-stone-300 rounded-full px-4 text-sm sm:text-base font-medium sm:py-5 md:py-6 lg:py-7 xl:py-7 ps-10"
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
                  className="w-full bg-stone-300 rounded-full px-4 text-sm sm:text-base font-medium sm:py-5 md:py-6 lg:py-7 xl:py-7 ps-10 ps-10"
                />
              </div>
            </div>
          </div>

          <img
            src="/images/image_page_7.1.png"
            alt=""
            className="absolute z-0 xl:w-60 lg:w-60 sm:w-45 -translate-x-1/2 xl:top-90 left-15 lg:top-55 sm:top-20"
          />

          <img
            src="/images/image_page_7.2.png"
            alt=""
            className="absolute z-0 xl:w-60 lg:w-60 sm:w-45 translate-x-1/2 xl:top-90 lg:right-22 lg:top-55 sm:top-20 sm:right-10"
          />
        </>
      )}

      {/* Video */}
      {showVideo && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            src="/videos/7.mp4"
            autoPlay
            playsInline
            muted={muted}
            controls={false}
            onEnded={onNext} 
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />

          {showControls && (
            <div
              className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer bg-black/0 hover:bg-black/20 transition-colors duration-300"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <PauseCircleOutlined style={{ fontSize: "80px", color: "white", opacity: 0.9 }} />
              ) : (
                <PlayCircleOutlined style={{ fontSize: "80px", color: "white", opacity: 0.9 }} />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Page7;
