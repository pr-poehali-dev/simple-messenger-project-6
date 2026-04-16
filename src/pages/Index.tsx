import { useState } from "react";
import Icon from "@/components/ui/icon";

type Section = "chats" | "calls" | "files" | "contacts" | "notifications" | "profile";

interface Chat {
  id: number;
  name: string;
  last: string;
  time: string;
  unread?: number;
  online?: boolean;
  group?: boolean;
  encrypted?: boolean;
  avatar: string;
}

interface Call {
  id: number;
  name: string;
  type: "audio" | "video";
  direction: "incoming" | "outgoing" | "missed";
  time: string;
  avatar: string;
}

interface FileItem {
  id: number;
  name: string;
  size: string;
  from: string;
  date: string;
  type: "doc" | "image" | "audio" | "zip";
}

interface Contact {
  id: number;
  name: string;
  status: string;
  online: boolean;
  avatar: string;
}

interface Message {
  id: number;
  text: string;
  own: boolean;
  time: string;
}

const chats: Chat[] = [
  { id: 1, name: "Алексей Громов", last: "Увидимся завтра, окей?", time: "14:32", unread: 2, online: true, encrypted: true, avatar: "АГ" },
  { id: 2, name: "Команда дизайна", last: "Марина: макеты готовы", time: "13:10", unread: 5, group: true, avatar: "КД" },
  { id: 3, name: "Ольга Федосеева", last: "Спасибо большое!", time: "11:55", online: false, encrypted: true, avatar: "ОФ" },
  { id: 4, name: "Проект Альфа", last: "Вы: отправил документы", time: "Вчера", group: true, avatar: "ПА" },
  { id: 5, name: "Дмитрий Нечаев", last: "Позвоню после обеда", time: "Вчера", online: true, encrypted: true, avatar: "ДН" },
  { id: 6, name: "Маркетинг", last: "Игорь: отчёт прикреплён", time: "Пн", group: true, avatar: "МК" },
  { id: 7, name: "Светлана Бойко", last: "Всё отлично, жду звонка", time: "Пн", encrypted: true, avatar: "СБ" },
];

const calls: Call[] = [
  { id: 1, name: "Алексей Громов", type: "video", direction: "incoming", time: "Сегодня, 14:10", avatar: "АГ" },
  { id: 2, name: "Ольга Федосеева", type: "audio", direction: "outgoing", time: "Сегодня, 11:30", avatar: "ОФ" },
  { id: 3, name: "Дмитрий Нечаев", type: "audio", direction: "missed", time: "Вчера, 19:45", avatar: "ДН" },
  { id: 4, name: "Светлана Бойко", type: "video", direction: "incoming", time: "Вчера, 16:00", avatar: "СБ" },
  { id: 5, name: "Алексей Громов", type: "audio", direction: "outgoing", time: "Пн, 10:15", avatar: "АГ" },
];

const files: FileItem[] = [
  { id: 1, name: "Презентация_Q2.pdf", size: "4.2 МБ", from: "Алексей Громов", date: "Сегодня", type: "doc" },
  { id: 2, name: "Фото_встреча.jpg", size: "1.8 МБ", from: "Команда дизайна", date: "Вчера", type: "image" },
  { id: 3, name: "Голосовое_сообщение.mp3", size: "0.6 МБ", from: "Ольга Федосеева", date: "Вчера", type: "audio" },
  { id: 4, name: "Архив_проекта.zip", size: "18.4 МБ", from: "Проект Альфа", date: "Пн", type: "zip" },
  { id: 5, name: "Техзадание_v3.docx", size: "2.1 МБ", from: "Маркетинг", date: "Пн", type: "doc" },
];

const contacts: Contact[] = [
  { id: 1, name: "Алексей Громов", status: "На связи", online: true, avatar: "АГ" },
  { id: 2, name: "Дмитрий Нечаев", status: "Был(а) 10 минут назад", online: false, avatar: "ДН" },
  { id: 3, name: "Ольга Федосеева", status: "Не беспокоить", online: false, avatar: "ОФ" },
  { id: 4, name: "Светлана Бойко", status: "На связи", online: true, avatar: "СБ" },
  { id: 5, name: "Игорь Смирнов", status: "Был(а) час назад", online: false, avatar: "ИС" },
  { id: 6, name: "Марина Коваль", status: "На связи", online: true, avatar: "МК" },
];

