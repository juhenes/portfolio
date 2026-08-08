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
    icon: '👤',
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
    id: 'awards',
    label: 'Awards',
    icon: '🏆',
    cmd: 'open Awards',
    href: '#awards',
  },
  {
    id: 'certifications',
    label: 'Certs',
    icon: '📜',
    cmd: 'open Certifications',
    href: '#certifications',
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: '✉️',
    cmd: 'open Contact',
    href: '#contact',
  },
];
