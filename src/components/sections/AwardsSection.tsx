import { useState, useMemo, memo } from 'react';
import { AWARDS_DATA } from '../../data/awardsData';
import { FiAward, FiSearch } from 'react-icons/fi';

function AwardsSection() {
  const [awardCategory, setAwardCategory] = useState<string>('All');
  const [awardSearchQuery, setAwardSearchQuery] = useState<string>('');

  const awardCategories = useMemo(() => {
    const categories = new Set<string>();
    AWARDS_DATA.forEach((a) => categories.add(a.category));
    return ['All', ...Array.from(categories)];
  }, []);

  const filteredAwards = useMemo(() => {
    let result = AWARDS_DATA;
    if (awardCategory !== 'All') {
      result = result.filter((a) => a.category === awardCategory);
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
      className="p-5 rounded-lg bg-neutral-900/80 border border-neutral-800 space-y-4"
    >
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-neutral-800 pb-3">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-dx0-orange flex items-center gap-2">
            <FiAward className="text-dx0-orange" /> Honors & Competition Achievements
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Cybersecurity CTF championships, national scholarships & competitive
            programming honors
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 bg-neutral-950 p-3 rounded-lg border border-neutral-800">
        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          <span className="text-xs text-neutral-400 flex items-center gap-1 mr-1">
            <FiAward className="text-dx0-orange text-xs" /> Filter Category:
          </span>
          {awardCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setAwardCategory(cat)}
              className={`text-xs px-2.5 py-1 rounded transition-colors cursor-pointer ${
                awardCategory === cat
                  ? 'bg-dx0-orange text-black font-bold'
                  : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-56">
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
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                <FiAward className="text-dx0-orange text-xs" />
                {award.title} - {award.event}
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-900 text-dx0-orange border border-neutral-800 whitespace-nowrap ml-2">
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
