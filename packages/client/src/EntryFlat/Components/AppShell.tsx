import { cloneElement, Dispatch, ReactElement, ReactNode, SetStateAction, useState } from "react";

export interface AppShellProps {
  children: ReactNode
  sidebarSlot: ReactElement<AppShellSidebarProps>
}

export interface AppShellSidebarProps {
  collapsed?: boolean;
  onCollapse?: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

export const AppShell = (props: AppShellProps) => {
  const [sidebarCollapsed, onSidebarCollapsed] = useState(false);

  const sidebarSlotElement = cloneElement(props.sidebarSlot, {
    collapsed: sidebarCollapsed,
    onCollapse: onSidebarCollapsed,
  });

  return (
    <div className="flex w-full h-full">
      {sidebarSlotElement}
      <div className="w-full flex-grow bg-slate-50 overflow-auto">
        {props.children}
      </div>
    </div>
  );
};
