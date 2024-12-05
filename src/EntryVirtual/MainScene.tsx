import { UseWebControlReturn } from "../components/WebControl";
import { Controls } from "./Controls";
import { Screen } from "./Screen";

export interface MainSceneProps {
  webControlProps: UseWebControlReturn;
}

export const MainScene = (props: MainSceneProps) => {
  const { webControlProps } = props;

  return (
    <>
      <Controls
        position={[-0.2, 0.85, -0.21]}
        webControlProps={webControlProps}
      />
      <hemisphereLight
        castShadow
        color={0xf0f0f0}
        groundColor={0x242424}
        intensity={1}
      />
      <Screen
        x={webControlProps.x}
        y={webControlProps.y}
        z={webControlProps.z}
        scale={webControlProps.scale}
        videoElement={webControlProps.player?.getMediaElement()}
      />
    </>
  )
}
