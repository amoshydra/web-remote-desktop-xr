import { useEffect } from "react";
import { UseWebControlReturn } from "../components/WebControl";
import { Controller } from "../Controller";
import { Screen } from "../Screen";
export interface MainSceneProps {
  webControlProps: UseWebControlReturn;
}

const spacing = -0.07;

export const MainScene = (props: MainSceneProps) => {
  const { webControlProps } = props;

  useEffect(() => {
    webControlProps.resetPlayback();
  }, [webControlProps.resetPlayback]);

  return (
    <>
      <group position={[-0.25, 0.85, -0.5]}>
        <Controller
          onDistanceXChange={(delta) => {
            webControlProps.onScaleChange(webControlProps.scale + (delta * 1))
          }}
          position={[0, 0 * spacing, 0]}
        />
        <Controller
          onClick={() => {
            webControlProps.onMutedChange(!webControlProps.muted);
          }}
          position={[0, 1 * spacing, 0]}
        />
        <Controller
          onClick={() => {
            webControlProps.resetPlayback();
          }}
          position={[0, 2 * spacing, 0]}
        />
      </group>
      <hemisphereLight
        castShadow
        color={0xf0f0f0}
        groundColor={0x242424}
        intensity={1}
      />
      <Screen
        scale={webControlProps.scale}
        videoElement={webControlProps.player?.getMediaElement()}
      />
    </>
  )
}