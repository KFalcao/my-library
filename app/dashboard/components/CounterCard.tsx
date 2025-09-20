"use client";

import CountUp from "react-countup";

interface CounterCardProps {
  value: number;
  label: string;
}

export default function CounterCard({ value, label }: CounterCardProps) {
  return (
    <div className="rounded-2xl h-full bg-slate-200 p-6 flex flex-col items-center justify-center shadow-sm">
      <h2 className="text-6xl mt-4 font-bold text-slate-700">
        <CountUp end={value} duration={2} />
      </h2>
      <span className="text-sm p-6 text-slate-700 font-medium">{label}</span>
    </div>
  );
}
