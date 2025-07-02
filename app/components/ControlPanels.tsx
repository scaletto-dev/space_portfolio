import { motion } from 'motion/react';
import { useState } from 'react';

type PanelType = 'profile' | 'skills' | 'projects' | 'contact';

interface PanelData {
  id: PanelType;
  title: string;
  icon: string;
  color: string;
  description: string;
}

const panels: PanelData[] = [
  {
    id: 'profile',
    title: 'Hồ Sơ',
    icon: '👨‍🚀',
    color: 'cyan',
    description: 'Personal Information'
  },
  {
    id: 'skills',
    title: 'KỸ NĂNG',
    icon: '🛠️',
    color: 'green',
    description: 'Technical Skills'
  },
  {
    id: 'projects',
    title: 'Dự ÁN',
    icon: '🚀',
    color: 'purple',
    description: 'Featured Projects'
  },
  {
    id: 'contact',
    title: 'LIÊN Hệ',
    icon: '📡',
    color: 'yellow',
    description: 'Contact Details'
  },
];

interface StatusLightProps {
  active: boolean;
}

const StatusLight: React.FC<StatusLightProps> = ({ active }) => (
  <div className="relative">
    <div className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-green-400' : 'bg-gray-600'}`} />
    <div
      className={`absolute inset-0 rounded-full ${
        active ? 'animate-ping bg-green-400/50' : ''
      }`}
    />
  </div>
);

// const SystemMonitor = () => {
//   const [logs, setLogs] = useState<string[]>([]);
//   const [cpuUsage, setCpuUsage] = useState(0);
//   const [memoryUsage, setMemoryUsage] = useState(0);
//   const [networkSpeed, setNetworkSpeed] = useState(0);
//   const [timestamp, setTimestamp] = useState('');

//   useEffect(() => {
//     const updateMetrics = () => {
//       setCpuUsage(Math.random() * 30 + 60);
//       setMemoryUsage(Math.random() * 20 + 70);
//       setNetworkSpeed(Math.random() * 500 + 100);
      
//       const now = new Date();
//       setTimestamp(now.toISOString().split('T')[1].split('.')[0]);
      
//       const newLog = [
//         'Scanning quantum networks...',
//         'Analyzing space-time coordinates...',
//         'Monitoring system resources...',
//         'Checking shield integrity...',
//         'Updating navigation data...',
//         'Calibrating sensors...',
//         'Processing telemetry data...',
//         'Syncing with satellite network...',
//       ][Math.floor(Math.random() * 8)];

//       setLogs(prev => [...prev.slice(-4), `[${timestamp}] ${newLog}`]);
//     };

//     const interval = setInterval(updateMetrics, 2000);
//     return () => clearInterval(interval);
//   }, [timestamp]);

//   return (
//     <div className="mt-8 bg-black/40 border border-cyan-400/30 rounded-lg p-4 font-mono">
//       <div className="flex items-center justify-between mb-4">
//         <div className="text-cyan-400 text-sm">SYSTEM MONITOR</div>
//         <div className="text-cyan-400/70 text-sm">{timestamp}</div>
//       </div>

//       <div className="grid grid-cols-3 gap-4 mb-6">
//         {/* CPU Usage */}
//         <div className="bg-black/30 border border-cyan-400/20 rounded p-3">
//           <div className="flex justify-between items-center mb-2">
//             <div className="text-cyan-400/70 text-sm">CPU</div>
//             <div className="text-cyan-400 text-sm">{cpuUsage.toFixed(1)}%</div>
//           </div>
//           <div className="w-full bg-gray-900 rounded-full h-1.5">
//             <motion.div
//               className="bg-gradient-to-r from-cyan-400 to-blue-400 h-1.5 rounded-full"
//               animate={{ width: `${cpuUsage}%` }}
//               transition={{ duration: 0.5 }}
//             />
//           </div>
//         </div>

//         {/* Memory Usage */}
//         <div className="bg-black/30 border border-purple-400/20 rounded p-3">
//           <div className="flex justify-between items-center mb-2">
//             <div className="text-purple-400/70 text-sm">MEMORY</div>
//             <div className="text-purple-400 text-sm">{memoryUsage.toFixed(1)}%</div>
//           </div>
//           <div className="w-full bg-gray-900 rounded-full h-1.5">
//             <motion.div
//               className="bg-gradient-to-r from-purple-400 to-pink-400 h-1.5 rounded-full"
//               animate={{ width: `${memoryUsage}%` }}
//               transition={{ duration: 0.5 }}
//             />
//           </div>
//         </div>

//         {/* Network Speed */}
//         <div className="bg-black/30 border border-green-400/20 rounded p-3">
//           <div className="flex justify-between items-center mb-2">
//             <div className="text-green-400/70 text-sm">NETWORK</div>
//             <div className="text-green-400 text-sm">{networkSpeed.toFixed(0)} MB/s</div>
//           </div>
//           <div className="w-full bg-gray-900 rounded-full h-1.5">
//             <motion.div
//               className="bg-gradient-to-r from-green-400 to-emerald-400 h-1.5 rounded-full"
//               animate={{ width: `${(networkSpeed / 600) * 100}%` }}
//               transition={{ duration: 0.5 }}
//             />
//           </div>
//         </div>
//       </div>

