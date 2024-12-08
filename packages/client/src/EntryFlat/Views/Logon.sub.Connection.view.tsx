import { LogonSubViewProps } from "../Components/Logon/interface";
import { LogonContainer } from "../Components/Logon/LogonContainer";

export const ViewLogonSubConnection = (props: LogonSubViewProps) => {
  return (
      <LogonContainer className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between py-2">
            <div>Connected</div>
            <div>{props.obsProps.isConnected.toString()}</div>
          </div>
          <div className="flex justify-between py-2">
            <div>Is streaming</div>
            <div>{props.obsProps.isStreaming.toString()}</div>
          </div>
          <div className="flex justify-between py-2">
            <div>Output Settings</div>
            <pre>{JSON.stringify(props.obsProps.outputSettings, null, 2)}</pre>
          </div>
          <div className="flex justify-between py-2">
            <div>Profiles</div>
            <pre>{JSON.stringify(props.obsProps.profiles, null, 2)}</pre>
          </div>
        </div>
      </LogonContainer>
  );
};
