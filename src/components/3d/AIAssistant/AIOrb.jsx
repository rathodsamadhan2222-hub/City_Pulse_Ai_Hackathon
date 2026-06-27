import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function OrbMesh({ isTyping, isRecording }) {
  const orbRef = useRef();
  const wireRef = useRef();
  const shellRef = useRef();
  const { mouse } = useThree();

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    
    // 1. Core values based on typing/recording state (Step 15: Pulse while typing)
    const active = isTyping || isRecording;
    const waveSpeed = active ? 6.5 : 1.5;
    const waveAmp = active ? 0.25 : 0.05;
    
    // Base scale bobbing
    const basePulse = active 
      ? 1.0 + Math.sin(elapsed * 14) * 0.15 
      : 1.0 + Math.sin(elapsed * 2) * 0.03;

    if (orbRef.current) {
      orbRef.current.rotation.y = elapsed * 0.4;
      orbRef.current.rotation.z = elapsed * 0.2;
      orbRef.current.scale.setScalar(basePulse);

      // Emissive glowing intensity pulse
      orbRef.current.material.emissiveIntensity = active 
        ? 1.2 + Math.sin(elapsed * 16) * 0.35 
        : 0.5 + Math.sin(elapsed * 3) * 0.15;
    }

    if (wireRef.current) {
      wireRef.current.rotation.y = -elapsed * 0.5;
      wireRef.current.rotation.x = elapsed * 0.15;
      
      const wirePulse = basePulse * (1.1 + Math.sin(elapsed * waveSpeed) * waveAmp);
      wireRef.current.scale.setScalar(wirePulse);
    }

    if (shellRef.current) {
      // Outer shell rotates matching mouse tilt
      const targetRotationX = mouse.y * 0.5;
      const targetRotationY = mouse.x * 0.5;
      
      shellRef.current.rotation.x += (targetRotationX - shellRef.current.rotation.x) * 0.1;
      shellRef.current.rotation.y += (targetRotationY - shellRef.current.rotation.y) * 0.1;
    }
  });

  return (
    <group ref={shellRef}>
      {/* Inner solid glowing core sphere */}
      <mesh ref={orbRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial
          color="#06b6d4"
          roughness={0.1}
          metalness={0.8}
          emissive="#06b6d4"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Concentric deforming wireframe lattice shell */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.3, 3]} />
        <meshBasicMaterial
          color="#ec4899"
          wireframe
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Outer orbital particle cloud ring */}
      <points rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.8, 0.12, 8, 48]} />
        <pointsMaterial
          color="#3b82f6"
          size={0.06}
          transparent
          opacity={0.7}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

// 3D Voice Waveform Particle Visualizer (Step 16)
function VoiceWaveformParticles({ isRecording, isTyping }) {
  const barsRef = useRef([]);
  const barCount = 32;

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    const active = isRecording || isTyping;
    
    barsRef.current.forEach((bar, idx) => {
      if (bar) {
        // Calculate interactive waveform deformation based on typing or voice recording
        const multiplier = active ? 2.5 : 0.25;
        const frequency = active ? 12.0 : 3.0;
        const phase = idx * 0.3;
        
        // Dynamic scale height matching standard audio bars
        const scaleY = 0.1 + Math.abs(Math.sin(elapsed * frequency + phase)) * multiplier;
        bar.scale.y = scaleY;
        bar.position.y = -1.6 + scaleY / 2;
        
        // Emissive light pulse
        bar.material.emissiveIntensity = active ? 0.8 + Math.sin(elapsed * 10 + idx) * 0.4 : 0.2;
      }
    });
  });

  return (
    <group>
      {Array.from({ length: barCount }).map((_, idx) => {
        const spacing = 0.12;
        const xPos = (idx - barCount / 2) * spacing;
        const color = isRecording ? '#ec4899' : '#06b6d4'; // magenta on recording, cyan on typing
        
        return (
          <mesh 
            key={idx} 
            ref={(el) => (barsRef.current[idx] = el)} 
            position={[xPos, -1.6, 1.2]}
          >
            <boxGeometry args={[0.06, 1, 0.06]} />
            <meshStandardMaterial 
              color={color} 
              emissive={color}
              emissiveIntensity={0.2}
              transparent
              opacity={0.95}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default function AIOrb({ isTyping, isRecording }) {
  return (
    <div className="w-full h-80 lg:h-[420px] relative bg-[#070b19]/60 rounded-3xl border border-white/5 shadow-inner overflow-hidden flex items-center justify-center">
      {/* Glowing atmospheric halo backdrop */}
      <div className={`absolute w-52 h-52 rounded-full blur-[100px] transition-all duration-500 ${
        isRecording ? 'bg-pink-500/25 scale-135' : isTyping ? 'bg-cyan-500/20 scale-120' : 'bg-cyan-500/10 scale-100'
      }`}></div>

      <Canvas
        camera={{ position: [0, 0, 4.4], fov: 45 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.4} color="#1e293b" />
        <directionalLight position={[2, 4, 2]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-2, 2, -2]} intensity={0.8} color="#ec4899" />
        
        {/* Glowing Orb meshes */}
        <OrbMesh isTyping={isTyping} isRecording={isRecording} />

        {/* 3D Particle Voice Waveform (Step 16) */}
        <VoiceWaveformParticles isRecording={isRecording} isTyping={isTyping} />

        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>

      {/* Cognitive scanner indicators */}
      <div className="absolute top-4 left-4 pointer-events-none opacity-50 flex items-center gap-1.5 text-[9px] font-mono text-[#94a3b8] tracking-widest uppercase">
        <span className={`w-1.5 h-1.5 rounded-full ${isRecording ? 'bg-pink-500' : isTyping ? 'bg-[#06b6d4]' : 'bg-[#06b6d4]/40'} animate-pulse`}></span>
        <span>{isRecording ? 'Voice Stream Transmitting...' : isTyping ? 'Listening...' : 'Cognitive Orb Standby'}</span>
      </div>
    </div>
  );
}
