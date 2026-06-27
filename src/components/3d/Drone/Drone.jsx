import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Drone() {
  const droneGroupRef = useRef();

  // Create configuration for 3 distinct search/rescue drones
  const droneConfigs = useMemo(() => {
    return [
      { id: 1, radius: 10, height: 8, speed: 0.5, phase: 0, color: '#06b6d4' },
      { id: 2, radius: 15, height: 11, speed: 0.3, phase: Math.PI / 2, color: '#f43f5e' },
      { id: 3, radius: 12, height: 9, speed: -0.4, phase: Math.PI, color: '#3b82f6' },
    ];
  }, []);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();

    droneGroupRef.current.children.forEach((droneMesh, idx) => {
      const config = droneConfigs[idx];
      
      // Calculate circle coordinates with bobbing height offset
      const angle = elapsed * config.speed + config.phase;
      const x = Math.sin(angle) * config.radius;
      const z = Math.cos(angle) * config.radius;
      const y = config.height + Math.sin(elapsed * 2 + idx) * 0.4;

      droneMesh.position.set(x, y, z);
      
      // Point the drone slightly in the direction of flight
      droneMesh.rotation.y = angle + Math.PI / 2;
      droneMesh.rotation.z = Math.sin(elapsed * 4) * 0.05; // banking tilt
    });
  });

  return (
    <group ref={droneGroupRef}>
      {droneConfigs.map((config) => (
        <group key={config.id}>
          {/* Drone Chassis (Futuristic disc/pod shape) */}
          <mesh>
            <cylinderGeometry args={[0.3, 0.4, 0.1, 8]} />
            <meshStandardMaterial color="#1e293b" roughness={0.1} metalness={0.9} />
          </mesh>

          {/* Rotor Ring (Glowing outline) */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.5, 0.03, 4, 16]} />
            <meshBasicMaterial color={config.color} transparent opacity={0.8} />
          </mesh>

          {/* Blinking Signal Beacon */}
          <mesh position={[0, 0.15, 0]}>
            <sphereGeometry args={[0.08, 6, 6]} />
            {/* Custom blinking effect simulated inside shader-like logic */}
            <meshBasicMaterial color={config.color} />
          </mesh>

          {/* Glowing scanner light pointing downwards */}
          <mesh position={[0, -0.8, 0]} rotation={[0, 0, 0]}>
            <coneGeometry args={[0.2, 1.6, 8, 1, true]} />
            <meshBasicMaterial
              color={config.color}
              transparent
              opacity={0.12}
              blending={THREE.AdditiveBlending}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
