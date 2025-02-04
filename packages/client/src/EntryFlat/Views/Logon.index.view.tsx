import {
  faCircleNodes,
  faGear,
  faGlasses,
  faPanorama,
  faSliders,
  faVrCardboard,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Route, Router } from "wouter";
import { memoryLocation } from "wouter/memory-location";
import { useWebControl } from "../../components/WebControl";
import { useObs } from "../../hooks/useObs";
import { UseWrdxrSessionReturn } from "../../hooks/useWrdxrSession";
import {
  useWrdxrXrStore,
  UseWrdxrXrStoreProps,
} from "../../hooks/useWrdxrXrStore";
import { AppShell } from "../Components/AppShell";
import { Services } from "../Components/Services/Services";
import { Sidebar } from "../Components/Sidebar";
import { SidebarButton } from "../Components/SidebarButton";
import { SidebarGroup } from "../Components/SidebarGroup";
import { ViewLogonSubConnection } from "./Logon.sub.Connection.view";
import { ViewLogonSubControls } from "./Logon.sub.Controls.view";
import { ViewLogonSubSettings } from "./Logon.sub.Settings.view";
import { ViewLogonSubViewport } from "./Logon.sub.Viewport.view";

export interface ViewLogonProps {
  wrdxrSessionProps: UseWrdxrSessionReturn;
}

const { hook, navigate } = memoryLocation();

export const ViewLogon = ({ wrdxrSessionProps }: ViewLogonProps) => {
  const webControlProps = useWebControl(wrdxrSessionProps);
  const obsProps = useObs(wrdxrSessionProps);
  const wrdxrXrStoreProps = useWrdxrXrStore();

  return (
    <>
      <Services
        wrdxrXrStoreProps={wrdxrXrStoreProps}
        wrdxrSessionProps={wrdxrSessionProps}
        webControlProps={webControlProps}
      />
      <AppShell
        sidebarSlot={
          <Sidebar
            headerSlot={<span />}
            children={
              <SidebarGroup>
                <SidebarButton
                  startIconSlot={<FontAwesomeIcon icon={faCircleNodes} />}
                  onClick={() => navigate("/logon/connection")}
                >
                  Connection
                </SidebarButton>
                <SidebarButton
                  startIconSlot={<FontAwesomeIcon icon={faPanorama} />}
                  onClick={() => navigate("/logon/viewport")}
                >
                  Viewport
                </SidebarButton>
                <SidebarButton
                  startIconSlot={<FontAwesomeIcon icon={faSliders} />}
                  onClick={() => navigate("/logon/controls")}
                >
                  Controls
                </SidebarButton>
                <SidebarButton
                  startIconSlot={<FontAwesomeIcon icon={faGear} />}
                  onClick={() => navigate("/logon/settings")}
                >
                  Settings
                </SidebarButton>
              </SidebarGroup>
            }
            footerSlot={<SidebarFooter wrdxrXrStoreProps={wrdxrXrStoreProps} />}
          />
        }
      >
        <Router hook={hook}>
          {[
            { path: "/", C: ViewLogonSubConnection },
            { path: "/logon/connection", C: ViewLogonSubConnection },
            { path: "/logon/viewport", C: ViewLogonSubViewport },
            { path: "/logon/controls", C: ViewLogonSubControls },
            { path: "/logon/settings", C: ViewLogonSubSettings },
          ].map(({ path, C: ViewLogonSubComponent }) => {
            return (
              <Route path={path} key={path}>
                <ViewLogonSubComponent
                  obsProps={obsProps}
                  wrdxrSessionProps={wrdxrSessionProps}
                  webControlProps={webControlProps}
                />
              </Route>
            );
          })}
        </Router>
      </AppShell>
    </>
  );
};

interface SidebarFooterProps {
  wrdxrXrStoreProps: UseWrdxrXrStoreProps;
}
const SidebarFooter = (props: SidebarFooterProps) => {
  const { wrdxrXrStoreProps } = props;
  const mode = wrdxrXrStoreProps.state.mode;
  const currentModeInVr = mode === "immersive-vr";

  return (
    <SidebarGroup>
      {mode !== null ? (
        <SidebarButton
          startIconSlot={
            <FontAwesomeIcon
              icon={currentModeInVr ? faVrCardboard : faGlasses}
            />
          }
          onClick={() => {
            wrdxrXrStoreProps.state.session?.end();
          }}
        >
          Exit {currentModeInVr ? "VR" : "AR"}
        </SidebarButton>
      ) : (
        <>
          <SidebarButton
            startIconSlot={<FontAwesomeIcon icon={faVrCardboard} />}
            onClick={() => {
              wrdxrXrStoreProps.store.enterXR("immersive-vr");
            }}
          >
            Enter VR
          </SidebarButton>
          <SidebarButton
            startIconSlot={<FontAwesomeIcon icon={faGlasses} />}
            onClick={() => {
              wrdxrXrStoreProps.store.enterXR("immersive-ar");
            }}
          >
            Enter AR
          </SidebarButton>
        </>
      )}
    </SidebarGroup>
  );
};
