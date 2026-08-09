import { useEffect, useState } from 'react';
import { TIMING } from './config';

/**
 * Reveals `text` one character at a time, every `delayMs`.
 * Returns the text typed so far and whether typing has finished.
 *
 * Implementation note: each step is a fresh setTimeout that derives the
 * next slice from the current `typed` state (rather than a setInterval
 * driven by an external counter variable). That makes it self-correcting
 * if the effect ever gets set up more than once for the same mount
 * (e.g. React StrictMode's dev-only double-invoke) — there's no separate
 * counter that can drift out of sync with what's actually on screen.
 */
export function useTypewriter(text: string, delayMs: number) {
  const [prevText, setPrevText] = useState(text);
  const [typed, setTyped] = useState('');

  if (text !== prevText) {
    setPrevText(text);
    setTyped('');
  }

  const done = text.length > 0 && typed.length >= text.length;

  // Advance one character at a time, always based on current `typed`.
  useEffect(() => {
    if (typed.length >= text.length) return;

    const timer = setTimeout(() => {
      setTyped(text.slice(0, typed.length + 1));
    }, delayMs);

    return () => clearTimeout(timer);
  }, [text, delayMs, typed]);

  return { typed, done };
}

/**
 * Reveals `items` one at a time, every `delayMs`, starting only once
 * `active` is true. Returns the items revealed so far and whether the
 * whole list has finished revealing.
 *
 * Same self-correcting approach as useTypewriter: each step is a fresh
 * setTimeout keyed off `visible.length`, not an external counter, so it
 * can't drift out of sync with what's actually rendered.
 */
export function useSequentialReveal<T>(
  items: readonly T[],
  delayMs: number,
  active: boolean = true
) {
  const [prevConfig, setPrevConfig] = useState({ active, items });
  const [visible, setVisible] = useState<T[]>([]);

  if (prevConfig.active !== active || prevConfig.items !== items) {
    setPrevConfig({ active, items });
    setVisible([]);
  }

  const done = items.length > 0 && visible.length >= items.length;

  // Advance one item at a time, always based on current `visible`.
  useEffect(() => {
    if (!active) return;
    if (visible.length >= items.length) return;

    const timer = setTimeout(() => {
      setVisible((prev) => [...prev, items[prev.length]]);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [active, items, delayMs, visible]);

  return { visible, done };
}

/**
 * Once `trigger` becomes true, waits `holdDelay` ms, starts a fade-out,
 * then waits the shared fade transition duration before calling
 * `onComplete`. Returns whether the fade-out has started.
 */
export function useFadeAndComplete(
  trigger: boolean,
  holdDelay: number,
  onComplete: () => void
) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (!trigger) return;

    const fadeTimer = setTimeout(() => setFadeOut(true), holdDelay);
    const completeTimer = setTimeout(
      () => onComplete(),
      holdDelay + TIMING.transition.fadeDuration
    );

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [trigger, holdDelay, onComplete]);

  return fadeOut;
}
