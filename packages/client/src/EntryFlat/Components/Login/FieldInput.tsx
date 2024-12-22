import { InputHTMLAttributes } from "react";
import { classNames } from "../../utils/cssHelper";

export interface FieldInputProps
  extends InputHTMLAttributes<HTMLInputElement> {}

export const FieldInput = (props: FieldInputProps) => {
  return (
    <input
      {...props}
      className={classNames(
        `
        bg-slate-100 text-slate-800 p-2 w-full rounded-sm
      `,
        props.className,
      )}
    />
  );
};
