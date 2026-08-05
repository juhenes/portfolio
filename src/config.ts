/**
 * Every delay/duration and every piece of copy used by the boot/auth
 * intro sequence lives here. If a screen needs a new number or line of
 * text, add it here — not hardcoded in the component.
 */

export const TIMING = {
  /** Shared fade-out transition. Keep in sync with the Tailwind
   *  `duration-500` class used on ScreenContainer. */
  transition: {
    fadeDuration: 500,
  },

  boot: {
    lineDelay: 100, // ms between each boot log line appearing
    settleDelay: 900, // ms to hold the finished screen before fading out
  },

  auth: {
    typeDelay: 55, // ms per typed character
    messageDelay: 200, // ms between each response line appearing
    fadeDelay: 700, // ms to hold the finished screen before fading out
  },
} as const;

export const BOOT_LOGS = [
  "[ OK ] Initializing hardware...",
  "[ OK ] Mounting filesystem...",
  "[ OK ] Starting system services...",
  "[ OK ] Loading network interfaces...",
  "[ OK ] Establishing secure connection...",
  "[ OK ] Loading AI modules...",
  "[ OK ] Starting portfolio daemon...",
  "[ OK ] Launching portfolio console...",
];

export const AUTH_INJECTION_COMMAND = "' OR '1'='1";

export const AUTH_LOGS = [
  "> Injection detected.",
  "> Curiosity confirmed.",
  "> Granting Explorer access...",
  "",
  "> Launching shell...",
];
