import { MeshProps } from '@react-three/fiber';
import { AttachType } from '@react-three/fiber/dist/declarations/src/core/renderer';
import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { useCachedDimension } from '../hooks/useCachedDimension';

interface ScreenProps extends MeshProps {
  scale: number;
  x: number;
  y: number;
  z: number;
  videoElement?: HTMLVideoElement;
}


const computeIsPlaying = (video: HTMLVideoElement | undefined) => {
  if (!video) return false;
  if (video.paused) return false;
  if (!video.duration) return false

  return true;
}

const events = [
  "emptied", // called when OvenPlayer encountered a connection issue
  "play",
  "pause",
];

const useVideo = (video: HTMLVideoElement | undefined) => {
  const [isPlaying, setIsPlaying] = useState(computeIsPlaying(video));

  useEffect(() => {
    const handleEvent = (event: Event) => {
      const player = event.currentTarget as HTMLVideoElement;
      setIsPlaying(computeIsPlaying(player));
    };
    if (video) {
      events.forEach(event => {
        video.addEventListener(event, handleEvent);
      });
    } else {
      setIsPlaying(false);
    }
    return () => {
      if (video) {
        events.forEach(event => {
          video.removeEventListener(event, handleEvent);
        });
      } 
    }
  }, [video]);

  return [video, isPlaying] as const;
};

export function Screen({
  scale,
  x, y, z,
  videoElement,
}: ScreenProps) {
  const [video, isPlaying] = useVideo(videoElement);
  const anisotropy = 16;

  return (
    <group
      position={[x, y, z]}
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
  const retainingDimension = useCachedDimension(video);

  return (
    <mesh>
      <planeGeometry args={retainingDimension} />
      <meshStandardMaterial
        emissiveIntensity={isPlaying ? 1 : 0.5}
        emissive={isPlaying ? "white" : "maroon"}
        side={THREE.FrontSide}
        metalness={1}
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

const VideoTextureMap = ({ video, attach, anisotropy }: { video?: HTMLVideoElement, attach: AttachType, anisotropy: number }) =>
  <videoTexture
    attach={attach}
    args={video ? [video] : undefined}
    colorSpace={THREE.SRGBColorSpace}
    minFilter={THREE.LinearFilter}
    magFilter={THREE.LinearFilter}
    anisotropy={anisotropy}
  />
;
