import { useState } from 'react';
import ScreenContainer from './ScreenContainer';
import Console from './Console';
import { SHORTCUTS } from '../data/shortcuts';
import { COMMANDS } from '../data/commands';

export default function MainInterface() {
  const [commands, setCommands] = useState<string[]>([]);
  const [currentModule, setCurrentModule] = useState<string>('Welcome');
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

  return (
    <ScreenContainer fadeOut={false} className="flex h-screen w-screen">
      {/* Mobile toggle button */}
      {!mobileShortcutsOpen && (
        <button
          onClick={() => setMobileShortcutsOpen(true)}
          aria-label="Toggle shortcuts"
          className="md:hidden fixed top-4.5 left-4 z-50 p-2 text-white"
        >
          ☰
        </button>
      )}

      {/* Mobile drawer overlay */}
      <div
        className={`fixed inset-0 z-40 transition-opacity ${
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
              className="text-white"
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
                className="flex items-center gap-3 rounded px-2 py-2 w-full text-white hover:bg-neutral-800"
              >
                {s.icon &&
                (s.icon.endsWith('.svg') || s.icon.startsWith('/')) ? (
                  <img src={s.icon} alt={s.label} className="h-5 w-5" />
                ) : (
                  <div className="text-lg">{s.icon ?? s.label[0]}</div>
                )}

                <div className="text-sm">{s.label}</div>
              </button>
            ))}
          </div>
        </aside>
      </div>

      <div className="flex w-full">
        {/* Sidebar: hidden on small screens for mobile friendliness */}
        <aside className="hidden md:flex w-24 bg-neutral-900 p-4 flex-col items-center gap-4">
          {SHORTCUTS.map((s) => (
            <button
              key={s.id}
              onClick={() => executeCommand(s.cmd)}
              className="flex flex-col items-center gap-1 h-16 w-16 rounded bg-neutral-800 text-sm font-semibold text-white p-2"
              aria-label={s.label}
            >
              <div className="flex items-center justify-center">
                {s.icon &&
                (s.icon.endsWith('.svg') || s.icon.startsWith('/')) ? (
                  <img src={s.icon} alt={s.label} className="h-6 w-6" />
                ) : (
                  <div className="text-xl">{s.icon ?? s.label[0]}</div>
                )}
              </div>
              <div className="text-xs text-center">{s.label}</div>
            </button>
          ))}
        </aside>

        <main className="flex-1 p-6 flex flex-col">
          <div className="mb-4 pl-8 md:pl-0">
            <h2 className="text-lg font-semibold">{currentModule}</h2>
          </div>

          {/* Module content or expanded console for terminal-only commands */}
          <div className="flex-1 border rounded bg-neutral-950 p-4">
            {consoleFullscreen ? (
              <Console
                commands={commands}
                onExecute={executeCommand}
                expanded={true}
              />
            ) : (
              <div className="h-full">
                <p className="text-sm text-dx0-orange/60">
                  Module content for {currentModule}
                </p>
              </div>
            )}
          </div>

          {!consoleFullscreen && (
            <div className="mt-4">
              <Console commands={commands} onExecute={executeCommand} />
            </div>
          )}
        </main>
      </div>
    </ScreenContainer>
  );
}
