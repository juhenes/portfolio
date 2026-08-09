import { useRef, useEffect, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { COMMANDS } from '../data/commands';
import { FiMinus, FiMaximize2 } from 'react-icons/fi';

export interface ConsoleHistoryItem {
  id: string;
  command: string;
  output?: React.ReactNode;
  isError?: boolean;
}

interface ConsoleProps {
  history: ConsoleHistoryItem[];
  onExecute: (cmd: string) => void;
  expanded?: boolean;
  isNoUi?: boolean;
  activeSection?: string;
  onExitNoUi?: () => void;
  height?: number;
  onMinimize?: () => void;
  onMaximize?: () => void;
}

export default function Console({
  history,
  onExecute,
  expanded = false,
  isNoUi = false,
  activeSection = 'profile',
  onExitNoUi,
  height = 220,
  onMinimize,
  onMaximize,
}: ConsoleProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const commandList = history.map((h) => h.command).filter(Boolean);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  function submit() {
    const val = inputRef.current?.value ?? '';
    if (!val.trim()) return;
    onExecute(val.trim());
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    setHistoryIndex(-1);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      submit();
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandList.length === 0) return;
      const nextIdx =
        historyIndex === -1
          ? commandList.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      if (inputRef.current) {
        inputRef.current.value = commandList[nextIdx] || '';
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= commandList.length) {
        setHistoryIndex(-1);
        if (inputRef.current) inputRef.current.value = '';
      } else {
        setHistoryIndex(nextIdx);
        if (inputRef.current) {
          inputRef.current.value = commandList[nextIdx] || '';
        }
      }
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const currentVal = inputRef.current?.value ?? '';
      if (!currentVal.trim()) return;

      const candidates = [
        'help',
        'whoami',
        'fastfetch',
        'no-ui',
        'ui',
        'clear',
        'history',
        'ls',
        'dir',
        'pwd',
        'contact',
        'cd profile',
        'cd experience',
        'cd leadership',
        'cd projects',
        'cd awards',
        'cd certifications',
        'cd skills',
        'cd contact',
        'cat profile',
        'cat experience',
        'cat leadership',
        'cat projects',
        'cat awards',
        'cat certifications',
        'cat skills',
        'cat contact',
        ...COMMANDS.map((c) => c.cmd),
      ];

      const match = candidates.find((c) =>
        c.toLowerCase().startsWith(currentVal.toLowerCase())
      );
      if (match && inputRef.current) {
        inputRef.current.value = match;
      }
    }
  }

  return (
    <div
      style={expanded ? undefined : { height: `${height}px` }}
      className={`w-full rounded-lg border border-dx0-orange/30 bg-black text-dx0-orange font-mono shadow-2xl flex flex-col min-h-0 relative overflow-hidden ${
        expanded ? 'h-full flex-1' : ''
      } dx0-console`}
    >
      {!expanded && (onMinimize || onMaximize) && (
        <div className="absolute top-2 right-2.5 z-10 flex items-center gap-1.5">
          {onMaximize && (
            <button
              onClick={onMaximize}
              title="Maximize to pure text mode (no-ui)"
              aria-label="Maximize terminal to pure text mode"
              className="p-1 text-neutral-400 hover:text-dx0-orange transition-colors cursor-pointer"
            >
              <FiMaximize2 className="text-xs" />
            </button>
          )}
          {onMinimize && (
            <button
              onClick={onMinimize}
              title="Minimize Terminal"
              aria-label="Minimize Terminal"
              className="p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <FiMinus className="text-xs" />
            </button>
          )}
        </div>
      )}

      {isNoUi && (
        <div className="bg-dx0-orange text-black px-4 py-1.5 flex items-center justify-between text-xs font-bold shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span>FULLSCREEN TERMINAL MODE (NO-UI) - PURE TEXT ONLY</span>
          </div>
          {onExitNoUi && (
            <button
              onClick={onExitNoUi}
              className="bg-black text-dx0-orange hover:bg-neutral-900 px-2 py-0.5 rounded text-[11px] font-semibold border border-black transition-colors"
            >
              Switch to GUI (&quot;ui&quot;)
            </button>
          )}
        </div>
      )}

      <div
        ref={scrollRef}
        className="overflow-y-auto text-sm leading-relaxed flex-1 min-h-0 [scrollbar-gutter:stable] pr-2"
      >
        <div className="p-4">
          {history.length === 0 ? (
            <div className="text-neutral-400 space-y-1 my-1">
              <div className="text-dx0-orange font-bold">
                DX0 Portfolio Interactive Terminal Shell v2.5.0
              </div>
              <div>
                Type <span className="text-dx0-orange font-bold">help</span> to
                view available commands,{' '}
                <span className="text-yellow-400 font-bold">fastfetch</span> for
                specs, or{' '}
                <span className="text-emerald-400 font-bold">no-ui</span> for
                full-screen pure text mode.
              </div>
            </div>
          ) : (
            history.map((item) => (
              <div key={item.id} className="mb-2">
                {item.command && (
                  <div className="flex items-center gap-1.5 text-neutral-300">
                    <span className="text-dx0-orange font-bold select-none">
                      $
                    </span>
                    <span className="text-white font-semibold">
                      {item.command}
                    </span>
                  </div>
                )}
                {item.output && <div className="mt-1">{item.output}</div>}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="p-3 border-t border-dx0-orange/20 bg-neutral-950/80 rounded-b-lg shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-dx0-orange font-bold text-xs shrink-0 select-none hidden sm:inline">
            $
          </span>
          <input
            ref={inputRef}
            onKeyDown={handleKeyDown}
            placeholder="Type a command (e.g., help, fastfetch, cd projects, no-ui)..."
            aria-label="Terminal command input"
            className="flex-1 bg-neutral-900 border border-neutral-800 focus:border-dx0-orange focus:outline-none rounded px-3 py-1.5 text-sm font-mono text-white placeholder:text-neutral-600 transition-colors"
          />
          <button
            type="button"
            onClick={submit}
            aria-label="Run command"
            className="rounded bg-dx0-orange text-black hover:bg-orange-500 px-3.5 py-1.5 text-sm font-bold transition-all cursor-pointer shadow-md shrink-0"
          >
            Run
          </button>
        </div>
      </div>
    </div>
  );
}
