"use client";

import { useState, useRef } from "react";
import LoadingScreen from "./components/LoadingScreen";
import StarField from "./components/StarField";
import SpaceshipCockpit from "./components/SpaceshipCockpit";
import ControlPanels from "./components/ControlPanels";
import { motion, useScroll, useTransform } from "motion/react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <main ref={ref} className="relative overflow-hidden">
      {/* Deep Space Background */}
      <div
        className="fixed inset-0 -z-20"
        style={{
          background:
            "radial-gradient(ellipse at center, #0a0f1c 0%, #000000 70%)",
        }}
      />

      {/* Stars Background with Parallax */}
      <StarField enableParallax={true} />

      {/* Spaceship Cockpit Frame */}
      <SpaceshipCockpit />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section - Cockpit View */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            style={{
              y: heroY,
              scale: heroScale,
              opacity: heroOpacity,
            }}
          >
            {/* Cockpit Status */}
            <motion.div
              className="mb-8 bg-black/40 border border-cyan-400/30 rounded-lg p-6 backdrop-blur-md"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="text-cyan-400 font-mono text-sm">
                TRANG WEB THUộC QUYềN Sở HữU CủA TRươNG THế BảO
              </div>
              <div className="text-green-400 font-mono text-xs mt-2">
                SIGNAL STRENGTH: ████████░░ 80%
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="bg-black/30 border border-cyan-400/20 rounded p-2">
                  <div className="text-cyan-400/70 text-xs">SYSTEMS</div>
                  <div className="text-green-400">ONLINE</div>
                </div>
                <div className="bg-black/30 border border-cyan-400/20 rounded p-2">
                  <div className="text-cyan-400/70 text-xs">SHIELDS</div>
                  <div className="text-blue-400">ACTIVE</div>
                </div>
                <div className="bg-black/30 border border-cyan-400/20 rounded p-2">
                  <div className="text-cyan-400/70 text-xs">POWER</div>
                  <div className="text-yellow-400">98.7%</div>
                </div>
              </div>
            </motion.div>

            {/* Hero Title */}
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white mb-8 font-mono relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className="relative">
                <span className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 blur" />
                <span className="relative bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  SPACE
                </span>
              </div>
              <div className="relative mt-2">
                <span className="absolute -inset-1 bg-gradient-to-r from-purple-400/20 to-pink-400/20 blur" />
                <span className="relative bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  PORTFOLIO
                </span>
              </div>
            </motion.h1>

            {/* Mission Brief */}
            <motion.div
              className="bg-black/50 border border-cyan-400/30 rounded-lg p-8 backdrop-blur-md mb-8 relative group"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/10 via-blue-400/10 to-purple-400/10 rounded-lg blur-md group-hover:blur-lg transition-all" />
              <div className="relative">
                <div className="text-cyan-400/70 font-mono text-xs mb-3">
                  Tàu không gian đã vào quỹ đạo:
                </div>
                <p className="text-lg md:text-xl text-white/90 leading-relaxed font-mono">
                  KHAI PHÁ VÙNG KHÔNG GIAN Số - XÂY DựNG CÁC KHÔNG GIAN HIệN ĐạI
                </p>
              </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              className="mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <div className="text-cyan-400/50 font-mono text-xs mb-2">
                SCROLL TO NAVIGATE
              </div>
              <motion.div
                className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-transparent mx-auto rounded-full relative"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="absolute -inset-1 bg-cyan-400/20 blur animate-pulse" />
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Mission Details Section */}
        <section className="min-h-screen flex items-center justify-center px-4 pt-20">
          <motion.div
            className="w-full"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            {/* Command Terminal */}
            <div className="bg-black/40 border border-cyan-400/30 rounded-lg backdrop-blur-md container mx-auto h-[60vh] w-[70vw]">
              {/* Terminal Header */}
              <div className="border-b border-cyan-400/20 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="text-cyan-400/70 font-mono text-sm">
                      SYSTEM TERMINAL V1.0.0
                    </div>
                  </div>
                  <div className="text-cyan-400/70 font-mono text-sm">
                    LAST UPDATE: 2025-07-02 10:00:00
                  </div>
                </div>
              </div>
              
              {/* Terminal Content */}
              <div className="p-6">
                <ControlPanels />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Additional sections for parallax effect */}
        <div className="h-screen"></div>
      </div>
    </main>
  );
}
