import { useState } from "react";
import Icon from "@/components/ui/icon";
import { CircleProgress, MiniBar, Badge } from "@/components/ui/shared";

export function HomeSection() {
  const [waterGlasses, setWaterGlasses] = useState(5);
  const waterGoal = 8;

  return (
    <div className="space-y-4 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground text-sm">Среда, 18 марта</p>
          <h2 className="text-2xl font-bold">Добрый день, Алексей 👋</h2>
        </div>
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">А</div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="glass rounded-2xl p-4 col-span-2" style={{ boxShadow: "0 0 24px hsl(152 72% 48% / 0.12)" }}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Калории сегодня</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-bold font-mono text-primary">1 840</span>
                <span className="text-muted-foreground text-sm">/ 2 200</span>
              </div>
            </div>
            <CircleProgress value={1840} max={2200} color="hsl(152,72%,48%)" size={72} />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Белки", value: 98, max: 140, color: "hsl(210,90%,60%)" },
              { label: "Жиры", value: 62, max: 80, color: "hsl(32,90%,58%)" },
              { label: "Углеводы", value: 210, max: 260, color: "hsl(265,70%,62%)" },
            ].map((m) => (
              <div key={m.label} className="bg-secondary/50 rounded-xl p-2.5">
                <p className="text-xs text-muted-foreground">{m.label}</p>
                <p className="text-sm font-semibold font-mono mt-0.5">
                  {m.value}<span className="text-muted-foreground text-xs">г</span>
                </p>
                <div className="mt-1.5 h-1 rounded-full bg-border overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(m.value / m.max) * 100}%`, background: m.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Droplets" size={16} className="text-[hsl(210,90%,60%)]" />
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Вода</p>
          </div>
          <p className="text-2xl font-bold font-mono">
            {waterGlasses}<span className="text-muted-foreground text-base">/{waterGoal}</span>
          </p>
          <div className="flex gap-1 mt-2 flex-wrap">
            {Array.from({ length: waterGoal }).map((_, i) => (
              <button
                key={i}
                onClick={() => setWaterGlasses(i + 1)}
                className="text-base transition-all hover:scale-110"
                style={{ opacity: i < waterGlasses ? 1 : 0.25 }}
              >🥤</button>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Moon" size={16} className="text-[hsl(265,70%,62%)]" />
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Сон</p>
          </div>
          <p className="text-2xl font-bold font-mono">7<span className="text-sm text-muted-foreground">ч 20м</span></p>
          <div className="mt-2">
            <MiniBar values={[6.5, 7, 5.5, 8, 7.3, 6.8, 7.3]} color="hsl(265,70%,62%)" />
          </div>
        </div>

        <div className="glass rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Flame" size={16} className="text-[hsl(32,90%,58%)]" />
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Шаги</p>
          </div>
          <p className="text-2xl font-bold font-mono">8 420</p>
          <div className="mt-1.5 h-1.5 rounded-full bg-border overflow-hidden">
            <div className="h-full rounded-full bg-[hsl(32,90%,58%)]" style={{ width: "84%" }} />
          </div>
          <p className="text-xs text-muted-foreground mt-1">84% от цели</p>
        </div>

        <div className="glass rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Dumbbell" size={16} className="text-primary" />
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Тренировка</p>
          </div>
          <p className="text-sm font-semibold">Силовая А</p>
          <p className="text-xs text-muted-foreground mt-0.5">Сегодня в 18:00</p>
          <button className="mt-2 w-full text-xs bg-primary/10 text-primary rounded-lg py-1.5 font-medium hover:bg-primary/20 transition-colors">
            Начать
          </button>
        </div>
      </div>

      <div className="glass rounded-2xl p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Активность за неделю</p>
        <div className="flex items-end gap-1.5 h-14">
          {[40, 65, 30, 80, 55, 90, 84].map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-md transition-all"
                style={{ height: `${v}%`, background: i === 6 ? "hsl(152,72%,48%)" : "hsl(220,12%,20%)", minHeight: 4 }}
              />
              <span className="text-[10px] text-muted-foreground">
                {["Пн","Вт","Ср","Чт","Пт","Сб","Вс"][i]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TrainingSection() {
  const [activeProgram, setActiveProgram] = useState<number | null>(null);

  const programs = [
    { name: "Силовая А", duration: "45 мин", level: "Средний", exercises: 6, tag: "Сила", color: "orange" as const },
    { name: "30 дней пресса", duration: "15 мин", level: "Новичок", exercises: 4, tag: "Пресс", color: "green" as const },
    { name: "Кардио HIIT", duration: "30 мин", level: "Продвинутый", exercises: 8, tag: "Кардио", color: "blue" as const },
    { name: "Йога", duration: "20 мин", level: "Новичок", exercises: 10, tag: "Гибкость", color: "purple" as const },
  ];

  const exercises = [
    { name: "Приседания", sets: "4×12", muscle: "Ноги", done: true },
    { name: "Жим лёжа", sets: "4×10", muscle: "Грудь", done: true },
    { name: "Тяга штанги", sets: "3×12", muscle: "Спина", done: false },
    { name: "Жим плечами", sets: "3×12", muscle: "Плечи", done: false },
    { name: "Подъём на бицепс", sets: "3×15", muscle: "Руки", done: false },
    { name: "Планка", sets: "3×60с", muscle: "Кор", done: false },
  ];

  return (
    <div className="space-y-4 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Тренировки</h2>
        <button className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-lg font-medium hover:bg-primary/20 transition-colors">
          + Создать план
        </button>
      </div>

      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Программы</p>
        <div className="grid grid-cols-2 gap-2">
          {programs.map((p, i) => (
            <button
              key={p.name}
              onClick={() => setActiveProgram(activeProgram === i ? null : i)}
              className={`glass rounded-2xl p-3.5 text-left transition-all hover:scale-[1.02] ${activeProgram === i ? "ring-2 ring-primary/60" : ""}`}
            >
              <Badge color={p.color}>{p.tag}</Badge>
              <p className="font-semibold text-sm mt-2">{p.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <Icon name="Clock" size={12} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{p.duration}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{p.exercises} упражнений</p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Сегодня — Силовая А</p>
        <div className="space-y-2">
          {exercises.map((ex) => (
            <div key={ex.name} className={`glass rounded-xl px-4 py-3 flex items-center justify-between ${ex.done ? "opacity-60" : ""}`}>
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${ex.done ? "bg-primary border-primary" : "border-border"}`}>
                  {ex.done && <Icon name="Check" size={10} className="text-primary-foreground" />}
                </div>
                <div>
                  <p className="text-sm font-medium">{ex.name}</p>
                  <p className="text-xs text-muted-foreground">{ex.muscle}</p>
                </div>
              </div>
              <span className="text-sm font-mono text-muted-foreground">{ex.sets}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ScheduleSection() {
  const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  const dates = [16, 17, 18, 19, 20, 21, 22];
  const today = 18;

  const events = [
    { time: "07:30", title: "Завтрак", color: "hsl(32,90%,58%)" },
    { time: "10:00", title: "Кардио 30 мин", color: "hsl(152,72%,48%)" },
    { time: "13:00", title: "Обед", color: "hsl(32,90%,58%)" },
    { time: "16:00", title: "Перекус", color: "hsl(32,90%,58%)" },
    { time: "18:00", title: "Силовая А", color: "hsl(152,72%,48%)" },
    { time: "22:00", title: "Отход ко сну", color: "hsl(265,70%,62%)" },
  ];

  return (
    <div className="space-y-4 animate-slide-up">
      <h2 className="text-xl font-bold">Расписание</h2>

      <div className="glass rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold">Март 2026</span>
          <div className="flex gap-2">
            <button className="text-muted-foreground hover:text-foreground"><Icon name="ChevronLeft" size={18} /></button>
            <button className="text-muted-foreground hover:text-foreground"><Icon name="ChevronRight" size={18} /></button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((d) => (
            <div key={d} className="text-center text-xs text-muted-foreground py-1">{d}</div>
          ))}
          {dates.map((d) => (
            <button
              key={d}
              className={`aspect-square rounded-xl flex flex-col items-center justify-center text-sm font-medium transition-all
                ${d === today ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
            >
              {d}
              {[16, 18, 20, 21].includes(d) && (
                <div className={`w-1 h-1 rounded-full mt-0.5 ${d === today ? "bg-primary-foreground/60" : "bg-primary"}`} />
              )}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">18 марта, среда</p>
        <div className="space-y-2 relative">
          <div className="absolute left-[52px] top-0 bottom-0 w-px bg-border" />
          {events.map((ev) => (
            <div key={ev.time} className="flex items-center gap-3">
              <span className="text-xs font-mono text-muted-foreground w-12 text-right">{ev.time}</span>
              <div className="w-2.5 h-2.5 rounded-full z-10 flex-shrink-0" style={{ background: ev.color }} />
              <div className="glass rounded-xl px-3 py-2.5 flex-1">
                <p className="text-sm font-medium">{ev.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
