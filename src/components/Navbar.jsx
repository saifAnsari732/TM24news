import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../images/logo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/latest?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'होम', path: '/' },
    { name: 'हमारे बारे में', path: '/about' },
    { name: 'मिशन', path: '/mission' },
    { name: 'ताज़ा खबरें', path: '/latest' },
    { name: 'वीडियो', path: '/videos' },
    { name: 'संपर्क', path: '/contact' },
  ];

  return (
    <header className={`sticky top-0 w-full z-40 transition-all duration-300 bg-white flex items-center ${
      scrolled ? 'shadow-md h-[70px] md:h-[85px]' : 'h-[90px] md:h-[115px]'
    }`}>
      <div className="container mx-auto px-4 md:px-6 h-full">
        <div className="flex justify-between items-center h-full">
          <Link to="/" className="flex items-center h-full py-1 gap-2 md:gap-3">
            <img 
              src={Logo} 
              alt="TM24 News Logo" 
              className="h-32" 
            />
            <span className="text-2xl md:text-4xl hidden sm:flex font-black tracking-tight select-none items-center">
              <span className="text-[#c50505]">TM24</span>
              <span className="text-[#0433dd]">NEWS</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 h-full">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-semibold text-lg transition-all duration-300 flex items-center h-full border-b-2 ${
                  location.pathname === link.path 
                    ? 'text-[#002698] border-[#FF0000] font-bold' 
                    : 'text-zinc-700 border-transparent hover:text-[#0038FF]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                type="text"
                placeholder="खबरें खोजें..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-zinc-100 hover:bg-zinc-200/70 focus:bg-white text-zinc-800 text-sm font-medium pl-10 pr-4 py-2 rounded-full border border-zinc-200 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all w-44 lg:w-56"
              />
              <Search size={18} className="absolute left-3.5 text-zinc-400 pointer-events-none" />
            </form>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-zinc-800 p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t mt-2 absolute top-full left-0 w-full shadow-lg"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`font-semibold text-lg block py-2 border-b ${
                    location.pathname === link.path 
                      ? 'text-[#002698] border-[#FF0000] font-bold' 
                      : 'text-zinc-800 border-zinc-100 hover:text-[#0038FF]'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-zinc-100 pt-4 pb-2">
                <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full">
                  <input
                    type="text"
                    placeholder="खबरें खोजें..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-zinc-100 text-zinc-800 text-sm font-medium pl-10 pr-4 py-2.5 rounded-full border border-zinc-200 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all w-full"
                  />
                  <Search size={18} className="absolute left-4 text-zinc-400 pointer-events-none" />
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
