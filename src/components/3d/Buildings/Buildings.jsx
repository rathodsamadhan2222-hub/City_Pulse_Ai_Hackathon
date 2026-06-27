import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei';

export default function Buildings({ mode }) {
  const groupRef = useRef();
  const gridSize = 10;
  const spacing = 4;
  const buildingData = useMemo(() => {
    const data = [];
    for (let x = -gridSize / 2; x < gridSize / 2; x++) {
      for (let z = -gridSize / 2; z < gridSize / 2; z++) {
        // Skip the center area to leave room for the hologram core
        const distFromCenter = Math.sqrt(x * x + z * z);
        if (distFromCenter < 2) continue;

        // Introduce some randomness in grid layouts (vacant spaces/roads)
        if (Math.random() > 0.75) continue;

        const posX = x * spacing + (Math.random() - 0.5) * 1.5;
        const posZ = z * spacing + (Math.random() - 0.5) * 1.5;
        const width = 1.2 + Math.random() * 1.2;
        const depth = 1.2 + Math.random() * 1.2;
        const height = 3 + Math.random() * Math.random() * 14;

        // Assign colors dynamically based on Digital Twin mode
        let neonColor;
        if (mode === 'health') {
          neonColor = '#10b981'; // Green
        } else if (mode === 'traffic') {
          neonColor = '#f59e0b'; // Yellow
        } else if (mode === 'emergency') {
          neonColor = '#ef4444'; // Red
        } else if (mode === 'water') {
          neonColor = '#3b82f6'; // Blue
        } else {
          // Default Cyberpunk
          const isTall = height > 10;
          neonColor = isTall
            ? '#06b6d4'
            : Math.random() > 0.5
              ? '#2563eb'
              : '#3b82f6';
        }

        data.push({
          id: `${x}-${z}`,
          position: [posX, height / 2 - 0.5, posZ], // Sit on the ground plane
          scale: [width, height, depth],
          neonColor,
          opacity: 0.25 + Math.random() * 0.30,
        });
      }
    }
    return data;
  }, [mode]);

  useFrame(() => {
    if (groupRef.current) {
      const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
      const scrollFraction = Math.min(scrollY / 1000, 1.0);

      // Rotate the city grid slightly as the user scrolls
      groupRef.current.rotation.y = scrollFraction * 0.35;

      // Slide the buildings down slightly to create deep parallax against the stars
      groupRef.current.position.y = -scrollFraction * 2.5;
    }
  });

  return (
    <group ref={groupRef}>
      {buildingData.map((b) => (
        <mesh key={b.id} position={b.position} scale={b.scale} castShadow receiveShadow>
          <boxGeometry args={[1, 1, 1]} />
          {/* Base semi-transparent material */}
          <meshStandardMaterial
            color="#1a2744"
            roughness={0.3}
            metalness={0.6}
            transparent
            opacity={0.92}
          />
          {/* Edges helper to render glowing wireframe outlines */}
          <Edges
            threshold={15}
            color={b.neonColor}
            thickness={2.5}
          />
          {/* Internal core glow using a slightly smaller wireframe mesh */}
          <mesh scale={[0.95, 0.98, 0.95]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial
              color={b.neonColor}
              wireframe
              transparent
              opacity={b.opacity}
            />
          </mesh>
        </mesh>
      ))}
    </group>
  );
}
