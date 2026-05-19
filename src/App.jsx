import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
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

function App() {
  return (
    <Router>
        {/* Authentic Branding Tagline Bar - Gradient: First Red then Blue */}
        <div className="bg-gradient-to-r from-[#b30303] to-[#0429b3] text-white py-2.5 shadow-sm relative z-30">
          <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs md:text-sm font-bold tracking-wide text-center">
            <div className="flex items-center gap-2.5 justify-center flex-wrap">
              <span className="bg-white text-[#FF0000] text-[10px] uppercase px-2 py-0.5 rounded font-black shrink-0 animate-pulse tracking-widest border border-white/20">AUTHENTIC</span>
              <span>TM24 NEWS: देश का सबसे भरोसेमंद, निष्पक्ष और प्रमाणिक राष्ट्रीय डिजिटल समाचार पोर्टल</span>
            </div>
            <div className="hidden lg:flex items-center gap-4 text-zinc-100">
              <span>सच्ची खबरें • निष्पक्ष राय • तेज़ रिपोर्टिंग</span>
            </div>
          </div>
        </div>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        {/* <BreakingNewsTicker /> */}
        <Navbar />
        

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
  );
}

export default App;
