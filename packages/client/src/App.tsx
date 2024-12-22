import { useRef } from "react";
import { ViewLogin } from "./EntryFlat/Views/Login.index.view";
import { ViewLogon } from "./EntryFlat/Views/Logon.index.view";
import { useWrdxrSessionProps } from "./hooks/useWrdxrSession";

function App() {
  const [wrdxrSessionProps, connectWrdxrSession] = useWrdxrSessionProps();

  const hasEverConnected = useRetainTrue(wrdxrSessionProps.isConnected);
  if (!hasEverConnected) {
    return (
      <ViewLogin
        error={wrdxrSessionProps.error}
        onConnectionStart={(sessionUrl) => {
          connectWrdxrSession(sessionUrl);
        }}
      />
    );
  }
  return (
    <div className="flex flex-col w-full">
      {wrdxrSessionProps.error && (
        <ErrorBanner error={wrdxrSessionProps.error} />
      )}
      <ViewLogon wrdxrSessionProps={wrdxrSessionProps} />
    </div>
  );
}

const ErrorBanner = ({ error }: { error: Error }) => {
  return <div>{error.message}</div>;
};

const useRetainTrue = (v: boolean) => {
  const booleanRef = useRef(v);

  if (v === true) {
    booleanRef.current = true;
  }

  return booleanRef.current;
};

export default App;
