import { memo } from 'react';
import { CERTIFICATIONS_DATA } from '../../data/certificationsData';
import {
  FiAward,
  FiShield,
  FiExternalLink,
} from 'react-icons/fi';

function CertificationsSection() {
  const cscCert = CERTIFICATIONS_DATA.find((c) => c.id === 'cert-csc');

  return (
    <div
      id="certifications"
      className="p-3.5 sm:p-5 rounded-lg bg-neutral-900/80 border border-neutral-800 space-y-4"
    >
      <div className="border-b border-neutral-800 pb-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-dx0-orange flex items-center gap-2">
          <FiAward className="text-dx0-orange" /> Licenses & Official
          Certifications
        </h2>
        <p className="text-xs text-neutral-400 mt-0.5">
          Government eligibility credentials, SAP ASEAN Data Science training,
          and Cisco Networking Academy certifications
        </p>
      </div>

      {cscCert && (
        <div className="p-4 rounded-lg bg-neutral-950 border-2 border-dx0-orange/50 shadow-[0_0_15px_rgba(244,117,34,0.15)] space-y-2">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded bg-dx0-orange/10 text-dx0-orange border border-dx0-orange/30 shrink-0">
                <FiAward className="w-6 h-6 text-dx0-orange" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  {cscCert.name}
                </h3>
                <p className="text-xs text-neutral-400">{cscCert.issuer}</p>
              </div>
            </div>

            {cscCert.rating && (
              <span className="text-xs px-3 py-1.5 rounded bg-dx0-orange/10 text-dx0-orange border border-dx0-orange/30 font-bold text-sm w-fit">
                {cscCert.rating}
              </span>
            )}
          </div>
          <p className="text-xs text-neutral-300 pt-2 border-t border-neutral-900">
            First-level and second-level government eligibility for technical
            and professional positions.
          </p>
        </div>
      )}

      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-2">
          <FiShield className="text-dx0-orange" /> Professional & Technical
          Certifications
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {CERTIFICATIONS_DATA.filter((c) => c.id !== 'cert-csc').map(
            (cert) => (
              <div
                key={cert.id}
                className="p-3 rounded bg-neutral-950 border border-neutral-800 space-y-1 hover:border-dx0-orange/30 transition-colors flex flex-col justify-between"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <h4 className="text-xs font-bold text-white leading-snug min-w-0">
                    {cert.name}
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-900 text-dx0-orange font-semibold border border-neutral-800 whitespace-nowrap w-fit">
                    {cert.date}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 text-[11px] text-neutral-400 pt-0.5">
                  <span className="truncate">{cert.issuer}</span>
                  {cert.credlyUrl && (
                    <a
                      href={cert.credlyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] text-dx0-orange hover:underline font-semibold shrink-0"
                    >
                      <span>Verify Credly</span>
                      <FiExternalLink className="text-[9px]" />
                    </a>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(CertificationsSection);
