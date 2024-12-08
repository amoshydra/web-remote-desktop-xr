import { GroupProps, MeshProps } from "@react-three/fiber";
import { Children, cloneElement, isValidElement, ReactElement, ReactNode } from "react";

export interface FlexProps extends GroupProps {
  children: ReactNode;
  direction: (
    | "x" | "y" | "z"
  );
  gap: number;
}

const map = {
  "x": [1, 0, 0],
  "y": [0, 1, 0],
  "z": [0, 0, 1],
};

export const Flex = ({ children, direction, gap, ...props }: FlexProps) => {
  const [dx, dy, dz] = map[direction];
  const [vx, vy, vz] = [dx * gap, dy * gap, dz * gap];

  return (
    <group {...props}>
      {
        Children.map(children, (child, index) => {
          if (!isValidElement(child)) return child;
          const childElement = child as ReactElement<MeshProps>;
          const [x, y, z] = (childElement.props.position || [0, 0, 0]) as [number, number, number];

          return cloneElement<MeshProps>(childElement, {
            position: [
              x + vx * index,
              y + vy * index,
              z + vz * index,
            ],
          });
        })
      }
    </group>
  )

};
