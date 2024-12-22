import { MeshProps } from '@react-three/fiber';
import { UseWebControlReturn } from '../../components/WebControl';
import { UseWrdxrSessionReturn } from '../../hooks/useWrdxrSession';
import { ObsCanvasScreen } from './ObsCanvasScreen';
import { VideoScreen } from './VideoScreen';

interface ScreenProps extends MeshProps {
  webControlProps: UseWebControlReturn;
  wrdxrSessionProps: UseWrdxrSessionReturn;
}

export function Screen({
  webControlProps,
  wrdxrSessionProps,
}: ScreenProps) {
  const { scale: scaleValue, x, y, z, player, streamType } = webControlProps;
  const position = [x, y, z] as [number, number, number];
  const scale = [scaleValue, scaleValue, scaleValue] as [number, number, number];

  return (
    <group
      position={position}
      scale={scale}
    >
      {
        streamType
          ? (
            <ObsCanvasScreen
              wrdxrSessionProps={wrdxrSessionProps}
            />
          ) : (
            <VideoScreen
              video={player?.getMediaElement()}
            />
          )
      }
    </group>
  );
};
