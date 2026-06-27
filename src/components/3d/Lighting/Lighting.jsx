import React from 'react';

export default function Lighting() {
  return (
    <>
      {/* Ambient atmospheric lighting — boosted so buildings are visible */}
      <ambientLight intensity={1.5} color="#c8d8ff" />

      {/* Main directional light (key light from upper front-right) */}
      <directionalLight
        position={[20, 40, 20]}
        intensity={3.0}
        color="#6ea4ff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={100}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />

      {/* Cyberpunk accent fill light from opposite side */}
      <directionalLight
        position={[-20, 15, -20]}
        intensity={2.0}
        color="#06b6d4"
      />

      {/* Front fill light — illuminates building faces visible to the camera */}
      <directionalLight
        position={[0, 10, 30]}
        intensity={1.5}
        color="#7dd3fc"
      />

      {/* Hologram core spotlight */}
      <spotLight
        position={[0, 18, 0]}
        angle={0.8}
        penumbra={1}
        intensity={6.0}
        color="#06b6d4"
        castShadow
      />
      
      {/* Warm under-glow from below for cyberpunk depth */}
      <pointLight position={[0, -3, 0]} intensity={4.0} color="#ec4899" />

      {/* City-wide ambient fill point lights */}
      <pointLight position={[15, 5, 15]} intensity={1.5} color="#3b82f6" />
      <pointLight position={[-15, 5, -15]} intensity={1.5} color="#8b5cf6" />
    </>
  );
}
