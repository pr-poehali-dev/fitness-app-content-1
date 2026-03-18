export function CircleProgress({ value, max, color, size = 80 }: { value: number; max: number; color: string; size?: number }) {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(value / max, 1);
  const dash = circ * pct;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="hsl(220 12% 18%)" strokeWidth={6} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke={color} strokeWidth={6}
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        style={{ transition: "stroke-dasharray 0.6s ease" }}
      />
    </svg>
  );
}

export function MiniBar({ values, color }: { values: number[]; color: string }) {
  const max = Math.max(...values);
  return (
    <div className="flex items-end gap-0.5 h-10">
      {values.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm transition-all"
          style={{ height: `${(v / max) * 100}%`, background: color, opacity: i === values.length - 1 ? 1 : 0.4 }}
        />
      ))}
    </div>
  );
}

export function Badge({ children, color = "green" }: { children: React.ReactNode; color?: "green" | "orange" | "blue" | "purple" }) {
  const colors = {
    green: "bg-[hsl(152,72%,48%,0.12)] text-[hsl(152,72%,58%)]",
    orange: "bg-[hsl(32,90%,58%,0.12)] text-[hsl(32,90%,68%)]",
    blue: "bg-[hsl(210,90%,60%,0.12)] text-[hsl(210,90%,70%)]",
    purple: "bg-[hsl(265,70%,62%,0.12)] text-[hsl(265,70%,72%)]",
  };
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors[color]}`} style={{
      background: color === "green" ? "hsl(152 72% 48% / 0.15)" : color === "orange" ? "hsl(32 90% 58% / 0.15)" : color === "blue" ? "hsl(210 90% 60% / 0.15)" : "hsl(265 70% 62% / 0.15)",
      color: color === "green" ? "hsl(152,72%,62%)" : color === "orange" ? "hsl(32,90%,68%)" : color === "blue" ? "hsl(210,90%,72%)" : "hsl(265,70%,74%)",
    }}>{children}</span>
  );
}
