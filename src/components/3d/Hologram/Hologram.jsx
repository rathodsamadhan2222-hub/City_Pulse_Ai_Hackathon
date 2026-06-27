import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Hologram() {
  const outerRingRef = useRef();
  const innerRingRef = useRef();
  const coreRef = useRef();

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();

    // Rotate core globe
    if (coreRef.current) {
      coreRef.current.rotation.y = elapsed * 0.4;
      coreRef.current.rotation.x = elapsed * 0.15;
    }

    // Spin outer ring in one axis, inner ring in another
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = -elapsed * 0.6;
      outerRingRef.current.rotation.x = elapsed * 0.2;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.y = elapsed * 0.8;
      innerRingRef.current.rotation.z = elapsed * 0.3;
    }
  });

  return (
    <group position={[0, 4, 0]}>
      {/* 1. The central core globe */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.5, 16, 16]} />
        <meshBasicMaterial
          color="#06b6d4"
          wireframe
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Solid glowing center node */}
      <mesh>
        <sphereGeometry args={[0.3, 8, 8]} />
        <meshBasicMaterial
          color="#2563eb"
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* 2. Outer holographic vertical tracking ring */}
      <mesh ref={outerRingRef} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.5, 0.05, 8, 64]} />
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 3. Inner horizontal rotating ring */}
      <mesh ref={innerRingRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.0, 0.03, 8, 48]} />
        <meshBasicMaterial
          color="#f43f5e"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 4. Sub-orbital data nodes orbiting core */}
      <group rotation={[0, 0, Math.PI / 6]}>
        <mesh position={[2, 0, 0]}>
          <boxGeometry args={[0.15, 0.15, 0.15]} />
          <meshBasicMaterial color="#06b6d4" />
        </mesh>
        <mesh position={[-2, 0, 0]}>
          <boxGeometry args={[0.15, 0.15, 0.15]} />
          <meshBasicMaterial color="#06b6d4" />
        </mesh>
      </group>
      
      {/* Core light shaft/beam */}
      <mesh position={[0, -2, 0]}>
        <cylinderGeometry args={[0.1, 1.2, 4, 16, 1, true]} />
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
