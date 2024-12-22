import { useEffect, useState } from "react";
import { UseWrdxrSessionReturn } from "./useWrdxrSession";

export interface UseObsReturn {
  isConnected: boolean;
  isStreaming: boolean;
  api: {
    stream: {
      toggle: () => void;
    }
  }
}


const getInitialData = () => ({
  isConnected: false,
  isStreaming: false,
});

export const useObs = (wrdxrSessionProps: UseWrdxrSessionReturn): UseObsReturn => {
  const data = useSocketData(
    wrdxrSessionProps.session.obs.requestData,
    wrdxrSessionProps.session.obs.onData,
    wrdxrSessionProps.session.obs.offData,
    getInitialData(),
  );

  const renderData = wrdxrSessionProps.isConnected ? data : getInitialData();

  return {
    isConnected: renderData.isConnected,
    isStreaming: renderData.isStreaming,
    api: {
      stream: {
        toggle() {
          wrdxrSessionProps.session.obs.stream.toggle();
        }
      }
    }
  };
}



const useSocketData = <T>(
  getData: () => void,
  on: (handler: (params: T) => void) => void,
  off: (handler: (params: T) => void) => void,
  initialData: T,
) => {
  const [data, setData] = useState<T>(initialData);
  useEffect(() => {
    on(setData);
    getData();
    return () => {
      off(setData);
    };
  }, []);

  return data;
};
