import { MeshProps } from '@react-three/fiber';
import { AttachType } from '@react-three/fiber/dist/declarations/src/core/renderer';
import { useEffect, useState } from 'react';
import * as THREE from 'three';

interface ScreenProps extends MeshProps {
  scale: number;
  videoElement?: HTMLVideoElement;
}

const useVideo = (video: HTMLVideoElement | undefined) => {
  const [isPlaying, setIsPlaying] = useState(video ? !video.paused : false);
  useEffect(() => {
    const handleEvent = (event: Event) => {
      const player = event.currentTarget as HTMLVideoElement;
      setIsPlaying(!player.paused);
    };
    if (video) {
      video.addEventListener('play', handleEvent);
      video.addEventListener('pause', handleEvent);
    } else {
      setIsPlaying(false);
    }
    return () => {
      if (video) {
        video.removeEventListener('play', handleEvent);
        video.removeEventListener('pause', handleEvent);
      } 
    }
  }, [video]);

  return [video, isPlaying] as const;
};

export function Screen(props: ScreenProps) {
  const [video, isPlaying] = useVideo(props.videoElement);
  const scale = 0.0035 * props.scale;
  const anisotropy = 16;


  return (
    <group
      position={[0, 0.95, -4]}
      scale={[scale, scale, scale]}
    >
      <VideoPlane
        video={video}
        anisotropy={anisotropy}
        isPlaying={isPlaying}
      />
    </group>
  );
};

const VideoPlane = ({ video, anisotropy, isPlaying } : { isPlaying: boolean, video?: HTMLVideoElement, anisotropy: number }) => {
  const hasVideo = !!video;
  if (!hasVideo) {
    return (
      <mesh>
        <planeGeometry args={[3840, 2160]} />
        <meshStandardMaterial
          emissiveIntensity={0.5}
          emissive={"darkblue"}
          side={THREE.DoubleSide}
        />
      </mesh>
    )
  }

  const width = video.videoWidth;
  const height = video.videoHeight;
  return (
    <mesh>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial
        emissiveIntensity={1}
        emissive={isPlaying ? "white" : 0x202020}
        side={THREE.FrontSide}
        metalness={1 /* prevent environment light from affecting its color */}
      >
        <VideoTextureMap
          video={video}
          attach="map"
          anisotropy={anisotropy}
        />
        <VideoTextureMap
          video={video}
          attach="emissiveMap"
          anisotropy={anisotropy}
        />
      </meshStandardMaterial>
    </mesh>
  )
}

const VideoTextureMap = ({ video, attach, anisotropy }: { video: HTMLVideoElement, attach: AttachType, anisotropy: number }) =>
  <videoTexture
    attach={attach}
    args={[video]}
    colorSpace={THREE.SRGBColorSpace}
    minFilter={THREE.LinearFilter}
    magFilter={THREE.LinearFilter}
    anisotropy={anisotropy}
  />
;
