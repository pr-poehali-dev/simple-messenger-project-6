export type Section = "chats" | "calls" | "files" | "contacts" | "notifications" | "profile";

export interface Chat {
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

export interface Call {
  id: number;
  name: string;
  type: "audio" | "video";
  direction: "incoming" | "outgoing" | "missed";
  time: string;
  avatar: string;
}

export interface FileItem {
  id: number;
  name: string;
  size: string;
  from: string;
  date: string;
  type: "doc" | "image" | "audio" | "zip";
}

export interface Contact {
  id: number;
  name: string;
  status: string;
  online: boolean;
  avatar: string;
}

export interface Message {
  id: number;
  text: string;
  own: boolean;
  time: string;
}

export const navItems = [
  { id: "chats" as Section, icon: "MessageCircle", label: "Чаты" },
  { id: "calls" as Section, icon: "Phone", label: "Звонки" },
  { id: "files" as Section, icon: "Paperclip", label: "Файлы" },
  { id: "contacts" as Section, icon: "Users", label: "Контакты" },
  { id: "notifications" as Section, icon: "Bell", label: "Уведомления" },
  { id: "profile" as Section, icon: "User", label: "Профиль" },
];

export const fileIcon: Record<FileItem["type"], string> = {
  doc: "FileText",
  image: "Image",
  audio: "Music",
  zip: "Archive",
};

export const chats: Chat[] = [
  { id: 1, name: "Алексей Громов", last: "Увидимся завтра, окей?", time: "14:32", unread: 2, online: true, encrypted: true, avatar: "АГ" },
  { id: 2, name: "Команда дизайна", last: "Марина: макеты готовы", time: "13:10", unread: 5, group: true, avatar: "КД" },
  { id: 3, name: "Ольга Федосеева", last: "Спасибо большое!", time: "11:55", online: false, encrypted: true, avatar: "ОФ" },
  { id: 4, name: "Проект Альфа", last: "Вы: отправил документы", time: "Вчера", group: true, avatar: "ПА" },
  { id: 5, name: "Дмитрий Нечаев", last: "Позвоню после обеда", time: "Вчера", online: true, encrypted: true, avatar: "ДН" },
  { id: 6, name: "Маркетинг", last: "Игорь: отчёт прикреплён", time: "Пн", group: true, avatar: "МК" },
  { id: 7, name: "Светлана Бойко", last: "Всё отлично, жду звонка", time: "Пн", encrypted: true, avatar: "СБ" },
];

export const calls: Call[] = [
  { id: 1, name: "Алексей Громов", type: "video", direction: "incoming", time: "Сегодня, 14:10", avatar: "АГ" },
  { id: 2, name: "Ольга Федосеева", type: "audio", direction: "outgoing", time: "Сегодня, 11:30", avatar: "ОФ" },
  { id: 3, name: "Дмитрий Нечаев", type: "audio", direction: "missed", time: "Вчера, 19:45", avatar: "ДН" },
  { id: 4, name: "Светлана Бойко", type: "video", direction: "incoming", time: "Вчера, 16:00", avatar: "СБ" },
  { id: 5, name: "Алексей Громов", type: "audio", direction: "outgoing", time: "Пн, 10:15", avatar: "АГ" },
];

export const files: FileItem[] = [
  { id: 1, name: "Презентация_Q2.pdf", size: "4.2 МБ", from: "Алексей Громов", date: "Сегодня", type: "doc" },
  { id: 2, name: "Фото_встреча.jpg", size: "1.8 МБ", from: "Команда дизайна", date: "Вчера", type: "image" },
  { id: 3, name: "Голосовое_сообщение.mp3", size: "0.6 МБ", from: "Ольга Федосеева", date: "Вчера", type: "audio" },
  { id: 4, name: "Архив_проекта.zip", size: "18.4 МБ", from: "Проект Альфа", date: "Пн", type: "zip" },
  { id: 5, name: "Техзадание_v3.docx", size: "2.1 МБ", from: "Маркетинг", date: "Пн", type: "doc" },
];

export const contacts: Contact[] = [
  { id: 1, name: "Алексей Громов", status: "На связи", online: true, avatar: "АГ" },
  { id: 2, name: "Дмитрий Нечаев", status: "Был(а) 10 минут назад", online: false, avatar: "ДН" },
  { id: 3, name: "Ольга Федосеева", status: "Не беспокоить", online: false, avatar: "ОФ" },
  { id: 4, name: "Светлана Бойко", status: "На связи", online: true, avatar: "СБ" },
  { id: 5, name: "Игорь Смирнов", status: "Был(а) час назад", online: false, avatar: "ИС" },
  { id: 6, name: "Марина Коваль", status: "На связи", online: true, avatar: "МК" },
];

export const messages: Message[] = [
  { id: 1, text: "Привет! Как дела с проектом?", own: false, time: "14:20" },
  { id: 2, text: "Всё идёт по плану. Сегодня закрыли последний баг.", own: true, time: "14:22" },
  { id: 3, text: "Отлично! Презентация готова?", own: false, time: "14:24" },
  { id: 4, text: "Да, уже отправил на твою почту. Проверь.", own: true, time: "14:25" },
  { id: 5, text: "Получил, смотрю. Выглядит хорошо!", own: false, time: "14:28" },
  { id: 6, text: "Увидимся завтра, окей?", own: false, time: "14:32" },
];
