import { useEffect, useRef, useState } from "react";
import { WrdxrSettingsUrls } from "../../hooks/useWrdxrSession";
import { ConfigStorage } from "../../services/configStorage";
import { Button } from "../Components/Button";
import { ErrorBanner } from "../Components/Login/ErrorBanner";
import { FieldInput } from "../Components/Login/FieldInput";
import { FieldLabel } from "../Components/Login/FieldLabel";
import { FormField } from "../Components/Login/FormField";

export interface ViewLoginProps {
  onConnectionStart: (urls: WrdxrSettingsUrls) => void;
  error: Error | null;
}

export const ViewLogin = (props: ViewLoginProps) => {
  const { onConnectionStart, error: propsError } = props;
  const [error, setError] = useState<Error | null>(null);
  const [serverUrl, setServerUrl] = useState(ConfigStorage.serverUrl.get());
  const [streamUrl, setStreamUrl] = useState(ConfigStorage.streamUrl.get());
  const [remember, setRemember] = useState(ConfigStorage.remember.get());

  const initialRemember = useRef(remember);

  useEffect(() => {
    if (initialRemember.current) {
      onConnectionStart({
        server: serverUrl,
        stream: streamUrl,
      });
      initialRemember.current = false;
    }
  }, [initialRemember, onConnectionStart, serverUrl, streamUrl]);

  const renderError = error || propsError;

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setError(null);

    try {
      assertValid(serverUrl, "server url");
      assertValid(streamUrl, "stream url");

      onConnectionStart({
        server: serverUrl,
        stream: streamUrl,
      });
      if (remember) {
        ConfigStorage.remember.set(remember);
        ConfigStorage.serverUrl.set(serverUrl);
        ConfigStorage.streamUrl.set(streamUrl);
      }
    } catch (e) {
      setError(e as Error);
    }
  };

  return (
    <div className="flex justify-center bg-slate-100 h-full w-full">
      <div className="bg-white drop-shadow-2xl rounded-lg p-8 m-[8%] h-min w-120 max-w-full">
        <div className="grid gap-y-8">
          {renderError && <ErrorBanner error={renderError} />}
          <form onSubmit={handleSubmit} className="grid gap-y-8">
            <FormField>
              <FieldLabel htmlFor="serverUrl">Server</FieldLabel>
              <FieldInput
                required
                id="serverUrl"
                name="serverUrl"
                value={serverUrl}
                onChange={(e) => setServerUrl(e.target.value)}
              />
            </FormField>

            <FormField>
              <FieldLabel htmlFor="streamUrl">Stream</FieldLabel>
              <FieldInput
                required
                id="streamUrl"
                name="streamUrl"
                value={streamUrl}
                onChange={(e) => setStreamUrl(e.target.value)}
              />
            </FormField>

            <div className="flex justify-end items-center gap-8 mt-24">
              <div>
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  className="mr-2"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <label htmlFor="remember">Auto connect</label>
              </div>
              <Button className="bg-slate-200 hover:bg-slate-300 active:bg-slate-400">
                Connect
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

function assertValid(
  value: FormDataEntryValue | null,
  name: string,
): asserts value is string {
  if (typeof value !== "string") {
    throw new Error(`${name} is not a valid string`);
  }
  const trimmed = value.trim();

  if (trimmed.length === 0) {
    throw new Error(`${name} cannot be empty`);
  }

  try {
    new URL(trimmed);
  } catch {
    throw new Error(`${name} is not a valid URL`);
  }
}
