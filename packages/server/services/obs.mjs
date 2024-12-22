import OBSWebSocket from "obs-websocket-js";

const obs = new OBSWebSocket();

const url = process.env.WRDXR_OBS_WEBSOCKET;
const password = process.env.WRDXR_OBS_WEBSOCKET_PASSWORD;

const connectionPromise = obs.connect(url, password)
  .then(() => {
    return true;
  })
  .catch((error) => {
    console.error(error);
    return false;
  })
;

export const obsWebSocket = {
  getIsConnected: () => connectionPromise,
  /**
   * @type {(typeof obs)["call"]}
   */
  request: (...args) => connectionPromise.then(() => obs.call(...args)),

  /**
   * @type {(typeof obs)["callBatch"]}
   */
  requestBatch: (...args) => connectionPromise.then(() => obs.callBatch(...args)),

  on: obs.on.bind(obs),

  off: obs.off.bind(obs),
};
