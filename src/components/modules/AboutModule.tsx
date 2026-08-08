import { useState, useMemo } from 'react';
import {
  PERSONAL_INFO,
  EDUCATION_DATA,
  EXPERIENCE_DATA,
  SKILL_CATEGORIES_DATA,
  LEADERSHIP_DATA,
} from '../../data/aboutData';
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaGraduationCap,
  FaBriefcase,
  FaCode,
  FaMapMarkerAlt,
  FaCopy,
  FaCheck,
  FaExternalLinkAlt,
  FaTerminal,
  FaSearch,
  FaUserShield,
  FaAward,
} from 'react-icons/fa';

export default function AboutModule() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const filteredSkills = useMemo(() => {
    if (!searchQuery.trim()) return SKILL_CATEGORIES_DATA;
    const q = searchQuery.toLowerCase();
    return SKILL_CATEGORIES_DATA.map((cat) => ({
      ...cat,
      skills: cat.skills.filter(
        (s) =>
          s.toLowerCase().includes(q) || cat.category.toLowerCase().includes(q)
      ),
    })).filter((cat) => cat.skills.length > 0);
  }, [searchQuery]);

  const totalSkillsCount = useMemo(() => {
    return SKILL_CATEGORIES_DATA.reduce(
      (acc, cat) => acc + cat.skills.length,
      0
    );
  }, []);

  return (
    <div className="flex flex-col h-full overflow-y-auto text-neutral-200 font-mono space-y-6 pr-1">
      {/* Header Profile Section */}
      <div className="relative rounded-lg border border-dx0-orange/30 bg-neutral-900/90 p-5 shadow-lg backdrop-blur-sm">
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-semibold hidden sm:inline">
            Status: Active & Available
          </span>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          {/* Terminal Profile Badge */}
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg bg-neutral-950 border-2 border-dx0-orange flex items-center justify-center text-dx0-orange shadow-[0_0_15px_rgba(244,117,34,0.3)]">
              <FaTerminal className="w-10 h-10 md:w-12 md:h-12" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-dx0-orange text-black font-bold text-[10px] px-1.5 py-0.5 rounded uppercase">
              DEV // SEC
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1 space-y-2">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white tracking-wide">
                {PERSONAL_INFO.name}
              </h1>
              <p className="text-dx0-orange text-sm font-semibold tracking-wider">
                {PERSONAL_INFO.title}
              </p>
            </div>

            <div className="flex flex-wrap gap-y-1.5 gap-x-4 text-xs text-neutral-400">
              <span className="flex items-center gap-1.5">
                <FaMapMarkerAlt className="text-dx0-orange/80" />
                {PERSONAL_INFO.location}
              </span>
              <span className="flex items-center gap-1.5">
                <FaGraduationCap className="text-dx0-orange/80" />
                BatStateU BS Computer Science
              </span>
              <span className="flex items-center gap-1.5 text-amber-400 font-medium">
                ★ Cum Laude (GWA: {PERSONAL_INFO.gwa})
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                🛡️ DOST JLSS Scholar
              </span>
            </div>

            {/* Quick Contact Chips */}
            <div className="flex flex-wrap gap-2 pt-2 text-xs">
              <button
                onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors border border-neutral-700 hover:border-dx0-orange/40 group"
                title="Click to copy email"
              >
                <FaEnvelope className="text-dx0-orange group-hover:scale-110 transition-transform" />
                <span>{PERSONAL_INFO.email}</span>
                {copiedField === 'email' ? (
                  <FaCheck className="text-emerald-400 ml-1" />
                ) : (
                  <FaCopy className="text-neutral-500 group-hover:text-dx0-orange ml-1 text-[10px]" />
                )}
              </button>

              <button
                onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors border border-neutral-700 hover:border-dx0-orange/40 group"
                title="Click to copy phone"
              >
                <FaPhone className="text-dx0-orange group-hover:scale-110 transition-transform" />
                <span>{PERSONAL_INFO.phone}</span>
                {copiedField === 'phone' ? (
                  <FaCheck className="text-emerald-400 ml-1" />
                ) : (
                  <FaCopy className="text-neutral-500 group-hover:text-dx0-orange ml-1 text-[10px]" />
                )}
              </button>

              <a
                href={`https://${PERSONAL_INFO.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors border border-neutral-700 hover:border-dx0-orange/40"
              >
                <FaGithub className="text-dx0-orange" />
                <span>GitHub</span>
                <FaExternalLinkAlt className="text-[10px] text-neutral-500" />
              </a>

              <a
                href={`https://${PERSONAL_INFO.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors border border-neutral-700 hover:border-dx0-orange/40"
              >
                <FaLinkedin className="text-dx0-orange" />
                <span>LinkedIn</span>
                <FaExternalLinkAlt className="text-[10px] text-neutral-500" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Biography Section */}
      <div className="p-4 rounded-lg bg-neutral-900/80 border border-neutral-800">
        <h2 className="text-xs font-bold uppercase tracking-wider text-dx0-orange mb-2 flex items-center gap-2">
          <FaTerminal className="text-xs" /> Biography & Profile Summary
        </h2>
        <p className="text-xs leading-relaxed text-neutral-300">
          {PERSONAL_INFO.summary}
        </p>
      </div>

      {/* Education & Academic Distinction */}
      <div className="p-4 rounded-lg bg-neutral-900/80 border border-neutral-800">
        <h2 className="text-xs font-bold uppercase tracking-wider text-dx0-orange mb-3 flex items-center gap-2">
          <FaGraduationCap /> Education
        </h2>
        {EDUCATION_DATA.map((edu) => (
          <div key={edu.id} className="space-y-3">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1">
              <div>
                <h3 className="text-sm font-bold text-white">
                  {edu.institution}
                </h3>
                <p className="text-xs text-dx0-orange font-semibold">
                  {edu.degree}
                </p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-neutral-950 text-dx0-orange font-semibold border border-neutral-800 w-fit">
                {edu.period}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {edu.honors.map((honor, i) => (
                <span
                  key={i}
                  className="text-xs px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-medium flex items-center gap-1"
                >
                  <FaAward className="text-amber-400" /> {honor}
                </span>
              ))}
            </div>

            {edu.details && (
              <ul className="space-y-1 text-xs text-neutral-300 list-disc list-inside pt-1">
                {edu.details.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Work Experience */}
      <div className="p-4 rounded-lg bg-neutral-900/80 border border-neutral-800">
        <h2 className="text-xs font-bold uppercase tracking-wider text-dx0-orange mb-4 flex items-center gap-2">
          <FaBriefcase /> Work Experience
        </h2>
        <div className="relative border-l-2 border-dx0-orange/40 ml-3 pl-6 space-y-6">
          {EXPERIENCE_DATA.map((exp) => (
            <div key={exp.id} className="relative group">
              <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-neutral-950 border-2 border-dx0-orange group-hover:bg-dx0-orange transition-colors" />

              <div className="p-3.5 rounded bg-neutral-950 border border-neutral-800 hover:border-dx0-orange/40 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <div>
                    <h3 className="text-xs font-bold text-white flex items-center gap-2">
                      {exp.role}
                      <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-800 text-dx0-orange font-normal">
                        {exp.type}
                      </span>
                    </h3>
                    <p className="text-[11px] text-neutral-400">
                      {exp.company}
                    </p>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-neutral-900 text-dx0-orange font-semibold border border-neutral-800 w-fit">
                    {exp.period}
                  </span>
                </div>

                <ul className="space-y-1 text-xs text-neutral-300 list-disc list-inside mb-3">
                  {exp.description.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1 pt-2 border-t border-neutral-900">
                  {exp.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded bg-neutral-900 text-neutral-300 border border-neutral-800"
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

      {/* Technical Skills Matrix */}
      <div className="p-4 rounded-lg bg-neutral-900/80 border border-neutral-800 space-y-3">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-dx0-orange flex items-center gap-2">
            <FaCode /> Technical Skills & Knowledge Domains ({totalSkillsCount}{' '}
            Skills)
          </h2>

          <div className="relative w-full sm:w-56">
            <FaSearch className="absolute left-2.5 top-2 text-neutral-500 text-[10px]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center justify-between">
                <span className="text-dx0-orange flex items-center gap-1.5">
                  <FaTerminal className="text-[10px]" /> {cat.category}
                </span>
                <span className="text-[10px] text-neutral-500">
                  {cat.skills.length}
                </span>
              </h3>

              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill, i) => {
                  const isMatch =
                    searchQuery &&
                    skill.toLowerCase().includes(searchQuery.toLowerCase());
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

      {/* Leadership & Community Experience */}
      <div className="p-4 rounded-lg bg-neutral-900/80 border border-neutral-800">
        <h2 className="text-xs font-bold uppercase tracking-wider text-dx0-orange mb-3 flex items-center gap-2">
          <FaUserShield /> Leadership Roles & Community Experience
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {LEADERSHIP_DATA.map((lead) => (
            <div
              key={lead.id}
              className="p-3 rounded bg-neutral-950 border border-neutral-800"
            >
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-xs font-bold text-white">{lead.role}</h3>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-900 text-dx0-orange">
                  {lead.period}
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 font-medium">
                {lead.organization}
              </p>
              {lead.description && (
                <p className="text-[11px] text-neutral-400 mt-2 leading-relaxed">
                  {lead.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
