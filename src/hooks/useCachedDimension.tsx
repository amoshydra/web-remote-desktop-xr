import { useRef } from "react";

const initialDimension = { width: 1920, height: 1080 };

export const useCachedDimension = (video?: HTMLVideoElement | null) => {
  const dimension = useRef(initialDimension);
  const videoWidth = video?.videoWidth || 0;
  const videoHeight = video?.videoHeight || 0;

  if ((videoWidth + videoHeight) !== 0) {
    dimension.current.width = videoWidth;
    dimension.current.height = videoHeight;
  };

  return [dimension.current.width, dimension.current.height] as [number, number];
}
