// Reference: https://github.com/timetocode/node-game-loop

const hrtimeMs = function () {
  const time = process.hrtime()
  return time[0] * 1000 + time[1] / 1000000
}

export class Loop {
  TICK_RATE = 20;
  tick = 0;
  previous = hrtimeMs();
  running = false;
  /**
   * @type {NodeJS.Timeout}
   */
  timeout = 0

  /**
   * 
   * @param {(delta: number, tick: number) => void} receivingLoop 
   */
  constructor(receivingLoop) {
    this.receivingLoop = receivingLoop;
  }

  loop() {
    if (!this.running) return;

    const tickLengthMs = 1000 / this.TICK_RATE;
    this.timeout = setTimeout(this.loop.bind(this), tickLengthMs)
    let now = hrtimeMs()
    let delta = (now - this.previous) / 1000
    this.update(delta, this.tick);
    this.previous = now
    this.tick++
  }

  start() {
    this.stop();
    this.running = true;
    this.loop();
  }

  stop() {
    this.running = false;
    clearTimeout(this.timeout);
  }

  /**
   * 
   * @param {number} delta 
   * @param {number} tick 
   * @returns {void}
   */
  update(delta, tick) {
    this.receivingLoop(delta, tick);
  }
}
