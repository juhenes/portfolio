import { useState, useEffect, useRef } from 'react';
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

export default function MainContent({ onSectionVisible }: MainContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !onSectionVisible) return;

    const sectionIds = [
      { id: 'profile', label: 'Profile' },
      { id: 'experience', label: 'Experience' },
      { id: 'leadership', label: 'Leadership' },
      { id: 'projects', label: 'Projects' },
      { id: 'awards', label: 'Awards' },
      { id: 'certifications', label: 'Certs' },
      { id: 'skills', label: 'Skills' },
      { id: 'contact', label: 'Contact' },
    ];

    const handleScroll = () => {
      const containerTop = container.getBoundingClientRect().top;
      let currentLabel = 'Profile';

      for (const sec of sectionIds) {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top - containerTop <= 140) {
            currentLabel = sec.label;
          }
        }
      }

      onSectionVisible(currentLabel);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [onSectionVisible]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col h-full overflow-y-auto text-neutral-200 font-mono space-y-8 pr-1 scroll-smooth"
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
