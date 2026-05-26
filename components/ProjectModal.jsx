import React, { useEffect } from 'react';
import { X, Github, ExternalLink, Calendar, Tag } from 'lucide-react';

const ProjectModal = ({ project, onClose }) => {
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md transition-opacity duration-300"
      onClick={handleBackdropClick}
    >
      <div className="bg-[#0a0a0a] w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 border border-white/10">
        
        {/* Header / Image Section */}
        <div className="relative h-64 sm:h-80 flex-shrink-0">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors backdrop-blur border border-white/10"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-0 left-0 p-6 sm:p-8 w-full">
            <span className="inline-block px-3 py-1 mb-3 text-[10px] font-bold tracking-widest text-black uppercase bg-white rounded shadow-lg">
              {project.domain}
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white shadow-sm tracking-tight">{project.title}</h2>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 custom-scrollbar bg-[#0a0a0a]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Description */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    <span className="w-1 h-6 bg-primary rounded-full"></span> Overview
                </h3>
                <p className="text-slate-300 leading-relaxed text-base sm:text-lg font-light">
                  {project.longDescription || project.description}
                </p>
              </div>

              {/* Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-primary rounded-full"></span> Gallery
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {project.gallery.map((img, idx) => (
                      <div key={idx} className="rounded-lg overflow-hidden h-32 sm:h-48 border border-white/10 group cursor-pointer">
                        <img 
                          src={img} 
                          alt={`${project.title} screenshot ${idx + 1}`} 
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              {/* Links */}
              <div className="flex flex-col gap-3">
                {project.demoUrl && (
                  <a 
                    href={project.demoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-500/25"
                  >
                    <ExternalLink className="w-5 h-5" /> Live Demo
                  </a>
                )}
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#111] text-white border border-white/10 rounded-xl font-bold hover:bg-[#222] transition-colors"
                >
                  <Github className="w-5 h-5" /> View Code
                </a>
              </div>

              {/* Metadata */}
              <div className="bg-[#111] p-5 rounded-xl border border-white/5 space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Calendar className="w-3 h-3" /> Date
                  </h4>
                  <p className="text-white font-medium">{project.date}</p>
                </div>
                
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Tag className="w-3 h-3" /> Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 bg-[#222] border border-white/5 rounded text-xs font-medium text-slate-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;