const ALIAS_STORAGE_KEY = 'dx0_terminal_aliases';

export type AliasMap = Record<string, string>;

export const FORBIDDEN_ALIAS_KEYS = new Set([
  '__proto__',
  'constructor',
  'prototype',
  'tostring',
  'valueof',
  'hasownproperty',
  'isprototypeof',
]);

export function loadAliases(): AliasMap {
  try {
    const raw = localStorage.getItem(ALIAS_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      Array.isArray(parsed)
    ) {
      return {};
    }
    const safeMap: AliasMap = {};
    for (const [key, val] of Object.entries(parsed)) {
      const lower = key.toLowerCase();
      if (
        typeof val === 'string' &&
        !FORBIDDEN_ALIAS_KEYS.has(lower)
      ) {
        safeMap[lower] = val;
      }
    }
    return safeMap;
  } catch {
    return {};
  }
}

export function saveAliases(aliases: AliasMap): void {
  try {
    const safeObj: Record<string, string> = {};
    for (const [k, v] of Object.entries(aliases)) {
      const lower = k.toLowerCase();
      if (!FORBIDDEN_ALIAS_KEYS.has(lower)) {
        safeObj[lower] = v;
      }
    }
    localStorage.setItem(ALIAS_STORAGE_KEY, JSON.stringify(safeObj));
  } catch {
    // silently fail
  }
}

export function setAlias(name: string, command: string): AliasMap {
  const cleanName = name.trim().toLowerCase();
  if (FORBIDDEN_ALIAS_KEYS.has(cleanName)) {
    return loadAliases();
  }
  const aliases = loadAliases();
  aliases[cleanName] = command;
  saveAliases(aliases);
  return aliases;
}

export function removeAlias(name: string): {
  aliases: AliasMap;
  found: boolean;
} {
  const aliases = loadAliases();
  const cleanName = name.trim().toLowerCase();
  const found = Object.prototype.hasOwnProperty.call(aliases, cleanName);
  if (found) {
    delete aliases[cleanName];
    saveAliases(aliases);
  }
  return { aliases, found };
}

export function resolveAlias(input: string, aliases: AliasMap): string {
  const firstWord = input.split(' ')[0].toLowerCase();
  if (
    !FORBIDDEN_ALIAS_KEYS.has(firstWord) &&
    Object.prototype.hasOwnProperty.call(aliases, firstWord) &&
    typeof aliases[firstWord] === 'string'
  ) {
    return aliases[firstWord] + input.slice(firstWord.length);
  }
  return input;
}

