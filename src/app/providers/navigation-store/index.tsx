"use client";
import {
  type NavigationStore,
  createNavigationStore,
  initNavigationStore,
} from "./store";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { type StoreApi, useStore } from "zustand";

export const NavigationStoreContext =
  createContext<StoreApi<NavigationStore> | null>(null);

export interface Props {
  children: ReactNode;
}

export const NavigationStoreProvider = ({ children }: Props) => {
  const storeRef = useRef<StoreApi<NavigationStore>>();
  if (!storeRef.current) {
    storeRef.current = createNavigationStore(initNavigationStore());
  }

  return (
    <NavigationStoreContext.Provider value={storeRef.current}>
      {children}
    </NavigationStoreContext.Provider>
  );
};

export const useNavigationStore = <T,>(selector: (store: NavigationStore) => T,): T => {
  const navigationStoreContext = useContext(NavigationStoreContext);

  if (!navigationStoreContext) {
    throw new Error(`useNavigationStore must be use within useNavigationStore`);
  }

  return useStore(navigationStoreContext, selector);
};
