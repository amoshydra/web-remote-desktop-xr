import { Portal } from "../../../../components/Portal";
import { WebControlProps } from "../../../../components/WebControl";
import { OvenPlayerMain } from "./OvenPlayer";

export interface ServicesVideoSourceProviderProps {
  webControlProps: WebControlProps;
};

export const ServicesVideoSourceProvider = (props: ServicesVideoSourceProviderProps) => {
  return (
    <Portal container={false}>
      <OvenPlayerMain
        innerRef={props.webControlProps.setPlayer}
        defaultMuted={props.webControlProps.muted}
        src={props.webControlProps.file}
      />
    </Portal>
  )
}
