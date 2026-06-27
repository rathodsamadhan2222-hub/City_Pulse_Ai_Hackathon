import { motion } from 'framer-motion';
import MaterialIcon from '../components/ui/MaterialIcon';
import Emergency3DMap from '../components/3d/CityScene/Emergency3DMap';
import { emergencyKPIs, emergencyServices, nearbyCenters } from '../data/emergencyData';

export default function Emergency() {
  return (
    <main className="overflow-y-auto min-h-screen bg-[#070b19]/95 text-white">
      {/* Header */}
      <header className="h-20 dark-glass-panel border-b border-white/5 px-[var(--spacing-margin-desktop)] flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20">
            <MaterialIcon icon="emergency" filled className="text-red-500" />
          </div>
          <div>
            <h1 className="text-headline-sm text-red-500 font-bold">Emergency Control Center</h1>
            <p className="text-label-sm text-[#94a3b8]">Central command operations room. All districts online.</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-500/20 text-label-sm font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            All Core Systems Optimal
          </div>
          <button className="relative p-2.5 rounded-full hover:bg-white/5 transition-colors text-[#94a3b8]">
            <MaterialIcon icon="notifications" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#070b19]"></span>
          </button>
        </div>
      </header>

      <div className="p-[var(--spacing-margin-desktop)] max-w-[var(--spacing-container-max)] mx-auto space-y-8">
        
        {/* SOS Button Section (Step 17: Huge Bouncing/Rippling Button with Intense Glow) */}
        <section className="glass-card p-8 md:p-12 bg-gradient-to-br from-red-500/5 to-[#0b142e]/80 border border-red-500/10 flex flex-col md:flex-row items-center gap-12 justify-between rounded-3xl">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-headline-md text-white font-bold mb-3">Instant Crisis Dispatch</h2>
            <p className="text-body-md text-[#94a3b8] max-w-lg">
              Trigger a citywide emergency broadcast. Clicking the SOS scanner locks onto your coordinates, sends satellite vectors to dispatch, and alerts emergency services.
            </p>
          </div>
          
          <div className="relative flex items-center justify-center w-80 h-80 flex-shrink-0">
            {/* Staggered Concentric Rippling rings (Step 17) */}
            <div className="absolute inset-0 bg-red-500/30 rounded-full animate-ripple-out" style={{ animationDelay: '0s' }}></div>
            <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ripple-out" style={{ animationDelay: '0.8s' }}></div>
            <div className="absolute inset-0 bg-red-500/10 rounded-full animate-ripple-out" style={{ animationDelay: '1.6s' }}></div>
            
            {/* Huge, Glowing SOS Button (Step 17) */}
            <button 
              className="relative w-52 h-52 bg-gradient-to-br from-red-500 via-red-600 to-rose-700 rounded-full text-white flex flex-col items-center justify-center 
              shadow-[0_0_60px_rgba(239,68,68,0.7)] hover:shadow-[0_0_80px_rgba(239,68,68,0.9)] active:scale-95 hover:scale-105 transition-all duration-300 z-10 border-4 border-white/10"
              onClick={() => alert("SOS Triggered! Dispatch vectors sent to nearest response center.")}
            >
              <MaterialIcon icon="sos" filled className="text-[52px] mb-0.5 animate-pulse" />
              <span className="text-label-sm font-black tracking-widest text-red-100">BROADCAST SIGNAL</span>
            </button>
          </div>
        </section>

        {/* KPIs */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {emergencyKPIs.map((kpi) => (
            <motion.div key={kpi.label} whileHover={{ y: -4 }} className="glass-card p-6 border border-white/5 transition-all bg-[#0b142e]/60 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-red-500/10 text-red-500">
                  <MaterialIcon icon={kpi.icon} filled />
                </div>
                <span className="text-label-md font-semibold text-[#94a3b8]">{kpi.label}</span>
              </div>
              <div className="flex items-end gap-2">
                <h3 className="text-display-lg font-black tracking-tighter text-white">{kpi.value}</h3>
                <span className="text-body-md text-[#94a3b8] pb-2">{kpi.unit}</span>
              </div>
              {kpi.progress && (
                <div className="mt-4 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-red-500 to-amber-500 rounded-full relative" style={{ width: `${kpi.progress}%` }}>
                    <div className="absolute inset-0 progress-shimmer"></div>
                  </div>
                </div>
              )}
              {kpi.trend && <p className="mt-3 text-label-sm text-emerald-400 font-bold flex items-center gap-1"><MaterialIcon icon="trending_up" className="text-[16px]" /> {kpi.trend}</p>}
              {kpi.subtitle && <p className="mt-3 text-label-sm text-emerald-400 font-bold flex items-center gap-1"><MaterialIcon icon="verified" filled className="text-[16px]" /> {kpi.subtitle}</p>}
            </motion.div>
          ))}
        </section>

        {/* Services */}
        <section>
          <h2 className="text-headline-sm font-bold text-white mb-6">Emergency Dispatch Units</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emergencyServices.map((service) => (
              <motion.div key={service.title} whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(7,11,25,0.4)' }}
                className="group glass-card p-6 border border-white/5 transition-all duration-300 bg-[#0b142e]/60 rounded-2xl">
                <div className="flex items-center justify-between mb-5">
                  <div className={`p-3 ${service.iconBg} rounded-xl group-hover:scale-105 transition-transform`}>
                    <MaterialIcon icon={service.icon} className="text-[28px] text-white" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/5 border border-white/10 text-white">{service.status}</span>
                </div>
                <h3 className="text-label-md font-bold text-white mb-2">{service.title}</h3>
                <div className="flex items-center gap-4 text-label-sm text-[#94a3b8] mb-4">
                  <span className="flex items-center gap-1"><MaterialIcon icon="group" className="text-[14px]" /> {service.units}</span>
                  <span className="flex items-center gap-1"><MaterialIcon icon="timer" className="text-[14px]" /> {service.avgTime}</span>
                </div>
                <button className="w-full bg-white/5 group-hover:bg-red-600 group-hover:text-white py-3 rounded-xl text-label-md font-bold transition-all flex items-center justify-center gap-2 border border-white/5 text-[#e2e8f0]">
                  <MaterialIcon icon={service.actionIcon} className="text-[18px]" />
                  <span>{service.action}</span>
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Bottom Row: Centers & Interactive 3D Mini Map */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Nearby Centers */}
          <div className="lg:col-span-2 glass-card p-6 bg-[#0b142e]/60 border border-white/5 rounded-2xl">
            <h3 className="text-label-md font-bold mb-4 flex items-center gap-2 text-white">
              <MaterialIcon icon="near_me" className="text-red-500" /> Dispatch Depots
            </h3>
            <div className="space-y-4">
              {nearbyCenters.map((center) => (
                <div key={center.name} className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-colors group">
                  <div>
                    <p className="text-label-md font-bold text-white">{center.name}</p>
                    <div className="flex gap-3 text-[11px] text-[#94a3b8]">
                      <span>{center.distance}</span>
                      <span>{center.status}</span>
                      <span>Response: {center.response}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-8 h-8 bg-white/5 hover:bg-white/20 text-[#06b6d4] rounded-full flex items-center justify-center">
                      <MaterialIcon icon="directions" className="text-[16px]" />
                    </button>
                    <button className="w-8 h-8 bg-white/5 hover:bg-white/20 text-emerald-500 rounded-full flex items-center justify-center">
                      <MaterialIcon icon="call" className="text-[16px]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive 3D Mini Map Canvas (Step 18: Animated dispatch vehicles) */}
          <div className="lg:col-span-3 glass-card overflow-hidden p-0 h-[380px] relative border border-white/5 bg-[#0b142e]/60 rounded-2xl">
            <Emergency3DMap />
            
            {/* Spatial details overlays */}
            <div className="absolute bottom-6 left-6 flex items-center gap-3 z-10 bg-[#070b19]/80 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/10 pointer-events-none">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></div>
              <span className="text-white text-[10px] font-black uppercase tracking-wider">3 Active Dispatches Nearby</span>
            </div>
            
            <div className="absolute top-6 right-6 glass-card px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider text-white bg-[#070b19]/90 backdrop-blur-md pointer-events-none z-10 border border-white/10">
              <MaterialIcon icon="map" className="text-sm mr-1 text-red-500" /> Live 3D Twin View
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
