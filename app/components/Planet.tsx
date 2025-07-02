'use client';

import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

interface PlanetProps {
  size?: number;
  color?: string;
  x?: number;
  y?: number;
  animationDuration?: number;
  hasRing?: boolean; // Make it deterministic
}

const Planet: React.FC<PlanetProps> = ({
  size = 100,
  color = 'from-purple-500 to-blue-600',
  x = 50,
  y = 50,
  animationDuration = 20,
  hasRing, // Will be undefined for random behavior
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [showRing, setShowRing] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (hasRing === undefined) {
      setShowRing(Math.random() > 0.7);
    } else {
      setShowRing(hasRing);
    }
  }, [hasRing]);
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
      }}
      animate={{
        rotate: 360,
      }}
      transition={{
        duration: animationDuration,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <div
        className={`rounded-full bg-gradient-to-br ${color} opacity-80 blur-[1px]`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      />
      
      {/* Glow effect */}
      <div
        className={`absolute inset-0 rounded-full bg-gradient-to-br ${color} opacity-30 blur-md`}
        style={{
          width: `${size * 1.5}px`,
          height: `${size * 1.5}px`,
          left: `${size * -0.25}px`,
          top: `${size * -0.25}px`,
        }}
      />
      
      {/* Ring effect for some planets */}
      {isMounted && showRing && (
        <div
          className="absolute border border-white/20 rounded-full"
          style={{
            width: `${size * 1.8}px`,
            height: `${size * 0.3}px`,
            left: `${size * -0.4}px`,
            top: `${size * 0.35}px`,
            transform: 'rotateX(75deg)',
          }}
        />
      )}
    </motion.div>
  );
};

export default Planet; 