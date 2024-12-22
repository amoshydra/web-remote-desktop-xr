import { useRef } from 'react';
import { ViewLogin } from './EntryFlat/Views/Login.index.view';
import { ViewLogon } from './EntryFlat/Views/Logon.index.view';
import { useWrdxrSessionProps } from './hooks/useWrdxrSession';


function App() {
  const [wrdxrSessionProps, connectWrdxrSession] = useWrdxrSessionProps();

  const hasEverConnected = useRetainTrue(wrdxrSessionProps.isConnected);

  return (
    <>
      {
        wrdxrSessionProps.error && <ErrorBanner error={wrdxrSessionProps.error} />
      }
      {
        !hasEverConnected
          ? (
            <ViewLogin
              onConnectionStart={(sessionUrl) => {
                connectWrdxrSession(sessionUrl)
              }}
            />
          ) : (
            <ViewLogon wrdxrSessionProps={wrdxrSessionProps} />
          )
      }
    </>
  );
}

const ErrorBanner = ({ error }: { error: Error }) => {
  return (
    <div>{error.message}</div>
  )
}


const useRetainTrue = (v: boolean) => {
  const booleanRef = useRef(v);

  if (v === true) {
    booleanRef.current = true;
  }

  return booleanRef.current;
};

export default App
