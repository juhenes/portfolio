import { useState } from 'react';
import BootScreen from './components/BootScreen';
import AuthScreen from './components/AuthScreen';
import MainInterface from './components/MainInterface';

export default function App() {
  const [booted, setBooted] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [skipping, setSkipping] = useState(false);

  const handleSkip = () => {
    if (skipping || (booted && authenticated)) return;
    setSkipping(true);
    setTimeout(() => {
      setBooted(true);
      setAuthenticated(true);
      setSkipping(false);
    }, 500);
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:rounded focus:bg-dx0-orange focus:px-3 focus:py-2 focus:text-black focus:font-semibold"
      >
        Skip to main content
      </a>

      {authenticated && <MainInterface />}

      {(!booted || !authenticated) && (
        <div
          className={`fixed inset-0 z-50 cursor-pointer select-none transition-opacity duration-500 ${
            skipping ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          onDoubleClick={handleSkip}
        >
          {!booted && <BootScreen onComplete={() => setBooted(true)} />}

          {booted && !authenticated && (
            <AuthScreen onComplete={() => setAuthenticated(true)} />
          )}

          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] text-[11px] font-mono text-neutral-500/80 pointer-events-none select-none animate-pulse">
            [ Double-click anywhere to skip intro ]
          </div>
        </div>
      )}
    </>
  );
}
