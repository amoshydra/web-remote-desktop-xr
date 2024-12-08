import { useEffect, useMemo, useRef } from "react";
import { wrdxrSession } from "../../../services/session";

export const useSocketPushRenderer = (canvas: HTMLCanvasElement | null, onDraw: (e: HTMLCanvasElement) => void) => {
  const maxParallelLoadCount = useRef(0);

  const canvasContext = useMemo(() => {
    const context = canvas?.getContext("2d", { alpha: false });
    if (!context) return null;
    return [canvas!, context] as const;
  }, [canvas])

  useEffect(() => {
    wrdxrSession.obsScreen.join();
    return () => {
      wrdxrSession.obsScreen.exit();
    }
  }, []);

  useEffect(() => {
    const handleDraw = (buffer: ArrayBuffer) => {
      if (maxParallelLoadCount.current > 1) return;

      if (!canvasContext) return;
      const [canvas, context] = canvasContext;

      maxParallelLoadCount.current += 1;
      
      const blob = new Blob([buffer], { type: 'image/jpg' });
      return createImageBitmap(blob)
        .then((imageBitmap) => {
          canvas.height = imageBitmap.height;
          canvas.width = imageBitmap.width;
          context.drawImage(imageBitmap, 0, 0);
          imageBitmap.close();

          onDraw(canvas);
        })
        .catch((error) => console.error(error))
        .finally(() => {
          maxParallelLoadCount.current -= 1;
        })
    }
    wrdxrSession.obsScreen.onOutput(handleDraw)
    return () => {
      wrdxrSession.obsScreen.offOutput(handleDraw);
    }
  }, [onDraw, canvasContext]);
}
