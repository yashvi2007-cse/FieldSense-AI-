import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  change?: string;
  isPositive?: boolean;
  accentColor?: 'cyan' | 'teal' | 'amber' | 'red' | 'purple';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  change,
  isPositive,
  accentColor = 'cyan',
}) => {
  const colorMap = {
    cyan: {
      border: 'hover:border-cyan-500/40',
      iconBg: 'bg-cyan-950/60 text-cyan-400 border-cyan-500/30',
      valueColor: 'text-cyan-200',
    },
    teal: {
      border: 'hover:border-teal-500/40',
      iconBg: 'bg-teal-950/60 text-teal-400 border-teal-500/30',
      valueColor: 'text-teal-200',
    },
    amber: {
      border: 'hover:border-amber-500/40',
      iconBg: 'bg-amber-950/60 text-amber-400 border-amber-500/30',
      valueColor: 'text-amber-200',
    },
    red: {
      border: 'hover:border-red-500/40',
      iconBg: 'bg-red-950/60 text-red-400 border-red-500/30',
      valueColor: 'text-red-200',
    },
    purple: {
      border: 'hover:border-purple-500/40',
      iconBg: 'bg-purple-950/60 text-purple-400 border-purple-500/30',
      valueColor: 'text-purple-200',
    },
  };

  const style = colorMap[accentColor] || colorMap.cyan;

  return (
    <div className={`p-4 rounded-xl bg-[#0c1324] border border-cyan-500/15 ${style.border} transition-all duration-200 shadow-lg shadow-black/20 group`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono font-medium text-slate-400 group-hover:text-slate-200 transition-colors">
          {title}
        </span>
        <div className={`p-2 rounded-lg border ${style.iconBg}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <div className={`text-2xl font-bold font-mono tracking-tight ${style.valueColor}`}>
          {value}
        </div>
        {change && (
          <span className={`text-[11px] font-mono font-bold px-1.5 py-0.5 rounded ${
            isPositive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
          }`}>
            {change}
          </span>
        )}
      </div>

      {subtitle && (
        <div className="mt-1 text-[11px] text-slate-500 font-mono truncate">
          {subtitle}
        </div>
      )}
    </div>
  );
};

