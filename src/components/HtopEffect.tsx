import { useEffect, useRef, useState } from 'react';

interface Process {
  pid: number;
  user: string;
  cpu: number;
  mem: number;
  command: string;
  state: string;
  time: string;
}

interface HtopEffectProps {
  onExit: () => void;
}

const PROCESS_POOL: Omit<Process, 'cpu' | 'mem'>[] = [
  { pid: 1, user: 'root', state: 'S', time: '0:00.03', command: 'systemd' },
  { pid: 42, user: 'juhenes', state: 'S', time: '1:24.11', command: 'portfolio-ui' },
  { pid: 101, user: 'juhenes', state: 'R', time: '0:45.87', command: 'dx0-terminal' },
  { pid: 203, user: 'root', state: 'S', time: '0:00.12', command: 'kthreadd' },
  { pid: 512, user: 'juhenes', state: 'S', time: '3:12.44', command: 'vite dev' },
  { pid: 611, user: 'juhenes', state: 'R', time: '0:07.21', command: 'typescript-lsp' },
  { pid: 722, user: 'juhenes', state: 'S', time: '0:02.56', command: 'eslint-daemon' },
  { pid: 831, user: 'root', state: 'S', time: '0:00.01', command: 'ksoftirqd/0' },
  { pid: 940, user: 'juhenes', state: 'S', time: '0:11.33', command: 'node' },
  { pid: 1024, user: 'juhenes', state: 'R', time: '2:08.90', command: 'react-renderer' },
  { pid: 1337, user: 'dx0', state: 'R', time: '9:41.00', command: 'htop (you)' },
  { pid: 1500, user: 'root', state: 'S', time: '0:00.45', command: 'journald' },
  { pid: 1612, user: 'juhenes', state: 'S', time: '0:33.22', command: 'bash' },
  { pid: 2048, user: 'juhenes', state: 'S', time: '0:08.77', command: 'tailwindcss' },
  { pid: 9999, user: 'dx0', state: 'Z', time: '0:00.00', command: 'easter-egg <zombie>' },
];

function randomizeCpu(base: number) {
  return Math.min(99.9, Math.max(0, base + (Math.random() - 0.5) * 15));
}

function randomizeMem(base: number) {
  return Math.min(99.9, Math.max(0, base + (Math.random() - 0.5) * 3));
}

const BASE_CPU = [0.1, 18.4, 42.3, 0.2, 5.1, 12.7, 0.9, 0.0, 2.3, 31.2, 88.8, 0.1, 0.4, 1.1, 0.0];
const BASE_MEM = [0.5, 8.2, 6.1, 0.1, 12.4, 9.3, 1.2, 0.0, 4.7, 15.8, 2.1, 0.3, 0.8, 3.4, 0.0];

