import React from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

import Lighting from '../Lighting/Lighting';
import Buildings from '../Buildings/Buildings';
import Roads from './Roads';
import Particles from '../Particles/Particles';
import Hologram from '../Hologram/Hologram';
import Drone from '../Drone/Drone';
import SkyBox from './SkyBox';

function SceneController() {
  const { camera, mouse } = useThree();
  
  // Custom camera animation on start and scroll zoom + mouse parallax
  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    const scrollFraction = Math.min(scrollY / 1000, 1.0); // limit to range 0-1
    const zoomFactor = 1.0 - scrollFraction * 0.55; // Zoom in up to 55% closer

    if (elapsed < 2.5) {
      // Intro camera fly-in animation
      const progress = elapsed / 2.5;
      camera.position.x = THREE.MathUtils.lerp(18, 12 * zoomFactor, progress);
      camera.position.y = THREE.MathUtils.lerp(22, 10 * zoomFactor, progress);
      camera.position.z = THREE.MathUtils.lerp(18, 12 * zoomFactor, progress);
    } else {
      // Interactive mouse parallax + scroll zoom
      const targetX = (12 + mouse.x * 2.5) * zoomFactor;
      const targetY = (10 + mouse.y * 1.5) * zoomFactor;
      const targetZ = 12 * zoomFactor;
      
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (targetY - camera.position.y) * 0.05;
      camera.position.z += (targetZ - camera.position.z) * 0.05;
    }
    
    // Always look at the central hologram core [0, 3, 0] (shifting slightly down as zoom level changes)
    const lookAtY = THREE.MathUtils.lerp(3, 2.5, scrollFraction);
    camera.lookAt(0, lookAtY, 0);
  });

  return null;
}

export default function CityScene() {
  return (
    <div className="w-full h-full min-h-[450px] lg:min-h-[600px] relative overflow-hidden bg-[#070b19]">
      <Canvas
        shadows
        camera={{ position: [18, 22, 18], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
      >
        {/* Soft fog to blend background buildings and sky box */}
        <fog attach="fog" args={['#070b19', 15, 60]} />
        
        {/* Sky box */}
        <SkyBox />
        
        {/* Scene light components */}
        <Lighting />
        
        {/* Smart City Elements */}
        <Buildings />
        <Roads />
        <Particles />
        <Hologram />
        <Drone />

        {/* Ambient Ground Grid */}
        <gridHelper
          args={[60, 30, '#1e293b', '#0f172a']}
          position={[0, 0.01, 0]}
        />
        
        {/* Dark ground receiver */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <shadowMaterial opacity={0.4} />
        </mesh>

        {/* Dynamic camera control logic */}
        <SceneController />

        {/* Enable manual pan/rotate for users but restrict limits to keep focus */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 - 0.05} // Don't go below ground level
          minPolarAngle={Math.PI / 6}
        />
      </Canvas>
      
      {/* Decorative sci-fi camera indicators */}
      <div className="absolute top-6 left-6 flex items-center gap-2 text-xs font-mono text-[var(--color-primary-fixed)] tracking-widest pointer-events-none opacity-40">
        <span className="w-2.5 h-2.5 rounded-full bg-[#06b6d4] animate-ping"></span>
        <span>CAM_04 // DIGITAL_TWIN_SIMULATOR</span>
      </div>
      
      <div className="absolute bottom-6 right-6 text-right text-[10px] font-mono text-[var(--color-outline)] pointer-events-none opacity-45">
        <p>FPS: 60 // R3F_CANVAS_ACTIVE</p>
        <p>COGNITIVE_CITY_GRID_v4.2</p>
      </div>
    </div>
  );
}
