import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Award, Sparkles, ShieldCheck } from 'lucide-react';

const ADS_DATA = {
  banner: {
    title: "किसान डिजिटल (Kisan Digital) - वेबसाइट, मोबाइल ऐप & वीडियो एडिटिंग!",
    desc: "लखनऊ की नंबर 1 एजेंसी से बनवाएं आकर्षक व्यावसायिक वेबसाइट और मोबाइल ऐप। साथ ही पाएं डिजिटल मार्केटिंग, सोशल मीडिया SMM और प्रोफेशनल वीडियो एडिटिंग की सर्वश्रेष्ठ सेवाएं। आज ही संपर्क करें!",
    cta: "फ्री कंसल्टेशन लें",
    link: "https://www.kisandigital.org/",
    tagline: "वेबसाइट • मोबाइल ऐप • डिजिटल मार्केटिंग • वीडियो एडिटिंग • सोशल मीडिया",
    gradient: "from-[#0F172A] via-[#1E293B] to-[#0F172A]",
    accentColor: "text-blue-400",
    badge: "आल-इन-वन डिजिटल एजेंसी",
  },
  card: {
    title: "वेबसाइट बनवाना हो या मोबाइल ऐप - किसान डिजिटल",
    desc: "अपने बिज़नेस के लिए रिस्पॉन्सिव वेबसाइट, एंड्रॉइड/iOS ऐप, यूट्यूब वीडियो एडिटिंग और सोशल मीडिया मार्केटिंग (SMM) की प्रीमियम सेवाएं पाएं। अपने ब्रांड को दें एक नया डिजिटल मुकाम!",
    cta: "अभी संपर्क करें",
    link: "https://www.kisandigital.org/",
    tagline: "प्रीमियम डिज़ाइन, डेवलपमेंट और 100% बिज़नेस ग्रोथ",
    gradient: "from-indigo-950 via-slate-900 to-indigo-950",
    accentColor: "text-amber-400",
    badge: "वेब & ऐप & वीडियो",
  },
  sidebar: {
    title: "सोशल मीडिया & वीडियो एडिटिंग - किसान डिजिटल",
    desc: "क्या आप अपने व्यवसाय को बढ़ाना चाहते हैं? हमारे द्वारा वेबसाइट बनवाना, मोबाइल ऐप डेवलपमेंट, इंस्टाग्राम रील्स/यूट्यूब वीडियो एडिटिंग और सोशल मीडिया मार्केटिंग प्लान्स से लाखों नए ग्राहकों तक पहुंचें।",
    cta: "फ्री डिजिटल ऑडिट कराएं",
    link: "https://www.kisandigital.org/",
    tagline: "हर डिजिटल समस्या का एकमात्र समाधान",
    gradient: "from-zinc-900 via-neutral-950 to-zinc-900",
    accentColor: "text-emerald-400",
    badge: "डिजिटल मार्केटिंग & SMM",
  }
};

export default function DummyAd({ type = "banner", className = "" }) {
  const ad = ADS_DATA[type] || ADS_DATA.banner;
  const Icon = ad.icon;

  if (type === "banner") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.4 }}
        className={`relative overflow-hidden rounded-2xl shadow-xl border border-zinc-800 p-6 md:p-8 bg-gradient-to-r ${ad.gradient} text-white flex flex-col md:flex-row justify-between items-center gap-6 ${className}`}
      >
        {/* Glowing aura */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-red-600 text-white font-black px-3 py-1 rounded text-[10px] tracking-widest uppercase">
              प्रायोजित
            </span>
          
            <span className="text-zinc-400 text-xs font-semibold hidden sm:inline">
              {ad.tagline}
            </span>
          </div>

          <h4 className="text-xl md:text-2xl font-black tracking-tight mb-2 text-zinc-100">
            {ad.title}
          </h4>
          <p className="text-sm md:text-base text-zinc-300 font-medium max-w-3xl leading-relaxed">
            {ad.desc}
          </p>
        </div>

        <div className="relative z-10 shrink-0 w-full md:w-auto">
          <a
            href={ad.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-[#d40101] hover:bg-[#b00101] text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-[0_4px_12px_rgba(239,68,68,0.25)] hover:shadow-[0_6px_20px_rgba(239,68,68,0.4)] hover:scale-[1.03] active:scale-[0.98] text-base"
          >
            {ad.cta}
            <ExternalLink size={16} />
          </a>
        </div>
      </motion.div>
    );
  }

  if (type === "card") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -5 }}
        className={`overflow-hidden rounded-xl shadow-lg border border-zinc-200 flex flex-col justify-between h-full bg-gradient-to-br ${ad.gradient} text-white group ${className}`}
      >
        <div className="p-6 relative">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-red-600 text-white font-black px-2.5 py-0.5 rounded text-[10px] tracking-wider uppercase">
              प्रायोजित
            </span>
           
          </div>

          <h4 className="text-lg md:text-xl font-black mb-3 text-zinc-100 group-hover:text-amber-300 transition-colors leading-snug">
            {ad.title}
          </h4>
          <p className="text-zinc-300 text-sm font-medium leading-relaxed mb-4">
            {ad.desc}
          </p>
          <div className="text-[11px] text-zinc-400 font-bold border-t border-white/10 pt-3">
            {ad.tagline}
          </div>
        </div>

        <div className="p-5 bg-black/20 border-t border-white/10">
          <a
            href={ad.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 bg-[#d40101] text-white hover:bg-[#b00101] font-black py-2.5 rounded-lg transition-all hover:shadow-[0_4px_12px_rgba(212,1,1,0.25)] active:scale-[0.98] text-xs uppercase tracking-wide"
          >
            {ad.cta}
            <ExternalLink size={14} className="text-white" />
          </a>
        </div>
      </motion.div>
    );
  }

  // tall sidebar layout
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={`rounded-2xl shadow-xl border border-zinc-800 p-6 bg-gradient-to-b ${ad.gradient} text-white flex flex-col justify-between gap-6 relative overflow-hidden h-[450px] ${className}`}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-radial-gradient from-transparent via-black/10 to-black/30 pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="bg-red-600 text-white font-black px-2 py-0.5 rounded text-[10px] tracking-wider uppercase">
            विज्ञापन
          </span>
          {/* <span className="bg-zinc-800 border border-zinc-700 text-zinc-300 font-bold px-2 py-0.5 rounded text-[9px] flex items-center gap-1">
            <Icon size={12} className={ad.accentColor} />
            {ad.badge}
          </span> */}
        </div>

        <h4 className="text-lg font-black tracking-tight mb-4 text-zinc-100 leading-snug">
          {ad.title}
        </h4>
        <p className="text-xs text-zinc-300 leading-relaxed font-semibold mb-4">
          {ad.desc}
        </p>
      </div>

      <div className="relative z-10 mt-auto">
        <div className="text-[10px] text-zinc-400 font-bold text-center mb-3 bg-zinc-800/40 py-1.5 rounded-md border border-zinc-800">
          {ad.tagline}
        </div>
        <a
          href={ad.link}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 bg-[#d40101] hover:bg-[#b00101] text-white font-bold py-3 rounded-xl transition-all shadow-[0_4px_12px_rgba(212,1,1,0.25)] active:scale-[0.98] text-xs"
        >
          {ad.cta}
          <ExternalLink size={12} />
        </a>
      </div>
    </motion.div>
  );
}