export default function HtopEffect({ onExit }: HtopEffectProps) {
  const [processes, setProcesses] = useState<Process[]>(() =>
    PROCESS_POOL.map((p, i) => ({
      ...p,
      cpu: BASE_CPU[i],
      mem: BASE_MEM[i],
    }))
  );
  const [tick, setTick] = useState(0);
  const [cpuBars, setCpuBars] = useState([42, 38, 55, 29]);
  const [memUsed] = useState(3.84);
  const memTotal = 8.0;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProcesses((prev) =>
        prev.map((p, i) => ({
          ...p,
          cpu: randomizeCpu(BASE_CPU[i]),
          mem: randomizeMem(BASE_MEM[i]),
        }))
      );
      setCpuBars((prev) =>
        prev.map((v) => Math.min(99, Math.max(5, v + (Math.random() - 0.5) * 20)))
      );
      setTick((t) => t + 1);
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'q' || e.key === 'Q') onExit();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onExit]);

  const now = new Date();
  const uptime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

  function bar(pct: number, width: number = 20, color: string = 'text-green-400') {
    const filled = Math.round((pct / 100) * width);
    const empty = width - filled;
    return (
      <span>
        <span className="text-neutral-600">[</span>
        <span className={color}>{'|'.repeat(filled)}</span>
        <span className="text-neutral-700">{' '.repeat(empty)}</span>
        <span className="text-neutral-600">]</span>
        <span className="text-neutral-400 ml-1">{pct.toFixed(1)}%</span>
      </span>
    );
  }

  function memBar(used: number, total: number, width: number = 20) {
    const pct = used / total;
    const filled = Math.round(pct * width);
    const empty = width - filled;
    return (
      <span>
        <span className="text-neutral-600">[</span>
        <span className="text-cyan-400">{'|'.repeat(filled)}</span>
        <span className="text-neutral-700">{' '.repeat(empty)}</span>
        <span className="text-neutral-600">]</span>
        <span className="text-neutral-400 ml-1">
          {used.toFixed(2)}G/{total.toFixed(1)}G
        </span>
      </span>
    );
  }

  const sorted = [...processes].sort((a, b) => b.cpu - a.cpu);

  return (
    <div className="fixed inset-0 z-[9999] bg-black font-mono text-xs flex flex-col overflow-hidden">
      <div className="bg-neutral-900 px-3 py-1 flex justify-between items-center shrink-0 border-b border-neutral-800">
        <span className="text-green-400 font-bold">htop</span>
        <span className="text-neutral-400">
          {PROCESS_POOL.length} tasks | {tick % 2 === 0 ? '◉' : '○'} live
        </span>
        <span className="text-neutral-500">{uptime}</span>
      </div>

      <div className="px-3 py-1.5 bg-black shrink-0 space-y-0.5 border-b border-neutral-800">
        {cpuBars.map((v, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-cyan-400 w-8">{i + 1}</span>
            {bar(v, 30, i % 2 === 0 ? 'text-green-400' : 'text-yellow-400')}
          </div>
        ))}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-cyan-400 w-8">Mem</span>
          {memBar(memUsed, memTotal, 30)}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-cyan-400 w-8">Swp</span>
          <span>
            <span className="text-neutral-600">[</span>
            <span className="text-neutral-700">{'          '}</span>
            <span className="text-neutral-600">]</span>
            <span className="text-neutral-500 ml-1">0.00G/0.0G</span>
          </span>
        </div>
      </div>

      <div className="flex bg-neutral-800 text-neutral-400 px-3 py-0.5 shrink-0 gap-4 border-b border-neutral-700">
        <span className="w-8">PID</span>
        <span className="w-12">USER</span>
        <span className="w-10 text-right">CPU%</span>
        <span className="w-10 text-right">MEM%</span>
        <span className="w-6 text-center">S</span>
        <span className="w-14">TIME+</span>
        <span>COMMAND</span>
      </div>

      <div className="flex-1 overflow-y-auto px-3">
        {sorted.map((p, i) => (
          <div
            key={p.pid}
            className={`flex gap-4 py-px transition-colors ${
              p.pid === 1337
                ? 'bg-green-900/30 text-green-300'
                : i === 0
                  ? 'bg-yellow-900/20 text-yellow-200'
                  : 'text-neutral-300 hover:bg-neutral-900/50'
            }`}
          >
            <span className="w-8 text-neutral-500">{p.pid}</span>
            <span className={`w-12 truncate ${p.user === 'root' ? 'text-red-400' : 'text-cyan-400'}`}>
              {p.user}
            </span>
            <span
              className={`w-10 text-right ${
                p.cpu > 50 ? 'text-red-400' : p.cpu > 20 ? 'text-yellow-400' : 'text-green-400'
              }`}
            >
              {p.cpu.toFixed(1)}
            </span>
            <span className="w-10 text-right text-cyan-400">{p.mem.toFixed(1)}</span>
            <span
              className={`w-6 text-center ${
                p.state === 'R' ? 'text-green-400' : p.state === 'Z' ? 'text-red-500' : 'text-neutral-500'
              }`}
            >
              {p.state}
            </span>
            <span className="w-14 text-neutral-500">{p.time}</span>
            <span className="truncate">{p.command}</span>
          </div>
        ))}
      </div>

      <div className="bg-neutral-900 px-2 py-1 flex gap-2 text-[11px] shrink-0 border-t border-neutral-800">
        <button onClick={onExit} className="cursor-pointer flex items-center gap-1 hover:text-white transition-colors">
          <span className="bg-neutral-700 text-white px-1 rounded">F10/Q</span>
          <span className="text-neutral-400">Quit</span>
        </button>
      </div>

    </div>
  );
}
