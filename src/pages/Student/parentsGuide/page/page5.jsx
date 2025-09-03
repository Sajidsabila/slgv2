const Page5 = () => {
    return (
    <div className="w-screen h-screen flex flex-col overflow-hidden relative">
            <video
                className="absolute top-0 left-0 w-full h-full md:object-cover object-contain z-0"
                src="/videos/5.mp4"
                autoPlay
                playsInline
              
            ></video>
        </div>
    )
}

export default Page5