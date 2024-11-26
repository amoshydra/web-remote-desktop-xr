import { useCallback, useState } from "react";
import { mutedInitailizer, scaleInitailizer, sourceInitializer } from "../services/initializers";
import { OvenPlayerElement } from "./ovenplayer";
import { RangeSlider } from "./RangeSlider";

export interface WebControlProps extends UseWebControlReturn {
}

export interface UseWebControlReturn {
  player: OvenPlayerElement['player'];
  setPlayer: React.Dispatch<React.SetStateAction<OvenPlayerElement['player'] | null>>

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
  const [player, setPlayer] = useState<OvenPlayerElement['player']>(null);
  const [scale, setScale] = useQueryState(scaleInitailizer);
  const [muted, setMuted] = useQueryState(mutedInitailizer);
  const [file] = useQueryState(sourceInitializer);

  const resetPlayback = useCallback(() => {
    if (player) {
      player.stop()
      player.seek(player.getPosition() + 1000);
      setTimeout(() => {
        player.play();
        player.setMute(muted);
      });
    }
  }, [player, muted]);

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
    file,
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
