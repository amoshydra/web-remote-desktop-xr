import { useState } from "react";
import { UseWrdxrSessionReturn } from "../../../hooks/useWrdxrSession";
import { useSocketPushRenderer } from "./useSocketPushRenderer";

export interface ViewportFallbackRendererProps {
  wrdxrSessionProps: UseWrdxrSessionReturn;
  className?: string;
}

const noop = () => {};

export const ViewportFallbackRenderer = (props: ViewportFallbackRendererProps) => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);

  useSocketPushRenderer(props.wrdxrSessionProps, canvas, noop);

  return (
    <canvas {...props} ref={setCanvas} />
  );
}
