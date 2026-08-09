import { useState, memo } from 'react';
import { CONTACT_DATA } from '../../data/contactData';
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiCheck,
  FiCopy,
  FiGithub,
  FiLinkedin,
  FiCode,
  FiFlag,
  FiSend,
  FiLoader,
  FiAlertCircle,
} from 'react-icons/fi';

interface ContactSectionProps {
  copiedField: string | null;
  onCopy: (text: string, label: string) => void;
}

function ContactSection({ copiedField, onCopy }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [sentStatus, setSentStatus] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = (await response.json()) as { success?: boolean; error?: string };

      if (response.ok && data.success) {
        setSentStatus(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setErrorMessage(
          data.error || 'Failed to transmit message. Please try again or use direct email.'
        );
      }
    } catch {
      setErrorMessage(
        'Network error or backend function unavailable. If testing locally, deploy to Cloudflare Pages or send directly via email.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="contact"
      className="p-5 rounded-lg bg-neutral-900/80 border border-neutral-800 space-y-4"
    >
      <div className="border-b border-neutral-800 pb-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-dx0-orange flex items-center gap-2">
          <FiMail className="text-dx0-orange" /> Contact & Communication Channel
        </h2>
        <p className="text-xs text-neutral-400 mt-0.5">
          Get in touch for software engineering, game development, web
          development, cybersecurity, or collaboration opportunities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-900 pb-2">
              Direct Contact Details
            </h3>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between p-2.5 rounded bg-neutral-900 border border-neutral-800">
                <div className="flex items-center gap-2.5">
                  <FiMail className="text-dx0-orange text-sm" />
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
                  onClick={() => onCopy(CONTACT_DATA.email, 'email-contact')}
                  className="p-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs cursor-pointer"
                  title="Copy email"
                >
                  {copiedField === 'email-contact' ? (
                    <FiCheck className="text-dx0-orange" />
                  ) : (
                    <FiCopy className="text-dx0-orange" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded bg-neutral-900 border border-neutral-800">
                <div className="flex items-center gap-2.5">
                  <FiPhone className="text-dx0-orange text-sm" />
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
                  onClick={() => onCopy(CONTACT_DATA.phone, 'phone-contact')}
                  className="p-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs cursor-pointer"
                  title="Copy phone number"
                >
                  {copiedField === 'phone-contact' ? (
                    <FiCheck className="text-dx0-orange" />
                  ) : (
                    <FiCopy className="text-dx0-orange" />
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded bg-neutral-900 border border-neutral-800">
                <FiMapPin className="text-dx0-orange text-sm" />
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

          <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-900 pb-2">
              Online Networks & Profiles
            </h3>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={`https://${CONTACT_DATA.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs text-white transition-colors"
              >
                <FiGithub className="text-dx0-orange text-base flex-shrink-0" />
                <div className="min-w-0">
                  <p className="font-bold truncate">GitHub</p>
                  <p className="text-[10px] text-neutral-500 truncate">
                    {CONTACT_DATA.github}
                  </p>
                </div>
              </a>

              <a
                href={`https://${CONTACT_DATA.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs text-white transition-colors"
              >
                <FiLinkedin className="text-dx0-orange text-base flex-shrink-0" />
                <div className="min-w-0">
                  <p className="font-bold truncate">LinkedIn</p>
                  <p className="text-[10px] text-neutral-500 truncate">
                    {CONTACT_DATA.linkedin}
                  </p>
                </div>
              </a>

              <a
                href={`https://${CONTACT_DATA.leetcode}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs text-white transition-colors"
              >
                <FiCode className="text-dx0-orange text-base flex-shrink-0" />
                <div className="min-w-0">
                  <p className="font-bold truncate">LeetCode</p>
                  <p className="text-[10px] text-neutral-500 truncate">
                    {CONTACT_DATA.leetcode}
                  </p>
                </div>
              </a>

              <a
                href={`https://${CONTACT_DATA.ctftime}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs text-white transition-colors"
              >
                <FiFlag className="text-dx0-orange text-base flex-shrink-0" />
                <div className="min-w-0">
                  <p className="font-bold truncate">CTFtime</p>
                  <p className="text-[10px] text-neutral-500 truncate">
                    {CONTACT_DATA.ctftime}
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 flex flex-col justify-between">
          <form onSubmit={handleFormSubmit} className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-900 pb-2">
              Send Direct Message
            </h3>

            {errorMessage && (
              <div className="p-3 rounded bg-red-950/60 border border-red-800/80 text-red-200 text-xs flex items-start gap-2">
                <FiAlertCircle className="text-red-400 text-sm flex-shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed">{errorMessage}</p>
              </div>
            )}

            {sentStatus ? (
              <div className="p-4 rounded bg-dx0-orange/10 border border-dx0-orange/30 text-dx0-orange text-xs text-center space-y-1">
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
                    disabled={isSubmitting}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Enter your name..."
                    className="w-full px-3 py-1.5 rounded bg-neutral-900 border border-neutral-700 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-dx0-orange disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    disabled={isSubmitting}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="your.email@example.com"
                    className="w-full px-3 py-1.5 rounded bg-neutral-900 border border-neutral-700 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-dx0-orange disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    disabled={isSubmitting}
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    placeholder="Inquiry / Job Opportunity / Project"
                    className="w-full px-3 py-1.5 rounded bg-neutral-900 border border-neutral-700 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-dx0-orange disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">
                    Message
                  </label>
                  <textarea
                    required
                    rows={6}
                    disabled={isSubmitting}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Type your message here..."
                    className="w-full px-3 py-1.5 rounded bg-neutral-900 border border-neutral-700 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-dx0-orange disabled:opacity-50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 rounded bg-dx0-orange text-black font-bold text-xs flex items-center justify-center gap-2 hover:bg-dx0-orange/90 transition-colors cursor-pointer shadow-[0_0_10px_rgba(244,117,34,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <FiLoader className="animate-spin text-black" /> Transmitting...
                    </>
                  ) : (
                    <>
                      <FiSend className="text-black" /> Send Message
                    </>
                  )}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default memo(ContactSection);
