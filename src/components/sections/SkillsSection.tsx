import { useState, useMemo, memo } from 'react';
import { SKILL_CATEGORIES_DATA } from '../../data/skillsData';
import { FiCode, FiSearch, FiTerminal } from 'react-icons/fi';

function SkillsSection() {
  const [skillsSearchQuery, setSkillsSearchQuery] = useState<string>('');

  const filteredSkills = useMemo(() => {
    if (!skillsSearchQuery.trim()) return SKILL_CATEGORIES_DATA;
    const q = skillsSearchQuery.toLowerCase();
    return SKILL_CATEGORIES_DATA.map((cat) => ({
      ...cat,
      skills: cat.skills.filter(
        (s) =>
          s.toLowerCase().includes(q) || cat.category.toLowerCase().includes(q)
      ),
    })).filter((cat) => cat.skills.length > 0);
  }, [skillsSearchQuery]);

  return (
    <div
      id="skills"
      className="p-3.5 sm:p-5 rounded-lg bg-neutral-900/80 border border-neutral-800 space-y-3"
    >
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-neutral-800 pb-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-dx0-orange flex items-center gap-2">
          <FiCode className="text-dx0-orange" /> Technical Skills & Knowledge
        </h2>

        <div className="relative w-full sm:w-56">
          <FiSearch className="absolute left-2.5 top-2 text-dx0-orange text-[10px]" />
          <input
            type="text"
            value={skillsSearchQuery}
            onChange={(e) => setSkillsSearchQuery(e.target.value)}
            placeholder="Filter skills..."
            className="w-full pl-7 pr-3 py-1 rounded bg-neutral-950 border border-neutral-700 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-dx0-orange"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
        {filteredSkills.map((cat) => (
          <div
            key={cat.id}
            className="p-3 rounded bg-neutral-950 border border-neutral-800"
          >
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center">
              <span className="text-dx0-orange flex items-center gap-1.5">
                <FiTerminal className="text-[10px] text-dx0-orange" />{' '}
                {cat.category}
              </span>
            </h3>

            <div className="flex flex-wrap gap-1.5">
              {cat.skills.map((skill, i) => {
                const isMatch =
                  skillsSearchQuery &&
                  skill.toLowerCase().includes(skillsSearchQuery.toLowerCase());
                return (
                  <span
                    key={i}
                    className={`text-xs px-2 py-0.5 rounded transition-colors ${
                      isMatch
                        ? 'bg-dx0-orange text-black font-bold'
                        : 'bg-neutral-900 text-neutral-300 border border-neutral-800'
                    }`}
                  >
                    {skill}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(SkillsSection);
