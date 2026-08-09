import type { IconType } from 'react-icons';
import {
  FiTerminal,
  FiBriefcase,
  FiUserCheck,
  FiFolder,
  FiAward,
  FiShield,
  FiCode,
  FiMail,
} from 'react-icons/fi';

export interface Shortcut {
  id: string;
  label: string;
  Icon: IconType;
  cmd: string;
  href: string;
}

export const SHORTCUTS: Shortcut[] = [
  {
    id: 'profile',
    label: 'Profile',
    Icon: FiTerminal,
    cmd: 'open Profile',
    href: '#profile',
  },
  {
    id: 'experience',
    label: 'Experience',
    Icon: FiBriefcase,
    cmd: 'open Experience',
    href: '#experience',
  },
  {
    id: 'leadership',
    label: 'Leadership',
    Icon: FiUserCheck,
    cmd: 'open Leadership',
    href: '#leadership',
  },
  {
    id: 'projects',
    label: 'Projects',
    Icon: FiFolder,
    cmd: 'open Projects',
    href: '#projects',
  },
  {
    id: 'awards',
    label: 'Awards',
    Icon: FiAward,
    cmd: 'open Awards',
    href: '#awards',
  },
  {
    id: 'certifications',
    label: 'Certs',
    Icon: FiShield,
    cmd: 'open Certifications',
    href: '#certifications',
  },
  {
    id: 'skills',
    label: 'Skills',
    Icon: FiCode,
    cmd: 'open Skills',
    href: '#skills',
  },
  {
    id: 'contact',
    label: 'Contact',
    Icon: FiMail,
    cmd: 'open Contact',
    href: '#contact',
  },
];
