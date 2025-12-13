import { useEffect, useState } from "react";

export function usePersistentState(storageKey, initialValue) {
  const [value, setValue] = useState(() => {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return initialValue;

    try {
      return JSON.parse(raw);
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [storageKey, value]);

  return [value, setValue];
}
