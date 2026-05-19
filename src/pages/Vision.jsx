import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Globe, Zap, Smartphone, Award } from 'lucide-react';

export default function Vision() {
  const visions = [
    { icon: <Award />, text: "विश्वसनीय पत्रकारिता का प्रतीक बनना" },
    { icon: <Globe />, text: "ग्रामीण और शहरी क्षेत्रों की समान कवरेज" },
    { icon: <Smartphone />, text: "डिजिटल मीडिया के भविष्य का नेतृत्व" },
    { icon: <Eye />, text: "नागरिक पत्रकारिता को प्रोत्साहन" },
    { icon: <Zap />, text: "राष्ट्रीय स्तर पर नंबर 1 न्यूज़ ब्रांड" }
  ];

  return (
    <div className="min-h-screen py-20 bg-zinc-50 relative">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-black text-brand-dark mb-4">
            हमारा <span className="text-brand-red">विज़न</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-blue to-brand-red mx-auto rounded-full"></div>
        </motion.div>

        <div className="max-w-5xl mx-auto relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-brand-blue/20 -translate-y-1/2 hidden md:block rounded-full"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {visions.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, type: "spring" }}
                className="relative flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl mb-6 relative z-10 border-4 border-zinc-50 group-hover:border-brand-blue transition-colors text-brand-red group-hover:bg-gradient-to-r group-hover:from-brand-blue group-hover:to-brand-red group-hover:text-white group-hover:scale-110 duration-300">
                  {React.cloneElement(item.icon, { size: 32 })}
                </div>
                <h3 className="font-bold text-lg text-zinc-800 bg-white p-4 rounded-xl shadow-sm border border-zinc-100 w-full">{item.text}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
