import { useEffect, useLayoutEffect, useState } from "react";
import Page1 from "./page/page1";
import Page2 from "./page/page2";
import Page3 from "./page/page3";
import Page4 from "./page/page4";
import Page6 from "./page/page6";
import RotateVidio from "./page/rotateVidio";
import Page2a from "./page/page2.a";
import Page5 from "./page/page5";
import Page7 from "./page/page7";
import Page8 from "./page/page8";
import { FloatButton } from "antd";
import { SoundOutlined, AudioMutedOutlined } from "@ant-design/icons";
import RuleIndicator from "./ruleIndikator";

const ParentsGuide = () => {
  const [page, setPage] = useState(() => {
    const stored = sessionStorage.getItem("page");
    return !stored || stored === "0" ? "1" : stored;
  });

  const [isLandscape, setIsLandscape] = useState(window.innerWidth > window.innerHeight);
  const [isMobile, setIsMobile] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const mobileCheck = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    setIsMobile(mobileCheck);
  }, []);

  useLayoutEffect(() => {
    const updateOrientation = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };

    updateOrientation();

    window.addEventListener("resize", updateOrientation);
    window.addEventListener("orientationchange", updateOrientation);

    return () => {
      window.removeEventListener("resize", updateOrientation);
      window.removeEventListener("orientationchange", updateOrientation);
    };
  }, []);

  useEffect(() => {
    if (isMobile === null) return;

    if (isMobile) {
      if (!isLandscape) {
        setPage("0");
      } else {
        setPage((curPage) => {
          if (curPage === "0") {
            const saved = sessionStorage.getItem("page");
            return !saved || saved === "0" ? "1" : saved;
          }
          return curPage;
        });
      }
    } else {
      const saved = sessionStorage.getItem("page");
      setPage(!saved || saved === "0" ? "1" : saved);
    }
  }, [isMobile, isLandscape]);

  useEffect(() => {
    if (page !== "0") {
      sessionStorage.setItem("page", page);
    }
  }, [page]);

  const toggleMute = () => setIsMuted((prev) => !prev);

  useEffect(() => {
    const timer = setTimeout(() => {
      sessionStorage.removeItem("page");
    }, 3600000);
    return () => clearTimeout(timer);
  }, []);

  if (isMobile && !isLandscape) {
    return (
      <>
        <RotateVidio muted={isMuted} />
        <FloatButton
          type="primary"
          icon={isMuted ? <AudioMutedOutlined /> : <SoundOutlined />}
          tooltip={isMuted ? "Unmute Video" : "Mute Video"}
          onClick={toggleMute}
          style={{ right: 24, bottom: 24 }}
        />
      </>
    );
  }

  return (
  <>
   
    {isMuted && (
  <div
    className="blink"
    style={{
      fontSize: 16,
      color: "#333",
      textAlign: "center",
      fontWeight: "bold",
      position: "fixed",
      right: 180,
      bottom: 45,
      display: "flex",
      alignItems: "center",
      background: "rgba(255, 255, 255, 0.9)",
      padding: "8px 12px",
      borderRadius: "30px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      zIndex: 1000,
    }}
  >
    Klik tombol ini untuk aktifkan suara &gt;&gt;
  </div>
)}
      
      <FloatButton
        icon={isMuted ? <AudioMutedOutlined /> : <SoundOutlined />}
        tooltip={isMuted ? "Unmute Video" : "Mute Video"}
        onClick={toggleMute}
        style={{
           right: 100,
          bottom: 40,
          width: 50,
          height: 50,
        }}
      />
    {!["0", "1"].includes(page) && (
      <RuleIndicator currentPage={page} onNavigate={setPage} />
    )}

    {page === "1" && <Page1 handleClick={() => setPage("2a")} />}
    {page === "2a" && <Page2a muted={isMuted} onNext={() => setPage("2")} />}
    {page === "2" && <Page2 handleClick={() => setPage("3")} muted={isMuted} />}
    {page === "3" && <Page3 handleClick={() => setPage("4")} muted={isMuted} />}
    {page === "4" && (
      <Page4
        nextPage={() => setPage("5")}
        previousPage={() => setPage("3")}
        muted={isMuted}
      />
    )}
    {page === "5" && <Page5 muted={isMuted} onNext={() => setPage("6")} />}
    {page === "6" && <Page6 handleClick={() => setPage("7")} muted={isMuted} />}
    {page === "7" && <Page7 muted={isMuted} onNext={() => setPage("8")} />}
    {page === "8" && (
      <Page8
        muted={isMuted}
        onEnd={() => {
          sessionStorage.removeItem("page");
        }}
      />
    )}
  </>
);

};

export default ParentsGuide;
