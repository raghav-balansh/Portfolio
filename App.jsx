import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Projects from './pages/Projects.jsx';
import Blog from './pages/Blog.jsx';
import Certificates from './pages/Certificates.jsx';
import Contact from './pages/Contact.jsx';
import { DataProvider, useData } from './contexts/DataContext.jsx';
import AIChatbot from './components/AIChatbot.jsx';

// Inner component to handle loading state access
const AppContent = () => {
  const { loading } = useData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505] text-primary">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="text-slate-400 font-medium animate-pulse tracking-widest text-sm uppercase">Initializing System...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-slate-50 font-sans antialiased selection:bg-primary/30 selection:text-white">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <AIChatbot />
    </div>
  );
};

function App() {
  return (
    <DataProvider>
      <Router>
        <AppContent />
      </Router>
    </DataProvider>
  );
}

export default App;