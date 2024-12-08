import OBSWebSocket from "obs-websocket-js";

const obs = new OBSWebSocket();

const url = "http://localhost:4455" || process.env.VITE_WRDXR_OBS_WEBSOCKET;
const password = process.env.VITE_WRDXR_OBS_WEBSOCKET_PASSWORD;

const connectionPromise = obs.connect(url, password);

/**
 * @type {(typeof obs)["call"]}
 */
export const request = (...args) => connectionPromise.then(() => obs.call(...args))

/**
 * @type {(typeof obs)["callBatch"]}
 */
export const requestBatch = (...args) => connectionPromise.then(() => obs.callBatch(...args))

export const on = obs.on;

export const off = obs.off;
