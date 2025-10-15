// import React, { useEffect, useState } from 'react';
// import { SunIcon, MoonIcon, MenuIcon, XIcon } from 'lucide-react';
// import { useTheme } from '../context/ThemeContext';
// import { useScroll } from '../context/ScrollContext';
// export const Navbar = () => {
//   const {
//     theme,
//     toggleTheme
//   } = useTheme();
//   const {
//     currentSection
//   } = useScroll();
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const navLinks = [{
//     id: 'home',
//     label: 'Home'
//   }, {
//     id: 'about',
//     label: 'About'
//   }, {
//     id: 'projects',
//     label: 'Projects'
//   }, {
//     id: 'skills',
//     label: 'Skills'
//   }, {
//     id: 'education',
//     label: 'Education'
//   }, {
//     id: 'contact',
//     label: 'Contact'
//   }];
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);
//   const scrollToSection = (id: string) => {
//     setTimeout(() => {
//       const element = document.getElementById(id);
//       if (element) {
//         const offset = 80; // Height of the navbar
//         const elementPosition = element.getBoundingClientRect().top;
//         const offsetPosition = elementPosition + window.pageYOffset - offset;
        
//         window.scrollTo({
//           top: offsetPosition,
//           behavior: 'smooth'
//         });
//       }
//     }, 100);
//     setIsMenuOpen(false);
//   };
//   return <>
//       <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-3 bg-white/10 dark:bg-slate-900/80 backdrop-blur-md border-b border-white/10 dark:border-slate-700/20' : 'py-5'}`}>
//         <div className="container mx-auto px-4 flex justify-between items-center">
//           <a href="#home" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400" onClick={e => {
//           e.preventDefault();
//           scrollToSection('home');
//         }}>
//             	SE | DevOps
//           </a>
//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             <ul className="flex space-x-8">
//               {navLinks.map(link => <li key={link.id}>
//                   <a href={`#${link.id}`} className={`text-sm font-medium transition-colors duration-300 hover:text-blue-500 ${currentSection === link.id ? 'text-blue-500 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'}`} onClick={e => {
//                 e.preventDefault();
//                 scrollToSection(link.id);
//               }}>
//                     {link.label}
//                   </a>
//                 </li>)}
//             </ul>
//             <button onClick={toggleTheme} className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 dark:bg-slate-800/20 dark:border-slate-700/20 transition-all duration-300 hover:scale-110" aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
//               {theme === 'dark' ? <SunIcon size={20} className="text-yellow-300" /> : <MoonIcon size={20} className="text-slate-700" />}
//             </button>
//           </div>
//           {/* Mobile Menu Button */}
//           <div className="md:hidden flex items-center space-x-4">
//             <button onClick={toggleTheme} className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 dark:bg-slate-800/20 dark:border-slate-700/20" aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
//               {theme === 'dark' ? <SunIcon size={18} className="text-yellow-300" /> : <MoonIcon size={18} className="text-slate-700" />}
//             </button>
//             <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 dark:bg-slate-800/20 dark:border-slate-700/20" aria-label="Toggle menu">
//               {isMenuOpen ? <XIcon size={18} className="text-slate-700 dark:text-slate-300" /> : <MenuIcon size={18} className="text-slate-700 dark:text-slate-300" />}
//             </button>
//           </div>
//         </div>
//       </nav>
//       {/* Mobile Menu */}
//       {isMenuOpen && <div className="fixed top-16 left-0 right-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-b border-white/20 dark:border-slate-700/20 md:hidden">
//           <ul className="py-4 px-6 space-y-4">
//             {navLinks.map(link => <li key={link.id}>
//                 <a href={`#${link.id}`} className={`block py-2 text-base font-medium transition-colors duration-300 hover:text-blue-500 ${currentSection === link.id ? 'text-blue-500 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'}`} onClick={e => {
//             e.preventDefault();
//             scrollToSection(link.id);
//           }}>
//                   {link.label}
//                 </a>
//               </li>)}
//           </ul>
//         </div>}
//     </>;
// };