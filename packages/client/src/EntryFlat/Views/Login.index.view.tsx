import { useState } from "react";
import { WrdxrSettingsUrls } from "../../hooks/useWrdxrSession";
import { WRDXR_DEFAULT_FILE } from "../../services/environment";

export interface ViewLoginProps {
  onConnectionStart: (urls: WrdxrSettingsUrls) => void;
}

export const ViewLogin = (props: ViewLoginProps) => {
   const [error, setError] = useState<Error | null>(null)

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        setError(null);

        const formData = new FormData(e.currentTarget);
        const serverUrl = formData.get("serverUrl");
        const streamUrl = formData.get("streamUrl");

        try {
          assertValid(serverUrl, "server url");
          assertValid(streamUrl, "stream url");

          props.onConnectionStart({
            server: serverUrl,
            stream: streamUrl,
          });
        } catch (error) {
          setError(new Error("Cannot be empty"));
        }
      }}>
        <input
          required
          name="serverUrl"
          defaultValue={location.origin}
        />
        <input
          required
          name="streamUrl"
          defaultValue={WRDXR_DEFAULT_FILE}
        />
        {error && <p>{error.message}</p>}
        <button>Login</button>
      </form>
    </div>
  )
};

function assertValid(value: FormDataEntryValue | null, name: string): asserts value is string  {
  if (typeof value !== "string") {
    throw new Error(`${name} is not a valid string`);
  }
  if (value.trim().length === 0) {
    throw new Error(`${name} cannot be empty`);
  }
}
