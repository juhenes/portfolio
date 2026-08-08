export interface CommandDef {
  id: string;
  cmd: string;
  terminalOnly?: boolean;
  description?: string;
}

export const COMMANDS: CommandDef[] = [
  {
    id: 'open_about',
    cmd: 'open About',
    terminalOnly: false,
    description:
      'Open About module (Personal Info, Education, Experience, Skills)',
  },
  {
    id: 'open_projects',
    cmd: 'open Projects',
    terminalOnly: false,
    description: 'Open Projects module (Key Development Projects)',
  },
  {
    id: 'open_awards',
    cmd: 'open Awards',
    terminalOnly: false,
    description: 'Open Awards module (CTF & Competitive Programming Honors)',
  },
  {
    id: 'open_certs',
    cmd: 'open Certifications',
    terminalOnly: false,
    description: 'Open Certifications & Licenses module',
  },
  {
    id: 'open_contact',
    cmd: 'open Contact',
    terminalOnly: false,
    description: 'Open Contact module',
  },
  {
    id: 'fastfetch',
    cmd: 'fastfetch',
    terminalOnly: true,
    description: 'Quick system info (terminal-only)',
  },
  {
    id: 'clear',
    cmd: 'clear',
    terminalOnly: true,
    description: 'Clear terminal history',
  },
];
