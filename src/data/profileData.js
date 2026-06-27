export const userProfile = {
  name: 'Sarah Jenkins',
  title: 'Master Optimizer',
  bio: 'Pioneering sustainable urban development in the Central District since 2022.',
  level: 42,
  xp: 8500,
  xpMax: 10000,
  rank: '#12',
  impact: 'Top 1%',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSwqJu2Fkhnu0Qmw7EGr0K5Iaqfw2YdwU4rh3O65cYailLNp3HP6H-69_4XHB4uZ5QvY8qDWkE-mA1UnGtrzkvhe9yReMbMn1BPoXv-w-B33-6bCoUHwRo1cqqe7DqriQwiDBOz5G4cXl1IR9_403gqvO9NTLZc3nB_pxBOPLq72MOFiDfYS0XldV-MD0Y6nh8-Rh7yVgXU_QGnjGzja9g8m5b0C163AcBlntzskx2TUEEKC55o94IUX6oOUXNh2N2CpAIyfz9BuPk',
};

export const performanceMetrics = [
  { icon: 'workspace_premium', iconColor: 'text-[#3b82f6]', value: '12.4k', label: 'Total XP' },
  { icon: 'task_alt', iconColor: 'text-[#06b6d4]', value: '142', label: 'Issues Solved' },
  { icon: 'group', iconColor: 'text-[#3b82f6]', value: '892', label: 'Citizens Helped' },
  { icon: 'card_giftcard', iconColor: 'text-[#06b6d4]', value: '15', label: 'Rewards Earned' },
];

export const recentReports = [
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCW2f6Rz9rqcaN8CiVe-wSUUW12x7zs-5HJZP2Nziq2NdOFCzvnTfS2E_-J9kDMOeReb-7WnnYdSuc-XQ-fYaZnU25QTnDiKhTNg08b6-ajjg0eKtU--d-rydg7nk5sYbBKphxWp9ooo_EurGL77uoMddQQDaOeIAfbD0aGGpCBErTknZXqI_Kmos8jKShnVyQ9d4FfoCYM6xJdtGRUSB4_1eIqA2RkJWjflP7O4K-tXPlMkwtNhNyU2t1wFmbZPg52AB_ggrO73lZM',
    category: 'Lighting',
    categoryColor: 'bg-[#3b82f6]/10 text-[#3b82f6] border-[#3b82f6]/20',
    time: '2 hours ago',
    title: 'Smart Lamp Malfunction - 5th Ave',
    status: 'In Progress',
    statusColor: 'text-[#06b6d4]',
    statusDot: 'bg-[#06b6d4]',
    extra: 'AI Verified',
  },
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvpaUx41lFKz3E_VHvmDUx3sOzo44aMWk6yvHn13TyJ03VeQKSpFffyZTVqmPP_9Qezl5xkEvsX00HafpmDm_o80xLM77T9YnhmZwcP1czSPVLdZwBlhJth_l2emwiv6XKKscJyn63fckVVKcqFn7xspr91oXMtuCqy_MSQaV2nWmePPHRqK8KBta7zAxKWftJ8GQxejMyumSnG2OyCkh3YJUqMrcxVgroDbTfgNPz-rxVPIBopaqcVht6JdRm8UNg6-t3XKpQTcLg',
    category: 'Park Care',
    categoryColor: 'bg-[#06b6d4]/10 text-[#06b6d4] border-[#06b6d4]/20',
    time: 'Yesterday',
    title: 'Central Park Irrigation Leak',
    status: 'Resolved',
    statusColor: 'text-emerald-500',
    statusDot: 'bg-emerald-500',
    extra: '+250 XP Awarded',
  },
];

export const badges = [
  { icon: 'visibility', color: 'text-[#3b82f6]', label: 'Eagle Eye' },
  { icon: 'home_health', color: 'text-[#06b6d4]', label: 'Community Pillar' },
  { icon: 'bolt', color: 'text-[#3b82f6]', label: 'Fast Responder' },
  { icon: 'architecture', color: 'text-[#06b6d4]', label: 'City Architect' },
];

export const rewards = [
  { icon: 'directions_bus', iconColor: 'text-[#3b82f6]', iconBg: 'bg-[#3b82f6]/10', title: 'Public Transit Pass', description: '30-day unlimited access to all city transit zones.', available: true },
  { icon: 'local_parking', iconColor: 'text-[#06b6d4]', iconBg: 'bg-[#06b6d4]/10', title: 'Smart Parking Credit', description: '$50 Wallet credit for priority downtown parking.', available: false, xpNeeded: '1,500 XP Needed' },
];

export const activityItems = [
  { icon: 'thumb_up', iconColor: 'text-[#3b82f6]', iconBg: 'bg-[#3b82f6]/10', text: '4 citizens thanked you for the <strong>Park Repair</strong> report.', time: '10m ago' },
  { icon: 'military_tech', iconColor: 'text-[#06b6d4]', iconBg: 'bg-[#06b6d4]/10', text: 'New Badge earned: <strong>Master Optimizer</strong>.', time: '4h ago' },
  { icon: 'update', iconColor: 'text-[#94a3b8]', iconBg: 'bg-[#0f172a]', text: 'The <strong>Central District</strong> roadmap has been updated.', time: 'Yesterday' },
];

export const preferences = [
  { label: 'Stealth Mode', enabled: false },
  { label: 'Smart Alerts', enabled: true },
  { label: 'Data Sharing', enabled: true },
];