//       {/* System Logs */}
//       <div className="bg-black/50 border border-cyan-400/20 rounded p-3">
//         <div className="text-cyan-400/70 text-sm mb-2">SYSTEM LOGS</div>
//         <div className="space-y-1">
//           {logs.map((log, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="text-sm"
//             >
//               <span className="text-green-400">&gt;</span>{" "}
//               <span className="text-white/70">{log}</span>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* Quick Stats */}
//       <div className="grid grid-cols-4 gap-4 mt-4">
//         <StatusIndicator
//           label="QUANTUM LINK"
//           value="STABLE"
//           color="cyan"
//           icon="📡"
//         />
//         <StatusIndicator
//           label="SHIELDS"
//           value="97.3%"
//           color="blue"
//           icon="🛡️"
//         />
//         <StatusIndicator
//           label="POWER"
//           value="OPTIMAL"
//           color="green"
//           icon="⚡"
//         />
//         <StatusIndicator
//           label="AI STATUS"
//           value="ONLINE"
//           color="purple"
//           icon="🤖"
//         />
//       </div>
//     </div>
//   );
// };

// interface StatusIndicatorProps {
//   label: string;
//   value: string;
//   color: string;
//   icon: string;
// }

// const StatusIndicator: React.FC<StatusIndicatorProps> = ({ label, value, color, icon }) => (
//   <div className={`bg-black/30 border border-${color}-400/20 rounded p-2`}>
//     <div className="flex items-center space-x-2">
//       <div className="text-lg">{icon}</div>
//       <div>
//         <div className={`text-${color}-400/70 text-xs`}>{label}</div>
//         <div className={`text-${color}-400 text-sm`}>{value}</div>
//       </div>
//     </div>
//   </div>
// );

