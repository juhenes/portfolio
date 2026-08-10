import React, { useEffect } from 'react';
import type { ProjectItem } from '../data/projectsData';
import { FiX, FiFolder } from 'react-icons/fi';
import NGIMLPreview from './projects/previews/NGIMLPreview';
import TheAvenuePreview from './projects/previews/TheAvenuePreview';
import SanGawaPreview from './projects/previews/SanGawaPreview';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
}) => {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const renderProjectPreview = () => {
    switch (project.id) {
      case 'proj-ngiml':
        return <NGIMLPreview project={project} />;
      case 'proj-the-avenue':
        return <TheAvenuePreview project={project} />;
      case 'proj-sangawa':
        return <SanGawaPreview project={project} />;
      default:
        return (
          <div className="text-xs text-neutral-300 space-y-2">
            <p>{project.description}</p>
          </div>
        );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-xl bg-neutral-950 border border-neutral-800 shadow-2xl overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-neutral-800 bg-neutral-900/60">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded bg-dx0-orange/10 text-dx0-orange border border-dx0-orange/30">
              <FiFolder className="text-base" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">
                  {project.title}
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-dx0-orange/10 text-dx0-orange border border-dx0-orange/30 font-semibold whitespace-nowrap">
                  {project.role}
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 font-mono mt-0.5">
                {project.date}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <FiX className="text-base" />
          </button>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 max-h-[calc(90vh-70px)] custom-scrollbar">
          {renderProjectPreview()}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
