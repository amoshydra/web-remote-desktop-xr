import { useEffect, useState } from "react";
import { wrdxrSession } from "../services/session";

export interface UseObsReturn {
  isConnected: boolean;
  isStreaming: boolean;
  api: {
    stream: {
      toggle: () => void;
    }
  }
}



export const useObs = (): UseObsReturn => {
  const data = useSocketData(
    wrdxrSession.obs.requestData,
    wrdxrSession.obs.onData,
    wrdxrSession.obs.offData,
    {
      isConnected: false,
      isStreaming: false,
    }
  );
  return {
    isConnected: data.isConnected,
    isStreaming: data.isStreaming,
    api: {
      stream: {
        toggle() {
          wrdxrSession.obs.stream.toggle();
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
