import { useState, useMemo } from 'react';
import { AWARDS_DATA } from '../../data/awardsData';
import { FaTrophy, FaMedal, FaSearch, FaShieldAlt } from 'react-icons/fa';

export default function AwardsModule() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Cyber Security',
    'Competitive Programming',
    'Quiz Bee',
  ];

  const filteredAchievements = useMemo(() => {
    let result = AWARDS_DATA;

    if (selectedCategory !== 'All') {
      result = result.filter((a) => a.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.event.toLowerCase().includes(q) ||
          a.title.toLowerCase().includes(q) ||
          a.organizer.toLowerCase().includes(q) ||
          a.date.toLowerCase().includes(q)
      );
    }

    return result;
  }, [selectedCategory, searchQuery]);

  return (
    <div className="flex flex-col h-full overflow-y-auto text-neutral-200 font-mono space-y-6 pr-1">
      {/* Header Banner */}
      <div className="p-4 rounded-lg border border-dx0-orange/30 bg-neutral-900/90 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <FaTrophy className="text-dx0-orange" /> Awards & CTF Competition
            Achievements
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Proven competitive record across global & national Cyber Security
            CTFs and Competitive Programming challenges.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded bg-dx0-orange/10 text-dx0-orange border border-dx0-orange/30 font-bold">
            Total Honors: {AWARDS_DATA.length}
          </span>
        </div>
      </div>

      {/* Category Pills & Search */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 bg-neutral-900/60 p-3 rounded-lg border border-neutral-800">
        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3 py-1.5 rounded font-semibold transition-colors ${
                selectedCategory === cat
                  ? 'bg-dx0-orange text-black shadow-[0_0_10px_rgba(244,117,34,0.3)]'
                  : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <FaSearch className="absolute left-3 top-2.5 text-neutral-500 text-xs" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search awards..."
            className="w-full pl-8 pr-3 py-1.5 rounded bg-neutral-950 border border-neutral-700 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-dx0-orange"
          />
        </div>
      </div>

      {/* Awards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredAchievements.map((ach) => {
          const isTopPlace =
            ach.title.includes('2nd') ||
            ach.title.includes('5th') ||
            ach.title.includes('Grand');

          return (
            <div
              key={ach.id}
              className={`p-4 rounded-lg bg-neutral-900/90 border transition-all flex justify-between items-start ${
                isTopPlace
                  ? 'border-amber-500/40 hover:border-amber-500'
                  : 'border-neutral-800 hover:border-dx0-orange/40'
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <FaMedal
                    className={`text-sm ${
                      isTopPlace ? 'text-amber-400' : 'text-dx0-orange'
                    }`}
                  />
                  <h3 className="text-xs font-bold text-white tracking-wide">
                    {ach.title}
                  </h3>
                </div>

                <p className="text-xs text-neutral-200 font-semibold">
                  {ach.event}
                </p>
                <p className="text-[11px] text-neutral-400 flex items-center gap-1">
                  <FaShieldAlt className="text-[10px] text-dx0-orange/70" />{' '}
                  {ach.organizer}
                </p>
              </div>

              <div className="text-right flex flex-col items-end gap-1.5">
                <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-950 text-dx0-orange border border-neutral-800 font-mono font-bold">
                  {ach.date}
                </span>
                <span className="text-[9px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                  {ach.category}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
