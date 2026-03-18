import { useState } from "react";
import Icon from "@/components/ui/icon";

type Section = "home" | "nutrition" | "training" | "schedule" | "trackers" | "progress" | "community" | "settings";

const NAV_ITEMS: { id: Section; label: string; icon: string }[] = [
  { id: "home", label: "Главная", icon: "LayoutDashboard" },
  { id: "nutrition", label: "Питание", icon: "UtensilsCrossed" },
  { id: "training", label: "Тренировки", icon: "Dumbbell" },
  { id: "schedule", label: "Расписание", icon: "CalendarDays" },
  { id: "trackers", label: "Трекеры", icon: "Activity" },
  { id: "progress", label: "Прогресс", icon: "TrendingUp" },
  { id: "community", label: "Сообщество", icon: "Users" },
  { id: "settings", label: "Настройки", icon: "Settings" },
];

function CircleProgress({ value, max, color, size = 80 }: { value: number; max: number; color: string; size?: number }) {
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

function MiniBar({ values, color }: { values: number[]; color: string }) {
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

function Badge({ children, color = "green" }: { children: React.ReactNode; color?: "green" | "orange" | "blue" | "purple" }) {
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

function HomeSection() {
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

function KbzhuCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState("28");
  const [weight, setWeight] = useState("76");
  const [height, setHeight] = useState("180");
  const [activity, setActivity] = useState("1.55");
  const [goal, setGoal] = useState<"loss" | "maintain" | "gain">("loss");
  const [result, setResult] = useState<{ kcal: number; protein: number; fat: number; carbs: number } | null>(null);

  const activityLevels = [
    { value: "1.2", label: "Минимум", desc: "Сидячий образ жизни" },
    { value: "1.375", label: "Низкая", desc: "1–3 тренировки/нед" },
    { value: "1.55", label: "Средняя", desc: "3–5 тренировок/нед" },
    { value: "1.725", label: "Высокая", desc: "6–7 тренировок/нед" },
    { value: "1.9", label: "Очень высокая", desc: "Физический труд" },
  ];

  const goalSettings = {
    loss: { label: "Похудение", mult: 0.8, color: "blue" as const },
    maintain: { label: "Поддержание", mult: 1.0, color: "green" as const },
    gain: { label: "Набор массы", mult: 1.15, color: "orange" as const },
  };

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    const act = parseFloat(activity);
    if (!w || !h || !a) return;

    const bmr = gender === "male"
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161;

    const tdee = bmr * act;
    const kcal = Math.round(tdee * goalSettings[goal].mult);
    const protein = Math.round(w * 2.0);
    const fat = Math.round(kcal * 0.25 / 9);
    const carbs = Math.round((kcal - protein * 4 - fat * 9) / 4);

    setResult({ kcal, protein, fat, carbs });
  };

  return (
    <div className="space-y-4 animate-slide-up">
      <div className="glass rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <Icon name="Calculator" size={18} className="text-primary" />
          <p className="font-semibold">Ваши параметры</p>
        </div>

        <div className="flex gap-2">
          {(["male", "female"] as const).map(g => (
            <button
              key={g}
              onClick={() => setGender(g)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                gender === g ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {g === "male" ? "👨 Мужчина" : "👩 Женщина"}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Возраст", value: age, onChange: setAge, unit: "лет", placeholder: "28" },
            { label: "Вес", value: weight, onChange: setWeight, unit: "кг", placeholder: "70" },
            { label: "Рост", value: height, onChange: setHeight, unit: "см", placeholder: "175" },
          ].map(f => (
            <div key={f.label}>
              <label className="text-xs text-muted-foreground block mb-1">{f.label}</label>
              <div className="relative">
                <input
                  type="number"
                  value={f.value}
                  onChange={e => f.onChange(e.target.value)}
                  placeholder={f.placeholder}
                  className="w-full bg-secondary rounded-xl px-3 py-2.5 text-sm font-mono pr-8 outline-none focus:ring-1 ring-primary/50 transition-all"
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">{f.unit}</span>
              </div>
            </div>
          ))}
        </div>

        <div>
          <label className="text-xs text-muted-foreground block mb-2">Уровень активности</label>
          <div className="space-y-1.5">
            {activityLevels.map(l => (
              <button
                key={l.value}
                onClick={() => setActivity(l.value)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all ${
                  activity === l.value ? "bg-primary/15 ring-1 ring-primary/40" : "bg-secondary hover:bg-secondary/80"
                }`}
              >
                <div>
                  <span className="text-sm font-medium">{l.label}</span>
                  <span className="text-xs text-muted-foreground ml-2">{l.desc}</span>
                </div>
                {activity === l.value && <Icon name="Check" size={14} className="text-primary flex-shrink-0" />}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs text-muted-foreground block mb-2">Цель</label>
          <div className="grid grid-cols-3 gap-2">
            {(Object.entries(goalSettings) as [typeof goal, typeof goalSettings[typeof goal]][]).map(([key, val]) => (
              <button
                key={key}
                onClick={() => setGoal(key)}
                className={`py-2.5 rounded-xl text-xs font-medium transition-all ${
                  goal === key ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {val.label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={calculate}
          className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
        >
          Рассчитать норму
        </button>
      </div>

      {result && (
        <div className="glass rounded-2xl p-5 animate-slide-up" style={{ boxShadow: "0 0 24px hsl(152 72% 48% / 0.15)" }}>
          <div className="flex items-center justify-between mb-4">
            <p className="font-semibold">Ваша норма</p>
            <Badge color={goalSettings[goal].color}>{goalSettings[goal].label}</Badge>
          </div>

          <div className="text-center mb-5">
            <span className="text-5xl font-bold font-mono text-primary">{result.kcal.toLocaleString("ru")}</span>
            <span className="text-muted-foreground ml-2 text-lg">ккал/день</span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Белки", value: result.protein, unit: "г", color: "hsl(210,90%,60%)", pct: Math.round(result.protein * 4 / result.kcal * 100) },
              { label: "Жиры", value: result.fat, unit: "г", color: "hsl(32,90%,58%)", pct: Math.round(result.fat * 9 / result.kcal * 100) },
              { label: "Углеводы", value: result.carbs, unit: "г", color: "hsl(265,70%,62%)", pct: Math.round(result.carbs * 4 / result.kcal * 100) },
            ].map(m => (
              <div key={m.label} className="bg-secondary/60 rounded-xl p-3 text-center">
                <div className="w-2 h-2 rounded-full mx-auto mb-1.5" style={{ background: m.color }} />
                <p className="text-xl font-bold font-mono">{m.value}<span className="text-xs text-muted-foreground">{m.unit}</span></p>
                <p className="text-xs text-muted-foreground mt-0.5">{m.label}</p>
                <p className="text-[10px] mt-1 font-mono" style={{ color: m.color }}>{m.pct}%</p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-1 h-2 rounded-full overflow-hidden">
            <div style={{ width: `${Math.round(result.protein * 4 / result.kcal * 100)}%`, background: "hsl(210,90%,60%)" }} />
            <div style={{ width: `${Math.round(result.fat * 9 / result.kcal * 100)}%`, background: "hsl(32,90%,58%)" }} />
            <div style={{ flex: 1, background: "hsl(265,70%,62%)" }} />
          </div>

          <p className="text-xs text-muted-foreground text-center mt-3">
            Расчёт по формуле Миффлина — Сан Жеора
          </p>
        </div>
      )}
    </div>
  );
}

function NutritionSection() {
  const [tab, setTab] = useState<"diary" | "calc">("diary");

  const meals = [
    { name: "Завтрак", time: "08:15", kcal: 420, items: ["Овсянка с ягодами", "Яйцо вареное", "Кофе"], done: true },
    { name: "Обед", time: "13:00", kcal: 680, items: ["Куриная грудка 200г", "Рис бурый", "Огурец"], done: true },
    { name: "Перекус", time: "16:00", kcal: 180, items: ["Творог 5%", "Банан"], done: false },
    { name: "Ужин", time: "19:30", kcal: 560, items: ["Лосось запечённый", "Брокколи на пару"], done: false },
  ];

  return (
    <div className="space-y-4 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Питание</h2>
        <Badge color="green">18 марта</Badge>
      </div>

      <div className="flex gap-1 bg-secondary rounded-xl p-1">
        <button
          onClick={() => setTab("diary")}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${tab === "diary" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
        >
          Дневник
        </button>
        <button
          onClick={() => setTab("calc")}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${tab === "calc" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
        >
          Калькулятор КБЖУ
        </button>
      </div>

      {tab === "diary" ? (
        <>
          <div className="glass rounded-2xl p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium">КБЖУ за день</span>
              <span className="text-xs text-muted-foreground font-mono">1 840 / 2 200 ккал</span>
            </div>
            <div className="h-3 rounded-full bg-secondary overflow-hidden mb-3">
              <div className="h-full rounded-full bg-primary" style={{ width: "84%" }} />
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { n: "Белки", v: "98г", c: "hsl(210,90%,60%)" },
                { n: "Жиры", v: "62г", c: "hsl(32,90%,58%)" },
                { n: "Углеводы", v: "210г", c: "hsl(265,70%,62%)" },
              ].map(m => (
                <div key={m.n} className="bg-secondary/50 rounded-xl p-2">
                  <div className="w-2 h-2 rounded-full mx-auto mb-1" style={{ background: m.c }} />
                  <p className="font-bold font-mono text-sm">{m.v}</p>
                  <p className="text-xs text-muted-foreground">{m.n}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            {meals.map((meal) => (
              <div key={meal.name} className={`glass rounded-2xl p-4 transition-all ${meal.done ? "opacity-70" : ""}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${meal.done ? "bg-primary" : "bg-border"}`} />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{meal.name}</p>
                        <span className="text-xs text-muted-foreground">{meal.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{meal.items.join(" • ")}</p>
                    </div>
                  </div>
                  <span className="text-sm font-mono font-semibold text-muted-foreground">{meal.kcal}</span>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full glass rounded-2xl p-4 flex items-center justify-center gap-2 text-primary font-medium hover:bg-primary/10 transition-colors" style={{ border: "2px dashed hsl(152 72% 48% / 0.3)" }}>
            <Icon name="Plus" size={18} />
            Добавить приём пищи
          </button>
        </>
      ) : (
        <KbzhuCalculator />
      )}
    </div>
  );
}

function TrainingSection() {
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

function ScheduleSection() {
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

function TrackersSection() {
  const [water, setWater] = useState(5);
  const waterMax = 8;

  return (
    <div className="space-y-4 animate-slide-up">
      <h2 className="text-xl font-bold">Трекеры</h2>

      <div className="glass rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Icon name="Droplets" size={18} className="text-[hsl(210,90%,60%)]" />
              <p className="font-semibold">Вода</p>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">Норма: 8 стаканов (2 л)</p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-bold font-mono">{water}</span>
            <span className="text-muted-foreground">/{waterMax}</span>
            <p className="text-xs text-muted-foreground">стаканов</p>
          </div>
        </div>
        <div className="h-3 rounded-full bg-secondary overflow-hidden mb-3">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${(water / waterMax) * 100}%`, background: "hsl(210,90%,60%)" }}
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setWater(Math.max(0, water - 1))}
            className="flex-1 py-2.5 rounded-xl bg-secondary text-sm font-medium hover:bg-border transition-colors"
          >— Убрать</button>
          <button
            onClick={() => setWater(Math.min(waterMax, water + 1))}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors"
            style={{ background: "hsl(210 90% 60% / 0.15)", color: "hsl(210,90%,70%)" }}
          >+ Добавить</button>
        </div>
      </div>

      <div className="glass rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Icon name="Moon" size={18} className="text-[hsl(265,70%,62%)]" />
              <p className="font-semibold">Сон</p>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">Рекомендуется: 7–9 часов</p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-bold font-mono">7.3</span>
            <p className="text-xs text-muted-foreground">часов</p>
          </div>
        </div>
        <div className="flex gap-1 h-16 items-end">
          {[6.5, 7.0, 5.5, 8.0, 7.3, 6.8, 7.3].map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-sm"
                style={{
                  height: `${(v / 9) * 100}%`,
                  background: v >= 7 ? "hsl(265,70%,62%)" : "hsl(265,40%,42%)",
                }}
              />
              <span className="text-[10px] text-muted-foreground">
                {["Пн","Вт","Ср","Чт","Пт","Сб","Вс"][i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="Activity" size={18} className="text-[hsl(32,90%,58%)]" />
          <p className="font-semibold">БЖУ сегодня</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative flex-shrink-0">
            <CircleProgress value={1840} max={2200} color="hsl(152,72%,48%)" size={100} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg font-bold font-mono">84%</span>
              <span className="text-[10px] text-muted-foreground">нормы</span>
            </div>
          </div>
          <div className="flex-1 space-y-2">
            {[
              { n: "Белки", v: 98, max: 140, c: "hsl(210,90%,60%)" },
              { n: "Жиры", v: 62, max: 80, c: "hsl(32,90%,58%)" },
              { n: "Углеводы", v: 210, max: 260, c: "hsl(265,70%,62%)" },
            ].map(m => (
              <div key={m.n}>
                <div className="flex justify-between text-xs mb-0.5">
                  <span className="text-muted-foreground">{m.n}</span>
                  <span className="font-mono">{m.v}г</span>
                </div>
                <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(m.v / m.max) * 100}%`, background: m.c }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Icon name="Weight" size={18} className="text-primary" />
            <p className="font-semibold">Вес тела</p>
          </div>
          <Badge color="green">−2.4 кг</Badge>
        </div>
        <div className="flex items-end gap-1 h-14 mb-2">
          {[78.2, 77.8, 77.5, 77.9, 77.2, 76.8, 76.4].map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-sm transition-all"
                style={{ height: `${((v - 75) / 5) * 100}%`, background: "hsl(152 72% 48% / 0.4)" }}
              />
              <span className="text-[10px] text-muted-foreground">{["Пн","Вт","Ср","Чт","Пт","Сб","Вс"][i]}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>78.2 кг</span>
          <span className="text-primary font-medium">76.4 кг</span>
        </div>
      </div>
    </div>
  );
}

function ProgressSection() {
  return (
    <div className="space-y-4 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Прогресс</h2>
        <div className="flex gap-1">
          {["7д", "30д", "90д"].map((p, i) => (
            <button
              key={p}
              className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-colors ${i === 0 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >{p}</button>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl p-5">
        <p className="text-sm font-medium mb-1">Вес тела</p>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-3xl font-bold font-mono">76.4</span>
          <span className="text-muted-foreground">кг</span>
          <Badge color="green">−2.4 кг</Badge>
        </div>
        <div className="relative h-20">
          <svg viewBox="0 0 280 60" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(152,72%,48%)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="hsl(152,72%,48%)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,50 C20,45 40,38 80,30 S140,18 180,12 S240,5 280,0" fill="none" stroke="hsl(152,72%,48%)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M0,50 C20,45 40,38 80,30 S140,18 180,12 S240,5 280,0 V60 H0Z" fill="url(#weightGrad)" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Тренировок", value: "12", unit: "за месяц", icon: "Dumbbell" },
          { label: "Пройдено", value: "47", unit: "км", icon: "Footprints" },
          { label: "Ккал сожжено", value: "8 400", unit: "за месяц", icon: "Flame" },
          { label: "Серия", value: "9", unit: "дней подряд 🔥", icon: "Zap" },
        ].map((s) => (
          <div key={s.label} className="glass rounded-2xl p-4">
            <Icon name={s.icon} size={20} className="text-muted-foreground mb-2" />
            <p className="text-2xl font-bold font-mono">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            <p className="text-xs text-muted-foreground">{s.unit}</p>
          </div>
        ))}
      </div>

      <div className="glass rounded-2xl p-4">
        <p className="text-sm font-medium mb-3">Замеры тела (см)</p>
        <div className="space-y-2.5">
          {[
            { label: "Грудь", start: 98, now: 96 },
            { label: "Талия", start: 86, now: 82 },
            { label: "Бёдра", start: 100, now: 97 },
            { label: "Рука (бицепс)", start: 34, now: 35 },
          ].map((m) => (
            <div key={m.label} className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground w-28">{m.label}</span>
              <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                <div className="h-full rounded-full bg-primary/60" style={{ width: `${(m.now / m.start) * 100}%` }} />
              </div>
              <div className="flex items-center gap-1.5 w-20 justify-end">
                <span className="text-xs text-muted-foreground line-through">{m.start}</span>
                <span className="text-xs font-mono font-semibold">{m.now}</span>
                <span className={`text-xs ${m.now < m.start ? "text-primary" : "text-[hsl(32,90%,68%)]"}`}>
                  {m.now < m.start ? `−${m.start - m.now}` : `+${m.now - m.start}`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CommunitySection() {
  const posts = [
    { author: "Мария К.", avatar: "М", time: "2ч назад", text: "Закрыла челлендж 30 дней пресса! Результат виден 💪", likes: 24, tag: "Достижение", tagColor: "green" as const },
    { author: "Дмитрий Р.", avatar: "Д", time: "4ч назад", text: "Делюсь рецептом протеинового смузи: банан, творог, миндальное молоко, немного мёда", likes: 18, tag: "Рецепт", tagColor: "orange" as const },
    { author: "Анна В.", avatar: "А", time: "вчера", text: "Кто занимается йогой по утрам? Ищу компанию на онлайн-тренировки", likes: 11, tag: "Вопрос", tagColor: "blue" as const },
  ];

  const challenges = [
    { name: "100 приседаний", participants: 142, days: 7, progress: 65 },
    { name: "10 000 шагов", participants: 98, days: 14, progress: 40 },
  ];

  return (
    <div className="space-y-4 animate-slide-up">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Сообщество</h2>
        <button className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-lg font-medium hover:bg-primary/20 transition-colors">
          + Пост
        </button>
      </div>

      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Активные челленджи</p>
        <div className="space-y-2">
          {challenges.map(c => (
            <div key={c.name} className="glass rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold">{c.name}</p>
                <Badge color="orange">{c.days} дней</Badge>
              </div>
              <div className="h-1.5 rounded-full bg-secondary overflow-hidden mb-2">
                <div className="h-full rounded-full" style={{ width: `${c.progress}%`, background: "hsl(32,90%,58%)" }} />
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{c.participants} участников</span>
                <span>{c.progress}% выполнено</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Лента</p>
        <div className="space-y-2">
          {posts.map((p) => (
            <div key={p.author} className="glass rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-sm flex-shrink-0">
                  {p.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm">{p.author}</span>
                    <Badge color={p.tagColor}>{p.tag}</Badge>
                    <span className="text-xs text-muted-foreground ml-auto">{p.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{p.text}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                      <Icon name="Heart" size={14} />
                      {p.likes}
                    </button>
                    <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors ml-3">
                      <Icon name="MessageCircle" size={14} />
                      Ответить
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SettingsSection() {
  const [notifications, setNotifications] = useState(true);
  const [offlineMode, setOfflineMode] = useState(true);

  const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-colors ${value ? "bg-primary" : "bg-secondary"}`}
    >
      <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${value ? "translate-x-5" : "translate-x-0.5"}`} />
    </button>
  );

  return (
    <div className="space-y-4 animate-slide-up">
      <h2 className="text-xl font-bold">Настройки</h2>

      <div className="glass rounded-2xl p-4 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary">А</div>
        <div>
          <p className="font-semibold">Алексей Смирнов</p>
          <p className="text-sm text-muted-foreground">alexey@example.com</p>
          <div className="mt-1"><Badge color="green">Pro</Badge></div>
        </div>
        <button className="ml-auto text-muted-foreground hover:text-foreground">
          <Icon name="ChevronRight" size={18} />
        </button>
      </div>

      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Цели</p>
        <div className="glass rounded-2xl divide-y divide-border">
          {[
            { label: "Цель: Похудение", value: "−0.5 кг/нед", icon: "Target" },
            { label: "Калории", value: "2 200 ккал", icon: "Flame" },
            { label: "Шагов в день", value: "10 000", icon: "Footprints" },
          ].map((s) => (
            <div key={s.label} className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <Icon name={s.icon} size={16} className="text-muted-foreground" />
                <span className="text-sm">{s.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono text-muted-foreground">{s.value}</span>
                <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Приложение</p>
        <div className="glass rounded-2xl divide-y divide-border">
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm">Уведомления</span>
            <Toggle value={notifications} onChange={() => setNotifications(!notifications)} />
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm">Тёмная тема</span>
            <Toggle value={true} onChange={() => {}} />
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm">Работа офлайн</span>
            <Toggle value={offlineMode} onChange={() => setOfflineMode(!offlineMode)} />
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-1">
          <Icon name="WifiOff" size={16} className="text-primary" />
          <p className="text-sm font-medium">Офлайн-режим активен</p>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Все данные сохраняются локально и синхронизируются при подключении к интернету. Последняя синхронизация: сегодня, 12:34
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState<Section>("home");

  const sections: Record<Section, React.ReactNode> = {
    home: <HomeSection />,
    nutrition: <NutritionSection />,
    training: <TrainingSection />,
    schedule: <ScheduleSection />,
    trackers: <TrackersSection />,
    progress: <ProgressSection />,
    community: <CommunitySection />,
    settings: <SettingsSection />,
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <div className="w-full max-w-md min-h-screen flex flex-col relative">
        <div className="flex-1 overflow-y-auto pb-24 pt-6 px-4">
          {sections[active]}
        </div>

        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md glass border-t border-border px-1 py-2 z-50">
          <div className="grid grid-cols-8 gap-0">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`flex flex-col items-center gap-0.5 py-1 px-0.5 rounded-xl transition-all ${
                  active === item.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <div className={`transition-transform ${active === item.id ? "scale-110" : ""}`}>
                  <Icon name={item.icon} size={19} />
                </div>
                <span className="text-[8px] font-medium leading-none truncate w-full text-center">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}