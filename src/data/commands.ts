export interface CommandDef {
  id: string;
  cmd: string;
  terminalOnly?: boolean;
  description?: string;
}

export const COMMANDS: CommandDef[] = [
  {
    id: 'open_profile',
    cmd: 'open Profile',
    terminalOnly: false,
    description: 'Scroll to Profile top section',
  },
  {
    id: 'open_experience',
    cmd: 'open Experience',
    terminalOnly: false,
    description: 'Scroll to Experience section',
  },
  {
    id: 'open_leadership',
    cmd: 'open Leadership',
    terminalOnly: false,
    description: 'Scroll to Leadership section',
  },
  {
    id: 'open_projects',
    cmd: 'open Projects',
    terminalOnly: false,
    description: 'Scroll to Projects section',
  },
  {
    id: 'open_awards',
    cmd: 'open Awards',
    terminalOnly: false,
    description: 'Scroll to Awards section',
  },
  {
    id: 'open_certs',
    cmd: 'open Certifications',
    terminalOnly: false,
    description: 'Scroll to Certifications section',
  },
  {
    id: 'open_skills',
    cmd: 'open Skills',
    terminalOnly: false,
    description: 'Scroll to Skills section',
  },
  {
    id: 'open_contact',
    cmd: 'open Contact',
    terminalOnly: false,
    description: 'Scroll to Contact section',
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
