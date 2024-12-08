import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HTMLAttributes, ReactElement } from "react";
import { classNames } from "../utils/cssHelper";
import { AppShellSidebarProps } from "./AppShell";
import { Button } from "./Button";
import { SidebarContext } from "./SidebarContext";

export interface SidebarProps extends AppShellSidebarProps, HTMLAttributes<HTMLDivElement> {
  headerSlot: ReactElement;
  children: ReactElement;
  footerSlot: ReactElement;
};

export const Sidebar = ({
  collapsed,
  onCollapse,
  headerSlot,
  children,
  footerSlot,
  ...props
}: SidebarProps) => {
  return (
    <SidebarContext.Provider value={{ collapsed: collapsed ?? false }}>
      <div
        {...props}
        className={
          classNames(
            `
              flex flex-col
              py-2
              pb-4
              ${collapsed ? "" : "w-52"}
            `,
            props.className
          )}
      >
        <div data-name="header" className="w-full">
          <Button onClick={() => onCollapse!(b => !b)}>
            <FontAwesomeIcon icon={faArrowRightArrowLeft} />
          </Button>
          {headerSlot}
        </div>
        <Divider />
        <div data-name="body" className="flex-grow overflow-auto">
          {children}
        </div>
        <Divider />
        <div data-name="footer" className="">
          {footerSlot}
        </div>
      </div>
    </SidebarContext.Provider>
  );
};


const Divider = () => <div className="border-t-1 mx-0 my-2 border-slate-200" />