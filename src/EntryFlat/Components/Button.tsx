import { HTMLAttributes } from "react";
import { classNames } from "../utils/cssHelper";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
};

export const Button = (props: ButtonProps) => {
  return (
    <button
      {...props}
      className={classNames(`
        hover:bg-gray-100
        active:bg-gray-200
        text-gray-800
        py-2
        px-4
        h-10
        inline-flex
        items-center
        select-none
      `, props.className)}
    />
  );
};
