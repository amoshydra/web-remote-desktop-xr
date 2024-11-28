import { HTMLAttributes } from "react";
import { classNames } from "../utils/cssHelper";

export interface SidebarGroupProps extends HTMLAttributes<HTMLDivElement> {
};

export const SidebarGroup = (props: SidebarGroupProps) => {
  return (
    <div
      {...props}
      className={classNames("flex flex-col", props.className)}
    />
  );
};
