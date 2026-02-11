import { useNavigate } from "react-router-dom";

const Page404 = () => {
  const navigate = useNavigate();
  const back = () => navigate(-1);
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-300">
      <div className="w-[400px] h-auto flex flex-col items-center justify-center rounded-lg  mx-5 md:mx-0">
        <h2 className="text-6xl text-red-800 font-extrabold py-2">404</h2>
        <h4 className="text-2xl font-bold py-3">oops! Page not found</h4>
        <button
          onClick={back}
          className="bg-red-800 hover:bg-red-700 text-white py-2 px-3 rounded-md shadow-md my-2 hover:cursor-pointer font-medium"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};
export default Page404;
