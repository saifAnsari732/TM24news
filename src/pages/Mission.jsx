import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Heart, Sparkles, Target, Award } from 'lucide-react';

export default function Mission() {
  const missions = [
    {
      title: "निष्पक्ष पत्रकारिता",
      desc: "बिना किसी राजनीतिक या व्यावसायिक दबाव के, सत्य को उसके वास्तविक रूप में प्रस्तुत करना।",
      icon: Shield,
      color: "from-[#FF0000] to-[#C40000]"
    },
    {
      title: "जनता की आवाज़",
      desc: "समाज के सबसे निचले पायदान पर खड़े व्यक्ति की समस्याओं को सरकार और प्रशासन तक पहुँचाना।",
      icon: Eye,
      color: "from-[#002698] to-[#001A66]"
    },
    {
      title: "सामाजिक जागरूकता",
      desc: "रूढ़िवादिता और अंधविश्वास के खिलाफ खड़े होकर वैज्ञानिक सोच और ज्ञान का प्रसार करना।",
      icon: Heart,
      color: "from-[#FF0000] to-[#C40000]"
    },
    {
      title: "पारदर्शिता और विश्वसनीयता",
      desc: "हर खबर की गहराई से जांच-पड़ताल और तथ्यों के सत्यापन के बाद ही पाठकों तक पहुंचाना।",
      icon: Sparkles,
      color: "from-[#002698] to-[#001A66]"
    },
    {
      title: "सटीक और तेज़ सूचना",
      desc: "आधुनिक तकनीकों का उपयोग कर सबसे तेज़ गति से विश्वसनीय समाचार प्रसारित करना।",
      icon: Target,
      color: "from-[#FF0000] to-[#C40000]"
    },
    {
      title: "राष्ट्र कल्याण",
      desc: "देश की एकता, अखंडता और विकास से जुड़े मुद्दों को सर्वोच्च प्राथमिकता देना।",
      icon: Award,
      color: "from-[#002698] to-[#001A66]"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-zinc-50 via-white to-zinc-100 min-h-screen py-16 text-zinc-800 relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute w-[500px] h-[500px] bg-[#0038FF]/5 rounded-full -top-40 -left-20 blur-[120px]"></div>
        <div className="absolute w-[500px] h-[500px] bg-[#FF0000]/5 rounded-full bottom-20 right-20 blur-[120px]"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#FF0000] font-bold text-sm tracking-wider uppercase bg-red-50 px-4 py-1.5 rounded-full border border-red-100 inline-block mb-4 shadow-sm">
              हमारा संकल्प, हमारी निष्ठा
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
              हमारा <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] to-[#0038FF]">मिशन</span>
            </h1>
            <div className="h-1.5 w-32 bg-gradient-to-r from-[#FF0000] to-[#0038FF] mx-auto rounded-full mb-6"></div>
            <p className="text-xl md:text-2xl font-medium leading-relaxed text-zinc-600 italic">
              “TM24 का मिशन है देश के हर नागरिक की आवाज़ बनना, निष्पक्ष, सटीक और तेज़ खबरों के माध्यम से सच्चाई को हर कोने तक पहुँचाना।”
            </p>
          </motion.div>
        </div>

        {/* Mission Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {missions.map((mission, index) => {
            const Icon = mission.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-white p-8 rounded-2xl shadow-md border border-zinc-100 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${mission.color} text-white flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 mb-3 group-hover:text-[#0038FF] transition-colors">
                    {mission.title}
                  </h3>
                  <p className="text-zinc-600 leading-relaxed text-base font-normal">
                    {mission.desc}
                  </p>
                </div>
                <div className="w-full h-1 bg-zinc-100 rounded-full mt-6 overflow-hidden">
                  <div className={`h-full w-0 group-hover:w-full bg-gradient-to-r ${mission.color} transition-all duration-500`}></div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Text Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-[#FF0000]/10 via-[#0038FF]/10 to-[#FF0000]/10 p-1 rounded-2xl shadow-lg">
            <div className="bg-white p-8 md:p-12 rounded-[14px] text-center relative overflow-hidden">
              {/* Subtle background icons/decorations */}
              <div className="absolute -top-10 -left-10 text-zinc-100 select-none opacity-20 pointer-events-none">
                <Target size={120} />
              </div>
              <div className="absolute -bottom-10 -right-10 text-zinc-100 select-none opacity-20 pointer-events-none">
                <Award size={120} />
              </div>

              <h4 className="text-2xl md:text-3xl font-black text-zinc-900 mb-6 tracking-tight">
                राष्ट्र के विकास में हमारी सहभागिता
              </h4>
              <p className="text-lg md:text-xl text-zinc-700 leading-relaxed max-w-2xl mx-auto font-medium mb-8">
                “सत्यता, निष्पक्षता और राष्ट्रहित ही हमारा परम संकल्प है। हम केवल समाचार ही नहीं पहुँचाते, बल्कि समाज में सकारात्मक बदलाव लाने और नागरिक अधिकारों की रक्षा के लिए निरंतर प्रयास करते हैं।”
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 items-center border-t border-zinc-100 pt-8">
                <div className="text-center px-6 border-r border-zinc-100 last:border-none">
                  <div className="text-3xl font-black text-[#FF0000]">100%</div>
                  <div className="text-sm font-semibold text-zinc-500 mt-1">सच्चाई और प्रमाणिकता</div>
                </div>
                <div className="text-center px-6 border-r border-zinc-100 last:border-none">
                  <div className="text-3xl font-black text-[#0038FF]">24/7</div>
                  <div className="text-sm font-semibold text-zinc-500 mt-1">निरंतर ताज़ा अपडेट्स</div>
                </div>
                <div className="text-center px-6">
                  <div className="text-3xl font-black text-[#FF0000]">लाखों</div>
                  <div className="text-sm font-semibold text-zinc-500 mt-1">भरोसेमंद पाठक</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
