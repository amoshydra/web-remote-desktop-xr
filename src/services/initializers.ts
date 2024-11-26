import { createInitializer } from "../utils/createInitializer";
import { WRDXR_DEFAULT_FILE } from "./environment";

export const scaleInitailizer = createInitializer("scale", 1);

export const mutedInitailizer = createInitializer("muted", false);

export const sourceInitializer = createInitializer("file", WRDXR_DEFAULT_FILE);
