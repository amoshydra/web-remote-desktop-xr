import { OvenPlayerInstance } from "ovenplayer";
import { Dispatch, useCallback, useMemo, useState } from "react";
import { UseWrdxrSessionReturn } from "../hooks/useWrdxrSession";
import { mutedInitailizer, posXInitailizer, posYInitailizer, posZInitailizer, scaleInitailizer } from "../services/initializers";

export interface WebControlProps extends UseWebControlReturn {
}

type DispatcherListener<T> = Dispatch<(prev: T) => T>;

export interface UseWebControlReturn {
  player: OvenPlayerInstance | null;
  setPlayer: React.Dispatch<React.SetStateAction<OvenPlayerInstance | null>>

  streamType: boolean;
  onStreamTypeChange: DispatcherListener<boolean>;

  file: string;
  scale: number;
  x: number;
  onXChange: DispatcherListener<number>;
  y: number;
  onYChange: DispatcherListener<number>;
  z: number;
  onZChange: DispatcherListener<number>;
  onScaleChange: DispatcherListener<number>;
  muted: boolean;
  onMutedChange: DispatcherListener<boolean>;
  resetPlayback: () => void;
}

const useQueryState = <T,>(initializer: { get: () => T; set: (v: T) => void }) => {
  const [value, setValue] = useState(initializer.get);

  const wrappedDispatcher: DispatcherListener<T> = (dispatchFn) => {
    setValue((prevState) => {
      const newValue = (dispatchFn as ((v: T) => T))(prevState);
      initializer.set(newValue);
      return newValue;
    });
  }

  return [value, wrappedDispatcher] as const;
};

export const useWebControl = (wrdxrSessionProps: UseWrdxrSessionReturn): UseWebControlReturn => {
  const [resetKey, setRefreshKey] = useState(Date.now());

  const [player, setPlayer] = useState<OvenPlayerInstance | null>(null);
  const [streamType, setStreamType] = useState(false);
  const [scale, setScale] = useQueryState(scaleInitailizer);
  const [x, setX] = useQueryState(posXInitailizer);
  const [y, setY] = useQueryState(posYInitailizer);
  const [z, setZ] = useQueryState(posZInitailizer);
  const [muted, setMuted] = useQueryState(mutedInitailizer);

  const file = wrdxrSessionProps.settings.urls.stream || "";

  const computedFile = useMemo(() => {
    const sourceFile = new URL(file);
    sourceFile.searchParams.set("_refresh", Date.now().toString());
    return sourceFile.href;
  }, [file, resetKey]);

  const resetPlayback = useCallback(() => {
    setRefreshKey(k => k + 1);
  }, []);

  const onMutedChange = useCallback((dispatchFn: ((prev: boolean) => boolean)) => {
    setMuted((prevValue) => {
      const newValue = dispatchFn(prevValue);
      player?.setMute(newValue);
      return newValue;
    });
  }, [player, setMuted]);

  const onScaleChange = useCallback((dispatchFn: ((prev: number) => number)) => {
    setScale((prevValue) => {
      const newValue = dispatchFn(prevValue);
      const constrainedScale = Math.min(0.001, Math.max(0.00001, newValue))
      return constrainedScale;
    });
  }, [setScale]);

  return {
    player,
    setPlayer,
    streamType,
    onStreamTypeChange: setStreamType,
    file: computedFile,
    scale,
    onScaleChange,
    x,
    onXChange: setX,
    y,
    onYChange: setY,
    z,
    onZChange: setZ,
    muted,
    onMutedChange,
    resetPlayback,
  }
};
