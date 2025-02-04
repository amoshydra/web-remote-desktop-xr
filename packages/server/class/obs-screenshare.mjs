import { obsWebSocket } from "../services/obs.mjs";
import { Loop } from "./loop.mjs";

export class ObsScreenshare {
  running = false;

  /**
   * @type {ScreenshotRequest | null}
   */
  screenshotsRequest = null;

  maxParallelLoadCount = 0;

  /**
   * @param {(imageData: string) => void} onUpdate 
   */
  constructor(onUpdate) {
    this.loop = new Loop(this.updateScreenshot.bind(this));
    this.updateSources()
      .catch((error) => {
        console.error(error)
      })
    ;

    /**
     * @type {(imageData: string) => void}
     */
    this.onUpdate = onUpdate || (() => { });
  }

  async updateSources() {
    const scene = await obsWebSocket.request("GetCurrentProgramScene");

    const response = await obsWebSocket.request("GetSceneItemList", {
      sceneName: scene.sceneName
    });

    const sources = /** @type {ResponseSource[]} */ (
      /** @type{unknown} */ (response.sceneItems)
    );

    const screenshotRequest = sources
      .filter(item => item.sceneItemEnabled)
      .map(
        /**
         * @return {ScreenshotRequest}
         */
        (item) => ({
          imageFormat: "jpg",
          imageCompressionQuality: 65,
          sourceUuid: item.sourceUuid,
        })
      )
      .at(0)
    ;

    this.screenshotsRequest = screenshotRequest || null;
  }

  async updateScreenshot() {
    if (!this.loop.running) return;
    if (this.maxParallelLoadCount > 1) return;

    const screenshotRequest = this.screenshotsRequest;

    if (!screenshotRequest) {
      return;
    }

    this.maxParallelLoadCount += 1;
    try {
      const { imageData } = await obsWebSocket.request("GetSourceScreenshot", screenshotRequest)
      this.onUpdate(imageData);
    } catch (error) {
      console.error(error);
    }

    this.maxParallelLoadCount -= 1;
  }

  start() {
    this.loop.start();
  }

  stop() {
    this.loop.stop();
  }
}
/**
 * @typedef {import("obs-websocket-js").OBSRequestTypes["GetSourceScreenshot"]} ScreenshotRequest;
 * @typedef {import("../interfaces/obs.js").ResponseSource} ResponseSource
 */
