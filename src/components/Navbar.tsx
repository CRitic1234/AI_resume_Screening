import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className={`fixed w-full z-50 ${darkMode ? 'dark bg-gray-800 text-white' : 'bg-white'} shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold">AI Resume Screener</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Home</Link>
            <Link to="/learn" className="px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Learn</Link>
            <Link to="/upload-resume" className="px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Upload Resume</Link>
            <Link to="/dashboard" className="px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Dashboard</Link>
            <Link to="/contact" className="px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Contact</Link>
            <Link to="/rate-us" className="px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Rate Us</Link>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Home</Link>
            <Link to="/learn" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Learn</Link>
            <Link to="/upload-resume" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Upload Resume</Link>
            <Link to="/dashboard" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Dashboard</Link>
            <Link to="/contact" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Contact</Link>
            <Link to="/rate-us" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Rate Us</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;