const ControlPanels = () => {
  const [activePanel, setActivePanel] = useState<PanelType>('profile');

  const renderPanel = () => {
    switch (activePanel) {
      case 'profile':
        return <ProfilePanel />;
      case 'skills':
        return <SkillsPanel />;
      case 'projects':
        return <ProjectsPanel />;
      case 'contact':
        return <ContactPanel />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Control Panel Navigation */}
      <div className="grid grid-cols-4 gap-4">
        {panels.map((panel) => (
          <motion.button
            key={panel.id}
            className={`relative group overflow-hidden`}
            onClick={() => setActivePanel(panel.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={`absolute inset-0 bg-${panel.color}-400/20 rounded-lg blur group-hover:blur-md transition-all`} />
            <div
              className={`relative bg-black/60 border rounded-lg p-4 text-center transition-all
                ${
                  activePanel === panel.id
                    ? `border-${panel.color}-400 bg-${panel.color}-400/10`
                    : `border-${panel.color}-400/30 hover:border-${panel.color}-400/60`
                }
              `}
            >
              <div className="text-2xl mb-2">{panel.icon}</div>
              <div className={`text-${panel.color}-400 font-mono text-sm`}>
                {panel.title}
              </div>
              
              {/* Status Indicators */}
              <div className="absolute top-2 right-2">
                <StatusLight active={activePanel === panel.id} />
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Panel Content */}
      <motion.div
        key={activePanel}
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/10 to-purple-400/10 rounded-lg blur-md" />
        <div className="relative bg-black/40 border border-cyan-400/30 rounded-lg p-6 backdrop-blur-md">
          <div className="font-mono text-sm">
            {renderPanel()}
          </div>
        </div>
      </motion.div>

      {/* System Monitor */}
      {/* <div className="bg-black/40 border border-cyan-400/30 rounded-lg backdrop-blur-md">
        <SystemMonitor />
      </div> */}
    </div>
  );
};

const ProfilePanel = () => (
  <div className="space-y-6">
    <div className="flex items-center space-x-4 mb-6">
      <div className="w-16 h-16 rounded-full bg-cyan-400/20 border border-cyan-400/50 flex items-center justify-center text-3xl">
        👨‍🚀
      </div>
      <div>
        <div className="text-cyan-400 font-mono text-lg mb-1">COMMANDER</div>
        <div className="text-white/80 text-base">TRươNG THế BảO</div>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div className="bg-black/30 border border-cyan-400/30 rounded p-3">
        <div className="text-cyan-400/70 font-mono text-sm mb-1">SPACESHIP</div>
        <div className="text-white/80 text-sm">NHA TRANG UNIVERSITY</div>
      </div>
      
      <div className="bg-black/30 border border-cyan-400/30 rounded p-3">
        <div className="text-cyan-400/70 font-mono text-sm mb-1">ROLE</div>
        <div className="text-white/80 text-sm">Full Stack Developer</div>
      </div>
    </div>

    <div className="bg-black/30 border border-cyan-400/30 rounded p-3">
      <div className="text-cyan-400/70 font-mono text-sm mb-1">MISSION</div>
      <div className="text-white/80 text-sm leading-relaxed">
        Building web applications that inspire awe and interaction
      </div>
    </div>
  </div>
);

const SkillsPanel = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-4 gap-3">
      {[
        "NextJs",
        "NodeJs",
        "PhP",
        ".Net Core",
        "Mysql",
        "Git Version",
        "TailwindCss",
        "TypeScript",
      ].map((tech, index) => (
        <motion.div
          key={tech}
          className="relative group"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded blur-sm group-hover:blur-md transition-all" />
          <div className="relative bg-black/50 border border-cyan-400/30 rounded p-3 hover:border-cyan-400/60 transition-all">
            <div className="text-center">
              <div className="text-cyan-400 font-mono text-sm">{tech}</div>
              <div className="w-full bg-gray-700/50 rounded-full h-1.5 mt-2">
                <div
                  className="bg-gradient-to-r from-cyan-400 to-blue-400 h-1.5 rounded-full"
                  style={{ width: `${Math.random() * 40 + 60}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    <div className="grid grid-cols-3 gap-4">
      <div className="bg-black/30 border border-green-400/30 rounded p-3">
        <div className="text-green-400/70 font-mono text-sm">FRONTEND</div>
        <div className="text-white/80 text-sm">React, NextJs</div>
      </div>
      <div className="bg-black/30 border border-blue-400/30 rounded p-3">
        <div className="text-blue-400/70 font-mono text-sm">BACKEND</div>
        <div className="text-white/80 text-sm">Node.js, PHP, .NET</div>
      </div>
      <div className="bg-black/30 border border-purple-400/30 rounded p-3">
        <div className="text-purple-400/70 font-mono text-sm">DATABASE</div>
        <div className="text-white/80 text-sm">MySQL</div>
      </div>
    </div>
  </div>
);

const ProjectsPanel = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 gap-4">
      {[
        {
          name: "Project Alpha",
          tech: "Next.js, TypeScript",
          desc: "Modern web app",
          color: "purple",
          progress: 85
        },
        {
          name: "Project Beta",
          tech: "React, Node.js",
          desc: "E-commerce solution",
          color: "blue",
          progress: 92
        },
      ].map((project, index) => (
        <motion.div
          key={project.name}
          className="relative group"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <div className={`absolute inset-0 bg-${project.color}-400/20 rounded blur-sm group-hover:blur-md transition-all`} />
          <div className="relative bg-black/50 border border-purple-400/30 rounded p-3 hover:border-purple-400/60 transition-all">
            <h3 className="text-purple-400 font-mono text-sm">{project.name}</h3>
            <div className="text-purple-300/70 text-sm mt-1">{project.tech}</div>
            <p className="text-white/70 text-sm mt-2">{project.desc}</p>
            <div className="w-full bg-gray-700/50 rounded-full h-1.5 mt-3">
              <div
                className="bg-gradient-to-r from-purple-400 to-pink-400 h-1.5 rounded-full"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div className="bg-black/30 border border-purple-400/30 rounded p-3">
        <div className="text-purple-400/70 font-mono text-sm">PROJECTS</div>
        <div className="text-white text-lg font-mono">...</div>
      </div>
      <div className="bg-black/30 border border-purple-400/30 rounded p-3">
        <div className="text-purple-400/70 font-mono text-sm">SUCCESS</div>
        <div className="text-white text-lg font-mono">98%</div>
      </div>
    </div>
  </div>
);

const ContactPanel = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 gap-4">
      {[
        { type: "Email", value: "baodev.work@gmail.com", icon: "📧" },
        { type: "GitHub", value: "@username", icon: "💻" },
        { type: "LinkedIn", value: "in/username", icon: "🔗" },
        { type: "Location", value: "Khánh Hòa, VN", icon: "📍" },
      ].map((contact, index) => (
        <motion.div
          key={contact.type}
          className="relative group"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="absolute inset-0 bg-yellow-400/20 rounded blur-sm group-hover:blur-md transition-all" />
          <div className="relative bg-black/50 border border-yellow-400/30 rounded p-3 hover:border-yellow-400/60 transition-all">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{contact.icon}</div>
              <div>
                <div className="text-yellow-400/70 text-sm">{contact.type}</div>
                <div className="text-white text-sm mt-1">{contact.value}</div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    <div className="bg-black/30 border border-yellow-400/30 rounded p-3">
      <div className="text-yellow-400/70 font-mono text-sm mb-1">STATUS</div>
      <div className="flex items-center space-x-2">
        <StatusLight active={true} />
        <span className="text-white text-sm">Available for new opportunities</span>
      </div>
    </div>
  </div>
);

export default ControlPanels; 