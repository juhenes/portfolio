export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  rating?: string;
  badge?: string;
}

export const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    id: 'cert-csc',
    name: 'Civil Service Eligibility (Professional)',
    issuer: 'Civil Service Commission (CSC)',
    date: 'Professional Level',
    rating: 'Rating: 90.96',
  },
  {
    id: 'cert-cisco-jr-cyber',
    name: 'Cisco Junior Cybersecurity Analyst Career Path',
    issuer: 'Cisco Networking Academy',
    date: 'May 2026',
  },
  {
    id: 'cert-cisco-threat-mgmt',
    name: 'Cisco Cyber Threat Management',
    issuer: 'Cisco Networking Academy',
    date: 'May 2026',
  },
  {
    id: 'cert-cisco-intro-cyber',
    name: 'Cisco Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    date: 'Feb 2026',
  },
  {
    id: 'cert-cisco-hw-basics',
    name: 'Cisco Computer Hardware Basics',
    issuer: 'Cisco Networking Academy',
    date: 'Jul 2024',
  },
  {
    id: 'cert-cisco-ccna-intro',
    name: 'Cisco CCNA: Introduction to Networks',
    issuer: 'Cisco Networking Academy',
    date: 'Jan 2024',
  },
];
