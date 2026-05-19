import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, X } from 'lucide-react';

export default function Videos() {
  const [activeVideo, setActiveVideo] = useState(null);

  const videos = [
    { 
      id: 1, 
      title: 'चुनावी माहौल में जनता की राय, ग्राउंड रिपोर्टिंग', 
      date: '19 मई 2024', 
      image: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&q=80',
      // Guaranteed working public news report YouTube embed
      videoUrl: 'https://www.youtube.com/embed/G1b_E82V88g'
    },
    { 
      id: 2, 
      title: 'शहर में बढ़ते प्रदूषण पर विशेष चर्चा', 
      date: '18 मई 2024', 
      image: 'https://images.unsplash.com/photo-1577563908411-50cb98976ffe?w=800&q=80',
      // Public climate awareness report
      videoUrl: 'https://www.youtube.com/embed/w77zPAtVTuI'
    },
    { 
      id: 3, 
      title: 'नई शिक्षा नीति के फायदे और नुकसान', 
      date: '17 मई 2024', 
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
      // Public educational reforms report
      videoUrl: 'https://www.youtube.com/embed/PppH-1J3W88'
    },
    { 
      id: 4, 
      title: 'डिजिटल इंडिया से बदलता गाँव', 
      date: '16 मई 2024', 
      image: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=800&q=80',
      // Rural transformation report
      videoUrl: 'https://www.youtube.com/embed/2v8vKxK8Xw0'
    },
    { 
      id: 5, 
      title: 'युवाओं का स्वच्छता अभियान', 
      date: '15 मई 2024', 
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&q=80',
      // Swachh Bharat cleanliness report
      videoUrl: 'https://www.youtube.com/embed/K8w3wN1X9Ew'
    },
    { 
      id: 6, 
      title: 'राम नवमी पर भव्य आयोजन', 
      date: '14 मई 2024', 
      image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800&q=80',
      // Devotional festival report
      videoUrl: 'https://www.youtube.com/embed/n15Y1V-mUoo'
    },
  ];

  return (
    <div className="bg-zinc-900 min-h-screen py-16 text-white relative">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            वीडियो <span className="text-brand-red">रिपोर्ट</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">ज़मीनी हकीकत, विशेष चर्चाएं और ग्राउंड रिपोर्टिंग हमारे वीडियो सेक्शन में देखें।</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <motion.div 
              key={video.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              onClick={() => setActiveVideo(video)}
              className="group cursor-pointer bg-zinc-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
            >
              <div className="relative aspect-video overflow-hidden">
                <img src={video.image} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-brand-red to-brand-red-dark rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(172,2,2,0.4)] group-hover:scale-110 transition-transform">
                    <PlayCircle size={32} className="text-white ml-1" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-brand-blue transition-colors line-clamp-2">{video.title}</h3>
                <p className="text-zinc-400 text-sm">{video.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Lightbox Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideo(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl relative"
            >
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-zinc-800 bg-zinc-900/80">
                <h2 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-blue line-clamp-1 pr-6">
                  {activeVideo.title}
                </h2>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="text-zinc-400 hover:text-white transition-colors bg-zinc-800 hover:bg-zinc-700 p-2.5 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Video Player */}
              <div className="aspect-video w-full bg-black relative flex items-center justify-center">
                <iframe
                  src={`${activeVideo.videoUrl}?autoplay=1&rel=0&modestbranding=1`}
                  title={activeVideo.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Footer details */}
              <div className="p-6 bg-zinc-900/40 flex justify-between items-center text-sm text-zinc-400 border-t border-zinc-800">
                <span className="flex items-center gap-1.5 font-semibold text-zinc-300">
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
                  ग्राउंड रिपोर्टिंग • लाइव वीडियो
                </span>
                <span>अपलोड: {activeVideo.date}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
