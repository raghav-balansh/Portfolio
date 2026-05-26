import React, { useState, useMemo } from 'react';
import { Clock, Eye, Calendar, ArrowRight } from 'lucide-react';
import FadeIn from '../components/FadeIn.jsx';
import BlogModal from '../components/BlogModal.jsx';
import TiltCard from '../components/TiltCard.jsx';
import CanvasBackground from '../components/CanvasBackground.jsx';
import { useData } from '../contexts/DataContext.jsx';

const Blog = () => {
  const { blogs } = useData();
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortBy, setSortBy] = useState('date');
  const [selectedBlog, setSelectedBlog] = useState(null);

  const categories = ['All', ...Array.from(new Set(blogs.map(b => b.category)))];

  const filteredBlogs = useMemo(() => {
    let result = blogs;
    if (filterCategory !== 'All') {
      result = result.filter(b => b.category === filterCategory);
    }
    result = [...result].sort((a, b) => {
        if(sortBy === 'date') return new Date(b.date).getTime() - new Date(a.date).getTime();
        if(sortBy === 'views') return b.views - a.views;
        return 0;
    });
    return result;
  }, [filterCategory, sortBy, blogs]);

  // Most watched (most views)
  const mostWatched = [...blogs].sort((a,b) => b.views - a.views)[0];

  if (!mostWatched) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-20 pb-20 relative">
        <CanvasBackground mode="rain" />
        
        {selectedBlog && (
            <BlogModal blog={selectedBlog} onClose={() => setSelectedBlog(null)} />
        )}

        {/* Blog Hero */}
        <section className="relative py-12 border-b border-white/5 mb-12 z-10">
            <div className="absolute inset-0 bg-primary/5 blur-[100px] pointer-events-none" />
            <div className="max-w-[95%] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <FadeIn>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                      <div className="space-y-6">
                          <div className="flex items-center gap-2 text-primary font-bold tracking-widest uppercase text-xs">
                              <span className="w-8 h-px bg-primary"></span>
                              Featured Insight
                          </div>
                          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                              {mostWatched.title}
                          </h1>
                          <p className="text-lg text-slate-400">
                              {mostWatched.excerpt}
                          </p>
                          <div className="flex items-center gap-6 text-sm text-slate-500">
                              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {mostWatched.readTime}</span>
                              <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {mostWatched.views} views</span>
                              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {mostWatched.date}</span>
                          </div>
                          <button 
                            onClick={() => setSelectedBlog(mostWatched)}
                            className="px-6 py-3 bg-white text-black rounded-lg font-bold hover:bg-gray-200 transition-all transform hover:-translate-y-1 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                          >
                              Read Article
                          </button>
                      </div>
                      <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl cursor-pointer group border border-white/10" onClick={() => setSelectedBlog(mostWatched)}>
                          <img src={mostWatched.image} alt={mostWatched.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                      </div>
                  </div>
                </FadeIn>
            </div>
        </section>

        {/* Controls */}
        <div className="sticky top-20 z-30 bg-[#050505]/90 backdrop-blur border-b border-white/5">
            <div className="max-w-[95%] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                    {categories.map(cat => (
                        <button 
                            key={cat}
                            onClick={() => setFilterCategory(cat)}
                            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border ${
                                filterCategory === cat 
                                ? 'bg-primary/20 text-primary border-primary/50' 
                                : 'bg-[#111] text-slate-400 border-white/5 hover:text-white hover:border-white/20'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <span className="text-sm text-slate-500 whitespace-nowrap">Sort by:</span>
                    <select 
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-[#111] border border-white/10 text-slate-300 text-sm rounded px-3 py-2 focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                    >
                        <option value="date">Latest</option>
                        <option value="views">Most Popular</option>
                    </select>
                </div>
             </div>
        </div>

        {/* Blog Grid */}
        <div className="max-w-[95%] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-16 z-10 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBlogs.map((blog, index) => (
                    <FadeIn key={blog.id} delay={index * 50} className="h-full">
                        <TiltCard 
                            onClick={() => setSelectedBlog(blog)}
                            className="group cursor-pointer flex flex-col h-full bg-[#0a0a0a]"
                        >
                            <div className="relative overflow-hidden h-56 border-b border-white/5">
                                <img 
                                    src={blog.image} 
                                    alt={blog.title} 
                                    className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700 opacity-70 group-hover:opacity-100" 
                                />
                                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                                    {blog.category}
                                </div>
                            </div>
                            
                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
                                    <span>{blog.date}</span>
                                    <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                                    <span>{blog.readTime} read</span>
                                    <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {blog.views}</span>
                                </div>
                                
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors leading-snug">
                                    {blog.title}
                                </h3>
                                
                                <p className="text-slate-400 text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
                                    {blog.excerpt}
                                </p>
                                
                                <div className="flex items-center text-primary font-bold text-xs uppercase tracking-widest mt-auto">
                                    Read Article <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
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

export default Blog;