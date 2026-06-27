import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

export default function MapMarker3D({ position, visible, color, type, popup }) {
  const markerRef = useRef();
  const ringRef = useRef();
  const scaleVal = useRef(0); // starts hidden, scales in
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    // 1. Smoothly scale markers in/out based on filter visibility state (Step 12)
    const targetScale = visible ? 1.0 : 0.0;
    scaleVal.current += (targetScale - scaleVal.current) * 0.15;
    
    if (markerRef.current) {
      markerRef.current.scale.setScalar(scaleVal.current);
      
      // 2. Bouncing/Bobbing animation (Step 11)
      const elapsed = state.clock.getElapsedTime();
      const speed = type === 'emergency' ? 4 : 2; // Emergency bobs faster
      markerRef.current.position.y = position[1] + Math.sin(elapsed * speed + position[0]) * 0.25;
      
      // Rotate the marker pin slightly
      markerRef.current.rotation.y = elapsed * 0.8;
    }

    // 3. Pulsing ground ring animation (Step 11)
    if (ringRef.current) {
      ringRef.current.scale.setScalar(scaleVal.current);
      const ringScale = (state.clock.getElapsedTime() * 1.5) % 3.0; // cycle from 0 to 3
      ringRef.current.children[0].scale.setScalar(ringScale);
      
      // Fade out opacity as the ring expands
      const opacity = Math.max(0, 1.0 - (ringScale / 3.0)) * 0.4 * scaleVal.current;
      ringRef.current.children[0].material.opacity = opacity;
    }
  });

  return (
    <group>
      {/* Dynamic Bouncing / Glowing Pin Mesh */}
      <group 
        ref={markerRef} 
        position={position}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
      >
        {/* Glowing cone/pin pointing downwards */}
        <mesh rotation={[Math.PI, 0, 0]} castShadow>
          <coneGeometry args={[0.3, 0.7, 8]} />
          <meshBasicMaterial 
            color={color} 
            toneMapped={false}
            transparent
            opacity={0.95}
          />
        </mesh>
        
        {/* Ring surrounding the pin */}
        <mesh position={[0, 0.35, 0]}>
          <torusGeometry args={[0.25, 0.04, 8, 24]} />
          <meshBasicMaterial color={color} toneMapped={false} />
        </mesh>

        {/* Hover detail HTML card overlay */}
        {hovered && scaleVal.current > 0.5 && popup && (
          <Html position={[0, 1.0, 0]} center distanceFactor={15}>
            <div className="glass-card p-4 rounded-2xl border border-white/20 w-64 shadow-2xl z-50 text-white select-none pointer-events-auto">
              {popup.image && (
                <img src={popup.image} alt={popup.title} className="w-full h-24 object-cover rounded-xl mb-3" />
              )}
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                  type === 'emergency' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                  type === 'traffic' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                  type === 'water' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                  type === 'aqi' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                  'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                }`}>
                  {popup.priority || type.toUpperCase()}
                </span>
                <span className="text-[9px] text-[#94a3b8]">{popup.status}</span>
              </div>
              <h5 className="text-label-md font-bold leading-tight mb-1">{popup.title}</h5>
              <p className="text-[11px] text-[#94a3b8] leading-normal">{popup.description}</p>
            </div>
          </Html>
        )}
      </group>

      {/* Dynamic Pulsing Ground Ring under the pin */}
      <group ref={ringRef} position={[position[0], 0.02, position[2]]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.1, 0.8, 32]} />
          <meshBasicMaterial 
            color={color} 
            transparent 
            opacity={0.3} 
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  );
}
