import { HTMLAttributes } from "react";
import { classNames } from "../../utils/cssHelper";

export interface ErrorBannerProps extends HTMLAttributes<HTMLDivElement> {
  error: Error;
}

export const ErrorBanner = (props: ErrorBannerProps) => {
  return (
    <div
      role="alert"
      {...props}
      className={classNames(
        `bg-red-100 text-red-700 px-4 py-3 rounded relative`,
        props.className,
      )}
    >
      <strong className="font-bold">Error:</strong>{" "}
      <span>{props.error.message}</span>
    </div>
  );
};
