export interface ProjectItem {
  id: string;
  title: string;
  role: string;
  technologies: string[];
  description: string;
  githubUrl?: string;
  featured?: boolean;
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'proj-ngiml',
    title: 'Noise Guided Image Manipulation Localization (NGIML)',
    role: 'Sole Developer',
    technologies: ['Python', 'PyTorch', 'timm', 'Pandas', 'NumPy'],
    description:
      'Hybrid CNN-Transformer framework for image forgery localization using EfficientNet-B0, Swin Transformer, and forensic noise features.',
    githubUrl: 'https://github.com/juhenes',
    featured: true,
  },
  {
    id: 'proj-calcclash',
    title: 'CalcClash',
    role: 'Sole Developer',
    technologies: ['C#', 'Unity2D'],
    description:
      'Mobile math-based card game with custom game mechanics, interactive animations, and responsive UI/UX design.',
    githubUrl: 'https://github.com/juhenes',
    featured: true,
  },
  {
    id: 'proj-kainmunity',
    title: 'Kainmunity',
    role: 'Full Stack Developer',
    technologies: ['C#', 'ASP.NET', 'WinForms', 'MySQL', 'Aiven'],
    description:
      'Desktop application for food waste reduction and resource coordination utilizing cloud database integration with Aiven MySQL.',
    githubUrl: 'https://github.com/juhenes',
    featured: true,
  },
  {
    id: 'proj-sangawa',
    title: 'SanGawa',
    role: 'Full Stack Contributor',
    technologies: ['Java', 'Firebase', 'Google APIs', 'Android'],
    description:
      'Android task management app featuring real-time geolocation tracking, collaborative task lists, and live chat messaging.',
    githubUrl: 'https://github.com/juhenes',
    featured: true,
  },
];
