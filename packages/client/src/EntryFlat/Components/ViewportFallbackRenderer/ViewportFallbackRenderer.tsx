import { useState } from "react";
import { UseObsReturn } from "../../../hooks/useObs";
import { useSocketPushRenderer } from "./useSocketPushRenderer";

export interface ViewportFallbackRendererProps {
  obsProps: UseObsReturn;
  className?: string;
}

const noop = () => {};

export const ViewportFallbackRenderer = ({ obsProps, ...props }: ViewportFallbackRendererProps) => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);

  useSocketPushRenderer(canvas, noop);

  return (
    <canvas {...props} ref={setCanvas} />
  );
}
