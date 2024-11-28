import OvenPlayer, { OvenPlayerInstance } from "ovenplayer";
import { HTMLAttributes, Ref, useEffect, useImperativeHandle, useRef, useState } from "react";

export interface OvenPlayerProps extends HTMLAttributes<HTMLElement> {
  innerRef: Ref<OvenPlayerInstance | null>;
  defaultMuted: boolean;
  src: string;
}

export const OvenPlayerMain = ({ innerRef, src, defaultMuted, ...props }: OvenPlayerProps) => {
  const [playerElement, setPlayerElement] = useState<HTMLDivElement | null>(null);
  const [playerInstance, setPlayerInstance] = useState<OvenPlayerInstance | null>(null);
  useImperativeHandle(innerRef, () => playerInstance);

  const setupMuteOptionRef = useAutoUnMute(playerInstance, defaultMuted);

  useEffect(() => {
    if (playerElement) {
      const mountPoint = document.createElement("div");
      playerElement.appendChild(mountPoint);

      // @TODO: create function types deosn't support HTMLElement yet
      const player = OvenPlayer.create(mountPoint as unknown as string, {
        mute: setupMuteOptionRef.current,
        autoStart: true,
        sources: [{
          type: "webrtc",
          file: src,
        }],
      });
      setPlayerInstance(player);
    }
    return () => {
      const player = playerInstance;
      if (player) {
        player.stop();
        player.remove();
        setPlayerInstance(null);
      }
      if (playerElement) {
        playerElement.innerHTML = "";
      }
    };
  }, [playerElement, src, setupMuteOptionRef]);

  return (
    <div
      {...props}
      ref={setPlayerElement}
    />
  );
};

const useAutoUnMute = (player: OvenPlayerInstance | null, defaultMuted: boolean) => {
  const [userHasInteracted, setUserHasInteracted] = useState(false);
  const setupMuteOptionRef = useRef(false); // a change of init mute option does not need to trigger player re-init;

  useEffect(() => {
    const checkMuteRequirement = () => {
      if (!player) return false;
      const result = player.getMute() === defaultMuted;
      return result;
    };

    const handler = () => {
      safeSetDefaultMute(player, defaultMuted);
      setUserHasInteracted(true);
      if (checkMuteRequirement()) {
        cleanup();
      }
    }
    const cleanup = () => {
      window.removeEventListener("click", handler);
    }

    if (!checkMuteRequirement()) {
      window.addEventListener("click", handler);
    }
    return cleanup;
  }, [player, defaultMuted]);

  setupMuteOptionRef.current = (
    defaultMuted === true
      ? true // should be muted, no action required
      : (
        userHasInteracted
        ? defaultMuted // user has interacted, set default mute option to respect user's choice
        : true // user has not interacted yet, initialize video muted to allow auto play
    )
  );
  return setupMuteOptionRef;
}

const safeSetDefaultMute = (player: OvenPlayerInstance | null, defaultMuted: boolean) => {
  try {
    player?.setMute(defaultMuted);
  } catch (e) {
    return false;
  }
};
