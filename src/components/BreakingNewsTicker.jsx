import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { NewsContext } from '../context/NewsContext';

export default function BreakingNewsTicker() {
  const { news } = useContext(NewsContext);
  const breakingNews = news.filter(item => item.breaking);

  if (breakingNews.length === 0) return null;

  return (
    <div className="bg-brand-red text-white flex items-center h-10 overflow-hidden relative z-50">
      <div className="flex items-center bg-brand-dark h-full px-4 font-bold min-w-max z-10 relative shadow-[5px_0_10px_rgba(0,0,0,0.2)]">
        <Zap size={18} className="mr-2 text-yellow-400 animate-pulse" />
        ब्रेकिंग न्यूज़
      </div>
      <div className="flex-1 overflow-hidden relative">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["100%", "-100%"] }}
          transition={{
            repeat: Infinity,
            duration: 25,
            ease: "linear",
          }}
        >
          {breakingNews.map((news, index) => (
            <span key={news.id} className="mx-8 flex items-center">
              <span className="w-2 h-2 bg-white rounded-full mr-3 animate-ping" />
              <Link to={`/news/${news.id}`} className="hover:underline font-medium">
                {news.title}
              </Link>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
