import { motion } from 'framer-motion';
import MaterialIcon from '../components/ui/MaterialIcon';
import BarChart3D from '../components/3d/Charts/BarChart3D';
import PieChart3D from '../components/3d/Charts/PieChart3D';
import { analyticsKPIs, engagementData, districtData, distributionData } from '../data/analyticsData';

export default function Analytics() {
  const predictionStats = [
    { label: 'Traffic Tomorrow', value: '+18%', desc: 'Congestion spike expected at Sector 3', icon: 'traffic', color: 'text-amber-500 bg-amber-500/10 border-amber-500/20' },
    { label: 'Pollution Level', value: '↓ 5%', desc: 'Carbon output declining due to grid updates', icon: 'air', color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' },
    { label: 'Population Flow', value: '↑ Increase', desc: 'Inbound commute flow peaking in Sector 1', icon: 'group', color: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20' },
  ];

  return (
    <>
      {/* Header */}
      <header className="h-20 dark-glass-panel border-b border-white/10 px-[var(--spacing-margin-desktop)] flex items-center justify-between sticky top-0 z-50">
        <div>
          <h1 className="text-headline-sm text-[#06b6d4] font-black">Urban Analytics</h1>
          <p className="text-label-sm text-[#94a3b8]">Central District Performance Matrix</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative hidden lg:block">
            <MaterialIcon icon="search" className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
            <input className="pl-12 pr-6 py-2.5 rounded-full bg-[#0f172a]/40 border border-white/5 w-64 focus:outline-none focus:ring-1 focus:ring-[#06b6d4] transition-all text-label-md text-white" placeholder="Search analytics..." type="text" />
          </div>
          <div className="flex items-center gap-3 pl-6 border-l border-white/10">
            <div className="text-right">
              <p className="text-label-md font-bold text-white">Admin Sarah</p>
              <p className="text-label-sm text-[#94a3b8]">District Chief</p>
            </div>
            <img alt="Admin" className="w-10 h-10 rounded-full border-2 border-[#06b6d4]/20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeOYHVOiR2kD5SOTp54FVQOjRnSmKXy6BLmtyLNspxvsfU4sreizOU_BkmN1OyDUEDIgYeKMtOdNRxGf3o82NJACfswkoWw8WOzrfyMz_0i81SrAOi02kCTjWPO2rP_m1Qa3QKXzfvTlGEm-rgZPHID5A1YnqRg_FSMW6REZpLxqw3agPDunKIWlj_yRyxe8OuZUcfcNv-VablFh8H3ZsiqbqbXdoCy2Q6L0N9AIAKcAs7kkIxZRXy8P4LtiEZwUp0iob-c3G8p_Dl" />
          </div>
        </div>
      </header>

      <div className="p-[var(--spacing-margin-desktop)] max-w-[var(--spacing-container-max)] mx-auto space-y-8">
        {/* KPIs */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {analyticsKPIs.map((kpi) => (
            <motion.div key={kpi.label} whileHover={{ y: -4 }} className="glass-card p-6 border border-white/5 flex flex-col gap-2 transition-transform bg-[#0b142e]/60">
              <div className="flex justify-between items-start">
                <div className={`p-2 ${kpi.iconBg} rounded-lg ${kpi.iconColor}`}>
                  <MaterialIcon icon={kpi.icon} />
                </div>
                <span className={`text-label-sm font-bold ${kpi.trendColor} px-2.5 py-1 rounded-md`}>{kpi.trend}</span>
              </div>
              <p className="text-label-sm text-[#94a3b8] mt-2">{kpi.label}</p>
              <h3 className="text-headline-md font-black text-white">{kpi.value}</h3>
            </motion.div>
          ))}
        </section>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* 3D Engagement Chart (Step 13) */}
          <div className="col-span-12 lg:col-span-8 glass-card p-8 flex flex-col justify-between bg-[#0b142e]/60">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-headline-sm text-white font-bold">Citizen Engagement Trends</h2>
                <p className="text-body-md text-[#94a3b8]">Activity volume over the last 30 days</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-lg bg-white/5 text-[#94a3b8] text-label-sm font-bold hover:bg-white/10 transition-colors">Daily</button>
                <button className="px-4 py-2 rounded-lg bg-[#06b6d4] text-white text-label-sm font-bold shadow-md shadow-[#06b6d4]/10">Weekly</button>
              </div>
            </div>
            <div className="w-full">
              <BarChart3D data={engagementData} />
            </div>
          </div>

          {/* Holographic AI Prediction Card (Steps 13 & 14) */}
          <div className="col-span-12 lg:col-span-4 glass-card p-8 relative overflow-hidden border border-cyan-500/20 bg-gradient-to-br from-[#070b19] via-[#0b142e] to-[#070b19]">
            {/* Holographic scanning line effect */}
            <div className="absolute left-0 w-full h-px bg-cyan-400/40 shadow-[0_0_10px_#22d3ee] animate-laser-sweep z-0 pointer-events-none"></div>

            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-[#06b6d4]">
                  <MaterialIcon icon="auto_awesome" filled />
                </div>
                <h4 className="text-label-md font-bold uppercase tracking-widest text-[#06b6d4]">AI Predictor Core</h4>
              </div>
              
              <h3 className="text-headline-sm font-bold text-white">Tomorrow's City Forecast</h3>
              
              {/* Forecast Indicators (Step 14) */}
              <div className="space-y-4 pt-2">
                {predictionStats.map((stat, i) => (
                  <div key={i} className={`p-4 rounded-2xl border flex items-start gap-4 ${stat.color}`}>
                    <div className="p-2 rounded-xl bg-white/5 flex-shrink-0">
                      <MaterialIcon icon={stat.icon} className="text-lg" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-wider opacity-60">{stat.label}</p>
                      <h4 className="text-headline-sm font-black mt-0.5 leading-none">{stat.value}</h4>
                      <p className="text-[11px] opacity-80 mt-1 leading-normal">{stat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* District Table */}
          <div className="col-span-12 lg:col-span-7 glass-card p-8 bg-[#0b142e]/60">
            <h2 className="text-headline-sm text-white font-bold mb-6">District Performance</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-label-sm text-[#94a3b8] border-b border-white/10">
                    <th className="pb-4 font-semibold">DISTRICT</th>
                    <th className="pb-4 font-semibold">REPORTS</th>
                    <th className="pb-4 font-semibold">STATUS</th>
                    <th className="pb-4 font-semibold">TREND</th>
                  </tr>
                </thead>
                <tbody className="text-label-md text-white">
                  {districtData.map((d) => (
                    <tr key={d.district} className="border-b border-white/5">
                      <td className="py-4 font-bold">{d.district}</td>
                      <td className="py-4">{d.reports}</td>
                      <td className="py-4"><span className={`px-3 py-1 rounded-full ${d.statusColor} text-[11px] font-bold`}>{d.status}</span></td>
                      <td className={`py-4 ${d.trendColor} font-bold`}>{d.trend}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 3D Distribution Chart (Step 13) */}
          <div className="col-span-12 lg:col-span-5 glass-card p-8 flex flex-col justify-between bg-[#0b142e]/60">
            <div>
              <h2 className="text-headline-sm text-white font-bold mb-1">Category Distribution</h2>
              <p className="text-body-md text-[#94a3b8] mb-6">Citywide incident breakdown</p>
            </div>
            
            <div className="mb-6">
              <PieChart3D data={distributionData} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {distributionData.map((d, idx) => (
                <div key={d.name} className="flex justify-between items-center p-3 bg-white/5 border border-white/5 rounded-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: ['#06b6d4', '#10b981', '#f59e0b', '#3b82f6'][idx % 4] }}></div>
                    <span className="text-[11px] font-bold text-[#94a3b8]">{d.name}</span>
                  </div>
                  <span className="text-xs font-black text-white">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAB */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-[#06b6d4] text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform z-50">
        <MaterialIcon icon="add" />
      </button>
    </>
  );
}
