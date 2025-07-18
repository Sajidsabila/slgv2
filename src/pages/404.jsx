import { Link } from "react-router-dom";

const Page404 = () => {
    return (
        <div
         className="w-screen h-screen flex items-center justify-center bg-gray-300">
        <div
         className="w-[400px] h-auto flex flex-col items-center justify-center bg-white rounded-lg shadow-lg mx-5 md:mx-0">
           <h2 
           className="text-6xl text-red-800 font-extrabold py-2">404</h2>
           <h4
            className="text-2xl font-bold py-3">oops! Page not found</h4>
           <button 
            onClick={() => window.history.back()}
            className="bg-blue-800 hover:bg-blue-700 text-white py-1 px-3 rounded-md shadow-md my-2 hover:cursor-pointer">Back to Home</button>
        </div>
    </div>
    
    )
}
export default Page404;