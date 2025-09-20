import { getDashboardStats } from "@/lib/data/dashboard";
import CounterCard from "./components/CounterCard";
import StatCard from "./components/StatCard";

export default function Dashboard() {
  const { pagesRead, stats } = getDashboardStats();
  return (
    <div className="p-8 space-y-6 bg-slate-100">
      <h1 className="text-xl text-slate-700 font-semibold">Dashboard</h1>

      <CounterCard value={pagesRead} label="Páginas lidas" />

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            color={stat.color}
          />
        ))}
      </div>
    </div>
  );
}
