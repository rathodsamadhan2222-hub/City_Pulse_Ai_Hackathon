export default function StatusPulse({ color = 'bg-emerald-500', className = '' }) {
  return (
    <div className={`w-2.5 h-2.5 rounded-full ${color} status-pulse ${className}`} />
  );
}
