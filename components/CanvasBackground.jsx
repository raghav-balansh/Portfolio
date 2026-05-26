import React, { useRef, useEffect } from 'react';

const CanvasBackground = ({ mode = 'neural' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    let particles = [];
    let mouse = { x: null, y: null };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });

    // --- CONFIGURATION BASED ON MODE ---
    const config = {
        neural: { count: 60, color: 'rgba(59, 130, 246, 0.5)', speed: 0.2, connect: true }, // Slowed down
        stars: { count: 150, color: 'rgba(255, 255, 255, 0.8)', speed: 0.2, connect: false },
        rain: { count: 80, color: 'rgba(0, 255, 128, 0.5)', speed: 2, connect: false }
    };

    const currentConfig = config[mode] || config.neural;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * currentConfig.speed;
        this.vy = (Math.random() - 0.5) * currentConfig.speed;
        
        // Mode specific overrides
        if (mode === 'rain') {
            this.vx = 0;
            this.vy = Math.random() * 2 + 1;
            this.y = Math.random() * -canvas.height; // Start above
        }

        this.size = Math.random() * 2 + 1;
        this.color = currentConfig.color;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Neural/Stars: Bounce/Wrap
        if (mode !== 'rain') {
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        } else {
            // Rain: Reset to top
            if (this.y > canvas.height) {
                this.y = -10;
                this.x = Math.random() * canvas.width;
            }
        }

        // Mouse interaction (Neural only)
        if (mode === 'neural' && mouse.x != null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 200) {
              const force = (200 - distance) / 200;
              // Dampened interaction (0.6 -> 0.1)
              this.vx -= (dx / distance) * force * 0.1;
              this.vy -= (dy / distance) * force * 0.1;
          }
        }
      }

      draw() {
        ctx.fillStyle = this.color;
        
        if (mode === 'stars') {
            // Twinkle effect
            ctx.globalAlpha = Math.random() * 0.5 + 0.5;
        }
        
        ctx.beginPath();
        if (mode === 'rain') {
            ctx.rect(this.x, this.y, 2, 10);
        } else {
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        }
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    // Init Particles
    for (let i = 0; i < currentConfig.count; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      // Clear Canvas
      if (mode === 'rain') {
        // Trail effect
        ctx.fillStyle = 'rgba(5, 5, 5, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      // Draw connections (Neural Only)
      if (currentConfig.connect) {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
            let dx = particles[a].x - particles[b].x;
            let dy = particles[a].y - particles[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                ctx.strokeStyle = `rgba(59, 130, 246, ${1 - distance / 150})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
            }
        }
      }

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mode]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 bg-transparent pointer-events-none"
    />
  );
};

export default CanvasBackground;