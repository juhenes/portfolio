import {
  useTypewriter,
  useSequentialReveal,
  useFadeAndComplete,
} from "../hooks";
import ScreenContainer from "./ScreenContainer";
import { AUTH_INJECTION_COMMAND, AUTH_LOGS, TIMING } from "../config";

interface AuthScreenProps {
  onComplete: () => void;
}

export default function AuthScreen({ onComplete }: AuthScreenProps) {
  const { typed, done: typingDone } = useTypewriter(
    AUTH_INJECTION_COMMAND,
    TIMING.auth.typeDelay
  );

  const { visible: logs, done: logsDone } = useSequentialReveal(
    AUTH_LOGS,
    TIMING.auth.messageDelay,
    typingDone
  );

  const fadeOut = useFadeAndComplete(
    logsDone,
    TIMING.auth.fadeDelay,
    onComplete
  );

  return (
    <ScreenContainer
      fadeOut={fadeOut}
      className="flex min-h-screen items-center justify-center px-6"
    >
      <div className="w-full max-w-xl overflow-hidden rounded-lg border border-dx0-orange/40 bg-neutral-950 shadow-2xl">
        {/* Header */}
        <div className="flex items-center gap-4 border-b border-dx0-orange/20 px-6 py-5">
          <div className="flex h-16 w-16 items-center justify-center">
            <img src="/favicon.svg" alt="Profile" className="h-10 w-10" />
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
            <p className="mb-2 text-sm text-dx0-orange/70">Username</p>

            <div className="rounded border border-dx0-orange/30 bg-black px-3 py-2">
              explorer
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm text-dx0-orange/70">Password</p>

            <div className="rounded border border-dx0-orange/30 bg-black px-3 py-2">
              <span>{typed}</span>

              {!typingDone && <span className="animate-pulse">█</span>}
            </div>
          </div>

          {/* Terminal Output */}
          <div className="min-h-[170px] rounded border border-dx0-orange/20 bg-black p-4">
            {logs.map((line, index) => (
              <p key={index} className={line === "" ? "h-4" : "mb-1"}>
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}
