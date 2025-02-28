import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const LandingPageLayout = ({ title, children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* ✅ Navbar selalu tetap di atas saat scroll */}
            <div className="fixed top-0 left-0 w-full z-50">
                <Navbar />
            </div>

            {/* ✅ Tambahkan padding-top agar tidak tertutup Navbar */}
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
