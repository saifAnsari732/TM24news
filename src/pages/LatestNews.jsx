import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { newsData } from '../data/newsData';
import NewsCard from '../components/NewsCard';
import { SearchX, ArrowLeft } from 'lucide-react';

export default function LatestNews() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';

  // Filter based on query matching title, description, or category
  const filteredNews = newsData.filter((news) => {
    if (!query) return true;
    const lowerQuery = query.toLowerCase();
    return (
      news.title.toLowerCase().includes(lowerQuery) ||
      news.description.toLowerCase().includes(lowerQuery) ||
      news.category.toLowerCase().includes(lowerQuery)
    );
  });

  return (
    <div className="bg-zinc-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-brand-dark mb-4 border-l-8 border-brand-blue pl-4">
              {query ? (
                <>खोज परिणाम: <span className="text-brand-red">"{query}"</span></>
              ) : (
                <>ताज़ा <span className="text-brand-red">खबरें</span></>
              )}
            </h1>
            <p className="text-zinc-600 text-lg">
              {query 
                ? `"${query}" के लिए ${filteredNews.length} समाचार मिले।` 
                : "देश और दुनिया की सभी प्रमुख खबरें एक जगह पर।"}
            </p>
          </div>
          {query && (
            <Link to="/latest" className="self-start sm:self-auto inline-flex items-center gap-2 bg-zinc-200 hover:bg-zinc-300 text-zinc-700 font-bold py-2.5 px-5 rounded-full transition-all text-sm">
              <ArrowLeft size={16} /> खोज साफ करें
            </Link>
          )}
        </motion.div>

        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredNews.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-zinc-100 max-w-2xl mx-auto px-6 mt-12">
            <SearchX className="mx-auto text-zinc-400 mb-6" size={64} />
            <h3 className="text-2xl font-bold text-zinc-800 mb-2">कोई परिणाम नहीं मिला</h3>
            <p className="text-zinc-500 mb-8">
              क्षमा करें, हमें आपके खोजे गए शब्द "{query}" के लिए कोई समाचार नहीं मिला। कृपया कुछ और खोजें।
            </p>
            <Link to="/latest" className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-blue to-brand-blue-dark text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-all">
              <ArrowLeft size={18} /> सभी खबरें देखें
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
