import { BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function LanguageBadges({ languages, compact = false }: { languages: string[]; compact?: boolean }) {
  return (
    <div className="flex flex-wrap gap-2">
      {languages.map((language) => (
        <span
          key={language}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border font-bold",
            language === "Go"
              ? "border-cyanGo/40 bg-cyanGo/15 text-cyan-700 dark:text-cyan-200"
              : "border-slate-200 bg-white/70 text-slate-600 dark:border-white/10 dark:bg-white/10 dark:text-slate-300",
            compact ? "px-2.5 py-1 text-[11px]" : "px-3 py-1.5 text-xs"
          )}
        >
          {language === "Go" && <BadgeCheck className="h-3.5 w-3.5" />}
          {language}
        </span>
      ))}
    </div>
  );
}
