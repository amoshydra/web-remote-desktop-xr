import { UseWebControlReturn } from "../components/WebControl";
import { Controller } from "./XRComponents/Controller";

import { Disclousure } from "./XRComponents/Disclousure";
import { Flex } from "./XRComponents/Flex";

const spacing = 0.08;

export interface ControlsProps {
  webControlProps: UseWebControlReturn;
  position: [number, number, number]
}

export const Controls = (props: ControlsProps) => {
  const { webControlProps, position } = props;
  return (
    <Disclousure
      position={position}
    >
      <Flex direction="y" gap={-spacing} position={[-0.08, 0.025, -0.25]}>
        <Controller
          key="scale"
          position={[0, 0, spacing]}
          onDistanceXChange={(delta) => {
            webControlProps.onScaleChange(v => v + (delta * 0.0001))
          }}
        />
        <Flex direction="z" gap={spacing}>
          <Controller
            key="x"
            onDistanceXChange={(delta) => {
              webControlProps.onXChange(v => v + (delta * 0.2))
            }}
          />
          <Controller
            key="y"
            onDistanceXChange={(delta) => {
              webControlProps.onYChange(v => v + (delta * 0.2))
            }}
          />
          <Controller
            key="z"
            onDistanceXChange={(delta) => {
              webControlProps.onZChange(v => v + (delta * 0.4))
            }}
          />
        </Flex>
        <Flex direction="z" gap={spacing}>
          <Controller
            key="reset"
            onClick={() => {
              webControlProps.resetPlayback();
            }}
          />
          <Controller
            key="mute"
            onClick={() => {
              webControlProps.onMutedChange(b => !b);
            }}
          />
        </Flex>
      </Flex>
    </Disclousure>
  );
}
