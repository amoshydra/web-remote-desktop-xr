import { HTMLAttributes } from "react";
import { classNames } from "../../utils/cssHelper";

export interface LogonContainerProps extends HTMLAttributes<HTMLDivElement> {
};

export const LogonContainer = (props: LogonContainerProps) => {
  return (
    <div
      {...props}
      className={classNames(`
        max-w-200 mx-auto
        p-4 px-8
      `, props.className)}
    />
  );
};
