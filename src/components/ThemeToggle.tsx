import React from 'react';
import { SunIcon, MoonIcon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
export const ThemeToggle = () => {
  const {
    theme,
    toggleTheme
  } = useTheme();
  return <button onClick={toggleTheme} className="fixed top-6 right-6 z-50 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 dark:bg-slate-800/20 dark:border-slate-700/20 transition-all duration-300 hover:scale-110" aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
      {theme === 'dark' ? <SunIcon size={20} className="text-yellow-300" /> : <MoonIcon size={20} className="text-slate-700" />}
    </button>;
};