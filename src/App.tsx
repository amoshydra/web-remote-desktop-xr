import { useRef } from 'react';
import "./components/ovenplayer";
import { useWebControl, WebControl } from './components/WebControl';
import { Entry, EntryRef } from './Virtual/Entry';

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

      <oven-player-element
        ref={(element) => {
          webControlProps.setPlayer(element?.player || null)
        }}
        data-muted={`${webControlProps.muted}`}
        data-file={webControlProps.file}
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
