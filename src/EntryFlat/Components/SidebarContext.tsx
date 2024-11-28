import { createContext } from "react";

export interface SidebarContext {
  collapsed: boolean;
}

const defaultSidebarContextValue: SidebarContext = { collapsed: false };

export const SidebarContext = createContext<SidebarContext>(defaultSidebarContextValue);
