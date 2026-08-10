import { memo } from 'react';
import { EXPERIENCE_DATA } from '../../data/experienceData';
import { FiBriefcase, FiGlobe, FiCalendar } from 'react-icons/fi';

function ExperienceSection() {
  return (
    <div
      id="experience"
      className="p-3.5 sm:p-5 rounded-lg bg-neutral-900/80 border border-neutral-800 space-y-4"
    >
      <div className="border-b border-neutral-800 pb-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-dx0-orange flex items-center gap-2">
          <FiBriefcase className="text-dx0-orange" /> Work Experience
        </h2>
        <p className="text-xs text-neutral-400 mt-0.5">
          Software Engineering, Game Development, Independent Contracting & Web
          Systems Architecture
        </p>
      </div>

      <div className="relative border-l-2 border-dx0-orange/40 ml-2.5 sm:ml-4 pl-4 sm:pl-8 space-y-5 sm:space-y-6">
        {EXPERIENCE_DATA.map((exp) => (
          <div key={exp.id} className="relative group">
            <div className="absolute -left-[25px] sm:-left-[41px] top-1.5 w-4 h-4 rounded-full bg-neutral-950 border-2 border-dx0-orange group-hover:bg-dx0-orange transition-colors" />

            <div className="p-3.5 sm:p-4 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-dx0-orange/40 transition-colors space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-900 pb-2.5">
                <div>
                  <h3 className="text-sm font-bold text-white flex flex-wrap items-center gap-2">
                    {exp.role}
                    <span className="text-[10px] px-2 py-0.5 rounded bg-dx0-orange/10 text-dx0-orange font-semibold border border-dx0-orange/30">
                      {exp.type}
                    </span>
                  </h3>
                  <p className="text-xs text-neutral-400 font-medium flex items-center gap-1.5 mt-0.5">
                    <FiGlobe className="text-dx0-orange" />
                    {exp.company}
                  </p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded bg-neutral-900 text-dx0-orange font-semibold border border-neutral-800 flex items-center gap-1.5 w-fit">
                  <FiCalendar className="text-dx0-orange" />
                  {exp.period}
                </span>
              </div>

              <ul className="space-y-1.5 text-xs text-neutral-300 list-disc list-inside">
                {exp.description.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-neutral-900">
                {exp.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-0.5 rounded bg-neutral-900 text-neutral-300 border border-neutral-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(ExperienceSection);
