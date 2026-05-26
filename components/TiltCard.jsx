import React, { useRef, useState } from 'react';

const TiltCard = ({ children, className = "", onClick }) => {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate mouse position relative to the card center
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    // Calculate rotation (limit max rotation to +/- 15 degrees)
    const x = yPct * -20; 
    const y = xPct * 20;

    setRotation({ x, y });
    setOpacity(1); // Show spotlight/glare
    setGlarePosition({ x: (mouseX / width) * 100, y: (mouseY / height) * 100 });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setOpacity(0);
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-all duration-200 ease-out ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.02, 1.02, 1.02)`,
      }}
    >
      <div className="relative h-full w-full rounded-xl bg-[#0a0a0a] border border-white/10 overflow-hidden shadow-2xl">
        
        {/* Content */}
        <div className="relative z-10 h-full">
          {children}
        </div>

        {/* Glare/Spotlight Effect */}
        <div
          className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
          style={{
            opacity: opacity,
            background: `radial-gradient(
              circle at ${glarePosition.x}% ${glarePosition.y}%, 
              rgba(59, 130, 246, 0.15), 
              transparent 80%
            )`
          }}
        />
        
        {/* Surface Sheen */}
        <div 
            className="pointer-events-none absolute inset-0 z-30 mix-blend-overlay transition-opacity duration-300"
            style={{
                opacity: opacity * 0.5,
                background: `linear-gradient(
                    105deg,
                    transparent 40%,
                    rgba(255, 255, 255, 0.2) 45%,
                    rgba(255, 255, 255, 0.0) 50%
                )`,
                transform: `translateX(${rotation.y * 2}px)` // Move sheen opposite to rotation
            }}
        />
      </div>
    </div>
  );
};

export default TiltCard;