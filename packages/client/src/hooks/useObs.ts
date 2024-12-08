import { EventEmitter } from "eventemitter3";
import { OBSEventTypes, RequestBatchRequest, ResponseMessage } from "obs-websocket-js";
import { useEffect, useState } from "react";
import { WRDXR_OBS_WEBSOCKET, WRDXR_OBS_WEBSOCKET_PASSWORD } from "../services/environment";
import { obs } from "../services/obs";

export interface UseObsReturn {
  isStreaming: boolean;
  isConnected: boolean;
  outputSettings: any[];
  profiles: any[];
  request: typeof obs.call
  requestBatch: typeof obs.callBatch
}

let connectionPromiseChain = Promise.resolve();

export const useObs = (): UseObsReturn => {
  const isConnected = useConnection(WRDXR_OBS_WEBSOCKET, WRDXR_OBS_WEBSOCKET_PASSWORD);
  const isStreaming = useIsStreaming(isConnected);
  const outputSettings = useOutputSettings(isConnected);
  const profiles = useProfiles(isConnected);
  return {
    isStreaming,
    isConnected,
    outputSettings,
    profiles,
    request: (...args) => connectionPromiseChain.then(() => obs.call(...args)),
    requestBatch: (...args) => connectionPromiseChain.then(() => obs.callBatch(...args)),
  };
}

const createSubscriptionHook = <T, Event extends keyof OBSEventTypes>(
  defaultValue: T,
  event: Event,
  subscriber: (arg: OBSEventTypes[Event]) => T,
  getter: () => Promise<T>
) => {
  return (isConnected: boolean) => {
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
      let aborted = false;

      (async () => {
        if (!isConnected) return;

        await connectionPromiseChain;
        if (aborted) return;

        const v = await getter();
        if (aborted) return;

        setValue(v);
      })();

      const listener: EventEmitter.EventListener<OBSEventTypes, Event> = (...payload) => {
        setValue(subscriber(payload[0]));
      }
      obs.on<Event>(event, listener);
      return () => {
        aborted = true;
        obs.off<Event>(event, listener);
      };
    }, []);
    return value;
  }
}

const useConnection = (url: string, password: string) => {
  const [value, setValue] = useState<boolean>(true);

  useEffect(() => {
    let aborted = false;

    const connectionOpenHandler = () => setValue(true);
    const connectionCloseHandler = () => setValue(false);

    connectionPromiseChain = (
      connectionPromiseChain
        .then(async () => {
          await obs.connect(url, password);
          if (aborted) return;
          setValue(true);
        })
        .catch((e) => {
          console.error(e);
        })
    );
    obs.on("ConnectionOpened", connectionOpenHandler);
    obs.on("ConnectionClosed", connectionCloseHandler);
    obs.on("ConnectionOpened", connectionCloseHandler);

    return () => {
      aborted = true;
      connectionPromiseChain = (
        connectionPromiseChain
          .then(async () => {
            obs.disconnect()
              .then(connectionCloseHandler)
              .catch((e) => {
                // Don't change state on error
                console.error(e);
              })
          })
      );
      obs.off("ConnectionOpened", connectionOpenHandler);
      obs.off("ConnectionClosed", connectionCloseHandler);
      obs.off("ConnectionOpened", connectionCloseHandler);
    };
  }, [url, password]);
  return value;
};

const useOutputSettings = (isConnected: boolean) => {
  const [outputSettings, setOutputSettings] = useState<any[]>([]);

  let aborted = false;
  useEffect(() => {
    (async () => {
      if (!isConnected) return;
      
      await connectionPromiseChain;
      if (aborted) return;

      const { outputs } = await obs.call('GetOutputList');
      if (aborted) return;

      const settings = await obs.callBatch(
        outputs.map((output) => ({
          requestType: "GetOutputSettings",
          requestData: output as RequestBatchRequest<"GetOutputSettings">["requestData"],
        }))
      ) as ResponseMessage<"GetOutputSettings">[];
      if (aborted) return;

      const outputSettings = settings.filter(r => r.requestStatus.result).map(r => r.responseData.outputSettings)
      setOutputSettings(outputSettings);
    })();
    return () => {
      aborted = true;
    }
  }, [isConnected]);
  return outputSettings;
};

const useIsStreaming = createSubscriptionHook(
  false,
  "StreamStateChanged",
  ({ outputActive }) => outputActive,
  () => obs.call("GetStreamStatus").then(({ outputActive }) => outputActive),
);


const useProfiles = createSubscriptionHook(
  [],
  "ProfileListChanged",
  ({ profiles }) => profiles,
  () => obs.call("GetProfileList").then((o) => o.profiles),
);
