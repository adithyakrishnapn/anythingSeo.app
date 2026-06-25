import React from 'react'

function TasksProjectFromClient({results, setSelectedClient, setSearch}) {

    const saveClientToLocalStorage = (key,value,expiryMinutes) => {
        const item = {
            value,
            expiry: Date.now() + expiryMinutes * 60 * 1000,
        }
        localStorage.setItem(key, JSON.stringify(item));
    }

  return (
    <div className='
        border border-border border-solid border-foreground
        rounded-lg bg-background
        p-2
        mt-2'>
        {results.map((result)=>{
            return(
                <div key={result.id} className='p-2 border-b border-border border-solid last:border-b-0 hover:bg-muted rounded-lg cursor-pointer' onMouseDown={() => {
                    setSelectedClient(result);
                    setSearch(result.name);
                    saveClientToLocalStorage('selectedClient', result, 10);
                }}>
                    <p>{result.name}</p>
                </div>
            )
        })}
    </div>
  )
}

export default TasksProjectFromClient