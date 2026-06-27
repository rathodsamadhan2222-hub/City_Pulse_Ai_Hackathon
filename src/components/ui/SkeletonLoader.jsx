import React from 'react';

export function CardSkeleton() {
  return (
    <div className="glass-card p-6 border border-white/5 bg-[#0b142e]/30 rounded-2xl animate-pulse space-y-4">
      <div className="flex justify-between items-start">
        <div className="w-10 h-10 bg-slate-800 rounded-xl" />
        <div className="w-14 h-5 bg-slate-800 rounded-lg" />
      </div>
      <div className="h-4 bg-slate-800 rounded-lg w-2/3" />
      <div className="h-6 bg-slate-800 rounded-lg w-1/3" />
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="glass-card p-6 border border-white/5 bg-[#0b142e]/30 rounded-2xl animate-pulse space-y-6">
      <div className="space-y-2">
        <div className="h-5 bg-slate-800 rounded-lg w-1/3" />
        <div className="h-3 bg-slate-800 rounded-lg w-1/2" />
      </div>
      
      {/* Simulated vertical chart bars */}
      <div className="h-36 flex items-end gap-3 pt-6 border-b border-slate-800">
        <div className="flex-1 bg-slate-800/40 rounded-t-lg h-2/3 animate-pulse" />
        <div className="flex-1 bg-slate-800/40 rounded-t-lg h-1/2 animate-pulse" />
        <div className="flex-1 bg-slate-800/40 rounded-t-lg h-5/6 animate-pulse" />
        <div className="flex-1 bg-slate-800/40 rounded-t-lg h-2/5 animate-pulse" />
        <div className="flex-1 bg-slate-800/40 rounded-t-lg h-3/4 animate-pulse" />
        <div className="flex-1 bg-slate-800/40 rounded-t-lg h-1/3 animate-pulse" />
      </div>
    </div>
  );
}
