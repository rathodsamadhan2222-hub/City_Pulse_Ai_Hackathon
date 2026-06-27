import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

function PieWedges({ data }) {
  const groupRef = useRef();
  
  // Calculate aggregate values
  const totalVal = useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.value, 0);
  }, [data]);

  // Construct segment parameters (start angle, sweep angle, mid-angle)
  const segments = useMemo(() => {
    let currentAngle = 0;
    return data.map((item) => {
      const thetaLength = (item.value / totalVal) * Math.PI * 2;
      const thetaStart = currentAngle;
      currentAngle += thetaLength;
      
      const midAngle = thetaStart + thetaLength / 2;
      
      return {
        ...item,
        thetaStart,
        thetaLength,
        midAngle,
      };
    });
  }, [data, totalVal]);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating spin rotation
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {segments.map((seg, index) => {
        // Offset each segment slightly along its mid-angle for exploded 3D effect
        const explodeDistance = 0.15;
        const offsetX = Math.cos(seg.midAngle) * explodeDistance;
        const offsetZ = -Math.sin(seg.midAngle) * explodeDistance;

        return (
          <group key={index} position={[offsetX, 0, offsetZ]}>
            {/* Exploded Cylinder segment representing the 3D wedge */}
            <mesh castShadow receiveShadow>
              <cylinderGeometry 
                args={[1.8, 1.8, 0.5, 32, 1, false, seg.thetaStart, seg.thetaLength]} 
              />
              <meshStandardMaterial 
                color={seg.color}
                roughness={0.2}
                metalness={0.4}
                emissive={seg.color}
                emissiveIntensity={0.45}
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* Glowing wireframe edge ring */}
            <mesh position={[0, 0.01, 0]}>
              <cylinderGeometry 
                args={[1.81, 1.81, 0.52, 32, 1, true, seg.thetaStart, seg.thetaLength]} 
              />
              <meshBasicMaterial 
                color={seg.color}
                wireframe
                transparent
                opacity={0.4}
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* Floating percentage label above each wedge */}
            <Html 
              position={[Math.cos(seg.midAngle) * 1.3, 0.5, -Math.sin(seg.midAngle) * 1.3]} 
              center
              distanceFactor={8}
            >
              <div className="bg-[#070b19]/90 border border-white/10 px-2 py-0.5 rounded-lg text-[9px] font-black text-white shadow-xl pointer-events-none select-none">
                {seg.value}%
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

export default function PieChart3D({ data }) {
  // Pre-assign cyberpunk colors
  const coloredData = useMemo(() => {
    const colorMap = ['#06b6d4', '#10b981', '#f59e0b', '#3b82f6'];
    return data.map((d, i) => ({
      ...d,
      color: colorMap[i % colorMap.length],
    }));
  }, [data]);

  return (
    <div className="w-full h-64 bg-[#070b19]/60 rounded-2xl border border-white/5 overflow-hidden relative">
      <Canvas
        shadows
        camera={{ position: [0, 3.5, 3.5], fov: 50 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={1.8} color="#c8d8ff" />
        <directionalLight position={[3, 10, 3]} intensity={3.0} color="#ffffff" castShadow />
        <pointLight position={[-3, 3, -3]} intensity={1.5} color="#06b6d4" />
        <pointLight position={[3, 1, 3]} intensity={1.0} color="#ec4899" />
        
        <PieWedges data={coloredData} />
      </Canvas>
    </div>
  );
}
