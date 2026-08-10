export interface LeadershipItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  description?: string;
}

export const LEADERSHIP_DATA: LeadershipItem[] = [
  {
    id: 'lead-lgtm-cofounder',
    role: 'Co-Founder',
    organization: 'Looks Good To Me (LGTM) Community',
    period: '2026 – Present',
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
