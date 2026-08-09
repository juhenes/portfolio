import {
  PERSONAL_INFO,
  EDUCATION_DATA,
  EXPERIENCE_DATA,
  SKILL_CATEGORIES_DATA,
  LEADERSHIP_DATA,
} from '../data/aboutData';
import { PROJECTS_DATA } from '../data/projectsData';
import { AWARDS_DATA } from '../data/awardsData';
import { CERTIFICATIONS_DATA } from '../data/certificationsData';
import { CONTACT_DATA } from '../data/contactData';
import { COMMANDS } from '../data/commands';

export function renderFastfetch() {
  const asciiLogo = [
    '                                  ',
    '                                  ',
    '                                  ',
    '                        ========  ',
    '                      ==+++++++++=',
    '     =====            ===#####++==',
    '     *++==            ===   ==++==',
    '      #===            ===   ==+ ==',
    '  ==== ===  ====  =======   === ==',
    '=+++++====  ++== ===++=== ==++* ==',
    '==   *++==    ======  === ===   ==',
    '==     ===    ++==++  === ===   ==',
    '==     ===    ======  ====++*   ==',
    '==   =====    ==++==  ==++*     ==',
    '++===+++======== =====*++=======++',
    ' *++++ *+++*++++  ++++  *+++++++* ',
    '                                  ',
    '                      ############',
  ];

  const primarySkills = SKILL_CATEGORIES_DATA.flatMap((cat) => cat.skills)
    .slice(0, 7)
    .join(', ');

  const mainEducation = EDUCATION_DATA[0];

  const stats = [
    { key: 'User', val: `${PERSONAL_INFO.name} (juhenes/dx0)` },
    { key: 'Role', val: PERSONAL_INFO.title },
    { key: 'OS', val: 'DX0-Portfolio Linux / WebOS x86_64' },
    {
      key: 'School',
      val: mainEducation?.institution || 'Batangas State University TNEU',
    },
    {
      key: 'Program',
      val: `${mainEducation?.degree || 'BS Computer Science'} (Cum Laude, GWA ${PERSONAL_INFO.gwa})`,
    },
    {
      key: 'Eligibility',
      val: PERSONAL_INFO.cseRating
        ? `Civil Service Prof (${PERSONAL_INFO.cseRating})`
        : 'Civil Service Prof',
    },
    {
      key: 'Scholarship',
      val:
        PERSONAL_INFO.honors.find((h) => h.includes('DOST')) ||
        'DOST JLSS Scholar',
    },
    { key: 'Shell', val: 'dx0-terminal v1.0' },
    {
      key: 'Primary Stack',
      val: primarySkills,
    },
    { key: 'Contact', val: CONTACT_DATA.email },
  ];

  return (
    <div className="font-mono text-xs my-2 flex flex-col md:flex-row gap-4 items-start">
      <div className="text-dx0-orange font-bold select-none leading-none text-xs shrink-0">
        {asciiLogo.map((line, idx) => (
          <div key={idx} className="whitespace-pre">
            {line}
          </div>
        ))}
      </div>
      <div className="flex-1 space-y-1">
        <div className="text-dx0-orange font-bold text-sm">
          dx0@deogenesmaranan.dev
        </div>
        <div className="text-neutral-500">
          -----------------------------------
        </div>
        {stats.map((item, idx) => (
          <div key={idx} className="flex flex-col sm:flex-row sm:gap-2">
            <span className="text-dx0-orange/90 font-semibold w-28 shrink-0">
              {item.key}:
            </span>
            <span className="text-neutral-200">{item.val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function renderWhoami() {
  return (
    <div className="font-mono text-xs my-2 space-y-1.5 p-2 rounded bg-neutral-900/60 border border-dx0-orange/20">
      <div className="text-dx0-orange font-bold text-sm">
        {PERSONAL_INFO.name} (juhenes/dx0)
      </div>
      <div className="text-neutral-300 font-semibold">
        {PERSONAL_INFO.title}
      </div>
      <div className="text-neutral-400">Location: {PERSONAL_INFO.location}</div>
      <div className="text-neutral-400">
        Education: B.S. Computer Science (Cum Laude, GWA: {PERSONAL_INFO.gwa}) |
        DOST JLSS Scholar
      </div>
      <div className="text-neutral-400">
        Civil Service Eligibility: Professional Level ({PERSONAL_INFO.cseRating}
        )
      </div>
      <div className="text-neutral-300 mt-2">{PERSONAL_INFO.summary}</div>
      <div className="text-cyan-400 pt-1">
        GitHub: {CONTACT_DATA.github} | LinkedIn: {CONTACT_DATA.linkedin}
      </div>
    </div>
  );
}

export function renderHelp() {
  const categories = [
    {
      title: 'NAVIGATION COMMANDS',
      cmds: COMMANDS.filter((c) => c.category === 'navigation'),
    },
    {
      title: 'SYSTEM & DISPLAY COMMANDS',
      cmds: COMMANDS.filter(
        (c) => c.category === 'system' || c.category === 'display'
      ),
    },
    {
      title: 'UTILITIES',
      cmds: COMMANDS.filter((c) => c.category === 'utility'),
    },
    {
      title: '🐣 EASTER EGGS',
      cmds: COMMANDS.filter((c) => c.category === 'easter-egg'),
    },
  ];

  return (
    <div className="font-mono text-xs my-2 space-y-3">
      <div className="text-dx0-orange font-bold text-sm">
        DX0 Terminal Commands & Navigation Guide
      </div>
      <div className="text-neutral-400">
        Type any command below or use shortcuts. Autocomplete with Tab key.
      </div>
      {categories.map((cat, i) => (
        <div key={i} className="space-y-1">
          <div className="text-yellow-400 font-semibold border-b border-neutral-800 pb-0.5">
            {cat.title}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 pt-1">
            {cat.cmds.map((cmd) => (
              <div key={cmd.id} className="flex gap-2">
                <span className="text-dx0-orange font-semibold min-w-28 shrink-0">
                  {cmd.cmd}
                </span>
                <span className="text-neutral-300">{cmd.description}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="text-neutral-500 text-[11px] pt-1">
        Tips: You can type section names directly (e.g., &quot;projects&quot;,
        &quot;skills&quot;, &quot;profile&quot;) to navigate.
      </div>
    </div>
  );
}

export function renderLs() {
  const items = [
    {
      name: 'profile/',
      type: 'dir',
      size: '4096',
      desc: 'Personal summary, education & honors',
    },
    {
      name: 'experience/',
      type: 'dir',
      size: '4096',
      desc: 'Software development & internship experience',
    },
    {
      name: 'leadership/',
      type: 'dir',
      size: '4096',
      desc: 'Organizational & CTF challenge leadership',
    },
    {
      name: 'projects/',
      type: 'dir',
      size: '4096',
      desc: 'Featured projects & code repositories',
    },
    {
      name: 'awards/',
      type: 'dir',
      size: '4096',
      desc: 'Cybersecurity CTF & competitive programming awards',
    },
    {
      name: 'certifications/',
      type: 'dir',
      size: '4096',
      desc: 'Civil Service & Cisco certifications',
    },
    {
      name: 'skills/',
      type: 'dir',
      size: '4096',
      desc: 'Languages, frameworks, engines & security tools',
    },
    {
      name: 'contact/',
      type: 'dir',
      size: '4096',
      desc: 'Email, phone, socials & professional profiles',
    },
    {
      name: 'resume.txt',
      type: 'file',
      size: '1460',
      desc: 'Concise developer summary resume',
    },
  ];

  return (
    <div className="font-mono text-xs my-2 space-y-1">
      <div className="text-neutral-400">total {items.length}</div>
      <div className="space-y-0.5">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <span className="text-neutral-500 w-24 select-none hidden sm:inline">
              {item.type === 'dir' ? 'drwxr-xr-x' : '-rw-r--r--'}
            </span>
            <span className="text-neutral-500 w-12 select-none hidden sm:inline">
              {item.size}
            </span>
            <span
              className={`w-32 font-bold ${
                item.type === 'dir' ? 'text-dx0-orange' : 'text-cyan-400'
              }`}
            >
              {item.name}
            </span>
            <span className="text-neutral-400 text-[11px] truncate">
              {item.desc}
            </span>
          </div>
        ))}
      </div>
      <div className="text-neutral-500 text-[11px] pt-1">
        Use &quot;cd &lt;folder&gt;&quot; to navigate or &quot;cat
        &lt;folder&gt;&quot; to view content.
      </div>
    </div>
  );
}

export function renderCat(target: string) {
  const cleanTarget = target
    .toLowerCase()
    .replace('/', '')
    .replace('.txt', '')
    .replace('.json', '')
    .replace('.md', '')
    .trim();

  if (
    cleanTarget === 'profile' ||
    cleanTarget === 'about' ||
    cleanTarget === 'overview' ||
    cleanTarget === 'resume'
  ) {
    return (
      <div className="font-mono text-xs my-2 space-y-2 p-2 rounded bg-neutral-900/40 border border-neutral-800">
        <div className="text-dx0-orange font-bold text-sm border-b border-dx0-orange/30 pb-1">
          === PROFILE & EDUCATION ===
        </div>
        <div>
          <div className="text-white font-bold">{PERSONAL_INFO.name}</div>
          <div className="text-neutral-300">{PERSONAL_INFO.title}</div>
          <div className="text-neutral-400">{PERSONAL_INFO.summary}</div>
        </div>
        <div className="pt-1">
          <div className="text-yellow-400 font-semibold">
            Honors & Qualifications:
          </div>
          {PERSONAL_INFO.honors.map((h, i) => (
            <div key={i} className="text-neutral-300 pl-2">
              • {h}
            </div>
          ))}
        </div>
        <div className="pt-1">
          <div className="text-yellow-400 font-semibold">Education:</div>
          {EDUCATION_DATA.map((edu) => (
            <div key={edu.id} className="pl-2 space-y-0.5">
              <div className="text-white">{edu.institution}</div>
              <div className="text-neutral-300">
                {edu.degree} ({edu.period})
              </div>
              {edu.details?.map((d, i) => (
                <div key={i} className="text-neutral-400 text-[11px] pl-2">
                  - {d}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (cleanTarget === 'experience' || cleanTarget === 'work') {
    return (
      <div className="font-mono text-xs my-2 space-y-2 p-2 rounded bg-neutral-900/40 border border-neutral-800">
        <div className="text-dx0-orange font-bold text-sm border-b border-dx0-orange/30 pb-1">
          === EXPERIENCE ===
        </div>
        {EXPERIENCE_DATA.map((exp) => (
          <div
            key={exp.id}
            className="space-y-1 pb-2 border-b border-neutral-800/60 last:border-0"
          >
            <div className="flex justify-between text-white font-semibold">
              <span>
                {exp.role} @ {exp.company}
              </span>
              <span className="text-neutral-400">{exp.period}</span>
            </div>
            <div className="text-neutral-300">{exp.type}</div>
            {exp.description.map((desc, i) => (
              <div key={i} className="text-neutral-400 pl-2">
                • {desc}
              </div>
            ))}
            <div className="text-cyan-400 text-[11px] pl-2">
              Tech: {exp.technologies.join(', ')}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (cleanTarget === 'leadership') {
    return (
      <div className="font-mono text-xs my-2 space-y-2 p-2 rounded bg-neutral-900/40 border border-neutral-800">
        <div className="text-dx0-orange font-bold text-sm border-b border-dx0-orange/30 pb-1">
          === LEADERSHIP & ORGANIZATIONS ===
        </div>
        {LEADERSHIP_DATA.map((lead) => (
          <div key={lead.id} className="space-y-0.5">
            <div className="text-white font-semibold">{lead.role}</div>
            <div className="text-neutral-300">
              {lead.organization} ({lead.period})
            </div>
            {lead.description && (
              <div className="text-neutral-400 pl-2">• {lead.description}</div>
            )}
          </div>
        ))}
      </div>
    );
  }

  if (cleanTarget === 'projects' || cleanTarget === 'proj') {
    return (
      <div className="font-mono text-xs my-2 space-y-2 p-2 rounded bg-neutral-900/40 border border-neutral-800">
        <div className="text-dx0-orange font-bold text-sm border-b border-dx0-orange/30 pb-1">
          === FEATURED PROJECTS ===
        </div>
        {PROJECTS_DATA.map((proj) => (
          <div
            key={proj.id}
            className="space-y-1 pb-2 border-b border-neutral-800/60 last:border-0"
          >
            <div className="text-white font-bold">{proj.title}</div>
            <div className="text-neutral-300">Role: {proj.role}</div>
            <div className="text-neutral-400">{proj.description}</div>
            <div className="text-cyan-400 text-[11px]">
              Stack: {proj.technologies.join(', ')}
            </div>
            {proj.githubUrl && (
              <div className="text-neutral-500 text-[11px]">
                Repo: {proj.githubUrl}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  if (cleanTarget === 'awards' || cleanTarget === 'achievements') {
    return (
      <div className="font-mono text-xs my-2 space-y-2 p-2 rounded bg-neutral-900/40 border border-neutral-800">
        <div className="text-dx0-orange font-bold text-sm border-b border-dx0-orange/30 pb-1">
          === AWARDS & COMPETITION RANKINGS ===
        </div>
        <div className="space-y-1">
          {AWARDS_DATA.map((award) => (
            <div key={award.id} className="flex justify-between items-start">
              <div>
                <span className="text-yellow-400 font-semibold">
                  {award.title}
                </span>
                <span className="text-neutral-300"> - {award.event}</span>
                <span className="text-neutral-500"> ({award.organizer})</span>
              </div>
              <span className="text-neutral-400 text-[11px] shrink-0">
                {award.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (cleanTarget === 'certifications' || cleanTarget === 'certs') {
    return (
      <div className="font-mono text-xs my-2 space-y-2 p-2 rounded bg-neutral-900/40 border border-neutral-800">
        <div className="text-dx0-orange font-bold text-sm border-b border-dx0-orange/30 pb-1">
          === CERTIFICATIONS & ELIGIBILITY ===
        </div>
        {CERTIFICATIONS_DATA.map((cert) => (
          <div key={cert.id} className="flex justify-between items-start">
            <div>
              <div className="text-white font-semibold">{cert.name}</div>
              <div className="text-neutral-400 text-[11px]">
                {cert.issuer} {cert.rating ? `| ${cert.rating}` : ''}
              </div>
            </div>
            <div className="text-neutral-400 text-[11px] shrink-0">
              {cert.date}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (cleanTarget === 'skills') {
    return (
      <div className="font-mono text-xs my-2 space-y-2 p-2 rounded bg-neutral-900/40 border border-neutral-800">
        <div className="text-dx0-orange font-bold text-sm border-b border-dx0-orange/30 pb-1">
          === TECHNICAL SKILLS ===
        </div>
        {SKILL_CATEGORIES_DATA.map((cat) => (
          <div key={cat.id} className="space-y-0.5">
            <div className="text-yellow-400 font-semibold">{cat.category}:</div>
            <div className="text-neutral-300 pl-2">{cat.skills.join(', ')}</div>
          </div>
        ))}
      </div>
    );
  }

  if (cleanTarget === 'contact') {
    return (
      <div className="font-mono text-xs my-2 space-y-1.5 p-2 rounded bg-neutral-900/40 border border-neutral-800">
        <div className="text-dx0-orange font-bold text-sm border-b border-dx0-orange/30 pb-1">
          === CONTACT & LINKS ===
        </div>
        <div className="text-neutral-300">
          Email: <span className="text-cyan-400">{CONTACT_DATA.email}</span>
        </div>
        <div className="text-neutral-300">
          Phone: <span className="text-white">{CONTACT_DATA.phone}</span>
        </div>
        <div className="text-neutral-300">
          Location: <span className="text-white">{CONTACT_DATA.location}</span>
        </div>
        <div className="text-neutral-300">
          LinkedIn:{' '}
          <span className="text-cyan-400">{CONTACT_DATA.linkedin}</span>
        </div>
        <div className="text-neutral-300">
          GitHub: <span className="text-cyan-400">{CONTACT_DATA.github}</span>
        </div>
        <div className="text-neutral-300">
          LeetCode:{' '}
          <span className="text-cyan-400">{CONTACT_DATA.leetcode}</span>
        </div>
        <div className="text-neutral-300">
          CTFtime: <span className="text-cyan-400">{CONTACT_DATA.ctftime}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="font-mono text-xs my-1 text-red-400">
      cat: {target}: No such file or section. Type &quot;ls&quot; to view
      available sections.
    </div>
  );
}

export function renderNoUiOverview() {
  return (
    <div className="font-mono text-xs my-3 space-y-4 p-4 rounded bg-black border border-dx0-orange/40 text-neutral-200">
      <div className="text-dx0-orange font-bold text-base border-b-2 border-dx0-orange pb-2 text-center select-none">
        ================================================================================
        <br />
        {PERSONAL_INFO.name.toUpperCase()} - TERMINAL PORTFOLIO (NO-UI PURE TEXT
        MODE)
        <br />
        ================================================================================
      </div>

      <div className="text-neutral-400 italic text-center text-[11px]">
        You are now in pure text terminal mode. Type commands like &quot;cd
        projects&quot;, &quot;cat skills&quot;, &quot;fastfetch&quot;, or
        &quot;ui&quot; to exit back to graphical mode.
      </div>

      <div className="space-y-2">
        <div className="text-yellow-400 font-bold text-sm border-b border-neutral-800 pb-1">
          [1] PROFILE & SUMMARY
        </div>
        <div className="text-white font-semibold">{PERSONAL_INFO.name}</div>
        <div className="text-neutral-300">{PERSONAL_INFO.title}</div>
        <div className="text-neutral-400">{PERSONAL_INFO.summary}</div>
        <div className="text-neutral-300 pt-1">
          Honors: {PERSONAL_INFO.honors.join(' | ')}
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-yellow-400 font-bold text-sm border-b border-neutral-800 pb-1">
          [2] WORK EXPERIENCE
        </div>
        {EXPERIENCE_DATA.map((exp) => (
          <div key={exp.id} className="space-y-0.5">
            <div className="text-white font-semibold">
              {exp.role} @ {exp.company} ({exp.period})
            </div>
            {exp.description.map((d, i) => (
              <div key={i} className="text-neutral-400 pl-3">
                • {d}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <div className="text-yellow-400 font-bold text-sm border-b border-neutral-800 pb-1">
          [3] FEATURED PROJECTS
        </div>
        {PROJECTS_DATA.map((proj) => (
          <div key={proj.id} className="space-y-0.5">
            <div className="text-white font-semibold">
              {proj.title} ({proj.role})
            </div>
            <div className="text-neutral-400 pl-3">{proj.description}</div>
            <div className="text-cyan-400 text-[11px] pl-3">
              Technologies: {proj.technologies.join(', ')}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <div className="text-yellow-400 font-bold text-sm border-b border-neutral-800 pb-1">
          [4] TOP COMPETITION AWARDS
        </div>
        {AWARDS_DATA.slice(0, 6).map((award) => (
          <div key={award.id} className="text-neutral-300 pl-3">
            •{' '}
            <span className="text-yellow-400 font-semibold">{award.title}</span>{' '}
            - {award.event} ({award.date})
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <div className="text-yellow-400 font-bold text-sm border-b border-neutral-800 pb-1">
          [5] TECHNICAL SKILLS
        </div>
        {SKILL_CATEGORIES_DATA.map((cat) => (
          <div key={cat.id} className="text-neutral-300 pl-3">
            <span className="text-dx0-orange font-semibold">
              {cat.category}:
            </span>{' '}
            {cat.skills.join(', ')}
          </div>
        ))}
      </div>

      <div className="space-y-1">
        <div className="text-yellow-400 font-bold text-sm border-b border-neutral-800 pb-1">
          [6] CONTACT
        </div>
        <div className="text-neutral-300 pl-3">
          Email: {CONTACT_DATA.email} | Phone: {CONTACT_DATA.phone}
        </div>
        <div className="text-cyan-400 pl-3">
          GitHub: {CONTACT_DATA.github} | LinkedIn: {CONTACT_DATA.linkedin}
        </div>
      </div>

      <div className="text-dx0-orange font-semibold text-center border-t border-dx0-orange/30 pt-2 text-[11px]">
        Type &quot;ui&quot; at any time to return to the original interactive
        graphical layout.
      </div>
    </div>
  );
}
