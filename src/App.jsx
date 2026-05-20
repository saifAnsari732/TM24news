import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MessageCircle, Megaphone, Mail, Phone } from 'lucide-react';
import Home from './pages/Home';
import About from './pages/About';
import Mission from './pages/Mission';
import Vision from './pages/Vision';
import LatestNews from './pages/LatestNews';
import Videos from './pages/Videos';
import Contact from './pages/Contact';
import ArticleDetail from './pages/ArticleDetail';
import Category from './pages/Category';
import ScrollToTop from './components/ScrollToTop';
import BreakingNewsTicker from './components/BreakingNewsTicker';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { NewsProvider } from './context/NewsContext';

function App() {
  return (
    <NewsProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
        {/* Top Premium Animated Advertisement & Contact Strip - Sticky Top-0 with Higher Height and Moving Marquee */}
        <div className="bg-gradient-to-r from-brand-red to-brand-blue text-white py-3.5 md:py-4 shadow-md sticky top-0 z-50 overflow-hidden flex items-center">
          <marquee 
            behavior="scroll" 
            direction="left" 
            scrollamount="6" 
            className="w-full text-sm md:text-base font-black tracking-wide flex items-center"
          >
            <a 
              href="https://wa.me/919511150925"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mx-12 hover:underline hover:text-emerald-300 transition-colors cursor-pointer"
            >
              <Megaphone size={18} className="animate-pulse shrink-0 text-white" />
              <span>📢 विज्ञापन के लिए संपर्क करें (WhatsApp): +91 9511150925</span>
            </a>
            <a 
              href="mailto:Tm24newsofficial@gmail.com"
              className="inline-flex items-center gap-2 mx-12 hover:underline hover:text-indigo-200 transition-colors cursor-pointer"
            >
              <Mail size={18} className="shrink-0 text-white" />
              <span>📧 ई-मेल: Tm24newsofficial@gmail.com</span>
            </a>
            <span className="inline-flex items-center gap-2 mx-12 text-zinc-100">
              <Megaphone size={18} className="animate-pulse shrink-0 text-white" />
              <span>🔥 देश और प्रदेश की हर बड़ी खबर सबसे पहले और सबसे तेज़!</span>
            </span>
            <a 
              href="https://wa.me/919511150925"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mx-12 hover:underline hover:text-emerald-300 transition-colors cursor-pointer"
            >
              <Megaphone size={18} className="animate-pulse shrink-0 text-white" />
              <span>📢 विज्ञापन के लिए संपर्क करें (WhatsApp): +91 9511150925</span>
            </a>
            <a 
              href="mailto:Tm24newsofficial@gmail.com"
              className="inline-flex items-center gap-2 mx-12 hover:underline hover:text-indigo-200 transition-colors cursor-pointer"
            >
              <Mail size={18} className="shrink-0 text-white" />
              <span>📧 ई-मेल: Tm24newsofficial@gmail.com</span>
            </a>
            <span className="inline-flex items-center gap-2 mx-12 text-zinc-100">
              <Megaphone size={18} className="animate-pulse shrink-0 text-white" />
              <span>🔥 देश और प्रदेश की हर बड़ी खबर सबसे पहले और सबसे तेज़!</span>
            </span>
          </marquee>
        </div>
        <Navbar />
        <BreakingNewsTicker />
        

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/vision" element={<Vision />} />
            <Route path="/latest" element={<LatestNews />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/news/:id" element={<ArticleDetail />} />
            <Route path="/category/:name" element={<Category />} />
          </Routes>
        </main>
        
        <Footer />

        {/* Floating WhatsApp Button */}
        <a 
          href="https://wa.me/919511150925" 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transition-all z-50 flex items-center justify-center"
        >
          <MessageCircle size={32} />
        </a>
      </div>
    </Router>
    </NewsProvider>
  );
}

export default App;
