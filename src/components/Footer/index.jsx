import logo_sinegi from "../../assets/logosinergi.svg";

const Footer = () => {
    return (
        <footer className="w-full bg-gray-800 text-white mt-auto fixed bottom-0 left-0">
            {/* Bagian Footer Utama */}
            <div className="py-4">
                <div className="container mx-auto pl-4">
                    <img src={logo_sinegi} alt="Logo Sinegi" className="w-20 h-20 filter invert" />
                    <h1 className="text-lg">PT Sinergi Mandiri Cipta Indonesia</h1>
                    <div className="flex flex-row py-3 gap-5"></div>
                    <h3>Jl. Puri Anjasmoro Blok E1. No.21, Semarang - Jawa Tengah, Indonesia 50144</h3>
                    <h3><span className="font-bold">E : </span> sinergi@sekolahmusik.co.id</h3>
                    <h3><span className="font-bold">T : </span> +62 811 297 1117</h3>
                </div>
            </div>

            {/* Bagian "test" di bawah footer utama */}
            <div className="w-full bg-gray-300 text-black text-center py-2">
                <p className="font-bold"> &copy; All Rights Reserved. PT. Sinergi Mandiricipta Indonesia.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
