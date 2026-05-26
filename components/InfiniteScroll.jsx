import React from 'react';

const InfiniteScroll = ({ items }) => {
  return (
    <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
      <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll hover:[animation-play-state:paused]">
        {items.map((item, idx) => (
          <li key={`original-${idx}`} className="flex items-center gap-2 px-6 py-3 bg-[#111] border border-white/10 rounded-full whitespace-nowrap">
            {item.icon}
            <span className="text-lg font-bold text-slate-300">{item.name}</span>
          </li>
        ))}
      </ul>
      <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll hover:[animation-play-state:paused]" aria-hidden="true">
        {items.map((item, idx) => (
          <li key={`duplicate-${idx}`} className="flex items-center gap-2 px-6 py-3 bg-[#111] border border-white/10 rounded-full whitespace-nowrap">
            {item.icon}
            <span className="text-lg font-bold text-slate-300">{item.name}</span>
          </li>
        ))}
      </ul>
      <style>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default InfiniteScroll;