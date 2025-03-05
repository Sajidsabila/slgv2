import logo_simfoni from "../../assets/logowhite.svg";
import icon_location from "../../assets/icon/iconlocation.svg";
import icon_email from "../../assets/icon/iconemail.svg";
import icon_tel from "../../assets/icon/icontel.svg";
import icon_fb from "../../assets/icon/iconfb.svg";
import icon_ig from "../../assets/icon/iconinstagram.svg";
import icon_youtube from "../../assets/icon/iconyoutube.svg";
import icon_linkedin from "../../assets/icon/iconlinkedin.svg";
import googleplay from "../../assets/logo/logogoogleplay.svg";
import appstore from "../../assets/logo/logoappstore.svg";

const Footer = () => {
    return (
        <footer className="w-full bg-gray-900 text-white mt-auto">
            <div className="py-6 px-4 md:px-8 lg:px-16">
            <div className="container mx-auto ">
      <img 
        src={logo_simfoni} 
        alt="Logo Simfoni" 
        width="200px"
        height="200px"
        className="w-[200px] h-auto py-5 md:mx-7 mx-9" 
        style={{ filter: "brightness(0) invert(1)" }} 
      />
      <div className="flex flex-col md:flex-row justify-between items-start space-y-6 md:space-y-0">
        {/* Kolom kiri - Informasi Perusahaan */}
        <div className="w-full md:w-2/3"> 
          <h1 className="md:text-lg text-xl mx-9">PT Simfoni Melodi Indonesia</h1>
          <div className="flex flex-col py-3 space-y-3">
            {/* Lokasi */}
            <div className="flex items-center gap-4 md:gap-2  mx-9 ">
              <img src={icon_location} alt="Location" className="w-6 h-6" />
              <h3 className="text-base text-sm md:text-lg ">Jl. Puri Anjasmoro Blok E1. No.21, Semarang - Jawa Tengah, Indonesia 50144</h3>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 md:gap-2  mx-9">
              <img src={icon_email} alt="Email" className="w-6 h-6" />
              <h3 className="text-base text-sm md:text-lg">info@sekolahmusikindonesia.id</h3>
            </div>

            {/* Telepon */}
            <div className="flex items-center gap-4 md:gap-2  mx-9">
              <img src={icon_tel} alt="Phone" className="w-6 h-6" />
              <h3 className="text-base text-sm md:text-lg">+62 811 297 5157</h3>
            </div>

            {/* Telepon 2 */}
            <div className="flex items-center gap-4 md:gap-2  mx-9">
              <img src={icon_tel} alt="Phone" className="w-6 h-6" />
              <h3 className="text-base text-sm md:text-lg">024 - 7609569 / 7606254</h3>
            </div>
          </div>
        </div>

        {/* Kolom kanan - Social & Apps */}
        <div className="w-full md:w-1/3 text-right md:text-left pr-0 md:pr-20">
          <div className="flex flex-col items-end space-y-6 md:items-start">
            {/* Connect With Us Section */}
            <div className="flex flex-col items-end md:items-start w-full">
              <h2 className="text-xl font-bold w-full text-right md:text-left">CONNECT WITH US</h2>
              <div className="flex justify-end md:justify-start gap-2 py-3 w-full">
                <a href="https://www.facebook.com/SekolahMusikIndonesiaOfficial/" target="_blank">
                    <img src={icon_fb} alt="Facebook" className="w-10 h-10 transition-transform transform hover:scale-110" />
                </a>

                <a href="https://www.instagram.com/sekolahmusikindonesia/" target="_blank">
                    <img src={icon_ig} alt="Instagram" className="w-10 h-10 transition-transform transform hover:scale-110" />
                </a>

                <a href="https://www.youtube.com/@SMISemarangID" target="_blank">
                    <img src={icon_youtube} alt="YouTube" className="w-10 h-10 transition-transform transform hover:scale-110" />
                </a>
                <a href="https://www.linkedin.com/company/sekolah-musik-indonesia/mycompany/" target="_blank">
                <img src={icon_linkedin} alt="LinkedIn" className="w-10 h-10 transition-transform transform hover:scale-110" />
                </a>
               
              </div>
            </div>

            {/* Download Apps Section */}
            <div className="flex flex-col items-end md:items-start w-full">
              <h2 className="text-xl font-bold w-full text-right md:text-left">DOWNLOAD APPS</h2>
              <div className="flex justify-end md:justify-start gap-2 py-3 w-full">
                <a href="https://play.google.com/store/apps/details?id=com.sister_mobile.customer&hl=en" target="_blank">
                  <img src={googleplay} alt="Google Play" className="w-32 h-10 transition-transform transform hover:scale-110" />
                </a>
                <a href="https://apps.apple.com/us/app/sister-smi-customer/id6448862601" target="_blank">
                  <img src={appstore} alt="App Store" className="w-32 h-10 transition-transform transform hover:scale-110" />
                </a>  
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Bagian Copyright */}
  <div className="w-full bg-gray-300 text-black text-center py-2">
    <p className="font-bold">&copy; All Rights Reserved. PT. Sinergi Mandiricipta Indonesia.</p>
  </div>
</footer>

      
    );
};

export default Footer;
