import { useRef } from 'react';
import { useWebControl, WebControl } from './components/WebControl';
import { Entry, EntryRef } from './Virtual/Entry';
import { OvenPlayerMain } from './components/OvenPlayer';

function App() {
  const entryRef = useRef<EntryRef>(null);
  const webControlProps = useWebControl();

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', width: '100%', padding: '1rem' }}>
        <button
          onClick={() => {
            entryRef.current!.enter("vr");
          }}
        >Enter VR</button>
        <button
          onClick={() => {
            entryRef.current!.enter("ar");
          }}
        >Enter AR</button>
      </div>

      <OvenPlayerMain
        innerRef={webControlProps.setPlayer}
        defaultMuted={webControlProps.muted}
        src={webControlProps.file}
      />

      <WebControl {...webControlProps} />

      <Entry
        webControlProps={webControlProps}
        innerRef={entryRef}
      />
    </>
  )
}

export default App
