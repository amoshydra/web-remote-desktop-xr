import { useEffect, useState } from "react";
import { UseObsReturn } from "../../../hooks/useObs";
import { usePollRenderer } from "./usePollRenderer";

export interface ViewportFallbackRendererProps {
  obsProps: UseObsReturn;
  className?: string;
}

export const ViewportFallbackRenderer = ({ obsProps, ...props }: ViewportFallbackRendererProps) => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);

  const poll = usePollRenderer(obsProps, canvas);

  useEffect(() => {
    let aborted = false;
    let lastDraw = -Infinity;
    const draw = (timestamp: number) => {
      if (timestamp - lastDraw > (1000 / 24)) {
        poll(() => { });
        lastDraw = timestamp;
      }

      if (aborted) return;
      requestAnimationFrame(draw);
    };
    draw(0);
    return () => {
      aborted = true;
    };
  }, [poll])

  return (
    <canvas {...props} ref={setCanvas} />
  );
}
