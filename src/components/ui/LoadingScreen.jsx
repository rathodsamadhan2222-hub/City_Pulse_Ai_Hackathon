import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onFinished }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Increment progress bar to simulate component mounting (Step 26)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            if (onFinished) onFinished();
          }, 400); // minor buffer for visual sync
          return 100;
        }
        // Random increments
        return prev + Math.floor(Math.random() * 15 + 5);
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onFinished]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div 
          initial={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          className="fixed inset-0 w-full h-full bg-[#070b19] z-[99999] flex flex-col items-center justify-center p-6"
        >
          {/* Neon atmospheric glow */}
          <div className="absolute w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse"></div>

          <div className="relative z-10 w-full max-w-sm text-center space-y-6">
            <div className="flex flex-col items-center">
              <span className="text-display-sm font-black text-[#06b6d4] tracking-tight uppercase">CityPulse</span>
              <span className="text-[10px] font-mono text-[#94a3b8] tracking-widest uppercase mt-1">Spatial Operative Grid</span>
            </div>

            {/* Simulated Progress bar (Step 26) */}
            <div className="space-y-2">
              <div className="h-1 bg-slate-800 rounded-full overflow-hidden w-full relative">
                <div 
                  className="h-full bg-gradient-to-r from-[#06b6d4] to-pink-500 transition-all duration-150 rounded-full"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono text-[#94a3b8]">
                <span>MOUNTING GRID SHADERS...</span>
                <span>{Math.min(progress, 100)}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
