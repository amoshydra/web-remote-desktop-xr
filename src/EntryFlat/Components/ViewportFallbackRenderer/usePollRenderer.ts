import { OBSRequestTypes } from "obs-websocket-js";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { UseObsReturn } from "../../../hooks/useObs";

export const usePollRenderer = (obsProps: UseObsReturn, canvas: HTMLCanvasElement | null) => {
  const maxParallelLoadCount = useRef(0);
  const [screenshotRequests, setScreenshotsRequests] = useState<ScreenshotRequest[]>([]);
  const { request, requestBatch } = obsProps;

  useEffect(() => {
    let aborted = false;

    const loadSources = async () => {
      const scene = await request("GetCurrentProgramScene");
      if (aborted) return;

      const response = await request("GetSceneItemList", {
        sceneName: scene.sceneName
      });
      if (aborted) return;

      const sources = response.sceneItems as unknown as ResponseSource[];

      const requests = sources
        .filter(item => item.sceneItemEnabled)
        .map((item): ScreenshotRequest => ({
          requestType: "GetSourceScreenshot",
          requestData: {
            imageFormat: "jpg",
            imageCompressionQuality: 85,
            sourceUuid: item.sourceUuid,
          }
        }));
      setScreenshotsRequests(requests);
    };

    loadSources();

    return () => {
      aborted = true;
    }
  }, []);

  const canvasContext = useMemo(() => {
    const context = canvas?.getContext("2d", { alpha: false });
    if (!context) return null;
    return [canvas!, context] as const;
  }, [canvas])

  const pollScreenshot = useCallback(async (onDraw: (e: HTMLCanvasElement) => void) => {
    if (maxParallelLoadCount.current > 1) return;

    if (!canvasContext) return;
    const [canvas, context] = canvasContext;

    maxParallelLoadCount.current += 1;
    const results = await requestBatch(screenshotRequests);
    const responses = results.map(r => r.responseData as ResponseGetSourceScreenshot);
    const imageData = responses.at(0)?.imageData;

    if (imageData) {
      const blob = dataURLtoBlob(imageData);

      return createImageBitmap(blob)
        .then((imageBitmap) => {
          canvas.height = imageBitmap.height;
          canvas.width = imageBitmap.width;
          context.drawImage(imageBitmap, 0, 0);

          onDraw(canvas);
          maxParallelLoadCount.current -= 1;
        })
    }
    maxParallelLoadCount.current -= 1;
  }, [screenshotRequests, canvasContext]);

  return pollScreenshot;
}

interface ScreenshotRequest {
  requestType: "GetSourceScreenshot";
  requestData: OBSRequestTypes["GetSourceScreenshot"];
}

interface ResponseSource {
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


interface SceneTransform {
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

interface ResponseGetSourceScreenshot {
  imageData: string;
}


//**dataURL to blob**
function dataURLtoBlob(dataurl: string) {
  const [mimeString, data] = dataurl.split(',');
  const mime = mimeString.match(/:(.*?);/)![1];
  const bstr = atob(data);
  let n = bstr.length
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}
