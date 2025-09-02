const Page2a = () => {
    return (
        <div className="w-screen h-screen flex flex-col overflow-hidden relative">
            <video
                className="absolute top-0 left-0 w-full h-full md:object-cover object-contain z-0"
                src="/01.a.mp4"
                autoPlay
                playsInline
                loop
            ></video>
        </div>
    )
}

export default Page2a