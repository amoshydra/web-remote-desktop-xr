import { UseObsReturn } from "../../../hooks/useObs";
import { ServicesVideoSourceProvider, ServicesVideoSourceProviderProps } from "./ServicesVideoSourceProvider/VideoSourceProvider.";
import { ServicesXrProvider, ServicesXrProviderProps } from "./ServicesXrProvider/ServicesXrProvider";

export interface ServicesProps extends ServicesVideoSourceProviderProps, ServicesXrProviderProps {
  obsProps: UseObsReturn
}

export const Services = (props: ServicesProps) => {
  return (
    <>
      <ServicesVideoSourceProvider
        {...props}
      />
      <ServicesXrProvider
        {...props}
      />
    </>
  );
};
