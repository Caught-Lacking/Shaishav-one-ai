import { useCallback, useState } from "react";

export type ClassLevel = 11 | 12;

const KEY = "shaishav.classLevel";

function readLevel(): ClassLevel {
  try {
    return localStorage.getItem(KEY) === "12" ? 12 : 11;
  } catch {
    return 11;
  }
}

/**
 * Remembered class level (Class 11 / Class 12). Stored in localStorage so the
 * app personalises the dashboard & planner without re-asking every visit.
 */
export function useClassLevel() {
  const [classLevel, setClassLevelState] = useState<ClassLevel>(readLevel);

  const setClassLevel = useCallback((level: ClassLevel) => {
    try {
      localStorage.setItem(KEY, String(level));
    } catch {
      // ignore storage errors (private mode etc.)
    }
    setClassLevelState(level);
  }, []);

  return { classLevel, setClassLevel };
}
