"use client";

import CircularProgress from "./CircularProgress";

interface StatCardProps {
  label: string;
  value: number;
  max?: number;
  color?: string;
}

export default function StatCard({
  label,
  value,
  max = 10,
  color,
}: StatCardProps) {
  return (
    <div className="rounded-2xl h-auto bg-slate-200 p-4 flex flex-col items-center justify-center shadow-sm">
      <CircularProgress value={value} max={max} size={90} color={color} />
      <span className="absolute text-5xl text-slate-700 text-center mb-8 font-bold">
        {value}
      </span>
      <p className="font-medium text-slate-700 mt-2">{label}</p>
    </div>
  );
}
