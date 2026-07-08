"use client";

import { useEffect, useState } from "react";
import { readJSON, writeJSON } from "@/utils/storage";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    const stored = readJSON<T>(key);
    if (stored !== null) setValue(stored);
  }, [key]);

  useEffect(() => {
    writeJSON(key, value);
  }, [key, value]);

  return [value, setValue] as const;
}
