import { useCallback, useMemo, useState } from "react";
import { WrdxrSession } from "../services/session";

const wrdxrSessionProps = new WrdxrSession();

export interface WrdxrSettingsUrls<T = string> {
  server: T;
  stream: T;
}

export interface UseWrdxrSessionReturn {
  session: WrdxrSession,
  isConnected: boolean,
  error: Error | null,

  settings: WrdxrSettings;
};

export interface WrdxrSettings {
  urls: WrdxrSettingsUrls<string | null>;
}

export const useWrdxrSessionProps = () => {
  const [urls, setUrls] = useState<WrdxrSettingsUrls | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleConnect = useCallback(() => setIsConnected(true), []);
  const handleDisconnect = useCallback(() => setIsConnected(false), []);

  const connect = useCallback((sessionUrls: WrdxrSettingsUrls) => {
    wrdxrSessionProps.disconnect();

    setError(null);
    setUrls(sessionUrls);

    wrdxrSessionProps.connect(sessionUrls.server);
    wrdxrSessionProps.onConnected(handleConnect);
    wrdxrSessionProps.onError(setError);
    wrdxrSessionProps.onDisconnected(handleDisconnect);
  }, []);

  const wrdxr = useMemo<UseWrdxrSessionReturn>(() => ({
    session: wrdxrSessionProps,
    isConnected,
    error,
    settings: {
      urls: {
        server: urls?.server || null,
        stream: urls?.stream || null,
      },
    },
  }), [urls, isConnected, error, urls])

  return [wrdxr, connect] as const;
}
