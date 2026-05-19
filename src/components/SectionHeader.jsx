import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SectionHeader({ title, link }) {
  return (
    <div className="flex justify-between items-center mb-8 border-b border-zinc-200 pb-2 relative">
      <div className="relative">
        <h2 className="text-2xl md:text-3xl font-black text-zinc-900 pb-2">
          {title}
        </h2>
        <div className="absolute bottom-0 left-0 w-24 h-1 bg-gradient-to-r from-[#FF0000] to-[#0038FF] rounded-full -mb-[6px]"></div>
      </div>
      {link && (
        <Link to={link} className="flex items-center gap-1 text-sm font-bold text-zinc-500 hover:text-[#FF0000] transition-colors">
          सभी देखें <ChevronRight size={16} />
        </Link>
      )}
    </div>
  );
}
