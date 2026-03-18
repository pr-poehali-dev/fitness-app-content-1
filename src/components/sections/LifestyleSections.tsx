import { useState } from "react";
import Icon from "@/components/ui/icon";
import { CircleProgress, Badge } from "@/components/ui/shared";

export function TrackersSection() {
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

export function ProgressSection() {
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

export function CommunitySection() {
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

export function SettingsSection() {
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
