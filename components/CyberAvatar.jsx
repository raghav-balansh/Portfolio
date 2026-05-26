import React from 'react';
import { Code, Cpu, Globe, Database } from 'lucide-react';

const CyberAvatar = () => {
  return (
    <div className="w-full h-[400px] flex items-center justify-center perspective-container overflow-visible">
      <div className="avatar-group">
        
        {/* --- HEAD --- */}
        <div className="head">
          <div className="face front">
            <div className="visor">
                <div className="eye left"></div>
                <div className="eye right"></div>
            </div>
            <div className="mouth"></div>
          </div>
          <div className="face back">
            <div className="port"></div>
          </div>
          <div className="face right">
            <div className="ear"></div>
          </div>
          <div className="face left">
            <div className="ear"></div>
          </div>
          <div className="face top">
            <div className="antenna-base">
                <div className="antenna-stick">
                    <div className="antenna-bulb"></div>
                </div>
            </div>
          </div>
          <div className="face bottom"></div>
        </div>

        {/* --- NECK --- */}
        <div className="neck"></div>

        {/* --- ORBITING SKILLS --- */}
        <div className="orbit-ring ring-1">
            <div className="skill-orb" style={{ animationDelay: '0s' }}>
                <Code className="w-4 h-4 text-blue-200" />
            </div>
        </div>
        <div className="orbit-ring ring-2">
            <div className="skill-orb" style={{ animationDelay: '-2s' }}>
                <Cpu className="w-4 h-4 text-purple-200" />
            </div>
        </div>
        <div className="orbit-ring ring-3">
             <div className="skill-orb" style={{ animationDelay: '-4s' }}>
                <Globe className="w-4 h-4 text-green-200" />
            </div>
        </div>

        {/* --- BODY HINT (Shoulders) --- */}
        <div className="shoulders">
             <div className="shoulder-plate"></div>
        </div>

      </div>

      <style>{`
        .perspective-container {
          perspective: 1000px;
        }

        .avatar-group {
          position: relative;
          width: 0;
          height: 0;
          transform-style: preserve-3d;
          animation: float 8s ease-in-out infinite;
        }

        /* --- HEAD GEOMETRY --- */
        .head {
          position: absolute;
          width: 120px;
          height: 140px;
          top: -100px;
          left: -60px;
          transform-style: preserve-3d;
          /* Smooth Idle Animation */
          animation: lookIdle 12s ease-in-out infinite;
        }

        .face {
          position: absolute;
          width: 120px;
          height: 140px;
          background: #111;
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: inset 0 0 20px rgba(0,0,0,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          backface-visibility: hidden;
        }

        .front  { transform: translateZ(60px); background: #1a1a1a; border-radius: 20px; }
        .back   { transform: rotateY(180deg) translateZ(60px); background: #111; border-radius: 20px; }
        .right  { transform: rotateY(90deg) translateZ(60px); width: 120px; left: 0; border-radius: 20px; }
        .left   { transform: rotateY(-90deg) translateZ(60px); width: 120px; left: 0; border-radius: 20px; }
        .top    { transform: rotateX(90deg) translateZ(70px); height: 120px; top: 0; border-radius: 20px; background: #0f0f0f; }
        .bottom { transform: rotateX(-90deg) translateZ(70px); height: 120px; top: 0; border-radius: 20px; background: #050505; }

        /* --- VISOR & EYES --- */
        .visor {
            width: 90px;
            height: 50px;
            background: #000;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(59,130,246,0.2);
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            overflow: hidden;
            border: 1px solid #333;
        }
        
        .eye {
            width: 20px;
            height: 8px;
            background: #3b82f6;
            border-radius: 4px;
            box-shadow: 0 0 15px #3b82f6;
            animation: blink 6s infinite;
        }

        /* --- ANTENNA --- */
        .antenna-base {
            width: 20px;
            height: 20px;
            background: #333;
            border-radius: 50%;
            transform: translateZ(10px);
            position: relative;
        }
        .antenna-stick {
            width: 2px;
            height: 40px;
            background: #666;
            position: absolute;
            bottom: 10px;
            left: 9px;
            transform-origin: bottom;
            /* Removed twitch for smoother look */
        }
        .antenna-bulb {
            width: 8px;
            height: 8px;
            background: #ef4444;
            border-radius: 50%;
            position: absolute;
            top: -4px;
            left: -3px;
            box-shadow: 0 0 10px #ef4444;
            animation: pulseRed 3s infinite ease-in-out;
        }

        /* --- EARS --- */
        .ear {
            width: 20px;
            height: 60px;
            background: #222;
            border-radius: 10px;
            border: 1px solid #444;
            transform: translateZ(10px);
            box-shadow: 0 0 10px rgba(59,130,246,0.1);
        }

        /* --- NECK --- */
        .neck {
            position: absolute;
            width: 40px;
            height: 40px;
            background: #222;
            top: 40px;
            left: -20px;
            transform: rotateX(90deg);
            border-radius: 50%;
            background: radial-gradient(circle, #333 0%, #111 100%);
        }

        /* --- SHOULDERS --- */
        .shoulders {
            position: absolute;
            width: 180px;
            height: 40px;
            top: 50px;
            left: -90px;
            transform-style: preserve-3d;
        }
        .shoulder-plate {
            width: 100%;
            height: 100%;
            background: #0a0a0a;
            border: 1px solid #333;
            border-radius: 30px 30px 0 0;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        /* --- ORBITALS --- */
        .orbit-ring {
            position: absolute;
            top: -30px;
            left: -80px;
            width: 160px;
            height: 160px;
            border: 1px solid rgba(59,130,246,0.1);
            border-radius: 50%;
            transform-style: preserve-3d;
        }

        .ring-1 { transform: rotateX(70deg) rotateY(10deg); animation: spinRing 15s linear infinite; }
        .ring-2 { transform: rotateX(70deg) rotateY(-40deg); width: 220px; height: 220px; left: -110px; top: -60px; animation: spinRing 20s linear infinite reverse; }
        .ring-3 { transform: rotateX(80deg); width: 280px; height: 280px; left: -140px; top: -90px; animation: spinRing 30s linear infinite; }

        .skill-orb {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%) translateY(-50%) rotateX(-90deg); /* Counteract ring rotation to keep icon upright-ish */
            width: 30px;
            height: 30px;
            background: rgba(0,0,0,0.8);
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 15px rgba(59,130,246,0.4);
        }

        /* --- ANIMATIONS --- */
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        @keyframes blink {
            0%, 96%, 100% { transform: scaleY(1); }
            98% { transform: scaleY(0.1); }
        }
        @keyframes spinRing {
            from { transform: rotateX(70deg) rotateZ(0deg); }
            to { transform: rotateX(70deg) rotateZ(360deg); }
        }
        /* Very subtle head movement */
        @keyframes lookIdle {
            0%, 100% { transform: rotateY(0deg) rotateX(0deg); }
            33% { transform: rotateY(5deg) rotateX(-2deg); }
            66% { transform: rotateY(-5deg) rotateX(2deg); }
        }
        @keyframes pulseRed {
            0%, 100% { opacity: 1; box-shadow: 0 0 10px #ef4444; }
            50% { opacity: 0.6; box-shadow: 0 0 4px #ef4444; }
        }
      `}</style>
    </div>
  );
};

export default CyberAvatar;