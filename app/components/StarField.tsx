'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useState, useRef } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  animationDuration: number;
  opacity: number;
  z: number; // depth for parallax
}

interface StarFieldProps {
  enableParallax?: boolean;
}

const StarField: React.FC<StarFieldProps> = ({ enableParallax = false }) => {
  const [stars, setStars] = useState<Star[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Parallax transforms for different layers
  const starSpeed1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const starSpeed2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const starSpeed3 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const starStretch = useTransform(scrollYProgress, [0, 0.5], [1, 2]);

  useEffect(() => {
    setIsMounted(true);
    
    const generateStars = () => {
      const newStars: Star[] = [];
      for (let i = 0; i < 200; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          animationDuration: Math.random() * 3 + 2,
          opacity: Math.random() * 0.8 + 0.2,
          z: Math.random() * 3, // 0-2 for different parallax layers
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  // Don't render anything until mounted on client
  if (!isMounted) {
    return (
      <div ref={ref} className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Empty placeholder during SSR */}
      </div>
    );
  }

  return (
    <div ref={ref} className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Background Stars with Parallax */}
      {stars.map((star) => {
        let yTransform, scaleYTransform;
        
        if (enableParallax) {
          switch (Math.floor(star.z)) {
            case 0:
              yTransform = starSpeed1;
              scaleYTransform = starStretch;
              break;
            case 1:
              yTransform = starSpeed2;
              scaleYTransform = starStretch;
              break;
            default:
              yTransform = starSpeed3;
              scaleYTransform = starStretch;
              break;
          }
        }
        
        return (
          <motion.div
            key={star.id}
            className="absolute bg-white rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              filter: enableParallax ? `blur(${Math.floor(star.z) * 0.5}px)` : 'none',
              y: enableParallax ? yTransform : 0,
              scaleY: enableParallax ? scaleYTransform : 1,
            }}
            animate={enableParallax ? {
              opacity: [star.opacity, star.opacity * 0.6, star.opacity],
            } : {
              opacity: [star.opacity, star.opacity * 0.3, star.opacity],
              scale: [1, 1.2, 1],
              x: [0, Math.random() * 20 - 10, 0],
              y: [0, Math.random() * 20 - 10, 0],
            }}
            transition={{
              duration: star.animationDuration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
      
      {/* Shooting stars with enhanced speed effect */}
      {[...Array(enableParallax ? 5 : 3)].map((_, i) => (
        <motion.div
          key={`shooting-${i}`}
          className={`absolute bg-white rounded-full ${enableParallax ? 'w-0.5 h-4' : 'w-1 h-1'}`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            y: enableParallax ? starSpeed2 : 0,
            filter: enableParallax ? 'blur(0.5px)' : 'none',
          }}
          animate={{
            x: enableParallax ? [0, 400] : [0, 200],
            y: enableParallax ? [0, 200] : [0, 100],
            opacity: [0, 1, 0],
            scaleY: enableParallax ? [1, 3, 1] : [1, 1, 1],
          }}
          transition={{
            duration: enableParallax ? 1.5 : 2,
            repeat: Infinity,
            delay: i * (enableParallax ? 2 : 3),
            ease: "easeOut",
          }}
        />
      ))}

      {/* Warp Speed Lines when parallax enabled */}
      {enableParallax && (
        <>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`warp-${i}`}
              className="absolute bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent h-0.5"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: '200px',
                y: starSpeed3,
              }}
              animate={{
                opacity: [0, 0.8, 0],
                scaleX: [0, 1, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeOut",
              }}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default StarField; 