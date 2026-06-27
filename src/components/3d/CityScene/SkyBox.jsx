import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function SkyBox() {
  const starsRef = useRef();
  const starCount = 500;

  // Generate random star coordinates far away from the camera
  const positions = useMemo(() => {
    const coords = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      // Position points on a large sphere surrounding the city
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 80 + Math.random() * 20; // sphere radius range

      coords[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      coords[i * 3 + 1] = Math.abs(r * Math.sin(phi) * Math.sin(theta)); // Keep above ground
      coords[i * 3 + 2] = r * Math.cos(phi);
    }
    return coords;
  }, []);

  useFrame((state) => {
    if (starsRef.current) {
      // Slow rotation of the night sky
      starsRef.current.rotation.y = state.clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <group>
      {/* 1. Starfield Point Cloud */}
      <points ref={starsRef}>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#ffffff"
          size={0.25}
          transparent
          opacity={0.5}
          sizeAttenuation
        />
      </points>

      {/* 2. Cyber grid constellation background */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <sphereGeometry args={[95, 24, 24]} />
        <meshBasicMaterial
          color="#1e293b"
          wireframe
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}
