import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Mic, Laptop, Target } from 'lucide-react';

export default function About() {
  const infoCards = [
    { icon: <Users size={32} />, title: 'हम कौन हैं', desc: 'एक समर्पित टीम जो सच्ची पत्रकारिता में विश्वास रखती है।' },
    { icon: <Shield size={32} />, title: 'निष्पक्ष पत्रकारिता', desc: 'बिना किसी दबाव के, केवल सच दिखाने का संकल्प।' },
    { icon: <Mic size={32} />, title: 'ग्राउंड रिपोर्टिंग', desc: 'स्टूडियो से बाहर निकलकर, ज़मीनी हकीकत दिखाना।' },
    { icon: <Laptop size={32} />, title: 'डिजिटल मीडिया', desc: 'आधुनिक तकनीक के साथ तेज़ और सटीक खबरें।' },
    { icon: <Target size={32} />, title: 'सामाजिक जागरूकता', desc: 'समाज में सकारात्मक बदलाव लाने के प्रयास।' },
  ];

  return (
    <div className="bg-zinc-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-black text-brand-dark mb-6">
            TM24 News के <span className="text-brand-red">बारे में</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-blue to-brand-red mx-auto mb-8 rounded-full"></div>
          <p className="text-xl md:text-2xl text-zinc-600 leading-relaxed font-medium">
            “TM24 News एक उभरता हुआ डिजिटल न्यूज़ प्लेटफॉर्म है, जिसका उद्देश्य देश के हर नागरिक की आवाज़ को मंच देना और समाज से जुड़े वास्तविक मुद्दों को निष्पक्ष रूप से सामने लाना है।”
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {infoCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border-b-4 border-transparent hover:border-brand-blue group"
            >
              <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center text-brand-blue mb-6 group-hover:bg-gradient-to-r group-hover:from-brand-blue group-hover:to-brand-red group-hover:text-white transition-all shadow-inner">
                {card.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3">{card.title}</h3>
              <p className="text-zinc-600">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
