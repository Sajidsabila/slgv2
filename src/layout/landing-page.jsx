import { use, useEffect } from "react";
import Header from "../components/header";
import Navbar from "../components/Navbar/index";
import Footer from "../components/footer";
import FloatingChatButton from "../components/floatingButton";
import { useLocation, useNavigate } from "react-router-dom";

const LandingPageLayout = ({ title, children }) => {
  const location = useLocation();

  useEffect(() => {
    const handleKeyUpF12 = (e) => {
      if (e.key === "F12") {
        alert("F12 is disabled");
        e.preventDefault();
      }
    };
    document.addEventListener("keyup", handleKeyUpF12);
    return () => document.removeEventListener("keyup", handleKeyUpF12);
  }, []);

  // useEffect(() => {
  //   if (!sessionStorage.getItem("token")) return;
  //   const resfreshToken = async () => {
  //     const response = await refreshAccesToken();
  //   };
  //   resfreshToken();
  // }, []);
  return (
    <>
      <div className="flex flex-col min-h-screen w-full">
        <div className="sticky top-0 left-0 w-full z-[100]">
          <Navbar />
        </div>

        <div className="flex flex-col flex-1 pt-16">
          <Header />

          <main className="flex-1 px-4 py-6 h-auto bg-slate-300 ">
            {children}
          </main>
        </div>

        <Footer className="relative z-1" />
      </div>

      <FloatingChatButton className="fixed bottom-4 right-4" />
    </>
  );
};

export default LandingPageLayout;
