import { LogonSubViewProps } from "../Components/Logon/interface";
import { LogonContainer } from "../Components/Logon/LogonContainer";

export const ViewLogonSubConnection = (props: LogonSubViewProps) => {
  return (
      <LogonContainer className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between py-2">
            <div>Server URL</div>
            <div>{props.wrdxrSessionProps.settings.urls.server}</div>
          </div>
          <div className="flex justify-between py-2">
            <div>Server Connected</div>
            <div>{props.wrdxrSessionProps.isConnected.toString()}</div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between py-2">
            <div>OBS stream</div>
            <div>{props.wrdxrSessionProps.settings.urls.stream}</div>
          </div>
          <div className="flex justify-between py-2">
            <div>OBS streaming</div>
            <div>{props.obsProps.isStreaming.toString()}</div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between py-2">
            <div>OBS WebSocket connected</div>
            <div>{props.obsProps.isConnected.toString()}</div>
          </div>
        </div>
      </LogonContainer>
  );
};
