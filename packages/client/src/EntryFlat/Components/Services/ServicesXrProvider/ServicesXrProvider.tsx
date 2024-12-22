import { WebControlProps } from "../../../../components/WebControl";
import { EntryVirtual } from "../../../../EntryVirtual/EntryVirtual";
import { UseWrdxrSessionReturn } from "../../../../hooks/useWrdxrSession";
import { UseWrdxrXrStoreProps } from "../../../../hooks/useWrdxrXrStore";

export interface ServicesXrProviderProps {
  webControlProps: WebControlProps;
  wrdxrXrStoreProps: UseWrdxrXrStoreProps;
  wrdxrSessionProps: UseWrdxrSessionReturn;
}

export const ServicesXrProvider = ({
  wrdxrSessionProps,
  webControlProps,
  wrdxrXrStoreProps,
}: ServicesXrProviderProps) => {
  return (
    <div className="fixed w-full h-full top-0 -z-1 opacity-0 pointer-events-none">
      <EntryVirtual
        webControlProps={webControlProps}
        wrdxrSessionProps={wrdxrSessionProps}
        wrdxrXrStoreProps={wrdxrXrStoreProps}
      />
    </div>
  );
};
