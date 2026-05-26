import React from 'react';
import { Award, CheckCircle, ExternalLink, Shield } from 'lucide-react';
import FadeIn from '../components/FadeIn.jsx';
import TiltCard from '../components/TiltCard.jsx';
import HoloBadge from '../components/HoloBadge.jsx';
import { useData } from '../contexts/DataContext.jsx';

const Certificates = () => {
  const { certificates } = useData();
  const newCert = certificates.find(c => c.isNew);
  const categories = ['ML', 'Cloud', 'Web Dev', 'Data Science'];

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-20 pb-20 overflow-hidden">
        
        {/* New Achievement Hero */}
        {newCert && (
            <section className="relative py-20 overflow-hidden border-b border-white/5">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
                
                {/* Constrained Width Container */}
                <div className="max-w-[90%] xl:max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <FadeIn>
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
                             
                             {/* Text Content */}
                             <div className="w-full lg:w-1/2 relative z-10 order-2 lg:order-1">
                                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-6 animate-pulse-slow">
                                    <CheckCircle className="w-3 h-3" /> Latest Achievement
                                 </div>
                                 <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-white leading-tight">
                                    {newCert.title}
                                 </h1>
                                 <p className="text-slate-400 text-lg md:text-xl mb-8 leading-relaxed max-w-xl">
                                    Officially verified by <span className="text-white font-medium border-b border-primary/50">{newCert.issuer}</span> on {newCert.date}. This credential validates mastery in advanced methodologies.
                                 </p>
                                 <div className="flex flex-wrap gap-4">
                                    <a 
                                        href={newCert.credentialUrl} 
                                        className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-all transform hover:-translate-y-1 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                    >
                                        Verify Credential <ExternalLink className="w-4 h-4" />
                                    </a>
                                 </div>
                             </div>

                             {/* 3D Holo Badge Section */}
                             <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative order-1 lg:order-2">
                                <div className="relative p-10">
                                    {/* The 3D Object */}
                                    <HoloBadge />
                                    {/* Decorative rings - Responsive sizes */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[300px] md:h-[300px] border border-white/5 rounded-full animate-spin-slow pointer-events-none"></div>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] md:w-[400px] md:h-[400px] border border-white/5 rounded-full pointer-events-none"></div>
                                </div>
                             </div>
                        </div>
                    </FadeIn>
                </div>
            </section>
        )}

        {/* Main Content */}
        <section className="py-20 max-w-[95%] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <FadeIn>
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <h2 className="text-4xl font-bold text-white mb-2">Credential Vault</h2>
                        <p className="text-slate-400 max-w-lg">
                            A secure catalog of validated technical milestones.
                        </p>
                    </div>
                    {/* Category Tabs */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map(cat => (
                            <button key={cat} className="px-4 py-2 bg-[#111] border border-white/5 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all">
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </FadeIn>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {certificates.map((cert, index) => (
                    <FadeIn key={cert.id} delay={index * 50}>
                        <TiltCard className="p-1 h-full flex flex-col bg-[#0a0a0a]">
                            <div className="bg-[#111] h-full rounded-lg p-6 flex flex-col border border-white/5 hover:border-white/10 transition-colors">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="p-3 bg-gradient-to-br from-white/5 to-transparent rounded-xl border border-white/5 text-primary">
                                        <Shield className="w-6 h-6" />
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{cert.category}</span>
                                        <span className="text-[10px] text-slate-600 font-mono">{cert.date}</span>
                                    </div>
                                </div>
                                
                                <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-primary transition-colors">{cert.title}</h3>
                                <p className="text-sm text-slate-500 mb-6 flex-1">{cert.issuer}</p>
                                
                                <a href={cert.credentialUrl} className="w-full py-2 bg-white/5 hover:bg-white/10 rounded text-center text-xs font-bold uppercase tracking-widest text-white transition-colors border border-white/5">
                                    View Verification
                                </a>
                            </div>
                        </TiltCard>
                    </FadeIn>
                ))}
            </div>

        </section>
    </div>
  );
};

export default Certificates;