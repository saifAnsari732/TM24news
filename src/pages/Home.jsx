import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PlayCircle, ArrowRight } from 'lucide-react';
import { newsData, categories } from '../data/newsData';
import NewsCard from '../components/NewsCard';
import SectionHeader from '../components/SectionHeader';

export default function Home() {
  const trendingNews = newsData.filter(news => news.trending);
  
  return (
    <div className="bg-zinc-50 min-h-screen">
      <section className="relative min-h-[75vh] flex flex-col items-center justify-center overflow-hidden bg-white ">
        {/* Welcoming Tagline with brand Red-to-Blue Gradient and responsive phone sizing */}
        <h1 className="text-xl sm:text-3xl md:text-6xl  font-black text-center px-7 relative z-20 text-transparent bg-clip-text bg-gradient-to-r from-[#ac0202] via-[#a50202] to-[#002698] tracking-tight max-w-5xl leading-snug mb-4 py-4">
          देश और प्रदेश की हर बड़ी खबर सबसे पहले और सबसे तेज़।
        </h1>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10 text-center flex flex-col items-center pt-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto flex flex-col items-center"
          >
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 border border-zinc-200 bg-white/80 backdrop-blur-sm text-zinc-600 px-4 py-1.5 rounded-full text-xs md:text-sm font-bold mb-8 shadow-sm tracking-wide uppercase">
              <span className="w-2 h-2 bg-gradient-to-r from-[#FF0000] to-[#C40000] rounded-full animate-pulse"></span>
              भारत का उभरता न्यूज़ पोर्टल
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl  md:text-8xl font-black text-[#e00303] mb-2 tracking-tight leading-[1.1]">
              TM24 <span className="text-[#002ac2] drop-shadow-sm">NEWS</span>
            </h1>
            <h2 className="text-4xl md:text-6xl font-black text-zinc-800 mb-8 tracking-tight leading-tight">
              आवाज़ <span className="text-[#d40101]">देश की</span>...
            </h2>

            {/* Subtitle & Description */}
            <p className="text-xl md:text-2xl text-zinc-600 mb-2 font-medium">
              सच्ची • निष्पक्ष • तेज़ खबरें
            </p>
            <p className="text-lg md:text-xl text-zinc-500 mb-10 font-normal max-w-2xl">
              देश और समाज से जुड़े हर मुद्दे को जनता तक पहुँचाने के लिए समर्पित।
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center w-full sm:w-auto">
              <Link to="/latest" className="bg-gradient-to-r from-brand-blue to-brand-blue-dark text-white font-bold py-4 px-8 rounded-xl transition-all flex items-center justify-center gap-2 text-base shadow-[0_4px_14px_rgba(0,38,152,0.3)] hover:shadow-[0_6px_20px_rgba(0,38,152,0.45)] hover:scale-105">
                ताज़ा खबरें देखें <ArrowRight size={20} />
              </Link>
              <Link to="/videos" className="bg-gradient-to-r from-brand-red to-brand-red-dark text-white font-bold py-4 px-8 rounded-xl transition-all flex items-center justify-center gap-2 text-base shadow-[0_4px_14px_rgba(172,2,2,0.3)] hover:shadow-[0_6px_20px_rgba(172,2,2,0.45)] hover:scale-105">
                <PlayCircle size={20} /> वीडियो रिपोर्ट
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        
        <section className="mb-16">
          <SectionHeader title="ट्रेंडिंग न्यूज़" link="/latest" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingNews.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        </section>

        {/* Categories Sections */}
        {categories.slice(0, 4).map((category) => {
          const catNews = newsData.filter(news => news.category === category);
          if(catNews.length === 0) return null;
          
          return (
            <section key={category} className="mb-16 bg-white p-8 rounded-2xl shadow-sm border border-zinc-100">
              <SectionHeader title={category} link={`/category/${category}`} />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {catNews.map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))}
              </div>
            </section>
          )
        })}

        {/* Videos Section */}
        <section className="mb-16 bg-brand-dark rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red rounded-full opacity-20 blur-[100px]" />
          <SectionHeader title="वीडियो रिपोर्ट" link="/videos" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            <div className="group cursor-pointer">
              <div className="relative rounded-2xl overflow-hidden aspect-video shadow-2xl">
                <img src="https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&q=80" alt="Video cover" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 bg-brand-red rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.6)] group-hover:scale-110 transition-transform">
                    <PlayCircle size={32} className="text-white ml-1" />
                  </div>
                </div>
              </div>
              <h3 className="mt-4 text-xl font-bold group-hover:text-brand-red transition-colors">एक्सक्लूसिव: चुनावी माहौल में जनता की राय, ग्राउंड रिपोर्टिंग</h3>
            </div>
            <div className="flex flex-col gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="flex gap-4 group cursor-pointer bg-zinc-800/50 p-3 rounded-xl hover:bg-zinc-800 transition-colors">
                  <div className="w-1/3 relative rounded-lg overflow-hidden shrink-0">
                    <img src={`https://images.unsplash.com/photo-1577563908411-50cb98976ffe?w=400&q=80&${i}`} alt="thumbnail" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <PlayCircle size={24} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold line-clamp-2 group-hover:text-brand-red transition-colors text-sm md:text-base">शहर में बढ़ते प्रदूषण पर विशेष चर्चा, विशेषज्ञों की राय</h4>
                    <p className="text-xs text-zinc-400 mt-2">12 मई 2024</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
