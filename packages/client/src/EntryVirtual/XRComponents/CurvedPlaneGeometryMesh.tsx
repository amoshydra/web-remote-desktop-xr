import { MeshProps } from "@react-three/fiber";
import { ReactNode, useMemo } from "react";
import { PlaneGeometry } from "three";

export interface CurvedPlaneGeometryMeshProps extends MeshProps {
  width: number;
  height: number;
  radius: number;
  children: ReactNode;
}

export function CurvedPlaneGeometryMesh({ width, height, radius, children, ...props }: CurvedPlaneGeometryMeshProps) {
  const geometry = useMemo(() => createCurvedPlaneGeometry(width, height, radius), [width, height, radius]);

  return (
    <mesh {...props} geometry={geometry}>
      {children}
    </mesh>
  )
}

function createCurvedPlaneGeometry(width = 1, height = 1, radius = 2) {
  const segmentsH = 128;
  const segmentsV = 1;
  const geometry = new PlaneGeometry(width, height, segmentsH, segmentsV);

  const r = width  / 2 * radius;
  const r2 = r * r;

  const position = geometry.attributes.position;

  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i);

    // draw an arc

    // r^2 = x^2 + h^2
    // r^2 - x^2 = h^2
    // (r^2 - x^2)^0.5 = h
    const h = Math.sqrt(Math.max(r2 - x * x, 0));
    const height = -h + r;
    position.setZ(i, height);
  }

  return geometry;
}
