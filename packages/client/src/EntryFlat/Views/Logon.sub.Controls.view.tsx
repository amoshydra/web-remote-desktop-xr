import { RangeSlider } from "../../components/RangeSlider";
import { Button } from "../Components/Button";
import { LogonSubViewProps } from "../Components/Logon/interface";
import { LogonContainer } from "../Components/Logon/LogonContainer";

export const ViewLogonSubControls = (props: LogonSubViewProps) => {
  const {
    streamType,
    onStreamTypeChange,

    scale,
    onScaleChange,
    muted,
    onMutedChange,

    x,
    onXChange,
    y,
    onYChange,
    z,
    onZChange,

    resetPlayback,
  } = props.webControlProps;

  return (
    <LogonContainer className="flex flex-col gap-4 ">
      <p className="pt-0">Virtual Screen controls in XR</p>
      <div className="flex justify-between">
        <div className="flex gap-4 flex-grow">
          <RangeSlider
            className="h-100 w-24 text-center"
            value={scale}
            onValueChange={(v) => {
              onScaleChange((scale) => scale + v * 0.00000002);
            }}
          >
            scale
            <br />
            {(scale * 10000).toFixed(2)}m
          </RangeSlider>

          <RangeSlider
            className="h-100 w-24 text-center"
            value={x}
            onValueChange={(d) => {
              onXChange((v) => v + d * 0.00002);
            }}
          >
            x<br />
            {x.toFixed(2)}m
          </RangeSlider>
          <RangeSlider
            className="h-100 w-24 text-center"
            value={y}
            onValueChange={(d) => {
              onYChange((v) => v + d * 0.00002);
            }}
          >
            y<br />
            {y.toFixed(2)}m
          </RangeSlider>
          <RangeSlider
            className="h-100 w-24 text-center"
            value={z}
            onValueChange={(d) => {
              onZChange((v) => v + d * 0.00002);
            }}
          >
            z<br />
            {z.toFixed(2)}m
          </RangeSlider>
        </div>
        <div className="flex flex-col gap-4">
          <Button onClick={() => onMutedChange((b) => !b)}>
            {muted ? "Unmute" : "Mute"}
          </Button>
          <Button onClick={resetPlayback}>Reset Player</Button>
          <Button
            onClick={() => {
              props.obsProps.api.stream.toggle();
            }}
          >
            Toggle stream
          </Button>
          <Button onClick={() => onStreamTypeChange((b) => !b)}>
            {streamType ? "Use live" : "Use fallback"}
          </Button>
        </div>
      </div>
    </LogonContainer>
  );
};
