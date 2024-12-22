import { LabelHTMLAttributes } from "react";
import { classNames } from "../../utils/cssHelper";

export interface FieldLabelProps
  extends LabelHTMLAttributes<HTMLLabelElement> {}

export const FieldLabel = (props: FieldLabelProps) => {
  return (
    <label
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
