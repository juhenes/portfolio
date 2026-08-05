export interface Shortcut {
  id: string;
  label: string;
  icon?: string;
  cmd: string;
}

export const SHORTCUTS: Shortcut[] = [
  { id: "about", label: "About", icon: "/favicon.svg", cmd: "open About" },
  { id: "projects", label: "Projects", icon: "🗂️", cmd: "open Projects" },
  { id: "contact", label: "Contact", icon: "✉️", cmd: "open Contact" },
];
