import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

type AuthStep = "phone" | "code";

interface AuthScreenProps {
  onAuth: () => void;
}

export default function AuthScreen({ onAuth }: AuthScreenProps) {
  const [step, setStep] = useState<AuthStep>("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const codeRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (step === "code") {
      codeRefs.current[0]?.focus();
    }
  }, [step]);

  function formatPhone(val: string) {
    const digits = val.replace(/\D/g, "").slice(0, 11);
    if (!digits) return "";
    let result = "+7";
    if (digits.length > 1) result += " " + digits.slice(1, 4);
    if (digits.length > 4) result += " " + digits.slice(4, 7);
    if (digits.length > 7) result += "-" + digits.slice(7, 9);
    if (digits.length > 9) result += "-" + digits.slice(9, 11);
    return result;
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/\D/g, "");
    setPhone(formatPhone(raw.startsWith("7") ? raw : "7" + raw));
    setError("");
  }

  function handlePhoneSubmit(e: React.FormEvent) {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 11) {
      setError("Введите корректный номер телефона");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("code");
    }, 1000);
  }

  function handleCodeChange(index: number, val: string) {
    if (!/^\d?$/.test(val)) return;
    const next = [...code];
    next[index] = val;
    setCode(next);
    setError("");
    if (val && index < 5) {
      codeRefs.current[index + 1]?.focus();
    }
    if (next.every(d => d !== "") && val) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        if (next.join("") === "000000") {
          setError("Неверный код. Попробуйте ещё раз.");
          setCode(["", "", "", "", "", ""]);
          codeRefs.current[0]?.focus();
        } else {
          onAuth();
        }
      }, 800);
    }
  }

  function handleCodeKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      codeRefs.current[index - 1]?.focus();
    }
  }

  function handleResend() {
    setCode(["", "", "", "", "", ""]);
    setError("");
    codeRefs.current[0]?.focus();
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background text-foreground">
      {/* Background subtle grid */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "radial-gradient(circle, hsl(158 64% 52%) 1px, transparent 1px)", backgroundSize: "32px 32px" }}
      />

      <div className="relative w-full max-w-sm px-6 animate-fade-in">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
            <Icon name="Shield" size={28} className="text-primary-foreground" />
          </div>
          <h1 className="text-xl font-semibold tracking-tight">Сигнал</h1>
          <p className="text-xs text-muted-foreground mt-1">Защищённый мессенджер</p>
        </div>

        {step === "phone" ? (
          <form onSubmit={handlePhoneSubmit} className="flex flex-col gap-4">
            <div>
              <p className="text-sm font-medium mb-1">Номер телефона</p>
              <p className="text-xs text-muted-foreground mb-4">
                Мы отправим код подтверждения на ваш номер
              </p>
              <div className={`flex items-center gap-3 bg-card border rounded-xl px-4 py-3 transition-all
                ${error ? "border-destructive" : "border-border focus-within:border-primary"}`}
              >
                <Icon name="Phone" size={16} className="text-muted-foreground shrink-0" />
                <input
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="+7 900 000-00-00"
                  className="bg-transparent text-sm w-full outline-none placeholder:text-muted-foreground font-mono"
                  autoFocus
                />
              </div>
              {error && <p className="text-xs text-destructive mt-2">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium
                hover:opacity-90 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Icon name="Loader2" size={15} className="animate-spin" />
                  Отправляем код...
                </>
              ) : (
                <>
                  Получить код
                  <Icon name="ArrowRight" size={15} />
                </>
              )}
            </button>

            <div className="flex items-center gap-2 justify-center mt-2">
              <Icon name="Lock" size={11} className="text-primary" />
              <span className="text-xs text-muted-foreground">Сквозное шифрование</span>
            </div>
          </form>
        ) : (
          <div className="flex flex-col gap-4 animate-slide-in-right">
            <div>
              <p className="text-sm font-medium mb-1">Код подтверждения</p>
              <p className="text-xs text-muted-foreground mb-4">
                Введите 6-значный код, отправленный на{" "}
                <span className="text-foreground font-mono">{phone}</span>
              </p>

              <div className="flex gap-2 justify-between mb-1">
                {code.map((digit, i) => (
                  <input
                    key={i}
                    ref={el => { codeRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleCodeChange(i, e.target.value)}
                    onKeyDown={e => handleCodeKeyDown(i, e)}
                    className={`w-12 h-12 rounded-xl text-center text-lg font-mono font-medium bg-card border outline-none transition-all
                      ${error ? "border-destructive" : digit ? "border-primary" : "border-border focus:border-primary"}`}
                  />
                ))}
              </div>
              {error && <p className="text-xs text-destructive mt-2">{error}</p>}
            </div>

            {loading && (
              <div className="flex items-center justify-center gap-2 py-2 text-xs text-muted-foreground">
                <Icon name="Loader2" size={13} className="animate-spin" />
                Проверяем код...
              </div>
            )}

            <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
              <button
                onClick={() => { setStep("phone"); setCode(["", "", "", "", "", ""]); setError(""); }}
                className="hover:text-foreground transition flex items-center gap-1"
              >
                <Icon name="ArrowLeft" size={12} />
                Изменить номер
              </button>
              <button onClick={handleResend} className="hover:text-foreground transition">
                Отправить повторно
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
