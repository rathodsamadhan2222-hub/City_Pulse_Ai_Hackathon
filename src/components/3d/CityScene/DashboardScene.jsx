import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';

import Lighting from '../Lighting/Lighting';
import Buildings from '../Buildings/Buildings';
import Roads from './Roads';
import Particles from '../Particles/Particles';
import Hologram from '../Hologram/Hologram';
import Drone from '../Drone/Drone';
import SkyBox from './SkyBox';
import NetworkLines from './NetworkLines';
import MaterialIcon from '../../ui/MaterialIcon';

export default function DashboardScene({ mode }) {
  return (
    <div className="w-full h-full min-h-[500px] lg:min-h-[580px] relative overflow-hidden bg-[#070b19] rounded-[24px]">
      <Canvas
        shadows
        camera={{ position: [18, 10, 18], fov: 52 }}
        gl={{ antialias: true, alpha: false }}
      >
        <fog attach="fog" args={['#070b19', 20, 55]} />
        <SkyBox />
        <Lighting />
        
        {/* Pass down the selected digital twin mode to Buildings */}
        <Buildings mode={mode} />
        <Roads />
        <Particles />
        <Hologram />
        <Drone />
        <NetworkLines />

        {/* Ambient Ground Grid */}
        <gridHelper
          args={[50, 25, '#1e293b', '#0f172a']}
          position={[0, 0.01, 0]}
        />
        
        {/* Dark ground receiver */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <shadowMaterial opacity={0.4} />
        </mesh>

        {/* Floating KPI Card 1: Health (Anchor coordinates: [0, 8, 0] above the Hologram core) */}
        <Html position={[0, 8.5, 0]} center distanceFactor={15}>
          <div className="glass-card p-3 rounded-2xl border border-emerald-500/30 flex items-center gap-3 w-44 shadow-lg shadow-emerald-500/5 select-none pointer-events-none transition-all duration-300">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center flex-shrink-0">
              <MaterialIcon icon="health_and_safety" filled className="text-lg" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-emerald-400">City Health</p>
              <p className="text-sm font-black text-white leading-none">94.8<span className="text-[9px] font-normal text-[#94a3b8]">/100</span></p>
            </div>
          </div>
        </Html>

        {/* Floating KPI Card 2: AQI (Anchor coordinates: [-8, 6, -8] left side building block) */}
        <Html position={[-8, 6.5, -8]} center distanceFactor={15}>
          <div className="glass-card p-3 rounded-2xl border border-cyan-500/30 flex items-center gap-3 w-44 shadow-lg shadow-cyan-500/5 select-none pointer-events-none transition-all duration-300">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center flex-shrink-0">
              <MaterialIcon icon="air" className="text-lg" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-cyan-400">Air Quality</p>
              <p className="text-sm font-black text-white leading-none">22 AQI<span className="text-[9px] font-normal text-emerald-400 ml-1">Excellent</span></p>
            </div>
          </div>
        </Html>

        {/* Floating KPI Card 3: Weather (Anchor coordinates: [8, 5, 8] right side building block) */}
        <Html position={[8, 5.5, 8]} center distanceFactor={15}>
          <div className="glass-card p-3 rounded-2xl border border-amber-500/30 flex items-center gap-3 w-44 shadow-lg shadow-amber-500/5 select-none pointer-events-none transition-all duration-300">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center flex-shrink-0">
              <MaterialIcon icon="wb_sunny" filled className="text-lg" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-amber-400">Weather</p>
              <p className="text-sm font-black text-white leading-none">74°F<span className="text-[9px] font-normal text-[#94a3b8] ml-1">Sunny</span></p>
            </div>
          </div>
        </Html>

        {/* Floating KPI Card 4: Traffic (Anchor coordinates: [5, 3.5, -5] over traffic grid) */}
        <Html position={[5, 4.0, -5]} center distanceFactor={15}>
          <div className="glass-card p-3 rounded-2xl border border-rose-500/30 flex items-center gap-3 w-44 shadow-lg shadow-rose-500/5 select-none pointer-events-none transition-all duration-300">
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center flex-shrink-0">
              <MaterialIcon icon="traffic" className="text-lg" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-rose-400">Traffic Density</p>
              <p className="text-sm font-black text-white leading-none">Moderate<span className="text-[9px] font-normal text-rose-400 ml-1">+12m</span></p>
            </div>
          </div>
        </Html>

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 - 0.05}
          minPolarAngle={Math.PI / 8}
          minDistance={8}
          maxDistance={40}
          target={[0, 2, 0]}
        />
      </Canvas>

      {/* Floating Info Panels Over 3D Dashboard Canvas */}
      <div className="absolute top-4 left-4 pointer-events-none opacity-50 flex items-center gap-2 text-[10px] font-mono text-[var(--color-primary-fixed)] tracking-widest uppercase">
        <span className="w-2 h-2 rounded-full bg-[#06b6d4] animate-ping"></span>
        <span>Operational Twin // Active</span>
      </div>

      <div className="absolute bottom-4 right-4 pointer-events-none opacity-50 text-right text-[9px] font-mono text-[var(--color-outline)]">
        <p>Metric Layer: {mode ? mode.toUpperCase() : 'DEFAULT'}</p>
        <p>Interactive Orbit Enabled</p>
      </div>
    </div>
  );
}
