import { useState, useMemo } from 'react';
import { PROJECTS_DATA } from '../../data/projectsData';
import { FaFolderOpen, FaGithub, FaExternalLinkAlt, FaCode, FaSearch } from 'react-icons/fa';

export default function ProjectsSection() {
  const [selectedTech, setSelectedTech] = useState<string>('All');
  const [projectSearchQuery, setProjectSearchQuery] = useState<string>('');

  const allTechnologies = useMemo(() => {
    const set = new Set<string>();
    PROJECTS_DATA.forEach((p) => p.technologies.forEach((t) => set.add(t)));
    return ['All', ...Array.from(set)];
  }, []);

  const filteredProjects = useMemo(() => {
    let result = PROJECTS_DATA;
    if (selectedTech !== 'All') {
      result = result.filter((p) => p.technologies.includes(selectedTech));
    }
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
  }, [selectedTech, projectSearchQuery]);

  return (
    <div
      id="projects"
      className="p-5 rounded-lg bg-neutral-900/80 border border-neutral-800 space-y-4"
    >
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-neutral-800 pb-3">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-dx0-orange flex items-center gap-2">
            <FaFolderOpen /> Key Development Projects
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Hybrid AI models, 2D mobile games, desktop applications, and Android software
          </p>
        </div>

        <a
          href="https://github.com/juhenes"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-1.5 rounded bg-dx0-orange text-black font-bold text-xs hover:bg-dx0-orange/90 transition-colors w-fit"
        >
          <FaGithub className="text-sm" />
          <span>GitHub Profile</span>
          <FaExternalLinkAlt className="text-[10px]" />
        </a>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 bg-neutral-950 p-3 rounded-lg border border-neutral-800">
        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          <span className="text-xs text-neutral-400 flex items-center gap-1 mr-1">
            <FaCode className="text-dx0-orange text-xs" /> Filter Tech:
          </span>
          {allTechnologies.slice(0, 7).map((tech) => (
            <button
              key={tech}
              onClick={() => setSelectedTech(tech)}
              className={`text-xs px-2.5 py-1 rounded transition-colors cursor-pointer ${
                selectedTech === tech
                  ? 'bg-dx0-orange text-black font-bold'
                  : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-56">
          <FaSearch className="absolute left-3 top-2.5 text-neutral-500 text-xs" />
          <input
            type="text"
            value={projectSearchQuery}
            onChange={(e) => setProjectSearchQuery(e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-8 pr-3 py-1.5 rounded bg-neutral-900 border border-neutral-700 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-dx0-orange"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProjects.map((p) => (
          <div
            key={p.id}
            className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-dx0-orange/40 transition-colors space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="text-xs font-bold text-white flex items-center gap-2">
                  {p.title}
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-dx0-orange/10 text-dx0-orange border border-dx0-orange/30 font-semibold whitespace-nowrap ml-2">
                  {p.role}
                </span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {p.description}
              </p>
            </div>

            <div className="space-y-2.5 pt-2 border-t border-neutral-900">
              <div className="flex flex-wrap gap-1">
                {p.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-0.5 rounded bg-neutral-900 text-neutral-300 border border-neutral-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {p.githubUrl && (
                <div className="flex justify-end">
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-dx0-orange hover:underline font-semibold"
                  >
                    <FaGithub /> View Source Code{' '}
                    <FaExternalLinkAlt className="text-[10px]" />
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
