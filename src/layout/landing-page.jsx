import { useEffect } from "react";
import Header from "../components/Header/index";
import Navbar from "../components/Navbar/index";
import Footer from "../components/Footer/index";
import FloatingChatButton from "../components/Button/floatingButton";

const LandingPageLayout = ({ title, children }) => {
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

  return (
    <>
      <div className="flex flex-col min-h-screen">

        <div className="fixed top-0 left-0 w-full z-50">
          <Navbar />
        </div>


        <div className="pt-16 flex flex-col flex-1">
          <Header title={title} />

          <main className="flex-1 px-4 py-6">
            {children}
          </main>

          <Footer />
        </div>
      </div>

      <FloatingChatButton className="fixed bottom-4 right-4" />
    </>
  );
};

export default LandingPageLayout;
