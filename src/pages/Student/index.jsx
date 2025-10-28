import LandingPageLayout from "../../layout/landing-page";

const Index = () => {
    return (
        <LandingPageLayout>
            <div className="container mx-auto px-4 py-10 bg-white w-full max-w-4xl rounded-xl shadow-lg">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mx-6">
                 
                    <img
                        src="https://placehold.co/200x200"
                        alt="Foto Profil Siswa"
                        className="w-40 h-40 object-cover rounded-full border-4 border-red-400 shadow-md"
                    />

                  
                    <div className="w-full">

                     
                        <div  className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">NAMA LENGKAP</h2>
                                <p className="text-gray-600">Benidiktus Candra P.</p>

                                <h2 className="mt-4 text-lg font-semibold text-gray-800">NIS</h2>
                                <p className="text-gray-600">00000000001</p>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">KELAS</h2>
                                <p className="text-gray-600">PIANO - JC 1</p>

                                <h2 className="mt-4 text-lg font-semibold text-gray-800">POINT SISWA</h2>
                                <p className="text-gray-600">180 Point</p>
                            </div>
                        </div>

                    
                        <hr className="my-8 border-t border-gray-300" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">KELAS SELANJUTNYA</h2>
                                <p className="text-gray-600">
                                    Selasa, 19 Agustus 2020<br />
                                    15.00 - 16.00 WIB
                                </p>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">STATUS PEMBAYARAN</h2>
                                <p className="text-green-600">Terbayar</p>
                            </div>
                        </div>

                       
                        <hr className="my-8 border-t border-gray-300" />

                      
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">EVENT SELANJUTNYA</h2>
                                <p className="text-gray-600">
                                    Rabu, 20 Agustus 2020<br />
                                    10.00 - 12.00 WIB
                                </p>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">Judul Event</h2>
                                <p className="text-gray-600">Webinar Motivasi Belajar</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LandingPageLayout>
    );
};

export default Index;
