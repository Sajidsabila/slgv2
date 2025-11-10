import { useEffect, useRef, useState } from "react";
import { PauseCircleOutlined, PlayCircleOutlined } from "@ant-design/icons";

const Page2a = ({ muted, onNext }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [sisaWaktu, setSisaWaktu] = useState(20500); 
  const timerRef = useRef(null);
  const waktuMulaiRef = useRef(null);

  // State untuk visibility icon saat cursor bergerak
  const [showControls, setShowControls] = useState(false);
  const hideControlsTimeout = useRef(null);

 
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const tryPlay = async () => {
        try {
          await video.play();
          setIsPlaying(true);
        } catch (err) {
          console.warn("Autoplay gagal di Page2a:", err);
          setIsPlaying(false);
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


  const handlePlay = () => {
    setIsPlaying(true);
    waktuMulaiRef.current = Date.now();
    timerRef.current = setTimeout(() => {
      onNext?.(); 
    }, sisaWaktu);
  };


  const handlePause = () => {
    setIsPlaying(false);
    clearTimeout(timerRef.current);
    const durasiBerjalan = Date.now() - waktuMulaiRef.current;
    setSisaWaktu((prev) => prev - durasiBerjalan);
  };

 
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    handlePlay(); // Jalankan timer pertama kali

    return () => {
      clearTimeout(timerRef.current);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  // Klik icon play/pause di tengah
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };


  const handleMouseMove = () => {
    setShowControls(true);

   
    if (hideControlsTimeout.current) clearTimeout(hideControlsTimeout.current);

    hideControlsTimeout.current = setTimeout(() => {
      setShowControls(false);
    }, 1000); 
  };

  return (
    <div
      className="w-screen h-screen flex flex-col overflow-hidden relative"
      onMouseMove={handleMouseMove}
    >
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/videos/01.a.mp4"
        autoPlay
        muted={muted}
        playsInline
      ></video>

      {/* Icon Play / Pause di tengah, muncul saat cursor bergerak */}
      {showControls && (
        <div
          className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer bg-black/0 hover:bg-black/20 transition-colors duration-300"
          onClick={togglePlay}
        >
          {isPlaying ? (
            <PauseCircleOutlined
              style={{ fontSize: "80px", color: "white", opacity: 0.9 }}
            />
          ) : (
            <PlayCircleOutlined
              style={{ fontSize: "80px", color: "white", opacity: 0.9 }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Page2a;
