import { WebControlProps } from "../../../components/WebControl";

export interface LogonSubViewProps {
  webControlProps: WebControlProps;
  onVideoRenderReqeust?: (element: HTMLElement | null) => void;
};
