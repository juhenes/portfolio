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

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'exp-freelance',
    role: 'Freelance Software Developer',
    company: 'Self-Employed / Independent Contracts',
    period: '2025 – Present',
    type: 'Freelance',
    description: [
      'Developed and maintained custom software solutions for business modernization, internal tools, and academic capstone projects using FastAPI, Laravel, PHP, and JavaScript.',
      'Translated client requirements into application features, workflows, and user interfaces across frontend and backend systems.',
      'Implemented new features, resolved bugs, optimized application performance, and supported deployment and maintenance.',
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
      'Collaborated with a cross-functional team of 15 interns, coordinating tasks, communication, and peer mentoring to deliver features on schedule.',
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
