import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import MaterialIcon from '../components/ui/MaterialIcon';

function SpinningStars() {
  const pointsRef = useRef();

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  // Generate random points in a sphere
  const [positions] = React.useState(() => {
    const count = 400;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.5 * Math.cbrt(Math.random());
      
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position"
          args={[positions, 3]} 
        />
      </bufferGeometry>
      <pointsMaterial 
        color="#06b6d4" 
        size={0.05} 
        transparent 
        opacity={0.65} 
        sizeAttenuation 
      />
    </points>
  );
}

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#070b19] flex flex-col items-center justify-center p-6 relative overflow-hidden text-white">
      
      {/* 3D Particle Constellation background (Step 26) */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-40">
        <Canvas camera={{ position: [0, 0, 4] }}>
          <SpinningStars />
        </Canvas>
      </div>

      {/* Glowing backdrop shadow */}
      <div className="absolute w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse"></div>

      <div className="relative z-10 text-center space-y-6 max-w-md">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4 text-[#06b6d4]">
            <MaterialIcon icon="nearby" className="text-3xl" />
          </div>
          <h1 className="text-display-md font-black text-white tracking-tight">404</h1>
          <p className="text-[11px] font-mono text-[#94a3b8] tracking-widest uppercase mt-1">Grid Coordinate Out of Bound</p>
        </div>

        <p className="text-body-md text-[#94a3b8] leading-relaxed">
          The operations sector you are trying to access does not exist on the Central Operation Vector.
        </p>

        <div>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#06b6d4] hover:bg-[#06b6d4]/90 text-white font-bold text-label-md transition-all shadow-lg shadow-[#06b6d4]/20 hover:scale-105 active:scale-95"
          >
            <MaterialIcon icon="home" filled />
            <span>Return to Grid</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
