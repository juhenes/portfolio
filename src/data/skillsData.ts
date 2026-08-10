export interface SkillCategory {
  id: string;
  category: string;
  iconName: string;
  skills: string[];
}

export const SKILL_CATEGORIES_DATA: SkillCategory[] = [
  {
    id: 'skill-languages',
    category: 'Languages',
    iconName: 'code',
    skills: ['C#', 'Python', 'Java', 'JavaScript', 'PHP', 'Dart'],
  },
  {
    id: 'skill-frameworks',
    category: 'Frameworks & Platforms',
    iconName: 'layers',
    skills: [
      'Laravel',
      'React',
      'FastAPI',
      'Flask',
      'Express.js',
      'ASP.NET',
      'Android (Java)',
      'Flutter',
      'WinForms',
    ],
  },
  {
    id: 'skill-ai',
    category: 'AI & Machine Learning',
    iconName: 'cpu',
    skills: [
      'PyTorch',
      'Swin Transformer',
      'EfficientNet',
      'CNN Architectures',
      'timm Framework',
      'Google Gemini API',
      'Image Forgery Localization',
    ],
  },
  {
    id: 'skill-gamedev',
    category: 'Game Development & Engines',
    iconName: 'gamepad',
    skills: [
      'Unity2D',
      'Godot',
      'C# (Unity)',
      'Sprite Animation',
      'Game State Architecture',
    ],
  },
  {
    id: 'skill-hardware',
    category: 'Hardware & Homelab Infrastructure',
    iconName: 'server',
    skills: [
      'Raspberry Pi (RPi Homelab)',
      'Docker & Containerization',
      'Tailscale Mesh VPN',
      'Cloudflare Tunnels',
      'playit.gg Tunneling',
      'Nextcloud Self-Hosting',
      'NeoForge Minecraft Server Mgmt',
    ],
  },
  {
    id: 'skill-security',
    category: 'Cybersecurity & Digital Forensics',
    iconName: 'shield',
    skills: [
      'Wireshark',
      'SleuthKit',
      'File Signature Analysis',
      'Steganography',
      'Log Analysis',
      'Vulnerability Assessment',
    ],
  },
  {
    id: 'skill-databases',
    category: 'Databases',
    iconName: 'database',
    skills: ['PostgreSQL', 'MySQL', 'SQLite', 'Firebase', 'MongoDB'],
  },
  {
    id: 'skill-tools',
    category: 'Tools & DevOps',
    iconName: 'terminal',
    skills: ['Git', 'Linux', 'CI/CD', 'REST APIs', 'Postman', 'Webpack'],
  },
  {
    id: 'skill-design',
    category: 'Design & Productivity',
    iconName: 'figma',
    skills: [
      'Figma',
      'Adobe Creative Suite',
      'Canva',
      'ProPresenter',
      'Microsoft Office',
    ],
  },
  {
    id: 'skill-concepts',
    category: 'Core Concepts & Architecture',
    iconName: 'cpu',
    skills: [
      'OOP',
      'MVC Structure',
      'Software Testing',
      'Agile Development',
      'UI/UX Design',
      'HCI',
      'Secure SDLC',
      'Real-Time Systems',
    ],
  },
];
