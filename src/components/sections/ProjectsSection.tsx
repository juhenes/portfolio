import { useState, useMemo, memo } from 'react';
import { PROJECTS_DATA } from '../../data/projectsData';
import type { ProjectItem } from '../../data/projectsData';
import { CONTACT_DATA } from '../../data/contactData';
import {
  FiFolder,
  FiGithub,
  FiExternalLink,
  FiSearch,
} from 'react-icons/fi';
import ProjectModal from '../ProjectModal';

function ProjectsSection() {
  const [projectSearchQuery, setProjectSearchQuery] = useState<string>('');
  const [activeModalProject, setActiveModalProject] =
    useState<ProjectItem | null>(null);

  const previewableProjectIds = useMemo(
    () => new Set(['proj-the-avenue', 'proj-ngiml', 'proj-sangawa']),
    []
  );

  const filteredProjects = useMemo(() => {
    let result = PROJECTS_DATA;
    if (projectSearchQuery.trim()) {
      const q = projectSearchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.role.toLowerCase().includes(q) ||
          p.technologies.some((t) => t.toLowerCase().includes(q))
      );
    }
    return result;
  }, [projectSearchQuery]);

  return (
    <div
      id="projects"
      className="p-3.5 sm:p-5 rounded-lg bg-neutral-900/80 border border-neutral-800 space-y-4"
    >
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-neutral-800 pb-3">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-dx0-orange flex items-center gap-2">
            <FiFolder className="text-dx0-orange" /> Key Development Projects
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Hybrid AI models, real-time web applications, cross-platform mobile
            apps, and interactive games
          </p>
        </div>

        <a
          href={`https://${CONTACT_DATA.github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-1.5 rounded bg-dx0-orange text-black font-bold text-xs hover:bg-dx0-orange/90 transition-colors w-fit"
        >
          <FiGithub className="text-sm text-black" />
          <span>GitHub Profile</span>
          <FiExternalLink className="text-[10px] text-black" />
        </a>
      </div>

      <div className="relative w-full">
        <FiSearch className="absolute left-3 top-2.5 text-dx0-orange text-xs" />
        <input
          type="text"
          value={projectSearchQuery}
          onChange={(e) => setProjectSearchQuery(e.target.value)}
          placeholder="Search projects by title, technology, role..."
          className="w-full pl-8 pr-3 py-1.5 rounded bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-dx0-orange"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProjects.map((p) => (
          <div
            key={p.id}
            className="p-3.5 sm:p-4 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-dx0-orange/40 transition-colors space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-900 pb-2">
                <h3 className="text-xs font-bold text-white flex items-center gap-2">
                  {p.title}
                </h3>
                <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                  {p.date && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-neutral-800 font-mono">
                      {p.date}
                    </span>
                  )}
                  <span className="text-[10px] px-2 py-0.5 rounded bg-dx0-orange/10 text-dx0-orange border border-dx0-orange/30 font-semibold whitespace-nowrap">
                    {p.role}
                  </span>
                </div>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {p.description}
              </p>
              {p.details && p.details.length > 0 && (
                <ul className="list-disc list-inside text-xs text-neutral-400 space-y-1 pt-1">
                  {p.details.map((detail, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {detail}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="pt-2.5 border-t border-neutral-900 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div className="flex flex-wrap gap-1 flex-1 min-w-0">
                {p.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-0.5 rounded bg-neutral-900 text-neutral-300 border border-neutral-800 whitespace-nowrap"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                {previewableProjectIds.has(p.id) ? (
                  <button
                    onClick={() => setActiveModalProject(p)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-dx0-orange text-dx0-orange hover:bg-dx0-orange hover:text-black font-bold text-xs transition-colors cursor-pointer"
                  >
                    More
                  </button>
                ) : p.githubUrl ? (
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-dx0-orange transition-colors font-semibold"
                  >
                    <FiGithub /> Source Code{' '}
                    <FiExternalLink className="text-[10px]" />
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>

      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </div>
  );
}

export default memo(ProjectsSection);
