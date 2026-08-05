export interface Shortcut {
  id: string;
  label: string;
  icon?: string;
  cmd: string;
  href: string;
}

export const SHORTCUTS: Shortcut[] = [
  {
    id: 'about',
    label: 'About',
    icon: '/favicon.svg',
    cmd: 'open About',
    href: '#about',
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: '🗂️',
    cmd: 'open Projects',
    href: '#projects',
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: '✉️',
    cmd: 'open Contact',
    href: '#contact',
  },
];
