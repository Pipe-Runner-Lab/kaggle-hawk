import { useEffect, useState } from "react";
import { browser } from "webextension-polyfill-ts";
import { retrieve, syncRetrieve, syncSave } from "../../common/store.utils";

export function useSyncStore<T>(
  initialValue: T,
  storeKey: string
): {
  state: T;
  setState: (value: T) => void;
} {
  const [state, setState] = useState<T>(initialValue);

  const syncSetState = (value: T): void => {
    syncSave(storeKey, value).then(() => {
      setState(value);
    });
  };

  useEffect(() => {
    syncRetrieve(storeKey).then((data) => {
      data && setState(data);
    });

    const listener = (changes: Record<string, any>, namespace: string) => {
      if (storeKey in changes && namespace === "sync") {
        const oldValue = changes[storeKey]?.oldValue;
        const newValue = changes[storeKey]?.newValue;

        // TODO: Improve diff logic
        if (oldValue !== newValue) {
          setState(newValue);
        }
      }
    };

    browser.storage.onChanged.addListener(listener);

    return () => {
      browser.storage.onChanged.removeListener(listener);
    };
  }, []);
  return { state, setState: syncSetState };
}

export function useStore<T>(
  initialValue: T,
  storeKey: string
): {
  state: T;
  setState: React.Dispatch<React.SetStateAction<T>>;
  error: boolean;
} {
  const [state, setState] = useState<T>(initialValue);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setError(false);
    retrieve(storeKey).then((data) => {
      data !== null ? setState(data) : setError(true);
    });

    const listener = (changes: Record<string, any>, namespace: string) => {
      if (storeKey in changes && namespace === "local") {
        // TODO: Improve code elegance
        const oldValue =
          changes[storeKey]?.oldValue && JSON.parse(changes[storeKey].oldValue);
        const newValues =
          changes[storeKey]?.newValue && JSON.parse(changes[storeKey].newValue);

        // TODO : Improve diff logic
        if (oldValue !== newValues) {
          setState(newValues);
          setError(false);
        }
      }
    };

    browser.storage.onChanged.addListener(listener);

    return () => {
      browser.storage.onChanged.removeListener(listener);
    };
  }, []);
  return { state, setState, error };
}
