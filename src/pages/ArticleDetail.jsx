import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, Share2, Facebook, Twitter, Link2, ArrowLeft } from 'lucide-react';
import { NewsContext } from '../context/NewsContext';
import DummyAd from '../components/DummyAd';

export default function ArticleDetail() {
  const { id } = useParams();
  const { news, loading } = useContext(NewsContext);

  // Find the exact news article by matching its string-based or numeric ID
  const article = news.find(n => String(n.id) === String(id));

  // Dynamically extract related articles matching the same category, or fallback to the latest
  const relatedNews = news
    .filter(n => String(n.id) !== String(id))
    .filter(n => !article || n.category === article.category)
    .slice(0, 3);

  // If we don't find articles in same category, just take the first three other articles
  const fallbackRelatedNews = relatedNews.length > 0 
    ? relatedNews 
    : news.filter(n => String(n.id) !== String(id)).slice(0, 3);

  if (loading && news.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center flex-col gap-4 bg-zinc-50">
        <div className="w-12 h-12 border-4 border-brand-red border-t-brand-blue rounded-full animate-spin"></div>
        <p className="text-zinc-600 font-black animate-pulse">खबर लोड की जा रही है...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-zinc-50 gap-4">
        <h2 className="text-2xl font-black text-zinc-600">क्षमा करें, खबर नहीं मिली</h2>
        <Link to="/" className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-red to-brand-blue text-white font-bold py-2.5 px-6 rounded-xl hover:shadow-lg transition-all">
          <ArrowLeft size={18} /> मुख्य पृष्ठ पर जाएं
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Article Content */}
          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:w-2/3"
          >
            <div className="mb-6">
              <Link to={`/category/${article.category}`} className="inline-block bg-gradient-to-r from-brand-red to-brand-red-dark text-white text-sm font-bold px-4 py-1.5 rounded-full mb-4 hover:shadow-lg transition-all">
                {article.category}
              </Link>
              <h1 className="text-3xl md:text-5xl font-black text-brand-dark mb-6 leading-tight">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-zinc-500 font-medium pb-6 border-b border-zinc-200">
                <div className="flex items-center gap-2">
                  <User size={18} className="text-brand-blue" />
                  {article.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-brand-red" />
                  {article.date}
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="rounded-2xl overflow-hidden mb-8 shadow-lg max-h-[500px]">
              <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
            </div>

            {/* Article Body */}
            <div className="prose prose-lg max-w-none mb-12 prose-p:font-medium prose-p:text-zinc-700">
              <p className="text-xl text-zinc-600 font-bold mb-6 border-l-4 border-brand-blue pl-4 leading-relaxed">
                {article.description}
              </p>
              <div className="text-zinc-800 text-lg leading-relaxed space-y-6 font-normal">
                {/* Safe rendering of description/content paragraphs */}
                {article.content.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              <p className="text-zinc-500 text-sm mt-8 border-t border-zinc-100 pt-4 italic">
                * देश और प्रदेश की हर बड़ी खबर सबसे पहले और सबसे तेज़ पढ़ने के लिए बने रहें TM24 न्यूज़ के साथ।
              </p>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-4 py-6 border-t border-b border-zinc-200 mb-12">
              <span className="font-bold text-zinc-700 flex items-center gap-2"><Share2 size={20} /> शेयर करें:</span>
              <button 
                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all shadow-sm cursor-pointer"
              >
                <Facebook size={18} />
              </button>
              <button 
                onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`, '_blank')}
                className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600 hover:scale-105 active:scale-95 transition-all shadow-sm cursor-pointer"
              >
                <Twitter size={18} />
              </button>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("लिंक कॉपी कर लिया गया है!");
                }}
                className="w-10 h-10 rounded-full bg-zinc-200 text-zinc-700 flex items-center justify-center hover:bg-zinc-300 hover:scale-105 active:scale-95 transition-all shadow-sm cursor-pointer"
                title="लिंक कॉपी करें"
              >
                <Link2 size={18} />
              </button>
            </div>
            
            {/* Inline horizontal banner ad inside the article detail view */}
            <div className="my-8">
              <DummyAd type="banner" />
            </div>
          </motion.article>

          {/* Sidebar */}
          <aside className="lg:w-1/3">
            <div className="sticky top-28 space-y-8">
              
              {/* Related news block */}
              <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100 shadow-sm">
                <div className="relative border-b border-zinc-200 pb-2 mb-6">
                  <h3 className="text-xl font-black text-zinc-900 pb-1">संबंधित खबरें</h3>
                  <div className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-brand-blue to-brand-red rounded-full -mb-[1px]"></div>
                </div>
                <div className="space-y-6">
                  {fallbackRelatedNews.map((item) => (
                    <div key={item.id} className="flex gap-4 group">
                      <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 shadow-sm">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div>
                        <Link to={`/news/${item.id}`} className="font-bold line-clamp-2 group-hover:text-brand-blue transition-colors text-zinc-800 leading-snug text-sm md:text-base">
                          {item.title}
                        </Link>
                        <p className="text-xs text-zinc-500 mt-2 font-medium">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Premium Tall Sidebar Advertisement */}
              <div className="w-full">
                <DummyAd type="sidebar" />
              </div>

            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
