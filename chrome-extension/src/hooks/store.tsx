import { useEffect, useState } from "react";
import { retrieve, syncRetrieve, syncSave } from "../utils/store";

export function useSyncStore<T>(initialValue: T, storeKey: string): any[] {
  const [state, setState] = useState<T>(initialValue);
  const refreshState = () => {
    syncRetrieve(storeKey).then((data) => {
      data && setState(data);
    });
  };

  const syncSetState = (value: T): void => {
    syncSave(storeKey, value);
    setState(value);
  };

  useEffect(() => {
    refreshState();
  }, []);
  return [state, syncSetState];
}

export function useStore<T>(initialValue: T, storeKey: string): any[] {
  const [state, setState] = useState<T>(initialValue);
  const refreshState = () => {
    retrieve(storeKey).then((data) => {
      data && setState(data);
    });
  };

  useEffect(() => {
    refreshState();
  }, []);
  return [state, setState, refreshState];
}
