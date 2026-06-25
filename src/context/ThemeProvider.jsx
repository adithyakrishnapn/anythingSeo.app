import {useEffect, useState, useContext, createContext} from 'react';

const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

function ThemeProvider({children}) {
    const [theme, setTheme] = useState(() =>{
        return localStorage.getItem('theme') || 'light';
    });

    const toggleTheme = () =>{
        setTheme((prev)=> prev === 'light' ? 'dark' : 'light');
    }

    useEffect(()=>{
        localStorage.setItem('theme', theme);

        const root = window.document.documentElement;

        if(theme === "dark") {
            root.classList.add('dark');
        }else{
            root.classList.remove('dark');
        }

    },[theme])
    
    return(
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;