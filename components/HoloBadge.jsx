import React from 'react';
import { Award, ShieldCheck } from 'lucide-react';

const HoloBadge = () => {
  return (
    <div className="w-[200px] h-[200px] md:w-[260px] md:h-[260px] perspective-badge">
      <div className="badge-spinner">
        {/* Front Face */}
        <div className="badge-face front">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-500/20 to-yellow-900/40 backdrop-blur-md border-[6px] border-yellow-500/50 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(234,179,8,0.3)] relative overflow-hidden">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.2)_0%,_transparent_70%)] animate-pulse"></div>
             <Award className="w-20 h-20 text-yellow-400 drop-shadow-[0_0_10px_rgba(234,179,8,0.8)]" />
             <div className="mt-2 text-yellow-200 font-bold tracking-[0.2em] text-xs uppercase">Certified</div>
             <div className="text-[10px] text-yellow-500/80 font-mono mt-1">PRO VERIFIED</div>
          </div>
        </div>

        {/* Back Face */}
        <div className="badge-face back">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500/20 to-blue-900/40 backdrop-blur-md border-[6px] border-blue-500/50 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.3)]">
             <ShieldCheck className="w-20 h-20 text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
             <div className="mt-2 text-blue-200 font-bold tracking-[0.2em] text-xs uppercase">Secure</div>
             <div className="text-[10px] text-blue-500/80 font-mono mt-1">BLOCKCHAIN ID</div>
          </div>
        </div>
      </div>

      <style>{`
        .perspective-badge {
          perspective: 1000px;
        }
        .badge-spinner {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: spinBadge 8s infinite linear;
        }
        .badge-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: visible;
          border-radius: 50%;
        }
        .front { transform: rotateY(0deg) translateZ(10px); }
        .back { transform: rotateY(180deg) translateZ(10px); }

        @keyframes spinBadge {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
      `}</style>
    </div>
  );
};

export default HoloBadge;