import { Canvas, useThree } from "@react-three/fiber";
import { createXRStore, XR } from "@react-three/xr";
import { Ref, useEffect, useImperativeHandle, useState } from "react";
import { LinearToneMapping, Mesh } from "three";
import { UseWebControlReturn } from "../components/WebControl";
import { UseObsReturn } from "../hooks/useObs";
import { MainScene } from "./MainScene";

const store = createXRStore({
  frameBufferScaling: 2,
});

export interface EntryRef {
  enter: (mode: "ar" | "vr") => void;
}
export interface EntryVirtualProps {
  webControlProps: UseWebControlReturn;
  innerRef: Ref<EntryRef>;
  obsProps: UseObsReturn;
}

export const EntryVirtual = ({ webControlProps, innerRef, obsProps }: EntryVirtualProps) => {
  const [ready, setReady] = useState(false);

  useImperativeHandle<EntryRef, EntryRef>(innerRef, () => ({
    enter: (mode: "ar" | "vr") => {
      setReady(true);
      switch (mode) {
        case "ar": {
          store.enterXR("immersive-ar"); break;
        }
        case "vr": {
          store.enterXR("immersive-vr"); break;
        }
      }
    },
  }));

  return (
    <Canvas>
      <ToneMapping />
      <color attach="background" args={[0x2e2e2e]} />
      <XR store={store}>
        {
          ready && (
            <MainScene
              webControlProps={webControlProps}
              obsProps={obsProps}
            />
          )
        }
      </XR>
    </Canvas>
  )
}

function ToneMapping() {
  const { gl, scene } = useThree(({ gl, scene }) => ({ gl, scene }));
  useEffect(() => {
    gl.toneMapping = LinearToneMapping;
    gl.toneMappingExposure = 1;
    scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.material.needsUpdate = true;
      }
    });
  }, [gl, scene]);
  return null;
}
