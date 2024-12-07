import { MeshProps } from '@react-three/fiber';
import { UseWebControlReturn } from '../../components/WebControl';
import { UseObsReturn } from '../../hooks/useObs';
import { ObsCanvasScreen } from './ObsCanvasScreen';
import { VideoScreen } from './VideoScreen';

interface ScreenProps extends MeshProps {
  obsProps: UseObsReturn;
  webControlProps: UseWebControlReturn;
}

export function Screen({
  obsProps,
  webControlProps
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
              obsProps={obsProps}
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
