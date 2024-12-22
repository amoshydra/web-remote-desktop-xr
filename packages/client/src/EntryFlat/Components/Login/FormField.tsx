import { HTMLAttributes } from "react";
import { classNames } from "../../utils/cssHelper";

export interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {}

export const FormField = (props: FormFieldProps) => {
  return (
    <div
      {...props}
      className={classNames(
        `
        grid gap-y-2
      `,
        props.className,
      )}
    />
  );
};
