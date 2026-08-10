import React from 'react';
import type { ProjectItem } from '../../../data/projectsData';
import { FiExternalLink, FiGithub, FiUsers, FiCheckCircle } from 'react-icons/fi';
import { SiAndroid, SiGooglemaps } from 'react-icons/si';
import ProjectMedia from '../ProjectMedia';

interface SanGawaPreviewProps {
  project: ProjectItem;
}

export const SanGawaPreview: React.FC<SanGawaPreviewProps> = ({ project }) => {
  const mediaSrc = project.mediaUrl || '/images/projects/san_gawa.jpg';

  return (
    <div className="space-y-5 text-neutral-200">
      <div className="relative rounded-lg overflow-hidden border border-neutral-800 bg-neutral-950 group aspect-video w-full">
        <ProjectMedia
          src={mediaSrc}
          alt="SanGawa Android App Interface Preview"
        />
        <div className="absolute bottom-3 right-3 bg-neutral-950/90 backdrop-blur-md px-3 py-1 rounded text-[11px] font-mono text-dx0-orange border border-dx0-orange/30">
          SanGawa Demonstrations
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3 rounded bg-neutral-900 border border-neutral-800 space-y-1">
          <div className="text-[11px] uppercase tracking-wider text-dx0-orange font-bold flex items-center gap-1.5">
            <SiAndroid /> Platform
          </div>
          <div className="text-xs text-white font-medium">Native Android & Java</div>
        </div>
        <div className="p-3 rounded bg-neutral-900 border border-neutral-800 space-y-1">
          <div className="text-[11px] uppercase tracking-wider text-dx0-orange font-bold flex items-center gap-1.5">
            <SiGooglemaps /> Geolocation
          </div>
          <div className="text-xs text-white font-medium">Google Maps Real-Time Pins</div>
        </div>
        <div className="p-3 rounded bg-neutral-900 border border-neutral-800 space-y-1">
          <div className="text-[11px] uppercase tracking-wider text-dx0-orange font-bold flex items-center gap-1.5">
            <FiUsers /> Collaboration
          </div>
          <div className="text-xs text-white font-medium">Firebase Chat & Task Sync</div>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-dx0-orange flex items-center gap-2">
          <FiCheckCircle /> Mobile Application Capabilities
        </h4>
        <p className="text-xs text-neutral-300 leading-relaxed">
          {project.description}
        </p>
        <ul className="space-y-1.5 text-xs text-neutral-300">
          {project.details.map((detail, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-dx0-orange mt-0.5">•</span>
              <span className="leading-relaxed">{detail}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-neutral-800">
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-[10px] px-2 py-0.5 rounded bg-neutral-900 text-neutral-300 border border-neutral-800 font-mono"
            >
              {tech}
            </span>
          ))}
        </div>
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-dx0-orange hover:underline font-semibold"
          >
            <FiGithub /> Source Code <FiExternalLink className="text-[10px]" />
          </a>
        )}
      </div>
    </div>
  );
};

export default SanGawaPreview;
