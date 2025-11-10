import { useEffect, useRef, useState } from "react";
import { PauseCircleOutlined, PlayCircleOutlined } from "@ant-design/icons";

const Page5 = ({ muted, onNext }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [sisaWaktu, setSisaWaktu] = useState(140000); 
    const [showControls, setShowControls] = useState(false);
  const hideControlsTimeout = useRef(null);
  const timerRef = useRef(null);
  const waktuMulaiRef = useRef(null);


  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => console.warn("Autoplay gagal di Page5"));
    }
  }, []);

  // Update mute
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted]);

  // Fungsi untuk mulai timer
  const mulaiTimer = () => {
    waktuMulaiRef.current = Date.now();
    timerRef.current = setTimeout(() => {
      onNext?.(); // Pindah halaman
    }, sisaWaktu);
  };

  // Saat video play
  const handlePlay = () => {
    setIsPlaying(true);
    mulaiTimer();
  };

  // Saat video pause
  const handlePause = () => {
    setIsPlaying(false);
    clearTimeout(timerRef.current);
    const durasiBerjalan = Date.now() - waktuMulaiRef.current;
    setSisaWaktu((prev) => prev - durasiBerjalan);
  };

  // Daftarkan event listener ke video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    // Jalankan saat awal
    handlePlay();

    return () => {
      clearTimeout(timerRef.current);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

    const handleMouseMove = () => {
    setShowControls(true);

   
    if (hideControlsTimeout.current) clearTimeout(hideControlsTimeout.current);

    hideControlsTimeout.current = setTimeout(() => {
      setShowControls(false);
    }, 1000); 
  };

  // Klik manual play/pause di tengah
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.paused ? video.play() : video.pause();
  };

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden relative"  onMouseMove={handleMouseMove}>
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/videos/5.mp4"
        autoPlay
        muted={muted}
        playsInline
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
  );
};

export default Page5;
