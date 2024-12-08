import { dataUriToBuffer } from 'data-uri-to-buffer';
import { ObsScreenshare } from "../class/obs-screenshare.mjs";
import { Room } from "../class/room.mjs";
import { request } from './obs.mjs';
import { sessionSocketService } from "./session-socket.service.mjs";

const obsScreenshare = new ObsScreenshare(async (imageData) => {
  const { buffer } = dataUriToBuffer(imageData);
  sessionSocketService.io.emit("obs-screen:output", buffer);
});

obsScreenshare.loop.TICK_RATE = 60;

const room = new Room();
// Automatically stop streaming when all clients have left
room.on("end", () => {
  request("StopStream");
});

const obsScreenshareRoom = new Room();
obsScreenshareRoom.on("start", () => {
  obsScreenshare.start();
});
obsScreenshareRoom.on("end", () => {
  obsScreenshare.stop();
});

export const obsScreenSession = {
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
  }
};
