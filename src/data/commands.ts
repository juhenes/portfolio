export interface CommandDef {
  id: string;
  cmd: string;
  terminalOnly?: boolean;
  description: string;
  category: 'navigation' | 'system' | 'display' | 'utility' | 'easter-egg';
  aliases?: string[];
}

export const COMMANDS: CommandDef[] = [
  {
    id: 'help',
    cmd: 'help',
    description: 'Display available terminal commands & navigation guide',
    category: 'utility',
    aliases: ['?', 'commands', 'man'],
  },
  {
    id: 'whoami',
    cmd: 'whoami',
    description: 'Display user identity, role & summary credentials',
    category: 'system',
    aliases: ['user', 'bio', 'about-me'],
  },
  {
    id: 'fastfetch',
    cmd: 'fastfetch',
    terminalOnly: true,
    description: 'Display system specs & portfolio stats with logo',
    category: 'system',
    aliases: ['neofetch', 'fetch', 'sysinfo'],
  },
  {
    id: 'no-ui',
    cmd: 'no-ui',
    terminalOnly: true,
    description: 'Switch to full-screen terminal-only pure text mode',
    category: 'display',
    aliases: ['noui', 'cli', 'terminal-only', 'text-mode'],
  },
  {
    id: 'ui',
    cmd: 'ui',
    description: 'Return to original graphical user interface mode',
    category: 'display',
    aliases: ['gui', 'exit-terminal', 'exit', 'normal-mode'],
  },
  {
    id: 'cd',
    cmd: 'cd <section>',
    description: 'Navigate to a section (e.g. cd projects, cd skills)',
    category: 'navigation',
    aliases: ['goto', 'jump'],
  },
  {
    id: 'ls',
    cmd: 'ls',
    description: 'List portfolio virtual directories and section files',
    category: 'navigation',
    aliases: ['dir', 'list'],
  },
  {
    id: 'cat',
    cmd: 'cat <file>',
    description: 'Read and output section contents in pure text format',
    category: 'navigation',
    aliases: ['read', 'view', 'show'],
  },
  {
    id: 'open',
    cmd: 'open <section>',
    description: 'Scroll to section in UI mode or view details',
    category: 'navigation',
  },
  {
    id: 'pwd',
    cmd: 'pwd',
    description: 'Print current section location path',
    category: 'navigation',
  },
  {
    id: 'clear',
    cmd: 'clear',
    terminalOnly: true,
    description: 'Clear terminal screen history',
    category: 'utility',
    aliases: ['cls'],
  },
  {
    id: 'history',
    cmd: 'history',
    description: 'List recently executed command history',
    category: 'utility',
  },
  {
    id: 'contact',
    cmd: 'contact',
    description: 'Display email, phone, GitHub & LinkedIn links',
    category: 'system',
    aliases: ['mail', 'socials'],
  },
  {
    id: 'close',
    cmd: 'close',
    description: 'Minimize/close the terminal panel',
    category: 'utility',
    aliases: ['minimize', 'hide'],
  },
  {
    id: 'alias',
    cmd: 'alias [name=command]',
    description: 'Set or list custom command aliases (persisted to localStorage)',
    category: 'utility',
  },
  {
    id: 'unalias',
    cmd: 'unalias <name>',
    description: 'Remove a previously defined alias',
    category: 'utility',
  },
  {
    id: 'htop',
    cmd: 'htop',
    description: 'Interactive process monitor',
    category: 'easter-egg',
    aliases: ['top'],
  },
  {
    id: 'matrix',
    cmd: 'matrix',
    description: 'Enter the Matrix',
    category: 'easter-egg',
    aliases: ['neo', 'thematrix'],
  },
  {
    id: 'open_profile',
    cmd: 'open Profile',
    description: 'Scroll to Profile section',
    category: 'navigation',
  },
  {
    id: 'open_experience',
    cmd: 'open Experience',
    description: 'Scroll to Experience section',
    category: 'navigation',
  },
  {
    id: 'open_leadership',
    cmd: 'open Leadership',
    description: 'Scroll to Leadership section',
    category: 'navigation',
  },
  {
    id: 'open_projects',
    cmd: 'open Projects',
    description: 'Scroll to Projects section',
    category: 'navigation',
  },
  {
    id: 'open_awards',
    cmd: 'open Awards',
    description: 'Scroll to Awards section',
    category: 'navigation',
  },
  {
    id: 'open_certs',
    cmd: 'open Certifications',
    description: 'Scroll to Certifications section',
    category: 'navigation',
  },
  {
    id: 'open_skills',
    cmd: 'open Skills',
    description: 'Scroll to Skills section',
    category: 'navigation',
  },
  {
    id: 'open_contact',
    cmd: 'open Contact',
    description: 'Scroll to Contact section',
    category: 'navigation',
  },
];
