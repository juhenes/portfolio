import { useState, useMemo, memo } from 'react';
import { AWARDS_DATA } from '../../data/awardsData';
import { FiAward, FiSearch, FiFlag } from 'react-icons/fi';

function AwardsSection() {
  const [awardCategory, setAwardCategory] = useState<string>('All');
  const [awardSearchQuery, setAwardSearchQuery] = useState<string>('');

  const awardCategories = useMemo(
    () => [
      { id: 'All', label: 'All' },
      { id: 'Cyber', label: 'Cyber' },
      { id: 'Competitive Programming', label: 'Competitive Programming' },
    ],
    []
  );

  const filteredAwards = useMemo(() => {
    let result = AWARDS_DATA;
    if (awardCategory === 'Cyber') {
      result = result.filter((a) => a.category === 'Cyber Security');
    } else if (awardCategory === 'Competitive Programming') {
      result = result.filter((a) => a.category === 'Competitive Programming');
    }
    if (awardSearchQuery.trim()) {
      const q = awardSearchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.event.toLowerCase().includes(q) ||
          a.organizer.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.date.toLowerCase().includes(q)
      );
    }
    return result;
  }, [awardCategory, awardSearchQuery]);

  return (
    <div
      id="awards"
      className="p-3.5 sm:p-5 rounded-lg bg-neutral-900/80 border border-neutral-800 space-y-4"
    >
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-neutral-800 pb-3">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-dx0-orange flex items-center gap-2">
            <FiAward className="text-dx0-orange" /> Honors & Competition
            Achievements
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Cybersecurity CTF national rankings, scholarships & competitive
            programming honors
          </p>
        </div>
      </div>

      <div className="p-4 rounded-lg bg-neutral-950 border-2 border-dx0-orange/60 shadow-[0_0_15px_rgba(244,117,34,0.2)] flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded bg-dx0-orange/10 text-dx0-orange border border-dx0-orange/30 shrink-0">
            <FiFlag className="w-6 h-6 text-dx0-orange" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-dx0-orange">
                CTFtime 2025 Official Country Standings
              </span>
            </div>
            <h3 className="text-sm font-bold text-white tracking-wide mt-0.5">
              Top 3 Philippines National Team Ranking (Team 400BadRequest)
            </h3>
          </div>
        </div>
        <span className="text-xs px-3 py-1.5 rounded bg-dx0-orange text-black font-extrabold tracking-wide w-fit whitespace-nowrap self-start sm:self-auto">
          #3 IN PHILIPPINES
        </span>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-3 bg-neutral-950 p-3 rounded-lg border border-neutral-800">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 md:pb-0 w-full md:w-auto shrink-0">
          {awardCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setAwardCategory(cat.id)}
              className={`text-xs px-2.5 py-1 rounded transition-colors cursor-pointer shrink-0 ${
                awardCategory === cat.id
                  ? 'bg-dx0-orange text-black font-bold'
                  : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-56 shrink-0">
          <FiSearch className="absolute left-3 top-2.5 text-dx0-orange text-xs" />
          <input
            type="text"
            value={awardSearchQuery}
            onChange={(e) => setAwardSearchQuery(e.target.value)}
            placeholder="Search awards..."
            className="w-full pl-8 pr-3 py-1.5 rounded bg-neutral-900 border border-neutral-700 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-dx0-orange"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredAwards.map((award) => (
          <div
            key={award.id}
            className="p-3.5 rounded bg-neutral-950 border border-neutral-800 space-y-1 hover:border-dx0-orange/30 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
              <h3 className="text-xs font-bold text-white">
                {award.title} - {award.event}
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-900 text-dx0-orange border border-neutral-800 whitespace-nowrap w-fit">
                {award.date}
              </span>
            </div>
            <p className="text-[11px] text-neutral-400">
              {award.organizer} ({award.category})
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(AwardsSection);
