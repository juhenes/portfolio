import { useState, useEffect, lazy, Suspense } from 'react';
import MainInterface from './components/MainInterface';

const BootScreen = lazy(() => import('./components/BootScreen'));
const AuthScreen = lazy(() => import('./components/AuthScreen'));

export default function App() {
  const [booted, setBooted] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [skipping, setSkipping] = useState(false);

  useEffect(() => {
    const isBot =
      typeof navigator !== 'undefined' &&
      /googlebot|bingbot|yandexbot|duckduckbot|slurp|baiduspider|lighthouse/i.test(
        navigator.userAgent
      );

    if (isBot) {
      setBooted(true);
      setAuthenticated(true);
    }
  }, []);

  const handleSkip = () => {
    if (skipping || (booted && authenticated)) return;
    setSkipping(true);
    setTimeout(() => {
      setBooted(true);
      setAuthenticated(true);
      setSkipping(false);
    }, 500);
  };

  const showIntro = !booted || !authenticated;

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:rounded focus:bg-dx0-orange focus:px-3 focus:py-2 focus:text-black focus:font-semibold"
      >
        Skip to main content
      </a>

      <MainInterface />

      {showIntro && (
        <div
          className={`fixed inset-0 z-50 bg-black cursor-pointer select-none transition-opacity duration-500 ${
            skipping ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          onDoubleClick={handleSkip}
        >
          <Suspense fallback={<div className="fixed inset-0 bg-black" />}>
            {!booted && <BootScreen onComplete={() => setBooted(true)} />}

            {booted && !authenticated && (
              <AuthScreen onComplete={() => setAuthenticated(true)} />
            )}
          </Suspense>

          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] text-[10px] sm:text-[11px] font-mono text-neutral-500/80 pointer-events-none select-none animate-pulse whitespace-nowrap">
            <span className="sm:hidden">[ Double-tap to skip ]</span>
            <span className="hidden sm:inline">[ Double-click anywhere to skip intro ]</span>
          </div>
        </div>
      )}
    </>
  );
}
