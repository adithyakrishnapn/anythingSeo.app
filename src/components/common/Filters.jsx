
function Filters({ usedFilters, setUsedFilters, filterData }) {
    const isFilterActive = (filter) => {
        return usedFilters.some(f => f.toLowerCase() === filter.toLowerCase());
    };

    return (
        <div>
            {filterData.map((filter) => {
                const isActive = isFilterActive(filter);
                return (
                    <button
                        key={filter}
                        className={`px-4 mr-2 py-2 text-sm font-medium rounded-md ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                        onClick={() => {
                            if (isActive) {
                                setUsedFilters(usedFilters.filter((f) => f.toLowerCase() !== filter.toLowerCase()))
                            } else {
                                if (filter.toLowerCase() === 'all') {
                                    setUsedFilters([filter]);
                                    return;
                                }
                                const filterWithoutAll = usedFilters.filter((f) => f.toLowerCase() !== 'all');
                                setUsedFilters([...filterWithoutAll, filter]);
                            }
                        }}
                    >
                        {filter.toUpperCase()}
                    </button>
                )
            })}
        </div>
    )
}

export default Filters