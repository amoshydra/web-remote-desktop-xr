import { Events } from "@wrdxr-app/events";
import { dataUriToBuffer } from "data-uri-to-buffer";
import { obsWebSocket } from "../services/obs.mjs";
import { sessionSocketService } from "../services/session-socket.service.mjs";
import { ObsScreenshare } from "./obs-screenshare.mjs";
import { Room } from "./room.mjs";

/**
 * @returns {WrdxrObsData}
 */
const getInitialData = () => ({
  isConnected: false,
  isStreaming: false,
  errors: [],
});

export class WrdxrObs {
  _data = getInitialData();

  /**
   * @param {import("node:http").Server} server
   */
  constructor(server) {
    // Setup rooms
    const room = new Room();
    // Automatically stop streaming when all clients have left
    room.on("end", async () => {
      try {
        await obsWebSocket.request("StopStream");
      } catch (error) {
        console.error(error);
      }
    });

    const obsScreenshareRoom = new Room();
    obsScreenshareRoom.on("start", () => {
      obsScreenshare.start();
    });
    obsScreenshareRoom.on("end", () => {
      obsScreenshare.stop();
    });

    const obsScreenSession = {
      fallbackScreenshare: {
        join: obsScreenshareRoom.join.bind(obsScreenshareRoom),
        exit: obsScreenshareRoom.exit.bind(obsScreenshareRoom),
      },
      join: room.join.bind(room),
      /**
       * @param {string} id
       */
      exit: (id) => {
        obsScreenSession.fallbackScreenshare.exit(id);
        room.exit(id);
      },
    };

    // Session Socket Service
    sessionSocketService.init(server, {
      [Events.Core.Connection]: ({
        id,
        handshake: {
          headers: { "user-agent": ua },
        },
      }) => {
        obsScreenSession.join(id);
        console.log(
          `[${sessionSocketService.map.size + 1}]    connected - ${id} - ${ua}`,
        );
      },
      [Events.Core.Disconnect]: ({ id }) => {
        obsScreenSession.exit(id);
        console.log(`[${sessionSocketService.map.size}] disconnected - ${id}`);
      },
      [Events.ObsScreen.Join]: ({ id }) =>
        obsScreenSession.fallbackScreenshare.join(id),
      [Events.ObsScreen.Exit]: ({ id }) =>
        obsScreenSession.fallbackScreenshare.exit(id),

      [Events.Obs.GetData]: (socket) => {
        socket.emit(Events.Obs.Data, this._data);
      },
      [Events.Obs.Stream.Toggle]: () => {
        obsWebSocket.request("ToggleStream");
      },
    });

    // Set up screensharing
    const obsScreenshare = new ObsScreenshare(async (imageData) => {
      const { buffer } = dataUriToBuffer(imageData);
      sessionSocketService.io.emit(Events.ObsScreen.Output, buffer);
    });

    obsScreenshare.loop.TICK_RATE = 60;
    this.screenshare = obsScreenshare;

    // Setup state
    // state - isStreaming
    syncConnection((isConnected) => {
      if (!isConnected) {
        this.updateData(getInitialData());
        return;
      }
      this.updateData((v) => ({
        ...v,
        isConnected,
      }));
    }).catch((error) => {
      this.updateData((v) => ({
        ...v,
        errors: [...v.errors, error.message],
      }));
      console.error(error);
    });

    // Setup state
    // state - isStreaming
    syncStreamingStatus((isStreaming) => {
      this.updateData((v) => ({
        ...v,
        isStreaming,
      }));
    }).catch((error) => {
      this.updateData((v) => ({
        ...v,
        errors: [...v.errors, error.message],
      }));
      console.error(error);
    });
  }

  /**
   * @param {WrdxrObsData | ((v: WrdxrObsData) => WrdxrObsData)} data
   */
  updateData(data) {
    const newData = typeof data === "function" ? data({ ...this._data }) : data;

    this._data = newData;
    sessionSocketService.io.emit(Events.Obs.Data, newData);
  }
}

/**
 * @param {(payload: boolean) => void} setValue
 */
const syncConnection = (setValue) => {
  setValue(false);

  return obsWebSocket
    .getIsConnected()
    .then(setValue)
    .then(() => {
      const connectionOpenHandler = () => setValue(true);
      const connectionCloseHandler = () => setValue(false);

      obsWebSocket.on("ConnectionOpened", connectionOpenHandler);
      obsWebSocket.on("ConnectionClosed", connectionCloseHandler);
      obsWebSocket.on("ConnectionOpened", connectionCloseHandler);
    });
};

/**
 * @param {(payload: boolean) => void} setValue
 */
const syncStreamingStatus = (setValue) => {
  setValue(false);
  /**
   * @param {{ outputActive: boolean }} param0
   */
  const handleStreamStatus = ({ outputActive }) => {
    setValue(outputActive);
  };
  return obsWebSocket
    .request("GetStreamStatus")
    .then(handleStreamStatus)
    .then(() => {
      obsWebSocket.on("StreamStateChanged", handleStreamStatus);
    });
};

/**
 * @typedef {{
 *   isStreaming: boolean,
 *   isConnected: boolean,
 *   errors: string[],
 * }} WrdxrObsData
 */
