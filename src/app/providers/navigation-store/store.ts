import { Mutate, StoreApi, create, createStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type NavigationStore = NavigationState & NavigationActions;

export type NavigationState = {
  isSidebarOpen: boolean;
  isDark: boolean;
};

export type NavigationActions = {
  toggleSidebar: () => void;
  toggleDark: () => void;
};

export const defaultInitState: NavigationState = {
  isSidebarOpen: false,
  isDark: true,
};

//initialize
export const initNavigationStore = create<NavigationState>()(
  persist(
    (set, get) => ({
      isDark: true,
      isSidebarOpen: true,
    }),
    {
      name: "nav-store",
    },
  ),
);

export const createNavigationStore = (
  initState: NavigationState = defaultInitState,
) => {
  return createStore<NavigationStore>()((set) => ({
    ...initState,
    toggleSidebar: () =>
      set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    toggleDark: () => {
      const html = document.querySelector("html");
      html?.classList.toggle("dark");
    },
  }));
};
