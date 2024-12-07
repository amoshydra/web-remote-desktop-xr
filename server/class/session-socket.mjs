import { Server, Socket } from "socket.io";

export class SessionSocket {

  constructor() {
    /**
     * @type {Map<string, Socket>}
     */
    this.map = new Map();
    /**
     * @type {import("socket.io").Server | null}
     */
    this._io = null;
  }

  get io() {
    if (!this._io) throw new Error("not initialized");
    return this._io;
  }

  /**
   * @param {import("node:http").Server} server 
   * @param {Record<string, (socket: Socket, ...args: any[]) => void>} events 
   */
  init(server, events) {
    const io = new Server(server);
    this._io = io;

    io.on('connection', (socket) => {
      const clientId = socket.id;
      events.connection?.(socket);

      this.map.set(clientId, socket);
      const { disconnect, ...otherEvents } = events;

      Object.entries(otherEvents)
        .map(([key, fn]) => {
          socket.on(key, fn.bind(null, socket));
        })
        ;

      socket.on("disconnect", (...args) => {
        this.map.delete(clientId);
        disconnect(socket, ...args);
      });
    });
  }
  /**
   * 
   * @param {string} key 
   * @param {() => void} fn 
   */
  addEventListener(key, fn) {
    Array.from(this.map.entries()).forEach(([clientId, socket]) => {
      socket.on(key, fn);
    });
  }
}

