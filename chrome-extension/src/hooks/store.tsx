import { useEffect, useState } from "react";
import { browser } from "webextension-polyfill-ts";
import { retrieve, syncRetrieve, syncSave } from "../../common/store.utils";

export function useSyncStore<T>(
  initialValue: T,
  storeKey: string
): { state: T; setState: (value: T) => void; loading: boolean } {
  const [state, setState] = useState<T>(initialValue);
  const [loading, setLoading] = useState<boolean>(false);

  const syncSetState = (value: T): void => {
    setLoading(true);
    syncSave(storeKey, value).then(() => {
      setState(value);
      setLoading(false);
    });
  };

  useEffect(() => {
    setLoading(true);
    syncRetrieve(storeKey).then((data) => {
      data && setState(data);
      setLoading(false);
    });

    const listerner = (changes: Record<string, any>, namespace: string) => {
      if (storeKey in changes && namespace === "sync") {
        const oldValue = changes[storeKey].oldValues;
        const newValues = changes[storeKey].newValues;

        if (oldValue !== newValues) {
          setState(newValues);
        }
      }
    };

    browser.storage.onChanged.addListener(listerner);

    return () => {
      browser.storage.onChanged.removeListener(listerner);
    };
  }, []);
  return { state, setState: syncSetState, loading };
}

export function useStore<T>(
  initialValue: T,
  storeKey: string
): {
  state: T;
  setState: React.Dispatch<React.SetStateAction<T>>;
} {
  const [state, setState] = useState<T>(initialValue);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    retrieve(storeKey).then((data) => {
      data && setState(data);
      setLoading(false);
    });

    const listerner = (changes: Record<string, any>, namespace: string) => {
      if (storeKey in changes && namespace === "local") {
        const oldValue = JSON.parse(changes[storeKey].oldValues);
        const newValues = JSON.parse(changes[storeKey].newValues);

        // TODO : Improve diff
        if (oldValue !== newValues) {
          setState(newValues);
        }
      }
    };

    browser.storage.onChanged.addListener(listerner);

    return () => {
      browser.storage.onChanged.removeListener(listerner);
    };
  }, []);
  return { state, setState };
}
