import { createInitializer } from "../utils/createInitializer";
import { WRDXR_DEFAULT_FILE } from "./environment";

export const scaleInitailizer = createInitializer("scale", 0.00026);

export const posXInitailizer = createInitializer("x", 0);
export const posYInitailizer = createInitializer("y", 1.00);
export const posZInitailizer = createInitializer("z", -0.72);

export const mutedInitailizer = createInitializer("muted", false);

export const sourceInitializer = createInitializer("file", WRDXR_DEFAULT_FILE);
