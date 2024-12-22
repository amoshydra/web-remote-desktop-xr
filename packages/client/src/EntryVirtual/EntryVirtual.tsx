import { Canvas, useThree } from "@react-three/fiber";
import { useXRStore, XR } from "@react-three/xr";
import { ReactNode, useEffect, useState } from "react";
import { LinearToneMapping, Mesh } from "three";
import { UseWebControlReturn } from "../components/WebControl";
import { UseWrdxrSessionReturn } from "../hooks/useWrdxrSession";
import { UseWrdxrXrStoreProps } from "../hooks/useWrdxrXrStore";
import { MainScene } from "./MainScene";

export interface EntryRef {
  enter: (mode: "ar" | "vr") => void;
}
export interface EntryVirtualProps {
  webControlProps: UseWebControlReturn;
  wrdxrXrStoreProps: UseWrdxrXrStoreProps;
  wrdxrSessionProps: UseWrdxrSessionReturn;
}

export const EntryVirtual = ({
  wrdxrSessionProps,
  webControlProps,
  wrdxrXrStoreProps: UseWrdxrXrStoreProps,
}: EntryVirtualProps) => {
  const { store } = UseWrdxrXrStoreProps;

  return (
    <Canvas>
      <ToneMapping />
      <color attach="background" args={[0x2e2e2e]} />
      <XR store={store}>
        <XrChild>
          <MainScene
            wrdxrSessionProps={wrdxrSessionProps}
            webControlProps={webControlProps}
          />
        </XrChild>
      </XR>
    </Canvas>
  );
};

const XrChild = ({ children }: { children: ReactNode }) => {
  const store = useXRStore();
  const [mode, setMode] = useState(store.getState().mode);
  useEffect(() => {
    store.subscribe((state) => {
      setMode(state.mode);
    });
  }, [store]);

  if (!mode) return null;

  return children;
};

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
