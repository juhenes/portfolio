export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  leetcode: string;
  ctftime: string;
  summary: string;
  gwa: string;
  cseRating?: string;
  honors: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  period: string;
  location?: string;
  honors: string[];
  details?: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  type: 'Internship' | 'Freelance' | 'Full-time' | 'Part-time';
  description: string[];
  technologies: string[];
}

export interface SkillCategory {
  id: string;
  category: string;
  iconName: string;
  skills: string[];
}

export interface LeadershipItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  description?: string;
}

export const PERSONAL_INFO: PersonalInfo = {
  name: 'Deogenes Gregorio S. Maranan',
  title: 'Software Developer, Game Developer & Cybersecurity Specialist',
  location: 'Diliman, Quezon City',
  phone: '+63968-497-0419',
  email: 'maranandeogenes@gmail.com',
  linkedin: 'linkedin.com/in/deogenesmaranan',
  github: 'github.com/juhenes',
  leetcode: 'leetcode.com/Juhenes',
  ctftime: 'ctftime.org/user/194539',
  summary:
    'DOST JLSS Scholar and Cum Laude Computer Science graduate with expertise in web application development, game development (Unity2D, Godot), AI & machine learning frameworks (PyTorch, Gemini API), homelab infrastructure, cybersecurity, and competitive programming. Skilled in building responsive software systems, self-hosting homelab environments (Raspberry Pi, Docker, Tailscale, Cloudflare Tunnels, NeoForge Minecraft servers), and digital forensics.',
  gwa: '1.4643',
  cseRating: '90.96%',
  honors: [
    'Civil Service Professional Eligible (90.96% Rating)',
    'DOST JLSS Scholar',
    'Cum Laude (GWA: 1.4643 / 3.57 out of 4.00)',
    'Top 3 Philippines on CTFtime (2025)',
  ],
};

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: 'edu-batstateu',
    institution:
      'Batangas State University – The National Engineering University',
    degree: 'Bachelor of Science in Computer Science',
    period: '2022 – 2026',
    honors: [
      'ABET Accredited Program (CAC of ABET)',
      'DOST JLSS Scholar (Junior Level Science Scholarship)',
      'Cum Laude (GWA: 1.4643 / 3.57 out of 4.00)',
    ],
    details: [
      'BS Computer Science program accredited by the Computing Accreditation Commission (CAC) of ABET',
      'Maintained high academic standard with GWA of 1.4643 (3.57/4.00) (Cum Laude honors)',
      'Awarded prestigious DOST JLSS Scholarship for STEM excellence',
    ],
  },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'exp-freelance',
    role: 'Freelance Software Developer',
    company: 'Self-Employed / Independent Contracts',
    period: '2025 – Present',
    type: 'Freelance',
    description: [
      'Developed and maintained custom web applications tailored to specific client requirements using FastAPI, Laravel, PHP, and JavaScript.',
      'Implemented core features, resolved critical bugs, optimized performance, and supported cloud deployment.',
    ],
    technologies: [
      'FastAPI',
      'Laravel',
      'PHP',
      'JavaScript',
      'Python',
      'PostgreSQL',
      'Docker',
    ],
  },
  {
    id: 'exp-caist',
    role: 'Frontend Developer / UI/UX Designer',
    company:
      'Center for AI and Smart Technologies (CAIST) – Batangas State University',
    period: '2025',
    type: 'Internship',
    description: [
      'Developed responsive Laravel interfaces using Filament, Livewire, and Alpine.js.',
      'Built reactive UI components and supported feature development and system maintenance for AI & Smart Tech projects.',
    ],
    technologies: [
      'Laravel',
      'Filament',
      'Livewire',
      'Alpine.js',
      'PHP',
      'TailwindCSS',
    ],
  },
  {
    id: 'exp-gocreate',
    role: 'Multimedia Specialist',
    company: 'GoCreate – Multimedia Ministry of The Avenue Village',
    period: '2022',
    type: 'Part-time',
    description: [
      'Edited promotional and event videos, designed publicity materials (pubmats), and created presentation decks (PPTs).',
      'Operated and managed live projection software (ProPresenter) and media displays for live services and events.',
    ],
    technologies: [
      'ProPresenter',
      'Video Editing',
      'Graphic Design (Pubmats)',
      'Presentation Design',
      'Live Production',
    ],
  },
  {
    id: 'exp-portrait-artist',
    role: 'Portrait Artist',
    company: 'Self-Employed / Independent Commissions',
    period: '2020 – 2022',
    type: 'Freelance',
    description: [
      'Created custom traditional and digital portraits for clients based on commissioned requests.',
      'Delivered detailed, high-quality artwork with attention to composition, shading, and likeness while handling client orders.',
    ],
    technologies: [
      'Digital Art',
      'Traditional Media',
      'Portraiture',
      'Graphic Art',
    ],
  },
];

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
    skills: ['Unity2D', 'Godot', 'C# (Unity)', 'Sprite Animation', 'Game State Architecture'],
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
    skills: ['Figma', 'Adobe Creative Suite', 'Canva', 'ProPresenter', 'Microsoft Office'],
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

export const LEADERSHIP_DATA: LeadershipItem[] = [
  {
    id: 'lead-lgtm-cofounder',
    role: 'Co-Founder',
    organization: 'Looks Good To Me (LGTM) Community',
    period: '2025 – Present',
    description:
      'Co-founded an independent tech community for BatStateU CS/IT students & alumni, organizing technical workshops, projects, and recreational events.',
  },
  {
    id: 'lead-tf-2025',
    role: 'Co-Head and Challenge Author',
    organization: 'TechnoFusion Capture the Flag Challenge',
    period: 'Apr 2025',
    description:
      'Designed cybersecurity CTF challenges and co-led event orchestration for participants.',
  },
  {
    id: 'lead-script-2024',
    role: 'Head of Cyber Security',
    organization:
      'Student Coders for Resourceful and Innovative Programming Techniques (SCRIPT)',
    period: 'AY 2024 – 2025',
    description:
      'Led cybersecurity workshops, CTF training, and technical mentorship for student developers.',
  },
];
