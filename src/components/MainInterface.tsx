import { useState, useCallback, useRef, lazy, Suspense } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import ScreenContainer from './ScreenContainer';
import Console from './Console';
import type { ConsoleHistoryItem } from './Console';
import MainContent from './MainContent';
import { SHORTCUTS } from '../data/shortcuts';
import { COMMANDS } from '../data/commands';
import TopBar from './TopBar';
import { FiTerminal, FiX } from 'react-icons/fi';
import {
  renderFastfetch,
  renderWhoami,
  renderHelp,
  renderLs,
  renderCat,
  renderNoUiOverview,
} from '../utils/terminalOutputs';

const MatrixEffect = lazy(() => import('./MatrixEffect'));
const HtopEffect = lazy(() => import('./HtopEffect'));
import {
  loadAliases,
  setAlias,
  removeAlias,
  resolveAlias,
} from '../utils/aliasStorage';
import type { AliasMap } from '../utils/aliasStorage';

function getTerminalCookie(): boolean {
  if (typeof document === 'undefined') return false;
  const match = document.cookie.match(/(?:^|; )dxo_terminal_open=([^;]*)/);
  if (match) {
    return match[1] === 'true';
  }
  return false;
}

function setTerminalCookie(isOpen: boolean) {
  if (typeof document === 'undefined') return;
  const maxAgeDays = 365;
  document.cookie = `dxo_terminal_open=${isOpen}; path=/; max-age=${maxAgeDays * 24 * 60 * 60}; SameSite=Lax`;
}

function getNoUiCookie(): boolean {
  if (typeof document === 'undefined') return false;
  const match = document.cookie.match(/(?:^|; )dxo_terminal_noui=([^;]*)/);
  if (match) {
    return match[1] === 'true';
  }
  return false;
}

function setNoUiCookie(isNoUi: boolean) {
  if (typeof document === 'undefined') return;
  const maxAgeDays = 365;
  document.cookie = `dxo_terminal_noui=${isNoUi}; path=/; max-age=${maxAgeDays * 24 * 60 * 60}; SameSite=Lax`;
}

function getTerminalHeightCookie(): number {
  if (typeof document === 'undefined') return 240;
  const match = document.cookie.match(/(?:^|; )dxo_terminal_height=([^;]*)/);
  if (match) {
    const val = parseInt(match[1], 10);
    if (!isNaN(val) && val >= 120 && val <= 1000) return val;
  }
  return 240;
}

function setTerminalHeightCookie(height: number) {
  if (typeof document === 'undefined') return;
  const maxAgeDays = 365;
  document.cookie = `dxo_terminal_height=${height}; path=/; max-age=${maxAgeDays * 24 * 60 * 60}; SameSite=Lax`;
}

