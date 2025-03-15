import Header from "../components/Header/index";
import Navbar from "../components/Navbar/index";
import Footer from "../components/Footer/index";

const LandingPageLayout = ({ title, children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="fixed top-0 left-0 w-full z-50">
                <Navbar />
            </div>

  
            <div className="pt-16">
                <Header title={title} />
                <main className="flex-1 px-4 py-6">
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default LandingPageLayout;
