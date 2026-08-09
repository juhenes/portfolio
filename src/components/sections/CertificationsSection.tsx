import { memo } from 'react';
import { CERTIFICATIONS_DATA } from '../../data/certificationsData';
import {
  FiAward,
  FiShield,
  FiCheckCircle,
} from 'react-icons/fi';

function CertificationsSection() {
  return (
    <div
      id="certifications"
      className="p-5 rounded-lg bg-neutral-900/80 border border-neutral-800 space-y-4"
    >
      <div className="border-b border-neutral-800 pb-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-dx0-orange flex items-center gap-2">
          <FiAward className="text-dx0-orange" /> Licenses & Official Certifications
        </h2>
        <p className="text-xs text-neutral-400 mt-0.5">
          Government eligibility credentials and official Cisco Networking
          Academy certifications
        </p>
      </div>

      <div className="p-4 rounded-lg bg-neutral-950 border-2 border-dx0-orange/50 shadow-[0_0_15px_rgba(244,117,34,0.15)] space-y-2">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded bg-dx0-orange/10 text-dx0-orange border border-dx0-orange/30">
              <FiAward className="w-6 h-6 text-dx0-orange" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Civil Service Eligibility (Professional)
              </h3>
              <p className="text-xs text-neutral-400">
                Civil Service Commission (CSC)
              </p>
            </div>
          </div>

          <span className="text-xs px-3 py-1.5 rounded bg-dx0-orange/10 text-dx0-orange border border-dx0-orange/30 font-bold text-sm">
            Rating: 90.96%
          </span>
        </div>
        <p className="text-xs text-neutral-300 pt-2 border-t border-neutral-900">
          First-level and second-level government eligibility for technical and
          professional positions. Passed CSE Professional Examination with
          90.96% rating.
        </p>
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-2">
          <FiShield className="text-dx0-orange" /> Cisco Networking Academy
          Certifications
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {CERTIFICATIONS_DATA.filter((c) => c.id !== 'cert-csc').map(
            (cert) => (
              <div
                key={cert.id}
                className="p-3.5 rounded bg-neutral-950 border border-neutral-800 flex justify-between items-center hover:border-dx0-orange/30 transition-colors"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <FiCheckCircle className="text-dx0-orange text-xs flex-shrink-0" />
                    <h4 className="text-xs font-bold text-white">
                      {cert.name}
                    </h4>
                  </div>
                  <p className="text-[11px] text-neutral-400 pl-5">
                    {cert.issuer}
                  </p>
                </div>

                <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-900 text-dx0-orange font-semibold border border-neutral-800 whitespace-nowrap ml-2">
                  {cert.date}
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(CertificationsSection);
