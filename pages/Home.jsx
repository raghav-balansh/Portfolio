import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Server, Database, Cpu, Settings, Palette, Zap, ArrowUpRight } from 'lucide-react';
import FadeIn from '../components/FadeIn.jsx';
import CanvasBackground from '../components/CanvasBackground.jsx';
import TiltCard from '../components/TiltCard.jsx';
import CyberAvatar from '../components/CyberAvatar.jsx';
import InfiniteScroll from '../components/InfiniteScroll.jsx';
import { useData } from '../contexts/DataContext.jsx';

// Helper to map string category to icon
const getIconForCategory = (category) => {
    const lower = category.toLowerCase();
    if (lower.includes('frontend')) return <Code className="w-5 h-5 text-blue-400" />;
    if (lower.includes('backend')) return <Server className="w-5 h-5 text-green-400" />;
    if (lower.includes('database')) return <Database className="w-5 h-5 text-purple-400" />;
    if (lower.includes('machine') || lower.includes('ml')) return <Cpu className="w-5 h-5 text-orange-400" />;
    if (lower.includes('tools') || lower.includes('devops')) return <Settings className="w-5 h-5 text-red-400" />;
    if (lower.includes('design')) return <Palette className="w-5 h-5 text-pink-400" />;
    return <Zap className="w-5 h-5 text-yellow-400" />;
};

