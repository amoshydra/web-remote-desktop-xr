import { useCallback, useMemo, useState } from "react";
import { mutedInitailizer, scaleInitailizer, sourceInitializer } from "../services/initializers";
import { RangeSlider } from "./RangeSlider";
import { OvenPlayerInstance } from "ovenplayer";

export interface WebControlProps extends UseWebControlReturn {
}

export interface UseWebControlReturn {
  player: OvenPlayerInstance | null;
  setPlayer: React.Dispatch<React.SetStateAction<OvenPlayerInstance | null>>

  file: string;
  scale: number;
  onScaleChange: (delta: number) => void;
  muted: boolean;
  onMutedChange: (muted: boolean) => void;
  resetPlayback: () => void;
}

const useQueryState = <T,>(initializer: { get: () => T; set: (v: T) => void }) => {
  const [value, setValue] = useState(initializer.get);
  return [
    value,
    (newValue: T) => {
      initializer.set(newValue);
      setValue(newValue);
    },
  ] as const;
};

export const useWebControl = (): UseWebControlReturn => {
  const [resetKey, setRefreshKey] = useState(Date.now());

  const [player, setPlayer] = useState<OvenPlayerInstance | null>(null);
  const [scale, setScale] = useQueryState(scaleInitailizer);
  const [muted, setMuted] = useQueryState(mutedInitailizer);
  const [file] = useQueryState(sourceInitializer);

  const computedFile = useMemo(() => {
    const sourceFile = new URL(file);
    sourceFile.searchParams.set("_refresh", Date.now().toString());
    return sourceFile.href;
  }, [file, resetKey]);

  const resetPlayback = useCallback(() => {
    setRefreshKey(k => k + 1);
  }, []);

  const onMutedChange = useCallback((b: boolean) => {
    setMuted(b);
    player?.setMute(b);
  }, [player, setMuted]);

  const onScaleChange = useCallback((delta: number) => {
    const newScale = Math.min(5, Math.max(0.05, delta));
    setScale(newScale);
  }, [setScale]);

  return {
    player,
    setPlayer,
    file: computedFile,
    scale,
    onScaleChange,
    muted,
    onMutedChange,
    resetPlayback,
  }
};

export const WebControl = (props: WebControlProps) => {
  return (
    <div>
      <RangeSlider 
        {...props}
      />
    </div>
  );
};
