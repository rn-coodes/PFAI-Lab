import { GraduationCap, IdCard, MapPin, UserRound } from "lucide-react";
import { owner } from "@/data/projects";

const details = [
  { label: "Name", value: owner.name, icon: UserRound },
  { label: "Student ID", value: owner.studentId, icon: IdCard },
  { label: "University", value: owner.university, icon: GraduationCap },
  { label: "Focus", value: owner.role, icon: MapPin }
];

export function ProfileCard() {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/70 p-5 shadow-panel backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.07]">
      <div className="flex items-center gap-4">
        <div className="grid h-16 w-16 place-items-center rounded-3xl bg-gradient-to-br from-cyanGo to-emerald-300 text-2xl font-black text-slate-950 shadow-glow">
          R
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-200">
            Professional Profile
          </p>
          <h2 className="mt-1 text-2xl font-black text-slate-950 dark:text-white">Rehan</h2>
        </div>
      </div>

      <div className="mt-6 grid gap-3">
        {details.map((detail) => {
          const Icon = detail.icon;
          return (
            <div
              key={detail.label}
              className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/70 p-4 dark:border-white/10 dark:bg-white/[0.06]"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-950 text-cyanGo dark:bg-white dark:text-ink">
                <Icon className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-bold uppercase tracking-[0.14em] text-slate-400">{detail.label}</span>
                <span className="block truncate text-sm font-black text-slate-900 dark:text-white">{detail.value}</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
