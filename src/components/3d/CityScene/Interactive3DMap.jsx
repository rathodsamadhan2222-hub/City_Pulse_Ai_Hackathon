import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import Lighting from '../Lighting/Lighting';
import Buildings from '../Buildings/Buildings';
import Roads from './Roads';
import Particles from '../Particles/Particles';
import Hologram from '../Hologram/Hologram';
import Drone from '../Drone/Drone';
import SkyBox from './SkyBox';
import MapMarker3D from './MapMarker3D';

export default function Interactive3DMap({ filters }) {
  // Predefined spatial coordinates representing city assets and reports
  const markerData = useMemo(() => {
    return [
      {
        id: 'marker-1',
        type: 'traffic',
        position: [6, 0.4, -2],
        color: '#f59e0b',
        popup: {
          title: 'Traffic Jam: Sector 3',
          description: 'Average delays +14 mins. Signals rerouted.',
          priority: 'Traffic Hotspot',
          status: 'Active Delay',
        }
      },
      {
        id: 'marker-2',
        type: 'aqi',
        position: [-10, 0.4, -8],
        color: '#10b981',
        popup: {
          title: 'AQI Sensor #24',
          description: 'Live sensor reading: 18 AQI. Atmospheric flow stable.',
          priority: 'Environmental Node',
          status: 'Good',
        }
      },
      {
        id: 'marker-3',
        type: 'garbage',
        position: [-12, 0.4, 2],
        color: '#06b6d4',
        popup: {
          title: 'Trash Pileup Report',
          description: 'Market St Block 4. Assigned to maintenance team #4.',
          priority: 'Garbage Alert',
          status: 'Dispatched',
        }
      },
      {
        id: 'marker-4',
        type: 'water',
        position: [0, 0.4, 8],
        color: '#3b82f6',
        popup: {
          title: 'Pressure Valve Anomaly',
          description: 'Utility Grid #4. Minor leak detected. Flow reduced by 4%.',
          priority: 'Water System Leak',
          status: 'Pending Repair',
        }
      },
      {
        id: 'marker-5',
        type: 'emergency',
        position: [4, 0.4, -6],
        color: '#ef4444',
        popup: {
          title: 'Collision Alert: Sector 5',
          description: 'Two vehicles collided. EMS unit #12 dispatched and on site.',
          priority: 'Critical Incident',
          status: 'First Responders Active',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYt1ZUhZM9jfCi_E-JP-o-0xAK2G_O4mS8hnms5s2grfDniY2odlx4B0DkkVQe_vqwCvy3UnJpgS49UWd5Vs7A-td_jnWCQn-pFKu9s6XRI7v7AANO40VMe3XpcckHLuC7bJldWSdJ7EbramBn2MPeqhTx8xED8axuAser3bpiz6DR_KiT0MCk3SxCP4dpx8GBCI_50FikHm-9pCALIqdaW6GPkJwYlsM9V3fBT8MaqB1SGT-r9-hKUAe67X1MIlJej9g7Lr5Roe5e',
        }
      },
      {
        id: 'marker-6',
        type: 'traffic',
        position: [-8, 0.4, 6],
        color: '#f59e0b',
        popup: {
          title: 'Road Maintenance Block',
          description: 'North Ave resurfacing. Lane closures. Use alternate routes.',
          priority: 'Construction Node',
          status: 'Active Resurfacing',
        }
      },
      {
        id: 'marker-7',
        type: 'aqi',
        position: [8, 0.4, 8],
        color: '#10b981',
        popup: {
          title: 'AQI Sensor #09',
          description: 'Live sensor reading: 45 AQI. Ozone concentration stable.',
          priority: 'Environmental Node',
          status: 'Moderate',
        }
      },
      {
        id: 'marker-8',
        type: 'emergency',
        position: [-10, 0.4, 10],
        color: '#ef4444',
        popup: {
          title: 'SOS Emergency Signal',
          description: 'Central park medical emergency. Patrol unit #08 redirected.',
          priority: 'Medical Alarm',
          status: 'Emergency Dispatch Active',
        }
      },
    ];
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#070b19]">
      <Canvas
        shadows
        camera={{ position: [20, 12, 20], fov: 52 }}
        gl={{ antialias: true }}
      >
        <fog attach="fog" args={['#070b19', 22, 60]} />
        <SkyBox />
        <Lighting />
        
        {/* Render standard layout components */}
        <Buildings />
        <Roads />
        <Particles />
        <Hologram />
        <Drone />

        {/* Render 3D markers dynamically, linking their visibility to the filter state */}
        {markerData.map((marker) => (
          <MapMarker3D
            key={marker.id}
            position={marker.position}
            visible={filters[marker.type]}
            color={marker.color}
            type={marker.type}
            popup={marker.popup}
          />
        ))}

        {/* Ambient Ground Grid */}
        <gridHelper
          args={[60, 30, '#1e293b', '#0f172a']}
          position={[0, 0.01, 0]}
        />
        
        {/* Dark ground receiver */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <shadowMaterial opacity={0.4} />
        </mesh>

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 - 0.05}
          minPolarAngle={Math.PI / 8}
          minDistance={8}
          maxDistance={45}
          target={[0, 2, 0]}
        />
      </Canvas>
    </div>
  );
}
