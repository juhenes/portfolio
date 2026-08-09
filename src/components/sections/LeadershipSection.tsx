import { LEADERSHIP_DATA } from '../../data/aboutData';
import { FaUserShield, FaChalkboardTeacher } from 'react-icons/fa';

export default function LeadershipSection() {
  return (
    <div
      id="leadership"
      className="p-5 rounded-lg bg-neutral-900/80 border border-neutral-800 space-y-4"
    >
      <div className="border-b border-neutral-800 pb-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-dx0-orange flex items-center gap-2">
          <FaUserShield /> Leadership & Community Experience
        </h2>
        <p className="text-xs text-neutral-400 mt-0.5">
          CTF Competition Orchestration, Cyber Security Mentorship & Technical Workshops
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {LEADERSHIP_DATA.map((lead) => (
          <div
            key={lead.id}
            className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 space-y-3 flex flex-col justify-between hover:border-dx0-orange/40 transition-colors"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-start border-b border-neutral-900 pb-2">
                <h3 className="text-xs font-bold text-white leading-snug">
                  {lead.role}
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-900 text-dx0-orange font-semibold border border-neutral-800 whitespace-nowrap ml-2">
                  {lead.period}
                </span>
              </div>
              <p className="text-xs text-amber-400 font-semibold">
                {lead.organization}
              </p>
              {lead.description && (
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {lead.description}
                </p>
              )}
            </div>

            <div className="pt-2 border-t border-neutral-900 flex items-center gap-1.5 text-[11px] text-neutral-400">
              <FaChalkboardTeacher className="text-dx0-orange" />
              <span>Mentorship & Challenge Design</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
