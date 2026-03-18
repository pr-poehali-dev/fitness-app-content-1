import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Icon from "@/components/ui/icon";

export default function AuthScreen() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    let err: string | null;
    if (mode === "login") {
      err = await login(email, password);
    } else {
      err = await register(email, name, password);
    }
    setLoading(false);
    if (err) setError(err);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <Icon name="Dumbbell" size={32} className="text-primary" />
          </div>
          <h1 className="text-2xl font-bold">FitApp</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {mode === "login" ? "Войдите в свой аккаунт" : "Создайте аккаунт"}
          </p>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex rounded-xl bg-secondary p-1 mb-5">
            <button
              onClick={() => { setMode("login"); setError(""); }}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${mode === "login" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}
            >Вход</button>
            <button
              onClick={() => { setMode("register"); setError(""); }}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${mode === "register" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}
            >Регистрация</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === "register" && (
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Имя</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Иван Иванов"
                  className="w-full bg-secondary rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-muted-foreground"
                  required
                />
              </div>
            )}
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="example@mail.ru"
                className="w-full bg-secondary rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-muted-foreground"
                required
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Пароль</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Минимум 6 символов"
                  className="w-full bg-secondary rounded-xl px-4 py-3 pr-11 text-sm outline-none focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-muted-foreground"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <Icon name={showPass ? "EyeOff" : "Eye"} size={16} />
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-destructive/10 text-destructive text-sm px-3 py-2 rounded-xl">
                <Icon name="AlertCircle" size={14} />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Icon name="Loader2" size={16} className="animate-spin" />
                  {mode === "login" ? "Входим..." : "Регистрируем..."}
                </span>
              ) : (
                mode === "login" ? "Войти" : "Зарегистрироваться"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
