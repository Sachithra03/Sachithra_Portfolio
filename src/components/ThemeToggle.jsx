import { Sun, Moon } from 'lucide-react';
import { useState } from 'react';


export const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove('dark');
            setIsDarkMode(false);
        } else {
            document.documentElement.classList.add('dark');
            setIsDarkMode(true);
        }
    };
    return (
    <button onClick={toggleTheme}> 
        {" "}
        {isDarkMode ? (
            <Sun className="h-6 w-6" color="#facc15" /> 
        ) : ( 
            <Moon className="h-6 w-6" color="#1e3a8a" />
        )} 
        </button>
    );
} 