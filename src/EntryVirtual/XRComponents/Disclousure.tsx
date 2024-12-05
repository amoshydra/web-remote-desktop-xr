import { ReactNode, useState } from "react";
import { Controller } from "./Controller";

export interface DisclousureProps {
  children: ReactNode;
  position: [number, number, number];
  defaultOpen?: boolean;
}

export const Disclousure = ({ children, position, defaultOpen = false }: DisclousureProps) => {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <group position={position}>
      <Controller
        onClick={() => {
          setOpen(b => !b);
        }}
      />
      {open && children}
    </group>
  )
}
