
import { useCallback, useMemo, useRef, useState } from "react";
import { CanvasTexture, LinearFilter, SRGBColorSpace } from "three";
import { useSocketPushRenderer } from "../../EntryFlat/Components/ViewportFallbackRenderer/useSocketPushRenderer";

export interface ObsCanvasScreenProps {}

export const ObsCanvasScreen = (_p: ObsCanvasScreenProps) => {
  const textureRef = useRef<CanvasTexture | null>(null);
  const [canvasWidth, setCanvasWidth] = useState(1000);
  const [canvasHeight, setCanvasHeight] = useState(1000);
  const [ready, setReady] = useState(false);

  const canvasElement = useMemo(() => {
    const canvas = document.createElement('canvas');
    return canvas;
  }, [])

  const draw = useCallback((canvas: HTMLCanvasElement) => {
    const texture = textureRef.current;
    setCanvasWidth(canvas.width);
    setCanvasHeight(canvas.height);

    setReady(true);

    if (!texture) return;
    texture.needsUpdate = true;
  }, []);

  useSocketPushRenderer(canvasElement, draw);

  if (!ready) return false;

  return (
    <mesh>
      <planeGeometry args={[canvasWidth, canvasHeight]} />
      <meshBasicMaterial>
        <canvasTexture
          attach="map"
          image={canvasElement}
          ref={textureRef}
          colorSpace={SRGBColorSpace}
          minFilter={LinearFilter}
          magFilter={LinearFilter}
          anisotropy={16}
        />
      </meshBasicMaterial>
    </mesh>
  )
}
