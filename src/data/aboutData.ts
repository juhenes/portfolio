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


