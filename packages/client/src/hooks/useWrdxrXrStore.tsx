import { createXRStore, XRStore } from "@react-three/xr";
import { useEffect, useState } from "react";

export interface UseWrdxrXrStoreProps {
  store: XRStore;
  state: ReturnType<XRStore["getState"]>;
}

const enableDepthSensing = false;

const store = createXRStore({
  frameBufferScaling: 2,
  ...(enableDepthSensing
    ? {
        depthSensing: true,
        hand: {
          model: false,
        },
      }
    : {}),
});

export const useWrdxrXrStore = (): UseWrdxrXrStoreProps => {
  const [state, setState] = useState(store.getState());
  useEffect(() => {
    store.subscribe((state) => {
      setState(state);
    });
  }, []);

  return {
    state,
    store,
  };
};
