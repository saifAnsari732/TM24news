import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div className="bg-zinc-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-black text-brand-dark mb-4">
            संपर्क <span className="text-brand-red">करें</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-blue to-brand-red mx-auto rounded-full mb-6"></div>
          <p className="text-zinc-600 text-lg max-w-2xl mx-auto">
            किसी भी जानकारी, सुझाव या शिकायत के लिए आप हमसे नीचे दिए गए माध्यमों से संपर्क कर सकते हैं।
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-zinc-100"
          >
            <h2 className="text-3xl font-black mb-8 text-zinc-800">हमें संदेश भेजें</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-zinc-700 font-bold mb-2">आपका नाम</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all" placeholder="अपना नाम दर्ज करें" />
              </div>
              <div>
                <label className="block text-zinc-700 font-bold mb-2">ईमेल एड्रेस</label>
                <input type="email" className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all" placeholder="अपना ईमेल दर्ज करें" />
              </div>
              <div>
                <label className="block text-zinc-700 font-bold mb-2">संदेश</label>
                <textarea rows="5" className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all resize-none" placeholder="अपना संदेश यहाँ लिखें..."></textarea>
              </div>
              <button type="button" className="w-full bg-gradient-to-r from-brand-red to-brand-red-dark hover:from-brand-red-dark hover:to-brand-red text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-lg shadow-lg hover:shadow-[0_4px_14px_rgba(255,0,0,0.3)] hover:scale-[1.02]">
                <Send size={20} /> संदेश भेजें
              </button>
            </form>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-8"
          >
            <div className="bg-zinc-800 p-8 md:p-10 rounded-3xl text-white shadow-xl">
              <h2 className="text-3xl font-black mb-8">संपर्क विवरण</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="text-red-700" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">ईमेल</h3>
                    <p className="text-zinc-400">Tm24newsofficial@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="text-brand-blue" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">व्हाट्सएप / फोन</h3>
                    <p className="text-zinc-400">+91 9511150925</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="text-brand-blue" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">पता</h3>
                    <p className="text-zinc-400">Alambag Lucknow UP</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-200 rounded-3xl h-64 overflow-hidden relative shadow-inner">
              {/* Dummy Map Placeholder */}
              <div className="absolute inset-0 bg-zinc-300 flex items-center justify-center flex-col text-zinc-500">
                <MapPin size={48} className="mb-2 text-zinc-400" />
                <p className="font-bold">Google Maps Integration</p>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </div>
  );
}
