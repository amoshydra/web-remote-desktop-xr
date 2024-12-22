import { ConfigStorage } from "../../services/configStorage";
import { Button } from "../Components/Button";
import { LogonSubViewProps } from "../Components/Logon/interface";
import { LogonContainer } from "../Components/Logon/LogonContainer";

export const ViewLogonSubSettings = (_props: LogonSubViewProps) => {
  return (
    <LogonContainer>
      <div className="grid gap-y-6">
        <div className="grid gap-y-4">
          <p>Disconnect from server and go back to the login page</p>
          <Button
            onClick={() => {
              ConfigStorage.setRemember(false);
              location.reload();
            }}
            className="bg-slate-200 hover:bg-slate-300 active:bg-slate-400 place-self-end"
          >
            Disconnect
          </Button>
        </div>
      </div>
    </LogonContainer>
  );
};
