import { MeshProps } from '@react-three/fiber';
import { useState } from 'react';
import { useRangeSliderUi } from '../hooks/useRangeSlider';

const anchorScale = 0.05;

export interface ControllerProps extends Omit<MeshProps, "position"> {
  onDistanceXChange?: (delta: number) => void;
  onClick?: () => void;
  position: [number, number, number];
}

const noop = (() => {});

export function Controller(props: ControllerProps) {
  const {
    isDragging,
    delta,
    onPointerDown,
    onPointerMove,
    onPointerUp
  } = useRangeSliderUi({
    onDeltaChange: props.onDistanceXChange ?? noop,
  });
  const [isHover, setIsHover] = useState(false);

  const color = isDragging ? "maroon" : isHover ? "lightgray" : "gray";
  const [anchorX, anchorY, anchorZ] = props.position;

  return (
    <group>
      <mesh
        position={[delta - anchorX, anchorY, anchorZ]}
        onPointerDown={(e) => {
          onPointerDown(e.pointerId, e.point.x);
        }}
        onPointerMove={(e) => {
          onPointerMove(e.pointerId, e.point.x);
        }}
        onPointerUp={(e) => {
          props.onClick?.();
          onPointerUp(e.pointerId);
        }}

        onPointerEnter={() => {
          setIsHover(true);
        }}
        onPointerLeave={(e) => {
          setIsHover(false);
          onPointerUp(e.pointerId);
        }}
      >
        <cylinderGeometry
          args={[anchorScale/ 4, anchorScale/ 4, anchorScale / 2]}
        />
        <meshStandardMaterial
          color={color}
          emissiveIntensity={1}
          wireframeLinewidth={1}
        />
      </mesh>
    </group>
  );
};
