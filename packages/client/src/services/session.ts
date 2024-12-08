
import { Events } from "@wrdxr-app/events";
import { io } from "socket.io-client";

const socket = io();

const obsScreen = {
  join() {
    socket.emit(Events.ObsScreen.Join);
  },
  exit() {
    socket.emit(Events.ObsScreen.Exit);
  },
  onOutput(handler: (buffer: ArrayBuffer) => void) {
    socket.on(Events.ObsScreen.Output, handler)
  },
  offOutput(handler: (buffer: ArrayBuffer) => void) {
    socket.off(Events.ObsScreen.Output, handler)
  },
}

export const wrdxrSession = {
  obsScreen,
};
