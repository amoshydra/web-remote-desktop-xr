
export interface ResponseSource {
  /**
   * @example "pipewire-camera-source",
   */
  "inputKind": string;
  /**
   * @example null,
   */
  "isGroup": unknown;
  /**
   * @example "OBS_BLEND_NORMAL",
   */
  "sceneItemBlendMode": string;
  "sceneItemEnabled": boolean;
  /**
   * @example 13,
   */
  "sceneItemId": number;
  /**
   * @example 1,
   */
  "sceneItemIndex": number;
  /**
   * @example false,
   */
  "sceneItemLocked": boolean;
  "sceneItemTransform": SceneTransform,
  /**
   * "Video Capture Device (PipeWire) (BETA)",
   */
  "sourceName": string;
  /**
   * "OBS_SOURCE_TYPE_INPUT",
   */
  "sourceType": string;
  /**
   * "5e0cca1b-8645-43f4-90b3-394898a90241"
   */
  "sourceUuid": string;
}

export interface SceneTransform {
  "alignment": number;
  "boundsAlignment": number;
  "boundsHeight": number;
  /**
   * @example "OBS_BOUNDS_NONE"
   */
  "boundsType": number;
  "boundsWidth": number;
  "cropBottom": number;
  "cropLeft": number;
  "cropRight": number;
  "cropToBounds": boolean;
  "cropTop": number;
  "height": number;
  "positionX": number;
  "positionY": number;
  "rotation": number;
  "scaleX": number;
  "scaleY": number;
  "sourceHeight": number;
  "sourceWidth": number;
  "width": number;
}
