'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState, useEffect } from 'react';

const SpaceshipCockpit: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const frameOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const panelScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <motion.div 
      ref={ref}
      className="fixed inset-0 pointer-events-none z-30"
      style={{ opacity: frameOpacity }}
    >
      {/* Cockpit Frame - Top */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-900 via-gray-800 to-transparent"
        style={{ scale: panelScale }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent">
          {/* Top Panel Controls */}
          <div className="flex justify-between items-center p-4 h-full">
            {/* Left Top Panel */}
            <div className="flex space-x-4">
              <div className="bg-black/60 border border-cyan-400/50 rounded px-3 py-1">
                <div className="text-xs text-cyan-400 font-mono">SPEED</div>
                <div className="text-sm text-green-400 font-mono font-bold">12,450 km/h</div>
              </div>
              <div className="bg-black/60 border border-cyan-400/50 rounded px-3 py-1">
                <div className="text-xs text-cyan-400 font-mono">ALT</div>
                <div className="text-sm text-blue-400 font-mono font-bold">∞ LY</div>
              </div>
            </div>

            {/* Center Navigation */}
            {/* <div className="bg-black/60 border border-cyan-400/50 rounded-lg px-6 py-2">
              <div className="text-xs text-cyan-400/70 font-mono text-center">NAVIGATION STATUS</div>
              <div className="text-lg text-green-400 font-mono font-bold text-center">CRUISING</div>
            </div> */}

            {/* Right Top Panel */}
            <div className="flex space-x-4">
              <div className="bg-black/60 border border-cyan-400/50 rounded px-3 py-1">
                <div className="text-xs text-cyan-400 font-mono">FUEL</div>
                <div className="text-sm text-yellow-400 font-mono font-bold">98.7%</div>
              </div>
              <div className="bg-black/60 border border-cyan-400/50 rounded px-3 py-1">
                <div className="text-xs text-cyan-400 font-mono">TEMP</div>
                <div className="text-sm text-green-400 font-mono font-bold">OPTIMAL</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Cockpit Frame - Sides */}
      <motion.div 
        className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-gray-900 via-gray-800 to-transparent"
        style={{ scale: panelScale }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent">
          {/* Left Side Panel */}
          <div className="p-4 h-full flex flex-col justify-center space-y-4">
            {/* Vertical Status Lights */}
            {['PWR', 'NAV', 'ENG', 'COMM', 'LIFE'].map((system, index) => (
              <motion.div
                key={system}
                className="bg-black/60 border border-cyan-400/50 rounded p-2 text-center"
                animate={{
                  borderColor: index % 2 === 0 ? 'rgba(34, 197, 94, 0.5)' : 'rgba(34, 211, 238, 0.5)',
                }}
                transition={{ duration: 2, delay: index * 0.3, repeat: Infinity, repeatType: 'reverse' }}
              >
                <div className="text-xs text-cyan-400 font-mono">{system}</div>
                <motion.div 
                  className={`w-2 h-2 rounded-full mx-auto mt-1 ${index % 2 === 0 ? 'bg-green-400' : 'bg-cyan-400'}`}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-gray-900 via-gray-800 to-transparent"
        style={{ scale: panelScale }}
      >
        <div className="absolute inset-0 bg-gradient-to-l from-black/80 to-transparent">
          {/* Right Side Panel */}
          <div className="p-4 h-full flex flex-col justify-center space-y-4">
                         {/* Diagnostic Displays */}
             {['CPU', 'MEM', 'DISK', 'NET', 'SYS'].map((metric, index) => (
               <motion.div
                 key={metric}
                 className="bg-black/60 border border-orange-400/50 rounded p-2 text-center"
                 animate={{
                   borderColor: index % 3 === 0 ? 'rgba(251, 146, 60, 0.5)' : 'rgba(245, 158, 11, 0.5)',
                 }}
                 transition={{ duration: 1.8, delay: index * 0.4, repeat: Infinity, repeatType: 'reverse' }}
               >
                 <div className="text-xs text-orange-400 font-mono">{metric}</div>
                 <div className="text-xs text-yellow-400 font-mono font-bold">
                   {isMounted ? Math.floor(Math.random() * 40 + 60) : 75}%
                 </div>
               </motion.div>
             ))}
          </div>
        </div>
      </motion.div>

      {/* Cockpit Frame - Bottom */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-900 via-gray-800 to-transparent"
        style={{ scale: panelScale }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
          {/* Bottom Control Bar */}
          <div className="flex justify-between items-center p-4 h-full">
            <div className="flex space-x-6">
              {/* Bottom Left Controls */}
              <button className="bg-black/60 border border-red-400/50 rounded px-4 py-2 hover:border-red-400 transition-colors">
                <div className="text-xs text-red-400 font-mono">EMERGENCY</div>
              </button>
              <button className="bg-black/60 border border-yellow-400/50 rounded px-4 py-2 hover:border-yellow-400 transition-colors">
                <div className="text-xs text-yellow-400 font-mono">AUTO-PILOT</div>
              </button>
            </div>

            {/* Center Bottom Display */}
                         <div className="bg-black/60 border border-cyan-400/50 rounded-lg px-6 py-2">
               <div className="text-xs text-cyan-400/70 font-mono text-center">COORDS</div>
               <div className="text-sm text-green-400 font-mono font-bold text-center">
                 {isMounted ? (
                   <>X: {Math.random().toFixed(3)} | Y: {Math.random().toFixed(3)} | Z: {Math.random().toFixed(3)}</>
                 ) : (
                   <>X: 0.847 | Y: 0.329 | Z: 0.691</>
                 )}
               </div>
             </div>

            {/* Bottom Right Controls */}
            <div className="flex space-x-6">
              <button className="bg-black/60 border border-blue-400/50 rounded px-4 py-2 hover:border-blue-400 transition-colors">
                <div className="text-xs text-blue-400 font-mono">SHIELDS</div>
              </button>
              <button className="bg-black/60 border border-purple-400/50 rounded px-4 py-2 hover:border-purple-400 transition-colors">
                <div className="text-xs text-purple-400 font-mono">WARP</div>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Corner Frame Elements */}
      <div className="absolute top-4 left-4 w-16 h-16 border-l-4 border-t-4 border-cyan-400/60"></div>
      <div className="absolute top-4 right-4 w-16 h-16 border-r-4 border-t-4 border-cyan-400/60"></div>
      <div className="absolute bottom-4 left-4 w-16 h-16 border-l-4 border-b-4 border-cyan-400/60"></div>
      <div className="absolute bottom-4 right-4 w-16 h-16 border-r-4 border-b-4 border-cyan-400/60"></div>

      {/* Scan Lines Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34, 211, 238, 0.03) 2px, rgba(34, 211, 238, 0.03) 4px)',
        }}
        animate={{
          backgroundPosition: ['0px', '4px'],
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </motion.div>
  );
};

export default SpaceshipCockpit; 