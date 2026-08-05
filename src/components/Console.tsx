import { useRef } from 'react';

interface ConsoleProps {
  commands: string[];
  onExecute: (cmd: string) => void;
  expanded?: boolean;
}

export default function Console({
  commands,
  onExecute,
  expanded = false,
}: ConsoleProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  function submit() {
    const val = inputRef.current?.value ?? '';
    if (!val.trim()) return;
    onExecute(val.trim());
    if (inputRef.current) inputRef.current.value = '';
  }

  return (
    <div
      className={`w-full rounded border border-dx0-orange/20 bg-black text-dx0-orange ${
        expanded ? 'flex flex-col h-full' : ''
      }`}
    >
      <div
        className={`p-4 overflow-auto font-mono text-sm ${expanded ? 'flex-1' : 'h-40'}`}
      >
        {commands.length === 0 ? (
          <div className="text-dx0-orange/60">No commands executed yet.</div>
        ) : (
          commands.map((c, i) => (
            <div key={i} className="mb-1">
              <span className="text-dx0-orange/80">&gt;</span> {c}
            </div>
          ))
        )}
      </div>

      <div className="p-3 border-t border-dx0-orange/10">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
            placeholder="Type a command or click a shortcut..."
            className="flex-1 rounded bg-neutral-900 px-3 py-2 text-sm font-mono text-white"
          />

          <button
            onClick={submit}
            className="rounded bg-dx0-orange px-3 py-2 text-sm font-semibold"
          >
            Run
          </button>
        </div>
      </div>
    </div>
  );
}
