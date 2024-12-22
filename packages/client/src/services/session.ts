
import { Events } from "@wrdxr-app/events";
import { io, Socket } from "socket.io-client";

type ObsScreenOnOutputHandler = (buffer: ArrayBuffer) => void;

interface ObsOnConnectHandlerData {
  isConnected: boolean;
  isStreaming: boolean;
}
type ObsOnConnectHandler = (data: ObsOnConnectHandlerData) => void;


export class WrdxrSession {
  public obs;
  public obsScreen;

  private _socket: Socket | null = null

  constructor() {
    this.obsScreen = {
      join: () => {
        this.socket.emit(Events.ObsScreen.Join);
      },
      exit: () => {
        this.socket.emit(Events.ObsScreen.Exit);
      },
      onOutput: (handler: ObsScreenOnOutputHandler) => {
        this.socket.on(Events.ObsScreen.Output, handler)
      },
      offOutput: (handler: ObsScreenOnOutputHandler) => {
        this.socket.off(Events.ObsScreen.Output, handler)
      },
    }
    
    this.obs = {
      stream: {
        toggle: () => this.socket.emit(Events.Obs.Stream.Toggle),
      },
      requestData: () => {
        this.socket.emit(Events.Obs.GetData);
      },
      onData: (handler: ObsOnConnectHandler) => {
        this.socket.on(Events.Obs.Data, handler);
      },
      offData: (handler: ObsOnConnectHandler) => {
        this.socket.off(Events.Obs.Data, handler);
      },
    }
  }

  get connected() {
    return this._socket?.connected || false;
  }

  connect(url = "/") {
    this._socket = io(url);
  }
  disconnect() {
    this._socket?.disconnect();
    this._socket = null;
  }

  onConnected(handler: () => void) {
    this.socket.on("connect", handler);
  }

  onError(handler: (error: Error) => void) {
    this.socket.on("connect_error", handler);
  };

  onDisconnected(handler: () => void) {
    this.socket.on("disconnect", handler);
  }

  private get socket() {
    return this._socket as Socket;
  }
}
