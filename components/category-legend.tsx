import { GROUPS, GROUP_ORDER } from "@/lib/americas-data"

export function CategoryLegend({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-x-4 gap-y-2 ${className}`}>
      {GROUP_ORDER.map((key) => (
        <li key={key} className="flex items-center gap-2 text-sm">
          <span
            aria-hidden
            className="inline-block size-3.5 rounded-[4px]"
            style={{ backgroundColor: GROUPS[key].color }}
          />
          <span className="text-foreground/80">{GROUPS[key].label}</span>
        </li>
      ))}
    </ul>
  )
}
