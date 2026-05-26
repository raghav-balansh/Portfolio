import React, { useState, useMemo, useEffect } from 'react';
import { Filter, Calendar, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import FadeIn from '../components/FadeIn.jsx';
import ProjectModal from '../components/ProjectModal.jsx';
import TiltCard from '../components/TiltCard.jsx';
import CanvasBackground from '../components/CanvasBackground.jsx';
import { useData } from '../contexts/DataContext.jsx';

const Projects = () => {
  const { projects } = useData();
  const [filterDomain, setFilterDomain] = useState('All');
  const [sortBy, setSortBy] = useState('date');
  const [selectedProject, setSelectedProject] = useState(null);
  
  // Carousel State
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  const domains = ['All', 'ML', 'DL', 'Computer Vision', 'Gen AI', 'Web Dev'];

  const filteredProjects = useMemo(() => {
    let result = projects;
    if (filterDomain !== 'All') {
      result = result.filter((p) => p.domain === filterDomain);
    }
    result = [...result].sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date).getTime() - new Date(a.date).getTime();
      return a.title.localeCompare(b.title);
    });
    return result;
  }, [filterDomain, sortBy, projects]);

  const heroProjects = useMemo(() => {
      return projects.filter(p => p.popular).slice(0, 5);
  }, [projects]);

  useEffect(() => {
      const timer = setInterval(() => {
          setCurrentHeroIndex((prev) => (prev + 1) % heroProjects.length);
      }, 5000);
      return () => clearInterval(timer);
  }, [heroProjects.length]);

  const nextHero = () => setCurrentHeroIndex((prev) => (prev + 1) % heroProjects.length);
  const prevHero = () => setCurrentHeroIndex((prev) => (prev - 1 + heroProjects.length) % heroProjects.length);

  if (!heroProjects.length) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-20 pb-20 relative">
      <CanvasBackground mode="stars" />
      
      {/* Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}

      {/* Hero Section */}
      <section className="relative py-8 overflow-hidden z-10">
        <div className="max-w-[95%] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <h1 className="text-4xl font-bold mb-8">Featured Work</h1>
          </FadeIn>
          
          <div className="relative w-full h-[450px] rounded-2xl overflow-hidden shadow-2xl group border border-white/10">
              {heroProjects.map((project, index) => (
                  <div 
                      key={project.id}
                      className={`absolute inset-0 transition-all duration-700 ease-in-out cursor-pointer ${
                          index === currentHeroIndex ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105'
                      }`}
                      onClick={() => setSelectedProject(project)}
                  >
                      <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                      
                      <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                          <div className="max-w-3xl">
                              <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">Featured Project</span>
                              <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white leading-tight">{project.title}</h2>
                              <p className="text-slate-300 text-lg line-clamp-2 mb-6">{project.description}</p>
                              <div className="flex gap-3">
                                  {project.tags.slice(0, 3).map(tag => (
                                      <span key={tag} className="text-xs bg-white/10 backdrop-blur border border-white/20 px-3 py-1 rounded-full text-white">
                                          {tag}
                                      </span>
                                  ))}
                              </div>
                          </div>
                      </div>
                  </div>
              ))}

              {/* Controls */}
              <button onClick={(e) => { e.stopPropagation(); prevHero(); }} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black text-white rounded-full border border-white/10 backdrop-blur transition-all z-20">
                  <ChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={(e) => { e.stopPropagation(); nextHero(); }} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black text-white rounded-full border border-white/10 backdrop-blur transition-all z-20">
                  <ChevronRight className="w-6 h-6" />
              </button>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-20 z-30 bg-[#050505]/90 backdrop-blur border-b border-white/5">
        <div className="max-w-[95%] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              <Filter className="w-4 h-4 text-slate-400 mr-2" />
              {domains.map(domain => (
                <button
                  key={domain}
                  onClick={() => setFilterDomain(domain)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    filterDomain === domain 
                      ? 'bg-white text-black' 
                      : 'bg-[#111] text-slate-400 hover:text-white border border-white/5'
                  }`}
                >
                  {domain}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#111] text-sm text-white border border-white/10 rounded px-2 py-1 outline-none"
              >
                <option value="date">Date (Newest)</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Project Grid */}
      <div className="max-w-[95%] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <FadeIn key={project.id} delay={index * 50}>
              <TiltCard 
                onClick={() => setSelectedProject(project)}
                className="h-full cursor-pointer"
              >
                <div className="h-48 overflow-hidden relative border-b border-white/5">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  />
                </div>
                
                <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
                  <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{project.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 text-xs mb-4">
                      <Calendar className="w-3 h-3" />
                      <span>{project.date}</span>
                  </div>
                  
                  <p className="text-slate-400 text-sm mb-6 flex-1 line-clamp-3">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5 mt-auto">
                    {project.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs text-slate-300 px-2 py-1 rounded bg-white/5 border border-white/5">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;