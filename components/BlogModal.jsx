import React, { useEffect } from 'react';
import { X, Clock, Calendar, Eye, ExternalLink } from 'lucide-react';

const BlogModal = ({ blog, onClose }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md transition-opacity duration-300"
      onClick={handleBackdropClick}
    >
      <div className="bg-[#0f0f0f] border border-[#262626] w-full md:max-w-3xl lg:max-w-4xl h-full sm:h-[90vh] sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-10 duration-300">
        
        {/* Header Image */}
        <div className="relative h-48 sm:h-64 flex-shrink-0">
          <img 
            src={blog.image} 
            alt={blog.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors backdrop-blur-md z-10 border border-white/10"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#0f0f0f] to-transparent">
            <span className="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-wider text-black uppercase bg-white rounded-full shadow-sm">
              {blog.category}
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold text-white leading-tight shadow-sm">{blog.title}</h1>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 custom-scrollbar">
            <div className="flex items-center gap-6 text-sm text-slate-400 mb-8 border-b border-[#262626] pb-4">
                <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {blog.date}</span>
                <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {blog.readTime} read</span>
                <span className="flex items-center gap-2"><Eye className="w-4 h-4" /> {blog.views} views</span>
            </div>

            <div 
                className="prose prose-invert max-w-none text-slate-300"
                dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Read on Medium Button */}
            {blog.externalUrl && (
                <div className="mt-12 pt-8 border-t border-[#262626]">
                    <a 
                        href={blog.externalUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all transform hover:-translate-y-1 shadow-lg shadow-white/10"
                    >
                        Read Full Article on Medium <ExternalLink className="w-5 h-5" />
                    </a>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default BlogModal;