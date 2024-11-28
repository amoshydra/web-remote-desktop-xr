import { UseWebControlReturn } from "../components/WebControl";
import { Screen } from "./Screen";
import { Controller } from "./XRComponents/Controller";
import { Disclousure } from "./XRComponents/Disclousure";

export interface MainSceneProps {
  webControlProps: UseWebControlReturn;
}

const spacing = -0.07;

export const MainScene = (props: MainSceneProps) => {
  const { webControlProps } = props;

  return (
    <>
      <group position={[-0.25, 0.85, -0.5]}>
        <Disclousure
          position={[-0.05, 0, 0.26]}
        >
          <group position={[0, -1 * spacing, 0.1]}>
            <Controller
              key="scale"
              onDistanceXChange={(delta) => {
                webControlProps.onScaleChange(v => v + (delta * 0.0001))
              }}
              position={[0, 0, 0]}
            />
          </group>
          <group position={[0, 0 * spacing, 0.1]}>
            <Controller
              key="x"
              onDistanceXChange={(delta) => {
                webControlProps.onXChange(v => v + (delta * 0.2))
              }}
              position={[0, 0, -1 * spacing]}
            />
            <Controller
              key="y"
              onDistanceXChange={(delta) => {
                webControlProps.onYChange(v => v + (delta * 0.2))
              }}
              position={[0, 0, 0 * spacing]}
            />
            <Controller
              key="z"
              onDistanceXChange={(delta) => {
                webControlProps.onZChange(v => v + (delta * 0.4))
              }}
              position={[0, 0, 1 * spacing]}
            />
          </group>
          <group position={[0, 1 * spacing, 0.1]}>
            <Controller
              key="reset"
              onClick={() => {
                webControlProps.resetPlayback();
              }}
              position={[0, 0, 0 * spacing]}
            />
            <Controller
              key="mute"
              onClick={() => {
                webControlProps.onMutedChange(b => !b);
              }}
              position={[0, 0, 1 * spacing]}
            />
          </group>

        </Disclousure>
      </group>
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
