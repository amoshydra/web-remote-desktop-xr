import { useRef } from 'react';
import { useWebControl } from './components/WebControl';
import { EntryFlat } from './EntryFlat/EntryFlat';
import { EntryRef, EntryVirtual } from './EntryVirtual/EntryVirtual';

function App() {
  const entryRef = useRef<EntryRef>(null);
  const webControlProps = useWebControl();

  return (
    <>
      <EntryFlat
        onXrAction={(action) => {
          switch (action) {
            case "enter-vr": {
              return entryRef.current!.enter("vr");
            }
            case "enter-ar": {
              return entryRef.current!.enter("ar");
            }
          }
        }}
        webControlProps={webControlProps}
      />
      <EntryVirtual
        webControlProps={webControlProps}
        innerRef={entryRef}
      />
    </>
  )
}

export default App
