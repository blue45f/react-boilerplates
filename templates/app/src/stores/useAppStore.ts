import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type ThemePreference = 'light' | 'dark' | 'system';
export type Language = 'ko' | 'en';

interface AppState {
  theme: ThemePreference;
  language: Language;
  notifications: boolean;
  sidebarOpen: boolean;
  setTheme: (theme: ThemePreference) => void;
  setLanguage: (language: Language) => void;
  setNotifications: (enabled: boolean) => void;
  toggleNotifications: () => void;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'system',
      language: 'ko',
      notifications: true,
      sidebarOpen: true,
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      setNotifications: (notifications) => set({ notifications }),
      toggleNotifications: () => set((state) => ({ notifications: !state.notifications })),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : state.theme === 'dark' ? 'system' : 'light',
        })),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
    }),
    {
      name: 'app-settings',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
        notifications: state.notifications,
      }),
    }
  )
);
