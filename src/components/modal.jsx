import { X } from "lucide-react";
const Modal = ({ isOpen, onClose, children, titleModal, onSubmit}) => {
   if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-transparent bg-opacity-50">
      <div className="relative p-4 w-full max-w-2xl bg-white rounded-lg shadow-md mx-5 md:m-0">

        <div className="flex items-center justify-between p-4 border-b-3 border-blue-700 rounded-b">
          <h3 className=" text-lg md:text-xl font-semibold text-gray-900">{titleModal}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-900 hover:cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={onSubmit}>

        <div className="p-4 space-y-4">
           {children}
        </div>

        <div className="flex items-center p-4 border-t border-gray-200 rounded-b">
          <button
              type="submit" 
            className="text-white bg-blue-700 hover:bg-blue-300 hover:cursor-pointer hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
          Submit
          </button>
          <button
         
            onClick={onClose}
            className="py-2.5 px-5 ms-3 text-sm font-medium text-white hover:cursor-pointer bg-red-600 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:ring-gray-100"
          >
            Cancel
          </button>
        </div>
        </form>
      </div>
    </div>
  );
}
export default Modal