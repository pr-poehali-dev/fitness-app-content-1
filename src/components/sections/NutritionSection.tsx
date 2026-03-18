import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/shared";

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

export function NutritionSection() {
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
