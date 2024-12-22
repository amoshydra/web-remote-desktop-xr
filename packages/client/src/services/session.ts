
import { Events } from "@wrdxr-app/events";
import { io } from "socket.io-client";

const socket = io();

type ObsScreenOnOutputHandler = (buffer: ArrayBuffer) => void;

const obsScreen = {
  join() {
    socket.emit(Events.ObsScreen.Join);
  },
  exit() {
    socket.emit(Events.ObsScreen.Exit);
  },
  onOutput(handler: ObsScreenOnOutputHandler) {
    socket.on(Events.ObsScreen.Output, handler)
  },
  offOutput(handler: ObsScreenOnOutputHandler) {
    socket.off(Events.ObsScreen.Output, handler)
  },
}

interface ObsOnConnectHandlerData {
  isConnected: boolean;
  isStreaming: boolean;
}
type ObsOnConnectHandler = (data: ObsOnConnectHandlerData) => void;

const obs = {
  stream: {
    toggle: () => socket.emit(Events.Obs.Stream.Toggle),
  },
  requestData() {
    socket.emit(Events.Obs.GetData);
  },
  onData(handler: ObsOnConnectHandler) {
    socket.on(Events.Obs.Data, handler);
  },
  offData(handler: ObsOnConnectHandler) {
    socket.off(Events.Obs.Data, handler);
  },
}

export const wrdxrSession = {
  obs,
  obsScreen,
};
