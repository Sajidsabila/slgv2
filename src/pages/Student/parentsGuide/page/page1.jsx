const Page1 = ({handleClick}) => {
  return (
    <div className="container mx-auto w-[100dvw] h-[100dvh] relative overflow-hidden transition-all">
   
      <video
        className="container mx-auto absolute top-0 left-0 w-full h-full object-cover"
        src="/0.mp4" 
        autoPlay
        loop
        muted
      />
      
    <button handleClick={handleClick} className="bg-red-500 text-white px-10 py-2 rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold hover:bg-red-600 hover:cursor-pointer">
         START
    </button>
    </div>
  );
};

export default Page1;
