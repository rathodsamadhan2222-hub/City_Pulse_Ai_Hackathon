import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import Lighting from '../Lighting/Lighting';
import Buildings from '../Buildings/Buildings';
import Roads from './Roads';
import Particles from '../Particles/Particles';
import SkyBox from './SkyBox';

function DispatchVehicles() {
  const ambulanceRef = useRef();
  const fireTruckRef = useRef();
  const policeCarRef = useRef();
  
  const policeSirenLeft = useRef();
  const policeSirenRight = useRef();

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();

    // 1. Ambulance Movement (Step 18) - White/Cyan glowing box travelling along Z-axis road
    if (ambulanceRef.current) {
      // Bobbing position along road
      const zPos = Math.sin(elapsed * 0.4) * 12;
      ambulanceRef.current.position.set(2.5, 0.25, zPos);
      
      // Face travel direction
      ambulanceRef.current.rotation.y = Math.cos(elapsed * 0.4) > 0 ? 0 : Math.PI;
    }

    // 2. Fire Truck Movement (Step 18) - Red/Orange box travelling along X-axis road
    if (fireTruckRef.current) {
      const xPos = Math.cos(elapsed * 0.3) * 12;
      fireTruckRef.current.position.set(xPos, 0.3, -2.5);
      
      // Face travel direction
      fireTruckRef.current.rotation.y = -Math.sin(elapsed * 0.3) > 0 ? Math.PI / 2 : -Math.PI / 2;
    }

    // 3. Police Car Movement (Step 18) - Blue box orbiting the central quadrant
    if (policeCarRef.current) {
      const angle = elapsed * 0.5;
      const xPos = Math.cos(angle) * 7.5;
      const zPos = Math.sin(angle) * 7.5;
      policeCarRef.current.position.set(xPos, 0.25, zPos);
      
      // Steer tangential to the orbit path
      policeCarRef.current.rotation.y = -angle + Math.PI / 2;
    }

    // 4. Alternate Police sirens blinking (Step 18: Animate sirens)
    const toggleSiren = Math.floor(elapsed * 12) % 2 === 0;
    if (policeSirenLeft.current && policeSirenRight.current) {
      policeSirenLeft.current.material.emissiveIntensity = toggleSiren ? 3.0 : 0.1;
      policeSirenRight.current.material.emissiveIntensity = toggleSiren ? 0.1 : 3.0;
    }
  });

  return (
    <group>
      {/* 1. Ambulance Component */}
      <group ref={ambulanceRef}>
        {/* Cab */}
        <mesh castShadow>
          <boxGeometry args={[0.5, 0.45, 0.9]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.15} />
        </mesh>
        {/* Flashing light bar */}
        <mesh position={[0, 0.25, 0.1]}>
          <boxGeometry args={[0.3, 0.08, 0.1]} />
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={2.0} />
        </mesh>
      </group>

      {/* 2. Fire Truck Component */}
      <group ref={fireTruckRef}>
        {/* Long cabin chassis */}
        <mesh castShadow>
          <boxGeometry args={[0.6, 0.5, 1.4]} />
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.1} />
        </mesh>
        {/* Flashing beacons */}
        <mesh position={[0, 0.28, 0.3]}>
          <boxGeometry args={[0.4, 0.08, 0.15]} />
          <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={2.5} />
        </mesh>
      </group>

      {/* 3. Police Car Component */}
      <group ref={policeCarRef}>
        {/* Patrol Car base */}
        <mesh castShadow>
          <boxGeometry args={[0.45, 0.35, 0.8]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        {/* Alternating Red / Blue Siren indicators */}
        <group position={[0, 0.2, 0]}>
          {/* Blue beacon */}
          <mesh ref={policeSirenLeft} position={[-0.12, 0, 0]}>
            <sphereGeometry args={[0.07, 8, 8]} />
            <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={1} />
          </mesh>
          {/* Red beacon */}
          <mesh ref={policeSirenRight} position={[0.12, 0, 0]}>
            <sphereGeometry args={[0.07, 8, 8]} />
            <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={1} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

export default function Emergency3DMap() {
  return (
    <div className="w-full h-full relative bg-[#070b19]">
      <Canvas
        shadows
        camera={{ position: [14, 15, 14], fov: 42 }}
        gl={{ antialias: true }}
      >
        <fog attach="fog" args={['#070b19', 10, 40]} />
        <SkyBox />
        <Lighting />
        
        {/* Render standard layout components */}
        <Buildings />
        <Roads />
        <Particles />

        {/* Animated emergency responders */}
        <DispatchVehicles />

        {/* Base Grid helper */}
        <gridHelper
          args={[40, 20, '#1e293b', '#0f172a']}
          position={[0, 0.01, 0]}
        />
        
        {/* Ground receiver */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <shadowMaterial opacity={0.4} />
        </mesh>

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 - 0.05}
          minPolarAngle={Math.PI / 6}
          minDistance={8}
          maxDistance={30}
        />
      </Canvas>
    </div>
  );
}