export default function MainInterface() {
  const [history, setHistory] = useState<ConsoleHistoryItem[]>(() => {
    const initialNoUi = getNoUiCookie();
    if (initialNoUi) {
      return [
        {
          id: 'init-noui',
          command: 'no-ui',
          output: renderNoUiOverview(),
        },
      ];
    }
    return [
      {
        id: 'init-fastfetch',
        command: 'fastfetch',
        output: renderFastfetch(),
      },
    ];
  });
  const [activeSection, setActiveSection] = useState<string>('Profile');
  const [isNoUi, setIsNoUi] = useState<boolean>(() => getNoUiCookie());
  const [consoleFullscreen, setConsoleFullscreen] = useState<boolean>(() =>
    getNoUiCookie()
  );
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(() =>
    getTerminalCookie()
  );
  const [mobileShortcutsOpen, setMobileShortcutsOpen] =
    useState<boolean>(false);
  const [terminalHeight, setTerminalHeight] = useState<number>(() =>
    getTerminalHeightCookie()
  );
  const [showMatrix, setShowMatrix] = useState<boolean>(false);
  const [showHtop, setShowHtop] = useState<boolean>(false);
  const [aliases, setAliases] = useState<AliasMap>(() => loadAliases());
  const consoleWrapperRef = useRef<HTMLDivElement | null>(null);

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
    (rawCmd: string) => {
      const trimmed = rawCmd.trim();
      if (!trimmed) return;

      const resolved = resolveAlias(trimmed, aliases);
      const lower = resolved.toLowerCase();
      const itemId =
        Date.now().toString() + Math.random().toString().slice(2, 6);

      if (lower === 'clear' || lower === 'cls') {
        setHistory([]);
        return;
      }

      if (lower === 'close' || lower === 'minimize' || lower === 'hide') {
        if (!isNoUi && !consoleFullscreen) {
          setIsTerminalOpen(false);
          setTerminalCookie(false);
        }
        setHistory((prev) => [
          ...prev,
          {
            id: itemId,
            command: trimmed,
            output: (
              <div className="text-neutral-400 font-mono text-xs my-1">
                Terminal minimized.
              </div>
            ),
          },
        ]);
        return;
      }

      if (lower === 'matrix' || lower === 'neo' || lower === 'thematrix') {
        setShowMatrix(true);
        setHistory((prev) => [
          ...prev,
          {
            id: itemId,
            command: trimmed,
            output: (
              <div className="text-green-400 font-mono text-xs my-1">
                Wake up, Neo... The Matrix has you.
              </div>
            ),
          },
        ]);
        return;
      }

      if (lower === 'htop' || lower === 'top') {
        setShowHtop(true);
        setHistory((prev) => [
          ...prev,
          {
            id: itemId,
            command: trimmed,
            output: (
              <div className="text-green-400 font-mono text-xs my-1">
                Launching htop...
              </div>
            ),
          },
        ]);
        return;
      }

      if (resolved.toLowerCase().startsWith('alias')) {
        const rest = resolved.slice(5).trim();
        if (!rest) {
          const currentAliases = Object.entries(aliases);
          setHistory((prev) => [
            ...prev,
            {
              id: itemId,
              command: trimmed,
              output: (
                <div className="font-mono text-xs my-1 space-y-0.5">
                  {currentAliases.length === 0 ? (
                    <div className="text-neutral-400">No aliases defined.</div>
                  ) : (
                    currentAliases.map(([name, cmd]) => (
                      <div key={name}>
                        <span className="text-dx0-orange font-semibold">
                          alias{' '}
                        </span>
                        <span className="text-yellow-300">{name}</span>
                        <span className="text-neutral-400">=</span>
                        <span className="text-emerald-400">
                          &apos;{cmd}&apos;
                        </span>
                      </div>
                    ))
                  )}
                </div>
              ),
            },
          ]);
          return;
        }
        const eqIdx = rest.indexOf('=');
        if (eqIdx === -1) {
          const single = aliases[rest.toLowerCase()];
          setHistory((prev) => [
            ...prev,
            {
              id: itemId,
              command: trimmed,
              output: single ? (
                <div className="font-mono text-xs my-1">
                  <span className="text-dx0-orange font-semibold">alias </span>
                  <span className="text-yellow-300">{rest.toLowerCase()}</span>
                  <span className="text-neutral-400">=</span>
                  <span className="text-emerald-400">&apos;{single}&apos;</span>
                </div>
              ) : (
                <div className="text-red-400 font-mono text-xs my-1">
                  alias: {rest}: not found
                </div>
              ),
            },
          ]);
          return;
        }
        const aliasName = rest.slice(0, eqIdx).trim().toLowerCase();
        const aliasCmd = rest
          .slice(eqIdx + 1)
          .trim()
          .replace(/^['"](.*)['"]$/, '$1');
        if (!aliasName || !aliasCmd) {
          setHistory((prev) => [
            ...prev,
            {
              id: itemId,
              command: trimmed,
              output: (
                <div className="text-red-400 font-mono text-xs my-1">
                  Usage: alias name=command
                </div>
              ),
            },
          ]);
          return;
        }
        const updated = setAlias(aliasName, aliasCmd);
        setAliases(updated);
        setHistory((prev) => [
          ...prev,
          {
            id: itemId,
            command: trimmed,
            output: (
              <div className="text-emerald-400 font-mono text-xs my-1">
                ✓ Alias set:{' '}
                <span className="text-yellow-300">{aliasName}</span> →{' '}
                <span className="text-white">{aliasCmd}</span>
              </div>
            ),
          },
        ]);
        return;
      }

      if (resolved.toLowerCase().startsWith('unalias')) {
        const name = resolved.slice(7).trim().toLowerCase();
        if (!name) {
          setHistory((prev) => [
            ...prev,
            {
              id: itemId,
              command: trimmed,
              output: (
                <div className="text-red-400 font-mono text-xs my-1">
                  Usage: unalias &lt;name&gt;
                </div>
              ),
            },
          ]);
          return;
        }
        const { aliases: updated, found } = removeAlias(name);
        setAliases(updated);
        setHistory((prev) => [
          ...prev,
          {
            id: itemId,
            command: trimmed,
            output: found ? (
              <div className="text-emerald-400 font-mono text-xs my-1">
                ✓ Alias &apos;{name}&apos; removed.
              </div>
            ) : (
              <div className="text-red-400 font-mono text-xs my-1">
                unalias: {name}: not found
              </div>
            ),
          },
        ]);
        return;
      }

      if (
        lower === 'no-ui' ||
        lower === 'noui' ||
        lower === 'cli' ||
        lower === 'terminal-only' ||
        lower === 'text-mode'
      ) {
        setIsNoUi(true);
        setConsoleFullscreen(true);
        setIsTerminalOpen(true);
        setNoUiCookie(true);
        setHistory((prev) => [
          ...prev,
          {
            id: itemId,
            command: trimmed,
            output: renderNoUiOverview(),
          },
        ]);
        return;
      }

      if (
        lower === 'ui' ||
        lower === 'gui' ||
        lower === 'exit-terminal' ||
        lower === 'exit' ||
        lower === 'normal-mode'
      ) {
        setIsNoUi(false);
        setConsoleFullscreen(false);
        setNoUiCookie(false);
        setHistory((prev) => [
          ...prev,
          {
            id: itemId,
            command: trimmed,
            output: (
              <div className="text-emerald-400 font-mono text-xs my-1">
                ✓ Switched back to graphical UI mode.
              </div>
            ),
          },
        ]);
        return;
      }

      if (
        lower === 'fastfetch' ||
        lower === 'neofetch' ||
        lower === 'fetch' ||
        lower === 'sysinfo'
      ) {
        setHistory((prev) => [
          ...prev,
          {
            id: itemId,
            command: trimmed,
            output: renderFastfetch(),
          },
        ]);
        return;
      }

      if (
        lower === 'whoami' ||
        lower === 'user' ||
        lower === 'bio' ||
        lower === 'about-me'
      ) {
        setHistory((prev) => [
          ...prev,
          {
            id: itemId,
            command: trimmed,
            output: renderWhoami(),
          },
        ]);
        return;
      }

      if (
        lower === 'help' ||
        lower === '?' ||
        lower === 'commands' ||
        lower === 'man'
      ) {
        setHistory((prev) => [
          ...prev,
          {
            id: itemId,
            command: trimmed,
            output: renderHelp(),
          },
        ]);
        return;
      }

      if (lower === 'ls' || lower === 'dir' || lower === 'list') {
        setHistory((prev) => [
          ...prev,
          {
            id: itemId,
            command: trimmed,
            output: renderLs(),
          },
        ]);
        return;
      }

      if (lower === 'pwd') {
        setHistory((prev) => [
          ...prev,
          {
            id: itemId,
            command: trimmed,
            output: (
              <div className="text-neutral-300 font-mono text-xs my-1">
                /home/juhenes/portfolio/{activeSection.toLowerCase()}
              </div>
            ),
          },
        ]);
        return;
      }

      if (lower === 'history') {
        setHistory((prev) => [
          ...prev,
          {
            id: itemId,
            command: trimmed,
            output: (
              <div className="font-mono text-xs my-1 text-neutral-300 space-y-0.5">
                {prev.map((h, index) => (
                  <div key={h.id}>
                    <span className="text-neutral-500 w-8 inline-block">
                      {index + 1}
                    </span>{' '}
                    {h.command}
                  </div>
                ))}
              </div>
            ),
          },
        ]);
        return;
      }

      if (lower.startsWith('cat ')) {
        const fileTarget = trimmed.slice(4).trim();
        setHistory((prev) => [
          ...prev,
          {
            id: itemId,
            command: trimmed,
            output: renderCat(fileTarget),
          },
        ]);
        return;
      }

      let navTarget = '';
      if (lower.startsWith('cd ')) {
        navTarget = trimmed.slice(3).trim();
      } else if (lower.startsWith('open ')) {
        navTarget = trimmed.slice(5).trim();
      } else if (lower.startsWith('goto ')) {
        navTarget = trimmed.slice(5).trim();
      } else {
        const directSection = [
          'profile',
          'experience',
          'leadership',
          'projects',
          'awards',
          'certifications',
          'certs',
          'skills',
          'contact',
          'about',
        ].find((s) => s === lower);
        if (directSection) {
          navTarget = directSection;
        }
      }

      if (navTarget) {
        const capitalized =
          navTarget.charAt(0).toUpperCase() + navTarget.slice(1);

        if (isNoUi) {
          setActiveSection(capitalized);
          setHistory((prev) => [
            ...prev,
            {
              id: itemId,
              command: trimmed,
              output: renderCat(navTarget),
            },
          ]);
        } else {
          scrollToSectionId(capitalized);
          setHistory((prev) => [
            ...prev,
            {
              id: itemId,
              command: trimmed,
              output: (
                <div className="font-mono text-xs my-1">
                  ✓ Navigated to {capitalized} section.
                </div>
              ),
            },
          ]);
        }
        return;
      }

      const foundCmd = COMMANDS.find(
        (c) => c.cmd.toLowerCase() === lower || c.aliases?.includes(lower)
      );

      if (foundCmd && foundCmd.terminalOnly) {
        setConsoleFullscreen(true);
        setIsTerminalOpen(true);
      }

      setHistory((prev) => [
        ...prev,
        {
          id: itemId,
          command: trimmed,
          output: (
            <div className="text-red-400 font-mono text-xs my-1">
              Command not recognized: &quot;{trimmed}&quot;. Type{' '}
              <span className="font-bold underline">help</span> for a list of
              available commands.
            </div>
          ),
          isError: true,
        },
      ]);
    },
    [activeSection, isNoUi, scrollToSectionId, aliases, consoleFullscreen]
  );

  const handleSectionVisible = useCallback((secLabel: string) => {
    setActiveSection((prev) => (prev === secLabel ? prev : secLabel));
  }, []);

  const handleOpenMobileMenu = useCallback(() => {
    setMobileShortcutsOpen(true);
  }, []);

  const handleExitNoUi = useCallback(() => {
    executeCommand('ui');
  }, [executeCommand]);

  const handleResizeStart = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      const startY = e.clientY;
      const startHeight = terminalHeight;
      let rafId: number | null = null;
      let latestHeight = startHeight;

      function handleMouseMove(moveEvent: MouseEvent) {
        const deltaY = startY - moveEvent.clientY;
        latestHeight = Math.min(
          Math.max(startHeight + deltaY, 120),
          window.innerHeight - 150
        );

        if (!rafId) {
          rafId = requestAnimationFrame(() => {
            try {
              const wrapper = consoleWrapperRef.current;
              const el = wrapper?.querySelector(
                '.dx0-console'
              ) as HTMLDivElement | null;
              if (el) {
                el.style.height = `${latestHeight}px`;
              }
            } finally {
              rafId = null;
            }
          });
        }
      }

      function handleMouseUp() {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
        setTerminalHeight(latestHeight);
        setTerminalHeightCookie(latestHeight);
        document.body.style.userSelect = '';
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      }

      document.body.style.userSelect = 'none';
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    },
    [terminalHeight]
  );

  return (
    <ScreenContainer
      fadeOut={false}
      className="flex flex-col h-screen w-screen overflow-hidden bg-black"
    >
      <Suspense fallback={null}>
        {showMatrix && <MatrixEffect onExit={() => setShowMatrix(false)} />}
        {showHtop && <HtopEffect onExit={() => setShowHtop(false)} />}
      </Suspense>
      {!isNoUi && (
        <TopBar
          currentModule={activeSection}
          onOpenMobileMenu={handleOpenMobileMenu}
        />
      )}

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
              className="text-neutral-400 hover:text-dx0-orange p-1 transition-colors cursor-pointer"
              aria-label="Close shortcuts menu"
            >
              <FiX className="text-lg text-dx0-orange" />
            </button>
          </div>

          <div className="flex flex-col items-start gap-3">
            {SHORTCUTS.map((s) => {
              const isActive = activeSection === s.label;
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    executeCommand(s.cmd);
                    setMobileShortcutsOpen(false);
                  }}
                  className={`flex items-center gap-3 rounded px-2.5 py-2 w-full text-sm font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-dx0-orange text-black font-bold'
                      : 'text-white hover:bg-neutral-800'
                  }`}
                >
                  <s.Icon
                    className={`text-base ${isActive ? 'text-black' : 'text-dx0-orange'}`}
                  />
                  <div>{s.label}</div>
                </button>
              );
            })}
          </div>
        </aside>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <main
          id="main-content"
          tabIndex={-1}
          className={`flex-1 flex flex-col min-h-0 overflow-hidden relative ${
            isNoUi ? 'p-0' : 'p-3 md:p-5'
          }`}
        >
          {!isNoUi && (
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
                    <s.Icon className="text-sm md:hidden text-dx0-orange" />
                    <span className="hidden md:inline truncate">{s.label}</span>
                  </button>
                );
              })}
            </nav>
          )}

          <div
            className={`flex-1 overflow-hidden flex flex-col min-h-0 ${
              isNoUi
                ? ''
                : 'border border-neutral-800 rounded-lg bg-neutral-950'
            }`}
          >
            {consoleFullscreen || isNoUi ? (
              <Console
                history={history}
                onExecute={executeCommand}
                expanded={true}
                isNoUi={isNoUi}
                activeSection={activeSection}
                onExitNoUi={handleExitNoUi}
              />
            ) : (
              <MainContent onSectionVisible={handleSectionVisible} />
            )}
          </div>

          {!consoleFullscreen && !isNoUi && isTerminalOpen && (
            <>
              <div
                onMouseDown={handleResizeStart}
                title="Drag to resize terminal height"
                aria-label="Drag to resize terminal height"
                className="w-full py-1 cursor-row-resize flex items-center justify-center group select-none shrink-0"
              >
                <div className="w-10 h-[2px] rounded-full bg-neutral-700/80 group-hover:bg-dx0-orange transition-colors" />
              </div>
              <div ref={consoleWrapperRef} className="flex-shrink-0 relative">
                <Console
                  history={history}
                  onExecute={executeCommand}
                  activeSection={activeSection}
                  height={terminalHeight}
                  onMinimize={() => handleTerminalToggle(false)}
                  onMaximize={() => executeCommand('no-ui')}
                />
              </div>
            </>
          )}

          {!isTerminalOpen && !consoleFullscreen && !isNoUi && (
            <button
              onClick={() => handleTerminalToggle(true)}
              title="Open Terminal Console"
              aria-label="Open Terminal Console"
              className="fixed bottom-5 right-5 z-40 flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-900/95 text-dx0-orange border border-dx0-orange/50 hover:bg-dx0-orange hover:text-black font-semibold text-xs transition-all shadow-[0_0_20px_rgba(244,117,34,0.4)] backdrop-blur-md cursor-pointer animate-in fade-in zoom-in-95 duration-200"
            >
              <FiTerminal className="text-sm text-current" />
              <span>Terminal</span>
            </button>
          )}
        </main>
      </div>
    </ScreenContainer>
  );
}
