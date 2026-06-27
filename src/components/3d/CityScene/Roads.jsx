import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Roads() {
  const pointsRef = useRef();
  
  // Define traffic parameters
  const numCars = 60;
  const areaSize = 40; // matches city size

  // Setup static road paths
  const roadLines = useMemo(() => {
    const lines = [];
    // Roads are spaced apart at interval of 4
    for (let i = -5; i <= 5; i++) {
      const coord = i * 4;
      // Skip center road lines directly under the central core
      if (Math.abs(coord) < 2) continue;

      // X-aligned roads (horizontal)
      lines.push({
        start: [-areaSize / 2, 0.02, coord],
        end: [areaSize / 2, 0.02, coord],
        color: '#1e293b',
      });
      // Z-aligned roads (vertical)
      lines.push({
        start: [coord, 0.02, -areaSize / 2],
        end: [coord, 0.02, areaSize / 2],
        color: '#1e293b',
      });
    }
    return lines;
  }, []);

  // Setup animated cars data
  const cars = useMemo(() => {
    const carList = [];
    for (let i = 0; i < numCars; i++) {
      // Pick a random coordinate index
      const roadCoord = (Math.floor(Math.random() * 9) - 4) * 4;
      const isXAligned = Math.random() > 0.5;
      
      const speed = 4 + Math.random() * 6;
      const progress = Math.random() * areaSize;
      
      // Cyberpunk traffic color theme: glowing cyans and hot pinks
      const color = Math.random() > 0.6 ? '#f43f5e' : '#06b6d4'; 

      carList.push({
        roadCoord,
        isXAligned,
        speed,
        progress,
        color: new THREE.Color(color),
      });
    }
    return carList;
  }, []);

  // Temporary objects for calculations inside the loop
  const tempObject = new THREE.Object3D();

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    cars.forEach((car, index) => {
      // Advance position
      car.progress += car.speed * delta;
      if (car.progress > areaSize / 2) {
        car.progress = -areaSize / 2; // Loop back
      }

      // Compute position
      const x = car.isXAligned ? car.progress : car.roadCoord;
      const z = car.isXAligned ? car.roadCoord : car.progress;
      const y = 0.05; // Slightly above road grid

      tempObject.position.set(x, y, z);
      tempObject.updateMatrix();
      
      pointsRef.current.setMatrixAt(index, tempObject.matrix);
      pointsRef.current.setColorAt(index, car.color);
    });

    pointsRef.current.instanceMatrix.needsUpdate = true;
    if (pointsRef.current.instanceColor) {
      pointsRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Static road lines */}
      {roadLines.map((line, idx) => (
        <line key={idx}>
          <bufferGeometry attach="geometry">
            <float32BufferAttribute
              attach="attributes-position"
              args={[new Float32Array([...line.start, ...line.end]), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color={line.color} linewidth={1} transparent opacity={0.3} />
        </line>
      ))}

      {/* Instanced meshes for vehicle light trails */}
      <instancedMesh ref={pointsRef} args={[null, null, numCars]}>
        <boxGeometry args={[0.3, 0.08, 0.3]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
    </group>
  );
}
