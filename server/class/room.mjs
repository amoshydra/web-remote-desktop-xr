import EventEmitter from "node:events";

/**
 * @typedef {{
 *   start: []
 *   end: []
 * }} RoomEvents
 */

/**
 * @extends {EventEmitter<RoomEvents>}
 */
export class Room extends EventEmitter {
  /**
   * @type {Set<string>}
   */
  participants = new Set();

  /**
   * @param {string} id 
   */
  join(id) {
    this.participants.add(id);

    if (this.participants.size === 1) {
      this.emit("start");
    }
  }
  /**
   * @param {string} id 
   */
  exit(id) {
    this.participants.delete(id);

    if (this.participants.size === 0) {
      this.emit("end");
    }
  }
}
