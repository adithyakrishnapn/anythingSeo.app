import React,{useMemo} from 'react'

function useTagsAndData(fetchData=[]) {

    const tags = useMemo(()=>{
        if(fetchData.length == 0 ) return [];
        return Object.keys(fetchData[0]);
    }, [fetchData]);

  return {
    tags, 
    data:fetchData
}
}

export default useTagsAndData