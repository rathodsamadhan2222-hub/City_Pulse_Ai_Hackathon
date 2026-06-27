import { useState } from 'react';
import MaterialIcon from '../components/ui/MaterialIcon';
import Interactive3DMap from '../components/3d/CityScene/Interactive3DMap';

export default function CityMap() {
  const [filters, setFilters] = useState({
    traffic: true,
    aqi: true,
    garbage: true,
    water: true,
    emergency: true,
  });

  const toggleFilter = (type) => {
    setFilters((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const filterConfigs = [
    { id: 'traffic', label: 'Traffic Density', icon: 'traffic', activeColor: 'bg-amber-500/10 border-amber-500/30 text-amber-500', baseColor: 'bg-[#0f172a]/30 border-white/5 text-[#94a3b8]', dotColor: 'bg-amber-500' },
    { id: 'aqi', label: 'Air Quality (AQI)', icon: 'air', activeColor: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500', baseColor: 'bg-[#0f172a]/30 border-white/5 text-[#94a3b8]', dotColor: 'bg-emerald-500' },
    { id: 'garbage', label: 'Garbage Reports', icon: 'delete_outline', activeColor: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-500', baseColor: 'bg-[#0f172a]/30 border-white/5 text-[#94a3b8]', dotColor: 'bg-cyan-500' },
    { id: 'water', label: 'Water System Grid', icon: 'water_drop', activeColor: 'bg-blue-500/10 border-blue-500/30 text-blue-500', baseColor: 'bg-[#0f172a]/30 border-white/5 text-[#94a3b8]', dotColor: 'bg-blue-500' },
    { id: 'emergency', label: 'Emergency dispatch', icon: 'warning', activeColor: 'bg-rose-500/10 border-rose-500/30 text-rose-500', baseColor: 'bg-[#0f172a]/30 border-white/5 text-[#94a3b8]', dotColor: 'bg-rose-500' },
  ];

  return (
    <main className="h-screen relative flex flex-col overflow-hidden bg-[#070b19]">
      
      {/* 3D Map Canvas Explorer Container (Step 11) */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Interactive3DMap filters={filters} />
      </div>

      {/* Floating Header: Search Bar */}
      <header className="absolute top-6 left-6 right-6 z-10 pointer-events-none">
        <div className="max-w-2xl mx-auto w-full pointer-events-auto">
          <div className="dark-glass-panel rounded-full h-14 flex items-center px-6 shadow-2xl text-white">
            <MaterialIcon icon="search" className="text-[#94a3b8] mr-3" />
            <input 
              className="bg-transparent border-none focus:outline-none w-full text-body-md placeholder-[#94a3b8]/60 text-white" 
              placeholder="Search assets, incidents, or sectors..." 
              type="text" 
            />
            <div className="flex items-center gap-2 ml-4">
              <span className="w-px h-6 bg-white/10"></span>
              <button className="text-[#94a3b8] hover:text-white transition-colors p-2">
                <MaterialIcon icon="tune" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar Filter Panel */}
      <div className="absolute top-24 right-6 w-64 z-10">
        <div className="p-5 shadow-2xl space-y-4 border border-white/10 bg-[#070b19]/95 backdrop-blur-2xl rounded-[20px]">
          <div>
            <h3 className="text-label-md font-black text-white flex items-center gap-2 mb-0.5">
              <MaterialIcon icon="filter_list" className="text-[#06b6d4]" />
              Spatial Layers
            </h3>
            <p className="text-[10px] text-[#64748b]">Select layers to render spatial twins.</p>
          </div>
          
          <div className="space-y-2">
            {filterConfigs.map((config) => {
              const active = filters[config.id];
              const accentColors = {
                traffic: 'border-l-amber-400',
                aqi: 'border-l-emerald-400',
                garbage: 'border-l-cyan-400',
                water: 'border-l-blue-400',
                emergency: 'border-l-rose-400',
              };
              const labelColors = {
                traffic: 'text-amber-400',
                aqi: 'text-emerald-400',
                garbage: 'text-cyan-400',
                water: 'text-blue-400',
                emergency: 'text-rose-400',
              };
              return (
                <button
                  key={config.id}
                  onClick={() => toggleFilter(config.id)}
                  className={`w-full flex items-center justify-between px-3 py-3 rounded-xl border-l-2 border border-white/5 text-left transition-all duration-300 ${
                    active
                      ? `${accentColors[config.id]} bg-white/5`
                      : 'border-l-transparent bg-white/[0.02] opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <MaterialIcon
                      icon={config.icon}
                      className={`text-base ${active ? labelColors[config.id] : 'text-[#64748b]'}`}
                    />
                    <span className={`text-label-sm font-bold ${active ? 'text-white' : 'text-[#64748b]'}`}>
                      {config.label}
                    </span>
                  </div>
                  
                  {/* Toggle switch */}
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className={`w-2 h-2 rounded-full ${config.dotColor} ${active ? 'animate-pulse' : 'opacity-20'}`}></span>
                    <div className={`w-8 h-4 rounded-full p-0.5 transition-colors duration-300 ${active ? 'bg-[#06b6d4]' : 'bg-slate-700'}`}>
                      <div className={`w-3 h-3 bg-white rounded-full transition-transform duration-300 transform ${active ? 'translate-x-4' : 'translate-x-0'}`}></div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Right Floating Controls */}
      <div className="absolute bottom-10 right-6 z-10 flex flex-col gap-3">
        <div className="dark-glass-panel rounded-2xl flex flex-col p-1 shadow-lg text-[#94a3b8]">
          <button className="w-10 h-10 flex items-center justify-center hover:text-white rounded-xl transition-all">
            <MaterialIcon icon="add" />
          </button>
          <div className="w-6 h-px bg-white/10 mx-auto"></div>
          <button className="w-10 h-10 flex items-center justify-center hover:text-white rounded-xl transition-all">
            <MaterialIcon icon="remove" />
          </button>
        </div>
        <button className="dark-glass-panel w-12 h-12 flex items-center justify-center rounded-2xl text-[#94a3b8] hover:text-white shadow-lg hover:scale-105 transition-all">
          <MaterialIcon icon="my_location" />
        </button>
        <button className="dark-glass-panel px-4 h-12 flex items-center justify-center gap-2 rounded-2xl shadow-lg hover:scale-105 transition-all">
          <MaterialIcon icon="3d_rotation" className="text-[#06b6d4]" />
          <span className="text-label-sm font-bold text-white">3D VIEW</span>
        </button>
      </div>

      {/* Coordinates / Active System details */}
      <div className="absolute bottom-6 left-6 z-10 dark-glass-panel px-4 py-2.5 rounded-full shadow-lg text-[#94a3b8]">
        <div className="flex items-center gap-4 text-label-sm font-mono font-medium">
          <div className="flex items-center gap-1"><span>LAT:</span><span className="text-white">37.7749° N</span></div>
          <div className="w-px h-3 bg-white/10"></div>
          <div className="flex items-center gap-1"><span>LONG:</span><span className="text-white">122.4194° W</span></div>
          <div className="flex items-center gap-2 ml-2">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping"></span>
            <span className="text-[10px] text-[#10b981] font-bold uppercase tracking-wider">Spatial Sync</span>
          </div>
        </div>
      </div>
    </main>
  );
}
