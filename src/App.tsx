import { useState } from 'react';
import BootScreen from './components/BootScreen';
import AuthScreen from './components/AuthScreen';
import MainInterface from './components/MainInterface';

export default function App() {
  const [booted, setBooted] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  if (!booted) {
    return <BootScreen onComplete={() => setBooted(true)} />;
  }

  if (!authenticated) {
    return <AuthScreen onComplete={() => setAuthenticated(true)} />;
  }

  return <MainInterface />;
}
