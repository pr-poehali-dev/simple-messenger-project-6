import Icon from "@/components/ui/icon";
import {
  Section, Chat, chats, calls, files, contacts, fileIcon,
} from "./types";

interface SectionPanelProps {
  section: Section;
  activeChat: Chat | null;
  setActiveChat: (chat: Chat) => void;
  profileEdit: boolean;
  setProfileEdit: (v: boolean) => void;
}

export default function SectionPanel({
  section,
  activeChat,
  setActiveChat,
  profileEdit,
  setProfileEdit,
}: SectionPanelProps) {
  return (
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
  );
}
