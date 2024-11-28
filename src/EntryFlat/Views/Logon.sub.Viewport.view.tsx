import { CanvasVideoRenderer } from "../Components/CanvasVideoRenderer";
import { LogonSubViewProps } from "../Components/Logon/interface";

export const ViewLogonSubViewport = (props: LogonSubViewProps) => {
  const videoElement = props.webControlProps.player?.getMediaElement();
  return (
    <div className="bg-neutral-950 w-full h-full">
      <CanvasVideoRenderer
        video={videoElement}
        className="w-full"
      />
    </div>
  )
};
