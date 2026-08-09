export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  rating?: string;
  badge?: string;
  credlyUrl?: string;
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
    id: 'cert-asean-dse-2026',
    name: 'ASEAN Data Science Explorers Enablement (SAP Analytics Cloud & SAP Build Apps)',
    issuer: 'ASEAN Foundation, SAP Southeast Asia & Break the Fake Movement',
    date: 'Aug 2026',
  },
  {
    id: 'cert-cisco-jr-cyber',
    name: 'Cisco Junior Cybersecurity Analyst Career Path',
    issuer: 'Cisco Networking Academy',
    date: 'May 2026',
    credlyUrl: 'https://www.credly.com/users/deogenes-gregorio-maranan/badges',
  },
  {
    id: 'cert-cisco-threat-mgmt',
    name: 'Cisco Cyber Threat Management',
    issuer: 'Cisco Networking Academy',
    date: 'May 2026',
    credlyUrl: 'https://www.credly.com/users/deogenes-gregorio-maranan/badges',
  },
  {
    id: 'cert-cisco-intro-cyber',
    name: 'Cisco Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    date: 'Feb 2026',
    credlyUrl: 'https://www.credly.com/users/deogenes-gregorio-maranan/badges',
  },
  {
    id: 'cert-cisco-hw-basics',
    name: 'Cisco Computer Hardware Basics',
    issuer: 'Cisco Networking Academy',
    date: 'Jul 2024',
    credlyUrl: 'https://www.credly.com/users/deogenes-gregorio-maranan/badges',
  },
  {
    id: 'cert-cisco-ccna-intro',
    name: 'Cisco CCNA: Introduction to Networks',
    issuer: 'Cisco Networking Academy',
    date: 'Jan 2024',
    credlyUrl: 'https://www.credly.com/users/deogenes-gregorio-maranan/badges',
  },
];