const Home = () => {
  const { projects, blogs, skills, stats } = useData();

  // Prepare items for infinite scroll
  const scrollItems = skills.map(s => ({
      name: s.name,
      icon: getIconForCategory(s.category)
  }));

  return (
    <div className="w-full bg-[#050505] text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* The Neural Network Background */}
        <CanvasBackground mode="neural" />
        
        {/* Subtle Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#050505_100%)] pointer-events-none" />

        <div className="relative z-10 max-w-[95%] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <div className="inline-block px-4 py-1.5 mb-6 border border-primary/30 rounded-full bg-primary/10 backdrop-blur-sm">
                <span className="text-primary text-xs font-bold tracking-widest uppercase">Available for Hire</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-extrabold mb-8 tracking-tighter">
              Raghav <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Maheshwari</span>
            </h1>
            <p className="text-lg md:text-2xl text-slate-400 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
              Architecting <span className="text-white font-medium">Neural Networks</span> & <span className="text-white font-medium">Immersive Web Experiences</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                to="/projects" 
                className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] transform hover:-translate-y-1"
              >
                View Projects
              </Link>
              <Link 
                to="/contact" 
                className="px-8 py-4 bg-transparent text-white border border-white/20 rounded-full font-medium hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                Contact Me
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Split Interactive About Section */}
      <section id="about" className="py-24 bg-[#050505] relative overflow-hidden">
        {/* Decorative Spotlight - Positioned carefully to not interfere */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none"></div>

        <div className="max-w-[90%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* Left: Text Content */}
                <div className="w-full space-y-10 relative z-10 order-2 lg:order-1">
                  <FadeIn>
                    <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white leading-tight">
                        Bridging <span className="text-primary">Logic</span> and <span className="text-purple-500">Creativity</span>
                    </h2>
                    <p className="text-xl text-slate-400 leading-relaxed font-light">
                        I am a developer who believes code is modern-day alchemy. I don't just write functions; I craft systems that learn, adapt, and scale. My passion lies in the intersection of <strong className="text-white">Generative AI</strong> and <strong className="text-white">Fluid UI Design</strong>.
                    </p>
                    <p className="text-lg text-slate-500 leading-relaxed">
                        Currently focused on building autonomous agents and exploring the frontiers of web-based 3D graphics.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10 mt-8">
                        {stats?.slice(0,2).map((stat, idx) => (
                            <div key={idx}>
                                <h3 className="text-4xl font-bold text-white mb-1">{stat.value}</h3>
                                <p className="text-slate-500 text-xs uppercase tracking-widest">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                  </FadeIn>
                </div>

                {/* Right: Interactive 3D Avatar */}
                {/* Added padding and removed justify-end to center it safely */}
                <div className="w-full flex justify-center items-center relative z-20 order-1 lg:order-2 p-10 lg:p-0">
                  <FadeIn delay={200} className="w-full">
                    <div className="relative w-full flex justify-center">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-xl rounded-full transform scale-75"></div>
                        <CyberAvatar />
                    </div>
                  </FadeIn>
                </div>
            </div>
        </div>
      </section>

      {/* Infinite Skills Marquee */}
      <section className="py-20 bg-[#050505] border-y border-white/5 relative">
         <div className="absolute inset-0 bg-white/1 pointer-events-none"></div>
         <div className="mb-10 text-center">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-[0.3em]">Technical Arsenal</h3>
         </div>
         <InfiniteScroll items={scrollItems} />
      </section>

      {/* Selected Works - Bento Grid */}
      <section className="py-32 bg-[#050505]">
        <div className="max-w-[95%] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex justify-between items-end mb-16">
              <div>
                <h2 className="text-4xl font-bold text-white mb-2">Selected Works</h2>
                <p className="text-slate-400">Highlights from the lab.</p>
              </div>
              <Link to="/projects" className="hidden md:flex group items-center text-white border-b border-white pb-1 hover:text-primary hover:border-primary transition-all">
                View All Projects <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-2" />
              </Link>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {projects.slice(0, 4).map((project, index) => (
              <FadeIn key={project.id} delay={index * 100} className={`${index === 0 || index === 3 ? 'md:col-span-2' : ''} h-full`}>
                <Link to="/projects" className="block h-full">
                    <TiltCard className="h-full group">
                        <div className="absolute inset-0">
                            <img 
                                src={project.image} 
                                alt={project.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                        </div>
                        
                        <div className="relative h-full p-8 flex flex-col justify-end z-10">
                            <div className="flex justify-between items-start mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase bg-white/10 backdrop-blur border border-white/10 rounded mb-4">
                                    {project.domain}
                                </span>
                                <div className="bg-white text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-75 group-hover:scale-100">
                                    <ArrowUpRight className="w-5 h-5" />
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
                            <p className="text-slate-300 text-sm line-clamp-2 max-w-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                {project.description}
                            </p>
                        </div>
                    </TiltCard>
                </Link>
              </FadeIn>
            ))}
          </div>

          <div className="mt-12 flex justify-center md:hidden">
              <Link to="/projects" className="px-8 py-3 bg-[#111] border border-white/10 text-white rounded-full font-bold">
                  View All Projects
              </Link>
          </div>
        </div>
      </section>

      {/* Blog Preview - Glass Cards */}
      <section className="py-32 bg-[#050505] relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-[95%] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-4">Latest Insights</h2>
                <p className="text-slate-400 max-w-xl mx-auto">
                    Thoughts on the future of AI, web development, and system design.
                </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {blogs.slice(0, 3).map((blog, index) => (
                <FadeIn key={blog.id} delay={index * 100}>
                  <Link to="/blog" className="block h-full">
                      <div className="group h-full p-8 bg-gradient-to-b from-[#111] to-[#0a0a0a] border border-white/5 hover:border-white/20 rounded-2xl transition-all duration-300 hover:-translate-y-2">
                        <div className="flex items-center gap-3 text-xs text-slate-500 mb-6">
                            <span className="text-primary font-bold uppercase tracking-wider">{blog.category}</span>
                            <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                            <span>{blog.readTime} read</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4 leading-snug group-hover:text-blue-400 transition-colors">{blog.title}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed mb-6">{blog.excerpt}</p>
                        <div className="flex items-center text-sm font-bold text-white group-hover:gap-2 transition-all">
                            Read Article <ArrowRight className="w-4 h-4 ml-2" />
                        </div>
                      </div>
                  </Link>
                </FadeIn>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;