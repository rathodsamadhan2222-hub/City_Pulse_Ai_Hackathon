import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

function Bars({ data }) {
  const groupRef = useRef();
  const growRef = useRef(0);
  // Individual mesh refs for per-frame scale updates
  const meshRefs = useRef([]);

  const maxVal = useMemo(() => Math.max(...data.map(d => d.value), 1), [data]);

  const bars = useMemo(() => {
    const barSpacing = 1.4;
    const totalWidth = (data.length - 1) * barSpacing;
    return data.map((item, index) => {
      const height = (item.value / maxVal) * 4.0;
      const isTall = item.value >= 85;
      return {
        item,
        height,
        posX: index * barSpacing - totalWidth / 2,
        color: isTall ? '#06b6d4' : '#2563eb',
        isTall,
      };
    });
  }, [data, maxVal]);

  useFrame((state) => {
    // Smooth grow-in animation
    growRef.current += (1.0 - growRef.current) * 0.06;

    // Gentle sway of the whole group
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.08;
    }

    // Update each bar's scale and position every frame
    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const h = bars[i].height;
      const g = growRef.current;
      mesh.scale.set(0.65, Math.max(h * g, 0.01), 0.65);
      mesh.position.y = (h * g) / 2;
    });
  });

  return (
    <group ref={groupRef} position={[0, -1.5, 0]}>
      {bars.map((bar, index) => (
        <group key={index} position={[bar.posX, 0, 0]}>
          {/* 3D Bar mesh — scale driven by useFrame via ref */}
          <mesh
            ref={(el) => (meshRefs.current[index] = el)}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={bar.color}
              roughness={0.2}
              metalness={0.5}
              emissive={bar.color}
              emissiveIntensity={bar.isTall ? 0.6 : 0.35}
            />
          </mesh>

          {/* Floating value label above bar */}
          <Html position={[0, bar.height + 0.6, 0]} center distanceFactor={10}>
            <div className="bg-[#070b19]/90 border border-white/10 px-2 py-0.5 rounded-lg text-[9px] font-black text-white shadow-lg pointer-events-none select-none whitespace-nowrap">
              {bar.item.value}%
            </div>
          </Html>

          {/* X-axis week label */}
          {bar.item.week && (
            <Html position={[0, -0.5, 0]} center distanceFactor={10}>
              <div className="text-[10px] font-mono font-bold text-[#94a3b8] whitespace-nowrap">
                {bar.item.week}
              </div>
            </Html>
          )}
        </group>
      ))}
    </group>
  );
}

export default function BarChart3D({ data }) {
  return (
    <div className="w-full h-72 bg-[#070b19]/60 rounded-2xl border border-white/5 overflow-hidden relative">
      <Canvas
        shadows
        camera={{ position: [0, 3.5, 8], fov: 50 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={2.0} color="#c8d8ff" />
        <directionalLight position={[5, 10, 5]} intensity={3.0} color="#ffffff" castShadow />
        <pointLight position={[-5, 5, -5]} intensity={2.0} color="#06b6d4" />
        <pointLight position={[5, 2, 5]} intensity={1.0} color="#3b82f6" />

        <Bars data={data} />

        <gridHelper args={[20, 20, '#1e293b', '#0f172a']} position={[0, -1.5, 0]} />
      </Canvas>
    </div>
  );
}
