import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { categories } from '../data/newsData';
import Logo from '/logo.png';

const PinterestIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M8 22a8.88 8.88 0 0 1-1.91-4.8c0-3.32 1.62-5.46 3.8-5.46 1.7 0 2.65 1.13 2.65 2.5 0 2.52-1.12 4.67-2.67 4.67-.84 0-1.46-.66-1.26-1.47l1.09-4.22c.28-1.07.03-1.85-.75-1.85-1.12 0-2.3 1.05-2.3 3 0 1.25.68 2.09.68 2.09s-.23.9-.53 2.1c-.34 1.37-1 3.2-1.42 4.45A10 10 0 1 1 12 22a9.76 9.76 0 0 1-4 0" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-white text-black pt-16 pb-8 border-t-4 border-[#FF0000]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          <div>
            <Link to="/" className="inline-block mb-4">
              <div className="flex items-center gap-3">
                <img src={Logo} alt="TM24 News Logo" className="h-12 w-auto object-contain bg-white p-1 rounded-lg" />
                <span className="text-3xl font-black text-[#FF0000] tracking-tight">TM24<span className="text-[#0038FF]">NEWS</span></span>
              </div>
            </Link>
            <p className="text-zinc-600 mb-4 font-medium italic">“आवाज़ देश की…”</p>
            <p className="text-sm text-zinc-700 leading-relaxed mb-6">
              TM24 News एक स्वतंत्र डिजिटल न्यूज़ प्लेटफॉर्म है जो निष्पक्ष पत्रकारिता, जनहित और सामाजिक जागरूकता के लिए समर्पित है।
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com/tm24newsofficial" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-zinc-200 text-zinc-800 flex items-center justify-center hover:bg-[#0038FF] hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com/tm24newschannel" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-zinc-200 text-zinc-800 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://x.com/TM241078600" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-zinc-200 text-zinc-800 flex items-center justify-center hover:bg-zinc-700 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://pinterest.com/tm24newsofficial" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-zinc-200 text-zinc-800 flex items-center justify-center hover:bg-[#FF0000] hover:text-white transition-colors">
                <PinterestIcon />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 border-b border-zinc-300 pb-2 inline-block">समाचार कैटगरी</h3>
            <ul className="space-y-3 font-semibold text-zinc-600">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link to={`/category/${cat}`} className="hover:text-[#FF0000] transition-colors">• {cat}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 border-b border-zinc-300 pb-2 inline-block">त्वरित लिंक्स</h3>
            <ul className="space-y-3 font-semibold text-zinc-600">
              <li><Link to="/about" className="hover:text-[#FF0000] transition-colors">• हमारे बारे में</Link></li>
              <li><Link to="/mission" className="hover:text-[#FF0000] transition-colors">• हमारा मिशन</Link></li>
              <li><Link to="/vision" className="hover:text-[#FF0000] transition-colors">• हमारा विज़न</Link></li>
              <li><Link to="/latest" className="hover:text-[#FF0000] transition-colors">• ताज़ा खबरें</Link></li>
              <li><Link to="/videos" className="hover:text-[#FF0000] transition-colors">• वीडियो रिपोर्ट</Link></li>
              <li><Link to="/contact" className="hover:text-[#FF0000] transition-colors">• संपर्क करें</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 border-b border-zinc-300 pb-2 inline-block">संपर्क सूत्र</h3>
            <ul className="space-y-4 text-zinc-700 text-sm">
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-[#FF0000] shrink-0 mt-1" />
                <span>Tm24newsofficial@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-[#FF0000] shrink-0 mt-1" />
                <span>+91 9511150925</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#FF0000] shrink-0 mt-1" />
                <span>मुख्य कार्यालय, नई दिल्ली, भारत</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-zinc-300 pt-8 mt-8 text-center text-zinc-600 text-sm">
          <p>© {new Date().getFullYear()} TM24 News. सर्वाधिकार सुरक्षित।</p>
        </div>
      </div>
    </footer>
  );
}
