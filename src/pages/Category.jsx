import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NewsContext } from '../context/NewsContext';
import NewsCard from '../components/NewsCard';
import DummyAd from '../components/DummyAd';

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

export default function Category() {
  const { name } = useParams();
  const { news, loading } = useContext(NewsContext);

  // Filter based on category name matching in Hindi
  const categoryNews = news.filter(item => item.category === name);

  return (
    <div className="bg-zinc-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-black text-brand-dark mb-4 border-l-8 border-brand-blue pl-4">
            <span className="text-brand-red">{name}</span> समाचार
          </h1>
          <p className="text-zinc-600 text-lg font-medium">{name} से जुड़ी सभी ताज़ा और विस्तृत खबरें पढ़ें।</p>
        </motion.div>

        {loading && news.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(n => <SkeletonCard key={n} />)}
          </div>
        ) : categoryNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {categoryNews.map((item, index) => (
              <React.Fragment key={item.id}>
                {/* News card */}
                <NewsCard news={item} />
                
                {/* Inline advertisement after 3rd card */}
                {index === 2 && (
                  <div className="col-span-1">
                    <DummyAd type="card" className="h-full" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div className="bg-white p-16 text-center rounded-3xl border border-zinc-200 shadow-sm max-w-2xl mx-auto">
            <p className="text-2xl font-black text-zinc-400 mb-2">खबरें लोड हो रही हैं या कोई खबर नहीं मिली।</p>
            <p className="text-zinc-500 font-semibold">कृपया थोड़ी देर बाद प्रयास करें या हमारे मुख्य पृष्ठ पर ताज़ा खबरें देखें।</p>
          </div>
        )}
      </div>
    </div>
  );
}
