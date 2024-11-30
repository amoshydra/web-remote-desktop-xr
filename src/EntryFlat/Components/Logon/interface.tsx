import { WebControlProps } from "../../../components/WebControl";
import { UseObsReturn } from "../../../hooks/useObs";

export interface LogonSubViewProps {
  webControlProps: WebControlProps;
  obsProps: UseObsReturn;
  onVideoRenderReqeust?: (element: HTMLElement | null) => void;
};
