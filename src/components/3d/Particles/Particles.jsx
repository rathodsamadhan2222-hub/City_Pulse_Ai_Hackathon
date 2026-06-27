import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Particles() {
  const pointsRef = useRef();
  const count = 300;
  const areaSize = 35;
  const maxHeight = 15;

  // Generate initial particle coordinates and speeds
  const [positions, speeds, phases] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const phs = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Position around the city grid
      pos[i * 3] = (Math.random() - 0.5) * areaSize;
      pos[i * 3 + 1] = Math.random() * maxHeight;
      pos[i * 3 + 2] = (Math.random() - 0.5) * areaSize;

      // Speed of rise
      spd[i] = 0.5 + Math.random() * 1.5;

      // Phase offset for wave motion
      phs[i] = Math.random() * Math.PI * 2;
    }
    return [pos, spd, phs];
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position;
    const time = state.clock.getElapsedTime();
    
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    const scrollFraction = Math.min(scrollY / 1000, 1.0);
    // Particles move up to 5x faster as the user scrolls down
    const speedMultiplier = 1.0 + scrollFraction * 4.0;

    for (let i = 0; i < count; i++) {
      let x = posAttr.getX(i);
      let y = posAttr.getY(i);
      let z = posAttr.getZ(i);

      // Rise upwards accelerated by scroll speed multiplier
      y += (speeds[i] * speedMultiplier) * delta;
      if (y > maxHeight) {
        // Reset to bottom with a random new XZ position
        y = 0;
        x = (Math.random() - 0.5) * areaSize;
        z = (Math.random() - 0.5) * areaSize;
      }

      // Add gentle swaying/wave movement
      x += Math.sin(time + phases[i]) * 0.01;
      z += Math.cos(time + phases[i]) * 0.01;

      posAttr.setXYZ(i, x, y, z);
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      {/* Cool glowing cyan point material */}
      <pointsMaterial
        color="#06b6d4"
        size={0.18}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
