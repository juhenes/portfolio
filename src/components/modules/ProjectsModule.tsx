import { useState, useMemo } from 'react';
import { PROJECTS_DATA } from '../../data/projectsData';
import {
  FaGithub,
  FaExternalLinkAlt,
  FaCode,
  FaSearch,
  FaTerminal,
} from 'react-icons/fa';

export default function ProjectsModule() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTech, setSelectedTech] = useState<string>('All');

  // Extract unique technologies across projects for quick tech filters
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

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.role.toLowerCase().includes(q) ||
          p.technologies.some((t) => t.toLowerCase().includes(q))
      );
    }

    return result;
  }, [selectedTech, searchQuery]);

  return (
    <div className="flex flex-col h-full overflow-y-auto text-neutral-200 font-mono space-y-6 pr-1">
      {/* Header Banner */}
      <div className="p-4 rounded-lg border border-dx0-orange/30 bg-neutral-900/90 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <FaTerminal className="text-dx0-orange" /> Key Development Projects
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Showcase of hybrid AI models, mobile games, desktop applications,
            and Android software.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/juhenes"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded bg-dx0-orange text-black font-bold text-xs hover:bg-dx0-orange/90 transition-colors shadow-[0_0_10px_rgba(244,117,34,0.3)]"
          >
            <FaGithub className="text-sm" />
            <span>More on GitHub</span>
            <FaExternalLinkAlt className="text-[10px]" />
          </a>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 bg-neutral-900/60 p-3 rounded-lg border border-neutral-800">
        {/* Technology Pills */}
        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          <span className="text-xs text-neutral-400 flex items-center gap-1 mr-1">
            <FaCode className="text-dx0-orange text-xs" /> Filter Tech:
          </span>
          {allTechnologies.slice(0, 7).map((tech) => (
            <button
              key={tech}
              onClick={() => setSelectedTech(tech)}
              className={`text-xs px-2.5 py-1 rounded transition-colors ${
                selectedTech === tech
                  ? 'bg-dx0-orange text-black font-bold'
                  : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <FaSearch className="absolute left-3 top-2.5 text-neutral-500 text-xs" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-8 pr-3 py-1.5 rounded bg-neutral-950 border border-neutral-700 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-dx0-orange"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProjects.map((p) => (
          <div
            key={p.id}
            className="p-5 rounded-lg bg-neutral-900/90 border border-neutral-800 hover:border-dx0-orange/40 transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <h2 className="text-sm font-bold text-white group-hover:text-dx0-orange transition-colors flex items-center gap-2">
                  {p.title}
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded bg-dx0-orange/10 text-dx0-orange border border-dx0-orange/30 font-semibold whitespace-nowrap">
                  {p.role}
                </span>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed">
                {p.description}
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-neutral-800">
              <div className="flex flex-wrap gap-1.5">
                {p.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-0.5 rounded bg-neutral-950 text-neutral-300 border border-neutral-800"
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
