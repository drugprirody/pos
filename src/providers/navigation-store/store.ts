import { create, createStore } from "zustand";
import { persist } from "zustand/middleware";

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
export const initNavigationStore = create<NavigationStore>()(
  persist(
    (set, get) => ({
      isDark: true,
      isSidebarOpen: true,
      toggleDark: () => set({ ...set, isDark: !get().isDark }),
      toggleSidebar: () => set({ ...set, isSidebarOpen: !get().isSidebarOpen }),
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
