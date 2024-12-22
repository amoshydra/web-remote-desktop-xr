import { WRDXR_DEFAULT_FILE } from "./environment";

export const ConfigStorage = {
  getServerUrl: () => localStorage.getItem("serverUrl") || location.origin,
  getStreamUrl: () => localStorage.getItem("streamUrl") || WRDXR_DEFAULT_FILE,
  setServerUrl: (value: string) => localStorage.setItem("serverUrl", value),
  setStreamUrl: (value: string) => localStorage.setItem("streamUrl", value),
  getRemember: () => localStorage.getItem("remember") === "true",
  setRemember: (value: boolean) =>
    localStorage.setItem("remember", value ? "true" : "false"),
};
