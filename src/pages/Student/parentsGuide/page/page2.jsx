const Page2 = () => {
    return (
      <>
      <div className="w-screen h-screen  relative overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full md:object-cover object-contain"
          src="/2.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
      </>
    )
} 

export default Page2