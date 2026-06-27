import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// 3D Citizen Avatar Hologram
function CitizenHologram() {
  const meshRef = useRef();
  const ringRef = useRef();

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = elapsed * 0.3;
      meshRef.current.rotation.x = Math.sin(elapsed * 0.2) * 0.15;
      meshRef.current.scale.setScalar(1.0 + Math.sin(elapsed * 1.5) * 0.04);
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -elapsed * 0.5;
    }
  });

  return (
    <group position={[0, 0.4, 0]}>
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.5, 0.05, 8, 48]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.4} wireframe />
      </mesh>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.0, 3]} />
        <meshStandardMaterial
          color="#06b6d4"
          wireframe
          transparent
          opacity={0.7}
          emissive="#06b6d4"
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color="#ec4899" transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

// 3D Achievement Badge — no Html, calls onHover(info|null) instead
function Badge3D({ position, color, title, desc, onHover }) {
  const badgeRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    if (badgeRef.current) {
      const speed = hovered ? 3.0 : 0.6;
      badgeRef.current.rotation.y = elapsed * speed;
      badgeRef.current.position.y = position[1] + Math.sin(elapsed * 2 + position[0]) * 0.08;
      const targetScale = hovered ? 1.25 : 1.0;
      badgeRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);
    }
  });

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
    onHover({ title, desc, color });
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    setHovered(false);
    document.body.style.cursor = 'default';
    onHover(null);
  };

  return (
    <group onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
      <mesh ref={badgeRef} position={position}>
        <octahedronGeometry args={[0.38]} />
        <meshStandardMaterial
          color={color}
          roughness={0.1}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={hovered ? 1.2 : 0.45}
        />
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[0.52, 0.02, 4, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.5} wireframe />
        </mesh>
      </mesh>
    </group>
  );
}

export default function Profile3D() {
  const [tooltip, setTooltip] = useState(null); // { title, desc, color }

  return (
    <div className="w-full h-80 lg:h-96 relative bg-[#070b19]/40 rounded-3xl border border-white/5 shadow-inner overflow-hidden flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0.4, 4.4], fov: 45 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={1.6} color="#c8d8ff" />
        <directionalLight position={[2, 5, 2]} intensity={2.0} color="#ffffff" />
        <pointLight position={[-3, 3, -3]} intensity={1.5} color="#06b6d4" />
        <pointLight position={[3, -1, 3]} intensity={0.8} color="#ec4899" />

        <CitizenHologram />

        <Badge3D
          position={[-1.6, -0.9, 0]}
          color="#f59e0b"
          title="Eco Warrior"
          desc="Assigned for reporting 10+ recycling anomalies."
          onHover={setTooltip}
        />
        <Badge3D
          position={[0, -0.9, 0.5]}
          color="#06b6d4"
          title="Grid Inspector"
          desc="Assigned for pothole scanner analysis."
          onHover={setTooltip}
        />
        <Badge3D
          position={[1.6, -0.9, 0]}
          color="#ef4444"
          title="Safety Warden"
          desc="Assigned for active emergency reports."
          onHover={setTooltip}
        />

        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>

      {/* 2D overlay tooltip — rendered outside Canvas, always correct size */}
      {tooltip && (
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2.5 rounded-xl text-center pointer-events-none select-none z-10 backdrop-blur-xl shadow-xl"
          style={{
            background: 'rgba(7,11,25,0.95)',
            border: `1px solid ${tooltip.color}55`,
            boxShadow: `0 0 16px ${tooltip.color}30`,
            minWidth: '160px',
          }}
        >
          <p className="text-[11px] font-black uppercase tracking-widest" style={{ color: tooltip.color }}>
            {tooltip.title}
          </p>
          <p className="text-[10px] text-[#94a3b8] mt-0.5 leading-snug">{tooltip.desc}</p>
        </div>
      )}
    </div>
  );
}
