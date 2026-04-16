import Icon from "@/components/ui/icon";
import { Section, navItems, chats } from "./types";

interface SidebarNavProps {
  section: Section;
  setSection: (s: Section) => void;
}

export default function SidebarNav({ section, setSection }: SidebarNavProps) {
  return (
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
  );
}
