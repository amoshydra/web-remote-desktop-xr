import { HTMLAttributes, useEffect, useRef } from "react";
import { useCachedDimension } from "../../hooks/useCachedDimension";

export interface CanvasVideoRendererProps extends HTMLAttributes<HTMLCanvasElement> {
  video?: HTMLVideoElement | null
}

export const CanvasVideoRenderer = ({ video, ...props }: CanvasVideoRendererProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [videoWidth, videoHeight] = useCachedDimension(video);

  useEffect(() => {
    const canvasElement = canvasRef.current!;
    const context = canvasElement.getContext("2d", { alpha: false })!;

    let isActive = true;

    const renderFrame = () => {
      if (!isActive) return;

      if (video) {
        const cw = Math.floor(videoWidth);
        const ch = Math.floor(videoHeight);
        canvasElement.width = cw;
        canvasElement.height = ch;
        context.drawImage(video, 0, 0, cw, ch);
      }
      requestAnimationFrame(renderFrame);
    };
    requestAnimationFrame(renderFrame);
    return () => {
      isActive = false;
    }
  }, [video, videoHeight, videoWidth]);

  return (
    <canvas ref={canvasRef} {...props} />
  )
}
