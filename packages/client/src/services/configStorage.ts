import { createConfigStore } from "../class/ConfigStorage";
import { WRDXR_DEFAULT_FILE } from "./environment";

export const ConfigStorage = createConfigStore({
  serverUrl: {
    type: "string",
    defaultValue: location.origin,
  },
  streamUrl: {
    type: "string",
    defaultValue: WRDXR_DEFAULT_FILE,
  },
  remember: {
    type: "boolean",
    defaultValue: false as boolean,
  },
});
