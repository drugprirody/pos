import { createStore } from "zustand/vanilla";

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
  isDark: false,
};

//initialize
export const initNavigationStore = (): NavigationState => {
  return defaultInitState;
};

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