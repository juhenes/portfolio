import { CERTIFICATIONS_DATA } from '../../data/certificationsData';
import {
  FaCertificate,
  FaAward,
  FaCheckCircle,
  FaShieldAlt,
} from 'react-icons/fa';

export default function CertificationsModule() {
  return (
    <div className="flex flex-col h-full overflow-y-auto text-neutral-200 font-mono space-y-6 pr-1">
      {/* Header Banner */}
      <div className="p-4 rounded-lg border border-dx0-orange/30 bg-neutral-900/90 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <FaCertificate className="text-dx0-orange" /> Licenses & Official
            Certifications
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Government eligibility credentials and official Cisco Networking
            Academy cybersecurity certifications.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
            Verified Credentials
          </span>
        </div>
      </div>

      {/* Primary Highlight: Civil Service Professional Eligibility */}
      <div className="p-5 rounded-lg bg-neutral-900/90 border-2 border-dx0-orange/50 shadow-[0_0_15px_rgba(244,117,34,0.15)] space-y-2">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded bg-dx0-orange/10 text-dx0-orange border border-dx0-orange/30">
              <FaAward className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Civil Service Eligibility (Professional)
              </h2>
              <p className="text-xs text-neutral-400">
                Civil Service Commission (CSC)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-1.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold text-sm">
              Rating: 90.96%
            </span>
          </div>
        </div>
        <p className="text-xs text-neutral-300 pt-2 border-t border-neutral-800">
          First-level and second-level government eligibility for technical and
          professional positions.
        </p>
      </div>

      {/* Cisco Certifications List */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-dx0-orange mb-3 flex items-center gap-2">
          <FaShieldAlt /> Cisco Networking Academy Certifications (
          {CERTIFICATIONS_DATA.length - 1})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {CERTIFICATIONS_DATA.filter((c) => c.id !== 'cert-csc').map(
            (cert) => (
              <div
                key={cert.id}
                className="p-4 rounded-lg bg-neutral-900/90 border border-neutral-800 hover:border-dx0-orange/40 transition-all flex justify-between items-center"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-emerald-400 text-xs flex-shrink-0" />
                    <h3 className="text-xs font-bold text-white">
                      {cert.name}
                    </h3>
                  </div>
                  <p className="text-[11px] text-neutral-400 pl-5">
                    {cert.issuer}
                  </p>
                </div>

                <span className="text-[10px] px-2.5 py-1 rounded bg-neutral-950 text-dx0-orange font-semibold border border-neutral-800 whitespace-nowrap ml-2">
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
