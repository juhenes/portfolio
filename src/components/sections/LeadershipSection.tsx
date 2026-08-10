import { memo } from 'react';
import { LEADERSHIP_DATA } from '../../data/leadershipData';
import { FiUserCheck } from 'react-icons/fi';

function LeadershipSection() {
  return (
    <div
      id="leadership"
      className="p-3.5 sm:p-5 rounded-lg bg-neutral-900/80 border border-neutral-800 space-y-4"
    >
      <div className="border-b border-neutral-800 pb-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-dx0-orange flex items-center gap-2">
          <FiUserCheck className="text-dx0-orange" /> Leadership & Community
          Experience
        </h2>
        <p className="text-xs text-neutral-400 mt-0.5">
          CTF Competition Orchestration, Cyber Security Mentorship & Technical
          Workshops
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {LEADERSHIP_DATA.map((lead) => (
          <div
            key={lead.id}
            className="p-3.5 sm:p-4 rounded-lg bg-neutral-950 border border-neutral-800 space-y-3 flex flex-col justify-between hover:border-dx0-orange/40 transition-colors"
          >
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-neutral-900 pb-2">
                <h3 className="text-xs font-bold text-white leading-snug">
                  {lead.role}
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-900 text-dx0-orange font-semibold border border-neutral-800 whitespace-nowrap w-fit">
                  {lead.period}
                </span>
              </div>
              <p className="text-xs text-dx0-orange font-semibold">
                {lead.organization}
              </p>
              {lead.description && (
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {lead.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(LeadershipSection);
