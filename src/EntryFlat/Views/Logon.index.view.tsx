import { faCircleNodes, faGear, faGlasses, faPanorama, faSliders, faVrCardboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';
import { OvenPlayerMain } from '../../components/OvenPlayer';
import { useWebControl, WebControl } from '../../components/WebControl';
import { EntryRef, EntryVirtual } from '../../EntryVirtual/EntryVirtual';
import { AppShell } from '../Components/AppShell';
import { Sidebar } from '../Components/Sidebar';
import { SidebarButton } from '../Components/SidebarButton';
import { SidebarGroup } from '../Components/SidebarGroup';

export interface ViewLogonProps {
}

export const ViewLogon = () => {
  const entryRef = useRef<EntryRef>(null);
  const webControlProps = useWebControl();

  return (
    <>
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
                  onClick={() => entryRef.current!.enter("vr")}
                >Enter VR</SidebarButton>
                <SidebarButton
                  startIconSlot={<FontAwesomeIcon icon={faGlasses} />}
                  onClick={() => entryRef.current!.enter("ar")}
                >Enter AR</SidebarButton>
              </SidebarGroup>
            }
          />
        }
      >
        <OvenPlayerMain
          className="w-full h-full object-contain bg-slate-200"
          innerRef={webControlProps.setPlayer}
          defaultMuted={webControlProps.muted}
          src={webControlProps.file}
        />

        <WebControl {...webControlProps} />
      </AppShell>
      
      <div className="fixed w-full h-full top-0 -z-1 opacity-0 pointer-events-none">
        <EntryVirtual
          webControlProps={webControlProps}
          innerRef={entryRef}
        />
      </div>
    </>
  );
};
