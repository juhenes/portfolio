import { useEffect, useState } from "react";

interface AuthScreenProps {
  onComplete: () => void;
}

const COMMAND = "' OR '1'='1";

const TYPE_DELAY = 55;
const MESSAGE_DELAY = 200;

const FINISH_DELAY = COMMAND.length * TYPE_DELAY;

const messages = [
  "> Injection detected.",
  "> Curiosity confirmed.",
  "> Granting Explorer access...",
  "",
  "> Launching shell...",
];

export default function AuthScreen({
  onComplete,
}: AuthScreenProps) {
  const [typed, setTyped] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  const [finishedTyping, setFinishedTyping] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      index++;

      setTyped(COMMAND.slice(0, index));

      if (index >= COMMAND.length) {
        clearInterval(interval);
        setFinishedTyping(true);
      }
    }, TYPE_DELAY);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!finishedTyping) return;

    messages.forEach((message, i) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, message]);
      }, (i + 1) * MESSAGE_DELAY);
    });

    const totalDelay =
      FINISH_DELAY + messages.length * MESSAGE_DELAY;

    setTimeout(() => {
      setFadeOut(true);
    }, totalDelay + 700);

    setTimeout(() => {
      onComplete();
    }, totalDelay + 1200);
  }, [finishedTyping, onComplete]);

  return (
    <div
      className={`flex min-h-screen items-center justify-center bg-black px-6 font-mono text-dx0-orange transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="w-full max-w-xl overflow-hidden rounded-lg border border-dx0-orange/40 bg-neutral-950 shadow-2xl">
        {/* Header */}
        <div className="flex items-center gap-4 border-b border-dx0-orange/20 px-6 py-5">
          <div className="flex h-16 w-16 items-center justify-center">
            <img
              src="/favicon.svg"
              alt="Profile"
              className="h-10 w-10"
            />
          </div>

          <div>
            <p className="text-lg font-semibold">dx0@portfolio</p>
            <p className="text-sm text-dx0-orange/60">
              Authentication Required
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-6 p-6">
          <div>
            <p className="mb-2 text-sm text-dx0-orange/70">
              Username
            </p>

            <div className="rounded border border-dx0-orange/30 bg-black px-3 py-2">
              explorer
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm text-dx0-orange/70">
              Password
            </p>

            <div className="rounded border border-dx0-orange/30 bg-black px-3 py-2">
              <span>{typed}</span>

              {!finishedTyping && (
                <span className="animate-pulse">█</span>
              )}
            </div>
          </div>

          {/* Terminal Output */}
          <div className="min-h-[170px] rounded border border-dx0-orange/20 bg-black p-4">
            {logs.map((line, index) => (
              <p
                key={index}
                className={line === "" ? "h-4" : "mb-1"}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}