import { useState } from "react";
import ScreenContainer from "./ScreenContainer";
import Console from "./Console";

const SHORTCUTS = [
  { id: "about", label: "About", cmd: "open About" },
  { id: "projects", label: "Projects", cmd: "open Projects" },
  { id: "contact", label: "Contact", cmd: "open Contact" },
];

export default function MainInterface() {
  const [commands, setCommands] = useState<string[]>([]);
  const [currentModule, setCurrentModule] = useState<string>("Welcome");

  function executeCommand(cmd: string) {
    setCommands((s) => [...s, cmd]);
    if (cmd.startsWith("open ")) {
      setCurrentModule(cmd.replace("open ", ""));
    }
  }

  return (
    <ScreenContainer fadeOut={false} className="flex h-screen w-screen">
      <div className="flex w-full">
        <aside className="w-24 bg-neutral-900 p-4 flex flex-col items-center gap-4">
          {SHORTCUTS.map((s) => (
            <button
              key={s.id}
              onClick={() => executeCommand(s.cmd)}
              className="flex h-12 w-12 items-center justify-center rounded bg-neutral-800 text-sm font-semibold text-white"
              aria-label={s.label}
            >
              {s.label[0]}
            </button>
          ))}
        </aside>

        <main className="flex-1 p-6 flex flex-col">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">{currentModule}</h2>
          </div>

          <div className="flex-1 border rounded bg-neutral-950 p-4">
            <p className="text-sm text-dx0-orange/60">Module content for {currentModule}</p>
          </div>

          <div className="mt-4">
            <Console commands={commands} onExecute={executeCommand} />
          </div>
        </main>
      </div>
    </ScreenContainer>
  );
}
