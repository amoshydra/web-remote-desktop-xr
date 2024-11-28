import { OvenPlayerMain } from '../components/OvenPlayer';
import { UseWebControlReturn, WebControl } from '../components/WebControl';

export interface EntryFlatProps {
  webControlProps: UseWebControlReturn;
  onXrAction: (action: "enter-vr" | "enter-ar") => void;
}

export const EntryFlat = (props: EntryFlatProps) => {
  const webControlProps = props.webControlProps;
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', width: '100%', padding: '1rem' }}>
        <button
          onClick={() => {
            props.onXrAction("enter-vr")
          }}
        >Enter VR</button>
        <button
          onClick={() => {
            props.onXrAction("enter-ar");
          }}
        >Enter AR</button>
      </div>

      <OvenPlayerMain
        innerRef={webControlProps.setPlayer}
        defaultMuted={webControlProps.muted}
        src={webControlProps.file}
      />

      <WebControl {...webControlProps} />
    </>
  );
};
