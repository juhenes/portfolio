import type { ReactNode } from 'react';

interface ScreenContainerProps {
  children: ReactNode;
  fadeOut: boolean;
  className?: string;
}

/**
 * Shared black/monospace/orange terminal chrome used by every full-screen
 * step of the intro sequence. `fadeOut` toggles the shared opacity
 * transition; keep the `duration-500` below in sync with
 * TIMING.transition.fadeDuration.
 */
export default function ScreenContainer({
  children,
  fadeOut,
  className = '',
}: ScreenContainerProps) {
  return (
    <div
      className={`bg-black font-mono text-dx0-orange transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      } ${className}`}
    >
      {children}
    </div>
  );
}
