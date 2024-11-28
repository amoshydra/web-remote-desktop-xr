import { faCircleNodes, faGear, faGlasses, faPanorama, faSliders, faVrCardboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import { useWebControl } from '../../components/WebControl';
import { EntryRef } from '../../EntryVirtual/EntryVirtual';
import { AppShell } from '../Components/AppShell';
import { Services } from '../Components/Services/Services';
import { Sidebar } from '../Components/Sidebar';
import { SidebarButton } from '../Components/SidebarButton';
import { SidebarGroup } from '../Components/SidebarGroup';
import { ViewLogonSubConnection } from './Logon.sub.Connection.view';
import { ViewLogonSubControls } from './Logon.sub.Controls.view';
import { ViewLogonSubSettings } from './Logon.sub.Settings.view';
import { ViewLogonSubViewport } from './Logon.sub.Viewport.view';

export interface ViewLogonProps {}

export const ViewLogon = () => {
  const xrStoreRef = useRef<EntryRef>(null);
  const webControlProps = useWebControl();
  const [videoRenderTarget, setVideoRenderTarget] = useState<HTMLElement | null>(null);

  return (
    <>
      <Services
        webControlProps={webControlProps}
        videoRenderTarget={videoRenderTarget}
        xrStoreRef={xrStoreRef}
      />
      <AppShell
        sidebarSlot={
          <Sidebar 
            headerSlot={<span />}
            children={
              <SidebarGroup>
                <SidebarButton
                  startIconSlot={<FontAwesomeIcon icon={faCircleNodes} />}
                >Connection</SidebarButton>
                <SidebarButton
                  startIconSlot={<FontAwesomeIcon icon={faPanorama} />}
                >Viewport</SidebarButton>
                <SidebarButton
                  startIconSlot={<FontAwesomeIcon icon={faSliders} />}
                >Controls</SidebarButton>
                <SidebarButton
                  startIconSlot={<FontAwesomeIcon icon={faGear} />}
                >Settings</SidebarButton>
              </SidebarGroup>
            }
            footerSlot={
              <SidebarGroup>
                <SidebarButton
                  startIconSlot={<FontAwesomeIcon icon={faVrCardboard} />}
                  onClick={() => xrStoreRef.current!.enter("vr")}
                >Enter VR</SidebarButton>
                <SidebarButton
                  startIconSlot={<FontAwesomeIcon icon={faGlasses} />}
                  onClick={() => xrStoreRef.current!.enter("ar")}
                >Enter AR</SidebarButton>
              </SidebarGroup>
            }
          />
        }
      >
        {
          [
            ViewLogonSubConnection,
            ViewLogonSubViewport,
            ViewLogonSubControls,
            ViewLogonSubSettings,
          ].map((ViewLogonSubComponent) => {
            return (
              <ViewLogonSubComponent
                webControlProps={webControlProps}
                onVideoRenderReqeust={setVideoRenderTarget}
              />
            )
          })
        }
      </AppShell>
    </>
  );
};
