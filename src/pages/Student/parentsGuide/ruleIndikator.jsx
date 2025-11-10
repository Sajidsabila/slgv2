const pageList = [
  { id: "2a", label: "1" },
  { id: "2", label: "2" },
  { id: "3", label: "3" },
  { id: "4", label: "4" },
  { id: "5", label: "5" },
  { id: "6", label: "6" },
  { id: "7", label: "7" },
  { id: "8", label: "8" },
];

const RuleIndicator = ({ currentPage, onNavigate }) => {
  const currentIndex = pageList.findIndex(p => p.id === currentPage);

  return (
    <div
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 
      bg-opacity-40  py-3 px-10 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.3)] 
      flex  transition-all duration-300"
      style={{ perspective: "1000px" }}
    >
      {pageList.map((page, index) => {
        const isActive = index <= currentIndex;

        return (
          <div key={page.id} className="flex items-center">
            
            <div
              //  onClick={() => onNavigate(page.id)}
              className={`
                w-10 h-10 flex items-center justify-center rounded-full font-bold cursor-pointer transition-all duration-300
                ${isActive
                  ? "bg-red-900 text-white border-2 border-white px-2 py-1"
                  : "bg-gray-300 text-gray-600"
                }
              `}
            >
              {page.label}
            </div>

          
            {index < pageList.length - 1 && (
              <div
              
                className={`h-1 w-16 rounded-full transition-all duration-300 
                  ${index < currentIndex
                    ? "bg-red-900 "
                    : "bg-gray-300"
                  }`}
             
                style={{
                  marginLeft: "0px",
                  marginRight: "0px",
                }}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RuleIndicator;
