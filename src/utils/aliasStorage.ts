const ALIAS_STORAGE_KEY = 'dx0_terminal_aliases';

export type AliasMap = Record<string, string>;

export function loadAliases(): AliasMap {
  try {
    const raw = localStorage.getItem(ALIAS_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as AliasMap;
  } catch {
    return {};
  }
}

export function saveAliases(aliases: AliasMap): void {
  try {
    localStorage.setItem(ALIAS_STORAGE_KEY, JSON.stringify(aliases));
  } catch {
    // silently fail
  }
}

export function setAlias(name: string, command: string): AliasMap {
  const aliases = loadAliases();
  aliases[name] = command;
  saveAliases(aliases);
  return aliases;
}

export function removeAlias(name: string): { aliases: AliasMap; found: boolean } {
  const aliases = loadAliases();
  const found = name in aliases;
  if (found) {
    delete aliases[name];
    saveAliases(aliases);
  }
  return { aliases, found };
}

export function resolveAlias(input: string, aliases: AliasMap): string {
  const firstWord = input.split(' ')[0].toLowerCase();
  if (aliases[firstWord]) {
    return aliases[firstWord] + input.slice(firstWord.length);
  }
  return input;
}
