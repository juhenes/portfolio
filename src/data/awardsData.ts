export interface AchievementItem {
  id: string;
  title: string;
  event: string;
  organizer: string;
  category: 'Cyber Security' | 'Competitive Programming' | 'Quiz Bee';
  date: string;
  rank?: string;
}

export const AWARDS_DATA: AchievementItem[] = [
  {
    id: 'ach-tf-2026',
    title: '2nd Place',
    event: 'Technofusion CTF Challenge',
    organizer: 'Batangas State University TNEU',
    category: 'Cyber Security',
    date: 'Apr 2026',
    rank: '2nd Place',
  },
  {
    id: 'ach-lactf-2026',
    title: 'Placed 82nd / 955',
    event: 'LA CTF 2026',
    organizer: 'University of California, Los Angeles',
    category: 'Cyber Security',
    date: 'Feb 2026',
    rank: '82nd / 955',
  },
  {
    id: 'ach-kctf-2026',
    title: 'Placed 45th / 890',
    event: 'KnightCTF 2026',
    organizer: 'Knight Squad',
    category: 'Cyber Security',
    date: 'Jan 2026',
    rank: '45th / 890',
  },
  {
    id: 'ach-uoftctf-2026',
    title: 'Placed 75th / 1550',
    event: 'UofTCTF 2026',
    organizer: 'University of Toronto',
    category: 'Cyber Security',
    date: 'Jan 2026',
    rank: '75th / 1550',
  },
  {
    id: 'ach-codechum-s3-2025',
    title: '2nd Place, Group Stage 3',
    event: 'CodeChum National Programming Challenge',
    organizer: 'CodeChum',
    category: 'Competitive Programming',
    date: 'Dec 2025',
    rank: '2nd Place (Stage 3)',
  },
  {
    id: 'ach-buckeyectf-2025',
    title: 'Placed 25th / 715',
    event: 'BuckeyeCTF 2025',
    organizer: 'The Ohio State University',
    category: 'Cyber Security',
    date: 'Nov 2025',
    rank: '25th / 715',
  },
  {
    id: 'ach-v1tctf-2025',
    title: 'Placed 29th / 1237',
    event: 'V1t CTF 2025',
    organizer: 'V1t',
    category: 'Cyber Security',
    date: 'Oct 2025',
    rank: '29th / 1237',
  },
  {
    id: 'ach-deadface-2025',
    title: 'Placed 48th / 787',
    event: 'DEADFACE CTF 2025',
    organizer: 'Cyber Hacktics',
    category: 'Cyber Security',
    date: 'Oct 2025',
    rank: '48th / 787',
  },
  {
    id: 'ach-codechum-gf-2024',
    title: '5th Place, Grand Finals',
    event: 'CodeChum National Programming Challenge',
    organizer: 'CodeChum',
    category: 'Competitive Programming',
    date: 'Dec 2024',
    rank: '5th Place (Grand Finals)',
  },
  {
    id: 'ach-codechum-s2-2024',
    title: '2nd Place, Group Stage 2',
    event: 'CodeChum National Programming Challenge',
    organizer: 'CodeChum',
    category: 'Competitive Programming',
    date: 'Oct 2024',
    rank: '2nd Place (Stage 2)',
  },
  {
    id: 'ach-ironctf-2024',
    title: 'Placed 39th / 1033',
    event: 'IronCTF',
    organizer: '1nf1n1ty and SASTRA University',
    category: 'Cyber Security',
    date: 'Oct 2024',
    rank: '39th / 1033',
  },
  {
    id: 'ach-patriotctf-2024',
    title: 'Placed 62nd / 1360',
    event: 'PatriotCTF',
    organizer: 'George Mason University',
    category: 'Cyber Security',
    date: 'Sept 2024',
    rank: '62nd / 1360',
  },
  {
    id: 'ach-palasscpan-2024',
    title: 'Grand Finalist',
    event: 'PalaSSCpan Quiz Bee',
    organizer: 'World Engineering Day, Batangas State University TNEU',
    category: 'Quiz Bee',
    date: 'AY 2023-2024',
    rank: 'Grand Finalist',
  },
];
