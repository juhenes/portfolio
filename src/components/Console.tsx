import { useRef, useEffect, useState, useCallback } from 'react';
import type { KeyboardEvent, ChangeEvent } from 'react';
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

interface Suggestion {
  value: string;
  label: string;
  category: string;
  aliases?: string[];
}

const CATEGORY_COLORS: Record<string, string> = {
  navigation: 'text-cyan-400',
  system: 'text-blue-400',
  display: 'text-purple-400',
  utility: 'text-yellow-400',
  'easter-egg': 'text-pink-400',
};

const ALL_SUGGESTIONS: Suggestion[] = [
  { value: 'help', label: 'help', category: 'utility', aliases: ['?', 'man'] },
  { value: 'whoami', label: 'whoami', category: 'system', aliases: ['bio'] },
  {
    value: 'fastfetch',
    label: 'fastfetch',
    category: 'system',
    aliases: ['neofetch'],
  },
  { value: 'no-ui', label: 'no-ui', category: 'display', aliases: ['cli'] },
  { value: 'ui', label: 'ui', category: 'display', aliases: ['gui', 'exit'] },
  { value: 'clear', label: 'clear', category: 'utility', aliases: ['cls'] },
  { value: 'history', label: 'history', category: 'utility' },
  { value: 'ls', label: 'ls', category: 'navigation', aliases: ['dir'] },
  { value: 'pwd', label: 'pwd', category: 'navigation' },
  { value: 'contact', label: 'contact', category: 'system', aliases: ['mail'] },
  { value: 'htop', label: 'htop', category: 'easter-egg', aliases: ['top'] },
  {
    value: 'matrix',
    label: 'matrix',
    category: 'easter-egg',
    aliases: ['neo'],
  },
  { value: 'alias', label: 'alias [name=command]', category: 'utility' },
  { value: 'unalias', label: 'unalias <name>', category: 'utility' },
  {
    value: 'close',
    label: 'close',
    category: 'utility',
    aliases: ['minimize'],
  },
  { value: 'cd profile', label: 'cd profile', category: 'navigation' },
  { value: 'cd experience', label: 'cd experience', category: 'navigation' },
  { value: 'cd leadership', label: 'cd leadership', category: 'navigation' },
  { value: 'cd projects', label: 'cd projects', category: 'navigation' },
  { value: 'cd awards', label: 'cd awards', category: 'navigation' },
  {
    value: 'cd certifications',
    label: 'cd certifications',
    category: 'navigation',
  },
  { value: 'cd skills', label: 'cd skills', category: 'navigation' },
  { value: 'cd contact', label: 'cd contact', category: 'navigation' },
  { value: 'cat profile', label: 'cat profile', category: 'navigation' },
  { value: 'cat experience', label: 'cat experience', category: 'navigation' },
  { value: 'cat leadership', label: 'cat leadership', category: 'navigation' },
  { value: 'cat projects', label: 'cat projects', category: 'navigation' },
  { value: 'cat awards', label: 'cat awards', category: 'navigation' },
  {
    value: 'cat certifications',
    label: 'cat certifications',
    category: 'navigation',
  },
  { value: 'cat skills', label: 'cat skills', category: 'navigation' },
  { value: 'cat contact', label: 'cat contact', category: 'navigation' },
  ...COMMANDS.filter(
    (c) =>
      ![
        'help',
        'whoami',
        'fastfetch',
        'no-ui',
        'ui',
        'clear',
        'history',
        'ls',
        'pwd',
        'contact',
        'htop',
        'matrix',
        'alias',
        'unalias',
        'close',
      ].includes(c.cmd) &&
      !c.cmd.startsWith('cd ') &&
      !c.cmd.startsWith('cat ') &&
      !c.cmd.startsWith('open ')
  ).map((c) => ({
    value: c.cmd,
    label: c.cmd,
    category: c.category,
    aliases: c.aliases,
  })),
];

function getMatches(input: string): Suggestion[] {
  const q = input.toLowerCase().trim();
  if (!q) return [];
  return ALL_SUGGESTIONS.filter(
    (s) =>
      s.value.toLowerCase().startsWith(q) ||
      s.label.toLowerCase().startsWith(q) ||
      s.aliases?.some((a) => a.toLowerCase().startsWith(q))
  ).slice(0, 8);
}

