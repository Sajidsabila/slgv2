import { useEffect, useRef } from "react";

const Page4 = ({ nextPage, previusPage, muted }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const tryPlay = async () => {
        try {
          await video.play();
        } catch (err) {
          console.warn("Autoplay gagal di Page4:", err);
        }
      };

      tryPlay();
    }
  }, []);

  // Sync mute/unmute saat prop muted berubah
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
    }
  }, [muted]);

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden relative">
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/videos/3.mp4"
        autoPlay
        loop
        muted={muted}
        playsInline
      ></video>

      <div className="absolute top-0 left-0 w-full h-full flex flex-row justify-between items-center px-6 z-20">
        <button
          onClick={previusPage}
          className="bg-red-500 text-white px-7 py-2 rounded-lg shadow-lg cursor-pointer gotham"
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          className="bg-blue-500 text-white px-7 py-2 rounded-lg shadow-lg cursor-pointer gotham"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Page4;
