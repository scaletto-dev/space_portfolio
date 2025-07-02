'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import StarField from './StarField';
import Planet from './Planet';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [systemStatus, setSystemStatus] = useState('INITIALIZING');
  const [radarAngle, setRadarAngle] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setSystemStatus('LAUNCH READY');
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onLoadingComplete, 500);
          }, 1000);
          return 100;
        }
        
        const newProgress = prev + Math.random() * 12 + 3;
        
        // Update system status based on progress
        if (newProgress < 25) setSystemStatus('INITIALIZING SYSTEMS');
        else if (newProgress < 50) setSystemStatus('ENGINES WARMING UP');
        else if (newProgress < 75) setSystemStatus('NAVIGATION READY');
        else if (newProgress < 95) setSystemStatus('FINAL CHECKS');
        else setSystemStatus('LAUNCH READY');
        
        return newProgress;
      });
    }, 180);

    // Radar animation
    const radarInterval = setInterval(() => {
      setRadarAngle(prev => (prev + 2) % 360);
    }, 50);

    return () => {
      clearInterval(interval);
      clearInterval(radarInterval);
    };
  }, [onLoadingComplete]);

  const StatusPanel: React.FC<{ title: string; value: string; color?: string }> = ({ 
    title, value, color = 'text-green-400' 
  }) => (
    <div className="bg-black/50 border border-cyan-400/30 rounded p-2">
      <div className="text-xs text-cyan-400/70 font-mono">{title}</div>
      <div className={`text-sm font-mono font-bold ${color}`}>{value}</div>
    </div>
  );

  const DigitalButton: React.FC<{ label: string; active?: boolean }> = ({ 
    label, active = false 
  }) => (
    <motion.div
      className={`
        relative border-2 rounded-lg p-2 text-xs font-mono text-center cursor-pointer
        ${active 
          ? 'border-green-400 bg-green-400/20 text-green-400 shadow-lg shadow-green-400/30' 
          : 'border-gray-500 bg-gray-800/50 text-gray-400'
        }
      `}
      animate={active ? {
        boxShadow: [
          '0 0 10px rgba(34, 197, 94, 0.3)',
          '0 0 20px rgba(34, 197, 94, 0.6)',
          '0 0 10px rgba(34, 197, 94, 0.3)'
        ]
      } : {}}
      transition={{ duration: 1, repeat: Infinity }}
    >
      {label}
      {active && (
        <div className="absolute inset-0 border-2 border-green-400 rounded-lg animate-pulse" />
      )}
    </motion.div>
  );

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden"
          style={{
            background: 'radial-gradient(ellipse at center, #0a0f1c 0%, #000000 70%)',
          }}
          exit={{
            opacity: 0,
            scale: 1.1,
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        >
          {/* Background Stars */}
          <StarField />
          
          {/* Planets */}
          <Planet 
            size={60} 
            color="from-purple-400 to-pink-600" 
            x={85} 
            y={15} 
            animationDuration={25}
            hasRing={false}
          />
          <Planet 
            size={40} 
            color="from-blue-400 to-cyan-600" 
            x={10} 
            y={80} 
            animationDuration={30}
            hasRing={true}
          />

          {/* Main Control Panel */}
          <div className="flex items-center justify-center min-h-screen p-4">
            <motion.div
              className="relative w-full max-w-6xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {/* Control Panel Container */}
              <div className="relative bg-black/80 border-2 border-cyan-400/50 rounded-2xl p-6 shadow-2xl">
                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-cyan-400"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-cyan-400"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-cyan-400"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-cyan-400"></div>
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl blur-xl -z-10" />
                
                {/* Header */}
                <div className="text-center mb-6">
                  <motion.h1
                    className="text-3xl md:text-5xl font-bold text-cyan-400 font-mono mb-2"
                    animate={{
                      textShadow: [
                        '0 0 10px rgba(34, 211, 238, 0.5)',
                        '0 0 20px rgba(34, 211, 238, 0.8)',
                        '0 0 10px rgba(34, 211, 238, 0.5)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ĐANG KHởI ĐộNG
                  </motion.h1>
                  <div className="text-cyan-400/70 font-mono text-sm">
                    STARSHIP NAVIGATION SYSTEM v2.1.47
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Panel - Status */}
                  <div className="space-y-4">
                    <h3 className="text-cyan-400 font-mono text-lg border-b border-cyan-400/30 pb-2">
                      SYSTEM STATUS
                    </h3>
                    
                    <StatusPanel title="ENGINE" value="ONLINE" color="text-green-400" />
                    <StatusPanel title="NAVIGATION" value="ACTIVE" color="text-blue-400" />
                    <StatusPanel title="SHIELDS" value="CHARGING" color="text-yellow-400" />
                    <StatusPanel title="COMMUNICATIONS" value="READY" color="text-green-400" />
                    
                    {/* Status Lights */}
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <DigitalButton label="PWR" active={loadingProgress > 10} />
                      <DigitalButton label="NAV" active={loadingProgress > 30} />
                      <DigitalButton label="ENG" active={loadingProgress > 50} />
                      <DigitalButton label="COM" active={loadingProgress > 70} />
                    </div>
                  </div>

                  {/* Center Panel - Radar & Main Display */}
                  <div className="space-y-4">
                    {/* Radar */}
                    <div className="relative">
                      <h3 className="text-cyan-400 font-mono text-lg border-b border-cyan-400/30 pb-2 mb-4">
                        RADAR SCOPE
                      </h3>
                      <div className="relative w-48 h-48 mx-auto bg-black/70 border-2 border-green-400/50 rounded-full">
                        {/* Radar grid */}
                        <div className="absolute inset-4 border border-green-400/20 rounded-full"></div>
                        <div className="absolute inset-8 border border-green-400/20 rounded-full"></div>
                        <div className="absolute inset-12 border border-green-400/20 rounded-full"></div>
                        
                        {/* Radar lines */}
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-green-400/20"></div>
                        <div className="absolute left-1/2 top-0 w-0.5 h-full bg-green-400/20"></div>
                        
                        {/* Radar sweep */}
                        <motion.div
                          className="absolute top-1/2 left-1/2 w-0.5 h-20 bg-gradient-to-t from-green-400 to-transparent origin-bottom"
                          style={{ transformOrigin: 'bottom center' }}
                          animate={{ rotate: radarAngle }}
                          transition={{ duration: 0.05, ease: "linear" }}
                        />
                        
                        {/* Radar blips */}
                        <div className="absolute top-8 right-12 w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                        <div className="absolute bottom-16 left-8 w-1 h-1 bg-yellow-400 rounded-full animate-pulse"></div>
                        <div className="absolute top-20 left-20 w-1 h-1 bg-red-400 rounded-full animate-pulse"></div>
                      </div>
                    </div>

                    {/* Progress Section */}
                    <div className="bg-black/50 border border-cyan-400/30 rounded p-4">
                      <div className="text-cyan-400 font-mono text-sm mb-2">INITIALIZATION PROGRESS</div>
                      <div className="w-full bg-gray-800 border border-cyan-400/30 rounded-full h-4 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
                          style={{ width: `${loadingProgress}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <div className="flex justify-between text-cyan-400/70 font-mono text-xs mt-1">
                        <span>{systemStatus}</span>
                        <span>{Math.round(loadingProgress)}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Panel - Diagnostics */}
                  <div className="space-y-4">
                    <h3 className="text-cyan-400 font-mono text-lg border-b border-cyan-400/30 pb-2">
                      DIAGNOSTICS
                    </h3>
                    
                    <StatusPanel title="CPU LOAD" value={`${Math.round(loadingProgress * 0.8)}%`} />
                    <StatusPanel title="MEMORY" value="4.2/8.0 GB" color="text-yellow-400" />
                    <StatusPanel title="FUEL LEVEL" value="98.7%" color="text-green-400" />
                    <StatusPanel title="TEMPERATURE" value="NOMINAL" color="text-blue-400" />
                    
                    {/* Digital Readouts */}
                    <div className="bg-black/70 border border-cyan-400/30 rounded p-3">
                      <div className="font-mono text-xs space-y-1">
                        <div className="text-green-400">
                          &gt; {systemStatus.toLowerCase()}...
                        </div>
                        <div className="text-cyan-400/70">
                          &gt; checking subsystems...
                        </div>
                        <div className="text-yellow-400">
                          &gt; calibrating sensors...
                        </div>
                        {loadingProgress > 50 && (
                          <div className="text-green-400">
                            &gt; all systems nominal
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Status Bar */}
                <div className="mt-6 flex justify-between items-center bg-black/50 border border-cyan-400/30 rounded p-3">
                  <div className="flex space-x-4 text-xs font-mono">
                    <span className="text-green-400">● ONLINE</span>
                    <span className="text-blue-400">● CONNECTED</span>
                    <span className="text-yellow-400">● STANDBY</span>
                  </div>
                  <div className="text-cyan-400/70 font-mono text-xs">
                    {isMounted ? (
                      <>COORD: {Math.random().toFixed(4)} | {Math.random().toFixed(4)}</>
                    ) : (
                      <>COORD: 0.8472 | 0.3291</>
                    )}
                  </div>
                  <div className="text-cyan-400/70 font-mono text-xs">
                    {isMounted ? new Date().toLocaleTimeString() : '12:00:00'}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Floating UI particles */}
          {isMounted && [...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen; 