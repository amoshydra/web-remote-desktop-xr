import OvenPlayer from "ovenplayer";
import { LegacyRef } from "react";

export class OvenPlayerElement extends HTMLElement {
  player: OvenPlayer.OvenPlayerInstance | null = null;
  defaultMuted = this.dataset.muted === "true";

  connectedCallback() {
    const wrapperEl = document.createElement("div") as HTMLDivElement;
    const playerEl = document.createElement("div") as HTMLDivElement;
    wrapperEl.appendChild(playerEl);
    
    const player = OvenPlayer.create(playerEl as unknown as string, {
      type: 'webrtc',
      mute: true,
      autoStart: true,
      file: this.dataset.file,
    });
    this.appendChild(wrapperEl);
    this.player = player;
    this.safeSetDefaultMute();
  }

  private safeSetDefaultMute() {
    try {
      this.player!.setMute(this.defaultMuted);
    } catch (e) {
      console.error(e);
    }
  }
}

customElements.define('oven-player-element', OvenPlayerElement);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'oven-player-element': OvenPlayerElementProps
    }
  }
}

interface OvenPlayerElementProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  'data-muted': string
  'data-file': string
  ref: LegacyRef<OvenPlayerElement>
}
