import { AttachType } from "@react-three/fiber/dist/declarations/src/core/renderer";
import { useEffect, useState } from "react";

import { DoubleSide, LinearFilter, SRGBColorSpace } from "three";
import { useCachedDimension } from "../../hooks/useCachedDimension";

export interface VideoScreenProps {
  video: HTMLVideoElement | undefined;
}

export const VideoScreen = (props: VideoScreenProps) => {
  const { video: videoElement } = props;
  const [video, isPlaying] = useVideo(videoElement);
  return (
    <VideoPlane
      video={video}
      isPlaying={isPlaying}
    />
  );
};

interface VideoPlaneProps {
  video: HTMLVideoElement | null | undefined;
  isPlaying: boolean;
}

const VideoPlane = (props: VideoPlaneProps) => {
  const { isPlaying, video } = props;
  const dimension = useCachedDimension(video);
  return (
    <mesh>
      <planeGeometry args={dimension} />
      <meshStandardMaterial
        emissiveIntensity={isPlaying ? 1 : 0.5}
        emissive={isPlaying ? "white" : "maroon"}
        side={DoubleSide}
        metalness={1}
      >
        <VideoTextureMap
          video={video}
          attach="map"
        />
        <VideoTextureMap
          video={video}
          attach="emissiveMap"
        />
      </meshStandardMaterial>
    </mesh>
  );
}

interface VideoTextureMapProps {
  video: HTMLVideoElement | null | undefined;
  attach: AttachType
}

const VideoTextureMap = ({ video, attach }: VideoTextureMapProps) =>
  <videoTexture
    attach={attach}
    args={video ? [video] : undefined}
    colorSpace={SRGBColorSpace}
    minFilter={LinearFilter}
    magFilter={LinearFilter}
    anisotropy={16}
  />
;


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
}

const events = [
  "emptied", // called when OvenPlayer encountered a connection issue
  "play",
  "pause",
];

const computeIsPlaying = (video: HTMLVideoElement | undefined) => {
  if (!video) return false;
  if (video.paused) return false;
  if (!video.duration) return false

  return true;
}
