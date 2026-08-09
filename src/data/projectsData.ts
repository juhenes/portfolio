export interface ProjectItem {
  id: string;
  title: string;
  role: string;
  technologies: string[];
  description: string;
  details: string[];
  date: string;
  githubUrl?: string;
  featured?: boolean;
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'proj-the-avenue',
    title: 'The Avenue',
    role: 'Sole Developer',
    date: 'Jun 2026 – Jul 2026',
    technologies: [
      'Flutter',
      'Dart',
      'Firebase',
      'Firebase Cloud Messaging (FCM)',
    ],
    description:
      'Cross-platform Flutter application for church event and birthday reminders featuring real-time FCM notifications.',
    details: [
      'Developed a cross-platform Flutter application for web and mobile devices.',
      'Designed a reminder system for church events, birthdays, and other important dates.',
      'Integrated Firebase for data storage, synchronization, and backend services.',
      'Implemented real-time notifications and reminders to keep users informed of upcoming events and celebrations.',
      'Built the application as an initial prototype for a future church management system.',
    ],
    githubUrl: 'https://github.com/juhenes/the_avenue',
    featured: true,
  },
  {
    id: 'proj-ngiml',
    title: 'Noise Guided Image Manipulation Localization (NGIML)',
    role: 'Sole Developer',
    date: 'Dec 2025 – Apr 2026',
    technologies: ['Python', 'PyTorch', 'timm', 'Pandas', 'NumPy'],
    description:
      'Hybrid CNN-Transformer framework for image forgery localization using EfficientNet-B0, Swin Transformer, and forensic noise features.',
    details: [
      'Developed a hybrid CNN-Transformer neural network architecture for pixel-level image forgery localization.',
      'Combined EfficientNet-B0 and Swin Transformer backbones to extract both local low-level and global semantic features.',
      'Integrated Steganalysis Rich Model (SRM) forensic noise filters to detect high-frequency manipulation artifacts.',
      'Evaluated model performance using PyTorch and timm frameworks across standard image forensics benchmark datasets.',
    ],
    githubUrl: 'https://github.com/juhenes/ngiml',
    featured: true,
  },
  {
    id: 'proj-chatmirage',
    title: 'ChatMirage',
    role: 'Sole Developer',
    date: 'Nov 2025 – Dec 2025',
    technologies: [
      'Node.js',
      'Express.js',
      'Socket.io',
      'JavaScript',
      'Tailwind CSS',
      'Google Gemini API',
    ],
    description:
      'Real-time anonymous chat application pairing users with human participants or AI personas powered by Google Gemini API.',
    details: [
      'Developed a real-time anonymous chat application that paired users with either human participants or AI personas.',
      'Integrated Google Gemini API to generate lightweight, randomized AI personalities and conversational responses.',
      'Implemented Socket.io-based matchmaking, messaging, typing indicators, session handling, and AI fallback.',
      'Built a Turing-test-style guessing system that tracked Human vs. AI predictions using confusion-matrix statistics.',
    ],
    githubUrl: 'https://github.com/juhenes/ChatMirage',
    featured: true,
  },
  {
    id: 'proj-calcclash',
    title: 'CalcClash',
    role: 'Sole Developer',
    date: 'Jan 2025 – Apr 2025',
    technologies: ['C#', 'Unity2D'],
    description:
      'Mobile math-based card game with custom game mechanics, interactive animations, and responsive UI/UX design.',
    details: [
      'Developed a mobile math-based 2D card battle game in Unity with custom game mechanics and animation state machines.',
      'Engineered interactive math puzzles, dynamic card deck management, and smooth touch-based UI/UX controls.',
      'Implemented responsive UI scaling and mobile performance optimizations across various device resolutions.',
    ],
    githubUrl: 'https://github.com/juhenes/CalcClash',
    featured: true,
  },
  {
    id: 'proj-sangawa',
    title: 'SanGawa',
    role: 'Full Stack Contributor',
    date: 'Sep 2024 – Dec 2024',
    technologies: ['Java', 'Firebase', 'Google APIs', 'Android'],
    description:
      'Android task management app featuring real-time geolocation tracking, collaborative task lists, and live chat messaging.',
    details: [
      'Contributed to an Android task management mobile application built with Java and Firebase backend services.',
      'Integrated real-time geolocation tracking using Google Maps API for location-aware task coordination.',
      'Implemented collaborative task list sharing, user authentication, and real-time chat messaging.',
    ],
    githubUrl: 'https://github.com/juhenes/SanGawa',
    featured: true,
  },
  {
    id: 'proj-kainmunity',
    title: 'Kainmunity',
    role: 'Full Stack Developer',
    date: 'Feb 2024 – May 2024',
    technologies: ['C#', 'ASP.NET', 'WinForms', 'MySQL', 'Aiven'],
    description:
      'Desktop application for food waste reduction and resource coordination utilizing cloud database integration with Aiven MySQL.',
    details: [
      'Developed a desktop application using C# ASP.NET and WinForms for food waste reduction and resource sharing.',
      'Integrated cloud database persistence using Aiven MySQL for real-time inventory tracking and coordination.',
      'Implemented donor-recipient matching workflows, user account management, and automated resource summary reports.',
    ],
    githubUrl: 'https://github.com/juhenes/KAINmunity',
    featured: true,
  },
];