const messages: Message[] = [
  { id: 1, text: "Привет! Как дела с проектом?", own: false, time: "14:20" },
  { id: 2, text: "Всё идёт по плану. Сегодня закрыли последний баг.", own: true, time: "14:22" },
  { id: 3, text: "Отлично! Презентация готова?", own: false, time: "14:24" },
  { id: 4, text: "Да, уже отправил на твою почту. Проверь.", own: true, time: "14:25" },
  { id: 5, text: "Получил, смотрю. Выглядит хорошо!", own: false, time: "14:28" },
  { id: 6, text: "Увидимся завтра, окей?", own: false, time: "14:32" },
];

const navItems = [
  { id: "chats" as Section, icon: "MessageCircle", label: "Чаты" },
  { id: "calls" as Section, icon: "Phone", label: "Звонки" },
  { id: "files" as Section, icon: "Paperclip", label: "Файлы" },
  { id: "contacts" as Section, icon: "Users", label: "Контакты" },
  { id: "notifications" as Section, icon: "Bell", label: "Уведомления" },
  { id: "profile" as Section, icon: "User", label: "Профиль" },
];

const fileIcon: Record<FileItem["type"], string> = {
  doc: "FileText",
  image: "Image",
  audio: "Music",
  zip: "Archive",
};

export default function Index() {
  const [section, setSection] = useState<Section>("chats");
  const [activeChat, setActiveChat] = useState<Chat | null>(chats[0]);
  const [input, setInput] = useState("");
  const [notifSettings, setNotifSettings] = useState({
    all: true,
    sound: true,
    preview: false,
    calls: true,
  });
  const [profileEdit, setProfileEdit] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground">
      {/* Sidebar nav */}
      <nav className="flex flex-col items-center w-16 py-6 gap-1 border-r border-border bg-card shrink-0">
        <div className="mb-6">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Icon name="Shield" size={16} className="text-primary-foreground" />
          </div>
        </div>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setSection(item.id)}
            title={item.label}
            className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200
              ${section === item.id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
          >
            <Icon name={item.icon} size={18} />
            {item.id === "chats" && chats.reduce((s, c) => s + (c.unread || 0), 0) > 0 && section !== "chats" && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
            )}
          </button>
        ))}
      </nav>

      {/* Section panel */}
      <div className="w-72 shrink-0 border-r border-border flex flex-col bg-card overflow-hidden">
        {section === "chats" && (
          <>
            <div className="px-4 pt-5 pb-3">
              <h2 className="text-sm font-semibold text-foreground mb-3">Сообщения</h2>
              <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2">
                <Icon name="Search" size={14} className="text-muted-foreground" />
                <input className="bg-transparent text-sm w-full outline-none placeholder:text-muted-foreground" placeholder="Поиск..." />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {chats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setActiveChat(chat)}
                  className={`w-full flex items-center gap-3 px-4 py-3 transition-all text-left
                    ${activeChat?.id === chat.id ? "bg-accent" : "hover:bg-muted/50"}`}
                >
                  <div className="relative shrink-0">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-xs font-medium text-foreground">
                      {chat.avatar}
                    </div>
                    {chat.online && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-primary border-2 border-card rounded-full" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium truncate flex items-center gap-1">
                        {chat.name}
                        {chat.encrypted && <Icon name="Lock" size={10} className="text-primary shrink-0" />}
                      </span>
                      <span className="text-xs text-muted-foreground shrink-0 ml-2">{chat.time}</span>
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-xs text-muted-foreground truncate">{chat.last}</span>
                      {chat.unread && (
                        <span className="ml-2 shrink-0 w-5 h-5 bg-primary rounded-full text-primary-foreground text-xs flex items-center justify-center font-medium">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {section === "calls" && (
          <>
            <div className="px-4 pt-5 pb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold">Звонки</h2>
              <button className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center hover:opacity-90 transition">
                <Icon name="Plus" size={14} className="text-primary-foreground" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {calls.map((call) => (
                <div key={call.id} className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition group">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-xs font-medium shrink-0">
                    {call.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">{call.name}</div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Icon
                        name={call.direction === "missed" ? "PhoneMissed" : call.direction === "incoming" ? "PhoneIncoming" : "PhoneOutgoing"}
                        size={11}
                        className={call.direction === "missed" ? "text-destructive" : "text-primary"}
                      />
                      <span className="text-xs text-muted-foreground">{call.time}</span>
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                    <button className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition">
                      <Icon name={call.type === "video" ? "Video" : "Phone"} size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {section === "files" && (
          <>
            <div className="px-4 pt-5 pb-4">
              <h2 className="text-sm font-semibold">Файлы</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
              {files.map((file) => (
                <div key={file.id} className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition group cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                    <Icon name={fileIcon[file.type]} size={16} className="text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{file.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{file.size} · {file.from}</div>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 w-7 h-7 rounded-lg bg-accent flex items-center justify-center transition hover:text-primary">
                    <Icon name="Download" size={13} />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {section === "contacts" && (
          <>
            <div className="px-4 pt-5 pb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold">Контакты</h2>
              <button className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center hover:opacity-90 transition">
                <Icon name="UserPlus" size={13} className="text-primary-foreground" />
              </button>
            </div>
            <div className="px-4 mb-3">
              <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2">
                <Icon name="Search" size={14} className="text-muted-foreground" />
                <input className="bg-transparent text-sm w-full outline-none placeholder:text-muted-foreground" placeholder="Поиск..." />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {contacts.map((c) => (
                <div key={c.id} className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition group">
                  <div className="relative shrink-0">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-xs font-medium">
                      {c.avatar}
                    </div>
                    {c.online && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-primary border-2 border-card rounded-full" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">{c.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{c.status}</div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                    <button className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center hover:text-primary transition">
                      <Icon name="MessageCircle" size={13} />
                    </button>
                    <button className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center hover:text-primary transition">
                      <Icon name="Phone" size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {section === "notifications" && (
          <>
            <div className="px-4 pt-5 pb-4">
              <h2 className="text-sm font-semibold">Уведомления</h2>
            </div>
            <div className="flex-1 overflow-y-auto px-4 space-y-3">
              {[
                { icon: "MessageCircle", label: "Новое сообщение", sub: "Алексей Громов", time: "5 мин" },
                { icon: "Phone", label: "Пропущенный звонок", sub: "Дмитрий Нечаев", time: "1 ч" },
                { icon: "UserPlus", label: "Новый контакт", sub: "Марина Коваль добавила вас", time: "2 ч" },
                { icon: "MessageCircle", label: "Упоминание в группе", sub: "Команда дизайна", time: "Вчера" },
              ].map((n, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition cursor-pointer">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name={n.icon} size={14} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">{n.label}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{n.sub}</div>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">{n.time}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {section === "profile" && (
          <div className="flex-1 overflow-y-auto px-4 pt-5">
            <h2 className="text-sm font-semibold mb-4">Профиль</h2>
            <div className="flex flex-col items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-lg font-semibold">
                ИВ
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold">Иван Волков</div>
                <div className="text-xs text-muted-foreground mt-0.5">@ivolkov</div>
              </div>
              <button
                onClick={() => setProfileEdit(!profileEdit)}
                className="text-xs text-primary hover:underline"
              >
                {profileEdit ? "Сохранить" : "Редактировать"}
              </button>
            </div>
            <div className="space-y-2">
              {[
                { label: "Имя", value: "Иван Волков" },
                { label: "Username", value: "@ivolkov" },
                { label: "Телефон", value: "+7 900 000-00-00" },
                { label: "О себе", value: "Всегда на связи" },
              ].map((f) => (
                <div key={f.label} className="rounded-xl bg-muted p-3">
                  <div className="text-xs text-muted-foreground">{f.label}</div>
                  {profileEdit
                    ? <input className="bg-transparent text-sm w-full outline-none mt-1" defaultValue={f.value} />
                    : <div className="text-sm mt-1">{f.value}</div>
                  }
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {section === "chats" && activeChat ? (
          <>
            <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-xs font-medium">
                    {activeChat.avatar}
                  </div>
                  {activeChat.online && (
                    <span className="absolute bottom-0 right-0 w-2 h-2 bg-primary border-2 border-background rounded-full" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-sm font-semibold">
                    {activeChat.name}
                    {activeChat.encrypted && (
                      <Icon name="Lock" size={11} className="text-primary" />
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {activeChat.online ? "в сети" : activeChat.group ? "группа" : "не в сети"}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition">
                  <Icon name="Phone" size={15} />
                </button>
                <button className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition">
                  <Icon name="Video" size={15} />
                </button>
                <button className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition">
                  <Icon name="Search" size={15} />
                </button>
                <button className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition">
                  <Icon name="MoreVertical" size={15} />
                </button>
              </div>
            </div>

            {activeChat.encrypted && (
              <div className="flex items-center justify-center gap-1.5 py-2 bg-primary/5 text-xs text-primary border-b border-primary/10">
                <Icon name="Lock" size={11} />
                Сквозное шифрование включено
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-2 animate-fade-in">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.own ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2.5 rounded-2xl text-sm leading-relaxed
                      ${msg.own
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-card border border-border rounded-bl-sm"
                      }`}
                  >
                    {msg.text}
                    <div className={`flex items-center gap-1 mt-1 text-xs opacity-60 ${msg.own ? "justify-end" : ""}`}>
                      {msg.time}
                      {msg.own && <Icon name="CheckCheck" size={11} />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-6 py-4 border-t border-border shrink-0">
              <div className="flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3">
                <button className="text-muted-foreground hover:text-foreground transition">
                  <Icon name="Smile" size={18} />
                </button>
                <button className="text-muted-foreground hover:text-foreground transition">
                  <Icon name="Paperclip" size={18} />
                </button>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && setInput("")}
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  placeholder="Написать сообщение..."
                />
                <button
                  onClick={() => setInput("")}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all
                    ${input ? "bg-primary text-primary-foreground hover:opacity-90" : "bg-muted text-muted-foreground"}`}
                >
                  <Icon name="Send" size={14} />
                </button>
              </div>
            </div>
          </>
        ) : section === "notifications" ? (
          <div className="flex-1 flex flex-col p-8 max-w-lg animate-fade-in">
            <h2 className="text-base font-semibold mb-2">Настройки оповещений</h2>
            <p className="text-sm text-muted-foreground mb-6">Управляйте тем, как и когда вы получаете уведомления</p>
            <div className="space-y-3">
              {[
                { key: "all" as const, label: "Все уведомления", desc: "Включить или отключить все уведомления" },
                { key: "sound" as const, label: "Звук", desc: "Звуковые сигналы при новых событиях" },
                { key: "preview" as const, label: "Предпросмотр сообщений", desc: "Показывать текст в уведомлении" },
                { key: "calls" as const, label: "Уведомления о звонках", desc: "Входящие аудио и видеозвонки" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-card border border-border">
                  <div>
                    <div className="text-sm font-medium">{item.label}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{item.desc}</div>
                  </div>
                  <button
                    onClick={() => setNotifSettings(s => ({ ...s, [item.key]: !s[item.key] }))}
                    className={`w-11 h-6 rounded-full transition-all relative ${notifSettings[item.key] ? "bg-primary" : "bg-muted"}`}
                  >
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${notifSettings[item.key] ? "left-6" : "left-1"}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center animate-fade-in">
            <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-2">
              <Icon name={navItems.find(n => n.id === section)?.icon || "MessageCircle"} size={24} className="text-muted-foreground" />
            </div>
            <div className="text-sm font-medium">{navItems.find(n => n.id === section)?.label}</div>
            <div className="text-xs text-muted-foreground max-w-xs">
              Выберите элемент из списка слева для просмотра
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
