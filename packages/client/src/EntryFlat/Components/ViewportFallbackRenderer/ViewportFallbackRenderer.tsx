import { useState } from "react";
import { useSocketPushRenderer } from "./useSocketPushRenderer";

export interface ViewportFallbackRendererProps {
  className?: string;
}

const noop = () => {};

export const ViewportFallbackRenderer = (props: ViewportFallbackRendererProps) => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);

  useSocketPushRenderer(canvas, noop);

  return (
    <canvas {...props} ref={setCanvas} />
  );
}
