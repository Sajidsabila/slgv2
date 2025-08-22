const Page4 = ({nextPage, previusPage}) => {
    return (
        <div className="w-screen h-screen flex flex-col overflow-hidden relative">
            <video
                className="absolute top-0 left-0 w-full h-full md:object-cover object-contain z-0"
                src="/3.mp4"
                autoPlay
                playsInline
                loop
                muted
            ></video>

           

            <div className="absolute top-0 left-0 w-full h-full flex flex-row justify-between items-center px-6 z-20">
                <button onClick={previusPage}  className="bg-red-500 text-white px-7 py-2 rounded-lg shadow-lg cursor-pointer">
                    Previous
                </button>
                <button onClick={nextPage} className="bg-blue-500 text-white px-7 py-2 rounded-lg shadow-lg cursor-pointer">
                    Next
                </button>
            </div>
        </div>
    );
};

export default Page4;
