import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Section, Chat, messages, navItems } from "./types";

interface NotifSettings {
  all: boolean;
  sound: boolean;
  preview: boolean;
  calls: boolean;
}

interface ChatAreaProps {
  section: Section;
  activeChat: Chat | null;
  input: string;
  setInput: (v: string) => void;
  notifSettings: NotifSettings;
  setNotifSettings: (fn: (s: NotifSettings) => NotifSettings) => void;
}

export default function ChatArea({
  section,
  activeChat,
  input,
  setInput,
  notifSettings,
  setNotifSettings,
}: ChatAreaProps) {
  return (
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
  );
}
