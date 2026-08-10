import { memo } from 'react';
import { PERSONAL_INFO, EDUCATION_DATA } from '../../data/aboutData';
import {
  FiTerminal,
  FiMapPin,
  FiAward,
  FiShield,
  FiStar,
  FiExternalLink,
} from 'react-icons/fi';
import { PiSparkle } from 'react-icons/pi';

function ProfileSection() {
  return (
    <div
      id="profile"
      className="relative rounded-lg border border-dx0-orange/30 bg-neutral-900/90 p-4 sm:p-5 md:p-6 shadow-lg backdrop-blur-sm space-y-5 sm:space-y-6"
    >
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
        <div className="relative flex-shrink-0">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg bg-neutral-950 border-2 border-dx0-orange flex items-center justify-center text-dx0-orange shadow-[0_0_15px_rgba(244,117,34,0.3)]">
            <FiTerminal className="w-10 h-10 md:w-12 md:h-12 text-dx0-orange" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-dx0-orange text-black font-bold text-[10px] px-1.5 py-0.5 rounded uppercase">
            DEV // SEC
          </div>
        </div>

        <div className="flex-1 space-y-2 w-full">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-wide">
              {PERSONAL_INFO.name}
            </h1>
            <p className="text-dx0-orange text-sm font-semibold tracking-wider">
              {PERSONAL_INFO.title}
            </p>
          </div>

          <div className="flex flex-wrap gap-y-1.5 gap-x-3 sm:gap-x-4 text-xs text-neutral-400">
            <span className="flex items-center gap-1.5">
              <FiMapPin className="text-dx0-orange shrink-0" />
              {PERSONAL_INFO.location}
            </span>
            <span className="flex items-center gap-1.5">
              <FiAward className="text-dx0-orange shrink-0" />
              BatStateU BS Computer Science
            </span>
            <span className="flex items-center gap-1.5">
              <FiStar className="text-dx0-orange text-xs shrink-0" /> Cum Laude (GWA:{' '}
              {PERSONAL_INFO.gwa})
            </span>
            <span className="flex items-center gap-1.5">
              <FiShield className="text-dx0-orange text-xs shrink-0" /> CSE Professional
              ({PERSONAL_INFO.cseRating})
            </span>
            <span className="flex items-center gap-1.5">
              <PiSparkle className="text-dx0-orange text-xs shrink-0" /> DOST JLSS
              Scholar
            </span>
          </div>

          <div className="pt-2 text-xs">
            <a
              href="/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-3 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white transition-colors border border-neutral-700 hover:border-dx0-orange/60 group font-semibold cursor-pointer shadow-sm"
            >
              <span>Resume / Curriculum Vitae</span>
              <FiExternalLink className="text-[10px] text-dx0-orange ml-0.5" />
            </a>
          </div>
        </div>
      </div>

      <div
        className="border-t border-neutral-800/80 pt-5 space-y-3"
        id="education"
      >
        <h2 className="text-xs font-bold uppercase tracking-wider text-dx0-orange flex items-center gap-2">
          <FiAward className="text-dx0-orange" /> Education & Academic
          Distinction
        </h2>
        {EDUCATION_DATA.map((edu) => (
          <div
            key={edu.id}
            className="p-4 rounded bg-neutral-950/90 border border-neutral-800/80 space-y-3"
          >
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1">
              <div>
                <h3 className="text-sm font-bold text-white">
                  {edu.institution}
                </h3>
                <p className="text-xs text-dx0-orange font-semibold">
                  {edu.degree}
                </p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-neutral-900 text-dx0-orange font-semibold border border-neutral-800 w-fit">
                {edu.period}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {edu.honors.map((honor, i) => {
                const IconComponent = honor.includes('Cum Laude')
                  ? FiStar
                  : honor.includes('DOST')
                    ? PiSparkle
                    : FiAward;
                return (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded bg-dx0-orange/10 text-dx0-orange border border-dx0-orange/30 font-medium flex items-center gap-1"
                  >
                    <IconComponent className="text-dx0-orange" /> {honor}
                  </span>
                );
              })}
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

      <div
        className="border-t border-neutral-800/80 pt-5 space-y-2"
        id="biography"
      >
        <h2 className="text-xs font-bold uppercase tracking-wider text-dx0-orange flex items-center gap-2">
          <FiTerminal className="text-xs text-dx0-orange" /> Biography & Profile
          Summary
        </h2>
        <p className="text-xs leading-relaxed text-neutral-300">
          {PERSONAL_INFO.summary}
        </p>
      </div>
    </div>
  );
}

export default memo(ProfileSection);
