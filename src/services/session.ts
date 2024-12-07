
import { io } from "socket.io-client";

const socket = io();

const obsScreen = {
  join() {
    socket.emit("obs-screen:join");
  },
  exit() {
    socket.emit("obs-screen:exit");
  },
  onOutput(handler: (buffer: ArrayBuffer) => void) {
    socket.on("obs-screen:output", handler)
  },
  offOutput(handler: (buffer: ArrayBuffer) => void) {
    socket.off("obs-screen:output", handler)
  },
}

export const wrdxrSession = {
  obsScreen,
};
