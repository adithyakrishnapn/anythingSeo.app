
function Filters({ usedFilters, setUsedFilters, filterData }) {
    return (
        <div>
            {filterData.map((filter) => {
                const isActive = usedFilters.includes(filter);
                return (
                    <button
                        key={filter}
                        className={`px-4 mr-2 py-2 text-sm font-medium rounded-md ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                        onClick={() => {
                            if (isActive) {
                                setUsedFilters(usedFilters.filter((f) => f !== filter))
                            } else {
                                if (filter === 'All') {
                                    setUsedFilters(['All']);
                                    return;
                                }
                                const filterWithoutAll = usedFilters.filter((f)=> f !== 'All');
                                setUsedFilters([...filterWithoutAll, filter]);
                            }
                        }}
                    >
                        {filter}
                    </button>
                )
            })}
        </div>
    )
}

export default Filters