import { useState } from 'react';
import { motion } from 'framer-motion';
import MaterialIcon from '../components/ui/MaterialIcon';
import Profile3D from '../components/3d/Profile/Profile3D';
import { userProfile, performanceMetrics, recentReports, rewards, activityItems, preferences as preferencesData } from '../data/profileData';

export default function Profile() {
  const [preferences, setPreferences] = useState(preferencesData);

  const togglePreference = (index) => {
    setPreferences((prev) => prev.map((p, i) => i === index ? { ...p, enabled: !p.enabled } : p));
  };

  const timelineItems = [
    { title: 'Level 5 Promotion', desc: 'Promoted to Central Grid Chief with 1,240 XP.', time: '2 hrs ago', icon: 'military_tech', color: 'text-amber-500' },
    { title: 'Pothole Spotter Badge', desc: 'Scanned 12 road anomalies in Sector 4.', time: '1 day ago', icon: 'auto_awesome', color: 'text-cyan-500' },
    { title: 'Emergency Dispatch SOS', desc: 'Alerted dispatcher of critical Sector 5 collision.', time: '3 days ago', icon: 'warning', color: 'text-[#ef4444]' },
  ];

  return (
    <div className="dark-theme text-[var(--color-on-surface)] min-h-screen bg-[#070b19]/95 text-white">
      <main className="overflow-y-auto min-h-screen pb-12">
        {/* Header */}
        <header className="h-20 dark-glass-panel border-b border-white/5 px-[var(--spacing-margin-desktop)] flex items-center justify-between sticky top-0 z-50">
          <div>
            <h1 className="text-headline-sm font-bold text-white">Citizen Profile</h1>
            <p className="text-label-sm text-[#94a3b8]">Central Operation Vector Node</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2.5 rounded-full hover:bg-white/5 text-[#94a3b8] transition-colors">
              <MaterialIcon icon="notifications" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#06b6d4] rounded-full border-2 border-[#070b19]"></span>
            </button>
            <button className="p-2.5 rounded-full hover:bg-white/5 text-[#94a3b8] transition-colors">
              <MaterialIcon icon="settings" />
            </button>
          </div>
        </header>

        <div className="p-[var(--spacing-margin-desktop)] max-w-[var(--spacing-container-max)] mx-auto space-y-8">
          
          {/* Profile Hero Split: Left 3D Avatar/Badges, Right Stats Details (Step 19) */}
          <section className="glass-card p-8 relative overflow-hidden bg-gradient-to-br from-[#0b142e]/60 to-transparent border border-white/5 rounded-3xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#06b6d4] to-pink-500"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Interactive 3D Avatar & Rotating Badges Canvas */}
              <div className="lg:col-span-5 w-full flex justify-center">
                <Profile3D />
              </div>

              {/* Right Column: User operational data & XP Ring Progress */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-2 justify-center lg:justify-start">
                  <h2 className="text-headline-md font-bold text-white leading-none">{userProfile.name}</h2>
                  <MaterialIcon icon="verified" filled className="text-[#06b6d4] text-lg" />
                </div>
                <p className="text-body-md text-[#94a3b8] mb-6 text-center lg:text-left leading-relaxed">{userProfile.bio}</p>
                
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-[#06b6d4] border border-cyan-500/20 text-label-sm font-bold">{userProfile.title}</span>
                  <span className="px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20 text-label-sm font-bold">Level {userProfile.level}</span>
                  <span className="px-3 py-1 rounded-full bg-white/5 text-[#94a3b8] border border-white/5 text-label-sm font-bold">Rank: {userProfile.rank}</span>
                  <span className="px-3 py-1 rounded-full bg-white/5 text-[#94a3b8] border border-white/5 text-label-sm font-bold">Impact: {userProfile.impact}</span>
                </div>

                {/* Linear XP Ring / Bar Progression Indicator */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="flex justify-between text-label-sm text-[#94a3b8] mb-2">
                    <span>{userProfile.xp.toLocaleString()} / {userProfile.xpMax.toLocaleString()} XP</span>
                    <span>Next: Level {userProfile.level + 1}</span>
                  </div>
                  <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#06b6d4] to-pink-500 rounded-full relative animate-pulse" style={{ width: `${(userProfile.xp / userProfile.xpMax) * 100}%` }}>
                      <div className="absolute inset-0 progress-shimmer"></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Performance Metrics */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {performanceMetrics.map((m) => (
              <motion.div key={m.label} whileHover={{ y: -4 }} className="glass-card p-6 text-center bg-[#0b142e]/60 border border-white/5 rounded-2xl">
                <MaterialIcon icon={m.icon} filled className={`text-[28px] ${m.iconColor} mb-3`} />
                <h3 className="text-headline-sm font-bold text-white">{m.value}</h3>
                <p className="text-label-sm text-[#94a3b8]">{m.label}</p>
              </motion.div>
            ))}
          </section>

          {/* Reports + Achievement Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Recent Reports */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-label-md font-bold text-white mb-2">Recent Submissions</h3>
              {recentReports.map((report) => (
                <div key={report.title} className="glass-card p-4 flex gap-4 bg-[#0b142e]/60 border border-white/5 rounded-2xl">
                  <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <img className="w-full h-full object-cover" src={report.image} alt={report.title} />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-white/5 border border-white/10 text-[#94a3b8]`}>
                        {report.category}
                      </span>
                      <span className="text-[10px] text-[#94a3b8]">{report.time}</span>
                    </div>
                    <h4 className="text-label-md font-bold text-white truncate">{report.title}</h4>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${report.statusDot} animate-pulse`}></span>
                        <span className={`text-label-sm ${report.statusColor} font-bold`}>{report.status}</span>
                      </div>
                      <span className="text-[10px] text-[#94a3b8]">{report.extra}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Achievement Timeline (Step 19) & Rewards */}
            <div className="space-y-6">
              
              {/* Achievement Timeline */}
              <div className="glass-card p-6 bg-[#0b142e]/60 border border-white/5 rounded-2xl">
                <h3 className="text-label-md font-bold text-white mb-6">Achievement Timeline</h3>
                
                <div className="relative border-l border-white/10 pl-6 space-y-6">
                  {timelineItems.map((item, idx) => (
                    <div key={idx} className="relative">
                      {/* Timeline dot */}
                      <span className="absolute -left-[30px] top-0.5 bg-slate-900 border border-white/20 rounded-full w-4 h-4 flex items-center justify-center">
                        <span className={`w-2.5 h-2.5 rounded-full ${item.color.replace('text-', 'bg-')}`}></span>
                      </span>
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="text-label-sm font-bold text-white">{item.title}</h4>
                          <span className="text-[9px] text-[#64748b]">{item.time}</span>
                        </div>
                        <p className="text-[11px] text-[#94a3b8] mt-1 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rewards */}
              <div className="glass-card p-6 bg-[#0b142e]/60 border border-white/5 rounded-2xl">
                <h3 className="text-label-md font-bold text-white mb-4">Available Rewards</h3>
                <div className="space-y-3">
                  {rewards.map((r) => (
                    <div key={r.title} className="p-4 bg-white/5 rounded-xl border border-white/5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 ${r.iconBg} rounded-lg flex-shrink-0`}>
                          <MaterialIcon icon={r.icon} className={`${r.iconColor} text-[18px]`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-label-md font-bold text-white truncate">{r.title}</p>
                          <p className="text-[10px] text-[#94a3b8]">{r.description}</p>
                        </div>
                      </div>
                      {r.available ? (
                        <button className="w-full py-2 rounded-lg bg-cyan-500/10 text-[#06b6d4] text-label-sm font-bold hover:bg-[#06b6d4]/20 transition-colors border border-cyan-500/20">
                          Claim Reward
                        </button>
                      ) : (
                        <div className="py-2 text-center text-[10px] text-[#94a3b8] font-bold uppercase tracking-wider">{r.xpNeeded}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Activity + Preferences */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Activity */}
            <div className="glass-card p-6 bg-[#0b142e]/60 border border-white/5 rounded-2xl">
              <h3 className="text-label-md font-bold text-white mb-4">Operations Log</h3>
              <div className="space-y-4">
                {activityItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 hover:bg-white/5 rounded-xl transition-colors">
                    <div className={`p-2 ${item.iconBg} rounded-lg flex-shrink-0`}>
                      <MaterialIcon icon={item.icon} className={`${item.iconColor} text-[18px]`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-label-md text-[#e2e8f0]" dangerouslySetInnerHTML={{ __html: item.text }}></p>
                      <span className="text-[10px] text-[#64748b] font-medium mt-1 block">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Preferences */}
            <div className="glass-card p-6 bg-[#0b142e]/60 border border-white/5 rounded-2xl">
              <h3 className="text-label-md font-bold text-white mb-4">Operations Config</h3>
              <div className="space-y-4">
                {preferences.map((p, i) => (
                  <div key={p.label} className="flex items-center justify-between p-3.5 bg-white/5 border border-white/5 rounded-xl">
                    <span className="text-label-md text-[#e2e8f0] font-medium">{p.label}</span>
                    <button
                      className={`w-12 h-6 rounded-full transition-colors flex items-center ${p.enabled ? 'bg-[#06b6d4] justify-end' : 'bg-slate-800 justify-start'}`}
                      onClick={() => togglePreference(i)}
                    >
                      <div className="w-5 h-5 bg-white rounded-full shadow mx-0.5 transition-all"></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
