import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Download, Code, BookOpen, Award, Mail, User, Home } from 'lucide-react';
import { useData } from '../contexts/DataContext.jsx';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { resumeLink } = useData();

  const handleAboutClick = (e) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById('about');
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById('about');
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItemClass = (isActive) => 
    `flex items-center gap-2 transition-all font-medium text-sm ${
      isActive 
        ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' 
        : 'text-slate-400 hover:text-white'
    }`;

  const mobileNavItemClass = (isActive) =>
    `flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium w-full text-left ${
      isActive
        ? 'text-white bg-white/10'
        : 'text-slate-400 hover:text-white hover:bg-white/5'
    }`;

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-[95%] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-white tracking-tighter hover:tracking-wide transition-all duration-300">
            RM<span className="text-primary animate-pulse">.</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={navItemClass(location.pathname === '/')}>Home</Link>
            <button onClick={handleAboutClick} className={navItemClass(false)}>About</button>
            <Link to="/projects" className={navItemClass(location.pathname === '/projects')}>Projects</Link>
            <Link to="/blog" className={navItemClass(location.pathname === '/blog')}>Insights</Link>
            <Link to="/certificates" className={navItemClass(location.pathname === '/certificates')}>Certificates</Link>
            <Link to="/contact" className={navItemClass(location.pathname === '/contact')}>Contact</Link>

            {/* Resume Button */}
            <a 
              href={resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 px-5 py-2 bg-white text-black rounded-full text-xs font-bold hover:bg-gray-200 transition-all flex items-center gap-2 uppercase tracking-wider transform hover:scale-105"
            >
              Resume <Download className="w-3 h-3" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-gray-300 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-[#050505] border-t border-white/10 h-screen animate-in slide-in-from-top-5 duration-200 absolute w-full left-0 z-40">
          <div className="px-4 pt-4 pb-3 space-y-2">
            <Link to="/" onClick={() => setIsOpen(false)} className={mobileNavItemClass(location.pathname === '/')}>
              <Home className="w-5 h-5" /> Home
            </Link>
            <button onClick={handleAboutClick} className={mobileNavItemClass(false)}>
              <User className="w-5 h-5" /> About
            </button>
            <Link to="/projects" onClick={() => setIsOpen(false)} className={mobileNavItemClass(location.pathname === '/projects')}>
              <Code className="w-5 h-5" /> Projects
            </Link>
            <Link to="/blog" onClick={() => setIsOpen(false)} className={mobileNavItemClass(location.pathname === '/blog')}>
              <BookOpen className="w-5 h-5" /> Insights
            </Link>
            <Link to="/certificates" onClick={() => setIsOpen(false)} className={mobileNavItemClass(location.pathname === '/certificates')}>
              <Award className="w-5 h-5" /> Certificates
            </Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className={mobileNavItemClass(location.pathname === '/contact')}>
              <Mail className="w-5 h-5" /> Contact
            </Link>

            <div className="pt-4 mt-4 border-t border-white/10">
              <a 
                href={resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex justify-center items-center gap-3 px-3 py-3 rounded-md text-base font-bold bg-white text-black"
              >
                <Download className="w-5 h-5" /> Download Resume
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;