import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User } from 'lucide-react';

export default function NewsCard({ news }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={news.image} 
          alt={news.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-4 left-4 bg-gradient-to-r from-brand-red to-brand-blue text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
          {news.category}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-brand-blue transition-colors">
          <Link to={`/news/${news.id}`}>
            {news.title && (news.title.includes('<') || news.title.includes('&')) ? (
              <span dangerouslySetInnerHTML={{ __html: news.title }} />
            ) : (
              news.title
            )}
          </Link>
        </h3>
        <p className="text-zinc-600 mb-4 line-clamp-2 text-sm">
          {news.description && (news.description.includes('<') || news.description.includes('&')) ? (
            <span dangerouslySetInnerHTML={{ __html: news.description }} />
          ) : (
            news.description
          )}
        </p>
        <div className="flex items-center justify-between text-xs text-zinc-500 font-medium">
          <div className="flex items-center gap-1">
            <User size={14} className="text-brand-blue" />
            {news.author}
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={14} className="text-brand-red" />
            {news.date}
          </div>
        </div>
        <Link to={`/news/${news.id}`} className="mt-4 block w-full text-center bg-[#b90000] text-white hover:bg-[#990000] hover:shadow-[0_4px_12px_rgba(172,2,2,0.25)] hover:scale-[1.02] active:scale-[0.98] transition-all py-2.5 rounded-lg font-bold text-sm">
          पूरा पढ़ें
        </Link>
      </div>
    </motion.div>
  );
}
