import { useFrame } from "@react-three/fiber";

import { useMemo, useRef, useState } from "react";
import { CanvasTexture, LinearFilter, SRGBColorSpace } from "three";
import { usePollRenderer } from "../../EntryFlat/Components/ViewportFallbackRenderer/usePollRenderer";
import { UseObsReturn } from "../../hooks/useObs";

export interface ObsCanvasScreenProps {
  obsProps: UseObsReturn;
}

export const ObsCanvasScreen = ({ obsProps }: ObsCanvasScreenProps) => {
  const textureRef = useRef<CanvasTexture | null>(null);
  const [canvasWidth, setCanvasWidth] = useState(1000);
  const [canvasHeight, setCanvasHeight] = useState(1000);
  const [ready, setReady] = useState(false);

  const canvasElement = useMemo(() => {
    const canvas = document.createElement('canvas');
    return canvas;
  }, [])

  const poll = usePollRenderer(obsProps, canvasElement);

  const update = useMemo(() => {
    if (ready) {
      return () => {
        return poll(() => {
          const texture = textureRef.current!;
          texture.needsUpdate = true;
        })
      }
    }
    return () => poll((canvas) => {
      setReady(true);
      const texture = textureRef.current;
      setCanvasWidth(canvas.width);
      setCanvasHeight(canvas.height);
      if (!texture) return;
      texture.needsUpdate = true;
    });
  }, [ready, poll]);

  useFrame(update);

  if (!ready) return null;

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
