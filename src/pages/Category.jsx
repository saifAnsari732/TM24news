import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { newsData } from '../data/newsData';
import NewsCard from '../components/NewsCard';

export default function Category() {
  const { name } = useParams();
  const categoryNews = newsData.filter(news => news.category === name);

  return (
    <div className="bg-zinc-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-black text-brand-dark mb-4 border-l-8 border-brand-blue pl-4">
            <span className="text-brand-red">{name}</span> समाचार
          </h1>
          <p className="text-zinc-600 text-lg">{name} से जुड़ी सभी विस्तृत खबरें पढ़ें।</p>
        </motion.div>

        {categoryNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {categoryNews.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 text-center rounded-2xl border border-zinc-100 shadow-sm">
            <p className="text-2xl font-bold text-zinc-400">इस कैटेगरी में अभी कोई खबर उपलब्ध नहीं है।</p>
          </div>
        )}
      </div>
    </div>
  );
}
