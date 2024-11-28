import { ReactNode, useMemo } from "react";
import { createPortal } from "react-dom";

const DEFAULT_CONTAINER_NAMESPACE = "wrdxr-portal";

type PortalPropsContainerOption = (
  // Valid mount target
  | Element
  | DocumentFragment
  // If true, mount at document.body, else mount into an orphan DOM element
  | boolean
  // nullish value will be treated as false
  | null
  | undefined
);

export interface PortalProps {
  children: ReactNode;
  container: PortalPropsContainerOption
};

const orphanElement = document.createElement("div");

export const Portal = (props: PortalProps) => {
  const container = useMemo(() => {
    return getContainer(props.container);
  }, [props.container]);

  if (container) {
    return createPortal(props.children, container);
  }

  return <>{props.children}</>;
};

const getContainer = (container: PortalPropsContainerOption) => {
  if (container instanceof Element || container instanceof DocumentFragment) {
    return container;
  }

  if (!container) {
    return orphanElement;
  }

  const portalElement = document.getElementById(DEFAULT_CONTAINER_NAMESPACE);
  if (portalElement) {
    return portalElement;
  }

  const div = document.createElement("div");
  div.id = DEFAULT_CONTAINER_NAMESPACE;
  document.body.appendChild(div);
  return div;
};
