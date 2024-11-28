import { cloneElement, ReactElement, useContext } from "react";
import { classNames } from "../utils/cssHelper";
import { Button, ButtonProps } from "./Button";
import { SidebarContext } from "./SidebarContext";

export interface SidebarButtonProps extends ButtonProps {
  startIconSlot: ReactElement;
};

export const SidebarButton = ({ startIconSlot, children, ...props}: SidebarButtonProps) => {
  const { collapsed } = useContext(SidebarContext);

  const startIconSlotNode = cloneElement(startIconSlot, {
    "aria-hidden": "true",
    role: "presentation",
    className: classNames(startIconSlot.props.classNames, "w-4 h-4 text-slate-700")
  });

  return (
    <Button
      {...props}
      className={classNames("flex items-center justify-start gap-3 text-left", props.className)}
    >
      {startIconSlotNode}
      {!collapsed && <span>{children}</span>}
    </Button>
  );
};
