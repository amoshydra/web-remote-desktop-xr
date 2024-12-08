import { store } from "./store";

export const createInitializer = <T,>(key: string, defaultValue: T) => ({
  get: (): T => {
    const v = store.get(key);
    if (v == undefined || !v.trim()) {
      return defaultValue;
    }
    const type = typeof defaultValue;
    switch(type) {
      case "boolean": return (v === "true") as T;
      case "number": return (parseFloat(v) as T) || defaultValue;
      default: return v as T;
    }
  },
  set(v: T) {
    store.set(key, v);
  }
});
