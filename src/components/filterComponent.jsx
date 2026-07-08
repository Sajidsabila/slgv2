const FilterComponent = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  searchTerm,
  setSearchTerm,
}) => {
  const handleStartDate = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDate = (e) => {
    setEndDate(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-2/3">
          <input
            type="date"
            value={startDate}
            onChange={handleStartDate}
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-slate-500"
          />

          <input
            type="date"
            value={endDate}
            onChange={handleEndDate}
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-slate-500"
          />
        </div>
        <input
          type="text"
          placeholder="Pencarian..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-slate-500"
        />
      </div>
    </div>
  );
};

export default FilterComponent;