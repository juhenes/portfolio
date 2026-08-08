import React, { useState } from 'react';
import { CONTACT_DATA } from '../../data/contactData';
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaCode,
  FaShieldAlt,
  FaCopy,
  FaCheck,
  FaPaperPlane,
} from 'react-icons/fa';

export default function ContactModule() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [sentStatus, setSentStatus] = useState<boolean>(false);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSentStatus(true);
    setTimeout(() => {
      setSentStatus(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto text-neutral-200 font-mono space-y-6 pr-1">
      {/* Header Banner */}
      <div className="p-4 rounded-lg border border-dx0-orange/30 bg-neutral-900/90 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <FaEnvelope className="text-dx0-orange" /> Contact & Communication
            Channel
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Get in touch for software engineering, web development,
            cybersecurity, or collaboration opportunities.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
            Available for Hiring & Contracts
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Info Cards */}
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-neutral-900/90 border border-neutral-800 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-dx0-orange border-b border-neutral-800 pb-2">
              Direct Contact Details
            </h2>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between p-2.5 rounded bg-neutral-950 border border-neutral-800">
                <div className="flex items-center gap-2.5">
                  <FaEnvelope className="text-dx0-orange text-sm" />
                  <div>
                    <p className="text-[10px] text-neutral-500 uppercase font-bold">
                      Email
                    </p>
                    <p className="text-xs text-white font-medium">
                      {CONTACT_DATA.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(CONTACT_DATA.email, 'email')}
                  className="p-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs"
                  title="Copy email"
                >
                  {copiedField === 'email' ? (
                    <FaCheck className="text-emerald-400" />
                  ) : (
                    <FaCopy />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded bg-neutral-950 border border-neutral-800">
                <div className="flex items-center gap-2.5">
                  <FaPhone className="text-dx0-orange text-sm" />
                  <div>
                    <p className="text-[10px] text-neutral-500 uppercase font-bold">
                      Phone
                    </p>
                    <p className="text-xs text-white font-medium">
                      {CONTACT_DATA.phone}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(CONTACT_DATA.phone, 'phone')}
                  className="p-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs"
                  title="Copy phone number"
                >
                  {copiedField === 'phone' ? (
                    <FaCheck className="text-emerald-400" />
                  ) : (
                    <FaCopy />
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded bg-neutral-950 border border-neutral-800">
                <FaMapMarkerAlt className="text-dx0-orange text-sm" />
                <div>
                  <p className="text-[10px] text-neutral-500 uppercase font-bold">
                    Location
                  </p>
                  <p className="text-xs text-white font-medium">
                    {CONTACT_DATA.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Profiles Grid */}
          <div className="p-4 rounded-lg bg-neutral-900/90 border border-neutral-800 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-dx0-orange border-b border-neutral-800 pb-2">
              Online Networks & Profiles
            </h2>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={`https://${CONTACT_DATA.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-xs text-white transition-colors"
              >
                <FaGithub className="text-dx0-orange text-base" />
                <div>
                  <p className="font-bold">GitHub</p>
                  <p className="text-[10px] text-neutral-500">
                    github.com/juhenes
                  </p>
                </div>
              </a>

              <a
                href={`https://${CONTACT_DATA.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-xs text-white transition-colors"
              >
                <FaLinkedin className="text-dx0-orange text-base" />
                <div>
                  <p className="font-bold">LinkedIn</p>
                  <p className="text-[10px] text-neutral-500">
                    deogenesmaranan
                  </p>
                </div>
              </a>

              <a
                href={`https://${CONTACT_DATA.leetcode}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-xs text-white transition-colors"
              >
                <FaCode className="text-dx0-orange text-base" />
                <div>
                  <p className="font-bold">LeetCode</p>
                  <p className="text-[10px] text-neutral-500">Juhenes</p>
                </div>
              </a>

              <a
                href={`https://${CONTACT_DATA.ctftime}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-xs text-white transition-colors"
              >
                <FaShieldAlt className="text-dx0-orange text-base" />
                <div>
                  <p className="font-bold">CTFTime</p>
                  <p className="text-[10px] text-neutral-500">User 194539</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Interactive Contact Message Form */}
        <div className="p-4 rounded-lg bg-neutral-900/90 border border-neutral-800 flex flex-col justify-between">
          <form onSubmit={handleSubmit} className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-dx0-orange border-b border-neutral-800 pb-2">
              Send Direct Message
            </h2>

            {sentStatus ? (
              <div className="p-4 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs text-center space-y-1">
                <p className="font-bold">Message Transmitted!</p>
                <p className="text-[11px] text-neutral-300">
                  Thank you for reaching out. Deogenes will get back to you
                  shortly.
                </p>
              </div>
            ) : (
              <>
                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Enter your name..."
                    className="w-full px-3 py-1.5 rounded bg-neutral-950 border border-neutral-700 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-dx0-orange"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="your.email@example.com"
                    className="w-full px-3 py-1.5 rounded bg-neutral-950 border border-neutral-700 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-dx0-orange"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    placeholder="Inquiry / Job Opportunity / Project"
                    className="w-full px-3 py-1.5 rounded bg-neutral-950 border border-neutral-700 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-dx0-orange"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Type your message here..."
                    className="w-full px-3 py-1.5 rounded bg-neutral-950 border border-neutral-700 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-dx0-orange"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 rounded bg-dx0-orange text-black font-bold text-xs flex items-center justify-center gap-2 hover:bg-dx0-orange/90 transition-colors shadow-[0_0_10px_rgba(244,117,34,0.3)]"
                >
                  <FaPaperPlane /> Send Message
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
