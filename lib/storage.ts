import { STORAGE_KEYS } from "@/config/aquarium";

/** localStorage can throw (private mode, blocked storage). Never crash the clock. */
export function storageGet(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function storageSet(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Ignore quota / privacy errors.
  }
}

export function storageRemove(key: string) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Ignore.
  }
}

export function clearClockStorage() {
  for (const key of Object.values(STORAGE_KEYS)) {
    storageRemove(key);
  }
}
