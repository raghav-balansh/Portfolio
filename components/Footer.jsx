import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#050505] border-t border-white/10 py-12">
      <div className="max-w-[95%] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <p className="text-2xl font-bold text-white tracking-tighter">RM<span className="text-primary">.</span></p>
          <p className="text-sm text-slate-500 mt-2">© {new Date().getFullYear()} Raghav Maheshwari. All rights reserved.</p>
        </div>
        <div className="flex gap-6">
          <a href="#" className="text-slate-500 hover:text-white transition-colors"><Github className="w-6 h-6" /></a>
          <a href="#" className="text-slate-500 hover:text-blue-400 transition-colors"><Linkedin className="w-6 h-6" /></a>
          <a href="#" className="text-slate-500 hover:text-sky-400 transition-colors"><Twitter className="w-6 h-6" /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;