import { useEffect, useState } from "react";

interface BootScreenProps {
  onComplete: () => void;
}

const bootLogs = [
  "[ OK ] Initializing hardware...",
  "[ OK ] Mounting filesystem...",
  "[ OK ] Starting system services...",
  "[ OK ] Loading network interfaces...",
  "[ OK ] Establishing secure connection...",
  "[ OK ] Loading AI modules...",
  "[ OK ] Starting portfolio daemon...",
  "[ OK ] Launching portfolio console...",
];

const LINE_DELAY = 75;

const LONGEST_LINE = Math.max(
  ...bootLogs.map((line) => line.length)
);

const FINISH_DELAY = LONGEST_LINE * 12;

export default function BootScreen({
  onComplete,
}: BootScreenProps) {
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      if (index < bootLogs.length) {
        setVisibleLogs((prev) => [...prev, bootLogs[index]]);
        index++;
      } else {
        clearInterval(interval);

        setTimeout(onComplete, FINISH_DELAY);
      }
    }, LINE_DELAY);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="flex h-screen w-screen bg-black p-8 font-mono text-dx0-orange">
      <div className="w-full">
        <p className="mb-4 text-lg">
          Raspberry Pi OS Bootloader v1.2026
        </p>

        {visibleLogs.map((log, i) => (
          <p key={i}>{log}</p>
        ))}

        {visibleLogs.length === bootLogs.length && (
          <>
            <br />
            <p>Portfolio OS v1.0</p>
            <p>Type "help" to begin.</p>

            <span className="animate-pulse">_</span>
          </>
        )}
      </div>
    </div>
  );
}