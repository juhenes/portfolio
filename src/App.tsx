import { useState } from 'react';
import BootScreen from './components/BootScreen';
import AuthScreen from './components/AuthScreen';
import MainInterface from './components/MainInterface';

export default function App() {
  const [booted, setBooted] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:rounded focus:bg-dx0-orange focus:px-3 focus:py-2 focus:text-black focus:font-semibold"
      >
        Skip to main content
      </a>

      {authenticated && <MainInterface />}

      {!booted && (
        <div className="fixed inset-0 z-50">
          <BootScreen onComplete={() => setBooted(true)} />
        </div>
      )}

      {booted && !authenticated && (
        <div className="fixed inset-0 z-50">
          <AuthScreen onComplete={() => setAuthenticated(true)} />
        </div>
      )}
    </>
  );
}
