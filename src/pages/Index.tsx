import { useState } from "react";
import { Section, Chat, chats } from "@/components/messenger/types";
import SidebarNav from "@/components/messenger/SidebarNav";
import SectionPanel from "@/components/messenger/SectionPanel";
import ChatArea from "@/components/messenger/ChatArea";

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
      <SidebarNav section={section} setSection={setSection} />
      <SectionPanel
        section={section}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        profileEdit={profileEdit}
        setProfileEdit={setProfileEdit}
      />
      <ChatArea
        section={section}
        activeChat={activeChat}
        input={input}
        setInput={setInput}
        notifSettings={notifSettings}
        setNotifSettings={setNotifSettings}
      />
    </div>
  );
}
