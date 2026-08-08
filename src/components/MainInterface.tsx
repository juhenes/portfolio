import { useState } from 'react';
import ScreenContainer from './ScreenContainer';
import Console from './Console';
import AboutModule from './modules/AboutModule';
import ProjectsModule from './modules/ProjectsModule';
import AwardsModule from './modules/AwardsModule';
import CertificationsModule from './modules/CertificationsModule';
import ContactModule from './modules/ContactModule';
import { SHORTCUTS } from '../data/shortcuts';
import { COMMANDS } from '../data/commands';

import TopBar from './TopBar';

export default function MainInterface() {
  const [commands, setCommands] = useState<string[]>([]);
  const [currentModule, setCurrentModule] = useState<string>('About');
  const [consoleFullscreen, setConsoleFullscreen] = useState<boolean>(false);
  const [mobileShortcutsOpen, setMobileShortcutsOpen] =
    useState<boolean>(false);

  function executeCommand(cmd: string) {
    const def = COMMANDS.find((c) => c.cmd === cmd);

    if (def && def.cmd === 'clear') {
      setCommands([]);
      return;
    }

    setCommands((s) => [...s, cmd]);

    if (def && def.terminalOnly) {
      setConsoleFullscreen(true);
      setCurrentModule('Console');
      return;
    }

    setConsoleFullscreen(false);

    if (cmd.startsWith('open ')) {
      setCurrentModule(cmd.replace('open ', ''));
    }
  }

  function renderModuleContent() {
    switch (currentModule) {
      case 'About':
      case 'Welcome':
        return <AboutModule />;
      case 'Projects':
        return <ProjectsModule />;
      case 'Awards':
        return <AwardsModule />;
      case 'Certifications':
      case 'Certs':
      case 'Certifications / Licenses':
        return <CertificationsModule />;
      case 'Contact':
        return <ContactModule />;
      default:
        return (
          <div className="h-full flex items-center justify-center">
            <p className="text-sm text-dx0-orange/60 font-mono">
              Module content for {currentModule}
            </p>
          </div>
        );
    }
  }

  return (
    <ScreenContainer
      fadeOut={false}
      className="flex flex-col h-screen w-screen overflow-hidden bg-black"
    >
      <TopBar
        currentModule={currentModule}
        onOpenMobileMenu={() => setMobileShortcutsOpen(true)}
      />

      {/* Mobile drawer overlay */}
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
                  currentModule === s.label
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
        {/* Clean Sidebar: Removed 'NAV' header text */}
        <aside className="hidden md:flex w-20 bg-neutral-900/90 p-2 flex-col items-center gap-2.5 border-r border-neutral-800 flex-shrink-0">
          {SHORTCUTS.map((s) => {
            const isActive =
              currentModule === s.label ||
              (s.id === 'about' && currentModule === 'Welcome');
            return (
              <button
                key={s.id}
                onClick={() => executeCommand(s.cmd)}
                className={`flex flex-col items-center justify-center gap-1 h-14 w-16 rounded text-xs font-semibold p-1.5 transition-all ${
                  isActive
                    ? 'bg-dx0-orange text-black shadow-[0_0_10px_rgba(244,117,34,0.4)]'
                    : 'bg-neutral-800/80 text-white hover:bg-neutral-700'
                }`}
                aria-label={s.label}
              >
                <div className="text-lg">{s.icon ?? s.label[0]}</div>
                <div className="text-[10px] text-center leading-tight">
                  {s.label}
                </div>
              </button>
            );
          })}
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-3 md:p-5 flex flex-col min-h-0 overflow-hidden">
          {/* Module Content Container */}
          <div className="flex-1 border border-neutral-800 rounded-lg bg-neutral-950 p-4 overflow-hidden flex flex-col min-h-0">
            {consoleFullscreen ? (
              <Console
                commands={commands}
                onExecute={executeCommand}
                expanded={true}
              />
            ) : (
              renderModuleContent()
            )}
          </div>

          {!consoleFullscreen && (
            <div className="mt-3 flex-shrink-0">
              <Console commands={commands} onExecute={executeCommand} />
            </div>
          )}
        </main>
      </div>
    </ScreenContainer>
  );
}
