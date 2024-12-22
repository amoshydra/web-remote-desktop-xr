import { WebControlProps } from "../../../components/WebControl";
import { UseObsReturn } from "../../../hooks/useObs";
import { UseWrdxrSessionReturn } from "../../../hooks/useWrdxrSession";

export interface LogonSubViewProps {
  webControlProps: WebControlProps;
  wrdxrSessionProps: UseWrdxrSessionReturn;
  obsProps: UseObsReturn;
  onVideoRenderReqeust?: (element: HTMLElement | null) => void;
};
