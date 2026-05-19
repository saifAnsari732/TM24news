import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, Share2, Facebook, Twitter, Link2 } from 'lucide-react';
import { newsData } from '../data/newsData';

export default function ArticleDetail() {
  const { id } = useParams();
  const news = newsData.find(n => n.id === parseInt(id));
  const relatedNews = newsData.filter(n => n.id !== parseInt(id)).slice(0, 3);

  if (!news) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <h2 className="text-2xl font-bold text-zinc-500">खबर नहीं मिली</h2>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Article */}
          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:w-2/3"
          >
            <div className="mb-6">
              <Link to={`/category/${news.category}`} className="inline-block bg-gradient-to-r from-brand-red to-brand-red-dark text-white text-sm font-bold px-4 py-1.5 rounded-full mb-4 hover:shadow-lg transition-all">
                {news.category}
              </Link>
              <h1 className="text-3xl md:text-5xl font-black text-brand-dark mb-6 leading-tight">
                {news.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-zinc-500 font-medium pb-6 border-b border-zinc-200">
                <div className="flex items-center gap-2">
                  <User size={18} className="text-brand-blue" />
                  {news.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-brand-red" />
                  {news.date}
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden mb-8 shadow-lg">
              <img src={news.image} alt={news.title} className="w-full h-auto object-cover max-h-[500px]" />
            </div>

            <div className="prose prose-lg max-w-none mb-12 prose-p:font-medium prose-p:text-zinc-700">
              <p className="text-xl text-zinc-600 font-bold mb-6 border-l-4 border-brand-blue pl-4">
                {news.description}
              </p>
              <p>{news.content}</p>
              <p>इस खबर से जुड़ी अन्य महत्वपूर्ण जानकारियां भी जल्द ही साझा की जाएंगी। प्रशासन ने इस मामले में कड़े कदम उठाने का आश्वासन दिया है। जनता से भी अपील की गई है कि वे अफवाहों पर ध्यान न दें और आधिकारिक जानकारी पर ही भरोसा करें।</p>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-4 py-6 border-t border-b border-zinc-200 mb-12">
              <span className="font-bold text-zinc-700 flex items-center gap-2"><Share2 size={20} /> शेयर करें:</span>
              <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors"><Facebook size={18} /></button>
              <button className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600 transition-colors"><Twitter size={18} /></button>
              <button className="w-10 h-10 rounded-full bg-zinc-200 text-zinc-700 flex items-center justify-center hover:bg-zinc-300 transition-colors"><Link2 size={18} /></button>
            </div>
          </motion.article>

          {/* Sidebar */}
          <aside className="lg:w-1/3">
            <div className="sticky top-24">
              <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100 shadow-sm mb-8">
                <div className="relative border-b border-zinc-200 pb-2 mb-6">
                  <h3 className="text-xl font-black text-zinc-900 pb-1">संबंधित खबरें</h3>
                  <div className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-brand-blue to-brand-red rounded-full -mb-[1px]"></div>
                </div>
                <div className="space-y-6">
                  {relatedNews.map((item) => (
                    <div key={item.id} className="flex gap-4 group">
                      <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div>
                        <Link to={`/news/${item.id}`} className="font-bold line-clamp-2 group-hover:text-brand-blue transition-colors text-zinc-800 leading-snug">
                          {item.title}
                        </Link>
                        <p className="text-xs text-zinc-500 mt-2">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ad Placeholder */}
              <div className="bg-zinc-100 p-8 rounded-2xl border border-zinc-200 flex items-center justify-center text-zinc-400 h-64 font-bold">
                विज्ञापन
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
