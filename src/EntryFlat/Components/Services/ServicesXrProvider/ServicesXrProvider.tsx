import { Ref } from "react";
import { WebControlProps } from "../../../../components/WebControl";
import { EntryRef, EntryVirtual } from "../../../../EntryVirtual/EntryVirtual";
import { UseObsReturn } from "../../../../hooks/useObs";

export interface ServicesXrProviderProps {
  webControlProps: WebControlProps;
  obsProps: UseObsReturn;
  xrStoreRef: Ref<EntryRef>
}

export const ServicesXrProvider = ({ webControlProps, xrStoreRef, obsProps }: ServicesXrProviderProps) => {
  return (
    <div className="fixed w-full h-full top-0 -z-1 opacity-0 pointer-events-none">
      <EntryVirtual
        webControlProps={webControlProps}
        innerRef={xrStoreRef}
        obsProps={obsProps}
      />
    </div>
  )
}
