export interface Shortcut {
  id: string;
  label: string;
  icon?: string;
  cmd: string;
  href: string;
}

export const SHORTCUTS: Shortcut[] = [
  {
    id: 'profile',
    label: 'Profile',
    icon: '👤',
    cmd: 'open Profile',
    href: '#profile',
  },
  {
    id: 'experience',
    label: 'Experience',
    icon: '💼',
    cmd: 'open Experience',
    href: '#experience',
  },
  {
    id: 'leadership',
    label: 'Leadership',
    icon: '🛡️',
    cmd: 'open Leadership',
    href: '#leadership',
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
    id: 'skills',
    label: 'Skills',
    icon: '💻',
    cmd: 'open Skills',
    href: '#skills',
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: '✉️',
    cmd: 'open Contact',
    href: '#contact',
  },
];
