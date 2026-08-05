import { useSequentialReveal, useFadeAndComplete } from '../hooks';
import ScreenContainer from './ScreenContainer';
import { BOOT_LOGS, TIMING } from '../config';

interface BootScreenProps {
  onComplete: () => void;
}

export default function BootScreen({ onComplete }: BootScreenProps) {
  const { visible: visibleLogs, done } = useSequentialReveal(
    BOOT_LOGS,
    TIMING.boot.lineDelay
  );

  const fadeOut = useFadeAndComplete(done, TIMING.boot.settleDelay, onComplete);

  return (
    <ScreenContainer fadeOut={fadeOut} className="flex h-screen w-screen p-8">
      <div className="w-full">
        <p className="mb-4 text-lg">dx0 Pi OS Bootloader v1.2026</p>

        {visibleLogs.map((log, i) => (
          <p key={i}>{log}</p>
        ))}

        {done && (
          <>
            <br />
            <p>Portfolio OS v1.0</p>
            <p>Type "help" to begin.</p>

            <span className="animate-pulse">_</span>
          </>
        )}
      </div>
    </ScreenContainer>
  );
}
