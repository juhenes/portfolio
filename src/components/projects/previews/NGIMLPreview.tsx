import React from 'react';
import type { ProjectItem } from '../../../data/projectsData';
import {
  FiExternalLink,
  FiGithub,
  FiCpu,
  FiLayers,
  FiCheckCircle,
} from 'react-icons/fi';
import { SiGooglecolab, SiPytorch } from 'react-icons/si';
import ProjectMedia from '../ProjectMedia';

interface NGIMLPreviewProps {
  project: ProjectItem;
}

export const NGIMLPreview: React.FC<NGIMLPreviewProps> = ({ project }) => {
  const mediaSrc = '/images/projects/ngiml.png';

  return (
    <div className="space-y-5 text-neutral-200">
      <div className="relative rounded-lg overflow-hidden border border-neutral-800 bg-neutral-950 group aspect-video w-full">
        <ProjectMedia
          src={mediaSrc}
          alt="NGIML Architecture & Detection Output"
        />
        <div className="absolute bottom-3 right-3 bg-neutral-950/90 backdrop-blur-md px-3 py-1 rounded text-[11px] font-mono text-dx0-orange border border-dx0-orange/30">
          NGIML Architecture
        </div>
      </div>

      <div className="flex flex-wrap gap-3 items-center justify-between p-3.5 rounded-lg bg-neutral-900/90 border border-neutral-800">
        <div className="space-y-0.5">
          <div className="text-xs font-semibold text-neutral-400">
            Interactive Inference
          </div>
          <div className="text-sm font-bold text-white flex items-center gap-2">
            <SiGooglecolab className="text-amber-500 text-base" /> Google Colab
            Notebook
          </div>
        </div>
        <a
          href={
            project.tryUrl ||
            'https://colab.research.google.com/github/juhenes/ngiml-infer/blob/main/infer.ipynb'
          }
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs transition-colors shadow-lg shadow-amber-500/20"
        >
          <SiGooglecolab className="text-sm" />
          <span>Try on Google Colab</span>
          <FiExternalLink className="text-xs" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3 rounded bg-neutral-900 border border-neutral-800 space-y-1">
          <div className="text-[11px] uppercase tracking-wider text-dx0-orange font-bold flex items-center gap-1.5">
            <FiCpu /> Backbone
          </div>
          <div className="text-xs text-white font-medium">
            EfficientNet-B0 + Swin
          </div>
        </div>
        <div className="p-3 rounded bg-neutral-900 border border-neutral-800 space-y-1">
          <div className="text-[11px] uppercase tracking-wider text-dx0-orange font-bold flex items-center gap-1.5">
            <FiLayers /> Noise Filtering
          </div>
          <div className="text-xs text-white font-medium">
            Steganalysis Rich Model (SRM)
          </div>
        </div>
        <div className="p-3 rounded bg-neutral-900 border border-neutral-800 space-y-1">
          <div className="text-[11px] uppercase tracking-wider text-dx0-orange font-bold flex items-center gap-1.5">
            <SiPytorch /> Framework
          </div>
          <div className="text-xs text-white font-medium">PyTorch & timm</div>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-dx0-orange flex items-center gap-2">
          <FiCheckCircle /> Architecture Overview & Highlights
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

export default NGIMLPreview;
