import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/shared";

type AdminTab = "clients" | "workouts" | "nutrition";

export default function AdminPanel() {
  const { user, logout } = useAuth();
  const [tab, setTab] = useState<AdminTab>("clients");

  const tabs: { id: AdminTab; label: string; icon: string }[] = [
    { id: "clients", label: "Клиенты", icon: "Users" },
    { id: "workouts", label: "Тренировки", icon: "Dumbbell" },
    { id: "nutrition", label: "Питание", icon: "UtensilsCrossed" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <div className="w-full max-w-md min-h-screen flex flex-col">
        <header className="px-4 pt-6 pb-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">Панель тренера</h1>
              <Badge color="orange">Админ</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{user?.name}</p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-xl hover:bg-secondary"
          >
            <Icon name="LogOut" size={14} />
            Выйти
          </button>
        </header>

        <div className="px-4 mb-4">
          <div className="flex gap-1 bg-secondary rounded-xl p-1">
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-lg transition-all ${tab === t.id ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}
              >
                <Icon name={t.icon} size={13} />
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 px-4 pb-8">
          {tab === "clients" && <ClientsTab />}
          {tab === "workouts" && <WorkoutsTab />}
          {tab === "nutrition" && <NutritionTab />}
        </div>
      </div>
    </div>
  );
}

function ClientsTab() {
  const mockClients = [
    { name: "Мария Иванова", email: "maria@example.com", plan: "Похудение", active: true },
    { name: "Дмитрий Смирнов", email: "dmitry@example.com", plan: "Набор массы", active: true },
    { name: "Анна Козлова", email: "anna@example.com", plan: "Поддержание", active: false },
  ];
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{mockClients.length} клиента</p>
        <button className="flex items-center gap-1.5 text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-lg font-medium hover:bg-primary/20 transition-colors">
          <Icon name="Plus" size={12} />
          Добавить
        </button>
      </div>
      {mockClients.map(c => (
        <div key={c.email} className="glass rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
            {c.name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{c.name}</p>
            <p className="text-xs text-muted-foreground truncate">{c.email}</p>
            <p className="text-xs text-muted-foreground">{c.plan}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge color={c.active ? "green" : "orange"}>{c.active ? "Активен" : "Неактивен"}</Badge>
            <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="ChevronRight" size={14} />
            </button>
          </div>
        </div>
      ))}
      <div className="glass rounded-2xl p-4 border-dashed border border-border flex items-center justify-center gap-2 text-muted-foreground text-sm cursor-pointer hover:text-foreground transition-colors">
        <Icon name="UserPlus" size={16} />
        Пригласить клиента
      </div>
    </div>
  );
}

function WorkoutsTab() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">Программы тренировок</p>
        <button className="flex items-center gap-1.5 text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-lg font-medium hover:bg-primary/20 transition-colors">
          <Icon name="Plus" size={12} />
          Создать
        </button>
      </div>
      <div className="glass rounded-2xl p-5 flex flex-col items-center justify-center text-center gap-3 py-10">
        <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center">
          <Icon name="Dumbbell" size={24} className="text-muted-foreground" />
        </div>
        <div>
          <p className="font-medium">Нет программ</p>
          <p className="text-sm text-muted-foreground mt-1">Создайте первую программу тренировок<br/>с видео и описанием упражнений</p>
        </div>
        <button className="bg-primary text-primary-foreground text-sm px-5 py-2.5 rounded-xl font-medium hover:opacity-90 transition-opacity">
          Создать программу
        </button>
      </div>
    </div>
  );
}

function NutritionTab() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">Планы питания</p>
        <button className="flex items-center gap-1.5 text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-lg font-medium hover:bg-primary/20 transition-colors">
          <Icon name="Plus" size={12} />
          Создать
        </button>
      </div>
      <div className="glass rounded-2xl p-5 flex flex-col items-center justify-center text-center gap-3 py-10">
        <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center">
          <Icon name="UtensilsCrossed" size={24} className="text-muted-foreground" />
        </div>
        <div>
          <p className="font-medium">Нет планов питания</p>
          <p className="text-sm text-muted-foreground mt-1">Создавайте шаблоны и назначайте<br/>индивидуальные планы клиентам</p>
        </div>
        <button className="bg-primary text-primary-foreground text-sm px-5 py-2.5 rounded-xl font-medium hover:opacity-90 transition-opacity">
          Создать план
        </button>
      </div>
    </div>
  );
}
