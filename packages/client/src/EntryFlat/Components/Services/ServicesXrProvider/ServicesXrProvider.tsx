import { Ref } from "react";
import { WebControlProps } from "../../../../components/WebControl";
import { EntryRef, EntryVirtual } from "../../../../EntryVirtual/EntryVirtual";
import { UseWrdxrSessionReturn } from "../../../../hooks/useWrdxrSession";

export interface ServicesXrProviderProps {
  webControlProps: WebControlProps;
  xrStoreRef: Ref<EntryRef>
  wrdxrSessionProps: UseWrdxrSessionReturn;
}

export const ServicesXrProvider = ({ wrdxrSessionProps, webControlProps, xrStoreRef }: ServicesXrProviderProps) => {
  return (
    <div className="fixed w-full h-full top-0 -z-1 opacity-0 pointer-events-none">
      <EntryVirtual
        webControlProps={webControlProps}
        wrdxrSessionProps={wrdxrSessionProps}
        innerRef={xrStoreRef}
      />
    </div>
  )
}
