import { useState } from "react";
import { Button } from "../Components/Button";
import { CanvasVideoRenderer } from "../Components/CanvasVideoRenderer";
import { LogonSubViewProps } from "../Components/Logon/interface";
import { ViewportFallbackRenderer } from "../Components/ViewportFallbackRenderer/ViewportFallbackRenderer";

export const ViewLogonSubViewport = (props: LogonSubViewProps) => {
  const videoElement = props.webControlProps.player?.getMediaElement();
  const [isFallbackActive, setIsFallbackActive] = useState(false);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="shrink p-2 flex justify-end">
        <Button
          onClick={async () => {
            setIsFallbackActive(v => !v);
          }}
        >
          {isFallbackActive ? "Live" : "Fallback"}
        </Button>
        <Button
          onClick={() => {
            props.webControlProps.resetPlayback();
          }}
        >
          Reset
        </Button>
        <Button
          onClick={() => {
            props.webControlProps.onMutedChange(v => !v);
          }}
        >
          {props.webControlProps.muted ? "Unmute" : "Mute"}
        </Button>
      </div>
      <div className="neutral-950 w-full h-full grow">
        {
          isFallbackActive
            ? (
              <ViewportFallbackRenderer
                wrdxrSessionProps={props.wrdxrSessionProps}
                className="w-full object-contain object-left-top"
              />
            ) : (
              <CanvasVideoRenderer
                video={videoElement}
                className="w-full object-contain object-left-top"
              />
            )
        }
      </div>
    </div >
  )
};
