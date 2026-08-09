import { useState, useEffect, useRef, useCallback } from 'react';
import ProfileSection from './sections/ProfileSection';
import ExperienceSection from './sections/ExperienceSection';
import LeadershipSection from './sections/LeadershipSection';
import ProjectsSection from './sections/ProjectsSection';
import AwardsSection from './sections/AwardsSection';
import CertificationsSection from './sections/CertificationsSection';
import SkillsSection from './sections/SkillsSection';
import ContactSection from './sections/ContactSection';

interface MainContentProps {
  onSectionVisible?: (sectionLabel: string) => void;
}

const SECTION_IDS = [
  { id: 'profile', label: 'Profile' },
  { id: 'experience', label: 'Experience' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'projects', label: 'Projects' },
  { id: 'awards', label: 'Awards' },
  { id: 'certifications', label: 'Certs' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export default function MainContent({ onSectionVisible }: MainContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const activeLabelRef = useRef<string>('Profile');

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !onSectionVisible) return;

    const visibleMap = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleMap.set(entry.target.id, entry.intersectionRatio);
        });

        let maxRatio = -1;
        let bestLabel = 'Profile';

        for (const sec of SECTION_IDS) {
          const ratio = visibleMap.get(sec.id) || 0;
          if (ratio > maxRatio && ratio > 0.05) {
            maxRatio = ratio;
            bestLabel = sec.label;
          }
        }

        if (bestLabel !== activeLabelRef.current) {
          activeLabelRef.current = bestLabel;
          onSectionVisible(bestLabel);
        }
      },
      {
        root: container,
        rootMargin: '-5% 0px -40% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0],
      }
    );

    SECTION_IDS.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [onSectionVisible]);

  const handleCopy = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col h-full overflow-y-auto text-neutral-200 font-mono space-y-8 p-4 scroll-smooth [scrollbar-gutter:stable] pr-2"
    >
      <ProfileSection copiedField={copiedField} onCopy={handleCopy} />
      <ExperienceSection />
      <LeadershipSection />
      <ProjectsSection />
      <AwardsSection />
      <CertificationsSection />
      <SkillsSection />
      <ContactSection copiedField={copiedField} onCopy={handleCopy} />
    </div>
  );
}
