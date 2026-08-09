import { useEffect, useRef } from 'react';

interface MatrixEffectProps {
  onExit: () => void;
}

export default function MatrixEffect({ onExit }: MatrixEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const chars =
      'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*<>{}[]';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    let raf: number;
    let lastTime = 0;
    const interval = 50;

    function draw(timestamp: number) {
      raf = requestAnimationFrame(draw);
      if (timestamp - lastTime < interval) return;
      lastTime = timestamp;

      ctx!.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

      ctx!.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const y = drops[i] * fontSize;

        if (drops[i] * fontSize < 30) {
          ctx!.fillStyle = '#ffffff';
        } else {
          const green = Math.floor(180 + Math.random() * 75);
          ctx!.fillStyle = `rgb(0, ${green}, 50)`;
        }

        ctx!.fillText(char, i * fontSize, y);

        if (y > canvas!.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div
      onClick={onExit}
      className="fixed inset-0 z-[9999] bg-black flex flex-col cursor-pointer"
    >
      <canvas ref={canvasRef} className="flex-1 w-full h-full" />
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] text-[11px] font-mono text-neutral-500/80 pointer-events-none select-none animate-pulse">
        [ Click anywhere to exit ]
      </div>
    </div>
  );
}
