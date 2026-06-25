import { useTheme } from '../../context/ThemeProvider.jsx';
import { Moon, Sun }
from "lucide-react";

function ThemeToggler() {
  const { theme, toggleTheme } = useTheme();


  return (
    <button onClick={toggleTheme} className="p-2 rounded-full bg-background hover:bg-gray-200 hover:text-black transition-colors">
      {theme === 'dark' ? <Sun /> : <Moon />}
    </button>
  )
}

export default ThemeToggler