function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <span className="text-white font-bold">
        {text.slice(idx, idx + query.length)}
      </span>
      {text.slice(idx + query.length)}
    </>
  );
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
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [inputVal, setInputVal] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number>(-1);
  const commandList = history.map((h) => h.command).filter(Boolean);

  useEffect(() => {
    if (scrollRef.current) {
      const el = scrollRef.current;
      requestAnimationFrame(() => {
        el.scrollTop = el.scrollHeight;
      });
    }
  }, [history]);

  useEffect(() => {
    if (selectedIdx >= 0 && dropdownRef.current) {
      const item = dropdownRef.current.children[selectedIdx] as HTMLElement;
      item?.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIdx]);

  const closeSuggestions = useCallback(() => {
    setSuggestions([]);
    setSelectedIdx(-1);
  }, []);

  function submit(overrideVal?: string) {
    const val = overrideVal ?? inputRef.current?.value ?? '';
    if (!val.trim()) return;
    onExecute(val.trim());
    if (inputRef.current) inputRef.current.value = '';
    setInputVal('');
    setHistoryIndex(-1);
    closeSuggestions();
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setInputVal(val);
    const matches = getMatches(val);
    setSuggestions(matches);
    setSelectedIdx(-1);
  }

  function applySuggestion(s: Suggestion) {
    if (inputRef.current) inputRef.current.value = s.value;
    setInputVal(s.value);
    closeSuggestions();
    inputRef.current?.focus();
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (suggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIdx((i) => (i < suggestions.length - 1 ? i + 1 : 0));
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIdx((i) => (i > 0 ? i - 1 : suggestions.length - 1));
        return;
      }
      if (e.key === 'Tab' || (e.key === 'Enter' && selectedIdx >= 0)) {
        e.preventDefault();
        const target =
          selectedIdx >= 0 ? suggestions[selectedIdx] : suggestions[0];
        applySuggestion(target);
        return;
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        closeSuggestions();
        return;
      }
    }

    if (e.key === 'Enter') {
      submit();
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const currentVal = inputRef.current?.value ?? '';
      if (!currentVal.trim()) return;
      const matches = getMatches(currentVal);
      if (matches.length === 1) {
        applySuggestion(matches[0]);
      } else if (matches.length > 1) {
        setSuggestions(matches);
        setSelectedIdx(0);
      }
      return;
    }

    if (e.key === 'ArrowUp' && suggestions.length === 0) {
      e.preventDefault();
      if (commandList.length === 0) return;
      const nextIdx =
        historyIndex === -1
          ? commandList.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      const val = commandList[nextIdx] || '';
      if (inputRef.current) inputRef.current.value = val;
      setInputVal(val);
      closeSuggestions();
      return;
    }

    if (e.key === 'ArrowDown' && suggestions.length === 0) {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= commandList.length) {
        setHistoryIndex(-1);
        if (inputRef.current) inputRef.current.value = '';
        setInputVal('');
      } else {
        setHistoryIndex(nextIdx);
        const val = commandList[nextIdx] || '';
        if (inputRef.current) inputRef.current.value = val;
        setInputVal(val);
      }
      return;
    }
  }

  return (
    <div
      style={expanded ? undefined : { height: `${height}px` }}
      data-active-section={activeSection}
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
              <FiMaximize2 className="text-xs text-dx0-orange" />
            </button>
          )}
          {onMinimize && (
            <button
              onClick={onMinimize}
              title="Minimize Terminal"
              aria-label="Minimize Terminal"
              className="p-1 text-neutral-400 hover:text-dx0-orange transition-colors cursor-pointer"
            >
              <FiMinus className="text-xs text-dx0-orange" />
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
        <div className="relative flex items-center gap-2">
          <span className="text-dx0-orange font-bold text-xs shrink-0 select-none hidden sm:inline">
            $
          </span>

          <div className="relative flex-1">
            <input
              ref={inputRef}
              onKeyDown={handleKeyDown}
              onChange={handleChange}
              onBlur={() => setTimeout(closeSuggestions, 120)}
              placeholder="Type a command (e.g., help, fastfetch, cd projects, no-ui)..."
              aria-label="Terminal command input"
              aria-autocomplete="list"
              aria-expanded={suggestions.length > 0}
              autoComplete="off"
              spellCheck={false}
              className="w-full bg-neutral-900 border border-neutral-800 focus:border-dx0-orange focus:outline-none rounded px-3 py-1.5 text-sm font-mono text-white placeholder:text-neutral-600 transition-colors"
            />

            {suggestions.length > 0 && (
              <div
                ref={dropdownRef}
                className="absolute bottom-full mb-1.5 left-0 right-0 z-50 rounded-md border border-dx0-orange/30 bg-neutral-950 shadow-[0_-4px_24px_rgba(0,0,0,0.6)] overflow-hidden max-h-52 overflow-y-auto"
                role="listbox"
              >
                {suggestions.map((s, i) => {
                  const isActive = i === selectedIdx;
                  const catColor =
                    CATEGORY_COLORS[s.category] ?? 'text-neutral-400';
                  return (
                    <div
                      key={s.value}
                      role="option"
                      aria-selected={isActive}
                      onMouseDown={() => applySuggestion(s)}
                      className={`flex items-center justify-between gap-3 px-3 py-1.5 text-xs cursor-pointer transition-colors select-none ${
                        isActive
                          ? 'bg-dx0-orange/15 border-l-2 border-dx0-orange'
                          : 'border-l-2 border-transparent hover:bg-neutral-800/60'
                      }`}
                    >
                      <span
                        className={`font-mono ${isActive ? 'text-dx0-orange' : 'text-neutral-300'}`}
                      >
                        <HighlightMatch text={s.label} query={inputVal} />
                      </span>

                      <div className="flex items-center gap-2 shrink-0">
                        {s.aliases && s.aliases.length > 0 && (
                          <span className="text-neutral-600 text-[10px]">
                            {s.aliases.slice(0, 2).join(', ')}
                          </span>
                        )}
                        <span
                          className={`text-[10px] font-semibold uppercase tracking-wide ${catColor}`}
                        >
                          {s.category}
                        </span>
                      </div>
                    </div>
                  );
                })}

                <div className="px-3 py-1 bg-neutral-900/60 border-t border-neutral-800 flex items-center gap-3 text-[10px] text-neutral-600 select-none">
                  <span>
                    <kbd className="font-mono">↑↓</kbd> navigate
                  </span>
                  <span>
                    <kbd className="font-mono">Tab</kbd> /{' '}
                    <kbd className="font-mono">↵</kbd> select
                  </span>
                  <span>
                    <kbd className="font-mono">Esc</kbd> dismiss
                  </span>
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => submit()}
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
