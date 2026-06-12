import { stats } from "@/data/projects";

export function StatsGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="group rounded-[1.5rem] border border-slate-200/80 bg-white/70 p-5 shadow-sm backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-panel dark:border-white/10 dark:bg-white/[0.07]"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cyanGo/15 text-cyan-700 transition group-hover:bg-cyanGo group-hover:text-slate-950 dark:text-cyan-200">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-4xl font-black text-slate-950 dark:text-white">{stat.value}</span>
            </div>
            <p className="mt-5 text-sm font-bold text-slate-500 dark:text-slate-400">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
}
