import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle, ArrowRight } from 'lucide-react';
import FadeIn from '../components/FadeIn.jsx';
import TiltCard from '../components/TiltCard.jsx';

const Contact = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);

            // Reset after showing success
            setTimeout(() => setIsSuccess(false), 5000);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-20 pb-20">

            {/* Background Ambience */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[100px] rounded-full opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 blur-[100px] rounded-full opacity-50"></div>
            </div>

            <div className="max-w-[95%] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <FadeIn>
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-extrabold text-white mb-6">Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Collaborate</span></h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light">
                            Have a vision for the next big thing in AI? I'm ready to help you build it.
                        </p>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Info Column */}
                    <div className="lg:col-span-5 space-y-6">
                        <FadeIn delay={100}>
                            <TiltCard className="p-8 h-full bg-[#0a0a0a]">
                                <h3 className="text-2xl font-bold text-white mb-8">Contact Information</h3>

                                <div className="space-y-8">
                                    <div className="flex items-start gap-5">
                                        <div className="p-3 bg-primary/10 rounded-xl text-primary border border-primary/20">
                                            <Mail className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Email</p>
                                            <p className="text-lg text-white font-medium">raghav.balansh@gmail.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-5">
                                        <div className="p-3 bg-primary/10 rounded-xl text-primary border border-primary/20">
                                            <Phone className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Phone</p>
                                            <p className="text-lg text-white font-medium">+91 83XXX XXXXX</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-5">
                                        <div className="p-3 bg-primary/10 rounded-xl text-primary border border-primary/20">
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Location</p>
                                            <p className="text-lg text-white font-medium">Delhi, India</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 p-6 bg-[#111] rounded-xl border border-white/5 relative overflow-hidden">
                                    <div className="absolute left-0 top-0 w-1 h-full bg-green-500"></div>
                                    <p className="text-slate-300 italic relative z-10">
                                        "I'm currently accepting new freelance projects and job offers. Let's discuss your requirements."
                                    </p>
                                </div>
                            </TiltCard>
                        </FadeIn>
                    </div>

                    {/* Form Column */}
                    <div className="lg:col-span-7">
                        <FadeIn delay={200}>
                            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl relative">
                                {isSuccess ? (
                                    <div className="min-h-[400px] flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-300">
                                        <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6 border border-green-500/20">
                                            <CheckCircle className="w-10 h-10" />
                                        </div>
                                        <h3 className="text-3xl font-bold text-white mb-2">Message Sent</h3>
                                        <p className="text-slate-400 mb-8 max-w-sm">
                                            Thanks for initiating the handshake. I'll get back to you within 24 hours.
                                        </p>
                                        <button
                                            onClick={() => setIsSuccess(false)}
                                            className="text-primary font-bold hover:text-white transition-colors flex items-center gap-2"
                                        >
                                            Send another <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label htmlFor="name" className="text-xs font-bold text-slate-400 uppercase tracking-wider">Name</label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    required
                                                    className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-slate-600"
                                                    placeholder="Raghav"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label htmlFor="email" className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email</label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    required
                                                    className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-slate-600"
                                                    placeholder="raghav@example.com"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="subject" className="text-xs font-bold text-slate-400 uppercase tracking-wider">Subject</label>
                                            <input
                                                type="text"
                                                id="subject"
                                                required
                                                className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-slate-600"
                                                placeholder="Project Collaboration"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="message" className="text-xs font-bold text-slate-400 uppercase tracking-wider">Message</label>
                                            <textarea
                                                id="message"
                                                rows={5}
                                                required
                                                className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none placeholder-slate-600"
                                                placeholder="Tell me about your project..."
                                            ></textarea>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-white text-black py-4 rounded-lg font-bold text-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,255,255,0.1)] transform active:scale-[0.99]"
                                        >
                                            {isSubmitting ? 'Transmitting...' : (
                                                <>Send Message <Send className="w-5 h-5" /></>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;