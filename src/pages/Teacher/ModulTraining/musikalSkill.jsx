const Musikalusic = ({title}) => {
 return (
    <LandingPageLayout>
        <div className="px-4 py-3 container mx-auto">
                <div className="flex my-6">
                    <img src="/assets/smile_image/icon-1.png" className="w-15 h-15 relative z-1 top-2 left-3"/>
                    <div className="relative right-15 z-0 w-full md:w-72 bg-black text-white py-3 px-6 font-bold mt-4 rounded-lg shadow-xl hover:scale-105 transition">
                        <span className="ms-13">{title}</span>
              </div>
          </div>
          </div>
    </LandingPageLayout>
        
 )
}

export default Musikalusic