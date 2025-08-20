const Page4 = () => {
    return (
        <div className="w-screen h-screen flex flex-col overflow-hidden">
            <video
                className="absolute top-0 left-0 w-full h-full md:object-cover object-contain"
                src="/3.mp4"
                autoPlay 
                PlaysInline   
                >
            </video>
             <div className="absolute top-0 left-0 w-full h-full bg-black/30" />
        </div>
    )
}
export default Page4