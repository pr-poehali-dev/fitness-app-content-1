import { useState } from "react";
import Icon from "@/components/ui/icon";
import { HomeSection, TrainingSection, ScheduleSection } from "@/components/sections/DashboardSections";
import { NutritionSection } from "@/components/sections/NutritionSection";
import { TrackersSection, ProgressSection, CommunitySection, SettingsSection } from "@/components/sections/LifestyleSections";

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
