const RotateVidio = () => {
    return (
         <div className="w-screen h-screen relative overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/videos/rotate_vidio.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
    )
}

export default RotateVidio