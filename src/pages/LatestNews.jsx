import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { NewsContext } from '../context/NewsContext';
import NewsCard from '../components/NewsCard';
import DummyAd from '../components/DummyAd';
import { SearchX, ArrowLeft } from 'lucide-react';

const SkeletonCard = () => (
  <div className="bg-white rounded-xl overflow-hidden shadow-md animate-pulse border border-zinc-200 p-5 space-y-4">
    <div className="bg-zinc-200 h-40 w-full rounded-lg"></div>
    <div className="h-4 bg-zinc-200 rounded w-2/3"></div>
    <div className="space-y-2">
      <div className="h-3 bg-zinc-200 rounded w-full"></div>
      <div className="h-3 bg-zinc-200 rounded w-5/6"></div>
    </div>
    <div className="h-8 bg-zinc-200 rounded w-full mt-4"></div>
  </div>
);

export default function LatestNews() {
  const { news, loading } = useContext(NewsContext);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';

  // Filter based on query matching title, description, content or category
  const filteredNews = news.filter((item) => {
    if (!query) return true;
    const lowerQuery = query.toLowerCase();
    return (
      (item.title && item.title.toLowerCase().includes(lowerQuery)) ||
      (item.description && item.description.toLowerCase().includes(lowerQuery)) ||
      (item.content && item.content.toLowerCase().includes(lowerQuery)) ||
      (item.category && item.category.toLowerCase().includes(lowerQuery))
    );
  });

  return (
    <div className="bg-zinc-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        
        {/* Page Header */}
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
            <Link to="/latest" className="self-start sm:self-auto inline-flex items-center gap-2 bg-zinc-200 hover:bg-zinc-300 text-zinc-700 font-bold py-2.5 px-5 rounded-full transition-all text-sm shadow-sm hover:shadow-md">
              <ArrowLeft size={16} /> खोज साफ करें
            </Link>
          )}
        </motion.div>

        {loading && news.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <SkeletonCard key={n} />)}
          </div>
        ) : filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredNews.map((item, index) => (
              <React.Fragment key={item.id}>
                {/* News card */}
                <NewsCard news={item} />
                
                {/* Dynamically insert inline ad card at index 3 */}
                {index === 3 && (
                  <div className="col-span-1">
                    <DummyAd type="card" className="h-full" />
                  </div>
                )}

                {/* Dynamically insert full-width horizontal banner ad after index 7 */}
                {index === 7 && (
                  <div className="col-span-full my-4">
                    <DummyAd type="banner" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-zinc-100 max-w-2xl mx-auto px-6 mt-12">
            <SearchX className="mx-auto text-zinc-400 mb-6 animate-bounce" size={64} />
            <h3 className="text-2xl font-bold text-zinc-800 mb-2">कोई परिणाम नहीं मिला</h3>
            <p className="text-zinc-500 mb-8 font-semibold">
              क्षमा करें, हमें आपके खोजे गए शब्द "{query}" के लिए कोई समाचार नहीं मिला। कृपया कुछ और खोजें।
            </p>
            <Link to="/latest" className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-blue to-brand-blue-dark text-white font-bold py-3.5 px-6 rounded-xl hover:shadow-lg transition-all">
              <ArrowLeft size={18} /> सभी खबरें देखें
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
