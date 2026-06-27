import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function NetworkLines() {
  const pulsesRef = useRef();

  // Coordinates of connection targets
  const connections = useMemo(() => {
    return [
      { start: [0, 4, 0], end: [0, 8.5, 0], speed: 0.8 },      // Core to Health KPI
      { start: [0, 4, 0], end: [-8, 6.5, -8], speed: 0.5 },    // Core to AQI
      { start: [0, 4, 0], end: [8, 5.5, 8], speed: 0.6 },      // Core to Weather
      { start: [0, 4, 0], end: [5, 0.1, -5], speed: 0.7 },     // Core to Traffic Road
      { start: [0, 4, 0], end: [-6, 0.1, 6], speed: 0.4 },     // Core to Citizen / IoT Node
    ];
  }, []);

  // Construct Bezier curves for all connections
  const curves = useMemo(() => {
    return connections.map((conn) => {
      const pStart = new THREE.Vector3(...conn.start);
      const pEnd = new THREE.Vector3(...conn.end);
      
      // Calculate a raised midpoint for curved arcs
      const pMid = new THREE.Vector3(
        (pStart.x + pEnd.x) / 2,
        Math.max(pStart.y, pEnd.y) + 3.0,
        (pStart.z + pEnd.z) / 2
      );

      const curve = new THREE.QuadraticBezierCurve3(pStart, pMid, pEnd);
      
      // Get points to render the static line path
      const points = curve.getPoints(30);
      const lineArray = [];
      points.forEach(p => lineArray.push(p.x, p.y, p.z));

      return {
        curve,
        positionsArray: new Float32Array(lineArray),
        speed: conn.speed,
      };
    });
  }, [connections]);

  const tempObject = new THREE.Object3D();

  useFrame((state) => {
    if (!pulsesRef.current) return;

    const time = state.clock.getElapsedTime();

    curves.forEach((item, index) => {
      // Calculate animated curve offset (t parameter from 0 to 1)
      const t = (time * item.speed) % 1.0;
      
      // Get 3D coordinate along the curve
      const pos = item.curve.getPointAt(t);

      tempObject.position.copy(pos);
      tempObject.scale.setScalar(1.0 + Math.sin(time * 8) * 0.15); // Pulsing scale
      tempObject.updateMatrix();

      pulsesRef.current.setMatrixAt(index, tempObject.matrix);
    });

    pulsesRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      {/* 1. Static connection link lines (glowing paths) */}
      {curves.map((item, idx) => (
        <line key={idx}>
          <bufferGeometry attach="geometry">
            <bufferAttribute
              attach="attributes-position"
              args={[item.positionsArray, 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#06b6d4"
            transparent
            opacity={0.25}
            blending={THREE.AdditiveBlending}
          />
        </line>
      ))}

      {/* 2. Instanced glowing data pulses traveling along curves */}
      <instancedMesh ref={pulsesRef} args={[null, null, curves.length]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshBasicMaterial
          color="#06b6d4"
          toneMapped={false}
          blending={THREE.AdditiveBlending}
        />
      </instancedMesh>
    </group>
  );
}
