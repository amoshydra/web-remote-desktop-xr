import { UseWebControlReturn } from "../components/WebControl";
import { Controls } from "./Controls";
import { Screen } from "./Screen/Screen";

export interface MainSceneProps {
  webControlProps: UseWebControlReturn;
}

export const MainScene = (props: MainSceneProps) => {
  const { webControlProps } = props;

  return (
    <>
      <Controls
        position={[-0.2, 0.9, -0.21]}
        webControlProps={webControlProps}
      />
      <hemisphereLight
        castShadow
        color={0xf0f0f0}
        groundColor={0x242424}
        intensity={1}
      />
      <Screen
        webControlProps={webControlProps}
      />
    </>
  )
}
