import { useState } from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import TopNav from '../components/layout/TopNav';
import MaterialIcon from '../components/ui/MaterialIcon';
import StatusPulse from '../components/ui/StatusPulse';
import DashboardScene from '../components/3d/CityScene/DashboardScene';
import { sentimentData, leaderboardData, activityFeed } from '../data/dashboardData';

export default function Dashboard() {
  const [mode, setMode] = useState('health');

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <TopNav />
      <div className="p-[var(--spacing-margin-desktop)] space-y-[var(--spacing-stack-lg)] max-w-[var(--spacing-container-max)] mx-auto w-full">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-display-lg tracking-tighter text-[var(--color-on-surface)]">Central Dashboard</h2>
            <p className="text-body-md text-[var(--color-on-surface-variant)] mt-1">Smarter urban intelligence for the Central District ecosystem.</p>
          </div>
          <div className="flex gap-[var(--spacing-stack-sm)]">
            <button className="px-5 py-2.5 rounded-xl border border-[var(--color-outline-variant)] text-label-md font-semibold hover:bg-[var(--color-surface-container-low)] transition-all flex items-center gap-2">
              <MaterialIcon icon="download" className="text-[20px]" />Export Report
            </button>
            <button className="px-5 py-2.5 rounded-xl bg-[var(--color-primary)] text-white text-label-md font-semibold hover:opacity-90 transition-all shadow-lg shadow-[var(--color-primary)]/10">
              View Live Stream
            </button>
          </div>
        </div>

        {/* Digital Twin Interface Control Tabs (Step 6) */}
        <div className="glass p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <StatusPulse color="bg-[#06b6d4]" />
            <span className="text-label-md font-bold uppercase tracking-wider text-[var(--color-on-surface)]">
              Twin Interface Channel:
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'health', label: 'Health Indicators', icon: 'health_and_safety', color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' },
              { id: 'traffic', label: 'Traffic Density', icon: 'traffic', color: 'text-amber-500 bg-amber-500/10 border-amber-500/20' },
              { id: 'water', label: 'Water Grid', icon: 'water_drop', color: 'text-blue-500 bg-blue-500/10 border-blue-500/20' },
              { id: 'emergency', label: 'Emergency Command', icon: 'warning', color: 'text-rose-500 bg-rose-500/10 border-rose-500/20' },
            ].map((tab) => {
              const isActive = mode === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setMode(tab.id)}
                  className={`px-4 py-2 rounded-xl text-label-sm font-bold border transition-all flex items-center gap-2 ${
                    isActive
                      ? `${tab.color} border-current scale-[1.02] shadow-sm`
                      : 'border-[var(--color-outline-variant)]/30 text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container-low)]'
                  }`}
                >
                  <MaterialIcon icon={tab.icon} className="text-sm" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Complex Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* 3D Smart City Digital Twin (Step 6 & 7) */}
            <div className="w-full h-[520px] relative rounded-[24px] overflow-hidden">
              <DashboardScene mode={mode} />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sentiment Chart */}
              <div className="glass p-6 rounded-[20px] shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-label-md font-bold text-[var(--color-on-surface)]">City Sentiment</h4>
                  <MaterialIcon icon="more_horiz" className="text-[var(--color-on-surface-variant)]" />
                </div>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sentimentData} barCategoryGap="20%">
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#434655' }} />
                      <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                      <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                        {sentimentData.map((entry, index) => (
                          <Cell key={index} fill={entry.value >= 85 ? '#004ac6' : 'rgba(0, 74, 198, 0.2)'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Resource Usage */}
              <div className="glass p-6 rounded-[20px] shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-label-md font-bold text-[var(--color-on-surface)]">Resource Usage</h4>
                  <div className="flex gap-2">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-[var(--color-primary)]">
                      <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]"></div> Water
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-[var(--color-secondary)]">
                      <div className="w-2 h-2 rounded-full bg-[var(--color-secondary)]"></div> Power
                    </div>
                  </div>
                </div>
                <div className="h-48 relative flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full border-[12px] border-[var(--color-surface-container-high)] relative">
                    <div className="absolute inset-[-12px] rounded-full border-[12px] border-[var(--color-primary)] border-t-transparent border-l-transparent rotate-[45deg]"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-headline-sm font-black">72%</span>
                      <span className="text-[10px] uppercase font-bold text-[var(--color-on-surface-variant)]">Efficiency</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            {/* Leaderboard */}
            <div className="glass p-6 rounded-[20px] shadow-sm">
              <h4 className="text-label-md font-bold text-[var(--color-on-surface)] mb-6 flex items-center justify-between">
                Top Citizens
                <span className="text-[var(--color-primary)] text-[12px] font-semibold cursor-pointer">View All</span>
              </h4>
              <div className="space-y-4">
                {leaderboardData.map((user) => (
                  <div key={user.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--color-surface-container-high)] border border-[var(--color-outline-variant)]/20 overflow-hidden">
                        <img className="w-full h-full object-cover" src={user.avatar} alt={user.name} />
                      </div>
                      <div>
                        <p className="text-label-md font-bold">{user.name}</p>
                        <p className="text-[11px] text-[var(--color-on-surface-variant)]">{user.role}</p>
                      </div>
                    </div>
                    <span className="text-[var(--color-primary)] font-black text-label-md">{user.points}</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-2.5 rounded-xl border border-[var(--color-outline-variant)]/50 text-label-sm font-bold hover:bg-[var(--color-surface-container-low)] transition-all">
                Join Leaderboard
              </button>
            </div>

            {/* Activity Feed */}
            <div className="glass p-6 rounded-[20px] shadow-sm">
              <h4 className="text-label-md font-bold text-[var(--color-on-surface)] mb-6 flex items-center justify-between">
                Live Activity
                <StatusPulse color="bg-[var(--color-secondary)]" />
              </h4>
              <div className="space-y-6 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[1px] before:bg-[var(--color-outline-variant)]/30">
                {activityFeed.map((item, i) => (
                  <div key={i} className="relative pl-10">
                    <div className={`absolute left-0 top-0 w-10 h-10 rounded-full glass border ${item.borderColor} flex items-center justify-center ${item.iconColor} z-10`}>
                      <MaterialIcon icon={item.icon} className="text-[18px]" />
                    </div>
                    <div>
                      <p className="text-label-md font-bold">{item.title}</p>
                      <p className="text-body-md text-[var(--color-on-surface-variant)]">{item.description}</p>
                      <span className="text-[10px] font-medium text-[var(--color-outline)] uppercase mt-1 block">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
