export const analyticsKPIs = [
  { icon: 'campaign', iconBg: 'bg-primary/10', iconColor: 'text-primary', label: 'Active Reports', value: '1,284', trend: '+12.4%', trendColor: 'text-primary bg-primary/5' },
  { icon: 'timer', iconBg: 'bg-[#00687a]/10', iconColor: 'text-[#00687a]', label: 'Avg. Response Time', value: '18.5m', trend: '-4.2m', trendColor: 'text-[#00687a] bg-[#00687a]/5' },
  { icon: 'group', iconBg: 'bg-[#696e71]/10', iconColor: 'text-[#515659]', label: 'Citizen Engagement', value: '84.2k', trend: '94%', trendColor: 'text-primary bg-primary/5' },
  { icon: 'check_circle', iconBg: 'bg-[#2563eb]', iconColor: 'text-white', label: 'Resolution Rate', value: '92.8%', trend: 'Stable', trendColor: 'text-on-surface-variant bg-[#eaedff]' },
];

export const engagementData = [
  { week: 'WK 1', value: 40 },
  { week: 'WK 2', value: 60 },
  { week: 'WK 3', value: 50 },
  { week: 'WK 4', value: 85 },
  { week: 'WK 5', value: 65 },
  { week: '', value: 100 },
  { week: '', value: 90 },
  { week: '', value: 55 },
  { week: '', value: 75 },
  { week: '', value: 35 },
];

export const aiPrediction = {
  title: 'Traffic Congestion Spike',
  description: 'Predictive models indicate a 24% increase in traffic volume for the <strong>Central Avenue</strong> junction tomorrow morning between 08:00 and 09:30 due to public events.',
  action: 'Adjust Smart Signals',
};

export const districtData = [
  { district: 'North Harbor', reports: 432, status: 'OPTIMAL', statusColor: 'bg-emerald-100 text-emerald-700', trend: '↑ 8%', trendColor: 'text-emerald-600' },
  { district: 'Green Valley', reports: 289, status: 'STABLE', statusColor: 'bg-amber-100 text-amber-700', trend: '↔ 0%', trendColor: 'text-amber-600' },
  { district: 'South Tech Hub', reports: 891, status: 'HIGH LOAD', statusColor: 'bg-rose-100 text-rose-700', trend: '↑ 22%', trendColor: 'text-rose-600' },
];

export const distributionData = [
  { name: 'Infrastructure', value: 45, color: '#004ac6' },
  { name: 'Public Safety', value: 30, color: '#00687a' },
  { name: 'Sanitation', value: 25, color: '#696e71' },
];
