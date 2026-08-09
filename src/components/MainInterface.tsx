import { useState, useCallback } from 'react';
import ScreenContainer from './ScreenContainer';
import Console from './Console';
import MainContent from './MainContent';
import { SHORTCUTS } from '../data/shortcuts';
import { COMMANDS } from '../data/commands';
import { FiX, FiTerminal } from 'react-icons/fi';

import TopBar from './TopBar';

function getTerminalCookie(): boolean {
  if (typeof document === 'undefined') return true;
  const match = document.cookie.match(/(?:^|; )dxo_terminal_open=([^;]*)/);
  if (match) {
    return match[1] === 'true';
  }
  return true;
}

function setTerminalCookie(isOpen: boolean) {
  if (typeof document === 'undefined') return;
  const maxAgeDays = 365;
  document.cookie = `dxo_terminal_open=${isOpen}; path=/; max-age=${maxAgeDays * 24 * 60 * 60}; SameSite=Lax`;
}

export default function MainInterface() {
  const [commands, setCommands] = useState<string[]>([]);
  const [activeSection, setActiveSection] = useState<string>('Profile');
  const [consoleFullscreen, setConsoleFullscreen] = useState<boolean>(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(() =>
    getTerminalCookie()
  );
  const [mobileShortcutsOpen, setMobileShortcutsOpen] =
    useState<boolean>(false);

  const handleTerminalToggle = useCallback((open: boolean) => {
    setIsTerminalOpen(open);
    setTerminalCookie(open);
  }, []);

  const scrollToSectionId = useCallback((sectionName: string) => {
    const targetMap: Record<string, { id: string; label: string }> = {
      Profile: { id: 'profile', label: 'Profile' },
      Overview: { id: 'profile', label: 'Profile' },
      About: { id: 'profile', label: 'Profile' },
      Welcome: { id: 'profile', label: 'Profile' },
      Education: { id: 'profile', label: 'Profile' },
      Biography: { id: 'profile', label: 'Profile' },
      Bio: { id: 'profile', label: 'Profile' },
      Experience: { id: 'experience', label: 'Experience' },
      Leadership: { id: 'leadership', label: 'Leadership' },
      Projects: { id: 'projects', label: 'Projects' },
      Awards: { id: 'awards', label: 'Awards' },
      Certifications: { id: 'certifications', label: 'Certs' },
      Certs: { id: 'certifications', label: 'Certs' },
      'Certifications / Licenses': { id: 'certifications', label: 'Certs' },
      Skills: { id: 'skills', label: 'Skills' },
      Contact: { id: 'contact', label: 'Contact' },
    };

    const target = targetMap[sectionName] || {
      id: sectionName.toLowerCase(),
      label: sectionName,
    };
    setActiveSection(target.label);

    const el = document.getElementById(target.id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const executeCommand = useCallback(
    (cmd: string) => {
      const def = COMMANDS.find((c) => c.cmd === cmd);

      if (def && def.cmd === 'clear') {
        setCommands([]);
        return;
      }

      setCommands((s) => [...s, cmd]);

      if (def && def.terminalOnly) {
        setConsoleFullscreen(true);
        setIsTerminalOpen(true);
        return;
      }

      setConsoleFullscreen(false);

      if (cmd.startsWith('open ')) {
        const sectionName = cmd.replace('open ', '');
        scrollToSectionId(sectionName);
      }
    },
    [scrollToSectionId]
  );

  const handleSectionVisible = useCallback((secLabel: string) => {
    setActiveSection((prev) => (prev === secLabel ? prev : secLabel));
  }, []);

  const handleOpenMobileMenu = useCallback(() => {
    setMobileShortcutsOpen(true);
  }, []);

  return (
    <ScreenContainer
      fadeOut={false}
      className="flex flex-col h-screen w-screen overflow-hidden bg-black"
    >
      <TopBar
        currentModule={activeSection}
        onOpenMobileMenu={handleOpenMobileMenu}
      />

      <div
        className={`fixed inset-0 z-50 transition-opacity ${
          mobileShortcutsOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileShortcutsOpen(false)}
      >
        <div className="absolute inset-0 bg-black/50" />

        <aside
          className={`absolute top-0 left-0 h-full w-64 bg-neutral-900 p-4 transform transition-transform ${
            mobileShortcutsOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <div className="text-white font-semibold">Shortcuts</div>
            <button
              onClick={() => setMobileShortcutsOpen(false)}
              className="text-white text-xl"
            >
              ×
            </button>
          </div>

          <div className="flex flex-col items-start gap-3">
            {SHORTCUTS.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  executeCommand(s.cmd);
                  setMobileShortcutsOpen(false);
                }}
                className={`flex items-center gap-3 rounded px-2.5 py-2 w-full text-sm font-semibold transition-colors ${
                  activeSection === s.label
                    ? 'bg-dx0-orange text-black font-bold'
                    : 'text-white hover:bg-neutral-800'
                }`}
              >
                <div className="text-lg">{s.icon ?? s.label[0]}</div>
                <div>{s.label}</div>
              </button>
            ))}
          </div>
        </aside>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 p-3 md:p-5 flex flex-col min-h-0 overflow-hidden relative">
          <nav className="w-full flex items-center justify-between pb-2 mb-2 flex-shrink-0 text-xs select-none font-mono">
            {SHORTCUTS.map((s) => {
              const isActive = activeSection === s.label;
              return (
                <button
                  key={s.id}
                  onClick={() => executeCommand(s.cmd)}
                  title={s.label}
                  aria-label={s.label}
                  className={`flex-1 flex items-center justify-center py-1.5 transition-all text-xs cursor-pointer border-b-2 ${
                    isActive
                      ? 'text-dx0-orange font-bold border-dx0-orange'
                      : 'text-neutral-400 hover:text-neutral-200 border-transparent'
                  }`}
                >
                  <span className="text-sm md:hidden">{s.icon}</span>
                  <span className="hidden md:inline truncate">{s.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="flex-1 border border-neutral-800 rounded-lg bg-neutral-950 p-4 overflow-hidden flex flex-col min-h-0">
            {consoleFullscreen ? (
              <Console
                commands={commands}
                onExecute={executeCommand}
                expanded={true}
              />
            ) : (
              <MainContent onSectionVisible={handleSectionVisible} />
            )}
          </div>

          {!consoleFullscreen && isTerminalOpen && (
            <div className="mt-3 flex-shrink-0 relative">
              <button
                onClick={() => handleTerminalToggle(false)}
                title="Hide Terminal Console"
                aria-label="Hide Terminal Console"
                className="absolute top-2 right-2 z-10 p-1 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded transition-colors"
              >
                <FiX className="text-xs" />
              </button>
              <Console commands={commands} onExecute={executeCommand} />
            </div>
          )}

          {!isTerminalOpen && !consoleFullscreen && (
            <button
              onClick={() => handleTerminalToggle(true)}
              title="Open Terminal Console"
              aria-label="Open Terminal Console"
              className="fixed bottom-5 right-5 z-40 flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-900/95 text-dx0-orange border border-dx0-orange/50 hover:bg-dx0-orange hover:text-black font-semibold text-xs transition-all shadow-[0_0_20px_rgba(244,117,34,0.4)] backdrop-blur-md cursor-pointer animate-in fade-in zoom-in-95 duration-200"
            >
              <FiTerminal className="text-sm" />
              <span>Terminal</span>
            </button>
          )}
        </main>
      </div>
    </ScreenContainer>
  );
}





